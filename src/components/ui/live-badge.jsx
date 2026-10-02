import { cn } from "@/lib/utils";

// Pulsing dot + pill for live signals. Lime-green is reserved for live data.
export default function LiveBadge({ children, className, as: Comp = "span", ...props }) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-2.5 self-start rounded-full border border-live-line bg-live-bg px-3.5 py-[7px] text-sm font-medium text-live-ink no-underline hover:text-live-ink hover:no-underline",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="size-2 shrink-0 animate-live-pulse rounded-full bg-live" />
      {children}
    </Comp>
  );
}
