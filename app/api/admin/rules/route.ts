import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/auth";
import { parseTags } from "@/lib/utils";

const ruleSchema = z.object({
  id: z.string().uuid().optional(),
  provider_id: z.string().uuid(),
  name: z.string().min(2),
  query: z.string().min(2),
  category: z.string().nullable().optional(),
  tags: z.union([z.array(z.string()), z.string()]).optional(),
  enabled: z.boolean().default(true),
  schedule_minutes: z.number().int().min(1).max(1440).default(60)
});

export async function GET() {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const { data, error } = await auth.supabase
    .from("import_rules")
    .select("*, providers(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const body = await request.json().catch(() => ({}));
  const parsed = ruleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload invalido", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const payload = parsed.data;
  const tags = parseTags(payload.tags);

  if (payload.id) {
    const { data, error } = await auth.supabase
      .from("import_rules")
      .update({
        provider_id: payload.provider_id,
        name: payload.name,
        query: payload.query,
        category: payload.category ?? null,
        tags,
        enabled: payload.enabled,
        schedule_minutes: payload.schedule_minutes
      })
      .eq("id", payload.id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, mode: "updated" });
  }

  const { data, error } = await auth.supabase
    .from("import_rules")
    .insert({
      provider_id: payload.provider_id,
      name: payload.name,
      query: payload.query,
      category: payload.category ?? null,
      tags,
      enabled: payload.enabled,
      schedule_minutes: payload.schedule_minutes
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, mode: "created" }, { status: 201 });
}
