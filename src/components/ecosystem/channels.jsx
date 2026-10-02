"use client";

import CtaLink from "@/components/cta-link";
import Tag from "@/components/ui/tag";
import { CHANNELS, CHANNEL_GROUPS } from "@/data/ecosystem-channels";
import { useRepoStars } from "@/hooks/use-repo-stars";

export default function EcosystemChannels() {
  const { label: stars } = useRepoStars();

  return (
    <section className="border-y border-hair bg-mist">
      <div className="wrap flex flex-col gap-12 py-[clamp(56px,7vw,104px)]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="display-2 m-0 max-w-[640px]">Pick the channel that fits how you work.</h2>
          <p className="m-0 max-w-[420px] text-[17px] leading-[1.55] text-ink-2">
            Grouped by what you&apos;re trying to do. Every channel is kept in sync from one source of truth.
          </p>
        </div>
        {CHANNEL_GROUPS.map(([label, desc]) => (
          <div key={label} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-stretch gap-3">
            <div className="flex flex-col gap-1.5 py-2 pr-2">
              <span className="eyebrow">{label}</span>
              <span className="text-[15px] leading-normal text-ink-2">{desc}</span>
            </div>
            {CHANNELS.filter((c) => c.group === label).map((c) => (
              <CtaLink
                key={c.name}
                href={c.href}
                location={`ecosystem_channel_${c.name.toLowerCase().replace(/\s+/g, "_")}`}
                className="flex min-h-[180px] flex-col gap-2.5 rounded-[20px] border border-line bg-white p-[22px] text-ink no-underline transition duration-200 hover:-translate-y-0.5 hover:border-blue hover:text-ink hover:no-underline"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-cal text-[22px]">{c.name}</span>
                  {c.tag && <Tag>{c.tag === "stars" ? `★ ${stars}` : c.tag}</Tag>}
                </div>
                <span className="text-sm font-medium text-blue">{c.tagline}</span>
                <span className="text-[15px] leading-normal text-ink-2">{c.desc}</span>
                <span className="mt-auto text-sm font-semibold text-blue">Learn more →</span>
              </CtaLink>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
