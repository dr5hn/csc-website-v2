import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  BookOpen,
  Star,
  GitBranch,
  Users,
  Download,
} from "lucide-react";
import GitHubIcon from "@/icons/GitHub";
import Link from "next/link";

const stats = [
  { label: "Export Formats", value: "9+", Icon: GitBranch, accent: "blue" },
  { label: "GitHub Stars", value: "6.8K+", Icon: Star, accent: "orange" },
  { label: "Contributors", value: "500+", Icon: Users, accent: "green" },
];

const dbFeatures = [
  "Complete global coverage (250+ countries)",
  "Multiple formats (JSON, SQL, CSV, XML, YAML)",
  "MIT license for commercial use",
  "Weekly community updates",
  "Comprehensive documentation",
];

export default function DatabasePricing() {
  return (
    <div className="rounded-2xl p-[1px] bg-gradient-to-br from-blue/20 to-green/20">
      <div className="rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-green mb-6 shadow-lg">
            <Download className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue to-green bg-clip-text text-transparent">
            Database Repository
          </h2>
          <p className="text-6xl font-black text-dark font-mono mb-4">
            FREE FOREVER
          </p>
          <p className="text-lg text-darkgray mb-8 max-w-2xl">
            Complete open-source geographical database with MIT license. No
            restrictions, no limits, no hidden costs. Perfect for any project
            size.
          </p>
          <div className="space-y-4 mb-10">
            {dbFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-darkgray">{feature}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-dark text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-dark/90 transition-colors inline-flex items-center h-14 shadow-lg transform hover:-translate-y-0.5"
            >
              <Link
                href="https://github.com/dr5hn/countries-states-cities-database"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="mr-3 h-6 w-6" />
                Download Free
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-blue text-blue px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue/5 transition-colors inline-flex items-center h-14 bg-transparent"
            >
              <Link href="https://docs.countrystatecity.in">
                <BookOpen className="mr-3 h-6 w-6" />
                View Docs
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="space-y-6">
          {stats.map((stat) => {
            const Icon = stat.Icon;
            const accentClass =
              stat.accent === "blue"
                ? "bg-blue/10 text-blue"
                : stat.accent === "green"
                ? "bg-green/10 text-green"
                : "bg-orange/10 text-orange";
            return (
              <div
                key={stat.label}
                className="bg-white/70 p-4 rounded-lg border border-light/70 flex items-center gap-4"
              >
                <div
                  className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${accentClass}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-dark">
                    {stat.value}
                  </div>
                  <div className="text-sm text-darkgray">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
