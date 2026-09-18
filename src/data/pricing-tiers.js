// src/data/pricing-tiers.js
//
// Structured tier x feature matrix for the pricing comparison table, plus
// fallback card copy for the pricing cards.
//
// This is now sourced live at runtime from csc-app's public `GET /plans`
// endpoint (see src/hooks/use-api-pricing.js) whenever that fetch succeeds.
// The data below is the fallback used when the fetch fails/is unavailable
// (e.g. static export preview, offline), and should still be kept roughly
// in sync with csc-app/api/src/config/pricingTiers.ts by hand.
//
// Cell values: true | false | string.

export const TIERS = [
  { key: "community", name: "Community" },
  { key: "starter", name: "Starter" },
  { key: "supporter", name: "Supporter", highlighted: true },
  { key: "professional", name: "Professional" },
  { key: "business", name: "Business" },
];

// Each row: { label, values: { <tierKey>: cellValue } }.
// Each section: { section, rows }.
export const COMPARISON_SECTIONS = [
  {
    section: "Pricing & Limits",
    rows: [
      {
        label: "Price",
        values: { community: "Free", starter: "$5/mo", supporter: "$9/mo", professional: "$29/mo", business: "$79/mo" },
      },
      {
        label: "Annual price",
        values: { community: "Free", starter: "$50/yr", supporter: "$90/yr", professional: "$290/yr", business: "$790/yr" },
      },
      {
        label: "Monthly Requests",
        values: { community: "3,000", starter: "9,000", supporter: "30,000", professional: "100,000", business: "750,000" },
      },
      {
        label: "Daily Requests",
        values: { community: "100", starter: "300", supporter: "1,000", professional: "3,300", business: "25,000" },
      },
      {
        label: "Origin Whitelisting",
        values: { community: false, starter: false, supporter: "Up to 3", professional: "Up to 10", business: "Up to 25" },
      },
    ],
  },
  {
    section: "Country Fields",
    rows: [
      {
        label: "Core fields (name, iso2/3, phone, capital, currency, emoji, lat/lng, region, timezones)",
        values: { community: true, starter: true, supporter: true, professional: true, business: true },
      },
      {
        label: "Extended fields (numeric code, currency name/symbol, TLD, nationality, population, GDP, area, postal code)",
        values: { community: false, starter: false, supporter: true, professional: true, business: true },
      },
      {
        label: "Translations & Wiki Data",
        values: { community: false, starter: false, supporter: true, professional: true, business: true },
      },
    ],
  },
  {
    section: "State Fields",
    rows: [
      {
        label: "Core fields (name, iso2, country code, lat/lng, timezone)",
        values: { community: true, starter: true, supporter: true, professional: true, business: true },
      },
      {
        label: "Extended fields (FIPS code, ISO 3166-2, type, level, parent, native name, population)",
        values: { community: false, starter: false, supporter: true, professional: true, business: true },
      },
      {
        label: "Translations & Wiki Data",
        values: { community: false, starter: false, supporter: true, professional: true, business: true },
      },
    ],
  },
  {
    section: "City Fields",
    rows: [
      {
        label: "Core fields (name)",
        values: { community: true, starter: true, supporter: true, professional: true, business: true },
      },
      {
        label: "Extended fields (state/country code, lat/lng, timezone, population, type, level, parent, native name)",
        values: { community: false, starter: false, supporter: true, professional: true, business: true },
      },
      {
        label: "Translations & Wiki Data",
        values: { community: false, starter: false, supporter: true, professional: true, business: true },
      },
    ],
  },
  {
    section: "Endpoints & Features",
    rows: [
      { label: "REST API", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "All Countries", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "States by Country", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "All States (Global)", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Cities by State", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "Cities by Country", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Inline Search Filtering", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Regions & Subregions API", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Phone Dial Code Lookup", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Currency Lookup by Country", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "ISO Code Lookup", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Timezone Lookup (country/state/city)", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "Fields Filtering (?fields=)", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Sorting (?sort=)", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Fuzzy / Typo-Tolerant Search", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Location Autocomplete", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "GraphQL API", values: { community: false, starter: false, supporter: false, professional: true, business: true } },
      { label: "Nearby / Geospatial Search", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Data Change Feed", values: { community: false, starter: false, supporter: false, professional: true, business: true } },
    ],
  },
  {
    section: "Support",
    rows: [
      {
        label: "Support Level",
        values: {
          community: "Community & Docs",
          starter: "Community & Docs",
          supporter: "Founder-led email (2-3 business days)",
          professional: "Priority (~1 business day)",
          business: "Priority (~1 business day)",
        },
      },
    ],
  },
];

// Pricing card copy, keyed by tier. `features` mirrors csc-app's live
// per-plan `features` array (see use-api-pricing.js) so the cards and the
// comparison table above stay describing the same shipped capabilities.
export const API_PLAN_CARDS = [
  {
    key: "community",
    name: "Community",
    price: "$0",
    priceAnnual: "$0",
    period: "/ month",
    description: "Perfect for personal projects & exploration.",
    features: [
      "3,000 API Requests/month (100/day)",
      "States by country and cities by state endpoints",
      "Exact postcode lookup, city classification, and data version metadata",
      "Basic fields only (no translations or premium data)",
      "Open access (no origin whitelisting)",
      "Community support and docs",
    ],
    cta: "Start for Free",
    href: "https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=api_pricing_community",
    target: "_blank",
    accent: "gray",
    popular: false,
  },
  {
    key: "starter",
    name: "Starter",
    price: "$5",
    priceAnnual: "$50",
    period: "/ month",
    description: "More headroom for side projects and prototypes.",
    features: [
      "9,000 API Requests/month (300/day)",
      "Same features as Community with higher limits",
      "All bulk states and cities by country endpoints",
      "Postcode listing and search with cursor pagination",
      "Inline search filtering, regions, phone, and currency lookup APIs",
      "Field filtering (?fields=) on every geographic endpoint; custom sort (?sort=) on list endpoints",
      "Basic fields only (no translations or premium data)",
      "Community support and docs",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=starter&utm_source=website&utm_medium=cta&utm_content=api_pricing_starter",
    target: "_blank",
    accent: "sky",
    popular: false,
  },
  {
    key: "supporter",
    name: "Supporter",
    price: "$9",
    priceAnnual: "$90",
    period: "/ month",
    description: "Ideal for growing applications with enhanced data.",
    features: [
      "30,000 API Requests/month (1,000/day)",
      "All Starter features",
      "Extended country and state fields + city coordinates, localized names, translations, and wiki data",
      "Fuzzy / typo-tolerant search (GET /v1/search/fuzzy)",
      "Location autocomplete with ranked, labeled suggestions (GET /v1/search/autocomplete)",
      "Find places near a location, ranked by distance (GET /v1/search/nearby)",
      "Origin whitelisting (up to 3 domains or IPs)",
      "Founder-led email support (2-3 business days)",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=supporter&utm_source=website&utm_medium=cta&utm_content=api_pricing_supporter",
    target: "_blank",
    accent: "orange",
    popular: true,
  },
  {
    key: "professional",
    name: "Professional",
    price: "$29",
    priceAnnual: "$290",
    period: "/ month",
    description: "Full data access for production applications.",
    features: [
      "100,000 API Requests/month (3,300/day)",
      "All Supporter features",
      "Data change feed for syncing a local copy (GET /v1/changes)",
      "Origin whitelisting (up to 10 domains or IPs)",
      "Founder-led priority support (~1 business day)",
      "GraphQL API (POST /v1/graphql)",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=professional&utm_source=website&utm_medium=cta&utm_content=api_pricing_professional",
    target: "_blank",
    accent: "blue",
    popular: false,
    badge: "Best Value",
  },
  {
    key: "business",
    name: "Business",
    price: "$79",
    priceAnnual: "$790",
    period: "/ month",
    description: "High-volume access with all premium features.",
    features: [
      "750,000 API Requests/month (25,000/day)",
      "All Professional features",
      "Origin whitelisting (up to 25 domains or IPs)",
      "Founder-led priority support (~1 business day)",
      "All current and upcoming premium features",
    ],
    cta: "Get Started",
    href: "https://app.countrystatecity.in/pricing?plan=business&utm_source=website&utm_medium=cta&utm_content=api_pricing_business",
    target: "_blank",
    accent: "blue",
    popular: false,
  },
];
