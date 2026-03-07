# Front DFS12

Frontend do projeto de troca de conhecimentos da disciplina DFS.

## Objetivo do projeto

Este repositório contém a interface web onde usuários podem:

- criar conta e fazer login;
- explorar conhecimentos compartilhados por outras pessoas;
- criar, editar e excluir seus próprios conhecimentos;
- acessar funcionalidades administrativas (quando `isAdmin = true`).

Este frontend se conecta **exclusivamente** ao backend:

- https://github.com/lucasstsx/dfs12

## Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- TanStack Router (file-based routing)
- TanStack Query
- TanStack Form
- Tailwind CSS 4
- Axios
- Zod
- Biome (lint/format/check)

## Como executar a aplicação

### 1) Subir o backend primeiro

Clone e rode o backend conforme o README oficial:

- https://github.com/lucasstsx/dfs12

Por padrão, a API responde em `http://localhost:3000/api`.

### 2) Configurar este frontend

No diretório deste projeto:

```bash
npm install
```

Crie um arquivo `.env` na raiz (opcional, mas recomendado):

```env
VITE_API_URL=http://localhost:3000/api
```

### 3) Rodar em desenvolvimento

Se o backend estiver em `3000`, rode o frontend em outra porta:

```bash
npm run dev -- --port 5173
```

Se preferir manter o frontend em `3000`, altere a porta do backend e ajuste `VITE_API_URL`.

### 4) Build de produção

```bash
npm run build
npm run preview
```

## Scripts úteis

```bash
npm run check
npm run lint
npm run format
npm run test
```
