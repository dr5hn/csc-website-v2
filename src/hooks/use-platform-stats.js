"use client";

import { useState, useEffect } from "react";

const FALLBACK = {
  totalRequests: 5135800142,
  countries: 250,
  states: 5308,
  cities: 153768,
};

// Module-level cache — all components share one fetch per session
let _promise = null;
let _cached = null;

function fetchPlatformStats() {
  if (_cached) return Promise.resolve(_cached);
  if (_promise) return _promise;
  _promise = fetch("https://api.countrystatecity.in/stats")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => { _cached = data; return data; })
    .catch(() => { _cached = FALLBACK; return FALLBACK; });
  return _promise;
}

export function formatCount(n) {
  if (n >= 1_000_000_000)
    return { value: parseFloat((n / 1_000_000_000).toFixed(1)), suffix: "B+", decimals: 1 };
  if (n >= 1_000_000)
    return { value: parseFloat((n / 1_000_000).toFixed(1)), suffix: "M+", decimals: 1 };
  if (n >= 1_000)
    return { value: parseFloat((n / 1_000).toFixed(1)), suffix: "K+", decimals: 1 };
  return { value: n, suffix: "+", decimals: 0 };
}

export function usePlatformStats() {
  const [raw, setRaw] = useState(_cached ?? FALLBACK);
  const [loading, setLoading] = useState(!_cached);

  useEffect(() => {
    if (_cached) { setLoading(false); return; }
    fetchPlatformStats().then((data) => {
      setRaw(data);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    totalRequests: formatCount(raw.totalRequests),
    countries: { value: raw.countries, suffix: "", decimals: 0 },
    states: formatCount(raw.states),
    cities: formatCount(raw.cities),
  };
}
