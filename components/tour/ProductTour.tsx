"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";
import { TOUR_STEPS } from "@/data/tour";
import { currentStep, isEnd, isIntro, keyToAction, progress, tourReducer, tourStart } from "@/lib/tour";
import { BrandMark } from "@/components/Brand";
import { PhoneFrame, ScreenFrame } from "@/components/Screens";

const TOTAL = TOUR_STEPS.length;

export function ProductTour() {
  const router = useRouter();
  const [state, dispatch] = useReducer(tourReducer, TOTAL, tourStart);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const stepNumber = currentStep(state);
  const step = stepNumber ? TOUR_STEPS[stepNumber - 1] : null;

  // Teclado: setas avançam e voltam, Home reinicia, End encerra, Esc sai do tour.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (e.altKey || e.ctrlKey || e.metaKey || (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))) return;
      if (e.key === "Escape") { router.push("/"); return; }
      const action = keyToAction(e.key);
      if (action) { e.preventDefault(); dispatch(action); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  // Leva o foco para o título a cada troca de etapa (leitores de tela anunciam a nova etapa).
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [state.position]);

  return (
    <div className="tour">
      <header className="tour-bar">
        <Link href="/" className="brand brand--light tour-brand" aria-label="Kombexa, voltar à página inicial"><BrandMark size={26} /><span className="brand-name">Kombexa</span></Link>
        <span className="tour-bar-title">Product Tour</span>
        <div className="tour-progress" role="progressbar" aria-label="Progresso do tour" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress(state) * 100)}>
          <span style={{ transform: `scaleX(${progress(state)})` }} />
        </div>
        <Link href="/" className="tour-close">Encerrar<span className="visually-hidden"> o tour e voltar ao site</span></Link>
      </header>

      <main id="conteudo" className="tour-main">
        {isIntro(state) && (
          <section className="tour-intro" aria-labelledby="tour-heading">
            <h1 id="tour-heading" ref={heading} tabIndex={-1} className="poster">Um passeio pelo Kombexa</h1>
            <p>Em {TOTAL} etapas curtas, você vê as telas reais do sistema na ordem do dia a dia de uma academia: da tela Início à Área do Aluno. Nenhuma conta é necessária e os dados mostrados são fictícios.</p>
            <div className="tour-intro-actions">
              <button type="button" className="btn btn--primary" onClick={() => dispatch({ type: "next" })} autoFocus>Começar o tour</button>
              <Link href="/demo" className="btn btn--on-dark">Prefiro mexer na demonstração</Link>
            </div>
            <p className="tour-keys">Use as setas <kbd>←</kbd> <kbd>→</kbd> do teclado para navegar e <kbd>Esc</kbd> para sair.</p>
            <ScreenFrame screen="dashboard" priority sizes="(min-width: 1100px) 900px, 100vw" className="tour-intro-screen" />
          </section>
        )}

        {step && stepNumber && (
          <section key={step.id} className="tour-step" aria-labelledby="tour-heading">
            <div className="tour-copy">
              <p className="tour-count" aria-live="polite">Etapa {stepNumber} de {TOTAL}: {step.label}</p>
              <h1 id="tour-heading" ref={heading} tabIndex={-1}>{step.title}</h1>
              <p className="tour-text">{step.text}</p>
              <ul className="tick-list tick-list--dark">
                {step.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div className={`tour-visual${step.phone ? " tour-visual--phone" : ""}`}>
              <ScreenFrame screen={step.screen} priority sizes="(min-width: 1100px) 820px, 100vw" />
              {step.phone && <PhoneFrame screen={step.phone} sizes="(min-width: 1100px) 200px, 30vw" className="tour-phone" />}
            </div>
          </section>
        )}

        {isEnd(state) && (
          <section className="tour-end" aria-labelledby="tour-heading">
            <h1 id="tour-heading" ref={heading} tabIndex={-1} className="poster">Você viu o essencial</h1>
            <p>Agora experimente: na demonstração interativa você recebe mensalidades, registra presenças pelo código da carteirinha, publica comunicados e muda a identidade da academia. Nada é salvo.</p>
            <div className="tour-intro-actions">
              <Link href="/demo" className="btn btn--primary">Abrir a demonstração</Link>
              <button type="button" className="btn btn--on-dark" onClick={() => dispatch({ type: "restart" })}>Reiniciar o tour</button>
              <Link href="/" className="btn btn--on-dark">Voltar ao site</Link>
            </div>
          </section>
        )}
      </main>

      {!isIntro(state) && (
        <nav className="tour-nav" aria-label="Navegação do tour">
          <button type="button" className="btn btn--on-dark" onClick={() => dispatch({ type: "prev" })}>Anterior</button>
          <ol className="tour-dots">
            {TOUR_STEPS.map((s, i) => (
              <li key={s.id}>
                <button type="button" aria-label={`Etapa ${i + 1}: ${s.label}`} aria-current={stepNumber === i + 1 ? "step" : undefined} onClick={() => dispatch({ type: "goto", position: i + 1 })}>
                  <span className="tour-dot-label">{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
          {isEnd(state)
            ? <button type="button" className="btn btn--primary" onClick={() => dispatch({ type: "restart" })}>Reiniciar</button>
            : <button type="button" className="btn btn--primary" onClick={() => dispatch({ type: "next" })}>{stepNumber === TOTAL ? "Concluir" : "Próximo"}</button>}
        </nav>
      )}
    </div>
  );
}
