// src/components/pricing-comparison.jsx
import { Check, Minus } from "lucide-react";
import { TIERS, COMPARISON_SECTIONS } from "@/data/pricing-tiers";

function Cell({ value }) {
  if (value === undefined || value === null) {
    return <Minus className="mx-auto h-4 w-4 text-darkgray/40" aria-label="Not included" />;
  }
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-green" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-darkgray/40" aria-label="Not included" />;
  }
  if (value === "coming_soon") {
    return (
      <span className="inline-block rounded-full bg-orange/10 px-2 py-0.5 text-[11px] font-semibold text-orange">
        Coming soon
      </span>
    );
  }
  return <span className="text-sm text-dark">{value}</span>;
}

export default function PricingComparison() {
  return (
    <section className="container mx-auto px-4 py-10 lg:py-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-dark">Compare all features</h2>
        <p className="mt-3 text-lg text-darkgray">
          Every tier, side by side. Pick the plan that matches the data and endpoints you need.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-light/60 bg-white/80 shadow-sm">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-light/60">
              <th scope="col" className="sticky left-0 z-10 bg-white/90 px-4 py-4 text-sm font-semibold text-dark">
                Feature
              </th>
              {TIERS.map((tier) => (
                <th
                  key={tier.key}
                  scope="col"
                  className={`px-4 py-4 text-center text-sm font-bold ${
                    tier.highlighted ? "text-blue" : "text-dark"
                  }`}
                >
                  {tier.name}
                  {tier.highlighted && (
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-orange">
                      Most Popular
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_SECTIONS.map((section) => (
              <FragmentSection key={section.section} section={section} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FragmentSection({ section }) {
  return (
    <>
      <tr className="bg-light/30">
        <td
          colSpan={TIERS.length + 1}
          className="sticky left-0 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-darkgray"
        >
          {section.section}
        </td>
      </tr>
      {section.rows.map((row) => (
        <tr key={`${section.section}:${row.label}`} className="border-b border-light/40 last:border-0">
          <th scope="row" className="sticky left-0 z-10 bg-white/90 px-4 py-3 text-sm text-darkgray font-normal">
            {row.label}
          </th>
          {TIERS.map((tier) => (
            <td key={tier.key} className="px-4 py-3 text-center align-middle">
              <Cell value={row.values[tier.key]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
