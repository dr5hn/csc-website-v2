"use client";

import { useState } from "react";

import CtaLink from "@/components/cta-link";
import Segmented from "@/components/ui/segmented";
import { DATABASE_FORMATS, FORMAT_FILTERS } from "@/data/database-formats";
import { cn } from "@/lib/utils";

const RELEASES_URL = "https://github.com/dr5hn/countries-states-cities-database/releases/latest/download/";

export default function DatabaseFormats() {
  const [filter, setFilter] = useState("All");
  const rows = DATABASE_FORMATS.filter((f) => filter === "All" || f.group === filter);

  return (
    <section id="formats" className="wrap-flush flex scroll-mt-28 flex-col gap-6 py-[clamp(56px,7vw,104px)]">
      <div className="flex flex-wrap items-end justify-between gap-4 px-2">
        <h2 className="display-2 m-0">Pick a format.</h2>
        <Segmented label="Filter formats" items={FORMAT_FILTERS} value={filter} onChange={setFilter} />
      </div>
      <div className="overflow-hidden rounded-3xl border border-line">
        {rows.map((f, i) => (
          <div key={f.name} className={cn("flex flex-wrap items-center gap-x-4 gap-y-2.5 px-[18px] py-3.5", i > 0 && "border-t border-hair")}>
            <div className="flex min-w-0 flex-[1_1_220px] flex-wrap items-baseline gap-2.5">
              <span className="font-cal text-xl">{f.name}</span>
              <span className="text-sm text-ink-3">{f.use}</span>
              {f.popular && <span className="rounded-full bg-live-bg px-[9px] py-[3px] text-xs font-semibold text-live-ink">Popular</span>}
            </div>
            <CtaLink
              href={`${RELEASES_URL}${f.asset}`}
              location={`database_download_${f.name.toLowerCase().replace(/\s+/g, "_")}`}
              track="github"
              aria-label={`Download ${f.name}`}
              className="whitespace-nowrap rounded-full px-4 py-[9px] text-sm font-semibold text-ink no-underline ring-1 ring-inset ring-edge hover:text-ink hover:no-underline hover:ring-blue"
            >
              Download
            </CtaLink>
          </div>
        ))}
      </div>
      <div className="px-2 text-sm text-ink-3">
        JSON and SQL world files include countries, states and cities. Other formats link to city files; additional files are on GitHub releases. Need only some fields or countries?{" "}
        <CtaLink href="https://export.countrystatecity.in/" location="database_formats_export" track="export" className="text-blue hover:text-blue-deep hover:underline">
          Use the Export Tool
        </CtaLink>
        .
      </div>
    </section>
  );
}
