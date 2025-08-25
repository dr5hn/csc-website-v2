"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Plus, Minus, Search, Mail, MessageCircle } from "lucide-react";
import FAQHero from "@/components/faq-hero";

const faqs = [
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
      "The free plan gives you access to our complete open-source dataset via GitHub download. The paid API provides fast, reliable REST endpoints with higher rate limits (100k+ requests/month), multiple output formats (JSON, CSV, SQL), priority email support, and 99.9% uptime SLA.",
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
      "Free tier includes 1,000 requests per month. Pro plan includes 100,000 requests per month. Enterprise plans offer unlimited requests with dedicated infrastructure. All plans include burst capacity for traffic spikes.",
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
      "We provide complete coverage with 250+ countries, 5,000+ states/provinces, and 150,000+ cities worldwide. This includes all UN-recognized countries, major administrative divisions, and populated places with coordinate data.",
  },
  {
    id: 7,
    category: "Licensing",
    question: "Can I use this data commercially?",
    answer:
      "Yes! Our open-source data is available under the MIT license for unlimited commercial use. For API access, our paid plans are specifically designed for commercial applications with enterprise-grade reliability and support.",
  },
  {
    id: 8,
    category: "Support",
    question: "What kind of support do you offer?",
    answer:
      "We provide community support through GitHub for open-source users, email support for API customers with response times under 24 hours, and dedicated account management for enterprise clients. Premium support includes phone support and custom integrations.",
  },
  {
    id: 9,
    category: "Data Formats",
    question: "What data formats are available?",
    answer:
      "We support multiple formats including JSON (default), CSV, SQL, XML, YAML, and MongoDB. Our Export Tool allows you to download custom datasets in your preferred format, and the API can return data in JSON or CSV format.",
  },
  {
    id: 10,
    category: "Custom Solutions",
    question: "Do you provide custom data solutions?",
    answer:
      "Our Custom plan includes tailored data exports, custom formats, one-time or recurring data deliveries, and custom integrations. We work with enterprises to meet specific data requirements and provide dedicated account management.",
  },
];

const categories = [
  "All",
  "Getting Started",
  "Pricing",
  "Data Quality",
  "API Usage",
  "Integration",
  "Data Coverage",
  "Licensing",
  "Support",
  "Data Formats",
  "Custom Solutions",
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div className="group">
      <button
        className="w-full p-4 md:p-6 text-left flex items-start justify-between bg-white/40 backdrop-blur-sm border border-light/30 rounded-2xl hover:bg-white/60 hover:border-light/50 transition-all duration-300"
        onClick={onToggle}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-blue/70 uppercase">
              {faq.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-dark group-hover:text-blue transition-colors duration-200">
            {faq.question}
          </h3>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center group-hover:bg-blue/20 transition-colors duration-200">
            {isOpen ? (
              <Minus className="w-4 h-4 text-blue" />
            ) : (
              <Plus className="w-4 h-4 text-blue" />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-3 mx-4 md:mx-6">
          <div className="p-4 md:p-6 border-l-4 border-blue/30">
            <p className="text-darkgray">{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // const handleSearch = () => {
  //   // Search functionality would be implemented here
  //   console.log("Searching for:", searchTerm);
  // };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <FAQHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        // onSearch={handleSearch}
        faqCount={faqs.length}
      />

      {/* Category Filter */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue text-white shadow-lg"
                  : "bg-white/60 text-darkgray hover:bg-white/80 hover:text-blue border border-light/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openFAQ === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-lightgray mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">
              No results found
            </h3>
            <p className="text-darkgray">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>

      {/* Contact Support Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-white/60 backdrop-blur-sm border border-light/50 rounded-2xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-dark mb-4">
            Still have questions?
          </h3>
          <p className="text-darkgray mb-6">
            Can't find what you're looking for? Our support team is here to help
            you get the most out of our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@countrystatecity.in"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue text-white rounded-full font-semibold hover:bg-blue/90 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Email Support
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-blue border border-blue/20 rounded-full font-semibold hover:bg-white transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
