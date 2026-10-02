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
      `The free Community plan gives you 3,000 API requests/month (100/day) with basic fields for countries, states by country, and cities by state. Paid plans raise your limits and unlock more endpoints, data, and features. Starter ($5/mo) gives you 9,000 requests/month (300/day) and adds the all-states and cities-by-country endpoints, inline search filtering, regions, phone, currency, and ISO lookups, and field filtering and sorting, still with basic fields. Supporter ($9/mo) gives you 30,000 requests/month (1,000/day) and adds full data access (extended fields, translations, and wiki data), fuzzy search, autocomplete, nearby search, and origin whitelisting for up to 3 domains or IPs. Professional ($19/mo) gives you 63,000 requests/month (2,100/day) and adds the GraphQL API, the data change feed, and whitelisting for up to 10. Business ($29/mo) includes everything in Professional with 100,000 requests/month (3,300/day) and whitelisting for up to 25.`,
  },
  {
    id: 3,
    category: "Data Quality",
    question: "How accurate and up-to-date is your location data?",
    answer:
      "Our data is continuously updated and maintained by our global community of contributors. We verify all changes through multiple authoritative sources and have a rigorous review process. The database is updated monthly with new cities, administrative changes, and corrections.",
  },
  {
    id: 4,
    category: "API Usage",
    question: "What are the API rate limits?",
    answer:
      "Community (free): 3,000 requests/month (100/day). Starter ($5/mo): 9,000 requests/month (300/day). Supporter ($9/mo): 30,000 requests/month (1,000/day). Professional ($19/mo): 63,000 requests/month (2,100/day). Business ($29/mo): 100,000 requests/month (3,300/day). Custom plans available for higher volumes.",
  },
  {
    id: 5,
    category: "Integration",
    question: "Which programming languages do you support?",
    answer:
      "Our REST API works with any programming language that can make HTTP requests. We provide official SDKs and code examples for JavaScript/Node.js, Python, PHP, Ruby, Java, C#, Go, and more. Check our documentation for specific implementation guides.",
  },
  {
    id: 6,
    category: "Data Coverage",
    question: "How many countries, states, and cities do you cover?",
    answer:
      `We provide complete coverage with ${STAT_DESCRIPTIONS.fullCoverageAlt} worldwide. This includes all UN-recognized countries, major administrative divisions, and populated places with coordinate data.`,
  },
  {
    id: 7,
    category: "Licensing",
    question: "Can I use this data commercially?",
    answer:
      "Yes! Our geographical data is licensed under ODbL-1.0 and our language packages under MIT — both free to use commercially, as long as you keep the required attribution for the database. For API access, our paid plans are specifically designed for commercial applications with enterprise-grade reliability and support.",
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
      "We support 13 export formats grouped by use case — Tabular (CSV, Excel, Markdown), Structured (JSON default, NDJSON, XML, YAML), Database (SQL, PostgreSQL, SQL Server, SQLite3, MongoDB Extended JSON), and Geospatial (GeoJSON). The Export Tool also supports translation locales, multi-country filters (1–10 countries), region/subregion filters, sort by field, and a flag-image bundle (PNG + SVG). The API returns data in JSON; for CSV or any other format, use the Export Tool or our database downloads.",
  },
  {
    id: 10,
    category: "Custom Solutions",
    question: "Do you provide custom data solutions?",
    answer:
      "Our Custom plan includes tailored data exports, custom formats, one-time or recurring data deliveries, and custom integrations. We work with enterprises to meet specific data requirements and provide dedicated account management.",
  },
  {
    id: 11,
    category: "API Usage",
    question: "What time does my daily request limit reset?",
    answer:
      "Your daily API request limit resets at 00:00 UTC (midnight UTC) every day — that's 5:30 AM IST. Once it resets, your full daily quota is available again. Monthly limits reset at the start of each calendar month (the 1st, at 00:00 UTC).",
  },
];
