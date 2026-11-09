import { describe, expect, it } from 'vitest'
import { formatarPreco } from './formatar'

describe('formatarPreco', () => {
  it('formata valor em reais (pt-BR)', () => {
    expect(formatarPreco(10)).toBe('R$\u00a010,00')
  })
})
