import { TEXT_STATS } from "@/lib/stats";

export const metadata = {
  title: "Frequently Asked Questions - CSC Database Help Center",
  description: "Find answers to common questions about CSC Database API, pricing, data accuracy, usage limits, and technical implementation. Get help fast!",
  keywords: ["FAQ", "help", "questions", "API help", "database questions", "technical help", "support", "troubleshooting"],
  openGraph: {
    title: "CSC Database FAQ - Get Your Questions Answered",
    description: "Quick answers to common questions about geographical data API, implementation, and pricing.",
    type: "website",
  },
  alternates: {
    canonical: "/faqs/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I get started with the CountryStateCity API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Getting started is simple! You can begin by exploring our open-source dataset on GitHub for free, or sign up for API access to get your API key. Our comprehensive documentation provides step-by-step integration guides for all major programming languages including JavaScript, Python, PHP, and more."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between the free and paid plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The free Community plan gives you 3,000 API requests/month (100/day) with basic fields for countries, states by country, and cities by state. Paid plans raise your limits and unlock more endpoints, data, and features. Starter ($5/mo) gives you 9,000 requests/month (300/day) and adds the all-states and cities-by-country endpoints, inline search filtering, regions, phone, currency, and ISO lookups, and field filtering and sorting, still with basic fields. Supporter ($9/mo) gives you 30,000 requests/month (1,000/day) and adds full data access (extended fields, translations, and wiki data), fuzzy search, autocomplete, nearby search, and origin whitelisting for up to 3 domains or IPs. Professional ($19/mo) gives you 63,000 requests/month (2,100/day) and adds the GraphQL API, the data change feed, and whitelisting for up to 10. Business ($29/mo) includes everything in Professional with 100,000 requests/month (3,300/day) and whitelisting for up to 25."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate and up-to-date is your location data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our data is continuously updated and maintained by our global community of contributors. We verify all changes through multiple authoritative sources and have a rigorous review process. The database is updated monthly with new cities, administrative changes, and corrections."
      }
    },
    {
      "@type": "Question",
      "name": "What are the API rate limits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Community (free): 3,000 requests/month (100/day). Starter ($5/mo): 9,000 requests/month (300/day). Supporter ($9/mo): 30,000 requests/month (1,000/day). Professional ($19/mo): 63,000 requests/month (2,100/day). Business ($29/mo): 100,000 requests/month (3,300/day). Custom plans available for higher volumes."
      }
    },
    {
      "@type": "Question",
      "name": "Which programming languages do you support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our REST API works with any programming language that can make HTTP requests. We provide official SDKs and code examples for JavaScript/Node.js, Python, PHP, Ruby, Java, C#, Go, and more. Check our documentation for specific implementation guides."
      }
    },
    {
      "@type": "Question",
      "name": "How many countries, states, and cities do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `We provide complete coverage with ${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states, and ${TEXT_STATS.cities} cities worldwide. This includes all UN-recognized countries, major administrative divisions, and populated places with coordinate data.`
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this data commercially?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our geographical data is licensed under ODbL-1.0 and our language packages under MIT — both free to use commercially, as long as you keep the required attribution for the database. For API access, our paid plans are specifically designed for commercial applications with enterprise-grade reliability and support."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of support do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open-source users and Community and Starter API customers get community support through GitHub and our documentation. Supporter includes founder-led email support (2-3 business days), and Professional and Business include founder-led priority support (~1 business day)."
      }
    },
    {
      "@type": "Question",
      "name": "What data formats are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support 13 export formats grouped by use case — Tabular (CSV, Excel, Markdown), Structured (JSON default, NDJSON, XML, YAML), Database (SQL, PostgreSQL, SQL Server, SQLite3, MongoDB Extended JSON), and Geospatial (GeoJSON). The Export Tool also supports translation locales, multi-country filters (1–10 countries), region/subregion filters, sort by field, and a flag-image bundle (PNG + SVG). The API returns data in JSON; for CSV or any other format, use the Export Tool or our database downloads."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide custom data solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Custom plan includes tailored data exports, custom formats, one-time or recurring data deliveries, and custom integrations. We work with enterprises to meet specific data requirements and provide dedicated account management."
      }
    }
  ]
};

export default function FAQsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
