# Marketing Pricing Comparison Table — Implementation Plan (Project B)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full tier × feature comparison table to the marketing site, shown on both `/pricing` (API tab) and `/product/api`, fed by a structured data file that mirrors the csc-app dashboard's comparison.

**Architecture:** A structured data module (`src/data/pricing-tiers.js`) holds the tier × feature matrix as flat per-feature values. A presentational component (`src/components/pricing-comparison.jsx`) renders it. It's embedded once at the bottom of the shared `<ApiPricing>` component, so both pages pick it up with a single integration point.

**Tech Stack:** Next.js (static export), React, TailwindCSS v4, lucide-react. No test framework exists in this repo (marketing site); verification is `next build` + visual check, the established tooling here.

**Source of truth for the data:** csc-app `api/src/config/pricingTiers.ts` (feature flags, limits, data-access levels) and `web/src/pages/pricing.tsx` (`FEATURE_FLAG_LABELS`, `COMING_SOON_FLAGS`). Values below were transcribed from those files on 2026-05-24.

---

## File Structure

- **Create** `src/data/pricing-tiers.js` — structured matrix: tier metadata + ordered feature sections. One responsibility: be the data source. No JSX.
- **Create** `src/components/pricing-comparison.jsx` — renders the matrix into a responsive table. One responsibility: presentation. Imports the data.
- **Modify** `src/components/api-pricing.jsx` — render `<PricingComparison />` after the plan cards (single integration point; both `/pricing` API tab and `/product/api` use this component).
- **Modify** `CHANGELOG.md` — note the new comparison table.

Cross-repo follow-up (csc-app, separate commit/PR): add the missing `isoLookup` row + timezone handling to `web/src/pages/pricing.tsx` so the dashboard table matches. Covered as Task 5.

---

## Tier data reference (transcribe into Task 1)

| | community | starter | supporter | professional | business |
|---|---|---|---|---|---|
| Price | Free | $5/mo | $9/mo | $29/mo | $79/mo |
| Monthly requests | 3,000 | 9,000 | 30,000 | 100,000 | 750,000 |
| Daily requests | 100 | 300 | 1,000 | 3,300 | 25,000 |
| Origin whitelisting | false | false | Up to 3 | Up to 10 | Up to 25 |
| Data access level | basic | basic | coordinates | full | full |
| restApi | ✓ | ✓ | ✓ | ✓ | ✓ |
| bulkCountries (All Countries) | ✓ | ✓ | ✓ | ✓ | ✓ |
| statesByCountry | ✓ | ✓ | ✓ | ✓ | ✓ |
| bulkStates (All States Global) | ✗ | ✗ | ✓ | ✓ | ✓ |
| citiesByState | ✓ | ✓ | ✓ | ✓ | ✓ |
| citiesByCountry | ✗ | ✗ | ✓ | ✓ | ✓ |
| searchEndpoint (Inline Search) | ✗ | ✗ | ✓ | ✓ | ✓ |
| regionsApi | ✗ | ✗ | ✓ | ✓ | ✓ |
| phoneDialCode | ✗ | ✗ | ✓ | ✓ | ✓ |
| currencyApi | ✗ | ✗ | ✓ | ✓ | ✓ |
| isoLookup | ✗ | ✓ | ✓ | ✓ | ✓ |
| timezone (always key-only) | ✓ | ✓ | ✓ | ✓ | ✓ |
| fieldsFiltering | ✗ | ✗ | ✓ | ✓ | ✓ |
| sortParameter | ✗ | ✗ | ✓ | ✓ | ✓ |
| graphql | ✗ | ✗ | ✗ | coming_soon | coming_soon |
| nearbySearch | ✗ | ✗ | ✗ | coming_soon | coming_soon |
| Support | Community & Docs | Community & Docs | Founder-led email (2-3 business days) | Priority (~1 business day) | Priority (~1 business day) |

Data field rows (driven by data-access level):
- Country/State/City **core fields** → ✓ for all tiers.
- Country/State/City **extended fields** → ✓ when level is `coordinates` or `full` (supporter, professional, business).
- Country/State/City **translations & wiki** → ✓ when level is `full` (professional, business).

---

## Task 1: Create the structured tier data

**Files:**
- Create: `src/data/pricing-tiers.js`

- [ ] **Step 1: Write the data module**

```javascript
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
```

- [ ] **Step 2: Verify the module parses**

Run: `node --input-type=module -e "import('./src/data/pricing-tiers.js').then(m => console.log(m.TIERS.length, m.COMPARISON_SECTIONS.length))"`
Expected: `5 6`

- [ ] **Step 3: Commit**

```bash
git add src/data/pricing-tiers.js
git commit -m "feat(pricing): add structured tier x feature comparison data"
```

---

## Task 2: Create the comparison component

**Files:**
- Create: `src/components/pricing-comparison.jsx`

- [ ] **Step 1: Write the component**

```jsx
// src/components/pricing-comparison.jsx
import { Check, Minus } from "lucide-react";
import { TIERS, COMPARISON_SECTIONS } from "@/data/pricing-tiers";

function Cell({ value }) {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-green" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="mx-auto h-4 w-4 text-darkgray/40" aria-label="Not included" />;
  }
  if (value === "coming_soon") {
    return (
      <span className="inline-block rounded-full bg-orange/10 px-2 py-0.5 text-[11px] font-semibold text-orange">
        Coming soon
      </span>
    );
  }
  return <span className="text-sm text-dark">{value}</span>;
}

export default function PricingComparison() {
  return (
    <section className="container mx-auto px-4 py-10 lg:py-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-dark">Compare all features</h2>
        <p className="mt-3 text-lg text-darkgray">
          Every tier, side by side. Pick the plan that matches the data and endpoints you need.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-light/60 bg-white/80 shadow-sm">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-light/60">
              <th className="sticky left-0 z-10 bg-white/90 px-4 py-4 text-sm font-semibold text-dark">
                Feature
              </th>
              {TIERS.map((tier) => (
                <th
                  key={tier.key}
                  className={`px-4 py-4 text-center text-sm font-bold ${
                    tier.highlighted ? "text-blue" : "text-dark"
                  }`}
                >
                  {tier.name}
                  {tier.highlighted && (
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-orange">
                      Most Popular
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_SECTIONS.map((section) => (
              <FragmentSection key={section.section} section={section} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FragmentSection({ section }) {
  return (
    <>
      <tr className="bg-light/30">
        <td
          colSpan={TIERS.length + 1}
          className="sticky left-0 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-darkgray"
        >
          {section.section}
        </td>
      </tr>
      {section.rows.map((row) => (
        <tr key={row.label} className="border-b border-light/40 last:border-0">
          <td className="sticky left-0 z-10 bg-white/90 px-4 py-3 text-sm text-darkgray">
            {row.label}
          </td>
          {TIERS.map((tier) => (
            <td key={tier.key} className="px-4 py-3 text-center align-middle">
              <Cell value={row.values[tier.key]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Confirm color tokens exist**

Run: `grep -E "\\b(green|orange|blue|dark|darkgray|light)\\b" src/components/product/api/why-choose-our-api.jsx | head`
Expected: matches (these Tailwind color tokens — `text-green`, `from-orange`, `text-dark`, `text-darkgray`, `border-light` — are already used in the site, confirming the custom palette is configured). If a token is missing, fall back to a standard Tailwind equivalent (e.g. `text-emerald-600`).

- [ ] **Step 3: Commit**

```bash
git add src/components/pricing-comparison.jsx
git commit -m "feat(pricing): add PricingComparison table component"
```

---

## Task 3: Integrate into the shared ApiPricing component

**Files:**
- Modify: `src/components/api-pricing.jsx`

`<ApiPricing>` is rendered by both `/pricing` (the API tab, via `PricingTabs`) and `/product/api` (via `ApiPricingSection`). Adding the comparison once here covers both pages.

- [ ] **Step 1: Add the import**

At the top of `src/components/api-pricing.jsx`, alongside the existing imports (`import PricingCard from "./pricing-card";` etc.), add:

```jsx
import PricingComparison from "./pricing-comparison";
```

- [ ] **Step 2: Render it after the cards**

The component returns a `<div className="space-y-8">` containing the cards grid and the Custom Plan CTA. Locate the closing `</div>` of that top-level wrapper (the final return). Wrap the existing content and the comparison in a fragment so both render:

Find the start of the return:
```jsx
  return (
    <div className="space-y-8">
```
Change it to:
```jsx
  return (
    <>
    <div className="space-y-8">
```
Then find the matching closing `</div>` at the very end of the component's return (the last line before the closing `);`) and change it to:
```jsx
    </div>
    <PricingComparison />
    </>
  );
```

- [ ] **Step 3: Build to verify it compiles**

Run: `npx next build`
Expected: build completes with exit code 0, no JSX/import errors. (`next build` is the verification gate — this repo has no unit-test framework.)

- [ ] **Step 4: Visual check**

Run: `npm run dev` then open `http://localhost:3000/pricing` (API tab) and `http://localhost:3000/product/api`. Confirm the comparison table renders below the plan cards on both, scrolls horizontally on a narrow window, and the Supporter column shows the "Most Popular" tag.

- [ ] **Step 5: Commit**

```bash
git add src/components/api-pricing.jsx
git commit -m "feat(pricing): render comparison table on pricing + API pages"
```

---

## Task 4: Changelog + push + PR

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add a changelog entry**

Add under the top of `CHANGELOG.md`, after the format/SemVer preamble lines and before the most recent existing version heading:

```markdown
## [1.2.0] - 2026-05-24

### Added

- **Full tier × feature comparison table** on the `/pricing` (API tab) and `/product/api` pages. Driven by a new structured `src/data/pricing-tiers.js` that mirrors the csc-app dashboard comparison. Includes ISO lookup and timezone rows that were previously absent from the dashboard table.
```

- [ ] **Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs(changelog): note pricing comparison table"
```

- [ ] **Step 3: Push branch and open PR**

```bash
git push -u origin <branch>
gh pr create --title "feat(pricing): full tier x feature comparison table" --body "Adds a shared <PricingComparison/> table on /pricing and /product/api, driven by a structured src/data/pricing-tiers.js mirroring the csc-app dashboard comparison. Includes ISO lookup + timezone rows. next build clean; visually verified both pages."
```

---

## Task 5: Reconcile csc-app dashboard drift (separate repo)

The spec review found csc-app's `web/src/pages/pricing.tsx` `FEATURE_FLAG_LABELS` is missing `isoLookup` and has no timezone row. Bring it in line with the now-canonical marketing comparison.

**Files:**
- Modify (in **csc-app** repo): `web/src/pages/pricing.tsx`

- [ ] **Step 1: Add the isoLookup label**

In `FEATURE_FLAG_LABELS`, after the `currencyApi` entry, add:

```typescript
  isoLookup: 'ISO Code Lookup',
```

(Placement: between `currencyApi: 'Currency Lookup by Country',` and `fieldsFiltering: 'Fields Filtering',` so it groups with the other lookup features.)

- [ ] **Step 2: Verify the row renders for the right tiers**

`featureFlagValue` already reads `plan.featureFlags?.['isoLookup']` from the `/plans` API, which reflects `pricingTiers.ts` (isoLookup true for starter+). No further code needed — adding the label is sufficient to surface the row.

- [ ] **Step 3: Decide timezone representation**

Timezone has no feature flag (key-only, all tiers). It does not belong in the flag-driven `FEATURE_FLAG_LABELS` loop. Add it instead as an explicit row in `buildComparisonRows()` under the "Endpoints & Features" section:

```typescript
    {
      label: 'Timezone Lookup (country/state/city)',
      getValue: () => true,
    },
```

Insert immediately after the spread of `FEATURE_FLAG_LABELS` entries and before the "Support" section block.

- [ ] **Step 4: Type-check, lint, build**

```bash
cd web && npm run type-check && npm run lint
```
Expected: both clean (lint `--max-warnings 0`).

- [ ] **Step 5: Commit (csc-app, on a branch)**

```bash
git add web/src/pages/pricing.tsx
git commit -m "fix(pricing): add ISO lookup + timezone rows to comparison table"
```

---

## Self-Review notes

- **Spec coverage:** Project B data file (Task 1), component (Task 2), both-page integration (Task 3), changelog (Task 4), csc-app drift reconciliation (Task 5) — all spec items mapped.
- **No test framework:** verification is `next build` + visual, explicitly because this repo has no Jest/RTL. Not a placeholder — it's the real gate.
- **Type consistency:** `TIERS` and `COMPARISON_SECTIONS` exported in Task 1 are the exact names imported in Task 2. Cell value contract (`true|false|"coming_soon"|string`) is consistent between data and the `Cell` component.
- **Out of scope (per spec):** no live `/plans` fetch, no helper script, `api-pricing.jsx` card bullets not derived from the new data file.
