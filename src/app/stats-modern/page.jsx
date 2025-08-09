import StatsModern from "@/components/stats-modern"

export default function Page() {
  // Example values; swap with live counts from your API in a Server Component.
  const countries = 252
  const clients = 15420
  const exported = 18400000

  return (
    (<main className="min-h-svh bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Modern Stats</h1>
          <p className="mt-2 text-sm text-muted-foreground">Coverage & usage at a glance</p>
        </header>
        <StatsModern
          countries={countries}
          clients={clients}
          exported={exported}
          exportedUnit="rows"
          compact
          animate
          className="mx-auto max-w-5xl" />
      </div>
    </main>)
  );
}
