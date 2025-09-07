import { Button } from "@/components/ui/button";
import { Play, Key } from "lucide-react";
import Globe from "./ui/globe";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-light/30 to-blue/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-10 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-blue text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue rounded-full mr-2 animate-pulse"></span>
              Trusted by 10,000+ developers worldwide
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The most accurate{" "}
              <span className="bg-gradient-to-r from-blue to-green bg-clip-text text-transparent">
                Country, State, and City
              </span>{" "}
              data API
            </h1>

            {/* Subtext */}
            <p className="text-xl text-darkgray mb-8 leading-relaxed max-w-2xl lg:max-w-none">
              Built for developers. Clean, fast, and easy to integrate. Get
              comprehensive location data with a single API call.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-blue hover:bg-blue/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-4 text-lg cursor-pointer">
                <Key className="w-5 h-5 mr-2" />
                Get API Key
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue text-blue hover:bg-blue hover:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-4 text-lg cursor-pointer"
              >
                <Play className="w-5 h-5 mr-2" />
                Try Now
              </Button>
            </div>
          </div>

          {/* Right Column - Code Example */}
          <div className="relative">
            <Globe
              baseColor={[0.133, 0.588, 0.953]} // this affects everything
              markerColor={[]} // no markers
              glowColor={null} // disable glow
            />
          </div>
        </div>
      </div>
    </section>
  );
}
