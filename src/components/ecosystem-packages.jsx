"use client";

import { useState } from "react";
import { Copy, Check, Package } from "lucide-react";

const PACKAGES = [
  {
    name: "@countrystatecity/countries",
    registry: "npm",
    description: "Countries dataset — iso codes, currencies, translations, coordinates.",
    command: "npm install @countrystatecity/countries",
    href: "https://www.npmjs.com/package/@countrystatecity/countries",
  },
  {
    name: "@countrystatecity/countries-browser",
    registry: "npm",
    description: "Browser-optimized, tree-shakeable country bundle.",
    command: "npm install @countrystatecity/countries-browser",
    href: "https://www.npmjs.com/package/@countrystatecity/countries-browser",
  },
  {
    name: "@countrystatecity/timezones",
    registry: "npm",
    description: "Timezone data mapped to countries and administrative regions.",
    command: "npm install @countrystatecity/timezones",
    href: "https://www.npmjs.com/package/@countrystatecity/timezones",
  },
  {
    name: "countrystatecity-countries",
    registry: "pypi",
    description: "Python access to the full country / state / city dataset. Type-hinted, lazy-loading.",
    command: "pip install countrystatecity-countries",
    href: "https://pypi.org/project/countrystatecity-countries/",
  },
  {
    name: "@countrystatecity/cli",
    registry: "npm",
    description: "Terminal-first CLI — search, export, and scaffold from any dataset.",
    command: "npm install -g @countrystatecity/cli",
    href: "https://www.npmjs.com/package/@countrystatecity/cli",
  },
];

function RegistryBadge({ registry }) {
  const cls =
    registry === "pypi"
      ? "bg-green/10 text-green ring-green/20"
      : "bg-blue/10 text-blue ring-blue/20";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${cls}`}
    >
      {registry}
    </span>
  );
}

function PackageRow({ pkg }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(pkg.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — fail silently
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-light/60 bg-white/80 p-5 backdrop-blur-sm transition-all duration-200 hover:border-blue/20 hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={pkg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-semibold text-dark hover:text-blue"
          >
            {pkg.name}
          </a>
          <RegistryBadge registry={pkg.registry} />
        </div>
        <p className="mt-1 text-sm text-darkgray">{pkg.description}</p>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-dark px-3 py-2 font-mono text-xs text-white sm:max-w-sm">
        <code className="truncate flex-1">{pkg.command}</code>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${pkg.command}`}
          className="shrink-0 rounded p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function EcosystemPackages() {
  return (
    <section className="relative bg-gradient-to-br from-white via-light/30 to-blue/5">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm">
            <Package className="h-3 w-3 text-blue" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
              Packages
            </span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark">
            Install it the way you work
          </h2>
          <p className="mt-3 text-lg text-darkgray">
            Typed, versioned, and published to the registries developers already
            trust.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          {PACKAGES.map((pkg) => (
            <PackageRow key={pkg.name} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
