// src/data/pricing-tiers.js
//
// Structured tier x feature matrix for the pricing comparison table.
//
// SOURCE OF TRUTH: csc-app/api/src/config/pricingTiers.ts (feature flags,
// limits, data-access levels) and csc-app/web/src/pages/pricing.tsx
// (FEATURE_FLAG_LABELS, COMING_SOON_FLAGS). Keep in sync when pricing or
// features change — the csc-app "sync-pricing-and-docs" skill walks this.
//
// Cell values: true | false | "coming_soon" | string.

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
        values: { community: false, starter: false, supporter: false, professional: true, business: true },
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
        values: { community: false, starter: false, supporter: false, professional: true, business: true },
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
        values: { community: false, starter: false, supporter: false, professional: true, business: true },
      },
    ],
  },
  {
    section: "Endpoints & Features",
    rows: [
      { label: "REST API", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "All Countries", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "States by Country", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "All States (Global)", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Cities by State", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "Cities by Country", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Inline Search Filtering", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Regions & Subregions API", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Phone Dial Code Lookup", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Currency Lookup by Country", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "ISO Code Lookup", values: { community: false, starter: true, supporter: true, professional: true, business: true } },
      { label: "Timezone Lookup (country/state/city)", values: { community: true, starter: true, supporter: true, professional: true, business: true } },
      { label: "Fields Filtering (?fields=)", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Sorting (?sort=)", values: { community: false, starter: false, supporter: true, professional: true, business: true } },
      { label: "Fuzzy / Typo-Tolerant Search", values: { community: false, starter: false, supporter: false, professional: true, business: true } },
      { label: "GraphQL API", values: { community: false, starter: false, supporter: false, professional: "coming_soon", business: "coming_soon" } },
      { label: "Nearby / Geospatial Search", values: { community: false, starter: false, supporter: false, professional: "coming_soon", business: "coming_soon" } },
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
