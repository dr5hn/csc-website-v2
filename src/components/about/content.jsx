import CtaLink from "@/components/cta-link";
import { REPO_URL } from "@/components/star-button";
import { buttonVariants } from "@/components/ui/button";
import CtaPanel from "@/components/ui/cta-panel";

const VALUES = [
  ["Community-owned", "The data is open under ODbL-1.0 and improved by the people who use it."],
  ["Developer empathy", "Real examples, stable IDs and docs that respect your time."],
  ["Global by default", "Every country, in every format, with translations."],
  ["Trust and reliability", "Public releases, source-linked corrections and a public API status page."],
];

const LINKS = [
  ["GitHub", "https://github.com/dr5hn"],
  ["LinkedIn", "https://www.linkedin.com/in/dr5hn/"],
  ["X", "https://x.com/dr5hn"],
];

export function AboutIntro() {
  return (
    <section className="wrap flex flex-col gap-[22px] pb-[clamp(40px,5vw,72px)] pt-[clamp(40px,6vw,88px)]">
      <div className="eyebrow">About · since 2018</div>
      <h1 className="m-0 max-w-[1000px] font-cal text-[length:clamp(44px,6.4vw,92px)] font-normal leading-[.95] tracking-[-.025em] [text-wrap:balance]">
        Open geographic data, maintained with the community.
      </h1>
      <p className="lead m-0 max-w-[720px]">
        CountryStateCity is open geographic data, built and maintained by one founder and a community of contributors. The goal
        hasn&apos;t changed: nobody should have to hand-collect a list of cities again.
      </p>
    </section>
  );
}

/** Founder details without an unpublished portrait placeholder. */
export function AboutFounder() {
  return (
    <section className="border-y border-hair bg-mist">
      <div className="wrap max-w-[900px] gap-[clamp(28px,5vw,64px)] py-[clamp(56px,7vw,104px)]">
        <div className="flex flex-col gap-[18px]">
          <div className="eyebrow">The founder</div>
          <h2 className="display-2 m-0">Darshan Gada</h2>
          <p className="m-0 text-lg leading-[1.6] text-ink-code [text-wrap:pretty]">
            Darshan started the database in 2018 when he couldn&apos;t find a clean, free list of countries, states and cities. He still
            reviews contributions, runs the API and answers support email himself.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {LINKS.map(([t, href]) => (
              <CtaLink key={t} href={href} location={`about_founder_${t.toLowerCase()}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                {t}
              </CtaLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutValues() {
  return (
    <section className="wrap flex flex-col gap-8 py-[clamp(56px,7vw,104px)]">
      <h2 className="m-0 max-w-[900px] font-cal text-[length:clamp(34px,4.4vw,60px)] font-normal leading-none tracking-[-.02em] [text-wrap:balance]">
        Location data should be <span className="text-blue">open, accurate and boring to use.</span>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3">
        {VALUES.map(([t, d]) => (
          <div key={t} className="flex flex-col gap-2 rounded-[20px] border border-line p-[22px]">
            <span className="font-cal text-[22px]">{t}</span>
            <span className="text-[15px] leading-normal text-ink-2">{d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutCta() {
  return (
    <CtaPanel
      tone="live"
      title="Help build what's next."
      actions={
        <>
          <CtaLink href={REPO_URL} location="about_cta_star" track="github" className={buttonVariants({ variant: "ink" })}>
            ★ Star on GitHub
          </CtaLink>
          <CtaLink href="/product/update-tool" location="about_cta_contribute" track="update" className={buttonVariants({ variant: "white" })}>
            Contribute a fix
          </CtaLink>
        </>
      }
    >
      Next up: framework integrations, AI-agent tooling and more premium endpoints. Star the repo, fix a record or sponsor the work.
    </CtaPanel>
  );
}
