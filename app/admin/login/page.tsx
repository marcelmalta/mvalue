"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const message = useMemo(() => {
    const code = searchParams.get("error");
    if (code === "forbidden") return "Sua conta nao possui permissao admin.";
    if (code === "missing_env") return "Configure SUPABASE_URL e SUPABASE_ANON_KEY.";
    return "";
  }, [searchParams]);

  const nextPath = searchParams.get("next") || "/admin";

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Falha ao obter usuario autenticado.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      await supabase.auth.signOut();
      setError("Conta sem permissao admin.");
      setLoading(false);
      return;
    }

    router.push(nextPath);
    router.refresh();
  };

  return (
    <main className="mx-auto flex min-h-[75vh] w-full max-w-md items-center">
      <section className="card w-full p-6">
        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-500">Acesso restrito para administradores.</p>

        {message ? <p className="mt-3 rounded-md bg-amber-50 p-2 text-sm text-amber-700">{message}</p> : null}
        {error ? <p className="mt-3 rounded-md bg-rose-50 p-2 text-sm text-rose-700">{error}</p> : null}

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">E-mail</label>
            <input
              className="admin-input"
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Senha</label>
            <input
              className="admin-input"
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
          </div>

          <button className="admin-btn w-full" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
