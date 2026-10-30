import { test } from "node:test";
import assert from "node:assert/strict";
import { createDemoState, demoReducer, feeStatus, filterStudents, finance, initialsOf, money, openAmount, studentFinance, summary } from "../lib/demo.ts";

const TODAY = "2026-10-20";

test("o estado inicial é determinístico e coerente", () => {
  const a = createDemoState(TODAY); const b = createDemoState(TODAY);
  assert.deepEqual(a, b);
  const s = summary(a);
  assert.ok(s.lateCount > 0, "há mensalidades atrasadas para demonstrar a cobrança");
  assert.ok(s.upcomingCount > 0, "há mensalidades a vencer");
  assert.ok(s.received < s.expected);
  assert.equal(a.fees.filter((f) => f.studentId === "s12").length, 0, "aluno inativo não recebe mensalidade");
});

test("os cenários funcionam em qualquer dia do mês", () => {
  for (const day of ["2026-02-01", "2026-02-28", "2026-07-15", "2026-12-31", "2027-01-02"]) {
    const s = summary(createDemoState(day));
    assert.ok(s.lateCount > 0, `atrasadas em ${day}`);
    assert.ok(s.percent >= 0 && s.percent <= 100);
  }
});

test("receber quita a mensalidade e cria a entrada no financeiro", () => {
  const st = createDemoState(TODAY);
  const late = st.fees.find((f) => feeStatus(f, TODAY) === "atrasada" && f.paid === 0)!;
  const before = finance(st).inflow;
  const after = demoReducer(st, { type: "receive", feeId: late.id, amount: late.amount, method: "pix" });
  const fee = after.fees.find((f) => f.id === late.id)!;
  assert.equal(feeStatus(fee, TODAY), "paga");
  assert.equal(finance(after).inflow, before + late.amount);
  assert.equal(after.notice?.tone, "ok");
  assert.equal(summary(after).lateCount, summary(st).lateCount - 1);
});

test("pagamento parcial deixa saldo e não aceita valor acima do aberto", () => {
  const st = createDemoState(TODAY);
  const late = st.fees.find((f) => feeStatus(f, TODAY) === "atrasada" && f.paid === 0)!;
  const half = demoReducer(st, { type: "receive", feeId: late.id, amount: 1000, method: "dinheiro" });
  assert.equal(openAmount(half.fees.find((f) => f.id === late.id)!), late.amount - 1000);
  const over = demoReducer(half, { type: "receive", feeId: late.id, amount: 999999, method: "pix" });
  const fee = over.fees.find((f) => f.id === late.id)!;
  assert.equal(fee.paid, fee.amount, "o excedente é ignorado");
  const zero = demoReducer(st, { type: "receive", feeId: late.id, amount: 0, method: "pix" });
  assert.equal(zero.notice?.tone, "danger");
  assert.equal(zero.fees, st.fees);
});

test("presença pelo código não duplica e recusa código errado ou aluno inativo", () => {
  const st = createDemoState(TODAY);
  const s2 = st.students.find((s) => s.id === "s2")!;
  const one = demoReducer(st, { type: "checkin", code: s2.code.toLowerCase() });
  assert.ok(one.attendance.includes("s2"));
  const two = demoReducer(one, { type: "checkin", code: s2.code });
  assert.equal(two.attendance.filter((id) => id === "s2").length, 1);
  assert.equal(demoReducer(st, { type: "checkin", code: "XXXX-0000" }).notice?.tone, "danger");
  const inactive = st.students.find((s) => s.status === "inativo")!;
  assert.ok(!demoReducer(st, { type: "checkin", code: inactive.code }).attendance.includes(inactive.id));
});

test("comunicado exige título e texto e reiniciar volta tudo ao começo", () => {
  const st = createDemoState(TODAY);
  assert.equal(demoReducer(st, { type: "announce", title: " ", body: "x", category: "Geral", pinned: false }).announcements.length, st.announcements.length);
  const pub = demoReducer(st, { type: "announce", title: "Aviso", body: "Texto", category: "Geral", pinned: true });
  assert.equal(pub.announcements.length, st.announcements.length + 1);
  assert.deepEqual(demoReducer(pub, { type: "reset", today: TODAY }), st);
});

test("pesquisa ignora acentos e filtra por status", () => {
  const st = createDemoState(TODAY);
  assert.equal(filterStudents(st.students, "joao", "todos")[0].name, "João Vitor Sales");
  assert.ok(filterStudents(st.students, "", "inativo").every((s) => s.status === "inativo"));
  assert.ok(filterStudents(st.students, "muay", "ativo").length >= 2);
  assert.equal(studentFinance(st, "s1"), "em dia");
});

test("utilitários de identidade e dinheiro", () => {
  assert.equal(initialsOf("Academia Leão Dourado (exemplo)"), "AL");
  assert.equal(money(18000), "R$ 180,00");
  const st = demoReducer(createDemoState(TODAY), { type: "branding", patch: { academyName: "Equipe Tigre Branco" } });
  assert.equal(st.branding.initials, "ET");
});
