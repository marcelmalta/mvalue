import { env } from "@/lib/env";
import type { NormalizedProductInput } from "@/lib/types";
import { toNumber, uniqueTags } from "@/lib/utils";

interface MercadoLivreSearchOptions {
  query: string;
  limit?: number;
  category?: string | null;
  tags?: string[];
}

interface MercadoLivreResult {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail?: string;
  permalink?: string;
  category_id?: string;
}

export const searchMercadoLivre = async (
  options: MercadoLivreSearchOptions
): Promise<NormalizedProductInput[]> => {
  const query = options.query.trim();
  if (!query) {
    return [];
  }

  const limit = Math.max(1, Math.min(options.limit ?? 30, 50));
  const siteId = env.MERCADOLIVRE_SITE_ID || "MLB";

  const url = new URL(`https://api.mercadolibre.com/sites/${siteId}/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mercado Livre search falhou: ${response.status} - ${text.slice(0, 180)}`);
  }

  const payload = (await response.json()) as { results?: MercadoLivreResult[] };
  const results = Array.isArray(payload.results) ? payload.results : [];

  return results
    .map((item) => {
      const mergedTags = uniqueTags([...(options.tags ?? []), "mercadolivre"]);

      return {
        provider: "mercadolivre" as const,
        external_id: String(item.id),
        title: String(item.title || "").trim() || "Produto sem titulo",
        price: toNumber(item.price, 0),
        currency: item.currency_id || "BRL",
        image_url: item.thumbnail ?? null,
        product_url: item.permalink ?? null,
        category: options.category ?? item.category_id ?? null,
        tags: mergedTags,
        rating: null,
        raw_json: item as unknown as Record<string, unknown>
      };
    })
    .filter((item) => item.external_id && item.title && item.price > 0);
};
