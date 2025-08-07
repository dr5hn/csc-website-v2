"use client";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Play, Key } from "lucide-react";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const requestCode = `curl -X GET "https://api.nexusapi.com/v1/countries/US/states/CA/cities" \\
  -H "Authorization: Bearer YOUR_API_KEY"`;

  const responseCode = `{
  "data": [
    {
      "id": "5391959",
      "name": "San Francisco",
      "state": "California",
      "country": "United States",
      "coordinates": {
        "lat": 37.7749,
        "lng": -122.4194
      },
      "population": 873965,
      "timezone": "America/Los_Angeles"
    }
  ],
  "meta": {
    "total": 482,
    "page": 1,
    "per_page": 50
  }
}`;

  const fullCode = requestCode + "\n\n" + responseCode;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
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
            <div className="bg-dark/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-darkgray/20 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 bg-darkgray/20 border-b border-darkgray/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red rounded-full"></div>
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
                <div className="text-lightgray text-sm font-medium">
                  API Example
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-blue/10 hover:bg-blue/20 text-blue transition-colors duration-200 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-4">
                {/* Request */}
                <pre className="!bg-transparent !p-0 !m-0 language-bash">
                  <code className="language-bash text-sm">{requestCode}</code>
                </pre>

                {/* Response */}
                <div className="mt-4 pt-4 border-t border-darkgray/20">
                  <pre className="!bg-transparent !p-0 !m-0">
                    <code className="language-json text-sm">
                      {responseCode}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green/20 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
