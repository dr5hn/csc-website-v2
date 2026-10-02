"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// GitHub stars by year, from the project's history; the last bar is the current state.
const TIMELINE = [
  ["2018", 0, "The beginning", "A single open dataset of countries, states and cities, published on GitHub."],
  ["2019", 100, "Open-source growth", "The first 100 stars and the first outside contributors."],
  ["2020", 500, "Database restructure", "Linked IDs across countries, states and cities, so every city knows its parents."],
  ["2021", 1000, "API launch", "The hosted REST API goes live with a free tier."],
  ["2022", 3000, "Multi-format distribution", "The data ships in SQL, JSON, CSV, XML, YAML and more."],
  ["2023", 5000, "Automation and reach", "Automated releases; the dataset is published on Kaggle and data.world."],
  ["2024", 7000, "Community platform", "The Update Tool lets anyone suggest and track corrections."],
  ["2025", 8000, "Export Tool and dashboard", "Custom exports with credits, and an API dashboard for keys and usage."],
  ["2026", 9000, "Ecosystem expansion", "Nine channels, 50M+ monthly requests, 50,000+ developers and 9K+ stars."],
];

const MAX_STARS = 9000;

export default function AboutTimeline() {
  const [selected, setSelected] = useState(TIMELINE.length - 1);
  const [year, , title, desc] = TIMELINE[selected];
  const width = 100 / TIMELINE.length;

  return (
    <section className="wrap-flush pb-[clamp(56px,7vw,104px)]">
      <div className="flex flex-col gap-5 rounded-[clamp(24px,3vw,36px)] bg-field p-[clamp(20px,3vw,40px)]">
        <div className="flex flex-wrap items-end justify-between gap-3.5">
          <h2 className="m-0 font-cal text-[length:clamp(28px,3vw,40px)] font-normal">Our journey</h2>
          <span className="font-mono text-[13px] text-ink-2">GitHub stars · click a year</span>
        </div>
        <div className="rounded-[22px] bg-white px-[18px] pb-2.5 pt-[18px]">
          <div className="relative h-[clamp(150px,18vw,220px)]">
            {TIMELINE.map(([y, stars], i) => {
              const on = i === selected;
              return (
                <button
                  key={y}
                  type="button"
                  aria-label={`${y}${stars ? `, ${stars.toLocaleString("en-US")} stars` : ""}`}
                  aria-pressed={on}
                  onClick={() => setSelected(i)}
                  className="absolute bottom-0 flex h-full cursor-pointer flex-col items-center justify-end gap-1.5 p-0"
                  style={{ left: `${i * width}%`, width: `${width}%` }}
                >
                  <span className={cn("whitespace-nowrap font-mono text-[11px]", on ? "text-ink" : "text-ink-3")}>
                    {stars ? (stars >= 1000 ? `${stars / 1000}K` : stars) : "—"}
                  </span>
                  <span
                    className={cn("w-[70%] rounded-t-lg rounded-b-[3px] transition-colors", on ? "bg-blue" : "bg-[#bbd8f6]")}
                    style={{ height: `${Math.max(4, (stars / MAX_STARS) * 82)}%` }}
                  />
                </button>
              );
            })}
          </div>
          <div className="relative mt-1.5 h-7 border-t border-hair">
            {TIMELINE.map(([y], i) => (
              <span
                key={y}
                aria-hidden="true"
                className={cn("absolute top-2 text-center font-mono text-xs", i === selected ? "text-blue" : "text-ink-3")}
                style={{ left: `${i * width}%`, width: `${width}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 rounded-[22px] bg-white p-[clamp(18px,2.4vw,28px)]" aria-live="polite">
          <span className="row-span-2 font-cal text-[length:clamp(40px,5vw,64px)] leading-none text-blue">{year}</span>
          <span className="font-cal text-[length:clamp(22px,2.4vw,30px)]">{title}</span>
          <span className="text-base leading-normal text-ink-2">{desc}</span>
        </div>
      </div>
    </section>
  );
}
