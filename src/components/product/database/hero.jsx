"use client";

import { useState } from "react";

import CtaLink from "@/components/cta-link";
import StarButton from "@/components/star-button";
import { buttonVariants } from "@/components/ui/button";
import { TEXT_STATS } from "@/lib/stats";
import { cn } from "@/lib/utils";

const DATA = [
  { name: "India", cc: "IN", id: 101, st: [{ name: "Maharashtra", sc: "MH", id: 4008, ci: [["Mumbai", 133024, 19.076, 72.8777], ["Pune", 133351, 18.5204, 73.8567], ["Nagpur", 133209, 21.1458, 79.0882]] }, { name: "Karnataka", sc: "KA", id: 4026, ci: [["Bengaluru", 132597, 12.9716, 77.5946], ["Mysuru", 132905, 12.2958, 76.6394]] }] },
  { name: "Japan", cc: "JP", id: 109, st: [{ name: "Tokyo", sc: "13", id: 827, ci: [["Shinjuku", 0, 35.6938, 139.7034], ["Hachiōji", 0, 35.6664, 139.316]] }, { name: "Osaka", sc: "27", id: 821, ci: [["Osaka", 0, 34.6937, 135.5023], ["Sakai", 0, 34.5733, 135.483]] }] },
  { name: "Brazil", cc: "BR", id: 31, st: [{ name: "São Paulo", sc: "SP", id: 2021, ci: [["São Paulo", 0, -23.5505, -46.6333], ["Campinas", 0, -22.9099, -47.0626]] }, { name: "Rio de Janeiro", sc: "RJ", id: 2014, ci: [["Rio de Janeiro", 0, -22.9068, -43.1729], ["Niterói", 0, -22.8832, -43.1034]] }] },
  { name: "Germany", cc: "DE", id: 82, st: [{ name: "Bavaria", sc: "BY", id: 3009, ci: [["Munich", 0, 48.1351, 11.582], ["Nuremberg", 0, 49.4521, 11.0767]] }, { name: "Berlin", sc: "BE", id: 3010, ci: [["Berlin", 0, 52.52, 13.405]] }] },
];

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
  // Only the Indian records carry verified IDs in this sample; others are marked illustrative.
  const known = C.cc === "IN" && CI[1];
  const record = known
    ? { id: CI[1], name: CI[0], state_id: S.id, state_code: S.sc, country_id: C.id, country_code: C.cc, latitude: CI[2].toFixed(4), longitude: CI[3].toFixed(4) }
    : { name: CI[0], state_code: S.sc, country_code: C.cc, latitude: CI[2].toFixed(4), longitude: CI[3].toFixed(4) };

  const columns = [
    { title: "Countries", count: `${TEXT_STATS.countries}`, items: DATA.map((x, i) => ({ name: x.name, code: x.cc, on: i === c, pick: () => { setC(i); setS(0); setCi(0); } })) },
    { title: "States", count: TEXT_STATS.states, items: C.st.map((x, i) => ({ name: x.name, code: x.sc, on: i === s, pick: () => { setS(i); setCi(0); } })) },
    { title: "Cities", count: TEXT_STATS.cities, items: S.ci.map((x, i) => ({ name: x[0], code: "", on: i === ci, pick: () => setCi(i) })) },
  ];

  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,80px)]">
      <div className="flex flex-col gap-[22px] px-2">
        <span className="self-start rounded-full border border-live-line bg-live-bg px-3.5 py-[7px] text-sm font-medium text-live-ink">Open source · free forever</span>
        <h1 className="display-1 m-0">Every country, state and city. Yours to download.</h1>
        <p className="lead m-0">
          {TEXT_STATS.countries} countries, {TEXT_STATS.states} states and {TEXT_STATS.cities} cities in 12 formats. Linked by ID, updated
          frequently, maintained in the open.
        </p>
        <div className="flex flex-wrap gap-3">
          <CtaLink href="#formats" location="database_hero" track="github" className={buttonVariants({ size: "lg" })}>
            Download now →
          </CtaLink>
          <StarButton location="database_hero" label="★ Star on GitHub" />
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-hair pt-2.5 text-[15px] text-ink-3">
          <div><b className="font-semibold text-ink">95+</b> contributors</div>
          <div><b className="font-semibold text-ink">Frequent</b> releases</div>
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
            <span>{known ? CI[0] : `${CI[0]} · illustrative, IDs omitted`}</span>
            <span>cities.json</span>
          </div>
          <pre className="m-0 overflow-x-auto whitespace-pre px-3.5 py-3 font-mono text-[12.5px] leading-[1.6] text-ink-code">{JSON.stringify(record, null, 2)}</pre>
        </div>
      </div>
    </section>
  );
}
