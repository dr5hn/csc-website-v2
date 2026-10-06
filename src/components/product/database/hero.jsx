"use client";

import DataSources from "@/components/data-sources";
import { useState } from "react";

import CtaLink from "@/components/cta-link";
import StarButton from "@/components/star-button";
import { buttonVariants } from "@/components/ui/button";
import { LOCATION_SAMPLES as DATA } from "@/data/location-samples";
import { TEXT_STATS } from "@/lib/stats";
import { cn } from "@/lib/utils";



function Row({ name, code, on, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn("flex min-w-0 cursor-pointer items-center justify-between gap-1.5 rounded-[10px] px-2 py-[9px] text-left", on ? "bg-blue" : "bg-transparent hover:bg-mist")}
    >
      <span className={cn("truncate text-sm", on ? "text-white" : "text-ink")}>{name}</span>
      <span className={cn("shrink-0 font-mono text-[11px]", on ? "text-[#dcebfb]" : "text-ink-3")}>{code}</span>
    </button>
  );
}

export default function DatabaseHero() {
  const [c, setC] = useState(0);
  const [s, setS] = useState(0);
  const [ci, setCi] = useState(0);

  const C = DATA[c];
  const S = C.st[s];
  const CI = S.ci[Math.min(ci, S.ci.length - 1)];
  const record = { id: CI[1], name: CI[0], state_id: S.id, state_code: S.sc, country_id: C.id, country_code: C.cc, latitude: CI[2].toFixed(8), longitude: CI[3].toFixed(8) };

  const columns = [
    { title: "Countries", count: `${TEXT_STATS.countries}`, items: DATA.map((x, i) => ({ name: x.name, code: x.cc, on: i === c, pick: () => { setC(i); setS(0); setCi(0); } })) },
    { title: "States", count: TEXT_STATS.states, items: C.st.map((x, i) => ({ name: x.name, code: x.sc, on: i === s, pick: () => { setS(i); setCi(0); } })) },
    { title: "Cities", count: TEXT_STATS.cities, items: S.ci.map((x, i) => ({ name: x[0], code: "", on: i === ci, pick: () => setCi(i) })) },
  ];

  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,80px)]">
      <div className="flex flex-col gap-[22px] px-2">
        <span className="self-start rounded-full border border-live-line bg-live-bg px-3.5 py-[7px] text-sm font-medium text-live-ink">Open source · free forever</span>
        <h1 className="display-1 m-0">Country, state and city data. Yours to download.</h1>
        <p className="lead m-0">
          {TEXT_STATS.countries} countries, {TEXT_STATS.states} states and {TEXT_STATS.cities} cities in 12 formats. Linked by ID, updated
          frequently, maintained in the open.
        </p>
      <DataSources />
        <div className="flex flex-wrap gap-3">
          <CtaLink href="#formats" location="database_hero" track="github" className={buttonVariants({ size: "lg" })}>
            Download now →
          </CtaLink>
          <StarButton location="database_hero" label="★ Star on GitHub" />
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-hair pt-2.5 text-[15px] text-ink-3">
          <div><b className="font-semibold text-ink">GitHub</b> contributions</div>
          <div><b className="font-semibold text-ink">Public</b> releases</div>
          <div><b className="font-semibold text-ink">ODbL-1.0</b> licence</div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2.5 rounded-[clamp(24px,3vw,32px)] bg-field p-2.5">
        <div className="flex items-center justify-between gap-2.5 px-2.5 pt-2">
          <span className="font-mono text-xs uppercase tracking-[.08em] text-ink-3">Sample records · click to drill in</span>
          <span className="font-mono text-xs text-ink-2">{C.cc} › {S.sc} › {CI[0]}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {columns.map((col) => (
            <div key={col.title} className="flex min-w-0 flex-col gap-0.5 rounded-[18px] bg-white p-2">
              <div className="flex items-baseline justify-between px-2 pb-2 pt-1.5">
                <span className="text-sm font-semibold">{col.title}</span>
                <span className="font-mono text-[11px] text-ink-3">{col.count}</span>
              </div>
              {col.items.map((it) => (
                <Row key={it.name} name={it.name} code={it.code} on={it.on} onClick={it.pick} />
              ))}
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-[18px] bg-white">
          <div className="flex items-center justify-between border-b border-hair px-3.5 py-2.5 font-mono text-xs text-ink-3">
            <span>{CI[0]}</span>
            <span>cities.json</span>
          </div>
          <pre className="m-0 overflow-x-auto whitespace-pre px-3.5 py-3 font-mono text-[12.5px] leading-[1.6] text-ink-code">{JSON.stringify(record, null, 2)}</pre>
        </div>
      </div>
    </section>
  );
}
