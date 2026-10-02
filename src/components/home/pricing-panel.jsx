"use client";

import CtaLink from "@/components/cta-link";
import { REPO_URL } from "@/components/star-button";
import { buttonVariants } from "@/components/ui/button";
import { useRepoStars } from "@/hooks/use-repo-stars";

export default function PricingPanel() {
  const { label } = useRepoStars();

  return (
    <section id="pricing" className="wrap-flush pb-[clamp(56px,7vw,112px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-8 rounded-[clamp(24px,3vw,36px)] bg-field p-[clamp(28px,5vw,64px)]">
        <div className="flex flex-col gap-4">
          <h2 className="m-0 font-cal text-[length:clamp(32px,3.6vw,48px)] font-normal leading-[1.04] tracking-[-.015em]">
            Free to start. Open forever.
          </h2>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-2">
            The database is open under ODbL-1.0. The API gives you 3,000 free requests a month; paid plans start at $5 and add
            search, GraphQL and the change feed.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaLink
              href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=home_pricing"
              location="home_pricing"
              track="api"
              className={buttonVariants({ size: "default", className: "text-[17px]" })}
            >
              Get free API key →
            </CtaLink>
            <CtaLink href="/pricing" location="home_pricing_plans" className={buttonVariants({ variant: "white", className: "text-[17px]" })}>
              See pricing
            </CtaLink>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 rounded-[22px] bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="font-cal text-[22px]">Open source</div>
            <CtaLink href={REPO_URL} location="home_pricing_github" track="github" className="font-mono text-sm">
              ★ {label} on GitHub
            </CtaLink>
          </div>
          <div className="text-[15px] leading-[1.55] text-ink-2">
            Found a missing city or a wrong state code? Suggest a fix with the Update Tool; it&apos;s reviewed and merged into the
            next release.
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-mist px-3.5 py-3 font-mono text-[13px] text-ink-code">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full border-[1.5px] border-ink bg-lime" />
            <span className="truncate">Reviewed in the open · ships monthly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
