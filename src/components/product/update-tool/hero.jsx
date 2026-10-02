"use client";

import { useEffect, useRef, useState } from "react";

import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RECORDS = [
  { label: "Fix a city", path: "cities / 133024", fields: [["name", "Mumbai"], ["state_code", "MH"], ["latitude", "19.0760"], ["longitude", "72.8777"]] },
  { label: "Fix a state", path: "states / 4008", fields: [["name", "Maharashtra"], ["iso2", "MH"], ["type", "state"], ["timezone", "Asia/Kolkata"]] },
  { label: "Add a city", path: "cities / new", fields: [["name", ""], ["state_code", "MH"], ["latitude", ""], ["longitude", ""]] },
];

const STAGES = ["Submitted", "In review", "Approved", "In release"];

// A walk-through of the contribution flow, not a real submission: nothing is sent anywhere.
// The real form lives in the Update Tool (manager.countrystatecity.in).
export default function HeroUpdateTool() {
  const [kind, setKind] = useState(0);
  const [vals, setVals] = useState({});
  const [note, setNote] = useState("");
  const [stage, setStage] = useState(0);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const R = RECORDS[kind];
  const isNew = kind === 2;
  const valueOf = (k) => vals[`${kind}:${k}`];
  const changed = R.fields.filter(([k, original]) => valueOf(k) !== undefined && valueOf(k) !== original && valueOf(k) !== "");
  const ready = changed.length > 0;

  const submit = () => {
    if (!ready) return;
    clearInterval(timer.current);
    setStage(1);
    timer.current = setInterval(() => {
      setStage((s) => {
        if (s >= 4) {
          clearInterval(timer.current);
          return s;
        }
        return s + 1;
      });
    }, 900);
  };

  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,80px)]">
      <div className="flex flex-col gap-[22px] px-2">
        <span className="self-start rounded-full border border-live-line bg-live-bg px-3.5 py-[7px] text-sm font-medium text-live-ink">Community contributions</span>
        <h1 className="display-1 m-0">Spot a wrong city? Fix it for everyone.</h1>
        <p className="lead m-0">
          Suggest a correction or add a missing place. It&apos;s reviewed in the open and ships in the next frequent release: to the
          database, the API and every package.
        </p>
        <div className="flex flex-wrap gap-3">
          <CtaLink href="https://manager.countrystatecity.in/" location="update_hero" track="update" className={buttonVariants({ size: "lg" })}>
            Submit your first change →
          </CtaLink>
          <CtaLink href="#flow" location="update_hero_flow" className={buttonVariants({ variant: "outline", size: "lg" })}>
            How review works
          </CtaLink>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2.5 rounded-[clamp(24px,3vw,32px)] bg-field p-2.5">
        <div className="flex flex-col gap-3.5 rounded-[22px] bg-white p-4">
          <div className="flex items-center justify-between gap-2.5">
            <span className="text-[15px] font-semibold">Suggest a change</span>
            <span className="font-mono text-xs text-ink-3">{R.path}</span>
          </div>
          <div role="group" aria-label="Kind of change" className="flex flex-wrap gap-1 rounded-full bg-mist p-1">
            {RECORDS.map((r, i) => (
              <button
                key={r.label}
                type="button"
                aria-pressed={i === kind}
                onClick={() => {
                  setKind(i);
                  setStage(0);
                }}
                className={cn("min-h-10 flex-1 cursor-pointer whitespace-nowrap rounded-full px-3 py-[9px] text-sm font-medium", i === kind ? "bg-blue text-white" : "text-ink-code")}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col overflow-hidden rounded-[14px] border border-line">
            {R.fields.map(([k, original], i) => {
              const v = valueOf(k) ?? original;
              const edited = v !== original && v !== "";
              return (
                <div
                  key={k}
                  className={cn(
                    "grid grid-cols-[110px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2.5 px-3 py-[9px] font-mono text-[13px]",
                    i > 0 && "border-t border-hair",
                    edited ? "bg-live-bg" : "bg-white"
                  )}
                >
                  <span className="text-ink-3">{k}</span>
                  <span className={cn("truncate", edited && !isNew ? "text-danger line-through" : "text-ink-3")}>{isNew ? "—" : original || "—"}</span>
                  <input
                    value={v}
                    aria-label={k}
                    onChange={(e) => {
                      setVals((s) => ({ ...s, [`${kind}:${k}`]: e.target.value }));
                      setStage(0);
                    }}
                    className={cn("min-w-0 rounded-lg border bg-white px-[9px] py-[7px] text-[13px] text-ink outline-none", edited ? "border-blue" : "border-line")}
                  />
                </div>
              );
            })}
          </div>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Source (e.g. a government gazetteer link)"
            aria-label="Source"
            className="rounded-xl border border-line px-3 py-[11px] text-sm text-ink outline-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <span className="text-[13px] text-ink-3">
              {ready ? `${changed.length} field${changed.length > 1 ? "s" : ""} changed${note ? " · source added" : " · add a source"}` : "Edit a field to start"}
            </span>
            <button
              type="button"
              onClick={submit}
              disabled={!ready}
              className={cn("cursor-pointer rounded-full px-[18px] py-[11px] text-sm font-semibold text-white", ready ? "bg-blue" : "bg-[#a8b4c4]")}
            >
              {stage === 0 ? "Submit for review" : stage >= 4 ? "Shipped ✓" : "Submitted"}
            </button>
          </div>
        </div>
        <div className="flex gap-1.5 px-1.5 pb-1.5" aria-live="polite">
          {STAGES.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col gap-1.5">
              <div className={cn("h-1.5 rounded-[3px] transition-colors duration-[400ms]", stage > i ? "bg-blue" : "bg-[#d6e4f3]")} />
              <span className={cn("text-xs", stage > i ? "text-ink" : "text-ink-3")}>{label}</span>
            </div>
          ))}
        </div>
        <p className="m-0 px-2 pb-1 text-xs text-ink-3">A preview of the flow. Real submissions are made in the Update Tool.</p>
      </div>
    </section>
  );
}
