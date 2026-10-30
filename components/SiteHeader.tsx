"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";

const LINKS = [
  ["/#funcionalidades", "Funcionalidades"],
  ["/#area-do-aluno", "Área do Aluno"],
  ["/#como-funciona", "Como funciona"],
  ["/#diferenciais", "Diferenciais"],
  ["/#perguntas", "Perguntas"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" data-open={open}>
      <div className="wrap site-header-row">
        <Brand />
        <button type="button" className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
          <span className="menu-icon" aria-hidden="true" />
          <span>{open ? "Fechar" : "Menu"}</span>
        </button>
        <nav id="site-nav" className="site-nav" aria-label="Principal">
          <ul>
            {LINKS.map(([href, label]) => (
              <li key={href}><Link href={href} onClick={() => setOpen(false)}>{label}</Link></li>
            ))}
          </ul>
          <div className="site-nav-actions">
            <Link href="/demo" className="btn btn--ghost btn--small" onClick={() => setOpen(false)}>Demonstração</Link>
            <Link href="/tour" className="btn btn--primary btn--small" onClick={() => setOpen(false)}>Fazer o tour</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
