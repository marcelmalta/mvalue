"use client";

import { useEffect, useState } from "react";

type Provider = {
  id: string;
  name: string;
  enabled: boolean;
};

type Rule = {
  id: string;
  provider_id: string;
  name: string;
  query: string;
  category: string | null;
  tags: string[];
  enabled: boolean;
  schedule_minutes: number;
  last_run_at: string | null;
};

export default function AdminRulesPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [drafts, setDrafts] = useState<Record<string, Rule>>({});

  const [newRule, setNewRule] = useState({
    provider_id: "",
    name: "",
    query: "",
    category: "",
    tags: "",
    enabled: true,
    schedule_minutes: 60
  });

  const fetchAll = async () => {
    setLoading(true);

    const [providersRes, rulesRes] = await Promise.all([
      fetch("/api/admin/providers"),
      fetch("/api/admin/rules")
    ]);

    const providersPayload = await providersRes.json();
    const rulesPayload = await rulesRes.json();

    const providersData: Provider[] = providersPayload.data ?? [];
    const rulesData: Rule[] = (rulesPayload.data ?? []).map((item: any) => ({
      id: item.id,
      provider_id: item.provider_id,
      name: item.name,
      query: item.query,
      category: item.category,
      tags: item.tags ?? [],
      enabled: item.enabled,
      schedule_minutes: item.schedule_minutes,
      last_run_at: item.last_run_at
    }));

    setProviders(providersData);
    setRules(rulesData);

    if (!newRule.provider_id && providersData[0]) {
      setNewRule((prev) => ({ ...prev, provider_id: providersData[0].id }));
    }

    const draftsMap: Record<string, Rule> = {};
    rulesData.forEach((rule) => {
      draftsMap[rule.id] = { ...rule };
    });
    setDrafts(draftsMap);

    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const createRule = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setMessage("");

    const response = await fetch("/api/admin/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newRule,
        tags: newRule.tags,
        category: newRule.category || null
      })
    });

    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.error || "Erro ao criar regra");
      return;
    }

    setMessage("Regra criada com sucesso");
    setNewRule((prev) => ({ ...prev, name: "", query: "", category: "", tags: "" }));
    await fetchAll();
  };

  const saveRule = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;

    setMessage("");
    const response = await fetch("/api/admin/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...draft,
        tags: draft.tags.join(",")
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || "Erro ao salvar regra");
      return;
    }

    setMessage("Regra atualizada");
    await fetchAll();
  };

  const runNow = async (ruleId: string) => {
    setMessage("");
    const response = await fetch("/api/admin/import/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rule_id: ruleId, force: true })
    });

    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || "Erro ao rodar import");
      return;
    }

    setMessage(`Importacao executada (${payload.data?.status || "ok"})`);
    await fetchAll();
  };

  return (
    <main className="space-y-4">
      <section className="card p-4">
        <h2 className="text-lg font-bold text-slate-900">Nova regra de importacao</h2>

        <form className="mt-3 grid gap-2 sm:grid-cols-2" onSubmit={createRule}>
          <select
            className="admin-input"
            value={newRule.provider_id}
            onChange={(ev) => setNewRule((prev) => ({ ...prev, provider_id: ev.target.value }))}
            required
          >
            <option value="">Selecione provider</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>

          <input
            className="admin-input"
            placeholder="Nome da regra"
            value={newRule.name}
            onChange={(ev) => setNewRule((prev) => ({ ...prev, name: ev.target.value }))}
            required
          />

          <input
            className="admin-input"
            placeholder="Query ex: iphone 15"
            value={newRule.query}
            onChange={(ev) => setNewRule((prev) => ({ ...prev, query: ev.target.value }))}
            required
          />

          <input
            className="admin-input"
            placeholder="Categoria"
            value={newRule.category}
            onChange={(ev) => setNewRule((prev) => ({ ...prev, category: ev.target.value }))}
          />

          <input
            className="admin-input"
            placeholder="Tags separadas por virgula"
            value={newRule.tags}
            onChange={(ev) => setNewRule((prev) => ({ ...prev, tags: ev.target.value }))}
          />

          <input
            className="admin-input"
            type="number"
            min={1}
            value={newRule.schedule_minutes}
            onChange={(ev) =>
              setNewRule((prev) => ({ ...prev, schedule_minutes: Number(ev.target.value || 60) }))
            }
          />

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={newRule.enabled}
              onChange={(ev) => setNewRule((prev) => ({ ...prev, enabled: ev.target.checked }))}
            />
            Regra ativa
          </label>

          <button className="admin-btn sm:col-span-2" type="submit">
            Criar regra
          </button>
        </form>

        {message ? <p className="mt-2 text-sm text-slate-600">{message}</p> : null}
      </section>

      <section className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">Regra</th>
              <th className="px-3 py-2">Query</th>
              <th className="px-3 py-2">Categoria</th>
              <th className="px-3 py-2">Tags</th>
              <th className="px-3 py-2">Min</th>
              <th className="px-3 py-2">Ativa</th>
              <th className="px-3 py-2">Ultimo run</th>
              <th className="px-3 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-3 py-3 text-slate-500">
                  Carregando...
                </td>
              </tr>
            ) : (
              rules.map((rule) => {
                const draft = drafts[rule.id] || rule;
                return (
                  <tr key={rule.id} className="border-b border-slate-100 align-top">
                    <td className="px-3 py-2">
                      <input
                        className="admin-input"
                        value={draft.name}
                        onChange={(ev) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [rule.id]: { ...draft, name: ev.target.value }
                          }))
                        }
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="admin-input"
                        value={draft.query}
                        onChange={(ev) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [rule.id]: { ...draft, query: ev.target.value }
                          }))
                        }
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="admin-input"
                        value={draft.category ?? ""}
                        onChange={(ev) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [rule.id]: { ...draft, category: ev.target.value || null }
                          }))
                        }
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="admin-input"
                        value={(draft.tags ?? []).join(",")}
                        onChange={(ev) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [rule.id]: {
                              ...draft,
                              tags: ev.target.value
                                .split(",")
                                .map((item) => item.trim())
                                .filter(Boolean)
                            }
                          }))
                        }
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        className="admin-input"
                        type="number"
                        min={1}
                        value={draft.schedule_minutes}
                        onChange={(ev) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [rule.id]: { ...draft, schedule_minutes: Number(ev.target.value || 60) }
                          }))
                        }
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={draft.enabled}
                        onChange={(ev) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [rule.id]: { ...draft, enabled: ev.target.checked }
                          }))
                        }
                      />
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-500">
                      {rule.last_run_at ? new Date(rule.last_run_at).toLocaleString("pt-BR") : "-"}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button className="admin-btn" onClick={() => saveRule(rule.id)}>
                          Salvar
                        </button>
                        <button className="admin-btn-muted" onClick={() => runNow(rule.id)}>
                          Rodar agora
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
