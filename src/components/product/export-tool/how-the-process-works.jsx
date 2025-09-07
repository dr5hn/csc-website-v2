"use client";

import { Settings, ClipboardCheck, Download } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "Select Configuration",
    description:
      "Choose the exact countries, states, and data fields you need for your project. No more sifting through massive, irrelevant files.",
    accent: "blue",
  },
  {
    icon: ClipboardCheck,
    title: "Review Export Details",
    description:
      "Confirm your selections and see the precise credit cost before you commit. Our transparent system ensures no surprises.",
    accent: "green",
  },
  {
    icon: Download,
    title: "Download Your Export",
    description:
      "Your custom dataset is generated instantly. Download it in your chosen format (JSON, CSV, SQL) and integrate it in minutes.",
    accent: "orange",
  },
];

export default function HowTheProcessWorks() {
  return (
    <section className="relative py-10 lg:py-20 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
        <div
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm"
          aria-label="Process"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-blue"
            aria-hidden="true"
          ></span>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
            The Process
          </span>
        </div>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark">
          How The Process Works
        </h2>
        <p className="mt-3 text-lg md:text-xl text-darkgray">
          From configuration to download in three simple, transparent steps.
        </p>
      </div>

      <div className="relative">
        {/* Desktop Timeline Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-light transform -translate-y-1/2"></div>
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-blue/50 via-green/50 to-orange/50 transform -translate-y-1/2"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const accentColor =
              step.accent === "green"
                ? "bg-green/10 text-green"
                : step.accent === "orange"
                ? "bg-orange/10 text-orange"
                : "bg-blue/10 text-blue";
            const accentBorder =
              step.accent === "green"
                ? "border-green/20"
                : step.accent === "orange"
                ? "border-orange/20"
                : "border-blue/20";
            const stepNumberColor =
              step.accent === "green"
                ? "text-green/20"
                : step.accent === "orange"
                ? "text-orange/20"
                : "text-blue/20";

            return (
              <div key={index} className="relative text-center">
                {/* Mobile Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-12 left-1/2 -translate-x-1/2 h-[calc(100%-1rem)] w-px bg-light"></div>
                )}

                <div
                  className={`relative bg-white/80 backdrop-blur-sm border ${accentBorder} rounded-2xl p-6`}
                >
                  <div className="relative z-10">
                    {/* Step Number Badge */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                      <div
                        className={`w-16 h-16 rounded-full bg-white border-2 ${accentBorder} flex items-center justify-center`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full ${accentColor} flex items-center justify-center`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute -top-4 -right-4 text-7xl font-black ${stepNumberColor} z-0`}
                    >
                      0{index + 1}
                    </div>

                    <div className="pt-12">
                      <h3 className="text-xl font-bold text-dark mb-2 mt-4">
                        {step.title}
                      </h3>
                      <p className="text-darkgray">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
