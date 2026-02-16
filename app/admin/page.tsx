import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";


const Card = ({ title, value, hint }: { title: string; value: string | number; hint?: string }) => (
  <article className="card p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
    <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
    {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
  </article>
);

export default async function AdminDashboardPage() {
  const supabase = createSupabaseServiceClient();

  const [providersRes, rulesRes, productsRes, runsRes, errorsRes] = await Promise.all([
    supabase.from("providers").select("id", { count: "exact", head: true }),
    supabase.from("import_rules").select("id", { count: "exact", head: true }).eq("enabled", true),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("import_runs").select("*").order("started_at", { ascending: false }).limit(1),
    supabase
      .from("import_runs")
      .select("*")
      .eq("status", "error")
      .order("started_at", { ascending: false })
      .limit(5)
  ]);

  const lastRun = runsRes.data?.[0];

  return (
    <main className="space-y-4">
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card title="Providers" value={providersRes.count ?? 0} />
        <Card title="Regras Ativas" value={rulesRes.count ?? 0} />
        <Card title="Produtos" value={productsRes.count ?? 0} />
        <Card
          title="Ultimo Run"
          value={lastRun ? String(lastRun.status).toUpperCase() : "-"}
          hint={lastRun ? new Date(lastRun.started_at).toLocaleString("pt-BR") : "Nenhum run ainda"}
        />
      </section>

      <section className="card p-4">
        <h2 className="text-lg font-bold text-slate-900">Erros recentes de importacao</h2>
        <div className="mt-3 space-y-2">
          {(errorsRes.data ?? []).length === 0 ? (
            <p className="text-sm text-slate-500">Sem erros recentes.</p>
          ) : (
            errorsRes.data?.map((item) => (
              <article key={item.id} className="rounded-lg border border-rose-100 bg-rose-50 p-3">
                <p className="text-xs font-bold uppercase text-rose-700">{item.status}</p>
                <p className="mt-1 text-sm text-rose-800">{item.error || "Erro nao informado"}</p>
                <p className="mt-1 text-xs text-rose-600">{new Date(item.started_at).toLocaleString("pt-BR")}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
