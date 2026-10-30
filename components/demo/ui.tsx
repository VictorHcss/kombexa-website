"use client";

import { useEffect, useRef } from "react";
import type { Branding, FeeStatus } from "@/lib/demo";

const TONE: Record<string, string> = {
  paga: "ok", "em dia": "ok", ativo: "ok", Presente: "ok",
  atrasada: "danger", atrasado: "danger",
  "a vencer": "warn", "em aberto": "muted", inativo: "muted",
};

export function Badge({ children }: { children: FeeStatus | string }) {
  const label = String(children);
  return <span className={`d-badge d-badge--${TONE[label] ?? "muted"}`}>{label.charAt(0).toUpperCase() + label.slice(1)}</span>;
}

/** Diálogo modal nativo: o navegador cuida do foco, do Esc e do fundo inerte. */
export function Dialog({ open, onClose, title, children, wide = false }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`d-dialog${wide ? " d-dialog--wide" : ""}`}
      aria-labelledby="d-dialog-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="d-dialog-body">
        <header className="d-dialog-head">
          <h2 id="d-dialog-title">{title}</h2>
          <button type="button" className="d-icon-button" onClick={onClose} aria-label="Fechar">×</button>
        </header>
        {open && children}
      </div>
    </dialog>
  );
}

/** Marca da academia na demonstração: a imagem escolhida pelo visitante ou as iniciais. */
export function AcademyMark({ branding, size = 44 }: { branding: Branding; size?: number }) {
  if (branding.logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element -- imagem local do visitante (blob:), nunca enviada a servidor
    return <img src={branding.logoUrl} alt="" width={size} height={size} className="d-academy-mark d-academy-mark--img" />;
  }
  return (
    <span className="d-academy-mark" style={{ width: size, height: size, background: branding.color, fontSize: size * 0.38 }} aria-hidden="true">
      {branding.initials}
    </span>
  );
}

/**
 * Padrão de quadrados que lembra um QR Code, gerado a partir do código do aluno.
 * É só ilustrativo: não é um QR Code válido e não pode ser lido.
 */
export function FakeQr({ code, size = 168 }: { code: string; size?: number }) {
  const n = 21;
  let h = 2166136261;
  for (const c of code) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue;
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      if ((h >>> 0) % 100 < 46) cells.push([x, y]);
    }
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="#111315" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#111315" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} width={size} height={size} role="img" aria-label="QR Code ilustrativo da carteirinha (não é um código válido)" className="d-qr" shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={n + 2} height={n + 2} fill="#fff" />
      {cells.map(([x, y]) => <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill="#111315" />)}
      {eye(0, 0)}{eye(n - 7, 0)}{eye(0, n - 7)}
    </svg>
  );
}

/** Mensagem de retorno das ações (pagamento registrado, presença, erros). */
export function Notice({ notice, onClose }: { notice: { tone: "ok" | "danger"; text: string } | null; onClose: () => void }) {
  return (
    <div className="d-notice-slot" aria-live="polite" role="status">
      {notice && (
        <div className={`d-notice d-notice--${notice.tone}`}>
          <span>{notice.text}</span>
          <button type="button" onClick={onClose} aria-label="Fechar aviso">×</button>
        </div>
      )}
    </div>
  );
}
