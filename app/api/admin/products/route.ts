import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/auth";
import type { ProductOverrideRow, ProductRow } from "@/lib/types";

const asBoolFilter = (value: string | null): boolean | null => {
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
};

const parseNumber = (value: string | null, fallback: number): number => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return n;
};

export async function GET(request: Request) {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") || "";
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const search = searchParams.get("search") || "";
  const hidden = asBoolFilter(searchParams.get("hidden"));
  const pinned = asBoolFilter(searchParams.get("pinned"));
  const sort = searchParams.get("sort") || "updated_desc";

  const page = Math.max(1, parseNumber(searchParams.get("page"), 1));
  const pageSize = Math.max(1, Math.min(parseNumber(searchParams.get("pageSize"), 20), 200));

  let query = auth.supabase
    .from("products")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(500);

  if (provider) query = query.eq("provider", provider);
  if (category) query = query.eq("category", category);
  if (tag) query = query.contains("tags", [tag]);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data: products, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const productRows = (products ?? []) as ProductRow[];
  const productIds = productRows.map((item) => item.id);

  let overridesMap = new Map<string, ProductOverrideRow>();

  if (productIds.length) {
    const { data: overridesData, error: overridesError } = await auth.supabase
      .from("product_overrides")
      .select("*")
      .in("product_id", productIds);

    if (overridesError) {
      return NextResponse.json({ error: overridesError.message }, { status: 500 });
    }

    overridesMap = new Map(
      ((overridesData ?? []) as ProductOverrideRow[]).map((item) => [item.product_id, item])
    );
  }

  const merged = productRows.map((product) => {
    const override = overridesMap.get(product.id);

    return {
      ...product,
      effective_title: override?.custom_title ?? product.title,
      effective_price: override?.custom_price ?? product.price,
      effective_image_url: override?.custom_image_url ?? product.image_url,
      effective_url: override?.custom_url ?? product.product_url,
      pinned: Boolean(override?.pinned),
      hidden: Boolean(override?.hidden),
      override: override ?? null
    };
  });

  const filtered = merged.filter((item) => {
    if (hidden !== null && item.hidden !== hidden) return false;
    if (pinned !== null && item.pinned !== pinned) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price_asc") return Number(a.effective_price) - Number(b.effective_price);
    if (sort === "price_desc") return Number(b.effective_price) - Number(a.effective_price);
    if (sort === "updated_asc") {
      return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    }
    if (sort === "pinned_desc") {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return NextResponse.json({
    data: sorted.slice(start, end),
    pagination: {
      total,
      page,
      pageSize,
      pageCount: Math.max(1, Math.ceil(total / pageSize))
    }
  });
}
