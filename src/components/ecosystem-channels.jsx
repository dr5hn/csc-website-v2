"use client";

import Link from "next/link";
import {
  Github,
  SquareTerminal,
  Package,
  Terminal,
  Download,
  BookOpen,
  ArrowRight,
  FlaskConical,
  Eye,
  PencilLine,
} from "lucide-react";
import { useGitHubStars } from "@/hooks/use-github-stars";

const STATIC_CHANNELS = [
  {
    title: "Open-Source Database",
    tagline: "The canonical source",
    href: "https://github.com/dr5hn/countries-states-cities-database",
    external: true,
    accent: "green",
    Icon: Github,
    tag: "GitHub",
    dynamic: true,
  },
  {
    title: "REST API",
    tagline: "Tiered, high-availability",
    description:
      "Production-grade REST API with tiered pricing, rate limiting, and sub-200ms p95 latency. Free tier for hobbyists; paid tiers scale to millions of requests.",
    href: "/product/api",
    accent: "blue",
    Icon: SquareTerminal,
    tag: "api.countrystatecity.in",
  },
  {
    title: "Export Tool",
    tagline: "Bulk data on demand",
    description:
      "Download curated snapshots in CSV, JSON, SQL, and more. Credit-based pricing for teams who need the full database without the API.",
    href: "/product/export-tool",
    accent: "green",
    Icon: Download,
    tag: "9+ formats",
  },
  {
    title: "NPM Packages",
    tagline: "JavaScript and TypeScript",
    description:
      "Typed, versioned NPM packages for countries, timezones, and browser-optimized bundles. Zero runtime dependencies, tree-shakeable.",
    href: "https://www.npmjs.com/org/countrystatecity",
    external: true,
    accent: "blue",
    Icon: Package,
    tag: "@countrystatecity/*",
  },
  {
    title: "PyPI Package",
    tagline: "Python-first ergonomics",
    description:
      "Pip-installable Python package with structured access to the full geographic dataset. Type-hinted, lazy-loading, ideal for data pipelines.",
    href: "https://pypi.org/project/countrystatecity-countries/",
    external: true,
    accent: "green",
    Icon: Package,
    tag: "pip install countrystatecity-countries",
  },
  {
    title: "CLI Tool",
    tagline: "Search, export, scaffold",
    description:
      "Terminal-first access to every dataset and API endpoint. Generate dropdowns, seeds, and export files in any format from one command.",
    href: "https://cli.countrystatecity.in",
    external: true,
    accent: "blue",
    Icon: Terminal,
    tag: "cli.countrystatecity.in",
  },
  {
    title: "API Playground",
    tagline: "Interactive Swagger UI",
    description:
      "Try every endpoint directly in the browser. Full OpenAPI 3.0 spec with example requests, response schemas, and live execution — no code required.",
    href: "https://playground.countrystatecity.in",
    external: true,
    accent: "blue",
    Icon: FlaskConical,
    tag: "playground.countrystatecity.in",
  },
  {
    title: "Live Demo",
    tagline: "Browse the dataset",
    description:
      "Interactive data browser showing the full country, state, and city hierarchy. Explore coverage, translations, coordinates, and metadata without writing a line of code.",
    href: "https://demo.countrystatecity.in",
    external: true,
    accent: "green",
    Icon: Eye,
    tag: "demo.countrystatecity.in",
  },
  {
    title: "Community Manager",
    tagline: "Submit & track corrections",
    description:
      "Report issues, submit data corrections, and track change requests. The community-driven platform that keeps the canonical dataset accurate.",
    href: "https://manager.countrystatecity.in",
    external: true,
    accent: "blue",
    Icon: PencilLine,
    tag: "manager.countrystatecity.in",
  },
];

function ChannelCard({ title, tagline, description, href, external, accent, Icon, tag }) {
  const iconCls =
    accent === "green" ? "text-green bg-green/10" : "text-blue bg-blue/10";
  const linkCls =
    accent === "green"
      ? "text-green hover:text-green/90"
      : "text-blue hover:text-blue/90";

  const LinkComponent = external ? "a" : Link;
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <div className="relative flex h-full flex-col rounded-[calc(1rem-1px)] border border-light/60 bg-white/80 p-6 backdrop-blur-sm shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] transition-all duration-300 hover:shadow-[0_1px_0_rgba(15,23,42,0.06),0_16px_40px_rgba(2,6,23,0.08)]">
      <LinkComponent
        aria-label={`Open ${title}`}
        className="absolute inset-0 rounded-[calc(1rem-1px)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/40"
        {...linkProps}
      />

      <div className="relative pointer-events-none flex items-start gap-4">
        <div
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconCls}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-darkgray">
            {tagline}
          </div>
          <h3 className="mt-1 text-xl font-semibold text-dark">{title}</h3>
        </div>
      </div>

      <p className="relative pointer-events-none mt-4 text-darkgray leading-relaxed">
        {description}
      </p>

      <div className="relative pointer-events-none mt-6 flex items-center justify-between border-t border-light/60 pt-4">
        <code className="text-xs font-mono text-darkgray truncate">{tag}</code>
        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${linkCls}`}>
          Learn more
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

function formatGitHubCount(n) {
  if (!n) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
  return `${n}+`;
}

export default function EcosystemChannels() {
  const { stars, forks, loading } = useGitHubStars("dr5hn", "countries-states-cities-database");

  const starsLabel = loading ? "9.4K+" : (formatGitHubCount(stars) ?? "9.4K+");
  const forksLabel = loading ? "2.9K+" : (formatGitHubCount(forks) ?? "2.9K+");

  const channels = STATIC_CHANNELS.map((ch) =>
    ch.dynamic
      ? {
          ...ch,
          description: `The original GitHub repository that started it all. ${starsLabel} stars, ${forksLabel} forks, 7+ years of compounding community trust. Free under ODbL.`,
        }
      : ch
  );

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm">
            <BookOpen className="h-3 w-3 text-blue" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
              Channels & Tools
            </span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark">
            Nine ways to use the same data
          </h2>
          <p className="mt-3 text-lg text-darkgray">
            Every channel and tool is maintained from a single source of truth.
            Pick the one that fits your workflow — or combine them.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {channels.map((ch) => (
            <ChannelCard key={ch.title} {...ch} />
          ))}
        </div>
      </div>
    </section>
  );
}
