# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
