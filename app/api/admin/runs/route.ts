import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const { searchParams } = new URL(request.url);
  const limit = Math.max(1, Math.min(Number(searchParams.get("limit") ?? 50), 200));

  const { data, error } = await auth.supabase
    .from("import_runs")
    .select("*, providers(name), import_rules(name, query)")
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
