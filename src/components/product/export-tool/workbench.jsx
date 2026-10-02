"use client";

import { useState } from "react";

import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import Segmented from "@/components/ui/segmented";
import { useExportPricing } from "@/hooks/use-export-pricing";
import {
  FORMAT_GROUPS,
  OPTIONS,
  PERSONAS,
  TYPE_COST,
  buildPreview,
  fileName,
  formatCost,
  selectedKeys,
  totalCredits,
} from "@/lib/export-calc";
import { cn } from "@/lib/utils";

const EXPORT_URL = "https://export.countrystatecity.in/";
const FREE_CREDITS = 5;

const titleCase = (s) => s[0].toUpperCase() + s.slice(1);

// Pack numbers come from the live credit packages (with build-time fallbacks), so the
// calculator's "fits the Basic pack" line stays honest when prices change.
function toPack(plan) {
  return {
    name: plan.name.replace(/ Pack$/, ""),
    credits: parseInt(plan.credits, 10),
    price: parseFloat(plan.price.replace("$", "")),
    per: plan.pricePerCredit === "Free" ? "Free" : plan.pricePerCredit.replace("/credit", " each"),
    badge: plan.popular ? "Most popular" : plan.badge,
    highlight: !!plan.popular,
  };
}

function Step({ n, label, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-xs uppercase tracking-[.08em] text-ink-3">{n} · {label}</span>
      {children}
    </div>
  );
}

export default function ExportWorkbench() {
  const [types, setTypes] = useState({ countries: true, states: true, cities: false });
  const [format, setFormat] = useState("JSON");
  const [opts, setOpts] = useState({ trans: false, region: false, flags: false });
  const [persona, setPersona] = useState(0);
  const { plans, customCredits } = useExportPricing();

  const packs = plans.map(toPack);
  const keys = selectedKeys(types);
  const total = totalCredits(types, format);
  const fitPack = packs.find((p) => p.credits >= total);
  const customPerCredit = parseFloat(customCredits.price.replace("$", ""));

  const P = PERSONAS[persona];
  const personaCost = totalCredits(P.types, P.format);

  const formula = keys.length
    ? `${keys.map((k) => `${k} ${TYPE_COST[k]}`).join(" + ")} + ${format} ${formatCost(format)}`
    : "Pick a data type";
  const priceNote =
    total <= FREE_CREDITS
      ? `covered by ${FREE_CREDITS} free credits`
      : fitPack
        ? `fits the ${fitPack.name} pack`
        : `$${(total * customPerCredit).toFixed(2)} as custom credits`;

  const loadPersona = () => {
    setTypes(P.types);
    setFormat(P.format);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <>
      <section className="wrap-flush flex flex-col gap-[clamp(24px,3vw,36px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,72px)]">
        <div className="flex flex-wrap items-end justify-between gap-5 px-2">
          <div className="flex max-w-[760px] flex-col gap-4">
            <span className="self-start rounded-full border border-live-line bg-live-bg px-3.5 py-[7px] text-sm font-medium text-live-ink">
              {FREE_CREDITS} free credits to start
            </span>
            <h1 className="display-1 m-0">Export only the data you need.</h1>
            <p className="lead m-0">
              Skip the 44MB+ full download. Pick the data, fields and format, see exactly what you&apos;ll get, and pay a few credits.
            </p>
          </div>
          <CtaLink
            href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=export_hero"
            location="export_hero"
            track="export"
            className={buttonVariants({ size: "lg" })}
          >
            Start exporting free →
          </CtaLink>
        </div>

        <div className="flex flex-wrap gap-2.5 rounded-[clamp(24px,3vw,36px)] bg-field p-2.5">
          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-[22px] rounded-[clamp(18px,2.4vw,26px)] bg-white p-[clamp(16px,2vw,24px)]">
            <Step n="1" label="Data">
              <div className="flex flex-wrap gap-2">
                {["countries", "states", "cities"].map((k) => {
                  const on = types[k];
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTypes((t) => ({ ...t, [k]: !t[k] }))}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-[14px] border-[1.5px] px-4 py-3 text-[15px] font-medium text-ink",
                        on ? "border-blue bg-field" : "border-line bg-white"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn("size-4 rounded-[5px] border-[1.5px] text-center text-[11px] leading-[13px] text-white", on ? "border-blue bg-blue" : "border-[#a8b4c4] bg-white")}
                      >
                        {on ? "✓" : ""}
                      </span>
                      {titleCase(k)}
                      <span className="font-mono text-xs text-ink-3">{TYPE_COST[k]} cr</span>
                    </button>
                  );
                })}
              </div>
            </Step>
            <Step n="2" label="Format">
              {FORMAT_GROUPS.map(([group, list]) => (
                <div key={group} className="flex flex-wrap items-center gap-1.5">
                  <span className="w-[84px] shrink-0 text-[13px] text-ink-3">{group}</span>
                  {list.map(([name, cost]) => (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={format === name}
                      onClick={() => setFormat(name)}
                      className={cn(
                        "min-h-9 cursor-pointer whitespace-nowrap rounded-full border px-3 py-2 font-mono text-[13px]",
                        format === name ? "border-blue bg-blue text-white" : "border-line-2 bg-white text-ink-code"
                      )}
                    >
                      {name} <span className="opacity-70">+{cost}</span>
                    </button>
                  ))}
                </div>
              ))}
            </Step>
            <Step n="3" label="Options · free">
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map(([k, label]) => {
                  const on = opts[k];
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setOpts((o) => ({ ...o, [k]: !o[k] }))}
                      className={cn(
                        "min-h-10 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-[9px] text-sm",
                        on ? "border-blue bg-field text-blue" : "border-line-2 bg-white text-ink-code"
                      )}
                    >
                      {on ? "✓ " : ""}
                      {label}
                    </button>
                  );
                })}
              </div>
            </Step>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3.5 border-t border-hair pt-[18px]">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-ink-3">{formula}</span>
                <span className="flex items-baseline gap-2" aria-live="polite">
                  <span className="font-cal text-[44px] leading-none tabular-nums">{total}</span>
                  <span className="text-[15px] text-ink-2">credits · {total ? priceNote : "no data selected"}</span>
                </span>
              </div>
              <CtaLink href={EXPORT_URL} location="export_calculator" track="export" className={buttonVariants({ className: "px-[22px] py-3.5" })}>
                {total > 0 && total <= FREE_CREDITS ? "Export free →" : "Get credits →"}
              </CtaLink>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_380px] flex-col overflow-hidden rounded-[clamp(18px,2.4vw,26px)] bg-white">
            <div className="flex items-center justify-between gap-2.5 border-b border-hair px-[18px] py-3.5">
              <span className="text-[15px] font-semibold">Live preview</span>
              <span className="font-mono text-xs text-ink-3">{fileName(types, format)}</span>
            </div>
            <pre className="m-0 max-h-[460px] min-h-[320px] flex-1 overflow-auto whitespace-pre px-[18px] py-4 font-mono text-[12.5px] leading-[1.6] text-ink-code">
              {buildPreview(types, format, opts.trans)}
            </pre>
            <div className="border-t border-hair px-[18px] py-2.5 text-[13px] text-ink-3">First rows only. Your file has every matching record.</div>
          </div>
        </div>
      </section>

      <section className="border-y border-hair bg-mist">
        <div className="wrap flex flex-col gap-8 py-[clamp(56px,7vw,104px)]">
          <h2 className="display-2 m-0 max-w-[720px]">Made for how you&apos;ll use it.</h2>
          <Segmented label="Who you are" tone="outline" items={PERSONAS.map((p, i) => ({ value: i, label: p.label }))} value={persona} onChange={setPersona} className="self-start" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3">
            <div className="flex flex-col gap-2 rounded-[22px] border border-line bg-white p-[22px]">
              <span className="font-mono text-xs uppercase tracking-[.08em] text-ink-3">Problem</span>
              <span className="text-base leading-normal">{P.problem}</span>
            </div>
            <div className="flex flex-col gap-2 rounded-[22px] border border-line bg-white p-[22px]">
              <span className="font-mono text-xs uppercase tracking-[.08em] text-ink-3">Export</span>
              <span className="text-base leading-normal">{P.solution}</span>
            </div>
            <div className="flex flex-col gap-2 rounded-[22px] bg-blue p-[22px]">
              <span className="font-mono text-xs uppercase tracking-[.08em] text-[#dcebfb]">Cost</span>
              <span className="font-cal text-4xl leading-none text-white">{personaCost} credits</span>
              <button type="button" onClick={loadPersona} className="mt-auto cursor-pointer self-start rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink">
                Load in calculator ↑
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap-flush flex flex-col gap-5 py-[clamp(56px,7vw,104px)]">
        <div className="flex flex-wrap items-end justify-between gap-3.5 px-2">
          <h2 className="m-0 font-cal text-[length:clamp(30px,3.4vw,44px)] font-normal">Credit packs</h2>
          <span className="text-[15px] text-ink-2">
            One-off purchase. Credits never expire. <CtaLink href="/pricing#export" location="export_packs_pricing" className="text-blue hover:text-blue-deep hover:underline">Full pricing</CtaLink>
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-2.5">
          {packs.map((p) => {
            const n = Math.floor(p.credits / Math.max(total, 1));
            const fits = !total ? "Pick data to compare" : n === 0 ? "Not enough for this export" : n === 1 ? "1 export like yours" : `≈ ${n} exports like yours`;
            return (
              <div key={p.name} className={cn("flex flex-col gap-2.5 rounded-[22px] border p-5", p.highlight ? "border-blue bg-blue text-white" : "border-line bg-white")}>
                <div className="flex min-h-6 items-center justify-between gap-2">
                  <span className="font-cal text-xl">{p.name}</span>
                  {p.badge && (
                    <span className={cn("whitespace-nowrap rounded-full px-[9px] py-[3px] text-xs font-semibold", p.highlight ? "bg-lime text-ink" : "bg-field text-blue")}>{p.badge}</span>
                  )}
                </div>
                <span className="font-cal text-[38px] leading-none">${p.price}</span>
                <span className={cn("text-sm", p.highlight ? "text-[#dcebfb]" : "text-ink-3")}>{p.credits} credits · {p.per}</span>
                <span className={cn("text-[13px]", p.highlight ? "text-[#dcebfb]" : "text-ink-3")}>{fits}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
