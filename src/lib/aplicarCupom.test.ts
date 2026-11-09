import { describe, expect, it } from 'vitest'
import { aplicarCupom } from './aplicarCupom'

describe('aplicarCupom', () => {
  it('SEXTOU aplica 10% de desconto', () => {
    const resultado = aplicarCupom(100, 'SEXTOU')
    expect(resultado).toEqual({
      ok: true,
      codigo: 'SEXTOU',
      desconto: 10,
      totalFinal: 90,
    })
  })

  it('PRIMEIROPR aplica R$ 5,00 de desconto', () => {
    const resultado = aplicarCupom(40, 'PRIMEIROPR')
    expect(resultado).toEqual({
      ok: true,
      codigo: 'PRIMEIROPR',
      desconto: 5,
      totalFinal: 35,
    })
  })

  it('ignora maiúsculas/minúsculas e espaços nas pontas', () => {
    expect(aplicarCupom(100, '  sextou  ')).toMatchObject({
      ok: true,
      codigo: 'SEXTOU',
      desconto: 10,
    })
    expect(aplicarCupom(40, 'primeiropr')).toMatchObject({
      ok: true,
      codigo: 'PRIMEIROPR',
      desconto: 5,
    })
  })

  it("cupom inválido retorna erro 'Cupom inválido' e não muda o total", () => {
    const resultado = aplicarCupom(50, 'NADA')
    expect(resultado).toEqual({
      ok: false,
      erro: 'Cupom inválido',
      totalFinal: 50,
    })
  })

  it('total nunca fica negativo (desconto maior que o total)', () => {
    const resultado = aplicarCupom(3, 'PRIMEIROPR')
    expect(resultado).toEqual({
      ok: true,
      codigo: 'PRIMEIROPR',
      desconto: 3,
      totalFinal: 0,
    })
  })

  it('pedido vazio não aceita cupom', () => {
    expect(aplicarCupom(0, 'SEXTOU')).toEqual({
      ok: false,
      erro: 'Pedido vazio',
      totalFinal: 0,
    })
  })
})
