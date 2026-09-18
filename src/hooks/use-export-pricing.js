"use client";

import { useEffect, useState } from "react";
import {
  exportPricingPlans as STATIC_PLANS,
  customCreditsOption as STATIC_CUSTOM,
} from "@/data/export-pricing";

const API_BASE =
  process.env.NEXT_PUBLIC_EXPORT_CREDITS_API_URL || "https://eapi.countrystatecity.in";
const ENDPOINT = `${API_BASE}/api/credits/packages`;

const PLAN_ORDER = ["STARTER", "BASIC", "STANDARD", "PREMIUM"];

const PLAN_COPY = {
  STARTER: {
    accent: "gray",
    description: () => "Perfect for small to medium exports.",
    features: [
      "All export formats supported",
      "Access to complete country, state & city data",
      "Credits never expire",
      "Comfortably covers 1–2 typical exports",
    ],
  },
  BASIC: {
    accent: "green",
    description: () => "Best value for regular usage.",
    features: [
      "All export formats supported",
      "Access to all data types",
      "Credits never expire",
      "Best value for regular usage",
    ],
  },
  STANDARD: {
    accent: "blue",
    description: (pct) => `${pct}% savings compared to Custom Credits.`,
    features: [
      "All export formats supported",
      "Access to all data types",
      "Credits never expire",
      "Valid for all exports",
    ],
  },
  PREMIUM: {
    accent: "orange",
    description: (pct) => `${pct}% savings — best value for heavy users.`,
    features: [
      "All export formats supported",
      "Access to all data types",
      "Priority support",
      "Valid for all exports",
    ],
  },
};

const FALLBACK = { plans: STATIC_PLANS, customCredits: STATIC_CUSTOM };

function buildFromApi(data) {
  const custom = data.CUSTOM;
  const customPerCredit = custom.price / custom.credits;

  const computed = PLAN_ORDER.map((key) => {
    const pkg = data[key];
    const perCredit = pkg.price / pkg.credits;
    const pct = Math.max(0, Math.round((1 - perCredit / customPerCredit) * 100));
    return { key, pkg, perCredit, pct };
  });

  const bestValueKey = computed.reduce((best, cur) =>
    cur.perCredit < best.perCredit ? cur : best
  ).key;

  const plans = computed.map(({ key, pkg, perCredit, pct }) => {
    const copy = PLAN_COPY[key];
    const isPopular = !!pkg.mostPopular;
    const isBestValue = key === bestValueKey && !isPopular;
    const badge = isBestValue ? "Best Value" : !isPopular && pct > 0 ? `Save ${pct}%` : undefined;

    return {
      name: pkg.name,
      price: `$${pkg.price}`,
      credits: `${pkg.credits} Credits`,
      pricePerCredit: `$${perCredit.toFixed(2)}/credit`,
      description: copy.description(pct),
      features: copy.features,
      cta: `Buy ${pkg.credits} Credits`,
      href: "https://export.countrystatecity.in",
      target: "_blank",
      accent: copy.accent,
      popular: isPopular,
      badge,
    };
  });

  const customCredits = {
    ...STATIC_CUSTOM,
    price: `$${customPerCredit.toFixed(2)}`,
    pricePerCredit: `$${customPerCredit.toFixed(2)} per credit`,
    description: `Buy exactly what you need — $${custom.price} per credit`,
  };

  return { plans: [STATIC_PLANS[0], ...plans], customCredits };
}

let _cache = null;
let _promise = null;

function loadPackages() {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch(ENDPOINT)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad response"))))
    .then((json) => {
      if (!json?.success || !json?.data) throw new Error("bad payload");
      const built = buildFromApi(json.data);
      _cache = built;
      return built;
    })
    .catch(() => {
      _promise = null;
      return null;
    });
  return _promise;
}

export function useExportPricing() {
  const [state, setState] = useState(() => ({
    loading: !_cache,
    live: !!_cache,
    ...(_cache || FALLBACK),
  }));

  useEffect(() => {
    if (_cache) return;
    let cancelled = false;
    loadPackages().then((result) => {
      if (cancelled) return;
      setState({
        loading: false,
        live: !!result,
        ...(result || FALLBACK),
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
