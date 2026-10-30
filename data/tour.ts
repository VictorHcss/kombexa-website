import type { ScreenKey } from "../lib/screens.ts";

export type TourStep = {
  id: string;
  label: string;
  title: string;
  text: string;
  points: string[];
  screen: ScreenKey;
  phone?: ScreenKey;
};

/** Etapas do tour, na ordem do dia a dia de uma academia. Cada imagem é uma tela real do sistema. */
export const TOUR_STEPS: TourStep[] = [
  {
    id: "inicio", label: "Início", screen: "dashboard", phone: "mobileDashboard",
    title: "O dia começa pelo que pede ação",
    text: "A tela Início junta o que precisa de atenção: mensalidades atrasadas, pedidos de entrada esperando aprovação, vencimentos próximos e quanto do mês já foi recebido.",
    points: ["Pendências com cobrança pronta pelo WhatsApp", "Botão para registrar o pagamento ali mesmo", "No celular, a mesma tela com navegação na parte de baixo"],
  },
  {
    id: "alunos", label: "Alunos", screen: "students",
    title: "Encontre qualquer aluno em segundos",
    text: "Pesquise por nome, telefone, e-mail, CPF ou pelo responsável. A lista mostra modalidade, status e situação financeira de cada um.",
    points: ["Cadastro com responsável legal para menores", "Contato de emergência, uso de imagem e endereço", "Ativar e inativar sem perder o histórico"],
  },
  {
    id: "perfil", label: "Perfil", screen: "studentProfile",
    title: "Tudo sobre o aluno em um só perfil",
    text: "No perfil ficam o último pagamento, a mensalidade, os treinos dos últimos 30 dias e as abas de cadastro, mensalidades, pagamentos, graduações e histórico.",
    points: ["Saúde em seção restrita, com permissão própria", "Histórico de faixas, cordas e graus", "Histórico de cada ação feita no cadastro"],
  },
  {
    id: "mensalidades", label: "Mensalidades", screen: "fees",
    title: "Mensalidades sem marcação manual",
    text: "As mensalidades do mês são geradas para todos os alunos ativos, sem duplicar. A situação vem do vencimento e dos pagamentos: ninguém marca \"paga\" à mão.",
    points: ["Pagamento parcial com saldo em aberto", "Pagamento pendente só entra no caixa ao ser confirmado", "Cancelamento com motivo registrado"],
  },
  {
    id: "recibos", label: "Recibos", screen: "receipt",
    title: "Recibo pronto para enviar",
    text: "Cada pagamento gera um recibo com o valor por extenso e a logo da academia, para imprimir, salvar em PDF ou mandar pelo WhatsApp.",
    points: ["O aluno também vê os próprios recibos", "Pix copia e cola gerado com a chave da academia", "A confirmação do Pix é feita pela recepção"],
  },
  {
    id: "financeiro", label: "Financeiro", screen: "financial",
    title: "Entradas, saídas e saldo do período",
    text: "Cada pagamento vira uma entrada no financeiro automaticamente. Despesas e outros recebimentos são lançados na mesma tela, com exportação em CSV.",
    points: ["Relatórios de recebido × esperado e atraso", "Formas de pagamento do período", "Sem contagem dupla entre mensalidade e caixa"],
  },
  {
    id: "presenca", label: "Presença", screen: "attendance", phone: "cardMobile",
    title: "Presença pelo QR Code da carteirinha",
    text: "A recepção marca quem treinou ou lê o QR Code da carteirinha do aluno com um leitor conectado ao computador. O código vale para o dia e não duplica presença.",
    points: ["Frequência dos últimos 30 dias por aluno", "Lista de alunos que sumiram dos treinos", "O aluno pode gerar um código novo a qualquer momento"],
  },
  {
    id: "area-do-aluno", label: "Área do Aluno", screen: "portal", phone: "portalMobile",
    title: "Uma área própria para cada aluno",
    text: "O aluno, ou o responsável por um aluno menor, acompanha a própria situação: mensalidades, Pix, frequência, graduações, comunicados, documentos e carteirinha.",
    points: ["Somente leitura: o aluno não marca pagamento nem presença", "Não vê dados de outros alunos, nem trocando o endereço", "Download de todos os próprios dados (LGPD)"],
  },
  {
    id: "comunicados", label: "Comunicados", screen: "announcements", phone: "announcementsMobile",
    title: "Avisos que chegam a todos os alunos",
    text: "Horários, feriados, eventos e graduações são publicados em um mural que os alunos ativos veem na Área do Aluno. Dá para fixar avisos no topo e arquivar os antigos.",
    points: ["Permissão própria para quem publica", "Arquivar tira do mural sem apagar", "Sem envio por e-mail ou WhatsApp: o aviso fica no mural"],
  },
  {
    id: "identidade", label: "Identidade", screen: "branding",
    title: "Documentos com a cara da sua academia",
    text: "A logo da academia vai para o cabeçalho da ficha de matrícula, do contrato e dos recibos. A marca Kombexa aparece só no rodapé, como sistema emissor.",
    points: ["PNG, JPEG ou WebP de até 1 MB", "Prévia do cabeçalho antes de salvar", "Sem logo, os documentos saem com as iniciais da academia"],
  },
  {
    id: "documentos", label: "Ficha", screen: "enrollment",
    title: "Ficha de matrícula e contrato prontos",
    text: "A ficha reúne os dados do aluno, da matrícula e os termos definidos pela academia. É impressa para assinatura e a academia registra a data em que foi assinada.",
    points: ["Razão social e responsável da academia no contrato", "Imprimir ou salvar em PDF", "Assinatura registrada no perfil do aluno"],
  },
  {
    id: "equipe", label: "Equipe", screen: "team",
    title: "Cada pessoa da equipe vê só o que precisa",
    text: "Quem tem acesso total gerencia a equipe. As demais pessoas recebem acesso por área: alunos, saúde, mensalidades, pagamentos, presença, financeiro, comunicados, configurações e auditoria.",
    points: ["Auditoria de quem fez cada ação e quando", "Cada academia acessa somente os próprios dados", "A plataforma não vê os dados dos alunos"],
  },
];
