import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="not-found">
        <h1 className="poster">Página não encontrada</h1>
        <p>O endereço pode ter mudado ou estar digitado errado. Volte ao início ou siga para o tour.</p>
        <div className="hero-actions">
          <Link href="/" className="btn btn--primary">Ir para o início</Link>
          <Link href="/tour" className="btn btn--ghost">Fazer o tour</Link>
        </div>
      </main>
    </>
  );
}
