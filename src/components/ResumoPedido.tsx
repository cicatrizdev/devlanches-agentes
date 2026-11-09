import { useMemo, useState } from 'react'
import { ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { aplicarCupom } from '@/lib/aplicarCupom'
import { formatarPreco } from '@/lib/formatar'

interface ResumoPedidoProps {
  quantidade: number
  total: number
}

export function ResumoPedido({ quantidade, total }: ResumoPedidoProps) {
  const [codigoDigitado, setCodigoDigitado] = useState('')
  const [codigoAplicado, setCodigoAplicado] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const resultadoAplicado = useMemo(() => {
    if (!codigoAplicado) return null
    if (quantidade === 0 || total <= 0) return null
    const resultado = aplicarCupom(total, codigoAplicado)
    return resultado.ok ? resultado : null
  }, [codigoAplicado, quantidade, total])

  const totalFinal = resultadoAplicado?.totalFinal ?? total

  function handleAplicar() {
    if (quantidade === 0 || total <= 0) {
      setErro('Pedido vazio')
      setCodigoAplicado(null)
      return
    }

    const resultado = aplicarCupom(total, codigoDigitado)
    if (!resultado.ok) {
      setErro(resultado.erro)
      setCodigoAplicado(null)
      return
    }

    setCodigoAplicado(resultado.codigo)
    setErro(null)
  }

  function handleRemover() {
    setCodigoAplicado(null)
    setErro(null)
    setCodigoDigitado('')
  }

  return (
    <Card className="py-3" data-testid="resumo-pedido">
      <CardContent className="space-y-3 px-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShoppingBag className="size-4" />
            {quantidade === 0
              ? 'Seu pedido está vazio'
              : `${quantidade} ${quantidade === 1 ? 'item' : 'itens'} no pedido`}
          </span>
          <span className="text-lg font-bold text-primary" data-testid="total-pedido">
            {formatarPreco(totalFinal)}
          </span>
        </div>

        {resultadoAplicado && (
          <div
            className="flex items-center justify-between text-sm text-muted-foreground"
            data-testid="linha-desconto"
          >
            <span>Desconto ({resultadoAplicado.codigo})</span>
            <span className="font-medium text-emerald-500">
              −{formatarPreco(resultadoAplicado.desconto)}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            aria-label="Cupom de desconto"
            placeholder="Cupom de desconto"
            value={codigoDigitado}
            onChange={(evento) => setCodigoDigitado(evento.target.value)}
            disabled={!!codigoAplicado}
            data-testid="input-cupom"
          />
          {codigoAplicado ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleRemover}
              data-testid="botao-remover-cupom"
            >
              <X className="size-4" />
              Remover
            </Button>
          ) : (
            <Button type="button" onClick={handleAplicar} data-testid="botao-aplicar-cupom">
              Aplicar
            </Button>
          )}
        </div>

        {erro && (
          <p className="text-sm text-destructive" data-testid="erro-cupom" role="alert">
            {erro}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
