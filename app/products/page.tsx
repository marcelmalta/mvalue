"use client";

import { useEffect, useMemo, useState } from "react";

type PublicProduct = {
  id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string | null;
  product_url: string | null;
  provider: string;
  pinned: boolean;
  category: string | null;
};

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function PublicProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async (term = "") => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", "24");
    if (term.trim()) params.set("search", term.trim());

    const response = await fetch(`/api/public/products?${params.toString()}`, {
      method: "GET"
    });
    const payload = await response.json();
    setProducts(payload.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const countLabel = useMemo(() => {
    if (loading) return "Carregando...";
    return `${products.length} itens exibidos`;
  }, [loading, products.length]);

  return (
    <main className="space-y-4">
      <section className="card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-slate-900">Vitrine pública (API)</h1>
          <span className="text-sm text-slate-500">{countLabel}</span>
        </div>

        <form
          className="mt-3 flex gap-2"
          onSubmit={(ev) => {
            ev.preventDefault();
            fetchProducts(search);
          }}
        >
          <input
            className="admin-input"
            placeholder="Buscar iPhone, Samsung, Xiaomi..."
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <button className="admin-btn" type="submit">
            Buscar
          </button>
        </form>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((item) => (
          <article key={item.id} className="card p-3">
            {item.pinned ? (
              <span className="mb-2 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                Destaque
              </span>
            ) : null}
            <div className="h-28 w-full overflow-hidden rounded-lg bg-slate-100">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="h-full w-full object-contain" />
              ) : null}
            </div>
            <p className="mt-2 line-clamp-2 text-sm font-semibold text-slate-800">{item.title}</p>
            <p className="mt-1 text-xs uppercase text-slate-500">{item.provider}</p>
            <p className="mt-2 text-base font-black text-brand-600">{BRL.format(item.price)}</p>
            {item.product_url ? (
              <a
                className="mt-2 inline-flex text-xs font-semibold"
                href={item.product_url}
                target="_blank"
                rel="noreferrer"
              >
                Ver oferta
              </a>
            ) : null}
          </article>
        ))}
      </section>
    </main>
  );
}
