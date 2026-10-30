# Kombexa Website

Site de apresentação do **Kombexa**, plataforma de gestão para academias de artes marciais e esportes de combate.

O projeto possui três experiências principais:

- **Landing Page (`/`)** — apresenta o produto, suas funcionalidades, telas reais do sistema, Área do Aluno, diferenciais e perguntas frequentes.
- **Product Tour (`/tour`)** — tour guiado com 12 etapas pelas telas reais do sistema, incluindo navegação por teclado, indicador de progresso e opções para encerrar ou reiniciar.
- **Demonstração Interativa (`/demo`)** — reprodução simplificada da interface com dados fictícios. Permite simular pagamentos integrais e parciais, registrar presenças pelo código da carteirinha, publicar comunicados, personalizar a identidade da academia e visualizar a experiência pela Área do Aluno. Nenhuma alteração é persistida.

O site também possui uma página de privacidade (`/privacidade`) e uma página 404 personalizada.

## Relação com o Kombexa original

Este projeto é **independente** do sistema principal: [VictorHcss/kombexa](https://github.com/VictorHcss/kombexa).

Ele não copia a aplicação administrativa, não se conecta ao banco de dados e não consome APIs do sistema original.

O repositório principal foi utilizado apenas como referência:

- **Telas:** as imagens em `public/images/product/` são capturas da versão 0.11.0, executada localmente com dados fictícios do seed. Consulte [`docs/SCREENSHOTS.md`](docs/SCREENSHOTS.md).
- **Funcionalidades:** os textos descrevem apenas recursos documentados como implementados no README e em `docs/produto.md` do projeto original.
- **Identidade visual:** paleta, fontes Manrope e Barlow Condensed e monograma provisório seguem a identidade visual do sistema original.

Funcionalidades ainda não implementadas no sistema, como agenda de turmas, pagamento on-line e assinatura eletrônica, são identificadas como indisponíveis nas perguntas frequentes.

## Tecnologias

- Next.js 16.3.6 (App Router, páginas geradas estaticamente)
- React 19.3
- TypeScript 6
- Fontes auto-hospedadas via `@fontsource`
- ESLint 9
- Testes com o executor nativo do Node.js (`node:test`)

As animações utilizam CSS e respeitam a preferência `prefers-reduced-motion`.

O projeto não utiliza PostgreSQL, Docker, Redis, autenticação, variáveis secretas ou bibliotecas de animação.

## Requisitos

- Node.js **22.18 ou superior**
- npm

O build funciona a partir do Node.js 20.9, mas a versão 22.18 ou superior é necessária para executar os testes com suporte nativo a TypeScript.

## Instalação e execução local

```bash
npm install
npm run dev
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

Nenhum arquivo `.env` é necessário.

## Verificações

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run check
```

Para executar a versão de produção localmente:

```bash
npm start
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

### Testes

Os testes cobrem:

- Navegação do Product Tour: limites, teclado e correspondência entre etapas e telas existentes.
- Regras da demonstração: pagamentos integrais e parciais, valores inválidos, registro de presença sem duplicidade, comunicados, reinicialização e cenários coerentes em diferentes dias do mês.
- Estrutura do projeto: ausência de dependências de banco de dados e autenticação, ausência de arquivos `.env`, chaves ou segredos, existência e tamanho das imagens e validade dos links internos e âncoras.

## Publicação na Vercel

O projeto pode ser publicado diretamente na Vercel, sem necessidade de configurar variáveis de ambiente.

1. Envie o projeto para um repositório no GitHub.
2. Importe o repositório na Vercel.
3. Configure o projeto, se necessário.
4. Clique em **Deploy**.

Consulte [`docs/DEPLOY-VERCEL.md`](docs/DEPLOY-VERCEL.md) para o passo a passo completo.

## Estrutura do projeto

```text
app/
  page.tsx
  tour/
  demo/
  privacidade/
  not-found.tsx
  layout.tsx
  robots.ts
  sitemap.ts
  opengraph-image.png
  icon.svg
  apple-icon.png
  styles/

components/
  Brand
  SiteHeader
  SiteFooter
  Screens
  FeatureTabs
  tour/
  demo/

data/
  features.ts
  tour.ts

lib/
  demo.ts
  tour.ts
  screens.ts
  site.ts

public/
  images/product/

tests/
docs/
  SCREENSHOTS.md
  DEPLOY-VERCEL.md
```

## Endereço do site nos metadados

O endereço utilizado no Open Graph, no `sitemap.xml` e no `robots.txt` segue esta prioridade:

1. `NEXT_PUBLIC_SITE_URL`, caso seja definida.
2. `VERCEL_PROJECT_PRODUCTION_URL`, preenchida automaticamente pela Vercel.
3. `http://localhost:3000`, como endereço padrão local.

## Limitações conhecidas

- **Demonstração simplificada:** a demonstração reproduz a interface e algumas regras principais, mas não é o sistema real. Não possui login, cadastro de alunos, geração de mensalidades, recibos, relatórios, auditoria ou Área do Responsável.
- **QR Code e Pix ilustrativos:** o QR Code da carteirinha é apenas um padrão visual e não pode ser lido. O Pix copia e cola é um texto de exemplo.
- **Datas da demonstração:** utilizam o relógio do navegador do visitante. Por isso, a demonstração é montada somente no cliente e apresenta um aviso de carregamento.
- **Marca provisória:** o Kombexa ainda não possui logotipo oficial. O site utiliza o monograma provisório do sistema.
- **Sem contato comercial:** não há preços, formulário de contato ou perfis sociais. O único link externo é o repositório do GitHub.
- **Termos de uso:** não foram criados, pois o site não oferece um serviço nem coleta dados. A página `/privacidade` descreve essa condição.
- **Atualização das telas:** as capturas correspondem à versão 0.11.0. Quando o sistema original mudar, as imagens deverão ser atualizadas conforme as instruções em `docs/SCREENSHOTS.md`.
