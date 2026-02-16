import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, requireEnv } from "@/lib/env";

export const createSupabaseServerClient = (): SupabaseClient => {
  requireEnv("SUPABASE_URL", "SUPABASE_ANON_KEY");
  const cookieStorePromise = cookies();
  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      async get(name: string) {
        const cookieStore = await cookieStorePromise;
        return cookieStore.get(name)?.value;
      },
      async set(name: string, value: string, options: Record<string, unknown>) {
        const cookieStore = await cookieStorePromise;
        try {
          cookieStore.set(name, value, options);
        } catch {
          // noop in Server Components where set is not available
        }
      },
      async remove(name: string, options: Record<string, unknown>) {
        const cookieStore = await cookieStorePromise;
        try {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        } catch {
          // noop in Server Components where set is not available
        }
      }
    }
  });
};

export const createSupabaseServiceClient = (): SupabaseClient => {
  requireEnv("SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY");
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export const createSupabasePublicClient = (): SupabaseClient => {
  requireEnv("SUPABASE_URL", "SUPABASE_ANON_KEY");
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
