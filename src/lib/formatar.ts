export function formatarPreco(preco: number): string {
  return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
