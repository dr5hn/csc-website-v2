"use client";

import { useState, useEffect } from "react";

const FALLBACK = {
  totalRequests: 5135800142,
  countries: 250,
  states: 5308,
  cities: 153768,
};

// Module-level cache — all components share one fetch per session. `live` records
// whether the numbers came from the API or are the build-time fallback, so the UI can
// tag them "live" or "cached" (interaction spec 5).
let _promise = null;
let _cached = null;

function fetchPlatformStats() {
  if (_cached) return Promise.resolve(_cached);
  if (_promise) return _promise;
  _promise = fetch("https://api.countrystatecity.in/stats")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => { _cached = { data, live: true }; return _cached; })
    .catch(() => { _cached = { data: FALLBACK, live: false }; return _cached; });
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
  // Always start from FALLBACK, never from the module cache. The server has no
  // cache, so it always renders FALLBACK; a component that hydrates after an
  // earlier one's fetch resolved would otherwise start from live data and no
  // longer match the server markup, which React reports as a hydration error.
  const [raw, setRaw] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPlatformStats().then((result) => {
      if (!active) return;
      setRaw(result.data);
      setLive(result.live);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return {
    loading,
    live,
    totalRequests: formatCount(raw.totalRequests),
    countries: { value: raw.countries, suffix: "", decimals: 0 },
    states: formatCount(raw.states),
    cities: formatCount(raw.cities),
    raw,
  };
}
