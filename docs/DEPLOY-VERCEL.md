# Publicar na Vercel

O site é estático e não precisa de banco, variáveis secretas nem serviços externos. A Vercel detecta o Next.js sozinha.

## 1. Criar o repositório no GitHub

Na pasta do projeto (extraída do ZIP):

```bash
git init
git add .
git commit -m "Site de apresentação do Kombexa"
git branch -M main
```

Crie um repositório **vazio** no GitHub (sem README, sem .gitignore e sem licença), por exemplo `kombexa-website`, e envie:

```bash
git remote add origin https://github.com/SEU-USUARIO/kombexa-website.git
git push -u origin main
```

Com a GitHub CLI dá para fazer em um passo: `gh repo create kombexa-website --private --source=. --push`.

Antes do primeiro commit, confira com `git status` que `node_modules/`, `.next/` e arquivos `.env` não aparecem. O `.gitignore` já os exclui.

## 2. Importar na Vercel

1. Acesse vercel.com, entre com a conta do GitHub e clique em **Add New… → Project**.
2. Escolha o repositório `kombexa-website` e clique em **Import**.
3. Confira as configurações detectadas:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (padrão)
   - **Install Command:** `npm install` (padrão; a Vercel usa o `package-lock.json`)
   - **Environment Variables:** nenhuma é necessária
4. Clique em **Deploy**.

A Vercel escolhe a versão do Node pelo campo `engines` do `package.json` (`>=22.18.0`). Se quiser fixar, ajuste em **Settings → Build and Deployment → Node.js Version** (22.x ou 24.x).

## 3. Depois do primeiro deploy

- Cada `git push` na branch `main` publica uma nova versão. Pull requests ganham endereços de pré-visualização.
- **Domínio próprio:** em **Settings → Domains**, adicione o domínio e siga as instruções de DNS. Depois, se quiser que os metadados usem esse domínio em vez do endereço `.vercel.app`, crie a variável `NEXT_PUBLIC_SITE_URL` (por exemplo `https://www.seudominio.com.br`) e faça um novo deploy.
- **Conferir a publicação:** abra `/`, `/tour`, `/demo`, `/privacidade`, `/sitemap.xml` e `/robots.txt`. Para testar o compartilhamento, cole o endereço em um validador de Open Graph.

## Problemas comuns

| Sintoma | O que fazer |
| --- | --- |
| Erro de versão do Node no build | Fixe Node 22.x ou 24.x em Settings → Build and Deployment |
| Imagens não aparecem | Confira se a pasta `public/images/product/` foi enviada ao GitHub |
| Metadados apontam para o endereço `.vercel.app` | Defina `NEXT_PUBLIC_SITE_URL` com o domínio final e refaça o deploy |
