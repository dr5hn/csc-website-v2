"use client";

import CtaLink from "@/components/cta-link";
import StarButton, { REPO_URL } from "@/components/star-button";
import { buttonVariants } from "@/components/ui/button";
import { useRepoStars } from "@/hooks/use-repo-stars";

export default function DatabasePanel() {
  const { label } = useRepoStars();
  const stats = [["12", "formats"], [label, "stars"], ["127", "contributors"]];

  return (
    <section id="database" className="wrap-flush pb-[clamp(56px,7vw,96px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-8 rounded-[clamp(24px,3vw,36px)] bg-field p-[clamp(28px,5vw,56px)]">
        <div className="flex flex-col gap-3.5">
          <span className="self-start rounded-full border border-live-line bg-live-bg px-3 py-[5px] text-[13px] font-semibold text-live-ink">Free forever</span>
          <h2 className="display-3 m-0">The full database, on GitHub.</h2>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-2">
            Data and packages under ODbL-1.0. Use it commercially with attribution; share adaptations under the same licence.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <CtaLink href="/product/database#formats" location="pricing_database_download" track="github" className={buttonVariants({ className: "px-[22px] py-3.5" })}>
              Download free
            </CtaLink>
            <StarButton location="pricing_database" variant="white" size="default" label="★ Star ·" className="px-[22px] py-3.5" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map(([n, l]) => (
            <div key={l} className="flex flex-col gap-1 rounded-[20px] bg-white p-[18px]">
              <span className="font-cal text-[34px]">{n}</span>
              <span className="text-sm text-ink-2">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
