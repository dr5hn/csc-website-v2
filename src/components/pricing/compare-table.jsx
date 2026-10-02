"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

function Cell({ value }) {
  if (value === true) return <span className="text-ok" aria-label="Included">✓</span>;
  if (value === false) return <span className="text-[#a8b4c4]" aria-label="Not included">—</span>;
  return <span>{value}</span>;
}

// Collapsible feature matrix. The tier header row sticks while scrolling the table.
export default function CompareTable({ tiers, sections }) {
  const [open, setOpen] = useState(false);
  const columns = `minmax(220px,1.8fr) repeat(${tiers.length},minmax(110px,1fr))`;

  return (
    <div className="overflow-hidden rounded-3xl border border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="compare-table"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between bg-white px-[22px] py-[18px] text-[17px] font-semibold text-ink"
      >
        Compare all features
        <span aria-hidden="true" className="font-mono text-blue">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div id="compare-table" className="max-h-[70vh] overflow-auto border-t border-hair">
          <div className="min-w-[860px]">
            <div className="sticky top-0 z-10 grid bg-mist text-sm font-semibold" style={{ gridTemplateColumns: columns }}>
              <div className="px-[22px] py-3">Feature</div>
              {tiers.map((t) => (
                <div key={t.key} className="px-2 py-3 text-center">{t.name}</div>
              ))}
            </div>
            {sections.map((section) => (
              <div key={section.section}>
                <div className="border-t border-hair bg-field px-[22px] py-2 font-mono text-xs uppercase tracking-[.06em] text-ink-3">{section.section}</div>
                {section.rows.map((row) => (
                  <div key={row.label} className="grid border-t border-hair text-sm" style={{ gridTemplateColumns: columns }}>
                    <div className="px-[22px] py-3 text-ink-code">{row.label}</div>
                    {tiers.map((t) => (
                      <div key={t.key} className={cn("px-2 py-3 text-center font-mono", row.values[t.key] === true ? "text-ok" : "text-ink-code")}>
                        <Cell value={row.values[t.key]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
