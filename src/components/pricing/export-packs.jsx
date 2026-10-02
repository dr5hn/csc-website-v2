"use client";

import { useState } from "react";

import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import { useExportPricing } from "@/hooks/use-export-pricing";
import { cn } from "@/lib/utils";

export default function ExportPacks() {
  const { plans, customCredits, loading } = useExportPricing();
  const [credits, setCredits] = useState(15);
  const perCredit = parseFloat(customCredits.price.replace("$", ""));
  const { minCredits, maxCredits } = customCredits;

  return (
    <section id="export" className="wrap-flush flex flex-col gap-5 pb-[clamp(56px,7vw,96px)]">
      <div className="flex flex-wrap items-end justify-between gap-3.5 px-2">
        <h2 className="m-0 font-cal text-[length:clamp(28px,3vw,40px)] font-normal">Export Tool credits</h2>
        <span className="text-[15px] text-ink-2">One-off packs. Every account starts with 5 free credits.</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-2.5">
        {plans.map((p, i) => {
          const hi = !!p.popular;
          const free = i === 0;
          return (
            <div key={p.name} className={cn("flex flex-col gap-3.5 rounded-3xl border p-[22px]", hi ? "border-blue bg-blue text-white" : "border-line bg-white")}>
              <div className="flex min-h-[26px] items-center justify-between gap-2">
                <span className="font-cal text-[21px]">{p.name.replace(/ Pack$/, "")}</span>
                {(hi || p.badge) && (
                  <span className={cn("whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", hi ? "bg-lime text-ink" : "bg-field text-blue")}>{hi ? "Most popular" : p.badge}</span>
                )}
              </div>
              <div className={cn("font-cal text-[42px] leading-none transition-opacity duration-300", loading && "opacity-35")}>{p.price}</div>
              <div className={cn("text-sm", hi ? "text-[#dcebfb]" : "text-ink-3")}>{p.credits.replace("Credits", "credits")} · {p.pricePerCredit.replace("/credit", " each")}</div>
              <CtaLink
                href={p.href}
                location={`pricing_export_${p.name.toLowerCase().replace(/\s+/g, "_")}`}
                track="export"
                className={cn(buttonVariants({ variant: hi ? "white" : free ? "default" : "outline", size: "sm" }), "mt-auto w-full py-[13px]", hi && "ring-0")}
              >
                {free ? "Start exporting" : "Buy credits"}
              </CtaLink>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-[18px] rounded-3xl bg-field p-6">
          <div className="flex flex-col gap-1">
            <span className="font-cal text-[22px]">Custom amount</span>
            <span className="text-sm text-ink-2">${perCredit.toFixed(2)} per credit, {minCredits}–{maxCredits}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white p-1">
            <button type="button" aria-label="Fewer credits" disabled={credits <= minCredits} onClick={() => setCredits((c) => Math.max(minCredits, c - 1))} className="size-11 cursor-pointer rounded-full bg-field text-xl text-ink disabled:opacity-40">−</button>
            <span className="min-w-11 text-center font-mono text-lg tabular-nums" aria-live="polite">{credits}</span>
            <button type="button" aria-label="More credits" disabled={credits >= maxCredits} onClick={() => setCredits((c) => Math.min(maxCredits, c + 1))} className="size-11 cursor-pointer rounded-full bg-field text-xl text-ink disabled:opacity-40">+</button>
          </div>
          <CtaLink href={customCredits.href} location="pricing_export_custom" track="export" className={buttonVariants({ size: "sm", className: "px-5 py-[13px]" })}>
            Buy for ${(credits * perCredit).toFixed(2)}
          </CtaLink>
        </div>
        <div className="flex flex-col gap-2.5 rounded-3xl border border-line p-6">
          <span className="font-cal text-[22px]">How credits work</span>
          <span className="text-[15px] leading-normal text-ink-2">Each data type costs credits: Countries 1, States 3, Cities 4. Pick a format and download.</span>
          <span className="rounded-xl bg-mist px-3 py-2.5 font-mono text-[13px] text-ink-code">Countries + States · JSON = 6 credits</span>
        </div>
      </div>
    </section>
  );
}
