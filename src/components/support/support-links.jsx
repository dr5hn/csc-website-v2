"use client";

import CtaLink from "@/components/cta-link";
import { trackContact } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SELF_HELP = [
  ["Docs", "Guides, endpoints and examples for every channel.", "docs.countrystatecity.in", "https://docs.countrystatecity.in/"],
  ["Playground", "Try requests in the browser before writing code.", "playground.countrystatecity.in", "https://playground.countrystatecity.in/"],
  ["Status", "Uptime and incidents, updated live.", "status.countrystatecity.in", "https://status.countrystatecity.in/"],
];

const EMAILS = [
  ["API", "api@countrystatecity.in"],
  ["Export Tool", "export@countrystatecity.in"],
  ["General support", "support@countrystatecity.in"],
];

const SOCIAL = [
  ["GitHub", "Code, data and issues", "https://github.com/dr5hn/countries-states-cities-database"],
  ["LinkedIn", "@dr5hn", "https://www.linkedin.com/in/dr5hn/"],
  ["X", "@dr5hn", "https://x.com/dr5hn"],
  ["Kaggle", "Dataset mirror", "https://www.kaggle.com/datasets/darshangada/countries-states-cities-database"],
  ["data.world", "Dataset mirror", "https://data.world/dr5hn/country-state-city"],
];

export default function SupportLinks() {
  return (
    <>
      <section className="border-y border-hair bg-mist">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3 py-[clamp(56px,7vw,96px)]">
          <div className="flex flex-col gap-3 pr-3">
            <h2 className="m-0 font-cal text-[length:clamp(30px,3.4vw,44px)] font-normal leading-[1.04]">Help yourself first</h2>
            <p className="m-0 text-base leading-[1.55] text-ink-2">Most questions are answered in minutes by the docs assistant.</p>
          </div>
          {SELF_HELP.map(([t, d, u, href]) => (
            <CtaLink key={t} href={href} location={`support_selfhelp_${t.toLowerCase()}`} className="flex flex-col gap-2 rounded-[20px] border border-line bg-white p-[22px] text-ink no-underline transition-colors hover:border-blue hover:text-ink hover:no-underline">
              <span className="font-cal text-[22px]">{t}</span>
              <span className="text-[15px] leading-normal text-ink-2">{d}</span>
              <span className="mt-auto font-mono text-[13px] text-blue">{u}</span>
            </CtaLink>
          ))}
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(28px,5vw,56px)] py-[clamp(56px,7vw,96px)]">
        <div className="flex flex-col gap-3.5">
          <h2 className="display-3 m-0">All contacts</h2>
          <div className="overflow-hidden rounded-[22px] border border-line">
            {EMAILS.map(([t, v], i) => (
              <div key={t} className={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4", i > 0 && "border-t border-hair")}>
                <span className="text-[15px] font-semibold">{t}</span>
                <a href={`mailto:${v}`} onClick={() => trackContact.emailClick(t, v)} className="font-mono text-sm text-blue hover:text-blue-deep hover:underline">{v}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <h2 className="display-3 m-0">Community</h2>
          <div className="grid grid-cols-2 gap-2">
            {SOCIAL.map(([t, d, href]) => (
              <a
                key={t}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact.social(t.toLowerCase(), "contact_page")}
                className="flex flex-col gap-1 rounded-[18px] border border-line px-[18px] py-4 text-ink no-underline hover:border-blue hover:text-ink hover:no-underline"
              >
                <span className="text-[15px] font-semibold">{t}</span>
                <span className="text-[13px] text-ink-3">{d}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
