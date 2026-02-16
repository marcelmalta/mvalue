"use client";

import { useEffect, useMemo, useState } from "react";

type Provider = {
  id: string;
  name: string;
};

type ProductItem = {
  id: string;
  provider: string;
  title: string;
  price: number;
  currency: string;
  image_url: string | null;
  product_url: string | null;
  category: string | null;
  tags: string[];
  updated_at: string;
  effective_title: string;
  effective_price: number;
  effective_image_url: string | null;
  effective_url: string | null;
  pinned: boolean;
  hidden: boolean;
  override: {
    custom_title: string | null;
    custom_price: number | null;
    custom_image_url: string | null;
    custom_url: string | null;
    pinned: boolean;
    hidden: boolean;
  } | null;
};

type Filters = {
  provider: string;
  category: string;
  tag: string;
  search: string;
  hidden: string;
  pinned: string;
  sort: string;
  page: number;
  pageSize: number;
};

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function AdminProductsPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [items, setItems] = useState<ProductItem[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pageSize: 20, pageCount: 1 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [filters, setFilters] = useState<Filters>({
    provider: "",
    category: "",
    tag: "",
    search: "",
    hidden: "",
    pinned: "",
    sort: "updated_desc",
    page: 1,
    pageSize: 20
  });

  const [editing, setEditing] = useState<ProductItem | null>(null);
  const [overrideForm, setOverrideForm] = useState({
    custom_title: "",
    custom_price: "",
    custom_image_url: "",
    custom_url: "",
    pinned: false,
    hidden: false
  });

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value === "" || value == null) return;
      params.set(key, String(value));
    });
    return params.toString();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(`/api/admin/products?${queryString}`);
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.error || "Erro ao carregar produtos");
      setItems([]);
      setLoading(false);
      return;
    }

    setItems(payload.data ?? []);
    setPagination(payload.pagination ?? { total: 0, page: 1, pageSize: 20, pageCount: 1 });
    setLoading(false);
  };

  const fetchProviders = async () => {
    const response = await fetch("/api/admin/providers");
    const payload = await response.json();
    setProviders(payload.data ?? []);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [queryString]);

  const patchProduct = async (id: string, payload: Record<string, unknown>) => {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Erro ao atualizar produto");
      return false;
    }

    setMessage("Produto atualizado");
    await fetchProducts();
    return true;
  };

  const openOverrideModal = (item: ProductItem) => {
    setEditing(item);
    setOverrideForm({
      custom_title: item.override?.custom_title ?? "",
      custom_price: item.override?.custom_price != null ? String(item.override.custom_price) : "",
      custom_image_url: item.override?.custom_image_url ?? "",
      custom_url: item.override?.custom_url ?? "",
      pinned: item.pinned,
      hidden: item.hidden
    });
  };

  const saveOverride = async () => {
    if (!editing) return;

    const payload: Record<string, unknown> = {
      custom_title: overrideForm.custom_title.trim() || null,
      custom_price: overrideForm.custom_price.trim() ? Number(overrideForm.custom_price) : null,
      custom_image_url: overrideForm.custom_image_url.trim() || null,
      custom_url: overrideForm.custom_url.trim() || null,
      pinned: overrideForm.pinned,
      hidden: overrideForm.hidden
    };

    const ok = await patchProduct(editing.id, payload);
    if (ok) {
      setEditing(null);
    }
  };

  return (
    <main className="space-y-4">
      <section className="card p-4">
        <h2 className="text-lg font-bold text-slate-900">Produtos importados</h2>
        <p className="mt-1 text-xs text-slate-500">Filtros, curadoria e override da vitrine pública.</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          <select
            className="admin-input"
            value={filters.provider}
            onChange={(ev) => setFilters((prev) => ({ ...prev, provider: ev.target.value, page: 1 }))}
          >
            <option value="">Todos providers</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>

          <input
            className="admin-input"
            placeholder="Categoria"
            value={filters.category}
            onChange={(ev) => setFilters((prev) => ({ ...prev, category: ev.target.value, page: 1 }))}
          />

          <input
            className="admin-input"
            placeholder="Tag"
            value={filters.tag}
            onChange={(ev) => setFilters((prev) => ({ ...prev, tag: ev.target.value, page: 1 }))}
          />

          <input
            className="admin-input"
            placeholder="Busca por titulo"
            value={filters.search}
            onChange={(ev) => setFilters((prev) => ({ ...prev, search: ev.target.value, page: 1 }))}
          />

          <select
            className="admin-input"
            value={filters.hidden}
            onChange={(ev) => setFilters((prev) => ({ ...prev, hidden: ev.target.value, page: 1 }))}
          >
            <option value="">Hidden: todos</option>
            <option value="false">Somente visíveis</option>
            <option value="true">Somente ocultos</option>
          </select>

          <select
            className="admin-input"
            value={filters.pinned}
            onChange={(ev) => setFilters((prev) => ({ ...prev, pinned: ev.target.value, page: 1 }))}
          >
            <option value="">Pin: todos</option>
            <option value="true">Somente fixados</option>
            <option value="false">Nao fixados</option>
          </select>

          <select
            className="admin-input"
            value={filters.sort}
            onChange={(ev) => setFilters((prev) => ({ ...prev, sort: ev.target.value }))}
          >
            <option value="updated_desc">Mais recentes</option>
            <option value="updated_asc">Mais antigos</option>
            <option value="price_asc">Preco crescente</option>
            <option value="price_desc">Preco decrescente</option>
            <option value="pinned_desc">Fixados primeiro</option>
          </select>

          <select
            className="admin-input"
            value={filters.pageSize}
            onChange={(ev) =>
              setFilters((prev) => ({ ...prev, pageSize: Number(ev.target.value), page: 1 }))
            }
          >
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
            <option value={100}>100 por página</option>
          </select>
        </div>

        {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
      </section>

      <section className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">Produto</th>
              <th className="px-3 py-2">Provider</th>
              <th className="px-3 py-2">Preço</th>
              <th className="px-3 py-2">Flags</th>
              <th className="px-3 py-2">Atualizado</th>
              <th className="px-3 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-3 text-slate-500" colSpan={6}>
                  Carregando...
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <div className="h-14 w-14 overflow-hidden rounded-lg bg-slate-100">
                        {item.effective_image_url ? (
                          <img
                            src={item.effective_image_url}
                            alt={item.effective_title}
                            className="h-full w-full object-contain"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 font-semibold text-slate-800">{item.effective_title}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.tags.join(", ") || "sem tags"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 uppercase text-slate-700">{item.provider}</td>
                  <td className="px-3 py-3 font-bold text-brand-600">{BRL.format(item.effective_price)}</td>
                  <td className="px-3 py-3 text-xs">
                    <span className={item.pinned ? "text-amber-700" : "text-slate-400"}>PIN</span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span className={item.hidden ? "text-rose-700" : "text-slate-400"}>HIDDEN</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-500">
                    {new Date(item.updated_at).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="admin-btn-muted"
                        onClick={() => patchProduct(item.id, { pinned: !item.pinned })}
                      >
                        {item.pinned ? "Desfixar" : "Fixar"}
                      </button>
                      <button
                        className="admin-btn-muted"
                        onClick={() => patchProduct(item.id, { hidden: !item.hidden })}
                      >
                        {item.hidden ? "Mostrar" : "Ocultar"}
                      </button>
                      <button className="admin-btn" onClick={() => openOverrideModal(item)}>
                        Override
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {pagination.total} itens - página {pagination.page} de {pagination.pageCount}
        </p>
        <div className="flex gap-2">
          <button
            className="admin-btn-muted"
            disabled={filters.page <= 1}
            onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
          >
            Anterior
          </button>
          <button
            className="admin-btn-muted"
            disabled={filters.page >= pagination.pageCount}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: Math.min(pagination.pageCount, prev.page + 1) }))
            }
          >
            Próxima
          </button>
        </div>
      </section>

      {editing ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 px-4">
          <div className="card w-full max-w-2xl p-4">
            <h3 className="text-lg font-bold text-slate-900">Override do produto</h3>
            <p className="mt-1 text-sm text-slate-500">{editing.effective_title}</p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input
                className="admin-input"
                placeholder="Titulo custom"
                value={overrideForm.custom_title}
                onChange={(ev) => setOverrideForm((prev) => ({ ...prev, custom_title: ev.target.value }))}
              />
              <input
                className="admin-input"
                placeholder="Preco custom"
                type="number"
                step="0.01"
                value={overrideForm.custom_price}
                onChange={(ev) => setOverrideForm((prev) => ({ ...prev, custom_price: ev.target.value }))}
              />
              <input
                className="admin-input"
                placeholder="Imagem custom (URL)"
                value={overrideForm.custom_image_url}
                onChange={(ev) =>
                  setOverrideForm((prev) => ({ ...prev, custom_image_url: ev.target.value }))
                }
              />
              <input
                className="admin-input"
                placeholder="Link custom (URL)"
                value={overrideForm.custom_url}
                onChange={(ev) => setOverrideForm((prev) => ({ ...prev, custom_url: ev.target.value }))}
              />

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={overrideForm.pinned}
                  onChange={(ev) => setOverrideForm((prev) => ({ ...prev, pinned: ev.target.checked }))}
                />
                Fixar produto
              </label>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={overrideForm.hidden}
                  onChange={(ev) => setOverrideForm((prev) => ({ ...prev, hidden: ev.target.checked }))}
                />
                Ocultar produto
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="admin-btn-muted" onClick={() => setEditing(null)}>
                Cancelar
              </button>
              <button className="admin-btn" onClick={saveOverride}>
                Salvar override
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
