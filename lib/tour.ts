/**
 * Lógica do Product Tour, sem React: fica fácil de testar com `node --test`.
 * O tour tem uma introdução (posição 0), as etapas (1..n) e um encerramento (n + 1).
 */
export type TourState = { position: number; total: number };
export type TourAction =
  | { type: "next" }
  | { type: "prev" }
  | { type: "goto"; position: number }
  | { type: "restart" }
  | { type: "finish" };

export const tourStart = (steps: number): TourState => ({ position: 0, total: steps });
export const lastPosition = (s: TourState) => s.total + 1;
export const isIntro = (s: TourState) => s.position === 0;
export const isEnd = (s: TourState) => s.position === lastPosition(s);
/** Etapa atual (1..n) ou null na introdução e no encerramento. */
export const currentStep = (s: TourState) => (isIntro(s) || isEnd(s) ? null : s.position);
/** Progresso de 0 a 1, contando só as etapas. */
export const progress = (s: TourState) => (s.total === 0 ? 1 : Math.min(1, Math.max(0, s.position) / (s.total + 1)));

const clamp = (s: TourState, position: number): TourState => ({ ...s, position: Math.min(lastPosition(s), Math.max(0, Math.trunc(position))) });

export function tourReducer(state: TourState, action: TourAction): TourState {
  switch (action.type) {
    case "next": return clamp(state, state.position + 1);
    case "prev": return clamp(state, state.position - 1);
    case "goto": return Number.isFinite(action.position) ? clamp(state, action.position) : state;
    case "restart": return { ...state, position: 0 };
    case "finish": return { ...state, position: lastPosition(state) };
  }
}

/** Tecla pressionada → ação do tour (ou null). Escape é tratado por quem renderiza (sair do tour). */
export function keyToAction(key: string): TourAction | null {
  if (key === "ArrowRight" || key === "PageDown") return { type: "next" };
  if (key === "ArrowLeft" || key === "PageUp") return { type: "prev" };
  if (key === "Home") return { type: "restart" };
  if (key === "End") return { type: "finish" };
  return null;
}
