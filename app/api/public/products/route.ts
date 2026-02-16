import { NextResponse } from "next/server";
import { createSupabasePublicClient } from "@/lib/supabase/server";

const toNumber = (value: string | null, fallback: number): number => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return n;
};

export async function GET(request: Request) {
  const supabase = createSupabasePublicClient();
  const { searchParams } = new URL(request.url);

  const provider = searchParams.get("provider") || "";
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "updated_desc";

  const page = Math.max(1, toNumber(searchParams.get("page"), 1));
  const pageSize = Math.max(1, Math.min(toNumber(searchParams.get("pageSize"), 24), 100));

  let query = supabase.from("public_products").select("*", { count: "exact" });

  if (provider) query = query.eq("provider", provider);
  if (category) query = query.eq("category", category);
  if (tag) query = query.contains("tags", [tag]);
  if (search) query = query.ilike("title", `%${search}%`);

  if (sort === "price_asc") query = query.order("price", { ascending: true });
  else if (sort === "price_desc") query = query.order("price", { ascending: false });
  else if (sort === "updated_asc") query = query.order("updated_at", { ascending: true });
  else query = query.order("pinned", { ascending: false }).order("updated_at", { ascending: false });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data ?? [],
    pagination: {
      total: count ?? 0,
      page,
      pageSize,
      pageCount: Math.max(1, Math.ceil((count ?? 0) / pageSize))
    }
  });
}
