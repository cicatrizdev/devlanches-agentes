export type Categoria = 'burger' | 'acompanhamento' | 'bebida' | 'sobremesa' | 'combo'

export interface Lanche {
  id: number
  nome: string
  descricao: string
  categoria: Categoria
  preco: number
  emoji: string
}

export const CATEGORIAS: { valor: Categoria | 'todas'; rotulo: string }[] = [
  { valor: 'todas', rotulo: '🍽️ Todas' },
  { valor: 'burger', rotulo: '🍔 Burgers' },
  { valor: 'acompanhamento', rotulo: '🍟 Acompanhamentos' },
  { valor: 'bebida', rotulo: '🥤 Bebidas' },
  { valor: 'sobremesa', rotulo: '🍮 Sobremesas' },
  { valor: 'combo', rotulo: '🎯 Combos' },
]
