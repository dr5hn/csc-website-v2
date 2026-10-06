"use client";

import { useEffect, useState } from "react";

import JsonLd from "@/components/json-ld";
import { apiApplicationSchema } from "@/lib/seo";

import CompareTable from "@/components/pricing/compare-table";
import CtaLink from "@/components/cta-link";
import Segmented from "@/components/ui/segmented";
import { buttonVariants } from "@/components/ui/button";
import { useApiPricing } from "@/hooks/use-api-pricing";
import { cn } from "@/lib/utils";

const BILLING_KEY = "csc-billing";

// Short card copy from the design, keyed by tier. Prices, limits, badges and links stay live
// (or fall back to the build-time data); the full per-plan feature list is in the comparison table.
const BLURBS = {
  community: { description: "For personal projects and exploration.", cta: "Start for free" },
  starter: { description: "More headroom for side projects and prototypes." },
  supporter: { description: "For growing apps that need richer data." },
  professional: { description: "GraphQL and the change feed for production." },
  business: { description: "The most headroom and every premium feature." },
};

const sentenceCase = (text) => text.charAt(0) + text.slice(1).toLowerCase();

const rowValue = (sections, label, key) => sections[0]?.rows.find((r) => r.label === label)?.values[key];

export default function ApiPlans() {
  const { cards, sections, tiers, loading } = useApiPricing();
  const [annual, setAnnual] = useState(false);

  // The billing choice persists across visits (interaction spec 3).
  useEffect(() => {
    try {
      setAnnual(localStorage.getItem(BILLING_KEY) === "annual");
    } catch {
      // Storage blocked: the toggle still works for this visit.
    }
  }, []);

  const chooseBilling = (value) => {
    setAnnual(value === "annual");
    try {
      localStorage.setItem(BILLING_KEY, value);
    } catch {
      // Not persisted; fine.
    }
  };

  return (
    <section id="api" className="wrap-flush flex flex-col gap-5 pb-[clamp(56px,7vw,96px)]">
      <JsonLd data={apiApplicationSchema(cards, annual)} />
      <div className="flex flex-wrap items-center justify-between gap-3.5 px-2">
        <h2 className="m-0 font-cal text-[length:clamp(28px,3vw,40px)] font-normal">API plans</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented nowrap label="Billing" items={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }]} value={annual ? "annual" : "monthly"} onChange={chooseBilling} />
          <span className="whitespace-nowrap rounded-full border border-live-line bg-live-bg px-2.5 py-1.5 text-sm font-medium text-live-ink">Annual: 2 months free</span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-2.5">
        {cards.map((plan, i) => {
          const key = tiers[i]?.key;
          const hi = plan.popular;
          const paid = plan.priceAnnual != null && plan.priceAnnual !== "$0";
          const free = plan.price === "$0";
          const priceText = free ? "Free" : annual && plan.priceAnnual != null ? plan.priceAnnual : plan.price;
          const per = free ? "forever" : annual && plan.priceAnnual != null ? "/ year" : "/ month";
          const monthly = rowValue(sections, "Monthly Requests", key);
          const daily = rowValue(sections, "Daily Requests", key);
          const href = annual && paid ? `${plan.href}&interval=annual` : plan.href;
          const flag = hi ? "Most popular" : plan.badge && sentenceCase(plan.badge);
          const blurb = BLURBS[key];
          return (
            <div key={plan.name} className={cn("flex flex-col gap-4 rounded-3xl border p-[22px]", hi ? "border-blue bg-blue text-white" : "border-line bg-white text-ink")}>
              <div className="flex min-h-[26px] items-center justify-between gap-2">
                <span className="font-cal text-[22px]">{plan.name}</span>
                {flag && <span className={cn("whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", hi ? "bg-lime text-ink" : "bg-field text-blue")}>{flag}</span>}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={cn("min-w-[3ch] font-cal text-[44px] leading-none transition-opacity duration-300", loading && "opacity-35")}>{priceText}</span>
                <span className={cn("text-sm", hi ? "text-[#dcebfb]" : "text-ink-3")}>{per}</span>
              </div>
              <div className={cn("text-sm leading-[1.45]", hi ? "text-[#dcebfb]" : "text-ink-3")}>{blurb?.description ?? plan.description}</div>
              {monthly && (
                <div className={cn("flex flex-col gap-0.5 border-t pt-3.5", hi ? "border-white/25" : "border-hair")}>
                  <span className="font-mono text-[17px]">{monthly}</span>
                  <span className={cn("text-[13px]", hi ? "text-[#dcebfb]" : "text-ink-3")}>requests / month · {daily} / day</span>
                </div>
              )}
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {plan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex gap-2 text-sm leading-[1.4]">
                    <span aria-hidden="true" className={cn("shrink-0", hi ? "text-lime" : "text-ok")}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <CtaLink
                href={href}
                location={`pricing_api_${key}`}
                track="api"
                className={cn(
                  buttonVariants({ variant: hi ? "white" : free ? "default" : "outline", size: "sm" }),
                  "mt-auto w-full py-[13px]",
                  hi && "ring-0"
                )}
              >
                {blurb?.cta ?? "Get started"}
              </CtaLink>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3.5 rounded-[20px] border border-line bg-mist px-[22px] py-[18px]">
        <span className="text-base">
          <b className="font-semibold">Need higher limits or custom features?</b> <span className="text-ink-2">Dedicated limits, SLAs and invoicing.</span>
        </span>
        <CtaLink href="/contact" location="pricing_custom_plan" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Contact us
        </CtaLink>
      </div>

      <CompareTable tiers={tiers} sections={sections} />
    </section>
  );
}
