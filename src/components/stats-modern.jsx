"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Globe2, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

function useCounter(
  target,
  { duration = 900, start = 0, enabled = true } = {}
) {
  const [val, setVal] = useState(enabled ? start : target);
  const raf = useRef();
  useEffect(() => {
    if (!enabled) {
      setVal(target);
      return;
    }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(start + (target - start) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, start, enabled]);
  return Math.round(val);
}

function Stat({
  icon: Icon,
  label,
  value,
  suffix,
  compact = true,
  animate = true,
}) {
  const n = useCounter(value, { enabled: animate });
  return (
    <>
      <Card className="relative overflow-hidden gap-4 md:gap-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {label}
          </CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl 2xl:text-5xl font-semibold tabular-nums">
            {formatNumber(n, compact)}
            {suffix ? (
              <>
                {" "}
                <span className="text-base font-normal text-muted-foreground">
                  {suffix}
                </span>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default function StatsModern({
  countries = 249,
  clients = 12800,
  exported = 12500000,
  exportedUnit = "rows",
  compact = true,
  animate = true,
}) {
  return (
    <>
      <section className="relative container mx-auto px-4 py-6 lg:py-12">
        <p className="text-3xl font-semibold tracking-tight text-foreground text-center">
          Live Dataset Stats
        </p>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          Coverage & usage at a glance
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-12">
          <Stat
            icon={Globe2}
            label="Countries"
            value={countries}
            compact={compact}
            animate={animate}
          />
          <Stat
            icon={Users2}
            label="Clients served"
            value={clients}
            compact={compact}
            animate={animate}
          />
          <Stat
            icon={Download}
            label="Data exported"
            value={exported}
            compact={compact}
            animate={animate}
            suffix={exportedUnit}
          />
        </div>
      </section>
    </>
  );
}
