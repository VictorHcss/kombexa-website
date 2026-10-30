import Link from "next/link";
import { BrandMark } from "./Brand";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-grid">
        <div className="site-footer-brand">
          <span className="brand brand--light"><BrandMark /><span className="brand-name">Kombexa</span></span>
          <p>Gestão para academias de artes marciais e esportes de combate.</p>
        </div>
        <nav aria-label="Rodapé: produto">
          <h2>Produto</h2>
          <ul>
            <li><Link href="/#funcionalidades">Funcionalidades</Link></li>
            <li><Link href="/#area-do-aluno">Área do Aluno</Link></li>
            <li><Link href="/#diferenciais">Diferenciais</Link></li>
            <li><Link href="/#perguntas">Perguntas frequentes</Link></li>
          </ul>
        </nav>
        <nav aria-label="Rodapé: conhecer">
          <h2>Conhecer</h2>
          <ul>
            <li><Link href="/tour">Product Tour</Link></li>
            <li><Link href="/demo">Demonstração interativa</Link></li>
            <li><a href={SITE.repository} rel="noopener noreferrer" target="_blank">Código no GitHub<span className="visually-hidden"> (abre em nova aba)</span></a></li>
            <li><Link href="/privacidade">Privacidade deste site</Link></li>
          </ul>
        </nav>
      </div>
      <div className="wrap site-footer-legal">
        <p>Kombexa é um projeto de código aberto sob licença MIT. As telas mostradas usam apenas dados fictícios.</p>
      </div>
    </footer>
  );
}
