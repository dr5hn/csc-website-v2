"use client";

import { useState, useRef, useEffect } from "react";
import {
  Rocket,
  Github,
  Code,
  Download,
  Users,
  Building,
  Globe,
} from "lucide-react";

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Started as a simple GitHub repository to solve the problem of scattered geographical data. Darshan Gada (@dr5hn) created the first version to help developers access structured location data easily.",
    icon: Rocket,
    accent: "blue",
    isLeft: false,
  },
  {
    year: "2020",
    title: "Open Source Growth",
    description:
      "The project gained momentum with 1,000+ GitHub stars. Community contributors started helping improve data accuracy and coverage across different regions.",
    icon: Github,
    accent: "green",
    isLeft: true,
  },
  {
    year: "2021",
    title: "API Launch",
    description:
      "Launched the first REST API to serve geographical data programmatically. Started handling 1M+ requests monthly as developers integrated the API into their applications.",
    icon: Code,
    accent: "blue",
    isLeft: false,
  },
  {
    year: "2022",
    title: "Export Tool Release",
    description:
      "Introduced the Export Tool to help developers get custom datasets in their preferred formats. Credit-based system launched to sustain the project's growth.",
    icon: Download,
    accent: "green",
    isLeft: true,
  },
  {
    year: "2023",
    title: "Community Platform",
    description:
      "Launched the Update Tool, enabling community members to contribute data improvements directly. Automated verification system ensures data quality and accuracy.",
    icon: Users,
    accent: "blue",
    isLeft: false,
  },
  {
    year: "2024",
    title: "Enterprise Scale",
    description:
      "Reached 1B+ API requests monthly. Trusted by major companies worldwide. Enhanced infrastructure with 99.9% uptime SLA and global CDN deployment.",
    icon: Building,
    accent: "green",
    isLeft: true,
  },
  {
    year: "2025",
    title: "Global Impact",
    description:
      "Serving 10,000+ developers worldwide. Complete ecosystem with 250+ countries, 5,000+ states, and 151,000+ cities. Continuing to innovate and expand.",
    icon: Globe,
    accent: "blue",
    isLeft: false,
  },
];

const TimelineItem = ({
  year,
  title,
  description,
  icon: Icon,
  accent,
  isLeft = false,
}) => {
  const isBlue = accent === "blue";
  const accentColor = isBlue
    ? "text-blue bg-blue/10"
    : "text-green bg-green/10";
  const badgeColor = isBlue
    ? "bg-blue/10 border-blue/20 text-blue"
    : "bg-green/10 border-green/20 text-green";
  const pulseColor = isBlue ? "bg-blue" : "bg-green";
  const gradientBorder = isBlue
    ? "group-hover:from-blue/30 group-hover:to-blue/10"
    : "group-hover:from-green/30 group-hover:to-green/10";
  const timelineDot = isBlue
    ? "bg-blue border-blue/20"
    : "bg-green border-green/20";
  const timelinePulse = isBlue ? "bg-blue/30" : "bg-green/30";

  return (
    <div
      className={`flex items-center mb-16 ${isLeft ? "flex-row-reverse" : ""}`}
    >
      <div className={`w-1/2 ${isLeft ? "pl-8 lg:pl-12" : "pr-8 lg:pr-12"}`}>
        <div className="group relative">
          <div
            className={`rounded-2xl p-[1px] bg-gradient-to-br from-light/50 to-transparent ${gradientBorder} transition-all duration-500`}
          >
            {/* Card surface with subtle background tint */}
            <div
              className={`rounded-[calc(1rem-1px)] backdrop-blur-sm border shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] hover:shadow-[0_1px_0_rgba(15,23,42,0.06),0_16px_40px_rgba(2,6,23,0.08)] transition-all duration-500 ${
                isBlue
                  ? "bg-white/90 border-blue/10"
                  : "bg-white/90 border-green/10"
              }`}
            >
              <div className="relative p-6 sm:p-8">
                {/* Enhanced year badge with alternating colors */}
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-sm ${badgeColor}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 animate-pulse ${pulseColor}`}
                  ></span>
                  {year}
                </div>

                {/* Icon and Title with enhanced spacing */}
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl shadow-lg group-hover:scale-110 transition-all duration-300 ${accentColor}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-dark leading-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Enhanced description */}
                <p className="text-darkgray leading-relaxed text-lg">
                  {description}
                </p>

                {/* Subtle decorative elements */}
                <div
                  className={`absolute top-6 right-6 w-2 h-2 rounded-full opacity-20 ${pulseColor}`}
                ></div>
                <div
                  className={`absolute bottom-6 left-6 w-1 h-1 rounded-full opacity-30 ${pulseColor}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced timeline dot with alternating colors */}
      <div className="relative z-10">
        <div
          className={`w-5 h-5 rounded-full shadow-xl border-4 border-white ${timelineDot}`}
        ></div>
        <div
          className={`absolute inset-0 w-5 h-5 rounded-full animate-pulse ${timelinePulse}`}
        ></div>
        {/* Subtle glow effect */}
        <div
          className={`absolute inset-[-4px] w-6 h-6 rounded-full opacity-20 blur-sm ${timelineDot}`}
        ></div>
      </div>

      <div className="w-1/2"></div>
    </div>
  );
};

export default function TimelineSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue/[0.02] to-green/[0.03] overflow-hidden">
      <div className="relative container mx-auto px-4 py-6 lg:py-12">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 ring-1 ring-light shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105"
            aria-label="Our Journey"
          >
            <span
              className="h-2 w-2 rounded-full bg-gradient-to-r from-blue to-green animate-pulse"
              aria-hidden="true"
            ></span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-darkgray">
              Our Journey
            </span>
          </div>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight">
            Building the future of{" "}
            <span className="bg-gradient-to-r from-blue via-blue to-green bg-clip-text text-transparent">
              location data
            </span>
          </h2>
          <p className="mt-4 text-xl text-darkgray max-w-3xl mx-auto leading-relaxed">
            From a simple idea to a global platform trusted by thousands of
            developers worldwide
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-px bg-light"></div>

          {milestones.map((milestone, index) => (
            <TimelineItem key={index} {...milestone} />
          ))}
        </div>
      </div>
    </section>
  );
}
