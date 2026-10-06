"use client";

import DataSources from "@/components/data-sources";
import { useState } from "react";

import Link from "next/link";

import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import { FAQS } from "@/data/faqs";
import { cn } from "@/lib/utils";

const sentence = (text) => (text.charAt(0) + text.slice(1).toLowerCase()).replace(/\bapi\b/gi, "API");

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

const HELP = [
  { t: "Contact support", d: "Route your question to the right team.", href: "/contact" },
  { t: "GitHub Discussions", d: "Ask the community.", href: "https://github.com/dr5hn/countries-states-cities-database/discussions" },
  { t: "Documentation", d: "Guides and endpoint reference.", href: "https://docs.countrystatecity.in/" },
];

// Search filters as you type across question and answer; one item is open at a time.
export default function FaqBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(FAQS[0].id);

  const q = query.trim().toLowerCase();
  const items = FAQS.filter((f) => (category === "All" || f.category === category) && (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q)));

  return (
    <section className="mx-auto flex max-w-[calc(920px+2*clamp(20px,4vw,40px))] flex-col gap-6 px-[clamp(20px,4vw,40px)] pb-[clamp(56px,7vw,96px)] pt-[clamp(40px,6vw,80px)]">
      <div className="eyebrow">Help centre</div>
      <h1 className="m-0 font-cal text-[length:clamp(40px,5.6vw,72px)] font-normal leading-[.98] tracking-[-.02em]">Frequently asked questions</h1>
      <div className="flex items-center gap-2.5 rounded-full border-2 border-ink py-1.5 pl-5 pr-1.5">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(-1);
          }}
          type="search"
          placeholder="Search questions, e.g. rate limit"
          aria-label="Search FAQs"
          className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-lg text-ink outline-none"
        />
        <CtaLink
          href="https://docs.countrystatecity.in/"
          location="faq_docs_assistant"
          className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
        >
          Ask the docs assistant
        </CtaLink>
      </div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setOpen(-1);
            }}
            className={cn(
              "min-h-10 cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium",
              category === c ? "border-blue bg-blue text-white" : "border-line-2 bg-white text-ink-code"
            )}
          >
            {sentence(c)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {items.map((f) => {
          const on = open === f.id;
          return (
            <div key={f.id} className={cn("overflow-hidden rounded-[18px] border bg-white", on ? "border-blue" : "border-line")}>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`faq-answer-${f.id}`}
                onClick={() => setOpen(on ? -1 : f.id)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-[18px] text-left"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-mono text-[11.5px] uppercase tracking-[.06em] text-ink-3">{f.category}</span>
                  <span className="text-[17px] font-semibold text-ink">{f.question}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 font-mono text-lg text-blue">{on ? "−" : "+"}</span>
              </button>
              <div id={`faq-answer-${f.id}`} hidden={!on} className="px-5 pb-5 text-base leading-[1.6] text-ink-2">{f.answer}</div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="rounded-[18px] border-[1.5px] border-dashed border-edge p-6 text-base text-ink-2">
            No matching question. Try the docs assistant, or <Link href="/contact" className="text-blue hover:text-blue-deep hover:underline">contact support</Link>.
          </div>
        )}
      </div>
      <DataSources />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-2.5 pt-4">
        {HELP.map((h) => (
          <CtaLink key={h.t} href={h.href} location={`faq_help_${h.t.toLowerCase().replace(/\s+/g, "_")}`} className="flex flex-col gap-1.5 rounded-[20px] bg-field p-5 text-ink no-underline hover:text-ink hover:no-underline">
            <span className="font-cal text-xl">{h.t}</span>
            <span className="text-sm text-ink-2">{h.d}</span>
          </CtaLink>
        ))}
      </div>
    </section>
  );
}
