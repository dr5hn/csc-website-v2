# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Redesign the whole site to the "Stacked Atlas" direction from the CSC creative directions: light-first, Cal Sans / Geist / Geist Mono, deep-blue pill buttons, field-blue panels, lime for live signals only (see `docs/design/reject-list.md`). New header (announcement bar, Products menu, mobile sheet) and footer; all ten pages rebuilt from the design (Home, Ecosystem, API, Database, Export Tool, Update Tool, Pricing, About, FAQs, Support).
- Home hero zooms World → India → Maharashtra → Mumbai over the voxel map, with the matching API request and response; live numbers show a skeleton while loading, then `● live` or `cached`.
- Pricing: product chooser synced to the URL hash (`/pricing/#export`), billing toggle remembered in `localStorage`, live plan and credit prices kept, with a collapsible feature comparison.
- Export Tool: interactive credit calculator with a live format preview and persona presets; credit packs read live prices.
- Canonical stats are now 5,300+ states and 153,800+ cities everywhere; the Support page shows `support@countrystatecity.in` instead of a personal address.
- New favicon set, web manifest icons and per-page 1200 × 630 share images (`public/og/`); the docs assistant accent follows the deep blue.
- FAQ answers live in `src/data/faqs.js` and the FAQPage JSON-LD is generated from the same list, so structured data matches the visible text.

### Removed

- The previous page sections, the `cobe` globe, particle star button, testimonial marquee, orange accents, dark CTA banners and the contributor-count GitHub hook; the GitHub star count now comes from one lightweight request (`src/hooks/use-repo-stars.js`).

### Added

- Add a "Postcode Listing & Search" row to the pricing comparison table (Starter and above) — the only gap left after #13's feature-tier realignment; the plan cards already mentioned postcode listing, but the comparison table had no dedicated row for it.

### Changed

- Update API pricing cards, comparison table, and FAQ text/schema: Professional $19/month ($190/year), 2,100/day and 63,000/month; Business $29/month ($290/year), 3,300/day and 100,000/month.
- Move the "Best Value" badge from the Professional card to the Business card, and revise the Business plan description to reflect its reduced request volume, in both the fallback data and the live `GET /plans` mapping.

### Fixed

- Correct FAQ and pricing-page copy (visible text and FAQ schema) to match the API: per-tier feature boundaries, per-plan support channels and business-day targets, daily/monthly limits enforced on free and paid plans (no request top-ups), downgrades scheduled for the next billing date, and JSON-only API responses (CSV via the Export Tool or database downloads).
- The `/product/api` "Copy" button now copies the full displayed JavaScript, Python, or PHP example instead of a filtered fragment.

## [1.3.0] - 2026-05-28

### Added

- **Fuzzy / typo-tolerant search** surfaced across the marketing site:
  - `src/data/pricing-tiers.js` — new "Fuzzy / Typo-Tolerant Search" row in the Endpoints & Features comparison (Professional+)
  - `src/components/api-pricing.jsx` — added the capability as a Professional plan card bullet
  - `src/components/product/api/why-choose-our-api.jsx` — new "Typo-Tolerant Search" feature card

## [1.2.0] - 2026-05-25

### Added

- **Full tier × feature comparison table** on the `/pricing` (API tab) and `/product/api` pages. Driven by a new structured `src/data/pricing-tiers.js` that mirrors the csc-app dashboard comparison. Includes ISO lookup and timezone rows. Renders via a shared `<PricingComparison />` embedded in the `ApiPricing` component, so both pages stay in sync from one source.

## [1.1.0] - 2026-05-20

### Added

- **API pricing bullets** updated to surface four newly shipped features:
  - All plans: Timezone lookup endpoints (country, state, city) with DST awareness
  - Starter+: ISO 3166 lookup endpoints (alpha-2, alpha-3, numeric, subdivision conversion)
  - Supporter+: Phone dial code endpoints (lookup, reverse lookup, E.164 parser)
  - Supporter+: Field filtering (`?fields=`) and custom sort (`?sort=`) on every geographic endpoint
- **Why Choose Our API** feature grid expanded with three new cards: "Shape Your Response" (fields/sort), "DST-Aware Timezones", and "Phone & ISO Helpers"

## [1.0.0] - 2026-03-28

### Added

- Full website rebuild on Next.js with Turbopack dev server
- Homepage with hero section, animated globe, product cards, social proof, testimonials, and innovation component
- About page with mission/vision, stats, timeline, and team information
- Database product page with setup tabs, CLI callout banner, CTA sections, and ODbL licensing metadata
- API integration page with hero and documentation links
- Update tool and export tool product pages
- Pricing page with Starter, Pro, and Enterprise tiers, FAQ, and CTA
- Contact page with redesigned hero and form
- FAQ page with detailed pricing and API rate limit information
- CLI product card on homepage with NPM/PyPI/CLI availability
- Official ecosystem packages (NPM and PyPI) replacing community NPM package in database setup tabs
- Google Analytics integration
- Client-side GitHub stars counter
- Accessibility improvements across the site
- Favicons and metadata updates
- Deployment configuration with nginx and GitHub Actions workflow
- Environment variable example file (.env.example)
- Container component for consistent page layouts
- Footer with package-lock reference

### Changed

- Migrated from Docusaurus documentation site to a full Next.js marketing and product website
- Updated pricing tiers with revised limits, features, and descriptions
- Updated API links to new destinations with tracking parameters
- Replaced yarn with npm in deployment workflow
- Refactored code structure for improved readability and maintainability
- Streamlined stats display across pages
- Updated logo assets

### Fixed

- API free request limit in pricing CTA
- Pricing description clarity and consistency
- FAQ pricing details and API rate limits accuracy
- Nginx configuration issues
- Build errors in deployment pipeline

[1.0.0]: https://github.com/dr5hn/csc-website-v2/releases/tag/v1.0.0
