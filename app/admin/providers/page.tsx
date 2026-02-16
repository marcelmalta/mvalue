"use client";

import { useEffect, useState } from "react";

type Provider = {
  id: string;
  name: string;
  enabled: boolean;
  config_json: Record<string, unknown>;
  created_at: string;
};

const providerOptions = ["mercadolivre", "amazon", "shopee", "magalu"];

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [newName, setNewName] = useState("mercadolivre");
  const [newEnabled, setNewEnabled] = useState(true);
  const [newConfig, setNewConfig] = useState("{}");

  const [configDrafts, setConfigDrafts] = useState<Record<string, string>>({});

  const fetchProviders = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/providers");
    const payload = await response.json();
    const data: Provider[] = payload.data ?? [];
    setProviders(data);

    const drafts: Record<string, string> = {};
    data.forEach((item) => {
      drafts[item.id] = JSON.stringify(item.config_json ?? {}, null, 2);
    });
    setConfigDrafts(drafts);

    setLoading(false);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const saveProvider = async (provider: Provider) => {
    setSavingId(provider.id);
    setMessage("");

    let parsedConfig: Record<string, unknown> = {};
    try {
      parsedConfig = JSON.parse(configDrafts[provider.id] || "{}");
    } catch {
      setMessage(`JSON invalido para provider ${provider.name}`);
      setSavingId(null);
      return;
    }

    const response = await fetch("/api/admin/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: provider.id,
        name: provider.name,
        enabled: provider.enabled,
        config_json: parsedConfig
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || "Erro ao salvar provider");
    } else {
      setMessage("Provider atualizado com sucesso");
      await fetchProviders();
    }

    setSavingId(null);
  };

  const createProvider = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setMessage("");

    let parsedConfig: Record<string, unknown> = {};
    try {
      parsedConfig = JSON.parse(newConfig || "{}");
    } catch {
      setMessage("JSON invalido no novo provider");
      return;
    }

    const response = await fetch("/api/admin/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        enabled: newEnabled,
        config_json: parsedConfig
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || "Erro ao criar provider");
      return;
    }

    setMessage("Provider criado");
    setNewConfig("{}");
    await fetchProviders();
  };

  return (
    <main className="space-y-4">
      <section className="card p-4">
        <h2 className="text-lg font-bold text-slate-900">Novo provider</h2>
        <form onSubmit={createProvider} className="mt-3 grid gap-3 sm:grid-cols-4">
          <select className="admin-input" value={newName} onChange={(ev) => setNewName(ev.target.value)}>
            {providerOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={newEnabled}
              onChange={(ev) => setNewEnabled(ev.target.checked)}
            />
            Enabled
          </label>

          <input
            className="admin-input sm:col-span-2"
            value={newConfig}
            onChange={(ev) => setNewConfig(ev.target.value)}
            placeholder='{"token": "..."}'
          />

          <button className="admin-btn sm:col-span-4" type="submit">
            Criar provider
          </button>
        </form>
        {message ? <p className="mt-2 text-sm text-slate-600">{message}</p> : null}
      </section>

      <section className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">Nome</th>
              <th className="px-3 py-2">Enabled</th>
              <th className="px-3 py-2">Config JSON</th>
              <th className="px-3 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-3 text-slate-500" colSpan={4}>
                  Carregando...
                </td>
              </tr>
            ) : (
              providers.map((provider) => (
                <tr key={provider.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-3 font-semibold text-slate-800">{provider.name}</td>
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={provider.enabled}
                      onChange={(ev) =>
                        setProviders((prev) =>
                          prev.map((item) =>
                            item.id === provider.id ? { ...item, enabled: ev.target.checked } : item
                          )
                        )
                      }
                    />
                  </td>
                  <td className="px-3 py-3">
                    <textarea
                      className="admin-input min-h-28 font-mono text-xs"
                      value={configDrafts[provider.id] ?? "{}"}
                      onChange={(ev) =>
                        setConfigDrafts((prev) => ({
                          ...prev,
                          [provider.id]: ev.target.value
                        }))
                      }
                    />
                  </td>
                  <td className="px-3 py-3">
                    <button
                      className="admin-btn"
                      onClick={() => saveProvider(provider)}
                      disabled={savingId === provider.id}
                    >
                      {savingId === provider.id ? "Salvando..." : "Salvar"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
