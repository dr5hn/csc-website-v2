import { cn } from "@/lib/utils";

// Small mono chips: package kinds, plan hints, response codes, "live" markers.
const TONES = {
  field: "bg-field text-ink-3",
  blue: "bg-field text-blue",
  live: "border border-live-line bg-live-bg text-live-ink",
  ok: "bg-ok-bg text-ok",
  mist: "bg-mist text-ink-3",
  solid: "bg-blue text-white",
  lime: "bg-lime text-ink",
};

export default function Tag({ tone = "field", mono = true, className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-[9px] py-1 text-xs",
        mono && "font-mono",
        TONES[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
