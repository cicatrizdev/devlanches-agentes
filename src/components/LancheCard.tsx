import { memo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { formatarPreco } from '@/lib/formatar'
import type { Lanche } from '@/types/lanche'

interface LancheCardProps {
  lanche: Lanche
  onAdicionar: (lanche: Lanche) => void
}

// memo(): este card só deveria re-renderizar quando o SEU lanche mudar.
// Abra o console e digite na busca para conferir se isso é verdade… 👀
export const LancheCard = memo(function LancheCard({ lanche, onAdicionar }: LancheCardProps) {
  console.log(`🔄 render <LancheCard /> — ${lanche.nome}`)

  return (
    <Card className="gap-3">
      <CardContent className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-4xl leading-none">{lanche.emoji}</span>
          <Badge variant="secondary">{lanche.categoria}</Badge>
        </div>
        <CardTitle className="text-lg">{lanche.nome}</CardTitle>
        <CardDescription>{lanche.descricao}</CardDescription>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="font-semibold text-primary">{formatarPreco(lanche.preco)}</span>
        <Button size="sm" onClick={() => onAdicionar(lanche)}>
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  )
})
