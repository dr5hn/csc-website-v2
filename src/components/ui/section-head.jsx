import { cn } from "@/lib/utils";

// Eyebrow + H2 on the left, an optional aside on the right. Use level="h1" only
// where the section is the page's top heading.
export default function SectionHead({ eyebrow, title, children, className, titleClassName }) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-5", className)}>
      <div className="flex max-w-[640px] flex-col gap-3.5">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className={cn("display-2 m-0", titleClassName)}>{title}</h2>
      </div>
      {children && <div className="flex max-w-[420px] flex-col gap-2.5 text-[17px] leading-[1.55] text-ink-2">{children}</div>}
    </div>
  );
}
