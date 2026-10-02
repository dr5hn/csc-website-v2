"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import CtaLink from "@/components/cta-link";
import StarButton from "@/components/star-button";
import CopyButton from "@/components/ui/copy-button";
import LiveBadge from "@/components/ui/live-badge";
import { buttonVariants } from "@/components/ui/button";
import { usePlatformStats } from "@/hooks/use-platform-stats";
import { TEXT_STATS } from "@/lib/stats";
import { cn } from "@/lib/utils";

// The four zoom levels of the voxel map. `s` is the scale about the Mumbai pin.
const LEVELS = [
  { label: "World", place: "World", coord: "250+ countries", crumb: "World", path: "/v1/countries", ms: "84ms", count: "250 results", s: 1, rows: ['{ "id": 101, "name": "India", "iso2": "IN" }', '{ "id": 102, "name": "Indonesia", "iso2": "ID" }'] },
  { label: "India", place: "India", coord: "20.00° N · 77.00° E", crumb: "World / IN", path: "/v1/countries/IN/states", ms: "91ms", count: "36 results", s: 2.2, rows: ['{ "id": 4008, "name": "Maharashtra", "iso2": "MH" }', '{ "id": 4026, "name": "Karnataka", "iso2": "KA" }'] },
  { label: "Maharashtra", place: "Maharashtra", coord: "19.75° N · 75.71° E", crumb: "World / IN / MH", path: "/v1/countries/IN/states/MH/cities", ms: "77ms", count: "400+ results", s: 3.6, rows: ['{ "id": 133024, "name": "Mumbai" }', '{ "id": 133351, "name": "Pune" }'] },
  { label: "Mumbai", place: "Mumbai", coord: "19.0760° N · 72.8777° E", crumb: "World / IN / MH / Mumbai", path: "/v1/countries/IN/states/MH/cities?search=mumbai", ms: "69ms", count: "1 result", s: 5.4, rows: ['{ "id": 133024, "name": "Mumbai",', '  "latitude": "19.0760", "longitude": "72.8777" }'] },
];

const LANGS = ["cURL", "JavaScript", "Python"];

function snippetFor(lang, url) {
  if (lang === 0) return `curl "${url}" \\\n  -H "X-CSCAPI-KEY: $API_KEY"`;
  if (lang === 1) return `const res = await fetch("${url}", {\n  headers: { "X-CSCAPI-KEY": API_KEY }\n});`;
  return `import requests\nrequests.get("${url}",\n  headers={"X-CSCAPI-KEY": API_KEY})`;
}

export default function HomeHero() {
  const [level, setLevel] = useState(0);
  const [userTookOver, setUserTookOver] = useState(false);
  const [lang, setLang] = useState(0);
  const levelRefs = useRef([]);
  const { loading, live, totalRequests } = usePlatformStats();

  // Autoplay advances every 3.4 s and stops for good on the first click, focus or drag.
  // Reduced motion gets no autoplay at all (interaction spec 1).
  useEffect(() => {
    if (userTookOver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setLevel((l) => (l + 1) % LEVELS.length), 3400);
    return () => clearInterval(id);
  }, [userTookOver]);

  const L = LEVELS[level];
  const url = `https://api.countrystatecity.in${L.path}`;
  const snippet = snippetFor(lang, url);
  const json = `[\n  ${L.rows.join(level === 3 ? "\n  " : ",\n  ")}${L.rows.length > 1 && level < 3 ? ",\n  …" : ""}\n]`;

  const pick = (i) => {
    setUserTookOver(true);
    setLevel(i);
  };

  const onLevelKey = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (level + (event.key === "ArrowRight" ? 1 : LEVELS.length - 1)) % LEVELS.length;
    pick(next);
    levelRefs.current[next]?.focus();
  };

  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(56px,6vw,96px)] pt-[clamp(28px,4vw,56px)]">
      <div className="flex flex-col gap-[clamp(18px,2vw,26px)] px-2">
        <LiveBadge>
          {loading ? (
            <span aria-hidden="true" className="h-4 w-12 animate-pulse rounded bg-live-line" />
          ) : (
            <span className="font-mono">{totalRequests.value}{totalRequests.suffix}</span>
          )}
          API requests served · {loading || live ? "live" : "cached"}
        </LiveBadge>
        <h1 className="display-1 m-0 leading-[.98]">Every city, stacked. One request away.</h1>
        <p className="lead m-0">
          The country, state and city API and open database: {TEXT_STATS.countries} countries, {TEXT_STATS.states} states and{" "}
          {TEXT_STATS.cities} cities, used by {TEXT_STATS.developers} developers.
        </p>
        <div className="flex flex-wrap gap-3">
          <CtaLink
            href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=home_hero"
            location="home_hero"
            track="api"
            className={buttonVariants({ size: "lg" })}
          >
            Get free API key →
          </CtaLink>
          <CtaLink
            href="https://docs.countrystatecity.in/"
            location="home_hero_docs"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Read the docs
          </CtaLink>
          <StarButton location="home_hero" />
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-hair pt-2.5 text-[15px] text-ink-3">
          <div><b className="font-semibold text-ink">{TEXT_STATS.uptime}</b> uptime SLA</div>
          <div><b className="font-semibold text-ink">{TEXT_STATS.responseTime}</b> p95</div>
          <div><b className="font-semibold text-ink">ODbL-1.0</b> open data</div>
        </div>
      </div>

      <div onFocus={() => setUserTookOver(true)} onPointerDown={() => setUserTookOver(true)} className="flex min-w-0 flex-col overflow-hidden rounded-[clamp(24px,2.5vw,32px)] bg-field">
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 pt-4">
          <div
            role="group"
            aria-label="Map zoom level"
            onKeyDown={onLevelKey}
            onFocus={() => setUserTookOver(true)}
            className="flex max-w-[440px] flex-1 gap-1 rounded-full bg-white p-1"
          >
            {LEVELS.map((l, i) => (
              <button
                key={l.label}
                ref={(el) => (levelRefs.current[i] = el)}
                type="button"
                aria-pressed={i === level}
                tabIndex={i === level ? 0 : -1}
                onClick={() => pick(i)}
                className={cn(
                  "min-h-10 flex-1 cursor-pointer whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium transition-colors",
                  i === level ? "bg-blue text-white" : "text-ink-code"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="whitespace-nowrap font-mono text-[13px] text-ink-2">{L.crumb}</div>
        </div>

        <div
          className="relative h-[clamp(170px,22vw,300px)] touch-pan-y overflow-hidden"
          onPointerDown={() => setUserTookOver(true)}
        >
          <div className="absolute inset-x-3 top-1/2 aspect-[3001/627] -translate-y-1/2">
            <div
              className="absolute inset-0 origin-[70.3%_44.7%] transition-transform duration-[1200ms] ease-[cubic-bezier(.6,0,.2,1)] motion-reduce:transition-none"
              style={{ transform: `scale(${L.s})` }}
            >
              <Image
                src="/images/voxel-world.png"
                alt="Isometric world map in columns; column height is the number of cities per grid cell"
                width={3001}
                height={627}
                priority
                className="block size-full [filter:hue-rotate(-32deg)_saturate(1.2)]"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute left-[70.3%] top-[44.7%] -ml-1.5 -mt-1.5 size-3 rounded-full border-2 border-ink bg-lime shadow-[0_0_0_6px_rgb(205_220_57/0.35)]"
            />
          </div>
          <div className="absolute bottom-3.5 left-4 flex flex-col gap-0.5 rounded-[14px] bg-white px-3.5 py-2.5">
            <div className="font-mono text-xs text-ink-3">{L.coord}</div>
            <div className="font-cal text-xl">{L.place}</div>
          </div>
        </div>

        <div className="mx-2.5 mb-2.5 overflow-hidden rounded-[22px] bg-white">
          <div className="flex items-center justify-between gap-2 border-b border-hair pl-3 pr-2.5 pt-1">
            <div role="tablist" className="flex">
              {LANGS.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={i === lang}
                  onClick={() => setLang(i)}
                  className={cn(
                    "min-h-10 cursor-pointer border-b-2 p-2.5 font-mono text-[13px]",
                    i === lang ? "border-blue text-ink" : "border-transparent text-ink-3 hover:text-ink"
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
            <CopyButton text={snippet} className="mb-1 py-[7px]" />
          </div>
          <pre className="m-0 overflow-x-auto whitespace-pre border-b border-hair px-4 py-3 font-mono text-[13px] leading-[1.6] text-ink-code">{snippet}</pre>
          <div className="flex items-center gap-2.5 px-4 pt-2.5 font-mono text-xs">
            <span className="rounded-full bg-ok-bg px-[9px] py-[3px] text-ok">200 OK</span>
            <span className="text-ink-3">{L.ms} · {L.count}</span>
          </div>
          <pre className="m-0 overflow-x-auto whitespace-pre px-4 pb-4 pt-2 font-mono text-[13px] leading-[1.6] text-ink-code">{json}</pre>
        </div>
      </div>
    </section>
  );
}
