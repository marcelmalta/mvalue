import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/providers", label: "Providers" },
  { href: "/admin/rules", label: "Regras" },
  { href: "/admin/products", label: "Produtos" },
  { href: "/admin/runs", label: "Runs" }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <div className="space-y-4">
      <header className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Painel Admin MValue</h1>
          <p className="text-xs text-slate-500">Usuario: {user.email}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="admin-btn-muted">
              {item.label}
            </Link>
          ))}
          <AdminSignOutButton />
        </div>
      </header>

      {children}
    </div>
  );
}
