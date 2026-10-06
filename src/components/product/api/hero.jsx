"use client";

import { useState } from "react";

import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import LiveBadge from "@/components/ui/live-badge";
import Tag from "@/components/ui/tag";
import { DEMOS, runDemo } from "@/lib/api-demo";
import { usePlatformStats } from "@/hooks/use-platform-stats";
import { cn } from "@/lib/utils";

export default function HeroApi() {
  const [demo, setDemo] = useState(0);
  const [query, setQuery] = useState(DEMOS[0].q);
  const { totalRequests } = usePlatformStats();
  const D = DEMOS[demo];
  const results = runDemo(demo, query);

  const choose = (i) => {
    setDemo(i);
    setQuery(DEMOS[i].q);
  };

  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,80px)]">
      <div className="flex flex-col gap-[22px] px-2">
        <LiveBadge as="a" href="https://status.countrystatecity.in/" target="_blank" rel="noopener noreferrer">
          View service status →
        </LiveBadge>
        <h1 className="display-1 m-0">The geography API that forgives typos.</h1>
        <p className="lead m-0">
          Countries, states and cities with fuzzy search, autocomplete, nearby search and timezone helpers. REST or GraphQL.{" "}
          {totalRequests.value}
          {totalRequests.suffix} requests served.
        </p>
        <div className="flex flex-wrap gap-3">
          <CtaLink
            href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=api_page_hero"
            location="api_hero"
            track="api"
            className={buttonVariants({ size: "lg" })}
          >
            Get free API key →
          </CtaLink>
          <CtaLink href="https://docs.countrystatecity.in/" location="api_hero_docs" className={buttonVariants({ variant: "outline", size: "lg" })}>
            View documentation
          </CtaLink>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-hair pt-2.5 text-[15px] text-ink-3">
          <div><b className="font-semibold text-ink">3,000</b> free requests / mo</div>
          <div><b className="font-semibold text-ink">GraphQL</b> Professional and up</div>
          <div><b className="font-semibold text-ink">REST</b> JSON responses</div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2.5 rounded-[clamp(24px,3vw,32px)] bg-field p-2.5">
        <div role="group" aria-label="API demo" className="flex flex-wrap gap-1 rounded-full bg-white p-1">
          {DEMOS.map((d, i) => (
            <button
              key={d.label}
              type="button"
              aria-pressed={i === demo}
              onClick={() => choose(i)}
              className={cn(
                "min-h-10 flex-1 cursor-pointer whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium transition-colors",
                i === demo ? "bg-blue text-white" : "text-ink-code"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-[22px] bg-white p-3.5">
          <label className="flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-blue py-1 pl-3.5 pr-1">
            <span className="whitespace-nowrap font-mono text-xs text-ink-3">{D.title}</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={D.title}
              className="min-w-0 flex-1 border-0 bg-transparent py-2.5 font-mono text-base text-ink outline-none placeholder:text-[#8a99ae]"
            />
          </label>
          <div className="truncate font-mono text-[12.5px] text-ink-3">
            <span className="font-medium text-blue">GET</span> {D.path(query.trim())}
          </div>
          <div className="flex flex-col border-t border-hair" aria-live="polite">
            {results.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-3 border-b border-hair px-0.5 py-[11px]">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-cal text-[19px]">{r.name}</span>
                  <span className="truncate text-[13px] text-ink-3">{r.sub}</span>
                </div>
                <Tag tone={r.tone}>{r.tag}</Tag>
              </div>
            ))}
            {query.trim() && results.length === 0 && (
              <div className="px-0.5 py-3.5 text-sm text-ink-2">No match in this demo. Try one of the examples below.</div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[13px] text-ink-3">Try</span>
            {D.tries.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setQuery(t)}
                className="cursor-pointer rounded-full border border-line-2 bg-white px-2.5 py-1.5 font-mono text-[12.5px] text-ink-code hover:border-blue"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2.5 px-2 pb-1 pt-0.5 font-mono text-xs text-ink-2">
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-ok-bg px-[9px] py-[3px] text-ok">200 OK</span>
            {D.plan}
          </span>
          <span>illustrative data</span>
        </div>
      </div>
    </section>
  );
}
