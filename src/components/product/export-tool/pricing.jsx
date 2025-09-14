"use client";

import PricingCard from "@/components/pricing-card";

const plans = [
  {
    name: "Basic Pack",
    price: "$4.99",
    credits: "10 Credits",
    description: "Perfect for a single small project.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON",
      "Cities for any state in JSON",
      "Countries + States in CSV format",
      "Complete country data in SQL format",
    ],
    cta: "Get 10 Credits",
    accent: "gray",
    popular: false,
  },
  {
    name: "Standard Pack",
    price: "$9.99",
    credits: "25 Credits",
    description: "Ideal for multiple projects or larger datasets.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON",
      "Cities for any state in JSON",
      "Countries + States in CSV format",
      "Complete country data in SQL format",
    ],
    cta: "Get 25 Credits",
    accent: "blue",
    popular: false,
  },
  {
    name: "Premium Pack",
    price: "$19.99",
    credits: "60 Credits",
    description: "For heavy users and business needs.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON",
      "Cities for any state in JSON",
      "Countries + States in CSV format",
      "Complete country data in SQL format",
    ],
    cta: "Get 60 Credits",
    accent: "orange",
    popular: true,
    badge: "Best Value",
  },
];

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
            Pay only for what you need. Purchase credits and use them to export
            custom datasets. Credits never expire.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
