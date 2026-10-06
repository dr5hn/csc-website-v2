"use client";

import { useRecentMerges } from "@/hooks/use-recent-merges";

/** Show source-linked changes and distinguish live results from the cached snapshot. */
export default function RecentMerges() {
  const { merges, live } = useRecentMerges();

  return (
    <div className="overflow-hidden rounded-3xl border border-line">
      <div className="flex items-center justify-between border-b border-hair px-5 py-4">
        <span className="font-cal text-[22px]">Recently merged</span>
        <span className="truncate font-mono text-xs text-ink-3">{live ? "live from GitHub" : "cached snapshot"}</span>
      </div>
      {merges.map((m, i) => (
        <a
          key={m.number}
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-5 py-[13px] text-ink no-underline hover:bg-mist hover:text-ink hover:no-underline ${i > 0 ? "border-t border-hair" : ""}`}
        >
          <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full border-2 border-ink bg-lime" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[15px]">{m.text}</span>
            <span className="truncate font-mono text-xs text-ink-3">
              {m.scope} · #{m.number} · {m.date}
            </span>
          </div>
          <span className="whitespace-nowrap rounded-full bg-field px-[9px] py-[3px] font-mono text-xs text-blue">{m.kind}</span>
        </a>
      ))}
    </div>
  );
}
