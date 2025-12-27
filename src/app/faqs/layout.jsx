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
        "text": "The free plan gives you access to our complete open-source dataset via GitHub download. The paid API provides fast, reliable REST endpoints with higher rate limits (100k+ requests/month), multiple output formats (JSON, CSV, SQL), priority email support, and 99.9% uptime SLA."
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
        "text": "Free tier includes 1,000 requests per month. Pro plan includes 100,000 requests per month. Enterprise plans offer unlimited requests with dedicated infrastructure. All plans include burst capacity for traffic spikes."
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
        "text": "We provide complete coverage with 250+ countries, 5,000+ states, and 150,000+ cities worldwide. This includes all UN-recognized countries, major administrative divisions, and populated places with coordinate data."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this data commercially?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our open-source data is available under the MIT license for unlimited commercial use. For API access, our paid plans are specifically designed for commercial applications with enterprise-grade reliability and support."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of support do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide community support through GitHub for open-source users, email support for API customers with response times under 24 hours, and dedicated account management for enterprise clients. Premium support includes phone support and custom integrations."
      }
    },
    {
      "@type": "Question",
      "name": "What data formats are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support multiple formats including JSON (default), CSV, SQL, XML, YAML, and MongoDB. Our Export Tool allows you to download custom datasets in your preferred format, and the API can return data in JSON or CSV format."
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
