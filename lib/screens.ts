/**
 * Catálogo das telas usadas no site. Todas são capturas reais do Kombexa original (v0.11.0),
 * rodando localmente com os dados fictícios do seed. Ver docs/SCREENSHOTS.md.
 */
export type Screen = { src: string; alt: string; width: number; height: number };

const desk = (file: string, alt: string): Screen => ({ src: `/images/product/${file}.webp`, alt, width: 1920, height: 1200 });
const phone = (file: string, alt: string): Screen => ({ src: `/images/product/${file}.webp`, alt, width: 780, height: 1688 });

export const SCREENS = {
  dashboard: desk("dashboard-overview", "Tela Início do Kombexa: mensalidades atrasadas, solicitações de entrada, valores a vencer, progresso de recebimento do mês e lista de pendências com botões de WhatsApp e Receber."),
  dashboardDark: desk("dashboard-dark-theme", "Tela Início do Kombexa no tema escuro."),
  students: desk("students-list", "Lista de alunos com pesquisa, filtro de status, modalidade, telefone, situação financeira e mensalidade de cada aluno."),
  studentProfile: desk("student-profile", "Perfil de aluno com último pagamento, mensalidade, treinos nos últimos 30 dias e abas de cadastro, mensalidades, pagamentos, graduações, saúde e histórico."),
  studentFees: desk("student-fees", "Aba de mensalidades no perfil do aluno, com uma mensalidade paga e outra atrasada."),
  fees: desk("fees-management", "Tela de mensalidades com filtros por situação e mês e a lista das mensalidades geradas."),
  payments: desk("payments-list", "Lista de pagamentos recebidos com forma de pagamento, situação e acesso ao recibo."),
  financial: desk("financial-overview", "Tela Financeiro com entradas, saídas e saldo do período e a lista de movimentações."),
  reports: desk("reports", "Relatórios com total recebido, taxa de recebimento, valor em atraso e gráfico de mensalidades por mês."),
  attendance: desk("attendance-management", "Tela de presença do dia com registro pelo QR Code do aluno e a lista de alunos marcados como presentes."),
  announcements: desk("announcements", "Tela de comunicados com o formulário de publicação e os avisos que estão no mural dos alunos."),
  branding: desk("academy-branding", "Configurações de identidade visual: logo da academia e prévia de como ela aparece no cabeçalho dos documentos."),
  team: desk("team-permissions", "Configurações de equipe e acesso, com uma pessoa de acesso personalizado e as áreas liberadas para ela."),
  enrollment: desk("enrollment-document", "Ficha de matrícula e contrato de prestação de serviços com a logo da academia no cabeçalho, pronta para imprimir ou salvar em PDF."),
  receipt: desk("payment-receipt", "Recibo de pagamento com a logo da academia, valor por extenso e opção de enviar pelo WhatsApp."),
  invite: desk("student-invite", "Tela de convite com QR Code para o aluno fazer o próprio cadastro."),
  audit: desk("audit-log", "Registro de auditoria com data, pessoa e ação realizada na academia."),
  portal: desk("student-portal", "Área do Aluno no computador: situação da mensalidade, Pix e comunicados."),
  mobileDashboard: phone("mobile-dashboard", "Tela Início do Kombexa no celular, com a barra de navegação inferior e o botão de pagamento."),
  mobileStudents: phone("mobile-students", "Lista de alunos no celular."),
  portalMobile: phone("student-portal-mobile", "Área do Aluno no celular: atalhos para carteirinha, frequência, documentos e comunicados."),
  cardMobile: phone("student-card-mobile", "Carteirinha do aluno no celular com o QR Code pessoal para registrar presença na recepção."),
  attendanceMobile: phone("student-attendance-mobile", "Frequência do aluno no celular: treinos nos últimos 30 dias e por mês."),
  documentsMobile: phone("student-documents-mobile", "Documentos do aluno no celular: ficha de matrícula assinada e recibos."),
  announcementsMobile: phone("student-announcements-mobile", "Comunicados da academia vistos pelo aluno no celular."),
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof SCREENS;
