import { useCallback, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearch } from '@/hooks/useSearch'
import { Checkout, PedidoConfirmado } from './Checkout'
import { LancheCard } from './LancheCard'
import { ResumoPedido } from './ResumoPedido'
import { CATEGORIAS, type Lanche } from '@/types/lanche'

export function CardapioSearch() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [pedido, setPedido] = useState<Lanche[]>([])
  // Sem roteador: a tela é estado. Checkout e confirmação recebem o pedido
  // por props — a fonte da verdade continua aqui.
  const [tela, setTela] = useState<'cardapio' | 'checkout' | 'confirmado'>('cardapio')
  const [totalConfirmado, setTotalConfirmado] = useState(0)

  // ✅ Composição: useSearch (debounce + domínio) usa useFetch (rede +
  // cancelamento) por baixo. O componente não sabe — nem precisa saber —
  // como a busca funciona. Ele só declara o que quer.
  const { lanches, carregando, erro } = useSearch(busca)

  // ✅ Estado derivado se CALCULA, não se sincroniza.
  // Era: useState + useEffect (render duplo, estado "atrasado").
  // Virou: um cálculo durante o render, memoizado porque depende de lista.
  const lanchesFiltrados = useMemo(
    () =>
      categoria === 'todas'
        ? lanches
        : lanches.filter((lanche) => lanche.categoria === categoria),
    [lanches, categoria]
  )

  const total = useMemo(
    () => pedido.reduce((soma, lanche) => soma + lanche.preco, 0),
    [pedido]
  )

  // ✅ Identidade estável: a MESMA função em todos os renders, então o
  // memo() dos cards volta a funcionar. Repare no updater (atual) => …:
  // sem ler `pedido` de fora, a lista de dependências fica vazia.
  const adicionarAoPedido = useCallback((lanche: Lanche) => {
    setPedido((atual) => [...atual, lanche])
  }, [])

  const confirmarPedido = useCallback(() => {
    setTotalConfirmado(total)
    setPedido([])
    setTela('confirmado')
  }, [total])

  if (tela === 'checkout') {
    return (
      <Checkout
        pedido={pedido}
        onVoltar={() => setTela('cardapio')}
        onConfirmar={confirmarPedido}
      />
    )
  }

  if (tela === 'confirmado') {
    return (
      <PedidoConfirmado total={totalConfirmado} onVoltar={() => setTela('cardapio')} />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar no cardápio… (ex.: merge, deploy, café)"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />
        </div>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIAS.map(({ valor, rotulo }) => (
              <SelectItem key={valor} value={valor}>
                {rotulo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ResumoPedido
        quantidade={pedido.length}
        total={total}
        onFinalizar={() => setTela('checkout')}
      />

      {erro && (
        <Alert variant="destructive">
          <AlertTitle>Deu ruim na cozinha</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      {carregando ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, indice) => (
            <Skeleton key={indice} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lanchesFiltrados.map((lanche) => (
            <LancheCard key={lanche.id} lanche={lanche} onAdicionar={adicionarAoPedido} />
          ))}
        </div>
      )}

      {!carregando && !erro && lanchesFiltrados.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">
          Nenhum lanche encontrado… tenta &quot;useEffect&quot; 😉
        </p>
      )}
    </div>
  )
}
