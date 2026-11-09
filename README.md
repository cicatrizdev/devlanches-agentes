# DevLanches 🍔

> Projeto da live **"Pare de lutar com o useEffect: escolhendo o Hook certo para cada cenário"** — Alura, com Pedro Celestino de Mello.
>
> Curso conectado: [React: explorando padrões de composição com custom hooks](https://www.alura.com.br)

A DevLanches é a hamburgueria com os melhores nomes do mercado (de trabalho): Big Deploy, Merge Conflict, Milkshake de Merge, Prod na Sexta…

O app é um cardápio com busca e filtro — e ele foi escrito **de propósito** com os erros mais comuns de `useEffect` que a gente encontra em projetos reais.

## Como rodar

Pré-requisito: Node 22+.

```bash
npm install
npm run dev
```

Isso sobe **duas coisas** de uma vez:

- 🖥️ o app React em `http://localhost:5173`
- 🍔 a API em `http://localhost:3333` — com **latência simulada**: buscas curtas demoram MAIS que buscas longas (como uma query sem índice). É isso que torna os bugs reproduzíveis.

## Os dois branches

| Branch | O que tem |
|---|---|
| `main` | A versão **ANTES**: um componente com 4 `useEffect` e os bugs numerados em comentários (`BUG #1` a `#5`) |
| `depois` | A versão **DEPOIS**: refatorada ao vivo — `useMemo`, `useCallback` e os custom hooks `useFetch` e `useSearch` |

```bash
git checkout depois   # ver o resultado final
git checkout main     # voltar para a versão bugada
```

## Experimente os bugs (branch `main`)

1. **Race condition** — digite `mer` rapidamente na busca: o input mostra "mer", mas a lista mostra os resultados de "m" (a resposta lenta chegou por último e atropelou a certa).
2. **Re-renders em cascata** — abra o console e digite qualquer coisa: TODOS os cards re-renderizam a cada tecla, mesmo usando `memo()`.
3. **Estado derivado "atrasado"** — `lanchesFiltrados` e `total` vivem em `useState` + `useEffect` quando deveriam ser apenas cálculos.

## A Árvore de Decisão da live

Antes de escrever `useEffect`, pergunte:

1. **É um valor que dá pra calcular a partir de props/estado?** → calcule no render (e `useMemo` se for caro)
2. **É uma função que você passa para um filho memoizado?** → `useCallback`
3. **É sincronização com um sistema externo** (rede, timer, DOM, WebSocket)? → aí sim, `useEffect` — com cleanup!

## Stack

React 19 · TypeScript 7 · Vite 8 · Tailwind CSS 4 · shadcn/ui · Express 5
