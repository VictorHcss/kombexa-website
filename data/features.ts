import type { ScreenKey } from "../lib/screens.ts";

export type Feature = { id: string; name: string; title: string; text: string; benefits: string[]; screen: ScreenKey };

/** Funcionalidades confirmadas no Kombexa v0.11.0 (README e docs/produto.md do repositório original). */
export const FEATURES: Feature[] = [
  {
    id: "alunos", name: "Alunos", screen: "students",
    title: "Cadastro completo, pesquisa rápida",
    text: "Dados pessoais, matrícula, responsável legal para menores, contato de emergência, uso de imagem e endereço. Pesquise por nome, telefone, e-mail, CPF ou responsável.",
    benefits: ["Irmãos podem compartilhar o mesmo responsável", "Histórico de graduações com data, modalidade e quem graduou", "Inativar sem perder o histórico"],
  },
  {
    id: "mensalidades", name: "Mensalidades", screen: "fees",
    title: "A mensalidade é paga pela soma dos pagamentos",
    text: "Gere as mensalidades do mês para todos os ativos sem duplicar. O atraso é identificado pelo vencimento, e a mensalidade só fica paga quando os pagamentos cobrem o valor.",
    benefits: ["Pagamento parcial com saldo em aberto", "Cobrança pelo WhatsApp com mensagem pronta", "Recibo com valor por extenso"],
  },
  {
    id: "presenca", name: "Presença", screen: "attendance",
    title: "Quem treinou hoje, em poucos toques",
    text: "Marque a presença na lista do dia ou leia o QR Code da carteirinha do aluno. A tela mostra quantos alunos ativos treinaram e quem anda sumido.",
    benefits: ["Código válido só no dia, sem presença duplicada", "Frequência dos últimos 30 dias no perfil", "Funciona com leitor de QR conectado ao computador"],
  },
  {
    id: "financeiro", name: "Financeiro", screen: "financial",
    title: "O caixa se monta sozinho",
    text: "Cada pagamento confirmado vira uma entrada. Lance despesas e outros recebimentos e veja entradas, saídas e saldo do período, com relatórios de recebido × esperado.",
    benefits: ["Pagamento pendente só entra no caixa ao ser confirmado", "Formas de pagamento do período", "Exportação em CSV"],
  },
  {
    id: "comunicados", name: "Comunicados", screen: "announcements",
    title: "Um mural de avisos para os alunos",
    text: "Publique horários, feriados, eventos e graduações. Os alunos ativos veem os avisos na Área do Aluno, com os fixados sempre no topo.",
    benefits: ["Arquivar tira do mural sem apagar", "Permissão própria para quem publica", "Categorias para organizar os avisos"],
  },
  {
    id: "identidade", name: "Identidade", screen: "branding",
    title: "A logo da sua academia nos documentos",
    text: "Envie a logo e confira a prévia do cabeçalho. Ela passa a sair na ficha de matrícula, no contrato e nos recibos.",
    benefits: ["PNG, JPEG ou WebP de até 1 MB", "Razão social e responsável usados no contrato", "Tema claro, escuro ou do sistema na interface"],
  },
  {
    id: "documentos", name: "Documentos", screen: "enrollment",
    title: "Ficha de matrícula e contrato prontos para imprimir",
    text: "A ficha reúne os dados do aluno e os termos definidos pela academia. Imprima ou salve em PDF; depois, registre a data da assinatura no perfil do aluno.",
    benefits: ["Termos da ficha configurados pela academia", "Recibos com a mesma identidade", "O aluno vê a própria ficha e os recibos"],
  },
  {
    id: "equipe", name: "Equipe", screen: "team",
    title: "Acesso por área para cada pessoa da equipe",
    text: "Quem tem acesso total gerencia a equipe. Para os demais, você libera só o necessário: alunos, saúde, mensalidades, pagamentos, presença, financeiro, comunicados, configurações ou auditoria.",
    benefits: ["Dez áreas de permissão independentes", "Auditoria de quem fez cada ação", "Desativar uma pessoa encerra as sessões dela"],
  },
];
