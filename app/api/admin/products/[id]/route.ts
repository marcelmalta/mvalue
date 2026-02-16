import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/auth";

const patchSchema = z
  .object({
    custom_title: z.union([z.string().min(1), z.null()]).optional(),
    custom_price: z.union([z.number().positive(), z.null()]).optional(),
    custom_image_url: z.union([z.string().url(), z.null()]).optional(),
    custom_url: z.union([z.string().url(), z.null()]).optional(),
    pinned: z.boolean().optional(),
    hidden: z.boolean().optional()
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "Nenhum campo enviado para atualizacao"
  });

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminFromRequest();
  if ("response" in auth) return auth.response;

  const { id } = await context.params;

  const { data: product, error: productError } = await auth.supabase
    .from("products")
    .select("id")
    .eq("id", id)
    .single();

  if (productError || !product) {
    return NextResponse.json({ error: "Produto nao encontrado" }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload invalido", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data, error } = await auth.supabase
    .from("product_overrides")
    .upsert(
      {
        product_id: id,
        ...parsed.data
      },
      { onConflict: "product_id" }
    )
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
