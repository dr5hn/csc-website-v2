"use client";

import { useState } from "react";

import CtaLink from "@/components/cta-link";
import StarButton from "@/components/star-button";
import { buttonVariants } from "@/components/ui/button";
import Segmented from "@/components/ui/segmented";
import { CHANNELS } from "@/data/ecosystem-channels";
import { useRepoStars } from "@/hooks/use-repo-stars";
import { cn } from "@/lib/utils";

const GROUP_FILTERS = ["All", "Build", "Data", "Explore", "Community"];

export default function EcosystemHero() {
  const [group, setGroup] = useState("All");
  const [selected, setSelected] = useState(1);
  const sel = CHANNELS[selected];
  const { label: stars } = useRepoStars();

  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,80px)]">
      <div className="flex flex-col gap-[22px] px-2">
        <div className="eyebrow">Ecosystem</div>
        <h1 className="display-1 m-0">
          One dataset.
          <br />
          Nine ways to use it.
        </h1>
        <p className="lead m-0">
          Every channel is built from the same open database, with the same IDs. Start with one, switch or combine later without
          remapping anything.
        </p>
        <div className="flex flex-wrap gap-3">
          <CtaLink href="https://playground.countrystatecity.in/" location="ecosystem_hero" track="api" className={buttonVariants({ size: "lg" })}>
            Try the API →
          </CtaLink>
          <StarButton location="ecosystem_hero" label="Explore on GitHub ★" />
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 rounded-[clamp(24px,3vw,32px)] bg-field p-[clamp(14px,2vw,22px)]">
        <Segmented label="Channel group" tone="white" items={GROUP_FILTERS} value={group} onChange={setGroup} className="self-start" />
        <div className="grid grid-cols-3 gap-2">
          {CHANNELS.map((c, i) => {
            const on = i === selected;
            const dim = group !== "All" && c.group !== group;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(i)}
                className={cn(
                  "flex min-h-[84px] cursor-pointer flex-col justify-between gap-1.5 rounded-[18px] border-[1.5px] p-3 text-left transition",
                  on ? "border-blue bg-blue" : "border-transparent bg-white",
                  dim && "opacity-35"
                )}
              >
                <span className={cn("font-mono text-[11px] uppercase tracking-[.06em]", on ? "text-[#dcebfb]" : "text-ink-3")}>{c.group}</span>
                <span className={cn("font-cal text-[length:clamp(15px,1.4vw,19px)] leading-[1.1]", on ? "text-white" : "text-ink")}>{c.name}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-[18px] bg-white px-4 py-3.5">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="font-cal text-xl">{sel.name}</span>
            <span className="text-sm text-ink-2">{sel.tagline}</span>
          </div>
          <span className="max-w-full truncate font-mono text-[13px] text-blue">{sel.tag === "stars" ? `★ ${stars}` : sel.cmd}</span>
        </div>
      </div>
    </section>
  );
}
