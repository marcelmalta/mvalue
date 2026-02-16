"use client";

import { useEffect, useState } from "react";

type RunItem = {
  id: string;
  status: string;
  started_at: string;
  finished_at: string | null;
  items_fetched: number;
  items_upserted: number;
  error: string | null;
  providers?: { name: string } | null;
  import_rules?: { name: string; query: string } | null;
};

export default function AdminRunsPage() {
  const [runs, setRuns] = useState<RunItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchRuns = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/runs?limit=120");
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.error || "Erro ao carregar runs");
      setRuns([]);
      setLoading(false);
      return;
    }

    setRuns(payload.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  return (
    <main className="space-y-4">
      <section className="card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Logs de importacao</h2>
          <button className="admin-btn-muted" onClick={fetchRuns}>
            Atualizar
          </button>
        </div>
        {message ? <p className="mt-2 text-sm text-slate-600">{message}</p> : null}
      </section>

      <section className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Provider</th>
              <th className="px-3 py-2">Regra</th>
              <th className="px-3 py-2">Inicio</th>
              <th className="px-3 py-2">Fim</th>
              <th className="px-3 py-2">Fetched</th>
              <th className="px-3 py-2">Upserted</th>
              <th className="px-3 py-2">Erro</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-3 text-slate-500" colSpan={8}>
                  Carregando...
                </td>
              </tr>
            ) : runs.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-slate-500" colSpan={8}>
                  Nenhum run encontrado.
                </td>
              </tr>
            ) : (
              runs.map((run) => (
                <tr key={run.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-3">
                    <span
                      className={
                        run.status === "success"
                          ? "font-bold text-emerald-700"
                          : run.status === "error"
                            ? "font-bold text-rose-700"
                            : "font-bold text-amber-700"
                      }
                    >
                      {run.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 uppercase text-slate-700">{run.providers?.name || "-"}</td>
                  <td className="px-3 py-3 text-slate-700">
                    {run.import_rules?.name || "-"}
                    <p className="text-xs text-slate-500">{run.import_rules?.query || ""}</p>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-500">
                    {new Date(run.started_at).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-500">
                    {run.finished_at ? new Date(run.finished_at).toLocaleString("pt-BR") : "-"}
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{run.items_fetched}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{run.items_upserted}</td>
                  <td className="px-3 py-3 text-xs text-rose-700">{run.error || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
