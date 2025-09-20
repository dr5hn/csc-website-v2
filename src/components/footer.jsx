import Link from "next/link";
import XIcon from "@/icons/XIcon";
import GitHubIcon from "@/icons/GitHub";
import { ExternalLink, Linkedin, ChevronUp, Mail } from "lucide-react";
import KaggleIcon from "@/icons/KaggleIcon";
import Logo from "./logo";
import DataWorldIcon from "@/icons/DataWorld";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-white/80 to-light/30 border-t border-light/50">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-6 inline-flex items-center justify-center w-12 h-12 bg-blue text-white rounded-full shadow-lg hover:bg-blue/90 transition-all duration-200 hover:scale-105"
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 p-6 lg:p-8 bg-gradient-to-r from-blue/5 to-purple/5 rounded-2xl border border-light/50">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue/10 rounded-full mb-4">
              <Mail className="w-5 h-5 text-blue" />
            </div>
            <h3 className="text-xl font-semibold text-dark mb-2">
              Stay Updated with CSC
            </h3>
            <p className="text-sm text-darkgray mb-6">
              Get notified about new features, updates, and developer resources straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-colors"
              />
              <button className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <Logo classes="mb-4" />
            <p className="text-sm text-darkgray leading-relaxed mb-6">
              The world's most comprehensive geographical database, trusted by
              developers worldwide for accurate location data in their
              applications. Built by the community, for the community.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.linkedin.com/in/dr5hn/"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-light/50 hover:bg-light transition-colors duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-darkgray group-hover:text-dark transition-colors duration-200" />
              </Link>
              <Link
                href="https://github.com/dr5hn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-light/50 hover:bg-light transition-colors duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4 text-darkgray group-hover:text-dark transition-colors duration-200" />
              </Link>
              <Link
                href="https://x.com/dr5hn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-light/50 hover:bg-light transition-colors duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-4 h-4 text-darkgray group-hover:text-dark transition-colors duration-200" />
              </Link>
              <Link
                href="https://www.kaggle.com/datasets/darshangada/countries-states-cities-database"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-light/50 hover:bg-light transition-colors duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kaggle"
              >
                <KaggleIcon className="w-4 h-4 text-darkgray group-hover:text-dark transition-colors duration-200" />
              </Link>
              <Link
                href="https://data.world/dr5hn/country-state-city"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-light/50 hover:bg-light transition-colors duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Data.World"
              >
                <DataWorldIcon className="w-7 h-7 text-darkgray group-hover:text-dark transition-colors duration-200" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-dark mb-4 uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/product/database"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Database
                </Link>
              </li>
              <li>
                <Link
                  href="/product/api"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  API Service
                </Link>
              </li>
              <li>
                <Link
                  href="/product/export-tool"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Export Tool
                </Link>
              </li>
              <li>
                <Link
                  href="/product/update-tool"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Update Tool
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-dark mb-4 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://countrystatecity.in/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Documentation
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://status.countrystatecity.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Status
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://playground.countrystatecity.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Playground
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://demo.countrystatecity.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Database Demo
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-dark mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
              {/* Temporarily hidden - will launch later
              <li>
                <Link
                  href="/faqs"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              */}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-darkgray hover:text-blue transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-light/50 text-sm text-lightgray text-center">
          <div className="">
            Made with 💚 in India 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}
