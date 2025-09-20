"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, FileText, Globe, Check, Trophy, MapPin, Users, Target } from "lucide-react";
import { TEXT_STATS } from "@/lib/stats";

function DatabaseOverview() {
  const stats = [
    {
      value: TEXT_STATS.countries,
      label: "Countries Covered",
      icon: Globe,
      color: "from-blue to-blue/80"
    },
    {
      value: TEXT_STATS.states,
      label: "States/Regions",
      icon: MapPin,
      color: "from-green to-green/80"
    },
    {
      value: TEXT_STATS.cities,
      label: "Cities & Towns",
      icon: Target,
      color: "from-orange to-orange/80"
    }
  ];

  return (
    <div className="relative">
      <div className="rounded-2xl p-[1px] bg-gradient-to-br from-light to-transparent">
        <div className="rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_rgba(2,6,23,0.1)] overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
                <Globe className="h-5 w-5 text-blue" />
              </div>
              <div>
                <div className="text-sm font-bold text-dark leading-tight">
                  Global Database Scope
                </div>
                <div className="text-xs text-lightgray">
                  Comprehensive worldwide coverage
                </div>
              </div>
            </div>
          </div>
          <div className="h-px bg-light/60"></div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-5 w-5 text-lightgray" />
                </div>
                <div className={`text-3xl font-black font-mono bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-lightgray">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4">
            <div className="flex items-center justify-center gap-2 text-xs text-lightgray">
              <Users className="h-3 w-3" />
              <span>Your contributions help millions of developers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroUpdateTool() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-green/[0.02] to-blue/[0.03]">
        <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-green/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue/10 blur-3xl"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(16,185,129,0.05),transparent)]"></div>

        <div className="relative container mx-auto px-4 py-10 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-blue/10 to-green/10 border border-blue/20 text-blue text-sm font-bold uppercase tracking-[0.1em] mb-6 shadow-md backdrop-blur-sm">
                <span
                  className="w-2 h-2 bg-blue rounded-full mr-3"
                  aria-hidden
                ></span>
                Community Contribution Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] text-dark">
                Help Improve
                <br />
                <span className="bg-gradient-to-r from-orange to-yellow-400 bg-clip-text text-transparent">
                  Global Data
                </span>{" "}
                For Millions
              </h1>
              <p className="mt-5 text-lg md:text-xl text-darkgray/90 leading-relaxed max-w-2xl">
                Join a global community of contributors helping maintain the
                world's most accurate geographical database. Your corrections
                directly impact millions of applications and billions of users
                worldwide.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button asChild className="bg-gradient-to-r from-orange to-orange/90 hover:from-orange/90 hover:to-orange text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-6 h-12 cursor-pointer">
                  <Link href="https://manager.countrystatecity.in" target="_blank" className="cursor-pointer">
                    <Rocket className="h-5 w-5 mr-2" aria-hidden />
                    Submit First Change
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-dark text-dark hover:bg-dark hover:text-white font-semibold transition-all duration-300 px-6 h-12 bg-transparent cursor-pointer"
                >
                  <Link href="#how-it-works" className="cursor-pointer">
                    <FileText className="h-5 w-5 mr-2" aria-hidden />
                    View Process
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Database Overview */}
            <DatabaseOverview />
          </div>
        </div>
      </section>
      <div>
        <div className="h-px bg-gradient-to-r from-transparent via-light to-transparent"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-green/20 to-transparent transform translate-y-[-1px]"></div>
      </div>
    </>
  );
}
