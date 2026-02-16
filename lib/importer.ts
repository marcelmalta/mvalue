import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ImportRuleRow,
  ImportRunRow,
  NormalizedProductInput,
  ProviderName,
  ProviderRow
} from "@/lib/types";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { waitForProviderSlot, withRetry } from "@/lib/rate-limit";
import { searchMercadoLivre } from "@/lib/providers/mercadolivre";
import { searchAmazon } from "@/lib/providers/amazon";
import { searchShopee } from "@/lib/providers/shopee";
import { searchMagalu } from "@/lib/providers/magalu";
import { safeJson, uniqueTags } from "@/lib/utils";

interface RunRuleImportOptions {
  force?: boolean;
  limit?: number;
}

interface RuleRunResult {
  status: "success" | "error" | "skipped";
  run: Partial<ImportRunRow> | null;
  reason?: string;
}

const toProviderName = (name: string): ProviderName => {
  const normalized = String(name || "").toLowerCase().trim();

  if (
    normalized === "mercadolivre" ||
    normalized === "amazon" ||
    normalized === "shopee" ||
    normalized === "magalu"
  ) {
    return normalized;
  }

  throw new Error(`Provider invalido: ${name}`);
};

const executeProviderSearch = async (
  provider: ProviderRow,
  rule: ImportRuleRow,
  limit: number
): Promise<NormalizedProductInput[]> => {
  const providerName = toProviderName(provider.name);
  const query = String(rule.query || "").trim();

  if (!query) {
    return [];
  }

  await waitForProviderSlot(providerName);

  if (providerName === "mercadolivre") {
    return withRetry(
      () => searchMercadoLivre({ query, limit, category: rule.category, tags: rule.tags }),
      2,
      450
    );
  }

  if (providerName === "amazon") {
    return withRetry(
      () =>
        searchAmazon({
          query,
          limit,
          category: rule.category,
          tags: rule.tags,
          config: provider.config_json
        }),
      1,
      450
    );
  }

  if (providerName === "shopee") {
    return withRetry(
      () =>
        searchShopee({
          query,
          limit,
          category: rule.category,
          tags: rule.tags,
          config: provider.config_json
        }),
      1,
      450
    );
  }

  return withRetry(
    () => searchMagalu({ query, limit, category: rule.category, tags: rule.tags }),
    1,
    450
  );
};

const createRunningRun = async (
  supabase: SupabaseClient,
  provider: ProviderRow,
  rule: ImportRuleRow
): Promise<Partial<ImportRunRow>> => {
  const { data, error } = await supabase
    .from("import_runs")
    .insert({
      provider_id: provider.id,
      rule_id: rule.id,
      status: "running",
      started_at: new Date().toISOString()
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Nao foi possivel criar import_run: ${error.message}`);
  }

  return (data ?? null) as Partial<ImportRunRow>;
};

const finalizeRun = async (
  supabase: SupabaseClient,
  runId: string,
  payload: Partial<ImportRunRow>
): Promise<void> => {
  const { error } = await supabase
    .from("import_runs")
    .update(payload)
    .eq("id", runId);

  if (error) {
    throw new Error(`Falha ao finalizar import_run: ${error.message}`);
  }
};

const upsertProducts = async (
  supabase: SupabaseClient,
  products: NormalizedProductInput[]
): Promise<number> => {
  if (!products.length) return 0;

  const rows = products.map((item) => ({
    provider: item.provider,
    external_id: item.external_id,
    title: item.title,
    price: item.price,
    currency: item.currency || "BRL",
    image_url: item.image_url,
    product_url: item.product_url,
    category: item.category,
    tags: uniqueTags(item.tags || []),
    rating: item.rating,
    raw_json: safeJson(item.raw_json),
    updated_at: new Date().toISOString()
  }));

  const { error } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "provider,external_id" });

  if (error) {
    throw new Error(`Falha no upsert de products: ${error.message}`);
  }

  return rows.length;
};

const shouldSkipByCache = (rule: ImportRuleRow, force = false): boolean => {
  if (force || !rule.last_run_at) return false;

  const scheduleMinutes = Math.max(1, Number(rule.schedule_minutes || 60));
  const nextRunAt = new Date(rule.last_run_at).getTime() + scheduleMinutes * 60 * 1000;
  return Date.now() < nextRunAt;
};

export const runRuleImport = async (
  rule: ImportRuleRow,
  provider: ProviderRow,
  options: RunRuleImportOptions = {}
): Promise<RuleRunResult> => {
  const supabase = createSupabaseServiceClient();
  const force = Boolean(options.force);
  const limit = Math.max(1, Math.min(options.limit ?? 24, 50));

  if (shouldSkipByCache(rule, force)) {
    const { data } = await supabase
      .from("import_runs")
      .insert({
        provider_id: provider.id,
        rule_id: rule.id,
        status: "skipped",
        started_at: new Date().toISOString(),
        finished_at: new Date().toISOString(),
        items_fetched: 0,
        items_upserted: 0,
        error: "Regra em cache: aguarde o proximo intervalo"
      })
      .select("*")
      .single();

    return {
      status: "skipped",
      run: (data ?? null) as Partial<ImportRunRow>,
      reason: "cached"
    };
  }

  const runningRun = await createRunningRun(supabase, provider, rule);
  const runId = String(runningRun.id);

  try {
    const fetched = await executeProviderSearch(provider, rule, limit);

    const normalized = fetched.map((item) => ({
      ...item,
      provider: toProviderName(provider.name),
      category: item.category ?? rule.category ?? null,
      tags: uniqueTags([...(rule.tags || []), ...(item.tags || [])])
    }));

    const upserted = await upsertProducts(supabase, normalized);

    await finalizeRun(supabase, runId, {
      status: "success",
      finished_at: new Date().toISOString(),
      items_fetched: normalized.length,
      items_upserted: upserted,
      error: null
    });

    await supabase
      .from("import_rules")
      .update({ last_run_at: new Date().toISOString() })
      .eq("id", rule.id);

    return {
      status: "success",
      run: {
        ...runningRun,
        status: "success",
        items_fetched: normalized.length,
        items_upserted: upserted,
        finished_at: new Date().toISOString()
      }
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido na importacao";

    await finalizeRun(supabase, runId, {
      status: "error",
      finished_at: new Date().toISOString(),
      items_fetched: 0,
      items_upserted: 0,
      error: message
    });

    return {
      status: "error",
      run: {
        ...runningRun,
        status: "error",
        finished_at: new Date().toISOString(),
        error: message
      },
      reason: message
    };
  }
};

export const fetchEnabledRulesWithProviders = async (): Promise<
  Array<{ rule: ImportRuleRow; provider: ProviderRow }>
> => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from("import_rules")
    .select("*, providers(*)")
    .eq("enabled", true)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Falha ao buscar regras habilitadas: ${error.message}`);
  }

  const rows = Array.isArray(data) ? data : [];

  return rows
    .map((row) => ({
      rule: row as unknown as ImportRuleRow,
      provider: row.providers as ProviderRow
    }))
    .filter((item) => Boolean(item.provider && item.provider.enabled));
};

export const runEnabledRulesImport = async (): Promise<RuleRunResult[]> => {
  const enabledRules = await fetchEnabledRulesWithProviders();
  const results: RuleRunResult[] = [];

  for (const item of enabledRules) {
    const result = await runRuleImport(item.rule, item.provider, { force: false });
    results.push(result);
  }

  return results;
};
