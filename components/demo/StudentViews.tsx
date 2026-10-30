"use client";

import { type DemoState, feeStatus, feesOf, formatDate, money, monthShort, openAmount, sortedAnnouncements, studentFinance } from "@/lib/demo";
import { AcademyMark, Badge, FakeQr } from "./ui";

export type StudentTab = "inicio" | "frequencia" | "carteirinha" | "comunicados";
export const STUDENT_TABS: [StudentTab, string][] = [["inicio", "Início"], ["frequencia", "Frequência"], ["carteirinha", "Carteirinha"], ["comunicados", "Comunicados"]];

export function StudentArea({ state, studentId, tab }: { state: DemoState; studentId: string; tab: StudentTab }) {
  const s = state.students.find((x) => x.id === studentId);
  if (!s) return null;
  const fees = feesOf(state, s.id);
  const open = fees.filter((f) => openAmount(f) > 0).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const situation = studentFinance(state, s.id);
  const first = s.name.split(" ")[0];
  const trainings = s.trainings30 + (state.attendance.includes(s.id) ? 1 : 0);
  const announcements = sortedAnnouncements(state.announcements);

  if (tab === "frequencia") return (
    <div className="d-student">
      <h2 className="d-title">Frequência</h2>
      <div className="d-mini-stats">
        <div><span>Últimos 30 dias</span><strong>{trainings}</strong><small>treinos</small></div>
        <div><span>Treinou hoje?</span><strong className="d-small-strong">{state.attendance.includes(s.id) ? "Sim" : "Ainda não"}</strong></div>
        <div><span>Graduação</span><strong className="d-small-strong">{s.rank}</strong></div>
      </div>
      <p className="d-muted">As presenças são registradas pela academia. Se algum treino estiver faltando, fale com a recepção.</p>
    </div>
  );

  if (tab === "carteirinha") return (
    <div className="d-student">
      <h2 className="d-title">Carteirinha</h2>
      <div className="d-id-card">
        <small>{state.branding.academyName}</small>
        <strong>{s.name}</strong>
        <FakeQr code={s.code} />
        <span className="d-code">{s.code}</span>
      </div>
      <p className="d-muted">Mostre o QR Code na recepção para registrar a presença. Nesta demonstração o QR é ilustrativo: digite o código <strong>{s.code}</strong> na tela Presença da equipe.</p>
    </div>
  );

  if (tab === "comunicados") return (
    <div className="d-student">
      <h2 className="d-title">Comunicados</h2>
      <ul className="d-announcements">
        {announcements.map((a) => (
          <li key={a.id} className={a.pinned ? "is-pinned" : ""}>
            <p className="d-meta"><Badge>{a.category}</Badge>{a.pinned && <span className="d-pin">Fixado</span>}<span>{formatDate(a.date)}</span></p>
            <h3>{a.title}</h3><p>{a.body}</p>
          </li>
        ))}
        {announcements.length === 0 && <li className="d-empty"><strong>Nenhum comunicado no momento.</strong> Avisos da academia aparecem aqui.</li>}
      </ul>
    </div>
  );

  return (
    <div className="d-student">
      <h2 className="d-title">Olá, {first}</h2>
      <div className="d-student-academy"><AcademyMark branding={state.branding} size={40} /><div><strong>{state.branding.academyName}</strong><small>{s.modality}, aluno desde {formatDate(s.joinedAt)}</small></div></div>
      {s.status !== "ativo" ? (
        <section className={`d-situation d-situation--muted`}><p>Matrícula inativa. Fale com a recepção para reativar.</p></section>
      ) : (
        <section className={`d-situation d-situation--${situation === "em dia" ? "ok" : situation === "atrasada" ? "danger" : "warn"}`}>
          <small>Sua situação</small>
          <strong>{situation === "em dia" ? "Você está em dia" : situation === "atrasada" ? "Mensalidade atrasada" : "Mensalidade a vencer"}</strong>
          {open[0] && <p>{monthShort(open[0].month)}: {money(openAmount(open[0]))} com vencimento em {formatDate(open[0].dueDate)}.</p>}
        </section>
      )}
      {open.length > 0 && (
        <section className="d-card">
          <h2>Pagar com Pix</h2>
          <p className="d-muted">Copie o código e pague no app do seu banco. A recepção confirma o pagamento; você não marca a mensalidade como paga.</p>
          <p className="d-pix">00020126...CHAVE-PIX-FICTICIA...6304ABCD</p>
          <p className="d-muted">Código ilustrativo, não funciona em bancos.</p>
        </section>
      )}
      <section className="d-card">
        <h2>Mensalidades</h2>
        <ul className="d-fee-list">
          {fees.map((f) => (
            <li key={f.id}><span>{monthShort(f.month)}<small>vence {formatDate(f.dueDate)}</small></span><Badge>{feeStatus(f, state.today)}</Badge><strong>{money(f.amount)}</strong></li>
          ))}
        </ul>
      </section>
      {announcements[0] && (
        <section className="d-card">
          <h2>Comunicado recente</h2>
          <h3 className="d-h3">{announcements[0].title}</h3>
          <p>{announcements[0].body}</p>
        </section>
      )}
    </div>
  );
}
