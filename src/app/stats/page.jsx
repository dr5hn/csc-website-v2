import StatsCards from "@/components/stats-cards"

export default function Page() {
  return (
    (<main className="min-h-svh bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">{"Platform stats"}</h1>
          <p className="text-sm text-muted-foreground">{"Live snapshot of your dataset coverage and usage"}</p>
        </header>

        {/* Example usage with defaults */}
        <StatsCards />

        {/* Example usage with custom values (e.g., hydrated from your API) */}
        {/* 
        <StatsCards
          countries={await getCountryCount()}
          clients={await getClientCount()}
          exported={await getExportedRows()}
        /> 
        */}
      </div>
    </main>)
  );
}
