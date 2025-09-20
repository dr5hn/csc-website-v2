"use client";

import { Button } from "@/components/ui/button";
import {
  Rocket,
  MessageCircle,
  CheckCircle2,
  Trophy,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function CtaUpdateTool() {
  return (
    <section className="relative container mx-auto px-4 py-6 lg:py-12 xl:py-20">
      <div className="bg-dark rounded-3xl px-4 py-10 lg:p-12 xl:p-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-green/20 px-4 py-2 mb-6 md:mb-8">
          <span
            className="h-2 w-2 rounded-full bg-green animate-pulse"
            aria-hidden="true"
          ></span>
          <span className="text-xs font-semibold tracking-wider uppercase text-white">
            Make an Impact
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Start Contributing Today
        </h2>

        {/* Subtext */}
        <p className="text-xl text-white/80 mb-6 md:mb-12 max-w-3xl mx-auto">
          Join 1,200+ contributors who are helping build the world's most
          accurate geographical database. Your first contribution can make a
          difference for millions of users.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-12">
          <Button
            asChild
            className="bg-orange text-white hover:bg-orange/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-4 text-lg group cursor-pointer"
          >
            <Link href="https://manager.countrystatecity.in" target="_blank" className="cursor-pointer">
              Make First Contribution
              <Rocket className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-200" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
