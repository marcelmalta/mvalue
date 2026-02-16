import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env, requireEnv } from "@/lib/env";

let browserClient: SupabaseClient | null = null;

export const createSupabaseBrowserClient = (): SupabaseClient => {
  requireEnv("SUPABASE_URL", "SUPABASE_ANON_KEY");
  if (!browserClient) {
    browserClient = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
  }
  return browserClient;
};
