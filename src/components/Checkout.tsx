import { useMemo, useState } from 'react'
import { ArrowLeft, CircleCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { agruparPedido } from '@/lib/agruparPedido'
import { aplicarCupom } from '@/lib/aplicarCupom'
import { formatarPreco } from '@/lib/formatar'
import type { Lanche } from '@/types/lanche'

interface CheckoutProps {
  pedido: Lanche[]
  onVoltar: () => void
  onConfirmar: (totalFinal: number) => void
}

export function Checkout({ pedido, onVoltar, onConfirmar }: CheckoutProps) {
  const [codigoDigitado, setCodigoDigitado] = useState('')
  const [codigoAplicado, setCodigoAplicado] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const itens = useMemo(() => agruparPedido(pedido), [pedido])
  const subtotal = useMemo(
    () => itens.reduce((soma, item) => soma + item.subtotal, 0),
    [itens]
  )
  const emojiPorId = useMemo(
    () => new Map(pedido.map((lanche) => [lanche.id, lanche.emoji])),
    [pedido]
  )

  const resultadoAplicado = useMemo(() => {
    if (!codigoAplicado) return null
    if (pedido.length === 0 || subtotal <= 0) return null
    const resultado = aplicarCupom(subtotal, codigoAplicado)
    return resultado.ok ? resultado : null
  }, [codigoAplicado, pedido.length, subtotal])

  const totalFinal = resultadoAplicado?.totalFinal ?? subtotal

  function handleAplicar() {
    if (pedido.length === 0 || subtotal <= 0) {
      setErro('Pedido vazio')
      setCodigoAplicado(null)
      return
    }

    const resultado = aplicarCupom(subtotal, codigoDigitado)
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
    <Card data-testid="tela-checkout">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul>
          {itens.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border-b py-2 last:border-b-0"
              data-testid="item-pedido"
            >
              <span>
                <span className="mr-2">{emojiPorId.get(item.id)}</span>
                {item.quantidade}× {item.nome}
              </span>
              <span className="font-medium">{formatarPreco(item.subtotal)}</span>
            </li>
          ))}
        </ul>

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

        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary" data-testid="total-checkout">
            {formatarPreco(totalFinal)}
          </span>
        </div>

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
      <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onVoltar}
          data-testid="botao-voltar-cardapio"
        >
          <ArrowLeft className="size-4" />
          Voltar ao cardápio
        </Button>
        <Button
          type="button"
          onClick={() => onConfirmar(totalFinal)}
          data-testid="botao-confirmar-pedido"
        >
          Confirmar pedido
        </Button>
      </CardFooter>
    </Card>
  )
}

interface PedidoConfirmadoProps {
  total: number
  onVoltar: () => void
}

export function PedidoConfirmado({ total, onVoltar }: PedidoConfirmadoProps) {
  return (
    <Card data-testid="tela-confirmado">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleCheck className="size-5 text-emerald-500" />
          Pedido confirmado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Total:{' '}
          <span className="font-bold text-foreground" data-testid="total-confirmado">
            {formatarPreco(total)}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <Button type="button" onClick={onVoltar} data-testid="botao-voltar-cardapio">
          Voltar ao cardápio
        </Button>
      </CardFooter>
    </Card>
  )
}
