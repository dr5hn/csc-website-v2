# CountryStateCity Portal Redesign: Design Brief

| | |
|---|---|
| **Project** | Redesign of the CountryStateCity (CSC) marketing portal, countrystatecity.in |
| **Prepared for** | Claude Design |
| **Owner** | Darshan Gada (@dr5hn) |
| **Repository** | https://github.com/dr5hn/csc-website-v2 (branch `main`) |
| **Live site** | https://countrystatecity.in |
| **Brief version** | v1 draft, 27 September 2026 |
| **Status** | Awaiting answers to [Open questions](#13-open-questions-for-darshan) before design starts |

> **How to read this brief.** Sections 1 to 5 set the context and creative direction. Section 6 is the full page-by-page inventory, taken from the codebase, with the current content for every section. Sections 7 to 12 cover components, live data, content fixes, technical constraints and deliverables. Copy in quotes is taken from the codebase; long dashes in the source copy have been replaced with a spaced hyphen.

---

## Contents

1. [Project overview](#1-project-overview)
2. [Repository reference](#2-repository-reference)
3. [Current design snapshot](#3-current-design-snapshot)
4. [Creative direction and Awwwards inspiration](#4-creative-direction-and-awwwards-inspiration)
5. [Sitemap and global elements](#5-sitemap-and-global-elements)
6. [Page-by-page brief](#6-page-by-page-brief)
7. [Component inventory to design](#7-component-inventory-to-design)
8. [Live data and dynamic states](#8-live-data-and-dynamic-states)
9. [Content decisions and known issues](#9-content-decisions-and-known-issues)
10. [Technical and quality requirements](#10-technical-and-quality-requirements)
11. [Deliverables and priorities](#11-deliverables-and-priorities)
12. [Kick-off prompt for Claude Design](#12-kick-off-prompt-for-claude-design)
13. [Open questions for Darshan](#13-open-questions-for-darshan)
14. [Appendix: external destinations](#14-appendix-external-destinations)

---

## 1. Project overview

### 1.1 What CSC is

CountryStateCity is an open-source geographical database of countries, states and cities. Darshan Gada started it in 2018, and it has grown into a nine-channel developer platform:

- The open-source GitHub database, ODbL-1.0 licensed and available in 12+ formats
- A paid REST API with tiered plans. GraphQL is available on Professional and above.
- The Export Tool, which sells credit-based custom downloads
- NPM and PyPI packages and a CLI, all MIT licensed
- An interactive API playground, a live data demo and a community Update Tool (the "manager")

Headline figures used on the site today (see [section 9](#9-content-decisions-and-known-issues), as several conflict):

- 250+ countries, about 5,300 states and about 153,800 cities
- 50,000+ developers
- 5.1B+ total API requests (live)
- 99.9% uptime
- Sub-200ms response times
- About 9K GitHub stars

### 1.2 Audience

| Segment | What they need from the portal |
|---|---|
| Frontend and full-stack developers | A country/state/city dropdown or lookup quickly. Code samples, a free tier and clear docs. |
| Mobile developers | Lightweight data, fast API, offline-friendly exports |
| Data analysts and scientists | Bulk data in CSV, Parquet or SQL. Field selection. |
| DBAs and backend teams | Ready-to-import SQL dumps and a data change feed |
| Businesses and founders | Reliability, licensing clarity, support levels, pricing |
| Open-source contributors | How to report or fix data, recognition |

### 1.3 Business goals for the redesign

1. **Increase API sign-ups and paid conversions.** The primary conversion is "Get free API key" at `app.countrystatecity.in`.
2. **Grow Export Tool credit purchases** at `export.countrystatecity.in`.
3. **Explain the ecosystem clearly.** Nine channels should read as one coherent platform, not nine products.
4. **Build trust.** Open-source credibility, live proof (stats, uptime, stars) and real testimonials.
5. **Raise the brand to an award-worthy standard** (Awwwards-level craft) without hurting developer usability, SEO or performance.

### 1.4 Primary conversion paths

| Intent | Primary CTA | Destination |
|---|---|---|
| Use the API | Get free API key | `https://app.countrystatecity.in` (UTM and attribution parameters are appended) |
| Buy a dataset | Start exporting (5 free credits) | `https://export.countrystatecity.in` |
| Use the free data | Download / Star on GitHub | `https://github.com/dr5hn/countries-states-cities-database` |
| Contribute | Submit a change | `https://manager.countrystatecity.in` |
| Learn | Read the docs / Ask the docs assistant | `https://docs.countrystatecity.in` |

---

## 2. Repository reference

**Repo:** https://github.com/dr5hn/csc-website-v2

### 2.1 Stack (the design must be buildable with this)

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19. **Static export** (`output: 'export'`, `trailingSlash: true`, unoptimised images), served by nginx. |
| Styling | Tailwind CSS 4. Tokens live in `@theme` in `src/app/globals.css`. |
| UI primitives | shadcn/ui (new-york style) and Radix. The `@animate-ui` registry is configured. |
| Icons | `lucide-react`, `simple-icons` and custom brand SVGs in `src/icons/` |
| Motion | `motion` (Framer Motion), `@react-spring/web` (counters) and `tw-animate-css` |
| 3D | `cobe` (the WebGL globe in the home hero) |
| Font | Cal Sans (Google Fonts, weight 400) site-wide. Code uses the system monospace stack. |
| Analytics | GA4 (`G-XPF0QLDXVS`), scroll-depth tracking and CTA click events (`src/lib/analytics.js`). Inbound attribution is carried to app links (`src/lib/attribution.js`). |
| Chat widget | Mintlify "Ask the docs" assistant (`src/components/docs-assistant.jsx`) |

### 2.2 Where things live

| What | Path |
|---|---|
| Routes (one folder per page) | `src/app/**/page.jsx` |
| Root layout (header, footer, docs widget, metadata, JSON-LD) | `src/app/layout.js` |
| Design tokens and global CSS | `src/app/globals.css`, `src/app/animation.css` |
| Header / footer / logo | `src/components/header.jsx`, `footer.jsx`, `logo.jsx`, `src/icons/World.jsx` |
| Page sections | `src/components/*.jsx` and `src/components/product/{api,database,export-tool,update-tool}/*.jsx` |
| UI primitives | `src/components/ui/*` |
| Static stats (single source of truth for fixed claims) | `src/lib/stats.js` |
| Pricing fallbacks | `src/data/pricing-tiers.js` (API) and `src/data/export-pricing.js` (Export) |
| Testimonials (75 entries) | `src/data/testimonials.json` |
| Live-data hooks | `src/hooks/use-platform-stats.js`, `use-api-pricing.js`, `use-export-pricing.js`, `use-github-stars.js`, `use-github-stats.js` |
| Sitemap | `src/app/sitemap.js` |

---

## 3. Current design snapshot

This is what exists today. The redesign may evolve it or replace it; see [open questions](#13-open-questions-for-darshan) 2 and 3.

### 3.1 Brand tokens (`src/app/globals.css`)

| Token | Value | Current use |
|---|---|---|
| `blue` | `#2296f3` | Primary brand, links, primary buttons, docs widget accent |
| `green` | `#10b981` | Success, secondary accent, gradient partner to blue |
| `orange` | `#f97316` | Conversion buttons on dark banners, Export and Update Tool accents |
| `dark` | `#0f172a` | Body text, dark CTA panels, code blocks |
| `darkgray` / `lightgray` | `#475569` / `#94a3b8` | Secondary and tertiary text |
| `light` / `white` | `#e2e8f0` / `#f8fafc` | Borders, surfaces |
| `danger` / `warning` | `#ef4444` / `#facc15` | States |
| Radius | `0.625rem` base | Cards mostly use `rounded-2xl` / `rounded-3xl` |

- **Logo:** a globe icon (blues `#1566C0` / `#2296F3` with lime `#CDDC39` land) plus the wordmark "CountryStateCity" in bold.
- **Theme:** shadcn default `.dark` tokens exist but are not used. The site is light-only.

### 3.2 Recurring visual patterns

- An eyebrow pill with a pulsing dot above every H2
- A blue-to-green gradient on key words in headings
- Blurred blue and green colour blobs behind heroes
- Glassmorphism cards with gradient borders and icon tiles
- Dark code blocks with pill tabs and a Copy button
- A dark rounded CTA banner with an orange button at the bottom of pages
- A 3D `cobe` globe with 15 city markers, animated number counters, a two-row testimonial marquee and a particle burst on the GitHub stars button

### 3.3 Honest critique (why redesign)

- **Template feel.** Almost every section uses the same recipe: pill, H2, subheading, then a grid of icon cards. Pages feel long and repetitive, and there is no narrative arc.
- **Gradient and glass overuse** dilutes emphasis. Colour coding is inconsistent: Export and Update use orange-to-yellow heroes, Database uses blue-to-green, and API is mixed.
- **The data is not the hero.** The product is a beautifully structured world dataset, but the site shows it mostly as icon cards and numbers.
- **The home H1 is keyword-stuffed** ("Country State City API - The World's Most Comprehensive Geographic Database for Developers").
- **Proof is inconsistent.** Hard-coded and conflicting numbers, unsourced ratings, and some dead or wrong links (see [section 9](#9-content-decisions-and-known-issues)).

---

## 4. Creative direction and Awwwards inspiration

### 4.1 Design principles (proposed, please confirm)

1. **The data is the hero.** Make the dataset tangible: the world, then a country, then a state, then a city. Use real API responses, real hierarchy and real coordinates, not decorative icons.
2. **Developer-first clarity.** Code is a first-class visual. Every snippet must be accurate, copyable and readable.
3. **One source of truth, many channels.** A single visual system connects the database, API, packages, CLI, export and community tools.
4. **Open-source credibility.** Surface GitHub stars, contributors, releases and the community as proof, not decoration.
5. **Signature moments, calm elsewhere.** Aim for one or two Awwwards-grade moments per page (hero, key transitions) and keep the rest restrained, fast and scannable.
6. **Performance is part of the brand.** It is a fast API, so the site must feel fast too. Respect reduced motion, and give every 3D moment a static fallback.

### 4.2 Signature idea to explore (optional)

**"Zoom from world to city."** A scroll-driven hero or story section that moves from the globe to a country, then its states, then a city. The matching API request and response update alongside at each level (`/v1/countries`, then `/v1/countries/IN/states`, then `.../cities`). This mirrors the product's data model and could be the site's signature interaction.

### 4.3 Awwwards references

These recognitions were confirmed from Awwwards listings on 27 September 2026. Use them for **craft, pacing and interaction quality**, not as templates to copy.

| # | Reference | Recognition | What to borrow | Apply to |
|---|---|---|---|---|
| 1 | [Shopify Live Globe 2025](https://www.awwwards.com/sites/shopify-live-globe-2025) | Site of the Day (Jan 2026) and Developer Award | Live data on a 3D globe, dot-matrix shader aesthetic, live infrastructure stats panel | Home hero globe with live request count, stats band |
| 2 | [Cerebrium](https://www.awwwards.com/sites/cerebrium) | Site of the Day (Sep 2026) and Developer Award | A developer infrastructure product told with technical precision and polish | Product pages, especially API |
| 3 | [Sui](https://www.awwwards.com/sites/sui) | Site of the Day and Developer Award | A developer-platform brand system, confident type and ecosystem storytelling | Ecosystem page, overall brand system |
| 4 | [Vercel Ship 2025](https://www.awwwards.com/sites/vercel-ship-2025) | Honourable Mention | Restrained developer-audience typography, grid discipline and monochrome with accent colour | Type scale, section headers, layout grid |
| 5 | [Stripe Sessions 2024](https://www.awwwards.com/sites/stripe-sessions-2024) | Honourable Mention | Card gallery and highlight patterns, a rich footer | Products grid, feature highlights, footer |
| 6 | [Resend Launch Week VI](https://www.awwwards.com/sites/resend-launch-week-vi) | Nominee | Feature-announcement storytelling for a developer tool | Timeline, "What's new" / changelog moments |
| 7 | [Igloo Inc](https://www.awwwards.com/sites/igloo-inc) | Site of the Year 2024 and Developer Award | The ceiling for immersive 3D and scroll craft. Use for mood only. | One hero moment at most |

**Awwwards collections to browse:**

- [Maps, Geolocation, StreetView collection](https://www.awwwards.com/awwwards/collections/maps-geolocation-streetview/)
- [Data Visualisation websites](https://www.awwwards.com/websites/data-visualization/)
- [Developer Award winners](https://www.awwwards.com/websites/developer/)
- Elements: [WebGL globe (Discovery Builders)](https://www.awwwards.com/inspiration/webgl-globe-discovery-builders) and [Interactive globe map (Child Marriage Data Portal)](https://www.awwwards.com/inspiration/interactive-globe-map-the-child-marriage-data-portal)

### 4.4 What to avoid

- Scroll-jacking that blocks reading docs-style content, pricing or code
- Motion that cannot be turned off (`prefers-reduced-motion` must give a calm, complete experience)
- Heavy WebGL on every page. Keep 3D to the home hero and possibly the Ecosystem page.
- Gradient text for body copy or anything that must pass contrast checks
- Hiding information behind hover. This matters most on touch devices.

---

## 5. Sitemap and global elements

### 5.1 Sitemap (`src/app/sitemap.js`)

| URL | Page | In main nav | Sitemap priority |
|---|---|---|---|
| `/` | Home | Logo | 1.0 |
| `/ecosystem/` | Ecosystem | Yes | 0.9 |
| `/product/api/` | API Service | Products menu | 0.9 |
| `/product/export-tool/` | Export Tool | Products menu | 0.9 |
| `/product/database/` | Database | Products menu | 0.8 |
| `/product/update-tool/` | Update Tool | Products menu | 0.7 |
| `/pricing/` | Pricing | Yes | 0.9 |
| `/about/` | About | Yes | 0.7 |
| `/contact/` | Support (Contact) | Yes, labelled "Support" | 0.5 |
| `/faqs/` | FAQs | **Hidden** ("will launch later") | 0.6 |

### 5.2 Announcement bar (`header.jsx`)

- A fixed white bar, 48px high, above the header
- Content: MakeMySiteLive icon, "MakeMySiteLive - Publish your website in under 2 minutes", linking to `https://makemysitelive.com/`
- Decision needed: keep, restyle or remove? See [question 5](#13-open-questions-for-darshan).

### 5.3 Header (`src/components/header.jsx`)

- Fixed, with a translucent blur. It gains a shadow on scroll.
- **Desktop nav:** About · Ecosystem · Products (dropdown) · Pricing · Support
- **Products dropdown:**

  | Item | Tagline |
  |---|---|
  | API Service | "Enterprise-grade API" |
  | Export Tool | "Custom data exports" |
  | Database | "Complete open-source data" |
  | Update Tool | "Community contributions" |
  | MakeMySiteLive.com | "New" badge, external link |

- **Right side:**
  - A "Login" dropdown with three links:
    - Get API Key: app.countrystatecity.in
    - Export Tool: export.countrystatecity.in
    - Update Tool: manager.countrystatecity.in
  - A primary "Docs" button linking to docs.countrystatecity.in
- **Mobile:** a full-height sheet with:
  - Products list
  - Ecosystem, Pricing, Documentation, Contact
  - "Dashboard" (ghost button) and "Get Started" (primary button), both linking to app.countrystatecity.in
- **Accessibility already in place:** skip link, focus management, Escape to close, scroll lock
- **Design opportunity:** a richer mega-menu that shows the nine channels, grouped into Build (API, packages, CLI), Data (database, export) and Community (update tool, GitHub).

### 5.4 Footer (`src/components/footer.jsx`)

- **Brand column:**
  - Logo
  - "The world's most comprehensive geographical database, trusted by developers worldwide for accurate location data. Built and maintained by Darshan Gada, powered by community data contributions."
  - "Follow Us": LinkedIn, GitHub, X, Kaggle, Data.World
- **Products:** API Service, Export Tool, Database, Update Tool
- **Resources** (all external):
  - Documentation
  - Status (status.countrystatecity.in)
  - Playground
  - Database Demo
  - Geographic Encyclopedia (countrystatecity.org)
- **Company:** About Us, Pricing, Contact. FAQs is hidden.
- **Bottom bar:** "© {year} Country State City. All rights reserved." and "Made with 💚 in India 🇮🇳"
- **Back-to-top** button

### 5.5 Docs assistant widget (site-wide)

- A Mintlify widget in the bottom-right corner:
  - Title "CSC Docs Assistant"
  - Launcher "Ask the docs"
  - Accent `#2296f3`
- Starter questions:
  - "How do I get an API key and make my first request?"
  - "How do I build a country, state and city dropdown?"
  - "Which fields are available on my plan?"
- It is third-party UI, so the design only controls the accent, radius and logo. Leave space for the launcher in the bottom-right corner on every page.

---

## 6. Page-by-page brief

For each page: its goal, the current section order with key copy, live data, and redesign notes. Paths are relative to the repo root.

### 6.1 Home `/`

- **Source:** `src/app/page.jsx`
- **Goal:** Explain CSC in five seconds and drive API sign-ups. Secondary goals are docs and GitHub.
- **Primary CTA:** Get Started for Free, which goes to app.countrystatecity.in

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `hero.jsx`, `globe.jsx` | See the hero details below this table. |
| 2 | API showcase | `api-showcase.jsx` | See the API showcase details below this table. |
| 3 | Stats band | `stats.jsx` | H2 "Powering Applications Worldwide". Sub: "Up-to-date statistics from our global platform serving developers and businesses". Seven animated tiles, listed below this table. |
| 4 | Why choose us | `why-choose-us.jsx` | Five cards, listed below this table. |
| 5 | Products | `products.jsx` | Five product cards, listed below this table. |
| 6 | Skip the hassle | `skip-the-hassle.jsx` | Badge "Reliability". H2 "Skip the hassle". Body about stopping the time wasted wrangling location data. Five struck-through pain points, listed below this table. |
| 7 | Testimonials | `ui/animated-testimonials.jsx`, `data/testimonials.json` | H2 "Loved by developers worldwide". Sub: "See what developers are saying about the CountryStateCity API and tools". Two infinite marquee rows, 75 quotes. |
| 8 | CTA banner | `cta.jsx` | Dark panel. Badge "Free to start". H2 "Ready to Build Something Amazing?". Pills: "Instant API access" / "No credit card" / "5-minute setup". Button "Start Building Free", linking to `/product/api`. |
| 9 | Community | `community.jsx` | H2 "Community & Support". Two cards: "Open Source" (links to GitHub) and "Support Docs". Stats: total API requests (live), contributors (live) and "99% Developer satisfaction" (unsourced). |

**Hero (1)**
- Badge: "Trusted by 50,000+ developers worldwide"
- H1: "Country State City API - The World's Most Comprehensive Geographic Database for Developers"
- Sub: "Build location-aware applications with accurate data from {250+ countries, 5.3K+ states and 153.8K+ cities}. Trusted by 50,000+ developers worldwide with {5.1B+} total API requests and 99.9% uptime guarantee."
- CTAs: "Get Started for Free", "Read the Docs", and a GitHub stars button
- Trust row: "99.9% Uptime SLA" · "4.9/5 Developer Rating" · "Sub-200ms Response"
- Right side: a draggable 3D globe with 15 city markers

**API showcase (2)**
- Eyebrow: "Quick start". H2: "See the API in action"
- Sub: "One authenticated request returns clean, structured JSON - countries, states, and cities, ready for your app."
- Request panel with tabs cURL / JavaScript / Python for `GET /v1/countries/IN/states`, sent with the `X-CSCAPI-KEY` header
- Response panel: a JSON list of five Indian states with a `200 OK` pill
- Link: "Read the full docs"

**Stats band tiles (3)**

| Tile | Value | Source |
|---|---|---|
| Total API Requests | 5.1B+ | Live |
| Developers Worldwide | 50K+ | Hard-coded |
| Cities | 153.8K+ | Live |
| States & Regions | 5.3K+ | Live |
| Countries | 250 | Live |
| API Uptime | 99.9% | Hard-coded |
| Open Source Stars | Stars count | Live, from GitHub |

**Why choose us (4)**
- Eyebrow: "Why Choose Us". H2: "Why Developers Choose Our Geographic API"
- Five cards, each with a checklist:
  - Complete Global Coverage
  - Lightning-Fast Geographic API (<200ms, 99.9%, Global CDN, Auto-scaling)
  - Developer-First Design
  - Always Updated
  - Open Source (ODbL-1.0)

**Products (5)**
- Eyebrow: "Products". H2: "Build with the tools you need"
- Sub: "A focused suite for location data: integrate, manage, and export."

| Card | Description | Links to |
|---|---|---|
| API Access | "Query countries, states, and cities via fast REST and GraphQL endpoints." | `/product/api` |
| Export Tool | "Download curated datasets in CSV, JSON, or SQL…" | `/product/export-tool` |
| CLI Tool | "Search, explore, and generate code…" | cli.countrystatecity.in |
| Database Repository | "…NPM, PyPI, and CLI with 12 export formats…" | `/product/database` |
| Update Tool | "Submit feedback, report issues, or suggest new data." | `/product/update-tool` |

**Skip the hassle pain points (6)**
- "Manually collecting country, state, and city data"
- "Constantly fixing outdated location info"
- "Dealing with inconsistent formats (CSV, JSON, SQL)"
- "Writing your own location lookup logic"
- "Hunting for API endpoints from unreliable sources"

**Live data:**
- Platform stats (`/stats`) feed the hero copy, the stats band, the Why Choose Us numbers and the Community stats.
- GitHub stars feed the hero button and the stats band.
- The GitHub contributor count feeds the Community section.

**Redesign notes:**
- Rewrite the H1 into a short, memorable line and keep the SEO phrase in the subheading or metadata.
- Merge Stats, Why Choose Us and Skip the Hassle into one tighter story: problem, then proof. There is currently a lot of repetition.
- Make the globe and the API showcase a single connected moment (see [section 4.2](#42-signature-idea-to-explore-optional)).
- Curate testimonials down to about 12 strong quotes with company and use case (see [section 9.3](#93-content-quality)).
- Present the products as the nine-channel ecosystem teaser linking to `/ecosystem`, rather than a five-card grid.

### 6.2 Ecosystem `/ecosystem/`

- **Source:** `src/app/ecosystem/page.jsx`
- **Goal:** Show that one dataset powers nine channels, and route each visitor to the right one.
- **Primary CTA:** Explore on GitHub / Try the API

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `ecosystem-hero.jsx` | Eyebrow "Ecosystem". H1 "One platform. / Every channel.". Body listing every channel, ending "One source of truth. Nine ways to use it." CTAs "Explore on GitHub" and "Try the API". |
| 2 | Channels | `ecosystem-channels.jsx` | Eyebrow "Channels & Tools". H2 "Nine ways to use the same data". Sub: "Every channel and tool is maintained from a single source of truth. Pick the one that fits your workflow - or combine them." Nine cards, listed below this table. |
| 3 | Stats band | `stats.jsx` (shared) | Same as Home |
| 4 | Packages | `ecosystem-packages.jsx` | Eyebrow "Packages". H2 "Install it the way you work". Sub: "Typed, versioned, and published to the registries developers already trust." Six install rows with Copy buttons, listed below this table. |
| 5 | CTA banner | `cta.jsx` (shared) | Links to `/product/api` |

**Channel cards (2)**

Each card has a tagline, a description, a monospace tag and "Learn more".

| Channel | Tagline | Tag |
|---|---|---|
| Open-Source Database | "The canonical source" | GitHub stars/forks, live |
| REST API | "Tiered, high-availability" | |
| Export Tool | "Bulk data on demand" | "9+ formats" |
| NPM Packages | "JavaScript and TypeScript" | |
| PyPI Package | "Python-first ergonomics" | |
| CLI Tool | "Search, export, scaffold" | |
| API Playground | "Interactive Swagger UI" | |
| Live Demo | "Browse the dataset" | |
| Community Manager | "Submit & track corrections" | |

**Install rows (4)**

| Package | Registry | Command |
|---|---|---|
| `@countrystatecity/countries` | NPM | `npm install @countrystatecity/countries` |
| `@countrystatecity/countries-browser` | NPM | `npm install @countrystatecity/countries-browser` |
| `@countrystatecity/timezones` | NPM | `npm install @countrystatecity/timezones` |
| `countrystatecity-countries` | PyPI | `pip install countrystatecity-countries` |
| `@countrystatecity/cli` | NPM | `npm install -g @countrystatecity/cli` |
| `@countrystatecity/sdk` | NPM | `npm install @countrystatecity/sdk` |

**Redesign notes:**
- This page is the best candidate for a signature visual: a "hub and spokes" or constellation diagram with the dataset at the centre and nine channels around it.
- Group the channels as Build / Data / Explore / Community.
- Consider making this page the target of the Products mega-menu.

### 6.3 API Service `/product/api/`

- **Source:** `src/app/product/api/page.jsx`
- **Goal:** Convert developers to a free API key, then to paid plans.
- **Primary CTA:** Get Free API Key

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `product/api/hero.jsx` | See the hero details below this table. |
| 2 | Why choose our API | `product/api/why-choose-our-api.jsx` | H2 "Why Choose Our API?". Sub: "Built for scale, designed for developers, trusted by enterprises worldwide". Seven feature cards, listed below this table. |
| 3 | Easy integration | `product/api/api-integration.jsx` | Eyebrow "Integration". H2 "Easy Integration". Sub: "Get started in minutes with our simple RESTful API." Tabs: JavaScript / Python / PHP, calling `/v1/countries` and `/v1/countries/IN/states`. |
| 4 | Pricing | `product/api/pricing.jsx`, which uses `api-pricing.jsx` | Eyebrow "Pricing". H2 "Simple, Transparent API Pricing". Same tier cards and comparison table as the Pricing page ([6.7](#67-pricing-pricing)). |
| 5 | CTA banner | `cta.jsx` | "Start Building Free", linking to app.countrystatecity.in |

**Hero (1)**
- Pill: "Production-Ready API Service". H1: "Enterprise-Grade / Geographical API"
- Body: "Power your applications with the world's most comprehensive geographical data API. Trusted by thousands of developers, handling {5.1B+} total requests with 99.9% uptime."
- A status widget, "All Systems Operational", with a hard-coded "Uptime: 99.98%", linking to the status page
- CTAs: "Get Free API Key" and "View Documentation"
- Right side: a mock "Live API Response" card showing `HTTP/1.1 200 OK`, `Response-Time: 89ms` and a JSON object for India

**Feature cards (2)**
- Lightning Fast Response
- Shape Your Response (`?fields=` / `?sort=`)
- DST-Aware Timezones
- Phone & ISO Helpers
- Typo-Tolerant Search ("'Banglore' finds Bangalore")
- Always Up-to-Date
- Developer-Friendly

**Redesign notes:**
- Show real capabilities as interactive demos: typo-tolerant search, autocomplete, nearby search, timezones, and phone/ISO helpers. These are strong differentiators that are currently buried in cards.
- Add cURL and GraphQL samples. The metadata promises GraphQL, but the page never shows it.
- Link the status widget to live data, or remove the hard-coded figure.
- Fix the copy button, which currently copies broken snippets (see [9.4](#94-bugs-and-broken-links-to-fix-in-the-build)).

### 6.4 Database `/product/database/`

- **Source:** `src/app/product/database/page.jsx`
- **Goal:** Drive downloads, stars and package installs. Upsell the live API.
- **Primary CTA:** Download Now (GitHub releases)

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `product/database/hero.jsx` | See the hero details below this table. |
| 2 | Why choose us | `product/database/why-choose-us.jsx` | Eyebrow "Why choose our database". H2 "The foundation for your product's location data". Sub: "Powers the entire CSC ecosystem - open source and free forever, with accuracy you can trust." Six cards: Completely Open Source · 12+ Ready-to-Use Formats · Complete Global Coverage · Regular Monthly Updates · Optimized File Sizes · Community Driven. |
| 3 | Choose your format | `product/database/choose-your-format.jsx` | Eyebrow "Download Formats". H2 "Choose Your Format". Twelve download cards with compressed sizes, listed below this table. Then "What's Included in Every Format": countries, states, cities, rich metadata. |
| 4 | Setup | `product/database/database-setup.jsx` | Eyebrow "Setup". H2 "Easy Installation & Setup". Tabs: Git Clone / NPM / PyPI / CLI with commands. Footnote: "All packages are MIT licensed. Database data is licensed under ODbL-1.0." Link: "See the live API". |
| 5 | CLI callout | `product/database/cli-callout.jsx` | H3 "Explore from your terminal". A mock terminal showing `csc search "tokyo"`. "Learn more" links to cli.countrystatecity.in. |
| 6 | Community | `product/database/cta.jsx` | Eyebrow "Community". H2 "Join Our Growing Community". Four action cards: Star the Repository · Report Issues · Contribute Data · Join Discussions. |

**Hero (1)**
- Badge: "Open Source • Free Forever"
- H1: "The world's most complete open-source geographical database"
- Body: "Comprehensive geographical data covering {countries} countries, {states} states, and {cities} cities. Available in 12 formats, trusted by thousands of developers worldwide."
- CTAs: "Download Now" (GitHub releases) and "Star on GitHub"
- Pills: "Community Driven" · "Monthly updates" · "ODbL-1.0 License"
- Right panel: "Formats & Stats", with 12 format pills and a stats rail (countries, states, cities, formats, GitHub stars)

**Format cards (3)**

| Format | Compressed size | Popular badge |
|---|---|---|
| JSON | 12MB | Yes |
| MySQL | 8MB | Yes |
| PostgreSQL | 8MB | |
| MongoDB | 15MB | Yes |
| SQLite | 7MB | |
| SQL Server | 7MB | |
| CSV | 6MB | Yes |
| XML | 25MB | |
| YAML | 18MB | |
| GeoJSON | 24MB | |
| TOON ("LLM-optimized, ~40% fewer tokens") | 20MB | |
| Parquet | 27MB | |

**Redesign notes:**
- Show the data itself: a mini explorer or sample records, and a schema or field visual (countries, then states, then cities, with their fields).
- Make the format list scannable, as a table or filterable list rather than twelve identical cards.
- Clarify licensing (ODbL for data, MIT for packages) in one clear, reusable component.

### 6.5 Export Tool `/product/export-tool/`

- **Source:** `src/app/product/export-tool/page.jsx`
- **Goal:** Explain credit pricing and drive first exports and credit purchases.
- **Primary CTA:** Get Started for FREE (5 free credits)

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `product/export-tool/hero.jsx` | See the hero details below this table. |
| 2 | Before/after | `product/export-tool/why-choose.jsx` | Eyebrow "The Difference". H2 "Stop Wasting Time on Data Processing". Two cards, "Before CSC Export Tool" and "With CSC Export Tool", each with seven bullets. |
| 3 | Process | `product/export-tool/how-the-process-works.jsx` | Eyebrow "The Process". H2 "How The Process Works". Three steps: Select Configuration, Review Export Details, Download Your Export. |
| 4 | Features | `product/export-tool/features.jsx` | H2 "Powerful Export Features". An auto-rotating orbit diagram with six features: Precision Data Selection · Instant Export Generation · Custom Field Selection (24+ fields) · 13 Export Formats · Fair Credit System · Always Fresh Data. |
| 5 | Format preview | `product/export-tool/export-formats.jsx` (`#export-preview`) | H2 "Preview Export Formats". Sub: "See exactly what you'll get before you spend credits." Tabs for JSON / CSV / XML / SQL only. |
| 6 | Use cases | `product/export-tool/usecases.jsx` | Dark section. H2 "Perfect For Every Developer". Four persona tabs (Frontend, Mobile, DBA, Data Scientist), each with Problem / Solution / Cost. |
| 7 | Pricing | `product/export-tool/pricing.jsx` | Eyebrow "Pricing". H2 "Fair, Credit-Based Pricing". Five credit packs plus a custom credits stepper (see [6.7](#67-pricing-pricing)). |
| 8 | CTA | `product/export-tool/cta.jsx` | H2 "Ready to Export Smart?". Pills: "5 free credits" / "Instant downloads" / "Custom selection" / "All formats". |

**Hero (1)**
- Badge: "Smart Data Export Solution". H1: "Get Exactly The Data You Need"
- Body: "Stop downloading massive 44MB+ databases and writing custom parsing scripts. Export clean, customized geographical datasets in seconds with our credit-based system."
- CTAs: "Get Started for FREE" and "Preview Export Formats"
- An interactive **Credit Calculator**:
  - Data types: Countries 1, States 3, Cities 4
  - Formats: JSON +2 … PostgreSQL +5
  - Shows the total cost

**Redesign notes:**
- The calculator is a strong interactive asset. Make it the centrepiece and show a live preview of the output format as selections change. This could merge sections 1, 4 and 5.
- The 13 export formats fall into four groups:
  - Tabular: CSV, Excel, Markdown
  - Structured: JSON, NDJSON, XML, YAML
  - Database: SQL, PostgreSQL, SQL Server, SQLite3, MongoDB
  - Geospatial: GeoJSON
- Also mention the Export Tool's extra options: 200+ translation locales, filtering by region or up to 10 countries, and bundled flag images.

### 6.6 Update Tool `/product/update-tool/`

- **Source:** `src/app/product/update-tool/page.jsx`
- **Goal:** Recruit contributors and explain the review flow.
- **Primary CTA:** Submit First Change, which goes to manager.countrystatecity.in

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `product/update-tool/hero.jsx` | See the hero details below this table. |
| 2 | Why contribute | `product/update-tool/why-contribute.jsx` | Eyebrow "Community Impact". H2 "Why Your Contributions Matter". Four cards: Global Impact ("50M+ users affected") · Developer Community ("10K+ developers helped") · Open Source Legacy · Personal Recognition. |
| 3 | How it works | `product/update-tool/how-the-process-works.jsx` (`#how-it-works`) | Eyebrow "Contribution Flow". Four auto-advancing steps: Submit Change, Community Review, Approval & Integration, Global Impact. |
| 4 | Ways to contribute | `product/update-tool/difference.jsx` | H2 "Ready to Make a Difference?". Four rows: Submit a Correction · Add Missing Data · Review Submissions (coming soon, button disabled) · Report Issues. |
| 5 | CTA | `product/update-tool/cta.jsx` | H2 "Start Contributing Today". "Join 1,200+ contributors…". Button: "Make First Contribution". |

**Hero (1)**
- Badge: "Community Contribution Platform". H1: "Help Improve Global Data For Millions"
- CTAs: "Submit First Change" and "View Process"
- Card: "Global Database Scope" with live counts for countries, states and cities

**Redesign notes:**
- Show real recent contributions or a changelog feed, if the manager exposes one.
- Present a contributor leaderboard or recognition as a future-ready slot.

### 6.7 Pricing `/pricing/`

- **Source:** `src/app/pricing/page.jsx`
- **Goal:** Help visitors pick a plan with confidence.
- **Primary CTA:** A per-tier "Get Started"

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `pricing-hero.jsx` | Badge "Simple, Transparent Pricing". H1 "Choose Your Plan / Scale as You Grow". Body: "Start free and upgrade when you need more. No hidden fees, no surprises…". Four trust chips: No Hidden Fees · Instant Access · Cancel Anytime · Global Scale. |
| 2 | Product tabs | `pricing.jsx` | A second H1, "Simple, transparent pricing". Tabs: **API** / **Export Tool** / **Database**. |
| 2a | API tab | `api-pricing.jsx`, `pricing-card.jsx`, `pricing-comparison.jsx` | Monthly/Annual toggle, five tier cards, a custom-plan banner, and a "Compare all features" table. Details below this table. |
| 2b | Export tab | `export-pricing.jsx`, `custom-credits.jsx` | Five credit packs, custom credits and "How Credits Work". Details below this table. |
| 2c | Database tab | `database-pricing.jsx` | H2 "Database Repository". "FREE FOREVER". ODbL copy, "Download Free" button, and stats (12 formats, GitHub stars, 127 contributors). |
| 3 | FAQ | `faq.jsx` | Four questions: Can I change plans anytime? · What happens if I exceed my request limit? · Do unused credits expire? · Is there a setup fee? Links to the docs assistant and `support@`. |
| 4 | Get started | `pricing-cta.jsx` | H2 "Ready to get started?". Four rows: Start Free (GitHub) · Try API ("3,000 free requests monthly") · Export Data ("5 free trial credits") · Contribute (manager). |

**API tiers (2a)**

Prices are live from `api.countrystatecity.in/plans`; these are the fallback values.

| Tier | Monthly | Annual | Requests / month (per day) | Flag |
|---|---|---|---|---|
| Community | Free | Free | 3,000 (100) | |
| Starter | $5 | $50 | 9,000 (300) | |
| Supporter | $9 | $90 | 30,000 (1,000) | Most Popular |
| Professional | $29 | $290 | 100,000 (3,300) | Best Value |
| Business | $79 | $790 | 750,000 (25,000) | |

- **Custom-plan banner:** "Need higher limits or custom features?", with a "Contact Us" button.
- **Comparison table sections:** Pricing & Limits · Country Fields · State Fields · City Fields · Endpoints & Features (19 rows, including fuzzy search, autocomplete, GraphQL, nearby search and data change feed) · Support.

**Export credit packs (2b)**

Prices are live from `eapi.countrystatecity.in/api/credits/packages`; these are the fallback values.

| Pack | Credits | Price | Per credit | Badge |
|---|---|---|---|---|
| Free Trial | 5 | $0 | Free | |
| Starter | 10 | $20 | $2.00 | |
| Basic | 20 | $30 | $1.50 | Most Popular |
| Standard | 30 | $40 | $1.33 | Save 33% |
| Premium | 40 | $50 | $1.25 | Best Value |

- **Custom credits:** $2.00 per credit, a stepper from 1 to 100, and a live total.
- **How Credits Work:** data types plus format equals total. Example: Countries + States in JSON = 6 credits.

**Redesign notes:**
- One H1 only.
- Make the tabs deep-linkable (`/pricing/#export`).
- State the annual saving ("2 months free").
- Design the table for mobile, using sticky tier headers and collapsible sections.
- Consider adding a short "Which product do I need?" chooser (API vs Export vs free Database) above the tabs.

### 6.8 About `/about/`

- **Source:** `src/app/about/page.jsx`
- **Goal:** Tell the founder-led, open-source story and build trust.

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Intro | `about-intro.jsx` | Badge "About Us". H1 "Comprehensive location data, made simple". Sub: "We built the CountryStateCity API and tools to take the pain out of working with global location data." Meta row: "Est. 2018 • 50K+ Developers". |
| 2 | Mission & Vision | `mission-values.jsx` | H2 "Our Mission & Vision". Six cards: Our Mission · Open Source & Community · Global Accessibility · Our Vision · Breaking Data Silos · Innovation Through Access. The copy is repetitive. |
| 3 | Timeline | `timeline.jsx` | Eyebrow "Our Journey". H2 "Building the future of location data". Entries listed below this table. |
| 4 | Innovation & values | `innovation.jsx` | Eyebrow "Our DNA". H2 "Innovation at our core, guided by values". Two panels and a stats ribbon, described below this table. |
| 5 | Join community | `social-proof.jsx` | H2 "Join Our Growing Community". Three cards: Contribute · Develop · Support. Buttons: "Star on GitHub" and "Contact Us". |

**Timeline entries (3)**

| Year | Milestone |
|---|---|
| 2018 | The Beginning |
| 2019 | Open Source Growth (100+ stars) |
| 2020 | Database Restructure |
| 2021 | API Launch (1K+ stars) |
| 2022 | Multi-Format Distribution (3K+) |
| 2023 | Automation & Platform Expansion; Kaggle and data.world (5K+) |
| 2024 | Community Platform / Update Tool (7K+) |
| 2025 | Export Tool & API Dashboard (8K+) |
| 2026 | Ecosystem Expansion: 9 channels, 50M+ monthly requests, 50,000+ developers, 9K+ stars |
| Next | What's Ahead: framework integrations (React, Vue, Next.js, WordPress), LLM / AI-agent tooling, premium endpoints, moderation tooling |

**Innovation & values (4)**
- **Innovation panel:** AI-Powered Validation (Coming Soon) · Global CDN Infrastructure · Real-time Synchronization · Enterprise Security (Coming Soon)
- **Core Values panel:** Community Ownership · Developer Empathy · Global Accessibility · Trust & Reliability
- **Stats ribbon:** seven stats, partly live

**Redesign notes:**
- The timeline is the emotional core of the page. Consider a scroll-driven timeline with star growth plotted as a line.
- Add a founder section, with photo and short story. Darshan is named in the footer but not presented on this page.
- Cut Mission & Vision down to one strong statement and three or four values.

### 6.9 Support (Contact) `/contact/`

- **Source:** `src/app/contact/page.jsx`
- **Goal:** Route people to the right channel quickly.

| # | Section | Component | Current content |
|---|---|---|---|
| 1 | Hero | `contact-hero.jsx` | Badge "Contact & Support". H1 "Get in touch / We're here to help". Body: "Have questions about our API, need technical support, or want to discuss enterprise solutions?…" |
| 2 | Channels | `contact.jsx` | See the channel details below this table. |

**Contact channels (2)**
- **GitHub** repo row
- **Support** emails, scrambled until hovered:
  - API: `api@countrystatecity.in`
  - Export: `export@countrystatecity.in`
  - General: a personal Gmail address
- **Social & Community** tiles: LinkedIn, X, Kaggle, Data.World
- **Blue callout:** "Found an issue or request?", with a "Report an Issue" button linking to GitHub issues and "Prefer email? support@countrystatecity.in"
- **Response note:** "We aim to respond within 24-48 hours on business days."
- **There is no contact form.** The site is a static export with no backend.

**Redesign notes:**
- Design a "What do you need?" router with these routes:
  - API or account help
  - Export or billing
  - Data correction (goes to the Update Tool)
  - Bug (goes to GitHub)
  - Enterprise or custom plan
  - General
- Show the emails in plain, readable form. Hover-to-reveal fails on touch devices.
- If a form is wanted, it needs a third-party form endpoint (see [question 7](#13-open-questions-for-darshan)).

### 6.10 FAQs `/faqs/` (built but hidden from the nav)

- **Source:** `src/app/faqs/page.jsx`, `src/app/faqs/layout.jsx` (FAQPage JSON-LD)

| # | Section | Current content |
|---|---|---|
| 1 | Hero with search (`faq-hero.jsx`) | Badge "Knowledge Base & Support". H1 "Frequently Asked Questions". Live search input. |
| 2 | Category filter | All · Getting Started · Pricing · Data Quality · API Usage · Integration · Data Coverage · Licensing · Support · Data Formats · Custom Solutions |
| 3 | Accordion | Eleven questions, listed below this table. |
| 4 | Still need help? | "Ask the docs assistant" link. Three cards: Contact Support · Community Forum · Documentation. |

**The 11 questions (3)**
1. How do I get started with the CountryStateCity API?
2. What's the difference between the free and paid plans?
3. How accurate and up-to-date is your location data?
4. What are the API rate limits?
5. Which programming languages do you support?
6. How many countries, states, and cities do you cover?
7. Can I use this data commercially?
8. What kind of support do you offer?
9. What data formats are available?
10. Do you provide custom data solutions?
11. What time does my daily request limit reset?

**Redesign notes:**
- Decide whether the FAQs launch with the redesign ([question 6](#13-open-questions-for-darshan)).
- If yes, design the FAQs as a help-centre style page that works with the docs assistant rather than duplicating it.

---

## 7. Component inventory to design

Design these as a reusable system: tokens, then components, then page templates.

| Group | Components |
|---|---|
| Foundations | Colour tokens (light, and dark if chosen), type scale, spacing, 12-column grid, radius, elevation, motion curves and durations, iconography style, data-viz palette |
| Navigation | Announcement bar, header with Products mega-menu and Login menu, mobile nav sheet, footer, back-to-top, breadcrumbs (new) |
| Page scaffolding | Hero variants (home / product / simple), section header (eyebrow, H2, subheading), dark CTA banner, closing "get started" action list |
| Proof | Stat band and counters (with loading and fallback states), live status pill, GitHub stars button, logo wall (new), testimonial card and marquee or carousel |
| Developer | Code block with language tabs, copy and response panel; install command row; terminal mock; JSON viewer; API request builder (new, optional) |
| Product | Product / channel card, feature card, before/after comparison, step process (3 and 4 steps), orbit / feature spotlight, format card or table, persona tabs |
| Pricing | Billing toggle with saving label, tier card (default / popular / best value), comparison table (desktop and mobile), credit pack card, credit calculator, custom credits stepper, custom-plan banner |
| Content | Timeline, values list, FAQ accordion with search and category chips, empty state, contact channel card, support router (new) |
| Signature | 3D / 2D globe hero with static poster fallback; world-to-city zoom story (optional) |
| Utility | Buttons (primary / secondary / ghost / on-dark), badges and pills, tabs, toggles, tooltips, toasts ("Copied"), skeletons |

---

## 8. Live data and dynamic states

The site is a static export. Numbers and prices first render from **fallback values** and then update in the browser, so every live element needs designed states for loading, loaded and fallback/error.

| Data | Source | Fallback | Used on |
|---|---|---|---|
| Total requests, countries, states, cities | `GET https://api.countrystatecity.in/stats` | 5.1B+ / 250 / 5.3K+ / 153.8K+ | Home, API, Database, Update Tool, About, Ecosystem |
| API plans (names, prices, limits, features, "Most Popular") | `GET https://api.countrystatecity.in/plans` | `src/data/pricing-tiers.js` | Pricing, API |
| Export credit packs | `GET https://eapi.countrystatecity.in/api/credits/packages` | `src/data/export-pricing.js` | Pricing, Export Tool |
| GitHub stars / forks | GitHub REST API (unauthenticated, limited to 60 requests an hour) | 6.8K stars / 2.3K forks (out of date; the real figure is about 9K) | Home, Database, Ecosystem, About, Pricing |
| GitHub contributors | GitHub REST API (paginated) | "50+" | Home |

**Design asks:**
- Counters that do not jump or shift layout. Reserve width with tabular figures.
- A subtle "live" indicator where data is real-time.
- Price cards that do not reflow when live prices arrive.

---

## 9. Content decisions and known issues

These should be settled before or during design so the visuals don't bake in conflicting claims.

### 9.1 Numbers to standardise (one canonical value each)

| Claim | Variants found | Proposed direction (please confirm) |
|---|---|---|
| Countries | "250" (stats tile), "250+" (everywhere else) | "250+" |
| States | "5,000+" (static), "5.3K+" (live) | Use the live value in one format, e.g. "5,300+" |
| Cities | "153,000+" (static), "153.8K+" (live) | Use the live value, e.g. "153,800+" |
| API requests | "5.1B+ total" (live), "50M+ monthly" (static; also reused as "50M+ users affected") | Pick one framing and label it correctly |
| Developers | "50,000+", "50K+", "thousands of developers" | "50,000+" |
| Uptime | "99.9%" (copy), "99.98%" (status widget, hard-coded) | Take from the status page or use "99.9% SLA" |
| Response time | "Sub-200ms", "<200ms", "p95 sub-200ms", mock "89ms" | One phrase, e.g. "<200ms p95" |
| Formats | Database: "12", "12+" with 13 tags (including DuckDB); Export: "13"; Ecosystem: "9+ formats"; Pricing Database tab lists 9 | Define per product: Database N formats, Export 13 formats |
| GitHub stars | Fallbacks 6.8K / 9.4K; timeline says "9K+" | Live, with an up-to-date fallback |
| Contributors | "127" (static), "1,200+ contributors", "1.2K+ active", live count | Confirm the definition and one figure |
| Update frequency | "Monthly updates" (Database), "Weekly Updates" (Home) | Confirm |
| Support response | "<24h", "1-2 days", "24-48h business days", plan-based "2-3 business days" / "~1 business day" | Plan-based wording everywhere |

### 9.2 Unsourced claims to remove or source

- "4.9/5 Developer Rating" (Home hero)
- "99% Developer satisfaction" (Home community)
- "10K+ developers helped" (Update Tool)
- "Trusted by enterprises worldwide" (API page)

### 9.3 Content quality

- **Testimonials:** there are 75 entries. Several are thank-you emails or questions rather than endorsements (for example "Thank you for kindly sharing the API key…", "please hurry up. thanks!"), and name casing is inconsistent. Curate a smaller set and show company and use case.
- **About:** the Mission & Vision cards repeat each other, and "Global Accessibility" appears twice.
- **Duplicate CTAs:** the docs link appears three times on Home.
- **Page titles:** the Ecosystem page metadata title uses a long dash; keep it consistent with the other titles.

### 9.4 Bugs and broken links to fix in the build

These are not design work, but list them so the new designs account for them.

- **Home:**
  - The GitHub stars button links nowhere.
  - "View on Github" goes to an internal page.
  - The Community "Open Source" card links to github.com, not the repo.
- **Pricing:**
  - There are two H1s.
  - The tabs are not deep-linkable.
  - The annual saving is never stated.
  - The custom-plan CTA emails a personal Gmail address.
- **API page:**
  - The code copy button copies broken or empty snippets.
  - The status figure is hard-coded.
- **Contact:** a personal Gmail address is shown as "General Support Email", and emails are unreadable on touch devices.
- **FAQs:** "GitHub Discussions" links to Issues, and the JSON-LD is out of step with the visible answers.
- **Database:** all 12 format buttons go to the same releases page.
- **Export:**
  - The custom credits CTA does not pass the chosen quantity.
  - Use-case credit costs do not match the calculator.

---

## 10. Technical and quality requirements

| Area | Requirement |
|---|---|
| Breakpoints | Design at 1440 (desktop), 1024 (small laptop), 768 (tablet) and 390 (mobile). Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. |
| Accessibility | WCAG 2.2 AA; one H1 per page; visible focus states; 44px touch targets; ARIA tabs and accordions; nothing hover-only; full `prefers-reduced-motion` alternative; contrast checked on gradients and glass |
| Performance | Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms. 3D is lazy-loaded with a static poster. Images are exported as AVIF/WebP at final sizes, because Next image optimisation is off in static export. Keep web fonts to one or two families. |
| SEO | Keep all URLs, trailing slashes, per-page metadata and JSON-LD (Organization, FAQPage). Design a new OG/Twitter image template at 1200 × 630. |
| Analytics | Keep CTAs as distinct, identifiable elements. App links carry UTM and attribution parameters, and scroll-depth tracking runs on Home and Ecosystem. |
| Build | Next.js 16, React 19, Tailwind 4 tokens via `@theme`, shadcn/Radix, lucide, motion and cobe. There is no server runtime, so forms or search need third-party or client-side solutions. |
| Tokens hand-off | Name colour and type tokens so they map directly onto Tailwind theme variables in `globals.css`. |

---

## 11. Deliverables and priorities

### 11.1 Deliverables requested from Claude Design

1. **Two creative directions** (moodboard, key visual, home hero) for Darshan to choose from. For example:
   - **"Cartographic Precision":** light, editorial, map-inspired
   - **"Mission Control":** dark, data-dense, live-telemetry feel
2. **Design system foundations and component library** (see [section 7](#7-component-inventory-to-design))
3. **Page designs** at desktop (1440) and mobile (390) for all ten pages, plus tablet (768) for Home and Pricing
4. **Interaction specs** for the signature moments (globe hero, world-to-city story, credit calculator, pricing toggle and table)
5. **OG / social image template**

### 11.2 Suggested page priority

1. Home
2. Pricing
3. API Service
4. Export Tool
5. Database
6. Ecosystem
7. Update Tool
8. About
9. Support
10. FAQs

---

## 12. Kick-off prompt for Claude Design

Paste the following into Claude Design with this brief attached.

```text
You are redesigning the marketing portal for CountryStateCity (countrystatecity.in), an open-source
geographical database (250+ countries, ~5,300 states, ~153,800 cities) with a paid REST/GraphQL API,
a credit-based Export Tool, NPM/PyPI packages, a CLI and a community Update Tool.

Read the attached brief in full. It contains the current page inventory, copy, live data sources,
content issues, technical constraints and Awwwards references.

Goals: increase API sign-ups and Export Tool purchases, explain the nine-channel ecosystem clearly,
and lift the brand to Awwwards-level craft while staying fast, accessible (WCAG 2.2 AA) and buildable
in Next.js 16 static export + Tailwind 4 + shadcn/Radix + motion + cobe.

Start with two contrasting creative directions (moodboard, type and colour, home hero at 1440 and 390).
Make the data the hero: world to country to state to city, real API responses, real code.
Keep 3D to one or two signature moments, with static fallbacks and reduced-motion alternatives.
After a direction is chosen, produce the design system, then pages in this order:
Home, Pricing, API, Export Tool, Database, Ecosystem, Update Tool, About, Support, FAQs.
Use the canonical numbers in section 9 of the brief and flag any copy you change.
```

---

## 13. Open questions for Darshan

Answers to these will change the design direction, so please confirm before design starts.

1. **Scope.** Is "portal" only this marketing site (countrystatecity.in), or should the redesign also cover the app dashboards (app., export., manager.) so they share one design system?
2. **Brand.** Keep the current logo, the blue/green/orange palette and Cal Sans, or is a brand refresh in scope?
3. **Theme.** Light only, dark-first, or both with a toggle?
4. **Ambition level.** Go for a full Awwwards-style immersive experience (WebGL, scroll-driven story), or a performance-first developer site with one or two signature moments? The brief assumes the latter.
5. **MakeMySiteLive.** Keep the announcement bar and the Products menu entry, restyle them, or remove them?
6. **FAQs page.** Launch it with the redesign, or keep it hidden?
7. **Contact.** Add a real contact form (it would need a third-party service such as Formspree, Basin or Web3Forms)? Should `support@countrystatecity.in` replace the personal Gmail address everywhere?
8. **Numbers.** Please confirm the canonical figures in [section 9.1](#91-numbers-to-standardise-one-canonical-value-each), especially "5.1B+ total" versus "50M+ monthly" requests, and contributor counts.
9. **Testimonials and logos.** Can we curate testimonials, and do we have permission to show any company logos?
10. **New pages.** Is anything new in scope, such as a Changelog / What's new, Customers / Case studies, a Blog, or Compare pages?
11. **Output format.** Does Claude Design need access to the GitHub repo? Is the expected output a clickable prototype, static frames, or code?
12. **Timeline.** Is there a target date for design sign-off and build?

---

## 14. Appendix: external destinations

| Destination | URL |
|---|---|
| API dashboard / sign-up | https://app.countrystatecity.in |
| Export Tool app | https://export.countrystatecity.in |
| Update Tool (manager) | https://manager.countrystatecity.in |
| Documentation | https://docs.countrystatecity.in |
| Status | https://status.countrystatecity.in |
| API playground | https://playground.countrystatecity.in |
| Database demo | https://demo.countrystatecity.in |
| CLI | https://cli.countrystatecity.in |
| Geographic Encyclopedia | https://countrystatecity.org |
| Database repository | https://github.com/dr5hn/countries-states-cities-database |
| NPM organisation | https://www.npmjs.com/org/countrystatecity |
| PyPI package | https://pypi.org/project/countrystatecity-countries/ |
| Kaggle dataset | https://www.kaggle.com/datasets/darshangada/countries-states-cities-database |
| Data.World dataset | https://data.world/dr5hn/country-state-city |
| Founder socials | LinkedIn `in/dr5hn`, X `@dr5hn`, GitHub `dr5hn` |
