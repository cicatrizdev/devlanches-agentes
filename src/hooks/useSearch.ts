import { useEffect, useState } from 'react'
import { useFetch } from './useFetch'
import type { Lanche } from '@/types/lanche'

// Hook de DOMÍNIO: sabe o que é buscar um lanche na DevLanches.
// Ele compõe o useFetch genérico com as regras do nosso negócio
// (debounce + montagem da URL) — composição de hooks na prática.
export function useSearch(termo: string, atraso = 350) {
  const [termoEstavel, setTermoEstavel] = useState(termo)

  // ✅ Outro useEffect legítimo: sincroniza com um sistema externo (timer).
  // Debounce: só "confirma" o termo quando o usuário para de digitar.
  useEffect(() => {
    const temporizador = setTimeout(() => setTermoEstavel(termo), atraso)
    return () => clearTimeout(temporizador)
  }, [termo, atraso])

  const { dados, carregando, erro } = useFetch<Lanche[]>(
    `/api/lanches?q=${encodeURIComponent(termoEstavel)}`
  )

  return { lanches: dados ?? [], carregando, erro }
}
