// Shared export tool pricing data
export const exportPricingPlans = [
  {
    name: "Free Credits",
    price: "$0",
    credits: "5 Credits",
    pricePerCredit: "Free",
    description: "Get started with your first export for free.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON",
      "Credits never expire",
      "All data types available"
    ],
    cta: "Get Free Credits",
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
    description: "Perfect for a single small project.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON",
      "Credits never expire",
      "All data types available"
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
    description: "Ideal for multiple projects or larger datasets.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON",
      "Cities for any state in JSON",
      "Countries + States in CSV format",
      "Complete country data in SQL format"
    ],
    cta: "Buy 10 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "green",
    popular: true,
    badge: "Popular",
  },
  {
    name: "Standard Pack",
    price: "$9.99",
    credits: "25 Credits", 
    pricePerCredit: "$0.400/credit",
    description: "Great value for larger datasets.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON", 
      "Cities for any state in JSON",
      "Countries + States in CSV format",
      "Complete country data in SQL format"
    ],
    cta: "Buy 25 Credits",
    href: "https://export.countrystatecity.in",
    target: "_blank",
    accent: "blue",
    popular: false,
  },
  {
    name: "Premium Pack",
    price: "$19.99",
    credits: "60 Credits",
    pricePerCredit: "$0.333/credit", 
    description: "For heavy users and business needs.",
    features: [
      "All Countries in JSON format",
      "States/Regions for any country in JSON",
      "Cities for any state in JSON", 
      "Countries + States in CSV format",
      "Complete country data in SQL format"
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
  description: "Buy exactly what you need - $1.00 per credit",
  features: [
    "All Countries in JSON format",
    "States/Regions for any country in JSON",
    "Cities for any state in JSON",
    "Countries + States in CSV format",
    "Complete country data in SQL format"
  ],
  cta: "Purchase Custom Credits",
  href: "https://export.countrystatecity.in",
  target: "_blank",
  accent: "purple",
  maxCredits: 100,
  minCredits: 1,
};
