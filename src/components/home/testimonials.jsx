"use client";

import { useState } from "react";

import Segmented from "@/components/ui/segmented";
import { FEATURED_TESTIMONIALS, TESTIMONIAL_FILTERS } from "@/data/featured-testimonials";

export default function Testimonials() {
  const [filter, setFilter] = useState("All");
  const quotes = FEATURED_TESTIMONIALS.filter((q) => filter === "All" || q.product === filter);

  return (
    <section className="wrap flex flex-col gap-8 pb-[clamp(56px,7vw,112px)]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex max-w-[640px] flex-col gap-3.5">
          <div className="eyebrow">In production</div>
          <h2 className="display-2 m-0">What developers build with it.</h2>
        </div>
        <Segmented label="Filter by product" items={TESTIMONIAL_FILTERS} value={filter} onChange={setFilter} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
        {quotes.map((q) => (
          <figure key={q.id} className="m-0 flex flex-col gap-3.5 rounded-[20px] border border-line bg-white p-[22px]">
            <span className="self-start rounded-full bg-field px-2.5 py-1 font-mono text-xs text-blue">{q.use}</span>
            <blockquote className="m-0 text-[17px] leading-normal text-ink [text-wrap:pretty]">“{q.text}”</blockquote>
            <figcaption className="mt-auto flex items-center justify-between gap-2.5 border-t border-hair pt-3">
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[15px] font-semibold">{q.name}</span>
                <span className="text-[13px] text-ink-3">{q.org}</span>
              </span>
              <span className="whitespace-nowrap text-xs text-ink-3">{q.product}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
