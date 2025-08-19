"use client";

import GitHubIcon from "@/icons/GitHub";
import { Users, FileText, Star } from "lucide-react";
import Link from "next/link";

const metrics = [
  {
    icon: Users,
    value: "10,000+",
    label: "Users",
    description: "Developers worldwide",
    accent: "blue",
  },
  {
    icon: FileText,
    value: "40+",
    label: "Supported Formats",
    description: "CSV, JSON, SQL & more",
    accent: "green",
  },
  {
    icon: GitHubIcon,
    value: "Open-source",
    label: "GitHub Community",
    description: "Actively maintained",
    accent: "blue",
  },
];

function MetricCard({ metric, index }) {
  const Icon = metric.icon;
  const accentColor =
    metric.accent === "green"
      ? "text-green bg-green/10"
      : "text-blue bg-blue/10";

  return (
    <div className="group relative transition-all duration-700">
      <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-light/50 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-green/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Content */}
        <div className="relative text-center">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-12 h-12 ${accentColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* Value */}
          <div className="text-2xl lg:text-3xl font-bold text-dark mb-2 font-mono">
            {metric.value}
          </div>

          {/* Label */}
          <div className="text-sm font-semibold text-darkgray mb-1 uppercase">
            {metric.label}
          </div>

          {/* Description */}
          <div className="text-xs text-lightgray">{metric.description}</div>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden py-10 lg:py-20 container mx-auto px-4 text-center">
      {/* Main Headline */}
      <h2 className="mt-4 text-4xl md:text-5xl font-bold mb-4">
        Powering developers, analysts, and businesses everywhere
      </h2>

      {/* Supporting Text */}
      <p className="text-darkgray max-w-2xl mx-auto">
        From startups to global enterprises, thousands of users rely on the
        CountryStateCity API and tools every day.
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 my-6 md:my-12">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>

      {/* GitHub Badge */}
      <Link
        href="https://github.com/dr5hn/countries-states-cities-database"
        target="_blank"
        className="flex justify-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-dark rounded-full text-white hover:bg-dark/90 transition-colors duration-200 group">
          <GitHubIcon className="w-5 h-5" />
          <span className="font-semibold">Star us on GitHub</span>
          <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-sm font-mono">2.1k</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
