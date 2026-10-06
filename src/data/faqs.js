// FAQ content: rendered on /faqs and emitted as FAQPage JSON-LD from the same list, so the
// structured data always matches the visible answers.
import { STAT_DESCRIPTIONS } from "@/lib/stats";

export const FAQS = [
  {
    id: 1,
    category: "Getting Started",
    question: "How do I get started with the CountryStateCity API?",
    answer:
      "Getting started is simple! You can begin by exploring our open-source dataset on GitHub for free, or sign up for API access to get your API key. Our comprehensive documentation provides step-by-step integration guides for all major programming languages including JavaScript, Python, PHP, and more.",
  },
  {
    id: 2,
    category: "Pricing",
    question: "What's the difference between the free and paid plans?",
    answer:
      "The Community plan provides free access to basic country, state and city endpoints. Starter adds higher limits, bulk endpoints, filtering and sorting. Supporter adds full data fields, translations, fuzzy search, autocomplete, nearby search and origin whitelisting. Professional adds GraphQL and the data change feed; Business raises the limits further. See the Pricing page for current prices, quotas and billing options.",
  },
  {
    id: 3,
    category: "Data Quality",
    question: "How accurate and up-to-date is your location data?",
    answer:
      "Maintainers and community contributors submit corrections with supporting sources. Approved changes are published through the open GitHub repository and its releases. Coverage and freshness vary by record and release; check the source data for your use case and submit a correction through the Update Tool if you find an error.",
  },
  {
    id: 4,
    category: "API Usage",
    question: "What are the API rate limits?",
    answer:
      "Both daily and monthly request limits apply. The free Community plan currently includes 100 requests per day and 3,000 per month. Paid plans have higher quotas; the Pricing page shows the current limits for each plan. Requests beyond either limit are rejected until that quota resets or you upgrade.",
  },
  {
    id: 5,
    category: "Integration",
    question: "Which programming languages do you support?",
    answer:
      "The REST API works with any language that can make HTTP requests. Official API clients are available for JavaScript/TypeScript and Python. Documentation also includes HTTP integration examples for other languages. Offline data packages are available through npm and PyPI.",
  },
  {
    id: 6,
    category: "Data Coverage",
    question: "How many countries, states, and cities do you cover?",
    answer:
      `Coverage spans ${STAT_DESCRIPTIONS.fullCoverageAlt}, including countries and territories. API counts and downloadable snapshots can differ as releases are published. These totals do not mean every populated place is included. Check the API statistics and GitHub releases for the current data.`,
  },
  {
    id: 7,
    category: "Licensing",
    question: "Can I use this data commercially?",
    answer:
      "Yes. The geographic database and offline data packages use ODbL-1.0, which permits commercial use with its attribution and applicable share-alike requirements. API clients and the CLI have their own package licences. Review the database licence and the licence of each package you use; API access is also subject to its service terms.",
  },
  {
    id: 8,
    category: "Support",
    question: "What kind of support do you offer?",
    answer:
      "Open-source users and Community and Starter API customers get community support through GitHub and our documentation. Supporter includes founder-led email support (2-3 business days), and Professional and Business include founder-led priority support (~1 business day).",
  },
  {
    id: 9,
    category: "Data Formats",
    question: "What data formats are available?",
    answer:
      "Free database downloads ship in 12 formats: JSON, MySQL, PostgreSQL, SQLite, SQL Server, MongoDB, CSV, Parquet, XML, YAML, GeoJSON and TOON. The Export Tool offers 13 formats: CSV, Excel, Markdown, JSON, NDJSON, XML, YAML, SQL, PostgreSQL, SQL Server, SQLite3, MongoDB Extended JSON and GeoJSON. It also provides filters, translated names and optional flag images. The REST API returns JSON.",
  },
  {
    id: 10,
    category: "Custom Solutions",
    question: "Do you provide custom data solutions?",
    answer:
      "Contact support to discuss higher request limits, data exports or custom requirements. Describe the countries, fields, formats and volumes you need so we can assess what is available.",
  },
  {
    id: 11,
    category: "API Usage",
    question: "What time does my daily request limit reset?",
    answer:
      "Your daily API request limit resets at 00:00 UTC (midnight UTC) every day — that's 5:30 AM IST. Once it resets, your full daily quota is available again. Monthly limits reset at the start of each calendar month (the 1st, at 00:00 UTC).",
  },
];
