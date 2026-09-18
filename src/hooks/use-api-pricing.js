"use client";

import { useEffect, useState } from "react";
import { TIERS as STATIC_TIERS, COMPARISON_SECTIONS as STATIC_SECTIONS, API_PLAN_CARDS as STATIC_CARDS } from "@/data/pricing-tiers";

const API_BASE =
  process.env.NEXT_PUBLIC_APP_PLANS_API_URL || "https://api.countrystatecity.in";
const ENDPOINT = `${API_BASE}/plans`;

const TIER_ORDER = ["community", "starter", "supporter", "professional", "business"];

const TIER_COPY = {
  community: {
    description: "Perfect for personal projects & exploration.",
    cta: "Start for Free",
    accent: "gray",
    href: "https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=api_pricing_community",
  },
  starter: {
    description: "More headroom for side projects and prototypes.",
    cta: "Get Started",
    accent: "sky",
    href: "https://app.countrystatecity.in/pricing?plan=starter&utm_source=website&utm_medium=cta&utm_content=api_pricing_starter",
  },
  supporter: {
    description: "Ideal for growing applications with enhanced data.",
    cta: "Get Started",
    accent: "orange",
    href: "https://app.countrystatecity.in/pricing?plan=supporter&utm_source=website&utm_medium=cta&utm_content=api_pricing_supporter",
  },
  professional: {
    description: "Full data access for production applications.",
    cta: "Get Started",
    accent: "blue",
    href: "https://app.countrystatecity.in/pricing?plan=professional&utm_source=website&utm_medium=cta&utm_content=api_pricing_professional",
    extraBadge: "Best Value",
  },
  business: {
    description: "High-volume access with all premium features.",
    cta: "Get Started",
    accent: "blue",
    href: "https://app.countrystatecity.in/pricing?plan=business&utm_source=website&utm_medium=cta&utm_content=api_pricing_business",
  },
};

// Endpoints & Features rows, in display order. `flag` is the featureFlags
// key from GET /plans; rows with no flag (e.g. timezone lookup) aren't
// gated by any plan and render as always-included.
const ENDPOINT_ROWS = [
  { flag: "restApi", label: "REST API" },
  { flag: "bulkCountries", label: "All Countries" },
  { flag: "statesByCountry", label: "States by Country" },
  { flag: "bulkStates", label: "All States (Global)" },
  { flag: "citiesByState", label: "Cities by State" },
  { flag: "citiesByCountry", label: "Cities by Country" },
  { flag: "searchEndpoint", label: "Inline Search Filtering" },
  { flag: "regionsApi", label: "Regions & Subregions API" },
  { flag: "phoneDialCode", label: "Phone Dial Code Lookup" },
  { flag: "currencyApi", label: "Currency Lookup by Country" },
  { flag: "isoLookup", label: "ISO Code Lookup" },
  { flag: null, label: "Timezone Lookup (country/state/city)" },
  { flag: "fieldsFiltering", label: "Fields Filtering (?fields=)" },
  { flag: "sortParameter", label: "Sorting (?sort=)" },
  { flag: "fuzzySearch", label: "Fuzzy / Typo-Tolerant Search" },
  { flag: "autocomplete", label: "Location Autocomplete" },
  { flag: "graphql", label: "GraphQL API" },
  { flag: "nearbySearch", label: "Nearby / Geospatial Search" },
  { flag: "dataChangeFeed", label: "Data Change Feed" },
];

const FIELD_SECTIONS = [
  {
    section: "Country Fields",
    core: "Core fields (name, iso2/3, phone, capital, currency, emoji, lat/lng, region, timezones)",
    extended: "Extended fields (numeric code, currency name/symbol, TLD, nationality, population, GDP, area, postal code)",
  },
  {
    section: "State Fields",
    core: "Core fields (name, iso2, country code, lat/lng, timezone)",
    extended: "Extended fields (FIPS code, ISO 3166-2, type, level, parent, native name, population)",
  },
  {
    section: "City Fields",
    core: "Core fields (name)",
    extended: "Extended fields (state/country code, lat/lng, timezone, population, type, level, parent, native name)",
  },
];

const SUPPORT_LEVEL = {
  community: "Community & Docs",
  starter: "Community & Docs",
  supporter: "Founder-led email (2-3 business days)",
  professional: "Priority (~1 business day)",
  business: "Priority (~1 business day)",
};

function allTrue(keys) {
  return Object.fromEntries(keys.map((k) => [k, true]));
}

const FALLBACK = { tiers: STATIC_TIERS, sections: STATIC_SECTIONS, cards: STATIC_CARDS };

function buildFromApi(plans) {
  const byKey = Object.fromEntries(plans.map((p) => [p.key, p]));
  const orderedKeys = TIER_ORDER.filter((k) => byKey[k]);

  const tiers = orderedKeys.map((key) => ({
    key,
    name: byKey[key].name,
    highlighted: !!byKey[key].badges?.includes("Most Popular"),
  }));

  const pricingLimits = {
    section: "Pricing & Limits",
    rows: [
      {
        label: "Price",
        values: Object.fromEntries(
          orderedKeys.map((k) => [k, byKey[k].priceMonthly === 0 ? "Free" : `$${byKey[k].priceMonthly}/mo`])
        ),
      },
      {
        label: "Annual price (2 months free)",
        values: Object.fromEntries(
          orderedKeys.map((k) => [k, byKey[k].priceAnnual == null ? "Free" : `$${byKey[k].priceAnnual}/yr`])
        ),
      },
      {
        label: "Monthly Requests",
        values: Object.fromEntries(orderedKeys.map((k) => [k, byKey[k].monthlyLimit.toLocaleString()])),
      },
      {
        label: "Daily Requests",
        values: Object.fromEntries(orderedKeys.map((k) => [k, byKey[k].dailyLimit.toLocaleString()])),
      },
      {
        label: "Origin Whitelisting",
        values: Object.fromEntries(
          orderedKeys.map((k) => [k, byKey[k].maxWhitelistEntries > 0 ? `Up to ${byKey[k].maxWhitelistEntries}` : false])
        ),
      },
    ],
  };

  const fieldSections = FIELD_SECTIONS.map(({ section, core, extended }) => ({
    section,
    rows: [
      { label: core, values: allTrue(orderedKeys) },
      {
        label: extended,
        values: Object.fromEntries(orderedKeys.map((k) => [k, byKey[k].dataAccessLevel === "full"])),
      },
      {
        label: "Translations & Wiki Data",
        values: Object.fromEntries(orderedKeys.map((k) => [k, byKey[k].dataAccessLevel === "full"])),
      },
    ],
  }));

  const endpointsSection = {
    section: "Endpoints & Features",
    rows: ENDPOINT_ROWS.map(({ flag, label }) => ({
      label,
      values: Object.fromEntries(
        orderedKeys.map((k) => [k, flag ? !!byKey[k].featureFlags?.[flag] : true])
      ),
    })),
  };

  const supportSection = {
    section: "Support",
    rows: [
      {
        label: "Support Level",
        values: Object.fromEntries(orderedKeys.map((k) => [k, SUPPORT_LEVEL[k]])),
      },
    ],
  };

  const sections = [pricingLimits, ...fieldSections, endpointsSection, supportSection];

  const cards = orderedKeys.map((key) => {
    const plan = byKey[key];
    const copy = TIER_COPY[key];
    const isPopular = !!plan.badges?.includes("Most Popular");
    const badge = !isPopular && copy.extraBadge ? copy.extraBadge : undefined;

    return {
      name: plan.name,
      price: plan.priceMonthly === 0 ? "$0" : `$${plan.priceMonthly}`,
      priceAnnual: plan.priceAnnual == null ? "$0" : `$${plan.priceAnnual}`,
      period: "/ month",
      description: copy.description,
      features:
        plan.features && plan.features.length
          ? plan.features
          : STATIC_CARDS.find((c) => c.key === key)?.features || [],
      cta: copy.cta,
      href: copy.href,
      target: "_blank",
      accent: copy.accent,
      popular: isPopular,
      badge,
    };
  });

  return { tiers, sections, cards };
}

let _cache = null;
let _promise = null;

function loadPlans() {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch(ENDPOINT)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad response"))))
    .then((json) => {
      if (!json?.plans?.length) throw new Error("bad payload");
      const built = buildFromApi(json.plans);
      _cache = built;
      return built;
    })
    .catch(() => {
      _promise = null;
      return null;
    });
  return _promise;
}

export function useApiPricing() {
  const [state, setState] = useState(() => ({
    loading: !_cache,
    live: !!_cache,
    ...(_cache || FALLBACK),
  }));

  useEffect(() => {
    if (_cache) return;
    let cancelled = false;
    loadPlans().then((result) => {
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
