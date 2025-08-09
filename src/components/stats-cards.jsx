import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Globe2, Users2 } from "lucide-react"
import { cn } from "@/lib/utils"

function formatNumber(value, compact = true) {
  try {
    return new Intl.NumberFormat(undefined, {
      notation: compact ? "compact" : "standard",
      maximumFractionDigits: compact ? 1 : 0,
    }).format(value);
  } catch {
    return String(value);
  }
}

export function StatsCards({
  countries = 249,
  clients = 1280,
  exported = 12500000,
  compact = true,
  className
}) {
  return (
    (<section
      aria-label="Platform stats"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      <Card
        className="relative overflow-hidden animate-in fade-in-50 slide-in-from-bottom-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Countries</CardTitle>
          <Globe2 aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tabular-nums">{formatNumber(countries, compact)}</div>
          <p className="mt-1 text-xs text-muted-foreground">{"Available datasets"}</p>
        </CardContent>
      </Card>
      <Card
        className="relative overflow-hidden animate-in fade-in-50 slide-in-from-bottom-1 [animation-delay:80ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Clients served</CardTitle>
          <Users2 aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tabular-nums">
            {formatNumber(clients, compact)} <span className="text-base font-normal text-muted-foreground">{"+"}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{"Organizations & developers"}</p>
        </CardContent>
      </Card>
      <Card
        className="relative overflow-hidden animate-in fade-in-50 slide-in-from-bottom-1 [animation-delay:160ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Data exported</CardTitle>
          <Download aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tabular-nums">
            {formatNumber(exported, compact)}{" "}
            <span className="text-base font-normal text-muted-foreground">{"rows"}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{"Across CSV, JSON, and APIs"}</p>
        </CardContent>
      </Card>
    </section>)
  );
}

export default StatsCards
