// Shared export tool pricing data.
// Source of truth: csc-export-tool/src/config/pricing.js — keep these in sync
// whenever credit pricing changes in the main app.
export const exportPricingPlans = [
  {
    name: "Free Trial",
    price: "$0",
    credits: "5 Credits",
    pricePerCredit: "Free",
    description: "Get started with your first export for free.",
    features: [
      "All export formats supported",
      "Access to complete country, state & city data",
      "Credits never expire",
      "Enough for at least one full export"
    ],
    cta: "Start Free Trial",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "gray",
    popular: false,
  },
  {
    name: "Starter Pack",
    price: "$20",
    credits: "10 Credits",
    pricePerCredit: "$2.00/credit",
    description: "Perfect for small to medium exports.",
    features: [
      "All export formats supported",
      "Access to complete country, state & city data",
      "Credits never expire",
      "Comfortably covers 1–2 typical exports"
    ],
    cta: "Buy 10 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "gray",
    popular: false,
  },
  {
    name: "Basic Pack",
    price: "$30",
    credits: "20 Credits",
    pricePerCredit: "$1.50/credit",
    description: "Best value for regular usage.",
    features: [
      "All export formats supported",
      "Access to all data types",
      "Credits never expire",
      "Best value for regular usage"
    ],
    cta: "Buy 20 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "green",
    popular: true,
  },
  {
    name: "Standard Pack",
    price: "$40",
    credits: "30 Credits",
    pricePerCredit: "$1.33/credit",
    description: "33% savings compared to Custom Credits.",
    features: [
      "All export formats supported",
      "Access to all data types",
      "Credits never expire",
      "Valid for all exports"
    ],
    cta: "Buy 30 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "blue",
    popular: false,
    badge: "Save 33%",
  },
  {
    name: "Premium Pack",
    price: "$50",
    credits: "40 Credits",
    pricePerCredit: "$1.25/credit",
    description: "38% savings — best value for heavy users.",
    features: [
      "All export formats supported",
      "Access to all data types",
      "Priority support",
      "Valid for all exports"
    ],
    cta: "Buy 40 Credits",
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
  price: "$2.00",
  pricePerCredit: "$2.00 per credit",
  description: "Buy exactly what you need — $2 per credit",
  features: [
    "Buy exactly what you need",
    "Perfect for small top-ups",
    "No minimum purchase"
  ],
  cta: "Purchase Custom Credits",
  href: "https://export.countrystatecity.in",
  target: "_blank",
  accent: "purple",
  maxCredits: 100,
  minCredits: 1,
};
