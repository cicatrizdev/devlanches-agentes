import { useEffect, useState } from 'react'

interface UseFetchResultado<T> {
  dados: T | null
  carregando: boolean
  erro: string | null
}

// Hook GENÉRICO e reutilizável: busca qualquer coisa de qualquer URL.
// O <T> é o TypeScript garantindo que quem consome sabe exatamente
// o formato dos dados — sem any, sem adivinhação.
export function useFetch<T>(url: string): UseFetchResultado<T> {
  const [dados, setDados] = useState<T | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  // ✅ Este useEffect é LEGÍTIMO: sincroniza o componente com um sistema
  // externo (a rede). A diferença para o BUG #1 está no cleanup:
  useEffect(() => {
    const controlador = new AbortController()
    setCarregando(true)
    setErro(null)

    fetch(url, { signal: controlador.signal })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('A cozinha não respondeu 🔥')
        return resposta.json() as Promise<T>
      })
      .then((resultado) => {
        setDados(resultado)
        setCarregando(false)
      })
      .catch((error: Error) => {
        // requisição cancelada não é erro — é o cleanup fazendo o trabalho dele
        if (error.name === 'AbortError') return
        setErro(error.message)
        setCarregando(false)
      })

    // 🔑 cleanup: quando a url muda (ou o componente sai de cena), a
    // requisição anterior é CANCELADA — a resposta velha nunca mais
    // atropela a nova. Adeus, race condition.
    return () => controlador.abort()
  }, [url])

  return { dados, carregando, erro }
}
