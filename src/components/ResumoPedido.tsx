import { ShoppingBag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatarPreco } from '@/lib/formatar'

interface ResumoPedidoProps {
  quantidade: number
  total: number
}

export function ResumoPedido({ quantidade, total }: ResumoPedidoProps) {
  return (
    <Card className="py-3">
      <CardContent className="flex items-center justify-between px-4">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShoppingBag className="size-4" />
          {quantidade === 0
            ? 'Seu pedido está vazio'
            : `${quantidade} ${quantidade === 1 ? 'item' : 'itens'} no pedido`}
        </span>
        <span className="text-lg font-bold text-primary">{formatarPreco(total)}</span>
      </CardContent>
    </Card>
  )
}
