import type { Lanche } from '@/types/lanche'

export interface ItemPedido {
  id: number
  nome: string
  quantidade: number
  precoUnitario: number
  subtotal: number
}

export function agruparPedido(lanches: Lanche[]): ItemPedido[] {
  const grupos = new Map<number, ItemPedido>()

  for (const lanche of lanches) {
    const existente = grupos.get(lanche.id)
    if (existente) {
      existente.quantidade += 1
      existente.subtotal = existente.quantidade * existente.precoUnitario
    } else {
      grupos.set(lanche.id, {
        id: lanche.id,
        nome: lanche.nome,
        quantidade: 1,
        precoUnitario: lanche.preco,
        subtotal: lanche.preco,
      })
    }
  }

  return [...grupos.values()]
}
