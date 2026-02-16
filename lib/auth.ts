import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AdminGuardSuccess {
  supabase: ReturnType<typeof createSupabaseServerClient>;
  user: User;
}

export interface AdminGuardError {
  response: NextResponse;
}

const forbidden = (message: string, status = 403): NextResponse =>
  NextResponse.json({ error: message }, { status });

export const requireAdminFromRequest = async (
  _request?: NextRequest
): Promise<AdminGuardSuccess | AdminGuardError> => {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { response: forbidden("Nao autenticado", 401) };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    return { response: forbidden("Acesso restrito a administradores") };
  }

  return { supabase, user };
};

export const assertCronSecret = (request: NextRequest): boolean => {
  const auth = request.headers.get("authorization") ?? "";
  const tokenFromAuth = auth.startsWith("Bearer ") ? auth.replace("Bearer ", "") : "";
  const tokenFromHeader = request.headers.get("x-cron-secret") ?? "";
  const token = tokenFromAuth || tokenFromHeader;

  return Boolean(token) && token === process.env.CRON_SECRET;
};
