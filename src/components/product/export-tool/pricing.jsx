"use client";

import PricingCard from "@/components/pricing-card";
import CustomCredits from "@/components/custom-credits";
import { exportPricingPlans } from "@/data/export-pricing";

export default function ExportToolPricingSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-light/30 to-blue/5 py-10 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm"
            aria-label="Pricing"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse"
              aria-hidden="true"
            ></span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
              Pricing
            </span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark">
            Fair, Credit-Based Pricing
          </h2>
          <p className="mt-3 text-lg md:text-xl text-darkgray">
            Start with 5 free credits, then pay only for what you need. Credits never expire.
          </p>
        </div>
        
        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-start mb-12">
          {exportPricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        {/* Custom Credits Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-dark mb-2">
            Need a Different Amount?
          </h3>
          <p className="text-darkgray">
            Purchase custom credits at $1 per credit - buy exactly what you need.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <CustomCredits />
        </div>
      </div>
    </section>
  );
}
