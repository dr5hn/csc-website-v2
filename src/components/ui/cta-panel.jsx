import { cn } from "@/lib/utils";

// Closing panel: heading, one line of copy and the actions. `tone="field"` is the
// default light-blue panel; `tone="live"` is the pale lime panel used for
// community and open-data calls to action.
export default function CtaPanel({ title, children, actions, tone = "field", className }) {
  return (
    <section className="wrap-flush pb-[clamp(56px,7vw,104px)]">
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-6 rounded-[clamp(24px,3vw,36px)] p-[clamp(28px,5vw,56px)]",
          tone === "field" && "bg-field",
          tone === "live" && "border border-live-line bg-live-bg",
          className
        )}
      >
        <div className="flex max-w-[640px] flex-col gap-2.5">
          <h2 className="display-3 m-0">{title}</h2>
          <p className={cn("m-0 text-[17px] leading-[1.55]", tone === "live" ? "text-live-ink" : "text-ink-2")}>
            {children}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">{actions}</div>
      </div>
    </section>
  );
}
