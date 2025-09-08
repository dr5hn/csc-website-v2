"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Code, Download, Database } from "lucide-react";
import ApiPricing from "./api-pricing";
import ExportPricing from "./export-pricing";
import DatabasePricing from "./database-pricing";

const tabs = [
  { key: "api", label: "API", icon: Code },
  { key: "export", label: "Export Tool", icon: Download },
  { key: "database", label: "Database", icon: Database },
];

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState("api");

  const renderContent = () => {
    switch (activeTab) {
      case "api":
        return <ApiPricing />;
      case "export":
        return <ExportPricing />;
      case "database":
        return <DatabasePricing />;
      default:
        return <ApiPricing />;
    }
  };

  return (
    <section className="py-10 lg:py-20 container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue via-blue to-green bg-clip-text text-transparent">
            Simple, transparent pricing
          </span>
        </h1>
        <p className="text-xl text-darkgray md:mb-8 max-w-4xl mx-auto">
          Start free with our open-source data, or unlock the full API for
          production use. Find the perfect plan for your project.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap justify-center gap-2 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-light/60 shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300",
                activeTab === tab.key
                  ? "bg-dark text-white shadow-lg"
                  : "text-darkgray hover:bg-light/80"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeInUp">{renderContent()}</div>
    </section>
  );
}
