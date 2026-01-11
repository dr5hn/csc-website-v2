import PricingCard from "./pricing-card";
import CustomCredits from "./custom-credits";
import { Check, Database, Equal, FileJson, FileText, Plus } from "lucide-react";
import { exportPricingPlans } from "@/data/export-pricing";

export default function ExportPricing() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-start mb-12">
        {exportPricingPlans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
      
      {/* Custom Credits Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-dark mb-2">
          Need a Different Amount?
        </h3>
        <p className="text-darkgray">
          Purchase custom credits at $1 per credit - buy exactly what you need.
        </p>
      </div>
      
      <div className="max-w-md mx-auto mb-12">
        <CustomCredits />
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
                JSON/CSV: <strong>+1 Credit</strong>
              </li>
              <li>
                XML/YAML: <strong>+2 Credits</strong>
              </li>
              <li>
                SQL formats: <strong>+3 Credits</strong>
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
            <p className="text-3xl font-bold text-orange mt-4">4 Credits</p>
            <p className="text-xs text-lightgray mt-1">(1 + 2 + 1)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
