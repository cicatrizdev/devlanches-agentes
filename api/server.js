import express from 'express'
import cors from 'cors'
import { lanches } from './seed.js'

const app = express()
app.use(cors())

const dormir = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

app.get('/api/lanches', async (req, res) => {
  const q = (req.query.q ?? '').toString().trim().toLowerCase()

  // ⚠️ Latência proposital, INVERSAMENTE proporcional ao tamanho da busca:
  // buscas curtas (mais genéricas) demoram mais — como uma query sem índice.
  // É isso que torna a race condition do frontend reproduzível TODA vez:
  // digite "mer" rápido e a resposta de "m" chega DEPOIS da de "mer".
  const atraso = q.length === 0 ? 300 : Math.max(200, 1600 - q.length * 350)
  await dormir(atraso)

  // ?fail=1 → simula a cozinha pegando fogo (para demonstrar tratamento de erro)
  if (req.query.fail === '1') {
    return res.status(500).json({ erro: 'A chapa pegou fogo 🔥 (erro simulado)' })
  }

  const resultado = q
    ? lanches.filter((l) => `${l.nome} ${l.descricao}`.toLowerCase().includes(q))
    : lanches

  console.log(`🍔 GET /api/lanches q="${q}" → ${resultado.length} itens (após ${atraso}ms)`)
  res.json(resultado)
})

const PORTA = 3333
app.listen(PORTA, () => {
  console.log(`🍔 DevLanches API rodando em http://localhost:${PORTA} (latência simulada ativa)`)
})
