"use client";

import { useState } from "react";
import PricingCard from "./pricing-card";
import PricingComparison from "./pricing-comparison";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Community",
    price: "$0",
    priceAnnual: "$0",
    period: "/ month",
    description: "Perfect for personal projects & exploration.",
    features: [
      "3,000 API Requests/month (100/day)",
      "States by country and cities by state endpoints",
      "Basic fields: name, iso codes, capital, currency, region, emoji, lat/lng, timezones",
      "Timezone lookup endpoints (country, state, city) with DST awareness",
      "Open access (no domain whitelisting)",
      "Community support & documentation",
    ],
    cta: "Start for Free",
    href: "https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=api_pricing_community",
    target: "_blank",
    accent: "gray",
    popular: false,
  },
  {
    name: "Starter",
    price: "$5",
    priceAnnual: "$50",
    period: "/ month",
    description: "More headroom for side projects and prototypes.",
    features: [
      "9,000 API Requests/month (300/day)",
      "Same features as Community with higher limits",
      "Basic fields: name, iso codes, capital, currency, region, emoji, lat/lng, timezones",
      "ISO 3166 lookup endpoints (alpha-2, alpha-3, numeric, subdivision conversion)",
      "Open access (no domain whitelisting)",
      "Community support & documentation",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=starter&utm_source=website&utm_medium=cta&utm_content=api_pricing_starter",
    target: "_blank",
    accent: "sky",
    popular: false,
  },
  {
    name: "Supporter",
    price: "$9",
    priceAnnual: "$90",
    period: "/ month",
    description: "Ideal for growing applications with enhanced data.",
    features: [
      "30,000 API Requests/month (1,000/day)",
      "Extended fields: population, GDP, area, TLD, nationality, postal codes, coordinates",
      "Inline search filtering on all list endpoints",
      "Regions, subregions, ISO, phone dial code, and timezone APIs",
      "Field filtering (?fields=) and custom sort (?sort=) on every geographic endpoint",
      "Cities by country endpoint",
      "Domain whitelisting (up to 3 domains)",
      "Founder-led email support (2-3 business days)",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=supporter&utm_source=website&utm_medium=cta&utm_content=api_pricing_supporter",
    target: "_blank",
    accent: "orange",
    popular: true,
  },
  {
    name: "Professional",
    price: "$29",
    priceAnnual: "$290",
    period: "/ month",
    description: "Full data access for production applications.",
    features: [
      "100,000 API Requests/month (3,300/day)",
      "Full field access including translations & wiki data",
      "All endpoints including cities by country",
      "Regions, subregions, ISO, phone dial code, and timezone APIs",
      "Field filtering (?fields=) and custom sort (?sort=) on every geographic endpoint",
      "Fuzzy / typo-tolerant search across cities, states & countries",
      "Domain + IP whitelisting (up to 10)",
      "Founder-led priority support (~1 business day)",
      "Coming soon: GraphQL, geospatial search",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=professional&utm_source=website&utm_medium=cta&utm_content=api_pricing_professional",
    target: "_blank",
    accent: "blue",
    popular: false,
    badge: "Best Value",
  },
  {
    name: "Business",
    price: "$79",
    priceAnnual: "$790",
    period: "/ month",
    description: "High-volume access with all premium features.",
    features: [
      "750,000 API Requests/month (25,000/day)",
      "Full field access including translations & wiki data",
      "All current and upcoming premium features",
      "Domain + IP whitelisting (up to 25)",
      "Founder-led priority support (~1 business day)",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=business&utm_source=website&utm_medium=cta&utm_content=api_pricing_business",
    target: "_blank",
    accent: "blue",
    popular: false,
  },
];

export default function ApiPricing() {
  const [annual, setAnnual] = useState(false);

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
            const displayPlan = annual
              ? {
                  ...plan,
                  price: plan.priceAnnual,
                  period: "/ year",
                  pricePerCredit: isPaid ? "2 months free vs. monthly" : undefined,
                  href: isPaid ? `${plan.href}&interval=annual` : plan.href,
                }
              : plan;
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
      <PricingComparison />
    </>
  );
}
