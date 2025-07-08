# Projeto Web

Este projeto é uma aplicação web desenvolvida com React, Vite, TypeScript e TailwindCSS.

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Immer](https://immerjs.github.io/immer/)
- [React Hook Form](https://react-hook-form.com/)
- [Phosphor Icons](https://phosphoricons.com/)

## Pré-requisitos
- [Node.js](https://nodejs.org/) (recomendado v22+)
- [pnpm](https://pnpm.io/) (ou npm/yarn)

## Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   cd web
   ```
2. Instale as dependências:
   ```sh
   pnpm install
   # ou
   npm install
   # ou
   yarn install
   ```

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável (já existe um exemplo):

```
VITE_API_URL=http://localhost:3333
```

Altere o valor conforme o endereço da sua API backend.

## Scripts Disponíveis

- `pnpm dev` — Inicia o servidor de desenvolvimento
- `pnpm build` — Gera a build de produção
- `pnpm preview` — Visualiza a build de produção localmente
- `pnpm lint` — Executa o linter

Você pode substituir `pnpm` por `npm` ou `yarn` conforme o gerenciador de pacotes utilizado.

## Executando o Projeto

Para rodar o projeto em modo desenvolvimento:

```sh
pnpm dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador (porta padrão do Vite).

Para gerar a build de produção:

```sh
pnpm build
```

Para visualizar a build de produção:

```sh
pnpm preview
```

## Estrutura de Pastas

- `src/` — Código-fonte da aplicação
- `components/` — Componentes reutilizáveis
- `pages/` — Páginas principais
- `http/` — Configurações de endpoints e tipos
- `store/` — Gerenciamento de estado
- `utils/` — Funções utilitárias