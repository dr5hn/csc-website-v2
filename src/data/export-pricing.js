// Shared export tool pricing data
export const exportPricingPlans = [
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
    accent: "orange",
    popular: false,
    badge: "Best Value",
  },
];
