"use client";

import { useRef, useState } from "react";
import { FEATURES } from "@/data/features";
import { ScreenFrame } from "./Screens";

/** Funcionalidades em abas (padrão WAI-ARIA: setas trocam de aba, Home e End vão às pontas). */
export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = FEATURES.length - 1;
    const map: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: last };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + FEATURES.length) % FEATURES.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="features">
      <div className="features-list" role="tablist" aria-label="Funcionalidades do Kombexa" aria-orientation="vertical">
        {FEATURES.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`tab-${f.id}`}
            aria-selected={active === i}
            aria-controls={`painel-${f.id}`}
            tabIndex={active === i ? 0 : -1}
            className="features-tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {f.name}
          </button>
        ))}
      </div>
      {FEATURES.map((f, i) => (
        <div key={f.id} role="tabpanel" id={`painel-${f.id}`} aria-labelledby={`tab-${f.id}`} hidden={active !== i} className="features-panel">
          <div className="features-copy">
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <ul className="tick-list">
              {f.benefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
          <ScreenFrame screen={f.screen} sizes="(min-width: 1100px) 820px, 100vw" />
        </div>
      ))}
    </div>
  );
}
