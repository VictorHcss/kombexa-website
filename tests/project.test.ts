/** Verificações estruturais: o site é independente do sistema original e não carrega segredos. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { SCREENS } from "../lib/screens.ts";

const root = new URL("..", import.meta.url).pathname;
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

function files(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(join(root, dir))) {
    if (["node_modules", ".next", ".git", ".vercel"].includes(name)) continue;
    const rel = join(dir, name);
    if (statSync(join(root, rel)).isDirectory()) files(rel, out); else out.push(rel);
  }
  return out;
}
const source = files(".").filter((f) => /\.(ts|tsx|mjs|css|json)$/.test(f) && !f.endsWith("package-lock.json"));

test("sem dependências de banco, ORM, autenticação ou serviços do sistema principal", () => {
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  for (const forbidden of ["postgres", "pg", "drizzle-orm", "drizzle-kit", "bcryptjs", "nodemailer", "prisma", "@prisma/client", "redis", "ioredis"]) {
    assert.ok(!deps.includes(forbidden), `dependência proibida: ${forbidden}`);
  }
});

test("o código não usa DATABASE_URL, segredos nem APIs privadas", () => {
  for (const f of source.filter((x) => !x.startsWith("tests"))) {
    const text = readFileSync(join(root, f), "utf8");
    assert.ok(!/DATABASE_URL|CRON_SECRET|SMTP_|RESEND_API_KEY|POSTGRES_PASSWORD/.test(text), `${f} cita variável do sistema original`);
    assert.ok(!/fetch\(\s*["'`]https?:/.test(text), `${f} faz chamada de rede externa`);
  }
});

test("não há arquivos .env nem chaves no projeto", () => {
  const all = files(".");
  assert.ok(!all.some((f) => /(^|\/)\.env($|\.)/.test(f) && !f.endsWith(".env.example")), "arquivo .env encontrado");
  assert.ok(!all.some((f) => /\.(pem|key|p12|pfx|sql|dump)$/.test(f)), "chave ou dump encontrado");
});

test("todas as telas do catálogo existem e são WebP com tamanho razoável", () => {
  for (const [key, s] of Object.entries(SCREENS)) {
    const path = join(root, "public", s.src);
    assert.ok(existsSync(path), `imagem ausente: ${key} (${s.src})`);
    assert.ok(statSync(path).size < 400 * 1024, `imagem grande demais: ${s.src}`);
    assert.ok(s.alt.length > 20, `texto alternativo curto: ${key}`);
  }
});

test("as rotas ligadas pelo site existem", () => {
  for (const page of ["app/page.tsx", "app/tour/page.tsx", "app/demo/page.tsx", "app/privacidade/page.tsx", "app/not-found.tsx"]) {
    assert.ok(existsSync(join(root, page)), page);
  }
  const linked = new Set<string>();
  for (const f of source.filter((x) => x.endsWith(".tsx"))) {
    for (const m of readFileSync(join(root, f), "utf8").matchAll(/href[=:]\s*\{?["'`](\/[^"'`#]*)/g)) linked.add(m[1] || "/");
  }
  for (const href of linked) {
    const page = href === "/" ? "app/page.tsx" : `app${href}/page.tsx`;
    assert.ok(existsSync(join(root, page)), `link interno sem página: ${href}`);
  }
});

test("as âncoras usadas nos links existem na landing page", () => {
  const home = readFileSync(join(root, "app/page.tsx"), "utf8");
  const anchors = new Set<string>();
  for (const f of source.filter((x) => x.endsWith(".tsx"))) {
    for (const m of readFileSync(join(root, f), "utf8").matchAll(/(?:["'`]\/#|href=["'`]#)([a-z-]+)["'`]/g)) anchors.add(m[1]);
  }
  for (const a of anchors) assert.ok(home.includes(`id="${a}"`), `âncora sem destino: #${a}`);
});
