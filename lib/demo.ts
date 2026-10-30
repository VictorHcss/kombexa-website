/**
 * Estado da demonstração interativa. Tudo é fictício, vive só na memória do navegador e some ao
 * reiniciar ou recarregar a página. Sem React aqui, para poder testar com `node --test`.
 *
 * As regras imitam as do Kombexa original: a situação da mensalidade vem do vencimento e da soma
 * dos pagamentos (ninguém marca "paga" à mão) e cada pagamento vira uma entrada no financeiro.
 */

export type Method = "pix" | "dinheiro" | "cartao";
export type StudentStatus = "ativo" | "inativo";
export type FeeStatus = "paga" | "atrasada" | "a vencer" | "em aberto";

export type Student = {
  id: string; name: string; modality: string; phone: string; status: StudentStatus;
  monthlyFee: number; dueDay: number; joinedAt: string; rank: string; guardian: string | null;
  trainings30: number; code: string;
};
export type Fee = { id: string; studentId: string; month: string; dueDate: string; amount: number; paid: number };
export type Movement = { id: string; date: string; description: string; category: string; kind: "entrada" | "saida"; amount: number; method: Method | null };
export type Announcement = { id: string; title: string; body: string; category: string; pinned: boolean; date: string };
export type Branding = { academyName: string; initials: string; color: string; logoUrl: string | null };
export type Notice = { tone: "ok" | "danger"; text: string } | null;

export type DemoState = {
  today: string; month: string; students: Student[]; fees: Fee[]; movements: Movement[];
  attendance: string[]; announcements: Announcement[]; branding: Branding; notice: Notice; seq: number;
};

export type DemoAction =
  | { type: "receive"; feeId: string; amount: number; method: Method }
  | { type: "toggleAttendance"; studentId: string }
  | { type: "checkin"; code: string }
  | { type: "toggleStatus"; studentId: string }
  | { type: "announce"; title: string; body: string; category: string; pinned: boolean }
  | { type: "removeAnnouncement"; id: string }
  | { type: "branding"; patch: Partial<Branding> }
  | { type: "dismissNotice" }
  | { type: "reset"; today: string };

// ------------------------------------------------------------------ datas e dinheiro

const pad = (n: number) => String(n).padStart(2, "0");
/** Data local do navegador no formato AAAA-MM-DD. */
export const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const monthOf = (iso: string) => iso.slice(0, 7);
function shiftMonth(month: string, delta: number) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}
function dayIn(month: string, day: number) {
  const [y, m] = month.split("-").map(Number);
  const last = new Date(y, m, 0).getDate();
  return `${month}-${pad(Math.min(day, last))}`;
}

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
export const monthName = (month: string) => `${MONTHS[Number(month.slice(5, 7)) - 1]} de ${month.slice(0, 4)}`;
export const monthShort = (month: string) => `${MONTHS[Number(month.slice(5, 7)) - 1].slice(0, 3)}/${month.slice(0, 4)}`;
export const formatDate = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;

/** Valores em centavos, como no original. */
export const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/\u00a0/g, " ");

export const METHOD_LABEL: Record<Method, string> = { pix: "Pix", dinheiro: "Dinheiro", cartao: "Cartão" };

// ------------------------------------------------------------------ dados fictícios

type Seed = Omit<Student, "id" | "code"> & { owes?: "atrasada" | "paga" | "a vencer" | "parcial"; lastMonthOpen?: boolean };

const SEED: Seed[] = [
  { name: "Ana Clara Mendes", modality: "Jiu-Jitsu", phone: "(00) 90000-0101", status: "ativo", monthlyFee: 18000, dueDay: 5, joinedAt: "2025-02-10", rank: "Faixa azul, 2º grau", guardian: null, trainings30: 11, owes: "paga" },
  { name: "Bruno Tavares", modality: "Muay Thai", phone: "(00) 90000-0102", status: "ativo", monthlyFee: 16000, dueDay: 10, joinedAt: "2024-08-01", rank: "Prajied vermelho", guardian: null, trainings30: 7, owes: "atrasada" },
  { name: "Carla Nogueira", modality: "Boxe", phone: "(00) 90000-0103", status: "ativo", monthlyFee: 15000, dueDay: 10, joinedAt: "2025-05-03", rank: "Iniciante", guardian: null, trainings30: 9, owes: "paga" },
  { name: "Davi Lopes", modality: "Jiu-Jitsu Kids", phone: "(00) 90000-0104", status: "ativo", monthlyFee: 12000, dueDay: 10, joinedAt: "2025-03-01", rank: "Faixa cinza", guardian: "Márcia Lopes (mãe)", trainings30: 8, owes: "parcial" },
  { name: "Eduarda Pires", modality: "Muay Thai", phone: "(00) 90000-0105", status: "ativo", monthlyFee: 16000, dueDay: 15, joinedAt: "2024-11-12", rank: "Prajied amarelo", guardian: null, trainings30: 4, owes: "atrasada", lastMonthOpen: true },
  { name: "Felipe Andrade", modality: "MMA", phone: "(00) 90000-0106", status: "ativo", monthlyFee: 20000, dueDay: 15, joinedAt: "2023-09-20", rank: "Avançado", guardian: null, trainings30: 14, owes: "paga" },
  { name: "Gabriela Rocha", modality: "Jiu-Jitsu", phone: "(00) 90000-0107", status: "ativo", monthlyFee: 18000, dueDay: 20, joinedAt: "2025-07-07", rank: "Faixa branca, 3º grau", guardian: null, trainings30: 10, owes: "paga" },
  { name: "Heitor Campos", modality: "Boxe", phone: "(00) 90000-0108", status: "ativo", monthlyFee: 15000, dueDay: 28, joinedAt: "2025-09-01", rank: "Iniciante", guardian: null, trainings30: 2, owes: "a vencer" },
  { name: "Isabela Martins", modality: "Jiu-Jitsu Kids", phone: "(00) 90000-0109", status: "ativo", monthlyFee: 12000, dueDay: 28, joinedAt: "2025-01-15", rank: "Faixa cinza e branca", guardian: "Rafael Martins (pai)", trainings30: 9, owes: "a vencer" },
  { name: "João Vitor Sales", modality: "MMA", phone: "(00) 90000-0110", status: "ativo", monthlyFee: 20000, dueDay: 5, joinedAt: "2024-04-04", rank: "Intermediário", guardian: null, trainings30: 6, owes: "atrasada" },
  { name: "Larissa Fontes", modality: "Muay Thai", phone: "(00) 90000-0111", status: "ativo", monthlyFee: 16000, dueDay: 5, joinedAt: "2025-06-18", rank: "Prajied branco", guardian: null, trainings30: 12, owes: "paga" },
  { name: "Mateus Ribeiro", modality: "Jiu-Jitsu", phone: "(00) 90000-0112", status: "inativo", monthlyFee: 18000, dueDay: 10, joinedAt: "2023-03-02", rank: "Faixa roxa", guardian: null, trainings30: 0 },
];

const CODES = ["K7QD-31MX", "R2VB-88TA", "M4NC-20PL", "D9LS-56KE", "E3PR-74QW", "F8AN-12ZU", "G5RC-63JD", "H1CP-97XB", "I6MT-45GN", "J2VS-80HR", "L7FN-39YM", "M0RB-11CQ"];

export const DEMO_ACADEMY = "Academia Leão Dourado (exemplo)";

export function createDemoState(today: string): DemoState {
  const month = monthOf(today);
  const prev = shiftMonth(month, -1);
  const students: Student[] = SEED.map(({ owes: _o, lastMonthOpen: _l, ...s }, i) => ({ ...s, id: `s${i + 1}`, code: CODES[i] }));
  const fees: Fee[] = [];
  const movements: Movement[] = [];
  let n = 0;
  const methods: Method[] = ["pix", "dinheiro", "cartao"];

  SEED.forEach((s, i) => {
    if (s.status !== "ativo") return;
    const studentId = `s${i + 1}`;
    // mês anterior: pago, salvo quem ficou devendo
    const prevFee: Fee = { id: `f${++n}`, studentId, month: prev, dueDate: dayIn(prev, s.dueDay), amount: s.monthlyFee, paid: s.lastMonthOpen ? 0 : s.monthlyFee };
    fees.push(prevFee);
    if (prevFee.paid) movements.push({ id: `m${n}`, date: dayIn(prev, Math.max(1, s.dueDay - 2)), description: `Mensalidade ${monthShort(prev)} — ${s.name}`, category: "Mensalidade", kind: "entrada", amount: prevFee.paid, method: methods[i % 3] });

    // mês atual: o vencimento se ajusta à data de hoje para cada situação fazer sentido em qualquer dia
    const todayDay = Number(today.slice(8, 10));
    let due = s.dueDay;
    if (s.owes === "atrasada" || s.owes === "parcial") due = Math.max(1, Math.min(s.dueDay, todayDay - 1 || 1));
    if (s.owes === "a vencer") due = Math.max(s.dueDay, todayDay + 1);
    const dueDate = dayIn(month, due);
    const paid = s.owes === "paga" ? s.monthlyFee : s.owes === "parcial" ? Math.round(s.monthlyFee / 2) : 0;
    fees.push({ id: `f${++n}`, studentId, month, dueDate, amount: s.monthlyFee, paid });
    if (paid) movements.push({ id: `m${n}`, date: dayIn(month, Math.max(1, Math.min(due, todayDay))), description: `Mensalidade ${monthShort(month)} — ${s.name}`, category: "Mensalidade", kind: "entrada", amount: paid, method: methods[(i + 1) % 3] });
  });

  movements.push(
    { id: "x1", date: dayIn(month, 3), description: "Aluguel do espaço", category: "Infraestrutura", kind: "saida", amount: 55000, method: null },
    { id: "x2", date: dayIn(month, 8), description: "Conta de energia", category: "Infraestrutura", kind: "saida", amount: 18450, method: null },
    { id: "x3", date: dayIn(month, 12), description: "Reposição de luvas e bandagens", category: "Material", kind: "saida", amount: 32000, method: null },
    { id: "x4", date: dayIn(month, 2), description: "Taxa de matrícula — Heitor Campos", category: "Matrícula", kind: "entrada", amount: 5000, method: "pix" },
  );

  return {
    today, month, students, fees,
    movements: movements.filter((m) => m.date <= today || m.kind === "entrada").sort((a, b) => b.date.localeCompare(a.date)),
    attendance: ["s1", "s3", "s6", "s11"],
    announcements: [
      { id: "a1", title: "Graduação de fim de ano", body: "A cerimônia de graduação acontece no último sábado do mês que vem, às 10h. Quem foi convocado recebe o aviso na recepção.", category: "Graduação", pinned: true, date: today },
      { id: "a2", title: "Treino aberto de sábado", body: "Neste sábado o tatame fica aberto das 9h às 11h para todas as modalidades. Traga um amigo.", category: "Evento", pinned: false, date: today },
    ],
    branding: { academyName: DEMO_ACADEMY, initials: "LD", color: "#1F3A5F", logoUrl: null },
    notice: null,
    seq: 100,
  };
}

// ------------------------------------------------------------------ consultas

export function feeStatus(fee: Fee, today: string): FeeStatus {
  if (fee.paid >= fee.amount) return "paga";
  if (fee.dueDate < today) return "atrasada";
  if (monthOf(fee.dueDate) === monthOf(today)) return "a vencer";
  return "em aberto";
}
export const openAmount = (fee: Fee) => Math.max(0, fee.amount - fee.paid);

export function studentFinance(state: DemoState, studentId: string): "em dia" | "atrasada" | "a vencer" {
  const fees = state.fees.filter((f) => f.studentId === studentId).map((f) => feeStatus(f, state.today));
  if (fees.includes("atrasada")) return "atrasada";
  if (fees.includes("a vencer")) return "a vencer";
  return "em dia";
}

export function summary(state: DemoState) {
  const monthFees = state.fees.filter((f) => f.month === state.month);
  const late = state.fees.filter((f) => feeStatus(f, state.today) === "atrasada");
  const upcoming = monthFees.filter((f) => feeStatus(f, state.today) === "a vencer");
  const expected = monthFees.reduce((t, f) => t + f.amount, 0);
  const received = monthFees.reduce((t, f) => t + Math.min(f.paid, f.amount), 0);
  const active = state.students.filter((s) => s.status === "ativo");
  return {
    lateCount: late.length, lateAmount: late.reduce((t, f) => t + openAmount(f), 0),
    upcomingCount: upcoming.length, upcomingAmount: upcoming.reduce((t, f) => t + openAmount(f), 0),
    monthCount: monthFees.length, expected, received, percent: expected ? Math.round((received / expected) * 100) : 0,
    activeCount: active.length, presentCount: state.attendance.length,
    pending: [...late, ...upcoming].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
  };
}

export function finance(state: DemoState) {
  const inMonth = state.movements.filter((m) => monthOf(m.date) === state.month);
  const inflow = inMonth.filter((m) => m.kind === "entrada").reduce((t, m) => t + m.amount, 0);
  const outflow = inMonth.filter((m) => m.kind === "saida").reduce((t, m) => t + m.amount, 0);
  const byMethod = (["pix", "dinheiro", "cartao"] as Method[]).map((method) => ({
    method, amount: inMonth.filter((m) => m.kind === "entrada" && m.method === method).reduce((t, m) => t + m.amount, 0),
  }));
  return { movements: inMonth, inflow, outflow, balance: inflow - outflow, byMethod };
}

export function filterStudents(students: Student[], query: string, status: "todos" | StudentStatus) {
  const q = normalize(query.trim());
  return students.filter((s) => (status === "todos" || s.status === status) && (!q || normalize(`${s.name} ${s.phone} ${s.modality} ${s.guardian ?? ""}`).includes(q)));
}
const normalize = (v: string) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const initialsOf = (name: string) =>
  name.replace(/\(.*?\)/g, "").split(/\s+/).filter((w) => w.length > 2 || /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

// ------------------------------------------------------------------ reducer

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "receive": {
      const fee = state.fees.find((f) => f.id === action.feeId);
      const student = fee && state.students.find((s) => s.id === fee.studentId);
      if (!fee || !student) return state;
      const amount = Math.min(Math.round(action.amount), openAmount(fee));
      if (!Number.isFinite(amount) || amount <= 0) return { ...state, notice: { tone: "danger", text: "Informe um valor maior que zero e até o valor em aberto." } };
      const seq = state.seq + 1;
      const paid = fee.paid + amount;
      return {
        ...state, seq,
        fees: state.fees.map((f) => (f.id === fee.id ? { ...f, paid } : f)),
        movements: [{ id: `m${seq}`, date: state.today, description: `Mensalidade ${monthShort(fee.month)} — ${student.name}`, category: "Mensalidade", kind: "entrada" as const, amount, method: action.method }, ...state.movements],
        notice: { tone: "ok", text: paid >= fee.amount ? `Pagamento de ${money(amount)} registrado. Mensalidade de ${student.name} quitada.` : `Pagamento parcial de ${money(amount)} registrado. Ainda faltam ${money(fee.amount - paid)}.` },
      };
    }
    case "toggleAttendance": {
      const student = state.students.find((s) => s.id === action.studentId);
      if (!student || student.status !== "ativo") return state;
      const present = state.attendance.includes(student.id);
      return { ...state, attendance: present ? state.attendance.filter((id) => id !== student.id) : [...state.attendance, student.id], notice: null };
    }
    case "checkin": {
      const code = action.code.trim().toUpperCase();
      const student = state.students.find((s) => s.code === code);
      if (!code) return { ...state, notice: { tone: "danger", text: "Digite o código que aparece abaixo do QR da carteirinha." } };
      if (!student) return { ...state, notice: { tone: "danger", text: `Nenhum aluno com o código ${code}. Confira o código na carteirinha.` } };
      if (student.status !== "ativo") return { ...state, notice: { tone: "danger", text: `${student.name} está inativo. Reative o aluno para registrar presença.` } };
      if (state.attendance.includes(student.id)) return { ...state, notice: { tone: "ok", text: `${student.name} já estava com presença hoje. Nada foi duplicado.` } };
      return { ...state, attendance: [...state.attendance, student.id], notice: { tone: "ok", text: `Presença de ${student.name} registrada.` } };
    }
    case "toggleStatus":
      return {
        ...state,
        students: state.students.map((s) => (s.id === action.studentId ? { ...s, status: s.status === "ativo" ? "inativo" : "ativo" } : s)),
        attendance: state.attendance.filter((id) => id !== action.studentId),
      };
    case "announce": {
      const title = action.title.trim(); const body = action.body.trim();
      if (!title || !body) return { ...state, notice: { tone: "danger", text: "Preencha o título e o texto do comunicado." } };
      const seq = state.seq + 1;
      return {
        ...state, seq,
        announcements: [{ id: `a${seq}`, title: title.slice(0, 120), body: body.slice(0, 1000), category: action.category, pinned: action.pinned, date: state.today }, ...state.announcements],
        notice: { tone: "ok", text: "Comunicado publicado. Ele já aparece na Área do Aluno da demonstração." },
      };
    }
    case "removeAnnouncement":
      return { ...state, announcements: state.announcements.filter((a) => a.id !== action.id), notice: { tone: "ok", text: "Comunicado arquivado." } };
    case "branding": {
      const next = { ...state.branding, ...action.patch };
      if (action.patch.academyName !== undefined && action.patch.initials === undefined) next.initials = initialsOf(next.academyName) || "AC";
      next.initials = next.initials.slice(0, 3).toUpperCase();
      return { ...state, branding: next };
    }
    case "dismissNotice":
      return { ...state, notice: null };
    case "reset":
      return createDemoState(action.today);
  }
}

/** Mensalidades ordenadas por situação e vencimento, para a Área do Aluno e o perfil. */
export function feesOf(state: DemoState, studentId: string) {
  return state.fees.filter((f) => f.studentId === studentId).sort((a, b) => b.month.localeCompare(a.month));
}

export const sortedAnnouncements = (list: Announcement[]) =>
  [...list].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date));
