"use client";

import Link from "next/link";
import { useEffect, useReducer, useRef, useState } from "react";
import { createDemoState, demoReducer, isoDate, summary } from "@/lib/demo";
import { BrandMark } from "@/components/Brand";
import { AnnouncementsView, AttendanceView, BrandingView, DashboardView, FeesView, FinanceView, PaymentDialog, StudentDialog, StudentsView } from "./TeamViews";
import { STUDENT_TABS, StudentArea, type StudentTab } from "./StudentViews";
import { Notice } from "./ui";

const TEAM_VIEWS = [
  ["inicio", "Início"], ["alunos", "Alunos"], ["mensalidades", "Mensalidades"], ["presenca", "Presença"],
  ["financeiro", "Financeiro"], ["comunicados", "Comunicados"], ["identidade", "Identidade visual"],
] as const;
type TeamView = (typeof TEAM_VIEWS)[number][0];

export default function DemoApp() {
  const [state, dispatch] = useReducer(demoReducer, isoDate(new Date()), createDemoState);
  const [mode, setMode] = useState<"equipe" | "aluno">("equipe");
  const [view, setView] = useState<TeamView>("inicio");
  const [studentTab, setStudentTab] = useState<StudentTab>("inicio");
  const [asStudent, setAsStudent] = useState("s2");
  const [payFee, setPayFee] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const main = useRef<HTMLDivElement>(null);
  const late = summary(state).lateCount;

  // a mensagem de retorno some sozinha depois de alguns segundos
  useEffect(() => {
    if (!state.notice) return;
    const t = window.setTimeout(() => dispatch({ type: "dismissNotice" }), 6000);
    return () => window.clearTimeout(t);
  }, [state.notice]);

  function go(next: string) {
    setView(next as TeamView);
    main.current?.focus({ preventScroll: true });
    main.current?.scrollTo?.({ top: 0 });
  }
  function reset() {
    if (state.branding.logoUrl) URL.revokeObjectURL(state.branding.logoUrl);
    dispatch({ type: "reset", today: isoDate(new Date()) });
    setMode("equipe"); setView("inicio"); setStudentTab("inicio"); setAsStudent("s2"); setPayFee(null); setProfile(null);
  }
  const props = { state, dispatch, onReceive: (id: string) => setPayFee(id), onOpenStudent: (id: string) => setProfile(id) };

  return (
    <div className="demo">
      <div className="demo-banner" role="note">
        <p><strong>Demonstração interativa</strong> — os dados exibidos são fictícios e não são salvos.</p>
        <div className="demo-banner-actions">
          <button type="button" className="demo-banner-btn" onClick={reset}>Reiniciar demonstração</button>
          <Link href="/" className="demo-banner-btn">Voltar ao site</Link>
        </div>
      </div>

      <div className="demo-switch" role="group" aria-label="Ver a demonstração como">
        <span>Ver como</span>
        <button type="button" aria-pressed={mode === "equipe"} onClick={() => setMode("equipe")}>Equipe da academia</button>
        <button type="button" aria-pressed={mode === "aluno"} onClick={() => setMode("aluno")}>Aluno</button>
        {mode === "aluno" && (
          <label className="demo-switch-select"><span className="visually-hidden">Aluno</span>
            <select value={asStudent} onChange={(e) => { setAsStudent(e.target.value); setStudentTab("inicio"); }}>
              {state.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
        )}
      </div>

      {mode === "equipe" ? (
        <div className="demo-app">
          <aside className="demo-side">
            <div className="demo-side-brand"><BrandMark size={28} /><div><strong>Kombexa</strong><small>{state.branding.academyName}</small></div></div>
            <nav aria-label="Menu da demonstração">
              <ul>
                {TEAM_VIEWS.map(([key, label]) => (
                  <li key={key}>
                    <button type="button" aria-current={view === key ? "page" : undefined} onClick={() => go(key)}>
                      {label}{key === "mensalidades" && late > 0 && <span className="demo-count" aria-label={`${late} atrasadas`}>{late}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="demo-side-user"><span aria-hidden="true">RS</span>Recepção (exemplo)</p>
          </aside>
          <div className="demo-main" ref={main} tabIndex={-1} aria-label="Conteúdo da demonstração">
            {view === "inicio" && <DashboardView {...props} go={go} />}
            {view === "alunos" && <StudentsView {...props} />}
            {view === "mensalidades" && <FeesView {...props} />}
            {view === "presenca" && <AttendanceView {...props} />}
            {view === "financeiro" && <FinanceView {...props} />}
            {view === "comunicados" && <AnnouncementsView {...props} />}
            {view === "identidade" && <BrandingView {...props} />}
          </div>
        </div>
      ) : (
        <div className="demo-student-shell">
          <nav className="demo-student-nav" aria-label="Área do Aluno">
            {STUDENT_TABS.map(([key, label]) => (
              <button key={key} type="button" aria-current={studentTab === key ? "page" : undefined} onClick={() => setStudentTab(key)}>{label}</button>
            ))}
          </nav>
          <div className="demo-phone"><StudentArea state={state} studentId={asStudent} tab={studentTab} /></div>
          <p className="demo-hint">Somente leitura, como no sistema: o aluno não registra pagamento nem presença. Troque o aluno acima ou volte para a visão da equipe.</p>
        </div>
      )}

      <Notice notice={state.notice} onClose={() => dispatch({ type: "dismissNotice" })} />
      <PaymentDialog state={state} dispatch={dispatch} feeId={payFee} onClose={() => setPayFee(null)} />
      <StudentDialog state={state} dispatch={dispatch} studentId={payFee ? null : profile} onClose={() => setProfile(null)} onReceive={(id) => setPayFee(id)} />
    </div>
  );
}
