"use client";

import { usePlatformStats } from "@/hooks/use-platform-stats";

// Renders live "250+ countries, 5.3K+ states and 153.8K+ cities" inline.
// Drop inside any <strong> or <span> — updates automatically from the API.
export default function LiveGeoCoverage({ className = "" }) {
  const { countries, states, cities } = usePlatformStats();

  const c = `${countries.value}+`;
  const s = `${states.value}${states.suffix}`;
  const ci = `${cities.value}${cities.suffix}`;

  return (
    <span className={className}>
      {c} countries, {s} states and {ci} cities
    </span>
  );
}
