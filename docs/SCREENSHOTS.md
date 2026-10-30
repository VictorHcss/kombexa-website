# Telas usadas no site

## Como foram obtidas

Todas as imagens são **capturas reais** do Kombexa original, versão 0.11.0 (repositório [VictorHcss/kombexa](https://github.com/VictorHcss/kombexa), commit `258429d`). O sistema não foi alterado.

1. O sistema rodou localmente: `npm install`, PostgreSQL 16 local, `npm run db:migrate`, `npm run db:seed` e o build de produção (`npm run build && npm start`).
2. Os dados são os **fictícios do seed** do próprio projeto: "Academia Punho de Ferro (exemplo)", e-mails `@academia.dev` e documentos de exemplo. Nenhum dado real de cliente ou academia foi usado.
3. Para mostrar recursos que o seed deixa vazios, foram criados no banco local, pela interface do sistema:
   - dois comunicados fictícios ("Graduação de fim de ano" e "Feriado: academia fechada");
   - uma logo inventada para a academia de exemplo (um círculo azul com "PF – Exemplo").
4. As capturas foram feitas com Chromium headless:
   - computador: 1440×900 com densidade 1,5, reduzidas para 1920×1200;
   - celular: 390×844 com densidade 2, mantidas em 780×1688.

   Contas usadas: `admin@academia.dev` para as telas da equipe e `aluno@academia.dev` para a Área do Aluno, ambas do seed.
5. Todas as imagens foram convertidas para WebP (qualidade 80 a 82), somando cerca de 2 MB.

**Mockups:** nenhuma tela precisou de mockup. A demonstração interativa (`/demo`) não usa imagens: é uma reprodução em código da interface, com dados fictícios próprios e identificada como demonstração na própria tela.

## Catálogo

O código referencia as imagens por `lib/screens.ts`, que também guarda os textos alternativos.

| Arquivo | Tela do sistema | Objetivo visual | Tipo |
| --- | --- | --- | --- |
| `dashboard-overview.webp` | Início (equipe) | Hero, tour e passo 3: o que pede ação no dia | Captura real |
| `dashboard-dark-theme.webp` | Início no tema escuro | Reserva: mostrar o tema escuro | Captura real |
| `students-list.webp` | Alunos | Pesquisa, status e situação financeira | Captura real |
| `student-profile.webp` | Perfil do aluno (Cadastro) | Visão completa do aluno | Captura real |
| `student-fees.webp` | Perfil do aluno (Mensalidades) | Reserva: mensalidade paga × atrasada | Captura real |
| `fees-management.webp` | Mensalidades | Geração e situação das mensalidades | Captura real |
| `payments-list.webp` | Pagamentos | Reserva: lista de pagamentos e recibos | Captura real |
| `payment-receipt.webp` | Recibo de pagamento | Recibo com a logo da academia | Captura real |
| `financial-overview.webp` | Financeiro | Entradas, saídas e saldo | Captura real |
| `reports.webp` | Relatórios | Reserva: recebido × esperado | Captura real |
| `attendance-management.webp` | Presença | Registro pelo QR Code e lista do dia | Captura real |
| `announcements.webp` | Comunicados (equipe) | Mural de avisos | Captura real |
| `academy-branding.webp` | Configurações: identidade visual | Logo da academia e prévia do cabeçalho | Captura real |
| `team-permissions.webp` | Configurações: equipe e acesso | Permissões por área | Captura real |
| `enrollment-document.webp` | Ficha de matrícula e contrato | Documento com a logo da academia | Captura real |
| `student-invite.webp` | Convidar alunos | Passo 2: convite com QR Code | Captura real |
| `audit-log.webp` | Auditoria | Diferenciais: rastreabilidade | Captura real |
| `student-portal.webp` | Área do Aluno (computador) | Tour: Área do Aluno | Captura real |
| `mobile-dashboard.webp` | Início no celular | Tour: interface mobile da equipe | Captura real |
| `mobile-students.webp` | Alunos no celular | Reserva | Captura real |
| `student-portal-mobile.webp` | Área do Aluno: Início (celular) | Seção Área do Aluno e tour | Captura real |
| `student-card-mobile.webp` | Área do Aluno: Carteirinha (celular) | Hero, seção Área do Aluno e tour | Captura real |
| `student-attendance-mobile.webp` | Área do Aluno: Frequência (celular) | Seção Área do Aluno | Captura real |
| `student-documents-mobile.webp` | Área do Aluno: Documentos (celular) | Reserva | Captura real |
| `student-announcements-mobile.webp` | Área do Aluno: Comunicados (celular) | Tour: comunicados | Captura real |

As imagens marcadas como "reserva" estão no catálogo e prontas para uso, mas não aparecem em nenhuma página hoje.

A imagem `app/opengraph-image.png` (1200×630) foi montada a partir de `dashboard-overview.webp`, com o título do site.

## Observações e cuidados

- **Botão de arquivo em inglês:** em `academy-branding.webp`, o botão nativo de escolher arquivo aparece como "Choose File". O Chromium headless usado não tem o idioma pt-BR; no navegador do usuário, o botão aparece no idioma dele.
- **Nada sensível:** as imagens mostram apenas dados do seed (nomes, telefones, CNPJ e e-mails de exemplo). Não aparecem tokens, senhas, chaves ou endereços de servidor.
- **Carteirinha:** o QR Code e o código de presença da carteirinha valiam só para o banco local descartável usado nas capturas.

## Como refazer as capturas

1. Rode o Kombexa original localmente com o seed (veja o README do original).
2. Entre com as contas de teste criadas pelo seed (as credenciais estão no README do original).
3. Capture as mesmas rotas em 1440×900 (densidade 1,5) e 390×844 (densidade 2).
4. Converta para WebP com os mesmos nomes de arquivo.

Rotas da equipe: `/`, `/alunos`, `/alunos/[id]`, `/alunos/[id]?aba=mensalidades`, `/alunos/[id]/ficha`, `/mensalidades`, `/pagamentos`, `/pagamentos/[id]/recibo`, `/financeiro`, `/relatorios`, `/presenca`, `/comunicados`, `/configuracoes?aba=identidade`, `/configuracoes?aba=acesso`, `/convidar` e `/auditoria`.

Rotas da Área do Aluno: `/aluno`, `/aluno/carteirinha`, `/aluno/frequencia`, `/aluno/documentos` e `/aluno/comunicados`.

Como os nomes não mudam, nenhum código precisa ser alterado.
