"use client";

import PricingCard from "@/components/pricing-card";
import { Mail } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "For personal projects & exploration.",
    features: [
      "1,000 API Requests/month",
      "Full access to all endpoints",
      "Community Support",
      "Rate limits apply",
    ],
    cta: "Start for Free",
    accent: "gray",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    description: "For production apps with scale.",
    features: [
      "100,000 API Requests/month",
      "Higher rate limits",
      "99.9% Uptime SLA",
      "Email Support",
      "No attribution required",
    ],
    cta: "Get Started with Pro",
    accent: "orange",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale, mission-critical use.",
    features: [
      "Unlimited API Requests",
      "Dedicated Infrastructure",
      "Custom Rate Limits",
      "Premium Support & Onboarding",
      "Custom Data Formats",
    ],
    cta: "Contact Sales",
    ctaIcon: Mail,
    accent: "blue",
    popular: false,
    badge: "Coming Soon",
  },
];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
