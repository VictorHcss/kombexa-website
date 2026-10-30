"use client";

import { useState } from "react";
import {
  type DemoAction, type DemoState, type Fee, type Method, type StudentStatus,
  METHOD_LABEL, feeStatus, feesOf, filterStudents, finance, formatDate, money, monthName, monthShort,
  openAmount, sortedAnnouncements, studentFinance, summary,
} from "@/lib/demo";
import { AcademyMark, Badge, Dialog } from "./ui";

type Props = { state: DemoState; dispatch: (a: DemoAction) => void; onReceive: (feeId: string) => void; onOpenStudent: (id: string) => void };
const nameOf = (state: DemoState, id: string) => state.students.find((s) => s.id === id)?.name ?? "";

// ------------------------------------------------------------------ início

export function DashboardView({ state, onReceive, onOpenStudent, go }: Props & { go: (v: string) => void }) {
  const s = summary(state);
  return (
    <>
      <header className="d-page-head">
        <div><h2 className="d-title">Início</h2><p>Resumo de {monthName(state.month)}.</p></div>
        <button type="button" className="d-btn" onClick={() => go("alunos")}>Ver alunos</button>
      </header>
      <div className="d-stats">
        <div className="d-stat d-stat--danger"><span>Mensalidades atrasadas</span><strong>{s.lateCount}</strong><small>{money(s.lateAmount)} em aberto</small></div>
        <div className="d-stat d-stat--warn"><span>Mensalidades a vencer</span><strong>{s.upcomingCount}</strong><small>{money(s.upcomingAmount)} em aberto</small></div>
        <div className="d-stat"><span>Presenças hoje</span><strong>{s.presentCount}</strong><small>de {s.activeCount} alunos ativos</small></div>
      </div>
      <section className="d-card">
        <div className="d-progress-head">
          <div><h2>Mensalidades de {monthName(state.month)}</h2><p>{s.monthCount} mensalidades no mês</p></div>
          <p className="d-progress-value"><strong>{money(s.received)}</strong> de {money(s.expected)}</p>
        </div>
        <div className="d-progress" role="progressbar" aria-label="Recebido no mês" aria-valuemin={0} aria-valuemax={100} aria-valuenow={s.percent}><span style={{ width: `${s.percent}%` }} /></div>
        <p className="d-muted">{s.percent}% recebido, faltam {money(s.expected - s.received)}.</p>
      </section>
      <section className="d-card">
        <h2>Pendências</h2>
        {s.pending.length === 0 ? (
          <p className="d-empty"><strong>Nenhuma pendência.</strong> Todas as mensalidades do mês estão pagas.</p>
        ) : (
          <div className="d-table-wrap">
            <table className="d-table">
              <thead><tr><th>Aluno</th><th>Referência</th><th>Vencimento</th><th>Situação</th><th className="num">Em aberto</th><th><span className="visually-hidden">Ações</span></th></tr></thead>
              <tbody>
                {s.pending.map((f) => (
                  <tr key={f.id}>
                    <td><button type="button" className="d-link" onClick={() => onOpenStudent(f.studentId)}>{nameOf(state, f.studentId)}</button></td>
                    <td>{monthShort(f.month)}</td>
                    <td>{formatDate(f.dueDate)}</td>
                    <td><Badge>{feeStatus(f, state.today)}</Badge></td>
                    <td className="num">{money(openAmount(f))}</td>
                    <td className="d-actions"><button type="button" className="d-btn d-btn--small" onClick={() => onReceive(f.id)}>Receber</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

// ------------------------------------------------------------------ alunos

export function StudentsView({ state, onOpenStudent }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"todos" | StudentStatus>("ativo");
  const list = filterStudents(state.students, query, status);
  return (
    <>
      <header className="d-page-head"><div><h2 className="d-title">Alunos</h2><p>Pesquise por nome, telefone, modalidade ou responsável.</p></div></header>
      <div className="d-filters" role="search">
        <label className="d-field"><span>Pesquisar</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ex.: Muay Thai ou Lopes" /></label>
        <label className="d-field"><span>Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="ativo">Ativos</option><option value="inativo">Inativos</option><option value="todos">Todos</option>
          </select>
        </label>
      </div>
      <p className="d-muted" aria-live="polite">{list.length} {list.length === 1 ? "aluno encontrado" : "alunos encontrados"}</p>
      {list.length === 0 ? (
        <p className="d-empty"><strong>Nenhum aluno com esses filtros.</strong> Limpe a pesquisa ou troque o status.</p>
      ) : (
        <div className="d-table-wrap d-card d-card--flush">
          <table className="d-table">
            <thead><tr><th>Nome</th><th>Modalidade</th><th>Telefone</th><th>Status</th><th>Financeiro</th><th className="num">Mensalidade</th></tr></thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.id}>
                  <td><button type="button" className="d-link" onClick={() => onOpenStudent(s.id)}>{s.name}</button>{s.guardian && <small className="d-sub">Responsável: {s.guardian}</small>}</td>
                  <td>{s.modality}</td>
                  <td>{s.phone}</td>
                  <td><Badge>{s.status}</Badge></td>
                  <td>{s.status === "ativo" ? <Badge>{studentFinance(state, s.id)}</Badge> : "—"}</td>
                  <td className="num">{money(s.monthlyFee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export function StudentDialog({ state, dispatch, studentId, onClose, onReceive }: { state: DemoState; dispatch: (a: DemoAction) => void; studentId: string | null; onClose: () => void; onReceive: (feeId: string) => void }) {
  const [tab, setTab] = useState<"cadastro" | "mensalidades">("cadastro");
  const s = state.students.find((x) => x.id === studentId);
  return (
    <Dialog open={!!s} onClose={() => { setTab("cadastro"); onClose(); }} title={s?.name ?? "Aluno"} wide>
      {s && (
        <div className="d-profile">
          <div className="d-profile-badges"><Badge>{s.status}</Badge>{s.status === "ativo" && <Badge>{studentFinance(state, s.id)}</Badge>}</div>
          <div className="d-mini-stats">
            <div><span>Mensalidade</span><strong>{money(s.monthlyFee)}</strong><small>vence todo dia {s.dueDay}</small></div>
            <div><span>Treinos em 30 dias</span><strong>{s.trainings30 + (state.attendance.includes(s.id) ? 1 : 0)}</strong></div>
            <div><span>Graduação</span><strong className="d-small-strong">{s.rank}</strong></div>
          </div>
          <div className="d-tabs" role="tablist" aria-label="Seções do perfil">
            {(["cadastro", "mensalidades"] as const).map((t) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t === "cadastro" ? "Cadastro" : "Mensalidades"}</button>
            ))}
          </div>
          {tab === "cadastro" ? (
            <dl className="d-dl">
              <div><dt>Modalidade</dt><dd>{s.modality}</dd></div>
              <div><dt>Telefone</dt><dd>{s.phone}</dd></div>
              <div><dt>Matrícula</dt><dd>{formatDate(s.joinedAt)}</dd></div>
              <div><dt>Responsável legal</dt><dd>{s.guardian ?? "Não se aplica (maior de idade)"}</dd></div>
              <div><dt>Código da carteirinha</dt><dd className="d-code">{s.code}</dd></div>
            </dl>
          ) : (
            <div className="d-table-wrap">
              <table className="d-table">
                <thead><tr><th>Referência</th><th>Vencimento</th><th>Situação</th><th className="num">Pago</th><th className="num">Em aberto</th><th><span className="visually-hidden">Ações</span></th></tr></thead>
                <tbody>
                  {feesOf(state, s.id).length === 0 && <tr><td colSpan={6} className="d-muted">Sem mensalidades: aluno inativo.</td></tr>}
                  {feesOf(state, s.id).map((f) => (
                    <tr key={f.id}>
                      <td>{monthShort(f.month)}</td><td>{formatDate(f.dueDate)}</td><td><Badge>{feeStatus(f, state.today)}</Badge></td>
                      <td className="num">{money(f.paid)}</td><td className="num">{money(openAmount(f))}</td>
                      <td className="d-actions">{openAmount(f) > 0 && <button type="button" className="d-btn d-btn--small" onClick={() => onReceive(f.id)}>Receber</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="d-dialog-actions">
            <button type="button" className="d-btn d-btn--ghost" onClick={() => dispatch({ type: "toggleStatus", studentId: s.id })}>{s.status === "ativo" ? "Inativar aluno" : "Reativar aluno"}</button>
          </div>
        </div>
      )}
    </Dialog>
  );
}

// ------------------------------------------------------------------ pagamento

export function PaymentDialog({ state, dispatch, feeId, onClose }: { state: DemoState; dispatch: (a: DemoAction) => void; feeId: string | null; onClose: () => void }) {
  const fee = state.fees.find((f) => f.id === feeId);
  return (
    <Dialog open={!!fee} onClose={onClose} title="Registrar pagamento">
      {fee && <PaymentForm key={fee.id} fee={fee} student={nameOf(state, fee.studentId)} onSubmit={(amount, method) => { dispatch({ type: "receive", feeId: fee.id, amount, method }); onClose(); }} />}
    </Dialog>
  );
}

function PaymentForm({ fee, student, onSubmit }: { fee: Fee; student: string; onSubmit: (amount: number, method: Method) => void }) {
  const open = openAmount(fee);
  const [value, setValue] = useState((open / 100).toFixed(2).replace(".", ","));
  const [method, setMethod] = useState<Method>("pix");
  const cents = Math.round(Number(value.replace(/\./g, "").replace(",", ".")) * 100);
  const invalid = !Number.isFinite(cents) || cents <= 0 || cents > open;
  return (
    <form className="d-form" onSubmit={(e) => { e.preventDefault(); if (!invalid) onSubmit(cents, method); }}>
      <p className="d-muted">Mensalidade de {monthShort(fee.month)} de <strong>{student}</strong>. Em aberto: <strong>{money(open)}</strong>.</p>
      <label className="d-field"><span>Valor recebido (R$)</span>
        <input inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} aria-invalid={invalid} aria-describedby="valor-dica" autoFocus />
      </label>
      <p id="valor-dica" className={invalid ? "d-error" : "d-muted"}>{invalid ? `Use um valor maior que zero e até ${money(open)}.` : "Um valor menor que o aberto vira pagamento parcial."}</p>
      <fieldset className="d-radios">
        <legend>Forma de pagamento</legend>
        {(Object.keys(METHOD_LABEL) as Method[]).map((m) => (
          <label key={m}><input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} />{METHOD_LABEL[m]}</label>
        ))}
      </fieldset>
      <div className="d-dialog-actions"><button type="submit" className="d-btn" disabled={invalid}>Registrar pagamento</button></div>
    </form>
  );
}

// ------------------------------------------------------------------ mensalidades

export function FeesView({ state, onReceive, onOpenStudent }: Props) {
  const [filter, setFilter] = useState<"todas" | "atrasada" | "a vencer" | "paga">("todas");
  const fees = state.fees
    .filter((f) => f.month === state.month || feeStatus(f, state.today) === "atrasada")
    .filter((f) => filter === "todas" || feeStatus(f, state.today) === filter)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  return (
    <>
      <header className="d-page-head"><div><h2 className="d-title">Mensalidades</h2><p>{monthName(state.month)} e atrasadas de meses anteriores. A situação vem dos pagamentos e do vencimento.</p></div></header>
      <div className="d-segment" role="group" aria-label="Filtrar por situação">
        {(["todas", "atrasada", "a vencer", "paga"] as const).map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f === "todas" ? "Todas" : f === "atrasada" ? "Atrasadas" : f === "a vencer" ? "A vencer" : "Pagas"}</button>
        ))}
      </div>
      <div className="d-table-wrap d-card d-card--flush">
        <table className="d-table">
          <thead><tr><th>Aluno</th><th>Referência</th><th>Vencimento</th><th>Situação</th><th className="num">Valor</th><th className="num">Pago</th><th><span className="visually-hidden">Ações</span></th></tr></thead>
          <tbody>
            {fees.length === 0 && <tr><td colSpan={7} className="d-muted">Nenhuma mensalidade nessa situação.</td></tr>}
            {fees.map((f) => (
              <tr key={f.id}>
                <td><button type="button" className="d-link" onClick={() => onOpenStudent(f.studentId)}>{nameOf(state, f.studentId)}</button></td>
                <td>{monthShort(f.month)}</td><td>{formatDate(f.dueDate)}</td><td><Badge>{feeStatus(f, state.today)}</Badge></td>
                <td className="num">{money(f.amount)}</td><td className="num">{money(f.paid)}</td>
                <td className="d-actions">{openAmount(f) > 0 && <button type="button" className="d-btn d-btn--small" onClick={() => onReceive(f.id)}>Receber</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ------------------------------------------------------------------ presença

export function AttendanceView({ state, dispatch }: Props) {
  const [code, setCode] = useState("");
  const active = state.students.filter((s) => s.status === "ativo");
  return (
    <>
      <header className="d-page-head"><div><h2 className="d-title">Presença</h2><p>Hoje, {formatDate(state.today)}.</p></div></header>
      <p className="d-big-count"><strong>{state.attendance.length}</strong> de {active.length} alunos ativos treinaram hoje</p>
      <section className="d-card">
        <h2>Registrar pelo QR Code</h2>
        <form className="d-inline-form" onSubmit={(e) => { e.preventDefault(); dispatch({ type: "checkin", code }); setCode(""); }}>
          <label className="d-field"><span>Código da carteirinha</span><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ex.: R2VB-88TA" autoComplete="off" /></label>
          <button type="submit" className="d-btn">Registrar</button>
        </form>
        <p className="d-muted">Na academia, um leitor de QR conectado ao computador digita o código sozinho. Experimente <button type="button" className="d-link d-code" onClick={() => setCode("R2VB-88TA")}>R2VB-88TA</button> (Bruno Tavares).</p>
      </section>
      <ul className="d-checklist">
        {active.map((s) => {
          const present = state.attendance.includes(s.id);
          return (
            <li key={s.id}>
              <div><strong>{s.name}</strong><small>{s.modality}, {s.trainings30 + (present ? 1 : 0)} treinos em 30 dias</small></div>
              <button type="button" className={`d-btn d-btn--small${present ? " d-btn--ok" : " d-btn--ghost"}`} aria-pressed={present} onClick={() => dispatch({ type: "toggleAttendance", studentId: s.id })}>
                {present ? "Presente" : "Marcar presença"}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

// ------------------------------------------------------------------ financeiro

export function FinanceView({ state }: Props) {
  const f = finance(state);
  const max = Math.max(1, ...f.byMethod.map((m) => m.amount));
  return (
    <>
      <header className="d-page-head"><div><h2 className="d-title">Financeiro</h2><p>{monthName(state.month)}. Cada pagamento registrado entra aqui automaticamente.</p></div></header>
      <div className="d-stats">
        <div className="d-stat d-stat--ok"><span>Entradas</span><strong>{money(f.inflow)}</strong></div>
        <div className="d-stat d-stat--danger"><span>Saídas</span><strong>{money(f.outflow)}</strong></div>
        <div className="d-stat"><span>Saldo</span><strong className={f.balance < 0 ? "d-negative" : ""}>{money(f.balance)}</strong></div>
      </div>
      <section className="d-card">
        <h2>Entradas por forma de pagamento</h2>
        <ul className="d-bars">
          {f.byMethod.map((m) => (
            <li key={m.method}><span>{METHOD_LABEL[m.method]}</span><span className="d-bar"><span style={{ width: `${(m.amount / max) * 100}%` }} /></span><strong>{money(m.amount)}</strong></li>
          ))}
        </ul>
      </section>
      <div className="d-table-wrap d-card d-card--flush">
        <table className="d-table">
          <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Tipo</th><th className="num">Valor</th></tr></thead>
          <tbody>
            {f.movements.map((m) => (
              <tr key={m.id}>
                <td>{formatDate(m.date)}</td><td>{m.description}{m.method && <small className="d-sub">{METHOD_LABEL[m.method]}</small>}</td><td>{m.category}</td>
                <td><span className={`d-badge d-badge--${m.kind === "entrada" ? "ok" : "danger"}`}>{m.kind === "entrada" ? "Entrada" : "Saída"}</span></td>
                <td className="num">{m.kind === "saida" ? "−" : ""}{money(m.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ------------------------------------------------------------------ comunicados

export function AnnouncementsView({ state, dispatch }: Props) {
  const [title, setTitle] = useState(""); const [body, setBody] = useState("");
  const [category, setCategory] = useState("Geral"); const [pinned, setPinned] = useState(false);
  return (
    <>
      <header className="d-page-head"><div><h2 className="d-title">Comunicados</h2><p>Os avisos aparecem na Área do Aluno. Publique um e depois veja como aluno.</p></div></header>
      <section className="d-card">
        <h2>Novo comunicado</h2>
        <form className="d-form" onSubmit={(e) => { e.preventDefault(); dispatch({ type: "announce", title, body, category, pinned }); if (title.trim() && body.trim()) { setTitle(""); setBody(""); setPinned(false); } }}>
          <label className="d-field"><span>Título</span><input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} required /></label>
          <div className="d-form-row">
            <label className="d-field"><span>Categoria</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>{["Geral", "Horários", "Feriado", "Evento", "Graduação"].map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <label className="d-check"><input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />Fixar no topo do mural</label>
          </div>
          <label className="d-field"><span>Texto</span><textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} maxLength={1000} required /></label>
          <div><button type="submit" className="d-btn">Publicar comunicado</button></div>
        </form>
      </section>
      <section>
        <h2 className="d-h2">No mural agora</h2>
        <ul className="d-announcements">
          {sortedAnnouncements(state.announcements).map((a) => (
            <li key={a.id} className={a.pinned ? "is-pinned" : ""}>
              <p className="d-meta"><Badge>{a.category}</Badge>{a.pinned && <span className="d-pin">Fixado</span>}<span>{formatDate(a.date)}</span></p>
              <h3>{a.title}</h3><p>{a.body}</p>
              <button type="button" className="d-btn d-btn--small d-btn--ghost" onClick={() => dispatch({ type: "removeAnnouncement", id: a.id })}>Arquivar</button>
            </li>
          ))}
          {state.announcements.length === 0 && <li className="d-empty"><strong>Nenhum comunicado no mural.</strong> Publique o primeiro acima.</li>}
        </ul>
      </section>
    </>
  );
}

// ------------------------------------------------------------------ identidade

const COLORS = ["#1F3A5F", "#7A1F2B", "#1E5A3A", "#4B2A6B", "#25282C", "#8A5300"];

export function BrandingView({ state, dispatch }: Props) {
  const b = state.branding;
  const [error, setError] = useState<string | null>(null);
  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) { setError("Use PNG, JPEG ou WebP."); e.target.value = ""; return; }
    if (file.size > 1024 * 1024) { setError("A imagem passa de 1 MB."); e.target.value = ""; return; }
    if (b.logoUrl) URL.revokeObjectURL(b.logoUrl);
    dispatch({ type: "branding", patch: { logoUrl: URL.createObjectURL(file) } });
  }
  return (
    <>
      <header className="d-page-head"><div><h2 className="d-title">Identidade visual</h2><p>No Kombexa, a logo da academia encabeça a ficha, o contrato e os recibos.</p></div></header>
      <div className="d-branding">
        <section className="d-card">
          <h2>Sua academia</h2>
          <div className="d-form">
            <label className="d-field"><span>Nome da academia</span><input value={b.academyName} maxLength={60} onChange={(e) => dispatch({ type: "branding", patch: { academyName: e.target.value } })} /></label>
            <label className="d-field"><span>Logo (fica só no seu navegador)</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={pick} aria-describedby="logo-dica" /></label>
            <p id="logo-dica" className={error ? "d-error" : "d-muted"}>{error ?? "PNG, JPEG ou WebP de até 1 MB. Nada é enviado a servidor."}</p>
            {b.logoUrl && <div><button type="button" className="d-btn d-btn--small d-btn--ghost" onClick={() => { URL.revokeObjectURL(b.logoUrl!); dispatch({ type: "branding", patch: { logoUrl: null } }); }}>Remover logo</button></div>}
            {!b.logoUrl && (
              <fieldset className="d-swatches">
                <legend>Sem logo: cor das iniciais</legend>
                {COLORS.map((c) => (
                  <label key={c} style={{ background: c }}><input type="radio" name="cor" checked={b.color === c} onChange={() => dispatch({ type: "branding", patch: { color: c } })} /><span className="visually-hidden">Cor {c}</span></label>
                ))}
              </fieldset>
            )}
          </div>
        </section>
        <section className="d-card d-doc-preview" aria-label="Prévia do cabeçalho dos documentos">
          <h2>Como fica nos documentos</h2>
          <div className="d-paper">
            <div className="d-paper-head">
              <AcademyMark branding={b} size={52} />
              <div><strong>{b.academyName || "Nome da academia"}</strong><small>CNPJ 00.000.000/0000-00 (fictício)</small></div>
            </div>
            <p className="d-paper-title">Ficha de matrícula e contrato de prestação de serviços</p>
            <div className="d-paper-lines" aria-hidden="true"><span /><span /><span /><span /></div>
            <p className="d-paper-foot">Documento emitido pelo Kombexa</p>
          </div>
        </section>
      </div>
    </>
  );
}
