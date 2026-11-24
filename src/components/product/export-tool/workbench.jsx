"use client";

import { useState } from "react";

import JsonLd from "@/components/json-ld";
import { exportApplicationSchema } from "@/lib/seo";

import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import Segmented from "@/components/ui/segmented";
import { useExportPricing } from "@/hooks/use-export-pricing";
import {
  DATASETS,
  FORMAT_GROUPS,
  PERSONAS,
  buildPreview,
  formatCost,
  requiredFieldCost,
  selectedKeys,
  totalCredits,
} from "@/lib/export-calc";
import { cn } from "@/lib/utils";

const EXPORT_URL = "https://export.countrystatecity.in/";
const FREE_CREDITS = 5;

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
  const [persona, setPersona] = useState(0);
  const { plans, customCredits } = useExportPricing();

  const packs = plans.map(toPack);
  const keys = selectedKeys(types);
  const total = totalCredits(types, format);
  const preview = buildPreview(types, format);
  const fitPack = packs.find((p) => p.credits >= total);
  const customPerCredit = parseFloat(customCredits.price.replace("$", ""));

  const P = PERSONAS[persona];
  const personaCost = totalCredits(P.types, P.format);

  const fieldCost = requiredFieldCost(format, keys.length);
  const formula = keys.length
    ? `${keys.map((k) => `${k} ${DATASETS[k].credits}`).join(" + ")} + ${format} ${formatCost(format)}${fieldCost ? ` + coordinates ${fieldCost}` : ""}`
    : "Pick a data type";
  const priceNote =
    total <= FREE_CREDITS
      ? `within the ${FREE_CREDITS}-credit trial`
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
      <JsonLd data={exportApplicationSchema(plans)} />
      <section className="wrap-flush flex flex-col gap-[clamp(24px,3vw,36px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,72px)]">
        <div className="flex flex-wrap items-end justify-between gap-5 px-2">
          <div className="flex max-w-[760px] flex-col gap-4">
            <span className="self-start rounded-full border border-live-line bg-live-bg px-3.5 py-[7px] text-sm font-medium text-live-ink">
              {FREE_CREDITS} free credits to start
            </span>
            <h1 className="display-1 m-0">Export only the data you need.</h1>
            <p className="lead m-0">
              Choose countries, states, counties, cities or postcodes. Estimate the base credits here, then choose your fields and filters in the Export Tool.
            </p>
          </div>
          <CtaLink
            href={EXPORT_URL}
            location="export_hero"
            track="export"
            className={buttonVariants({ size: "lg" })}
          >
            Open Export Tool →
          </CtaLink>
        </div>

        <div className="flex flex-wrap gap-2.5 rounded-[clamp(24px,3vw,36px)] bg-field p-2.5">
          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-[22px] rounded-[clamp(18px,2.4vw,26px)] bg-white p-[clamp(16px,2vw,24px)]">
            <Step n="1" label="Data">
              <div className="flex flex-wrap gap-2">
                {Object.entries(DATASETS).map(([k, { name, credits }]) => {
                  const on = Boolean(types[k]);
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
                      {name}
                      <span className="font-mono text-xs text-ink-3">{credits} cr</span>
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
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3.5 border-t border-hair pt-[18px]">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-ink-3">Base estimate · {formula}</span>
                <span className="flex items-baseline gap-2" aria-live="polite">
                  <span className="font-cal text-[44px] leading-none tabular-nums">{total}</span>
                  <span className="text-[15px] text-ink-2">credits · {total ? priceNote : "no data selected"}</span>
                </span>
              </div>
              <CtaLink href={EXPORT_URL} location="export_calculator" track="export" className={buttonVariants({ className: "px-[22px] py-3.5" })}>
                Open Export Tool →
              </CtaLink>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_380px] flex-col overflow-hidden rounded-[clamp(18px,2.4vw,26px)] bg-white">
            <div className="flex items-center justify-between gap-2.5 border-b border-hair px-[18px] py-3.5">
              <span className="text-[15px] font-semibold">Sample ZIP contents</span>
            </div>
            <div role="region" aria-label="Sample ZIP contents" tabIndex={0} className="max-h-[460px] min-h-[320px] flex-1 overflow-auto">
              {preview.length ? preview.map(({ file, text }) => (
                <div key={file} className="border-b border-hair px-[18px] py-4 last:border-b-0">
                  <h2 className="m-0 font-mono text-xs font-semibold text-ink">{file}</h2>
                  <pre className="mb-0 mt-2 whitespace-pre font-mono text-[12.5px] leading-[1.6] text-ink-code">{text}</pre>
                </div>
              )) : <p className="px-[18px] text-sm text-ink-3">Pick at least one dataset.</p>}
            </div>
            <div className="border-t border-hair px-[18px] py-2.5 text-[13px] text-ink-3">
              Sample rows. {format === "GeoJSON" && "GeoJSON requires latitude and longitude for each dataset. "}Additional fields, filters, sorting, translations and flag images can add credits. Check the final total in the Export Tool.
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pb-[clamp(48px,6vw,88px)]">
        <h2 className="m-0 font-cal text-[length:clamp(28px,3vw,40px)] font-normal">What you download</h2>
        <p className="mt-3 max-w-[760px] text-ink-2">New exports download as a ZIP with your data, a <code>source-manifest.json</code> file, licence notices and migration notes. Excel has a workbook with a sheet per dataset and SQL formats have one script. Other formats have one file per dataset with matching rows.</p>
        <p className="mb-0 max-w-[760px] text-ink-2">Saved exports are available from Export History for 30 days. New saved exports keep their original data version during that period.</p>
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
              <span className="font-mono text-xs uppercase tracking-[.08em] text-[#dcebfb]">Base estimate</span>
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
            One-off purchase. Credits never expire. <CtaLink href="/pricing/#export" location="export_packs_pricing" className="text-blue hover:text-blue-deep hover:underline">Full pricing</CtaLink>
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
