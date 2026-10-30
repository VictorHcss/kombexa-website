"use client";

import dynamic from "next/dynamic";

/**
 * A demonstração usa a data do navegador para montar os vencimentos, então só roda no cliente
 * (assim o HTML do servidor nunca diverge da tela).
 */
const DemoApp = dynamic(() => import("./DemoApp"), {
  ssr: false,
  loading: () => <div className="demo-loading" role="status">Preparando a demonstração…</div>,
});

export function DemoLoader() {
  return <DemoApp />;
}
