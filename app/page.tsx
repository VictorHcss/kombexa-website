import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FeatureTabs } from "@/components/FeatureTabs";
import { PhoneFrame, ScreenFrame } from "@/components/Screens";
import { SITE } from "@/lib/site";

const STEPS = [
  {
    title: "Configure a academia",
    text: "Preencha os dados da academia, envie a logo, cadastre a chave Pix e as modalidades com o valor sugerido. Depois, convide a equipe com o acesso certo para cada pessoa.",
    screen: "branding" as const,
  },
  {
    title: "Traga os alunos",
    text: "Cadastre na recepção ou divulgue o QR Code de convite para o aluno pedir a entrada. Você aprova, recusa ou vincula o pedido a um cadastro que já existe.",
    screen: "invite" as const,
  },
  {
    title: "Acompanhe o dia a dia",
    text: "Gere as mensalidades do mês, registre pagamentos e presenças e veja na tela Início o que está atrasado, o que vence e quanto já entrou.",
    screen: "dashboard" as const,
  },
];

const DIFFERENTIALS = [
  {
    title: "Os dados da sua academia permanecem separados",
    text: "Cada academia possui seu próprio ambiente de dados. Alunos e equipes acessam somente as informações autorizadas, mesmo ao tentar acessar outras páginas diretamente.",
  },
  {
    title: "Controle de acesso em cada área",
    text: "Dez áreas com permissões independentes. A recepção pode registrar pagamentos, por exemplo, sem precisar visualizar informações financeiras restritas.",
  },
  {
    title: "Informações sensíveis recebem proteção especial",
    text: "Dados e observações de saúde possuem acesso restrito, condicionado ao consentimento registrado e a uma permissão específica. A auditoria registra as ações sem expor o conteúdo dessas informações.",
  },
  {
    title: "Controle financeiro baseado em registros reais",
    text: "A situação das mensalidades é calculada a partir dos pagamentos registrados e das datas de vencimento. Cancelamentos exigem justificativa e ficam registrados para consulta na auditoria.",
  },
  {
    title: "Privacidade e direitos previstos na LGPD",
    text: "O aluno pode exportar seus próprios dados. A academia também dispõe de recursos para exportação e atendimento de solicitações de eliminação, respeitando as obrigações legais de retenção de informações financeiras.",
  },
  {
    title: "Uma experiência pensada para qualquer tela",
    text: "Interface adaptada à rotina da academia: navegação inferior no celular e menu lateral no computador. Disponível nos temas claro, escuro ou conforme a preferência do dispositivo.",
  },
];

const FAQ = [
  {
    q: "O que é o Kombexa e como ele pode ajudar minha academia?",
    a: "O Kombexa é uma plataforma de gestão desenvolvida para academias de artes marciais e esportes de combate. Ele centraliza o gerenciamento de alunos, mensalidades, pagamentos, frequência, documentos e informações da academia, reduzindo controles manuais e facilitando a rotina administrativa.",
  },
  {
    q: "O Kombexa é adequado para academias de qualquer tamanho?",
    a: "Sim. A proposta é atender desde academias menores, que ainda utilizam planilhas e anotações, até operações com equipes maiores que precisam de mais organização, controle e centralização das informações.",
  },
  {
    q: "Posso gerenciar mais de uma modalidade na mesma academia?",
    a: "Sim. O Kombexa permite organizar os alunos por modalidades, facilitando a administração de academias que oferecem diferentes práticas, como Jiu-Jitsu, Muay Thai, Boxe, Judô, Karatê e outras.",
  },
  {
    q: "Os alunos também têm acesso à plataforma?",
    a: "Sim. Cada aluno possui acesso à Área do Aluno, onde pode consultar suas informações, acompanhar dados relacionados à sua matrícula e visualizar as informações de pagamento disponibilizadas pela academia.",
  },
  {
    q: "Como funciona o controle de mensalidades e pagamentos?",
    a: "A academia pode acompanhar mensalidades, registrar pagamentos integrais ou parciais e consultar a situação financeira dos alunos. O sistema também disponibiliza informações de pagamento via Pix. A confirmação dos pagamentos é realizada pela equipe da academia.",
  },
  {
    q: "É possível personalizar o sistema com a identidade visual da minha academia?",
    a: "Sim. Cada academia pode cadastrar sua própria identidade visual, incluindo o logotipo, para utilizá-lo em documentos e materiais vinculados à instituição. A plataforma também mantém sua identidade própria como Kombexa.",
  },
  {
    q: "O acesso às informações dos alunos é seguro?",
    a: "O Kombexa utiliza autenticação e permissões por perfil de acesso, além de isolamento dos dados entre academias. Isso ajuda a garantir que cada usuário tenha acesso somente às informações permitidas para sua função.",
  },
  {
    q: "O Kombexa possui integração com pagamentos e assinatura digital?",
    a: "Nesta versão, não há integração com gateways de pagamento nem assinatura eletrônica de contratos. Os pagamentos são registrados e confirmados pela equipe da academia, enquanto os contratos são impressos e assinados fisicamente.",
  },
  {
    q: "Preciso instalar algum programa para utilizar o Kombexa?",
    a: "Não. O Kombexa é uma plataforma web, acessível pelo navegador. Você não precisa instalar um programa específico para utilizar suas funcionalidades.",
  },
  {
    q: "Posso conhecer o sistema antes de utilizá-lo?",
    a: "Sim. O site disponibiliza um Product Tour e uma demonstração interativa para você conhecer as principais funcionalidades e visualizar como funciona a plataforma, sem necessidade de cadastro ou login.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        {/* ---------------------------------------------------------------- hero */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">
                Gestão para academias de artes marciais
              </p>
              <h1 id="hero-title" className="poster">
                <span>Mais controle para sua academia.</span>
                <span>Mais tempo para evoluir.</span>
              </h1>
              <p className="hero-lead">
                Gerencie alunos, mensalidades, frequência e a rotina da sua
                academia em um só lugar.
              </p>
              <div className="hero-actions">
                <Link href="/demo" className="btn btn--primary">
                  Explorar demonstração
                </Link>
                <Link href="#funcionalidades" className="btn btn--ghost">
                  Conhecer o sistema
                </Link>
              </div>
              <p className="hero-note">Sem cadastro. Dados fictícios.</p>
            </div>
            <div className="hero-visual">
              <ScreenFrame
                screen="dashboard"
                priority
                sizes="(min-width: 1100px) 720px, 100vw"
                className="hero-screen"
              />
              <PhoneFrame
                screen="cardMobile"
                priority
                sizes="(min-width: 1100px) 210px, 32vw"
                className="hero-phone"
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- funcionalidades */}
        <section
          id="funcionalidades"
          className="section"
          aria-labelledby="func-title"
        >
          <div className="wrap">
            <header className="section-head">
              <h2 id="func-title" className="section-title">
                Tudo o que a recepção faz, em um só sistema
              </h2>
              <p>
                O fluxo principal é curto: pesquisar o aluno, abrir o perfil,
                ver a situação financeira e registrar o pagamento. Escolha uma
                área para ver a tela real.
              </p>
            </header>
            <FeatureTabs />
          </div>
        </section>

        {/* ------------------------------------------------------- área do aluno */}
        <section
          id="area-do-aluno"
          className="section section--dark"
          aria-labelledby="aluno-title"
        >
          <div className="wrap student-grid">
            <div className="student-copy">
              <h2 id="aluno-title" className="section-title">
                A Área do Aluno cabe no bolso
              </h2>
              <p>
                Cada aluno, ou o responsável por um aluno menor, entra com a
                própria conta e acompanha a situação sem precisar perguntar na
                recepção.
              </p>
              <dl className="student-facts">
                <div>
                  <dt>Situação e Pix</dt>
                  <dd>
                    Em dia, a vencer ou atrasado, próximo vencimento e o Pix
                    copia e cola da academia.
                  </dd>
                </div>
                <div>
                  <dt>Carteirinha</dt>
                  <dd>
                    QR Code pessoal para registrar a presença na recepção.
                  </dd>
                </div>
                <div>
                  <dt>Frequência e graduações</dt>
                  <dd>
                    Treinos dos últimos 30 dias, por mês e o histórico de
                    faixas.
                  </dd>
                </div>
                <div>
                  <dt>Documentos e comunicados</dt>
                  <dd>Ficha, recibos e os avisos publicados pela academia.</dd>
                </div>
              </dl>
              <p className="student-note">
                Somente leitura: o aluno não marca pagamento, não altera
                presença e não vê dados de outros alunos.
              </p>
            </div>
            <div className="student-phones">
              <PhoneFrame
                screen="portalMobile"
                sizes="(min-width: 900px) 240px, 45vw"
              />
              <PhoneFrame
                screen="cardMobile"
                sizes="(min-width: 900px) 240px, 45vw"
              />
              <PhoneFrame
                screen="attendanceMobile"
                sizes="(min-width: 900px) 240px, 45vw"
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- como funciona */}
        <section
          id="como-funciona"
          className="section"
          aria-labelledby="como-title"
        >
          <div className="wrap">
            <header className="section-head">
              <h2 id="como-title" className="section-title">
                Do primeiro acesso à rotina em três passos
              </h2>
            </header>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ScreenFrame
                    screen={s.screen}
                    sizes="(min-width: 900px) 380px, 100vw"
                    className="step-screen"
                  />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- diferenciais */}
        <section
          id="diferenciais"
          className="section section--white"
          aria-labelledby="dif-title"
        >
          <div className="wrap diff-grid">
            <div className="diff-intro">
              <h2 id="dif-title" className="section-title">
                Organizado por dentro, não só por fora
              </h2>
              <p>
                O Kombexa foi feito para lidar com dinheiro e dados pessoais com
                cuidado. Estas regras valem em todas as telas.
              </p>
              <ScreenFrame
                screen="audit"
                sizes="(min-width: 900px) 460px, 100vw"
                className="diff-screen"
              />
            </div>
            <ul className="diff-list">
              {DIFFERENTIALS.map((d) => (
                <li key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------ tour */}
        <section id="tour" className="tour-band" aria-labelledby="tour-title">
          <div className="wrap tour-band-grid">
            <div>
              <h2 id="tour-title" className="poster poster--band">
                Veja o Kombexa por dentro
              </h2>
              <p>
                Faça o tour guiado pelas telas reais do sistema ou mexa na
                demonstração interativa: receba uma mensalidade, registre uma
                presença, publique um comunicado. Sem criar conta.
              </p>
            </div>
            <div className="tour-band-actions">
              <Link href="/tour" className="btn btn--dark">
                Começar o tour
              </Link>
              <Link href="/demo" className="btn btn--ghost tour-band-ghost">
                Abrir a demonstração
              </Link>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- perguntas */}
        <section id="perguntas" className="section" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <h2 id="faq-title" className="section-title">
              Perguntas frequentes
            </h2>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>
                    {f.a}
                    {f.q.startsWith("Como obter") && (
                      <>
                        {" "}
                        <a
                          href={SITE.repository}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Abrir o repositório
                          <span className="visually-hidden">
                            {" "}
                            (abre em nova aba)
                          </span>
                        </a>
                        .
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
