import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/auth";
import { runRuleImport } from "@/lib/importer";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import type { ImportRuleRow, ProviderRow } from "@/lib/types";

const runSchema = z.object({
  rule_id: z.string().uuid(),
  force: z.boolean().optional().default(true),
  limit: z.number().int().min(1).max(50).optional().default(24)
});

export async function POST(request: Request) {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const body = await request.json().catch(() => ({}));
  const parsed = runSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload invalido", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServiceClient();
  const { rule_id, force, limit } = parsed.data;

  const { data, error } = await supabase
    .from("import_rules")
    .select("*, providers(*)")
    .eq("id", rule_id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Regra nao encontrada" }, { status: 404 });
  }

  const rule = data as unknown as ImportRuleRow;
  const provider = (data as Record<string, unknown>).providers as ProviderRow | undefined;

  if (!provider) {
    return NextResponse.json({ error: "Provider da regra nao encontrado" }, { status: 400 });
  }

  const result = await runRuleImport(rule, provider, { force, limit });
  return NextResponse.json({ data: result });
}
