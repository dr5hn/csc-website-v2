import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Rocket, Shield, Star } from "lucide-react";
import { Globe } from "./globe";
import GitHubStars from "./githubstars";
import { TEXT_STATS } from "@/lib/stats";
import LiveTotalRequests from "@/components/live-total-requests";
import LiveGeoCoverage from "@/components/live-geo-coverage";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white via-light/30 to-blue/5"
      aria-labelledby="hero-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-10 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-blue text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue rounded-full mr-2 animate-pulse"></span>
              Trusted by {TEXT_STATS.developers} developers worldwide
            </div>

            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Country State City API -{" "}
              <span className="bg-gradient-to-r from-blue to-green bg-clip-text text-transparent">
                The World's Most Comprehensive
              </span>{" "}
              Geographic Database for Developers
            </h1>

            {/* Subtext */}
            <p className="text-xl text-darkgray mb-8 leading-relaxed max-w-2xl lg:max-w-none">
              Build location-aware applications with accurate data from <strong><LiveGeoCoverage /></strong>. Trusted by {TEXT_STATS.developers} developers worldwide with <strong><LiveTotalRequests /> total API requests</strong> and {TEXT_STATS.uptime} uptime guarantee.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                asChild
                className="bg-blue hover:bg-blue/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-4 text-lg cursor-pointer"
                aria-label="Get started with CSC Database for free"
              >
                <a
                  href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=hero_signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Rocket className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Started for Free
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue/30 text-blue hover:bg-blue/5 font-semibold px-8 py-4 text-lg"
              >
                <a
                  href="https://docs.countrystatecity.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="w-5 h-5 mr-2" aria-hidden="true" />
                  Read the Docs
                </a>
              </Button>
              <GitHubStars />
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-darkgray">
                <Shield className="h-5 w-5 text-success" />
                <span className="font-semibold text-sm">{TEXT_STATS.uptime} Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2 text-darkgray">
                <Star className="h-5 w-5 text-orange" />
                <span className="font-semibold text-sm">
                  4.9/5 Developer Rating
                </span>
              </div>
              <div className="flex items-center gap-2 text-darkgray">
                <Clock className="h-5 w-5 text-blue" />
                <span className="font-semibold text-sm">
                  Sub-200ms Response
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Globe */}
          <div className="relative">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
}
