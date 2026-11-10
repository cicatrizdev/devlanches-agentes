type RegraCupom =
  | { readonly tipo: 'percentual'; readonly valor: number }
  | { readonly tipo: 'fixo'; readonly valor: number }

export const CUPONS = {
  SEXTOU: { tipo: 'percentual', valor: 10 },
  PRIMEIROPR: { tipo: 'fixo', valor: 5 },
} as const satisfies Record<string, RegraCupom>

export type CodigoCupom = keyof typeof CUPONS
export type ErroCupom = 'pedido-vazio' | 'codigo-vazio' | 'invalido'

export type ResultadoCupom =
  | {
      readonly valido: true
      readonly codigo: CodigoCupom
      readonly desconto: number
      readonly totalComDesconto: number
    }
  | { readonly valido: false; readonly erro: ErroCupom }

function isCodigoCupom(codigo: string): codigo is CodigoCupom {
  return Object.hasOwn(CUPONS, codigo)
}

function descontoEmCentavos(regra: RegraCupom, totalCentavos: number): number {
  switch (regra.tipo) {
    case 'percentual':
      return Math.round((totalCentavos * regra.valor) / 100)
    case 'fixo':
      return Math.round(regra.valor * 100)
    default: {
      const naoTratado: never = regra
      return naoTratado
    }
  }
}

export function aplicarCupom(total: number, codigoDigitado: string): ResultadoCupom {
  // Dinheiro em centavos inteiros: evita erros de ponto flutuante.
  const totalCentavos = Math.round(total * 100)
  if (totalCentavos <= 0) return { valido: false, erro: 'pedido-vazio' }

  const codigo = codigoDigitado.trim().toUpperCase()
  if (codigo === '') return { valido: false, erro: 'codigo-vazio' }
  if (!isCodigoCupom(codigo)) return { valido: false, erro: 'invalido' }

  // O desconto nunca passa do total, então o total final nunca fica negativo.
  const descontoCentavos = Math.min(totalCentavos, descontoEmCentavos(CUPONS[codigo], totalCentavos))

  return {
    valido: true,
    codigo,
    desconto: descontoCentavos / 100,
    totalComDesconto: (totalCentavos - descontoCentavos) / 100,
  }
}
