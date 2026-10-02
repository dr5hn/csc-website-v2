"use client";

import { useEffect, useState } from "react";

import ApiPlans from "@/components/pricing/api-plans";
import DatabasePanel from "@/components/pricing/database-panel";
import ExportPacks from "@/components/pricing/export-packs";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "api", label: "API", hint: "from $0", q: "Calling data live from your app or backend." },
  { id: "export", label: "Export Tool", hint: "5 free credits", q: "Want a custom file with only the fields you need." },
  { id: "database", label: "Database", hint: "free forever", q: "Happy to self-host the full open dataset." },
];

const fromHash = () => {
  const id = window.location.hash.slice(1);
  return TABS.some((t) => t.id === id) ? id : null;
};

// Product chooser that doubles as the tab list. The tab lives in the URL hash so links are
// shareable and the back button restores it (interaction spec 2).
export default function PricingTabs() {
  const [tab, setTab] = useState("api");

  useEffect(() => {
    const sync = () => setTab(fromHash() ?? "api");
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const choose = (id) => {
    setTab(id);
    if (fromHash() !== id) window.history.pushState(null, "", `#${id}`);
  };

  return (
    <>
      <div className="wrap flex flex-col gap-3 pb-[clamp(28px,4vw,48px)]">
        <div className="text-[15px] font-semibold" id="pricing-chooser">Which do you need?</div>
        {/* One set of tab buttons: a compact pill row on phones, product cards from 640px up. */}
        <div
          role="tablist"
          aria-labelledby="pricing-chooser"
          className="flex gap-1 rounded-full bg-field p-1 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] sm:gap-2.5 sm:rounded-none sm:bg-transparent sm:p-0"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              tabIndex={tab === t.id ? 0 : -1}
              onKeyDown={(event) => {
                const index = TABS.findIndex((item) => item.id === tab);
                const next = { ArrowRight: (index + 1) % TABS.length, ArrowLeft: (index + TABS.length - 1) % TABS.length, Home: 0, End: TABS.length - 1 }[event.key];
                if (next === undefined) return;
                event.preventDefault();
                choose(TABS[next].id);
                document.getElementById(`tab-${TABS[next].id}`)?.focus();
              }}
              aria-controls={`panel-${t.id}`}
              onClick={() => choose(t.id)}
              className={cn(
                "flex min-h-10 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] border-transparent px-3 py-2 text-center transition-colors",
                "sm:min-h-0 sm:flex-none sm:items-stretch sm:justify-start sm:whitespace-normal sm:rounded-[20px] sm:px-5 sm:py-[18px] sm:text-left",
                tab === t.id ? "bg-white sm:border-blue sm:bg-field" : "bg-transparent sm:border-line sm:bg-white"
              )}
            >
              <span className="flex items-center justify-between gap-2.5">
                <span className={cn("text-sm font-medium sm:font-cal sm:text-[22px] sm:font-normal", tab === t.id ? "text-ink" : "text-ink-3 sm:text-ink")}>{t.label}</span>
                <span className="hidden whitespace-nowrap font-mono text-xs text-blue sm:inline">{t.hint}</span>
              </span>
              <span className="hidden text-[15px] leading-[1.45] text-ink-2 sm:block">{t.q}</span>
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "api" && <ApiPlans />}
        {tab === "export" && <ExportPacks />}
        {tab === "database" && <DatabasePanel />}
      </div>
    </>
  );
}
