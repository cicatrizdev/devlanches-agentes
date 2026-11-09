export type ResultadoCupom =
  | {
      ok: true
      codigo: string
      desconto: number
      totalFinal: number
    }
  | {
      ok: false
      erro: string
      totalFinal: number
    }

/**
 * Aplica um cupom sobre o total do pedido.
 * Regras: SEXTOU = 10%; PRIMEIROPR = R$ 5,00; total nunca negativo.
 */
export function aplicarCupom(total: number, codigoBruto: string): ResultadoCupom {
  if (total <= 0) {
    return { ok: false, erro: 'Pedido vazio', totalFinal: total }
  }

  const codigo = codigoBruto.trim().toUpperCase()

  let desconto = 0
  if (codigo === 'SEXTOU') {
    desconto = total * 0.1
  } else if (codigo === 'PRIMEIROPR') {
    desconto = 5
  } else {
    return { ok: false, erro: 'Cupom inválido', totalFinal: total }
  }

  if (desconto > total) {
    desconto = total
  }

  return {
    ok: true,
    codigo,
    desconto,
    totalFinal: total - desconto,
  }
}
