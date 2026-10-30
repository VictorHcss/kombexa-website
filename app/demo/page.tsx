import type { Metadata } from "next";
import { DemoLoader } from "@/components/demo/DemoLoader";

export const metadata: Metadata = {
  title: "Demonstração interativa",
  description: "Explore o Kombexa sem criar conta: receba mensalidades, registre presenças pelo código da carteirinha, publique comunicados e veja a Área do Aluno. Dados fictícios, nada é salvo.",
  alternates: { canonical: "/demo" },
  openGraph: { url: "/demo", title: "Demonstração interativa do Kombexa" },
};

export default function DemoPage() {
  return (
    <main id="conteudo">
      <h1 className="visually-hidden">Demonstração interativa do Kombexa</h1>
      <DemoLoader />
    </main>
  );
}
