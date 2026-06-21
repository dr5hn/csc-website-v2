import { Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CLICallout() {
  return (
    <section className="relative bg-gradient-to-br from-white via-light/30 to-blue/5">
      <div className="container mx-auto px-4 py-10 lg:py-20">
        <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <Terminal className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dark">
                  Explore from your terminal
                </h3>
                <p className="mt-1 text-darkgray leading-relaxed">
                  Search, explore, and generate code for geographic data — right
                  from your terminal.
                </p>
              </div>
            </div>

            {/* Code preview */}
            <div className="rounded-xl overflow-hidden">
              <pre className="m-0 overflow-x-auto p-4 md:p-6 text-sm leading-6 text-white bg-dark">
                <code>{`$ csc search "tokyo"

┌──────────┬────────────┬─────────┐
│ Name     │ State      │ Country │
├──────────┼────────────┼─────────┤
│ Tokyo    │ Tokyo      │ Japan   │
└──────────┴────────────┴─────────┘

$ csc explore`}</code>
              </pre>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="https://cli.countrystatecity.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-dark/90"
              >
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
