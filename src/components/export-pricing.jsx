import PricingCard from "./pricing-card";
import { Check, Database, FileJson, FileText, Plus } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$5",
    credits: "5 Credits",
    description: "Perfect for a single small project.",
    features: ["Credits never expire", "All data types available"],
    cta: "Get 5 Credits",
    accent: "gray",
    popular: false,
  },
  {
    name: "Developer",
    price: "$15",
    credits: "20 Credits",
    description: "Ideal for multiple projects or larger datasets.",
    features: [
      "Credits never expire",
      "All data types available",
      "Includes all formats",
    ],
    cta: "Get 20 Credits",
    accent: "orange",
    popular: true,
    badge: "Best Value",
  },
  {
    name: "Business",
    price: "$50",
    credits: "100 Credits",
    description: "For heavy users and business needs.",
    features: [
      "Credits never expire",
      "All data types available",
      "Includes all formats",
      "Priority support",
    ],
    cta: "Get 100 Credits",
    accent: "blue",
    popular: false,
  },
];

export default function ExportPricing() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
      <HowCreditsWork />
    </>
  );
}

function HowCreditsWork() {
  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-dark">How Credits Work</h3>
        <p className="text-darkgray mt-2">
          Our credit system is simple. You only pay for the data and format you
          need.
        </p>
      </div>
      <div className="rounded-2xl p-[1px] bg-gradient-to-br from-blue/20 to-green/20">
        <div className="rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Data Type Costs */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center bg-blue/10 text-blue">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold text-dark">Data Types</div>
              <div className="text-sm text-darkgray">
                Countries: 1 Credit
                <br />
                States: 2 Credits
                <br />
                Cities: 3 Credits
              </div>
            </div>
          </div>

          <div className="text-5xl text-center text-lightgray font-thin">+</div>

          {/* Format Costs */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center bg-green/10 text-green">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold text-dark">Formats</div>
              <div className="text-sm text-darkgray">
                JSON: Free
                <br />
                CSV: +1 Credit
                <br />
                SQL/XML: +2 Credits
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-darkgray mt-4">
        <strong>Example:</strong> Exporting Countries + States in JSON format
        would cost 1 + 2 + 0 = <strong>3 credits</strong>.
      </p>
    </div>
  );
}
