"use client";

import ApiPricing from "@/components/api-pricing";

export default function ApiPricingSection() {
  return (
    <section className="relative pt-10 lg:pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm"
            aria-label="Pricing"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse"
              aria-hidden="true"
            ></span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
              Pricing
            </span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark">
            Simple, Transparent API Pricing
          </h2>
          <p className="mt-3 text-lg md:text-xl text-darkgray">
            Start for free and scale as your application grows. No hidden fees,
            no surprises.
          </p>
        </div>
        <ApiPricing />
      </div>
    </section>
  );
}
