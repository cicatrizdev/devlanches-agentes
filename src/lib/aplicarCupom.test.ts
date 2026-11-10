import { describe, expect, it } from 'vitest'
import { aplicarCupom } from './aplicarCupom'

describe('aplicarCupom', () => {
  it('SEXTOU dá 10% de desconto', () => {
    expect(aplicarCupom(50, 'SEXTOU')).toEqual({
      valido: true,
      codigo: 'SEXTOU',
      desconto: 5,
      totalComDesconto: 45,
    })
  })

  it('ignora maiúsculas/minúsculas e espaços nas pontas', () => {
    expect(aplicarCupom(50, '  sextou ')).toEqual({
      valido: true,
      codigo: 'SEXTOU',
      desconto: 5,
      totalComDesconto: 45,
    })
  })

  it('SEXTOU funciona com preço quebrado', () => {
    expect(aplicarCupom(69.8, 'SEXTOU')).toEqual({
      valido: true,
      codigo: 'SEXTOU',
      desconto: 6.98,
      totalComDesconto: 62.82,
    })
  })

  it('SEXTOU arredonda o desconto para centavos', () => {
    expect(aplicarCupom(33.33, 'SEXTOU')).toEqual({
      valido: true,
      codigo: 'SEXTOU',
      desconto: 3.33,
      totalComDesconto: 30,
    })
  })

  it('PRIMEIROPR dá R$ 5,00 de desconto fixo', () => {
    expect(aplicarCupom(69.8, 'PRIMEIROPR')).toEqual({
      valido: true,
      codigo: 'PRIMEIROPR',
      desconto: 5,
      totalComDesconto: 64.8,
    })
  })

  it('o total nunca fica negativo', () => {
    expect(aplicarCupom(3, 'PRIMEIROPR')).toEqual({
      valido: true,
      codigo: 'PRIMEIROPR',
      desconto: 3,
      totalComDesconto: 0,
    })
  })

  it('pedido vazio não aceita cupom', () => {
    expect(aplicarCupom(0, 'SEXTOU')).toEqual({ valido: false, erro: 'pedido-vazio' })
  })

  it('código vazio ou só com espaços é rejeitado', () => {
    expect(aplicarCupom(50, '')).toEqual({ valido: false, erro: 'codigo-vazio' })
    expect(aplicarCupom(50, '   ')).toEqual({ valido: false, erro: 'codigo-vazio' })
  })

  it('código inexistente é inválido', () => {
    expect(aplicarCupom(50, 'XPTO')).toEqual({ valido: false, erro: 'invalido' })
  })

  it('chave herdada de Object não é cupom', () => {
    expect(aplicarCupom(50, 'toString')).toEqual({ valido: false, erro: 'invalido' })
  })
})
