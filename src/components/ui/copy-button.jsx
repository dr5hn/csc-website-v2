"use client";

import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

// Small pill used beside code. The label change is announced politely, per the
// interaction spec ("Copied" for 1.6 s).
export default function CopyButton({ text, className, label = "Copy" }) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-live="polite"
      className={cn(
        "min-h-9 shrink-0 cursor-pointer rounded-full border border-line-2 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-code hover:border-blue",
        className
      )}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
