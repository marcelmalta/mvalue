import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MValue Admin",
  description: "Painel admin para integracoes e curadoria de produtos"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">{children}</div>
      </body>
    </html>
  );
}
