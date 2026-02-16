"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminSignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="admin-btn-muted"
      onClick={async () => {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
      }}
    >
      Sair
    </button>
  );
}
