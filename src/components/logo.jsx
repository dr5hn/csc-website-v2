import WorldIcon from "@/icons/World";

// The globe and Cal Sans wordmark are fixed by the brand system: never recolour or redraw.
export default function Logo({ classes = "", iconSize = 32, wordmarkClass = "text-[21px]" }) {
  return (
    <div className={`flex items-center gap-2.5 ${classes}`}>
      <WorldIcon width={iconSize} height={iconSize} role="presentation" aria-label={undefined} aria-hidden="true" />
      <span className={`font-cal leading-none text-[#0f172a] whitespace-nowrap ${wordmarkClass}`}>CountryStateCity</span>
    </div>
  );
}
