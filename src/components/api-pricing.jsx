import PricingCard from "./pricing-card";

const plans = [
  {
    name: "Community",
    price: "$0",
    period: "/ month",
    description: "Perfect for personal projects & exploration.",
    features: [
      "4,500 API Requests/month (150/day)",
      "7 core endpoints available",
      "Basic fields: name, id, iso2, iso3, capital, currency, region, emoji, lat/lng, timezones",
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
    name: "Supporter",
    price: "$9",
    period: "/ month",
    description: "Ideal for growing applications with enhanced data.",
    features: [
      "30,000 API Requests/month (1,000/day)",
      "All core endpoints + Bulk States",
      "Extended fields: population, GDP, area, TLD, nationality, postal codes, and more",
      "Search endpoint (coming soon)",
      "Domain whitelisting (up to 3 domains)",
      "Founder-led email support (2-3 business days)",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=supporter&utm_source=website&utm_medium=cta&utm_content=api_pricing_supporter",
    target: "_blank",
    accent: "orange",
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Professional",
    price: "$29",
    period: "/ month",
    description: "Full data access for production applications.",
    features: [
      "100,000 API Requests/month (3,300/day)",
      "Full field access including translations & wiki data",
      "Multiple API keys (up to 5)",
      "GraphQL, geospatial, regions, bulk cities (coming soon)",
      "Domain + IP whitelisting (up to 10)",
      "Founder-led priority support (~1 business day)",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=professional&utm_source=website&utm_medium=cta&utm_content=api_pricing_professional",
    target: "_blank",
    accent: "blue",
    popular: false,
  },
  {
    name: "Business",
    price: "$79",
    period: "/ month",
    description: "High-volume access with all premium features.",
    features: [
      "750,000 API Requests/month (25,000/day)",
      "Full field access including translations & wiki data",
      "Multiple API keys (up to 10)",
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan} />
      ))}
    </div>
  );
}
