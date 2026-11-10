import { describe, expect, it } from 'vitest'
import { agruparPedido } from './agruparPedido'
import type { Lanche } from '@/types/lanche'

const bigDeploy: Lanche = {
  id: 1,
  nome: 'Big Deploy',
  descricao: 'Sai direto pra produção',
  categoria: 'burger',
  preco: 10,
  emoji: '🍔',
}

const cafe: Lanche = {
  id: 23,
  nome: 'Café CI/CD',
  descricao: 'Integração contínua de cafeína',
  categoria: 'bebida',
  preco: 5,
  emoji: '☕',
}

describe('agruparPedido', () => {
  it('pedido vazio retorna lista vazia', () => {
    expect(agruparPedido([])).toEqual([])
  })

  it('um item aparece com quantidade 1', () => {
    expect(agruparPedido([bigDeploy])).toEqual([
      {
        id: 1,
        nome: 'Big Deploy',
        quantidade: 1,
        precoUnitario: 10,
        subtotal: 10,
      },
    ])
  })

  it('itens iguais aparecem agrupados', () => {
    expect(agruparPedido([bigDeploy, bigDeploy])).toEqual([
      {
        id: 1,
        nome: 'Big Deploy',
        quantidade: 2,
        precoUnitario: 10,
        subtotal: 20,
      },
    ])
  })

  it('preserva a ordem da primeira aparição', () => {
    expect(agruparPedido([bigDeploy, cafe, bigDeploy])).toEqual([
      {
        id: 1,
        nome: 'Big Deploy',
        quantidade: 2,
        precoUnitario: 10,
        subtotal: 20,
      },
      {
        id: 23,
        nome: 'Café CI/CD',
        quantidade: 1,
        precoUnitario: 5,
        subtotal: 5,
      },
    ])
  })
})
