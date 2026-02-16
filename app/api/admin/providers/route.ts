import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/auth";

const providerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.enum(["mercadolivre", "amazon", "shopee", "magalu"]),
  enabled: z.boolean().default(true),
  config_json: z.record(z.any()).default({})
});

export async function GET(request: Request) {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const { data, error } = await auth.supabase
    .from("providers")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const body = await request.json().catch(() => ({}));
  const parsed = providerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload invalido", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const payload = parsed.data;

  if (payload.id) {
    const { data, error } = await auth.supabase
      .from("providers")
      .update({
        name: payload.name,
        enabled: payload.enabled,
        config_json: payload.config_json
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
    .from("providers")
    .insert({
      name: payload.name,
      enabled: payload.enabled,
      config_json: payload.config_json
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, mode: "created" }, { status: 201 });
}
