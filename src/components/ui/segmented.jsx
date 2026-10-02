"use client";

import { cn } from "@/lib/utils";

// Segmented pill control. `tone="field"` is a field-blue track with a white active pill;
// `white`, `outline` and `mist` tracks use a deep-blue active pill. Buttons carry aria-pressed so the choice is exposed to
// assistive tech; use <Tabs> semantics only where there are real panels.
export default function Segmented({
  items,
  value,
  onChange,
  tone = "field",
  className,
  label,
  grow = false,
  nowrap = false,
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex gap-1 rounded-full p-1",
        nowrap ? "flex-nowrap" : "flex-wrap",
        tone === "field" && "bg-field",
        tone === "white" && "bg-white",
        tone === "outline" && "border border-line bg-white",
        tone === "mist" && "bg-mist",
        className
      )}
    >
      {items.map((item) => {
        const key = typeof item === "string" ? item : item.value;
        const text = typeof item === "string" ? item : item.label;
        const on = key === value;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(key)}
            className={cn(
              "min-h-10 cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              grow && "flex-1",
              on
                ? tone === "field"
                  ? "bg-white text-ink"
                  : "bg-blue text-white"
                : tone === "field"
                  ? "text-ink-3 hover:text-ink"
                  : "text-ink-code hover:bg-field"
            )}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}
