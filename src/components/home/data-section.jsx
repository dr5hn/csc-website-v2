"use client";

import DataSources from "@/components/data-sources";
import { usePlatformStats } from "@/hooks/use-platform-stats";
import { formatApprox } from "@/lib/format";
import { TEXT_STATS } from "@/lib/stats";
import { cn } from "@/lib/utils";

const FORMATS = ["JSON", "CSV", "Parquet", "MySQL", "PostgreSQL", "SQLite", "SQL Server", "MongoDB", "XML", "YAML", "GeoJSON", "TOON"];

// Live-number states (interaction spec 5): a grey skeleton while loading, the number with a
// "● live" tag when it came from the API, "cached" when the API failed and the build-time
// value is shown, and "static" for figures that are not fetched. Never blank, never zero.
const TILES = [
  { key: "countries", label: "countries", tone: "solid", skeleton: "58%", live: true },
  { key: "states", label: "states and regions", tone: "field", skeleton: "70%", live: true },
  { key: "cities", label: "cities", tone: "field", skeleton: "82%", live: true },
  { key: "formats", label: "download formats", tone: "lime", skeleton: "70%", live: false },
];

const TONES = {
  solid: { box: "bg-blue", fg: "text-white", sub: "text-[#dcebfb]", skeleton: "bg-white/25" },
  field: { box: "bg-field", fg: "text-ink", sub: "text-ink-2", skeleton: "bg-line-2" },
  lime: { box: "bg-live-bg", fg: "text-ink", sub: "text-live-ink", skeleton: "bg-line-2" },
};

export default function DataSection() {
  const { loading, live, raw } = usePlatformStats();

  const values = {
    countries: raw.countries.toLocaleString("en-US"),
    states: formatApprox(raw.states),
    cities: formatApprox(raw.cities),
    formats: TEXT_STATS.formats,
  };

  return (
    <section className="wrap section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
      <div className="flex flex-col gap-[18px]">
        <div className="eyebrow">The data</div>
        <h2 className="display-2 m-0">Clean, linked records, from region down to city.</h2>
        <p className="m-0 text-[17px] leading-[1.55] text-ink-2">
          Every city knows its state and country. Every country carries ISO codes, currency, phone code, timezones and
          translations. Updated frequently by the community.
        </p>
      <DataSources />
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((format) => (
            <span key={format} className="rounded-full border border-line-2 px-3 py-[7px] font-mono text-[13px] text-ink-code">
              {format}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TILES.map((tile) => {
          const tone = TONES[tile.tone];
          const showSkeleton = tile.live && loading;
          const source = showSkeleton ? "" : tile.live ? (live ? "● live" : "cached") : "static";
          return (
            <div
              key={tile.key}
              className={cn(
                "flex min-h-[130px] flex-col justify-end gap-1.5 rounded-[22px] p-[clamp(18px,2vw,26px)]",
                tone.box
              )}
            >
              {showSkeleton ? (
                <div
                  aria-hidden="true"
                  className={cn("h-[clamp(32px,3.6vw,48px)] animate-pulse rounded-[10px]", tone.skeleton)}
                  style={{ width: tile.skeleton }}
                />
              ) : (
                <div className={cn("font-cal text-[length:clamp(32px,3.6vw,48px)] leading-none", tone.fg)}>{values[tile.key]}</div>
              )}
              <div className="flex items-center justify-between gap-2">
                <span className={cn("text-[15px]", tone.sub)}>{tile.label}</span>
                <span className={cn("whitespace-nowrap font-mono text-[11px] opacity-85", tone.sub)}>{source}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
