import { CardapioSearch } from '@/components/CardapioSearch'

export default function App() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          DevLanches <span className="align-middle">🍔</span>
        </h1>
        <p className="text-muted-foreground">
          A hamburgueria com os melhores nomes do mercado (de trabalho)
        </p>
      </header>
      <CardapioSearch />
    </main>
  )
}
