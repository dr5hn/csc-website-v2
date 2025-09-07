import PricingCard from "./pricing-card";
import { Check, Database, Equal, FileJson, FileText, Plus } from "lucide-react";

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
    <div className="mt-10">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-dark">How Credits Work</h3>
        <p className="text-darkgray mt-2 max-w-2xl mx-auto">
          Our credit system is simple and transparent. Your total cost is the
          sum of the data types you select plus any additional format costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6">
        {/* Step 1: Data Types */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-blue/20 to-transparent h-full">
          <div className="rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-lg p-6 h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center bg-blue/10 text-blue">
                <Database className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-dark text-lg">Data Types</div>
                <div className="text-sm text-darkgray">Base credit cost</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-darkgray">
              <li>
                Countries: <strong>1 Credit</strong>
              </li>
              <li>
                States: <strong>2 Credits</strong>
              </li>
              <li>
                Cities: <strong>3 Credits</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-4xl text-center text-lightgray font-thin hidden lg:block">
          <Plus />
        </div>

        {/* Step 2: Formats */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-green/20 to-transparent h-full">
          <div className="rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-lg p-6 h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center bg-green/10 text-green">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-dark text-lg">Formats</div>
                <div className="text-sm text-darkgray">Additional cost</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-darkgray">
              <li>
                JSON: <strong>Free</strong>
              </li>
              <li>
                CSV: <strong>+1 Credit</strong>
              </li>
              <li>
                SQL/XML: <strong>+2 Credits</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-4xl text-center text-lightgray font-thin hidden lg:block">
          <Equal />
        </div>

        {/* Step 3: Example */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-orange/20 to-transparent h-full">
          <div className="rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-lg p-6 h-full text-center flex flex-col justify-center">
            <div className="font-bold text-dark text-lg">Example Total</div>
            <p className="text-sm text-darkgray mt-2">
              Exporting <strong>Countries + States</strong> in{" "}
              <strong>JSON</strong> format costs:
            </p>
            <p className="text-3xl font-bold text-orange mt-4">3 Credits</p>
            <p className="text-xs text-lightgray mt-1">(1 + 2 + 0)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
