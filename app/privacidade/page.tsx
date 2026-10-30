import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacidade deste site",
  description: "Como o site de apresentação do Kombexa trata dados: não há cadastro, formulário enviado, cookies próprios nem rastreamento.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="page-simple">
        <div className="wrap">
          <h1>Privacidade deste site</h1>
          <p>Este é o site de apresentação do Kombexa. Ele trata do site em si, não do sistema de gestão usado pelas academias.</p>
          <h2>O que este site não faz</h2>
          <p>Não tem cadastro, login nem formulário enviado a servidor. Não usa cookies próprios, ferramentas de análise, pixels de anúncio ou rastreamento. As fontes e as imagens são servidas pelo próprio site.</p>
          <h2>A demonstração interativa</h2>
          <p>Tudo o que você faz na <Link href="/demo">demonstração</Link> fica na memória do seu navegador e some ao reiniciar ou recarregar a página. Se você escolher uma imagem como logo, ela é lida localmente e não é enviada a lugar nenhum.</p>
          <h2>Dados mostrados nas telas</h2>
          <p>Os nomes, telefones, e-mails, documentos e valores que aparecem nas imagens e na demonstração são fictícios.</p>
          <h2>Hospedagem</h2>
          <p>Como qualquer site, o serviço de hospedagem pode registrar dados técnicos de acesso (como endereço IP e navegador) para operar e proteger o serviço, conforme a política do provedor.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
