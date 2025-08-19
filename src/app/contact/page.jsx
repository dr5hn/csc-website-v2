"use client";

import { Mail, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import GitHubIcon from "@/icons/GitHub";
import XIcon from "@/icons/XIcon";

const faqs = [
  {
    question: "How do I get started with the API?",
    answer:
      "You can start by exploring our open-source dataset on GitHub or sign up for API access. Our documentation provides step-by-step integration guides for all major programming languages.",
    category: "Getting Started",
  },
  {
    question: "What's the difference between the free and paid plans?",
    answer:
      "The free plan gives you access to our complete open-source dataset via GitHub. The paid API provides fast, reliable endpoints with higher rate limits, multiple output formats, and priority support.",
    category: "Pricing",
  },
  {
    question: "How accurate and up-to-date is your data?",
    answer:
      "Our data is continuously updated and maintained by our community. We verify changes through multiple sources and have a rigorous review process for all updates to ensure accuracy.",
    category: "Data Quality",
  },
  {
    question: "Can I use this data commercially?",
    answer:
      "Yes! Our open-source data is available under a permissive license for commercial use. For API access, our paid plans are designed specifically for commercial applications.",
    category: "Licensing",
  },
  {
    question: "Do you provide custom data formats?",
    answer:
      "Absolutely. Our Custom plan includes any format you need - CSV, JSON, SQL, Excel, or custom formats. We can also provide one-time or recurring exports based on your requirements.",
    category: "Custom Solutions",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide community support through GitHub for open-source users, email support for API customers, and dedicated account management for enterprise clients.",
    category: "Support",
  },
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

export default function Contact() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-10 lg:py-20">
      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
          Let's connect
        </h1>
        <p className="text-lg text-darkgray">
          We're here for questions, feedback, or partnership opportunities.
        </p>
      </div>

      {/* Direct Contact Info */}
      <div className="mb-8 lg:mb-20 space-y-8">
        {/* GitHub */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-6 h-6 text-dark mt-1">
            <GitHubIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark mb-1">GitHub</h3>
            <p className="text-darkgray mb-2">
              Open-source project and issue tracking
            </p>
            <Link
              href="https://github.com/dr5hn/countries-states-cities-database"
              className="text-blue hover:text-blue/80 hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/dr5hn/countries-states-cities-database
            </Link>
          </div>
        </div>

        {/* Email Support */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-6 h-6 text-dark mt-1">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark mb-1">Support</h3>
            <p className="text-darkgray mb-2">
              Technical questions and API support
            </p>
            <Link
              href="mailto:support@countrystatecity.in"
              className="text-blue hover:text-blue/80 hover:underline font-medium"
            >
              support@countrystatecity.in
            </Link>
          </div>
        </div>

        {/* Email Sales */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-6 h-6 text-dark mt-1">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark mb-1">
              Sales & Partnerships
            </h3>
            <p className="text-darkgray mb-2">
              Enterprise solutions and custom integrations
            </p>
            <Link
              href="mailto:sales@countrystatecity.in"
              className="text-blue hover:text-blue/80 hover:underline font-medium"
            >
              sales@countrystatecity.in
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-6 h-6 text-dark mt-1">
            <XIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark mb-1">Social</h3>
            <p className="text-darkgray mb-2">
              Follow us for updates and announcements
            </p>
            <div className="flex gap-4">
              <Link
                href="https://x.com/dr5hn"
                className="text-blue hover:text-blue/80 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </Link>
              {/* <Link
                href="https://linkedin.com/company/countrystatecity"
                className="text-blue hover:text-blue/80 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mb-8 lg:mb-20">
        <div className="text-center mb-6 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-blue text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue rounded-full mr-2 animate-pulse"></span>
            Support
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-darkgray max-w-2xl mx-auto">
            Everything you need to know about our API and services. Can't find
            what you're looking for?
            <Link
              href="mailto:support@countrystatecity.in"
              className="text-blue hover:text-blue/80 font-medium ml-1"
            >
              Contact our support team
            </Link>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Community & Support */}
      <div className="text-center">
        <p className="text-lg md:text-xl text-darkgray md:mb-6 mb-8">
          Found an issue with our data or have a feature request? Help us
          improve by reporting it on GitHub.
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-blue to-blue/90 hover:from-blue/90 hover:to-blue text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-4 text-lg rounded-full"
        >
          <Link
            href="https://github.com/dr5hn/countries-states-cities-database/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="w-5 h-5 mr-2" />
            Report an Issue
          </Link>
        </Button>
      </div>
    </div>
  );
}
