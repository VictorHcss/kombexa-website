import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./styles/tokens.css";
import "./styles/site.css";
import "./styles/tour.css";
import "./styles/demo.css";
import { SITE, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: SITE.title, template: "%s | Kombexa" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["gestão de academia", "artes marciais", "jiu-jitsu", "muay thai", "boxe", "mensalidades", "controle de presença", "área do aluno"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111315",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
