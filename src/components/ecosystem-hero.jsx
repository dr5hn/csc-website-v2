"use client";

import Link from "next/link";
import { ArrowRight, Github, Sparkles } from "lucide-react";

export default function EcosystemHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-light/30 to-blue/5">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm"
            aria-label="Ecosystem"
          >
            <Sparkles className="h-3 w-3 text-blue" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
              Ecosystem
            </span>
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue to-green bg-clip-text text-transparent leading-tight">
            One platform.
            <br />
            Every channel.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-darkgray leading-relaxed">
            Country, state, and city data wherever developers work — an
            open-source GitHub database, a REST API, NPM and PyPI packages, a
            CLI, interactive playground and demo, bulk exports, and community
            tooling. One source of truth. Nine ways to use it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://github.com/dr5hn/countries-states-cities-database"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-dark text-white px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-dark/90"
            >
              <Github className="h-4 w-4" />
              <span>Explore on GitHub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/product/api"
              className="inline-flex items-center gap-2 rounded-full bg-white text-dark px-5 py-2.5 text-sm font-semibold ring-1 ring-light transition-all duration-200 hover:ring-blue/40"
            >
              <span>Try the API</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
