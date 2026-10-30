/** Dados públicos do site. Nada aqui é segredo: o site não usa variáveis de ambiente obrigatórias. */
export const SITE = {
  name: "Kombexa",
  title: "Kombexa — gestão para academias de artes marciais",
  description:
    "Alunos, mensalidades, pagamentos, presença, documentos com a logo da academia e uma Área do Aluno, em um só lugar. Conheça o Kombexa pelo tour guiado e pela demonstração interativa.",
  repository: "https://github.com/VictorHcss/kombexa",
  locale: "pt_BR",
} as const;

/**
 * Endereço público usado nos metadados (Open Graph). Na Vercel, VERCEL_PROJECT_PRODUCTION_URL é
 * preenchida automaticamente pela própria plataforma; localmente, cai no localhost.
 */
export function siteUrl(): URL {
  const custom = process.env.NEXT_PUBLIC_SITE_URL;
  if (custom) return new URL(custom);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
