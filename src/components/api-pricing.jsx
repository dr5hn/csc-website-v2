import PricingCard from "./pricing-card";
import { Check, Star, Mail } from "lucide-react";
import { TEXT_STATS } from "@/lib/stats";

const plans = [
  {
    name: "Community",
    price: "$0",
    period: "/ month",
    description: "Perfect for personal projects & exploration.",
    features: [
      "3,000 API Requests/month (100/day)",
      "2 requests/second rate limit",
      "7 core endpoints available",
      "Basic fields: name, id, iso2, iso3, capital, currency, region, emoji, latitude, longitude, country_code, state_code",
      "Open access (no domain whitelisting)",
      "Community support & documentation",
      "Best effort SLA"
    ],
    cta: "Start for Free",
    href: "https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=api_pricing_community",
    target: "_blank",
    accent: "gray",
    popular: false,
  },
  {
    name: "Supporter",
    price: "$9",
    period: "/ month",
    description: "Ideal for growing applications with enhanced features.",
    features: [
      "30,000 API Requests/month (1,000/day)",
      "10 requests/second rate limit",
      "All 7 current + 8 new region/search endpoints",
      "Full field access: all basic fields plus phonecode, currency_name, currency_symbol, tld, native, nationality, timezones, translations, and more",
      "Domain whitelisting (up to 3 domains)",
      "Basic filtering & sorting",
      "Priority email support (48h response)",
      "99.5% Uptime SLA"
    ],
    cta: "Coming Soon",
    ctaIcon: Mail,
    accent: "orange",
    href: "#",
    popular: true,
    badge: "Coming Soon",
  },
  {
    name: "Professional",
    price: "$29",
    period: "/ month",
    description: "Advanced features for production applications.",
    features: [
      "150,000 API Requests/month (5,000/day)",
      "25 requests/second rate limit",
      "All Supporter endpoints + 6 advanced geospatial endpoints",
      "GraphQL API access for complex queries",
      "Advanced filtering: radius search, multi-field search, fuzzy search",
      "Multiple API keys (up to 5 keys)",
      "Domain whitelisting (up to 10 domains) + IP whitelisting",
      "Priority support (24h response)",
      `${TEXT_STATS.uptime} Uptime SLA`
    ],
    cta: "Coming Soon",
    ctaIcon: Mail,
    accent: "blue",
    href: "#",
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
