import { useMemo } from 'react'
import { ArrowLeft, CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { agruparPedido } from '@/lib/agruparPedido'
import { formatarPreco } from '@/lib/formatar'
import type { Lanche } from '@/types/lanche'

interface CheckoutProps {
  pedido: Lanche[]
  onVoltar: () => void
  onConfirmar: () => void
}

export function Checkout({ pedido, onVoltar, onConfirmar }: CheckoutProps) {
  const itens = useMemo(() => agruparPedido(pedido), [pedido])
  const total = useMemo(
    () => itens.reduce((soma, item) => soma + item.subtotal, 0),
    [itens]
  )
  const emojiPorId = useMemo(
    () => new Map(pedido.map((lanche) => [lanche.id, lanche.emoji])),
    [pedido]
  )

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
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary" data-testid="total-checkout">
            {formatarPreco(total)}
          </span>
        </div>
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
        <Button type="button" onClick={onConfirmar} data-testid="botao-confirmar-pedido">
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
