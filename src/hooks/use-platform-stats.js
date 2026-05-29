"use client";

import { useState, useEffect } from "react";

const FALLBACK = {
  totalRequests: 5000000000,
  countries: 250,
  states: 5000,
  cities: 151000,
};

function formatCount(n) {
  if (n >= 1_000_000_000)
    return { value: parseFloat((n / 1_000_000_000).toFixed(1)), suffix: "B+", decimals: 1 };
  if (n >= 1_000_000)
    return { value: parseFloat((n / 1_000_000).toFixed(1)), suffix: "M+", decimals: 1 };
  if (n >= 1_000)
    return { value: parseFloat((n / 1_000).toFixed(1)), suffix: "K+", decimals: 1 };
  return { value: n, suffix: "+", decimals: 0 };
}

export function usePlatformStats() {
  const [raw, setRaw] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.countrystatecity.in/stats")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setRaw(data))
      .catch(() => {}) // keep FALLBACK on error
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    totalRequests: formatCount(raw.totalRequests),
    countries: { value: raw.countries, suffix: "", decimals: 0 },
    states: formatCount(raw.states),
    cities: formatCount(raw.cities),
  };
}
