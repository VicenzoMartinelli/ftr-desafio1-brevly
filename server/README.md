# Brevly Server

Este projeto é um servidor backend para encurtamento de URLs, gerenciamento de links e exportação de relatórios, utilizando Node.js, Fastify, Drizzle ORM e integração com Cloudflare R2 para armazenamento.

## Sumário

- [Requisitos](#requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Comandos Principais](#comandos-principais)
- [Documentação da API (Scalar)](#documentação-da-api-scalar)
- [Estrutura do Projeto](#estrutura-do-projeto)
---

## Requisitos

- Node.js
- pnpm
- Docker (para banco de dados local)

## Configuração do Ambiente

1. Copie o arquivo `.env` como base para suas variáveis de ambiente locais e crie um .env.local:
   ```sh
   cp .env .env.local
   ```
2. Ajuste as variáveis conforme necessário, especialmente as credenciais do banco de dados e Cloudflare R2.

3. Suba o banco de dados local com Docker:
   ```sh
   docker-compose up -d
   ```

## Instalação

Instale as dependências do projeto:

```sh
pnpm install
```

## Comandos Principais

- **Iniciar em modo desenvolvimento:**
  ```sh
  pnpm dev
  ```
- **Gerar e rodar migrações do banco:**
  ```sh
  pnpm db:generate
  pnpm db:migrate
  ```
- **Build de produção:**
  ```sh
  pnpm build
  ```

## Documentação da API (Scalar)

A documentação interativa da API está disponível via Scalar, integrada ao servidor Fastify.

- Após iniciar o servidor, acesse: [http://localhost:3333/docs](http://localhost:3333/docs)

A documentação é gerada automaticamente a partir dos schemas e rotas do projeto, facilitando a exploração e testes dos endpoints.

## Estrutura do Projeto

```
src/
  app/                # Lógica de negócio e funções principais
  infra/
    db/               # Configuração e migrações do banco de dados
    http/             # Servidor Fastify e rotas HTTP
    storage/          # Integração com Cloudflare R2
  shared/             # Utilitários e helpers
.env, [`.env.local`](.env.local )      # Variáveis de ambiente
docker/               # Scripts para banco de dados local
```

---
