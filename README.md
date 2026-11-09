# DevLanches 🍔 — live de agentes + TDD

> Repo da live Alura com Pedro "Cicatriz" Mello: usar um agente de código
> com TDD para entregar o ticket de **cupom de desconto** no pedido.

A DevLanches é a hamburgueria com os melhores nomes do mercado (de trabalho):
Big Deploy, Merge Conflict, Milkshake de Merge, Prod na Sexta…

Este repositório parte da versão limpa do cardápio (`useFetch` + `useSearch`)
e deixa o ticket de cupom pronto para ser resolvido ao vivo.

## Como rodar

Pré-requisito: Node 22+.

```bash
npm install
npm run dev
```

Sobe duas coisas:

- 🖥️ app React em `http://127.0.0.1:5173`
- 🍔 API em `http://127.0.0.1:3333` (com latência simulada)

## Testes

```bash
npm test          # Vitest (unidade)
npm run test:e2e  # Playwright (sobe app+API sozinho)
```

## Branches

| Branch | O que tem |
|---|---|
| `main` | **Antes**: app limpo + Vitest/Playwright configurados (smokes verdes) + ticket e regras do agente |
| `depois` | **Depois**: solução completa do cupom em 4 commits (TDD → função → UI → e2e + prova) |

```bash
git checkout main     # ponto de partida da live
git checkout depois   # resultado final (rede de segurança)
```

## Ticket da live

Veja [`docs/TICKET-cupom.md`](docs/TICKET-cupom.md).

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · shadcn/ui · Express 5 · Vitest · Playwright
