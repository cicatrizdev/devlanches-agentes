import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatarPreco } from '@/lib/formatar'

interface ResumoPedidoProps {
  quantidade: number
  total: number
  onFinalizar: () => void
}

export function ResumoPedido({ quantidade, total, onFinalizar }: ResumoPedidoProps) {
  return (
    <Card className="py-3">
      <CardContent className="space-y-3 px-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShoppingBag className="size-4" />
            {quantidade === 0
              ? 'Seu pedido está vazio'
              : `${quantidade} ${quantidade === 1 ? 'item' : 'itens'} no pedido`}
          </span>
          <span className="text-lg font-bold text-primary">{formatarPreco(total)}</span>
        </div>
        <Button
          type="button"
          className="w-full"
          disabled={quantidade === 0}
          onClick={onFinalizar}
          data-testid="botao-finalizar-pedido"
        >
          Finalizar pedido
        </Button>
      </CardContent>
    </Card>
  )
}
