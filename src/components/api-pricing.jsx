"use client";

import { useState } from "react";
import PricingCard from "./pricing-card";
import PricingComparison from "./pricing-comparison";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useInboundAttribution, withAttribution } from "@/lib/attribution";
import { useApiPricing } from "@/hooks/use-api-pricing";

export default function ApiPricing() {
  const [annual, setAnnual] = useState(false);
  const attribution = useInboundAttribution();
  const { cards: plans, sections, tiers } = useApiPricing();

  return (
    <>
      <div className="space-y-8">
        {/* Billing interval toggle */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-semibold transition-colors",
              annual ? "text-lightgray" : "text-dark"
            )}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((v) => !v)}
            className={cn(
              "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
              annual ? "bg-orange" : "bg-light"
            )}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                annual ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-semibold transition-colors",
              annual ? "text-dark" : "text-lightgray"
            )}
          >
            Annual
          </span>
          <span className="inline-flex items-center rounded-full bg-green px-3 py-1 text-xs font-bold text-white shadow-sm">
            2 months free
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
          {plans.map((plan, index) => {
            const isPaid = plan.priceAnnual !== "$0";
            const baseHref = withAttribution(plan.href, attribution);
            const displayPlan = annual
              ? {
                  ...plan,
                  price: plan.priceAnnual,
                  period: "/ year",
                  pricePerCredit: isPaid ? "2 months free vs. monthly" : undefined,
                  href: isPaid ? `${baseHref}&interval=annual` : baseHref,
                }
              : { ...plan, href: baseHref };
            return <PricingCard key={index} plan={displayPlan} />;
          })}
        </div>

        {/* Custom Plan CTA */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/30 to-blue/30">
          <div className="rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-dark">Need higher limits or custom features?</h3>
              <p className="text-darkgray mt-1">
                We offer tailored plans with negotiated limits, custom data access levels, and dedicated support.
              </p>
            </div>
            <Link
              href="mailto:gadadarshan@gmail.com?subject=Custom%20Plan%20Inquiry&utm_source=website&utm_medium=cta&utm_content=api_pricing_custom"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-base shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <PricingComparison tiers={tiers} sections={sections} />
    </>
  );
}
