// Shared export tool pricing data
export const exportPricingPlans = [
  {
    name: "Free Trial",
    price: "$0",
    credits: "2 Credits",
    pricePerCredit: "Free",
    description: "Get started with your first export for free.",
    features: [
      "All export formats supported",
      "Access to complete country, state & city data",
      "Credits never expire",
      "Perfect for trying the service"
    ],
    cta: "Start Free Trial",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "gray",
    popular: false,
  },
  {
    name: "Starter Pack",
    price: "$2.99",
    credits: "6 Credits",
    pricePerCredit: "$0.498/credit",
    description: "Perfect for small to medium exports.",
    features: [
      "All export formats supported",
      "Access to complete country, state & city data",
      "Credits never expire",
      "Perfect for small to medium exports"
    ],
    cta: "Buy 6 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "gray",
    popular: false,
  },
  {
    name: "Basic Pack",
    price: "$4.99",
    credits: "10 Credits",
    pricePerCredit: "$0.499/credit",
    description: "Best value for regular usage.",
    features: [
      "All export formats supported",
      "Access to all data types",
      "Credits never expire",
      "Best value for regular usage"
    ],
    cta: "Buy 10 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "green",
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Standard Pack",
    price: "$9.99",
    credits: "25 Credits",
    pricePerCredit: "$0.400/credit",
    description: "20% savings compared to Basic.",
    features: [
      "All export formats supported",
      "Access to all data types",
      "Credits never expire",
      "Valid for all exports"
    ],
    cta: "Buy 25 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "blue",
    popular: false,
    badge: "Save 20%",
  },
  {
    name: "Premium Pack",
    price: "$19.99",
    credits: "60 Credits",
    pricePerCredit: "$0.333/credit",
    description: "33% savings - best value for heavy users.",
    features: [
      "All export formats supported",
      "Access to all data types",
      "Priority support",
      "Valid for all exports"
    ],
    cta: "Buy 60 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "orange",
    popular: false,
    badge: "Best Value",
  },
];

// Custom credits option
export const customCreditsOption = {
  name: "Custom Credits",
  price: "$1.00",
  pricePerCredit: "$1.00 per credit",
  description: "Buy exactly what you need - $1 per credit",
  features: [
    "Buy exactly what you need",
    "Perfect for small exports",
    "No minimum purchase"
  ],
  cta: "Purchase Custom Credits",
  href: "https://export.countrystatecity.in",
  target: "_blank",
  accent: "purple",
  maxCredits: 100,
  minCredits: 1,
};
