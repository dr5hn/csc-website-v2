import PricingCard from "./pricing-card";
import { Check, Star, Mail } from "lucide-react";

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

export default function ApiPricing() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan} />
      ))}
    </div>
  );
}
