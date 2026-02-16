import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="card p-6">
        <h1 className="text-2xl font-bold text-slate-900">MValue.Shop</h1>
        <p className="mt-2 text-sm text-slate-600">
          Estrutura Next.js com API pública de produtos e painel administrativo completo.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/products" className="admin-btn">
            Ver vitrine pública
          </Link>
          <Link href="/admin" className="admin-btn-muted">
            Abrir admin
          </Link>
        </div>
      </section>
    </main>
  );
}
