import { test } from "node:test";
import assert from "node:assert/strict";
import { currentStep, isEnd, isIntro, keyToAction, progress, tourReducer, tourStart } from "../lib/tour.ts";
import { TOUR_STEPS } from "../data/tour.ts";
import { SCREENS } from "../lib/screens.ts";

test("o tour começa na introdução e avança etapa por etapa", () => {
  let s = tourStart(3);
  assert.ok(isIntro(s));
  assert.equal(currentStep(s), null);
  s = tourReducer(s, { type: "next" });
  assert.equal(currentStep(s), 1);
  s = tourReducer(tourReducer(s, { type: "next" }), { type: "next" });
  assert.equal(currentStep(s), 3);
  s = tourReducer(s, { type: "next" });
  assert.ok(isEnd(s));
  assert.equal(progress(s), 1);
});

test("não passa dos limites e volta ao início ao reiniciar", () => {
  let s = tourStart(2);
  s = tourReducer(s, { type: "prev" });
  assert.equal(s.position, 0);
  s = tourReducer(s, { type: "finish" });
  s = tourReducer(s, { type: "next" });
  assert.equal(s.position, 3);
  s = tourReducer(s, { type: "goto", position: 99 });
  assert.equal(s.position, 3);
  s = tourReducer(s, { type: "goto", position: Number.NaN });
  assert.equal(s.position, 3);
  s = tourReducer(s, { type: "restart" });
  assert.ok(isIntro(s));
});

test("teclas do teclado viram ações do tour", () => {
  assert.deepEqual(keyToAction("ArrowRight"), { type: "next" });
  assert.deepEqual(keyToAction("ArrowLeft"), { type: "prev" });
  assert.deepEqual(keyToAction("Home"), { type: "restart" });
  assert.deepEqual(keyToAction("End"), { type: "finish" });
  assert.equal(keyToAction("a"), null);
});

test("cada etapa do tour aponta para telas que existem no catálogo, com ids únicos", () => {
  const ids = new Set<string>();
  for (const step of TOUR_STEPS) {
    assert.ok(step.screen in SCREENS, `tela ${step.screen}`);
    if (step.phone) assert.ok(step.phone in SCREENS, `tela ${step.phone}`);
    assert.ok(!ids.has(step.id), `id repetido ${step.id}`);
    ids.add(step.id);
    assert.ok(step.points.length >= 2);
  }
});
