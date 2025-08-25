import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GitHubIcon from "@/icons/GitHub";
import XIcon from "@/icons/XIcon";

export default function Contact() {
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
