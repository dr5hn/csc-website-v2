"use client";

import { useState } from "react";
import CopyButton from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

// White code block with language tabs and a copy button. Code stays light, in
// Geist Mono; there are no dark editor themes in this system.
export default function CodePanel({ tabs, className, minHeight = "min-h-[110px]", defaultTab = 0, onTabChange }) {
  const [active, setActive] = useState(defaultTab);
  const current = tabs[Math.min(active, tabs.length - 1)];

  return (
    <div className={cn("min-w-0 overflow-hidden rounded-3xl border border-line bg-white", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-hair pl-3 pr-2.5 pt-1">
        <div role="tablist" className="flex overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setActive(i);
                onTabChange?.(i);
              }}
              className={cn(
                "min-h-11 cursor-pointer whitespace-nowrap border-b-2 px-2.5 py-2.5 font-mono text-[13px]",
                i === active ? "border-blue text-ink" : "border-transparent text-ink-3 hover:text-ink"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <CopyButton text={current.code} className="mb-1" />
      </div>
      <pre
        className={cn(
          "m-0 overflow-x-auto whitespace-pre px-[18px] py-4 font-mono text-[13px] leading-[1.65] text-ink-code",
          minHeight
        )}
      >
        {current.code}
      </pre>
    </div>
  );
}
