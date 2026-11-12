import CtaLink from "@/components/cta-link";
import Tag from "@/components/ui/tag";
import { buttonVariants } from "@/components/ui/button";
import { NPM_PACKAGES, NPM_FAQS } from "@/lib/npm-packages";

const CHOICES = [
  {
    t: "Reach for a package when",
    points: [
      "a bundled data package can satisfy offline requirements",
      "a dropdown should open with no round trip",
      "you can redeploy to pick up a data correction",
    ],
  },
  {
    t: "Reach for the API when",
    points: [
      "you want the data currently served by the API",
      "you want fuzzy search, autocomplete or nearby lookups",
      "bundle size matters more than one request",
    ],
  },
];

/**
 * Renders the official npm packages page.
 *
 * Covers bundled data, CDN snapshots and live API clients under one scope.
 */
export default function NpmPackagesLanding() {
  return (
    <>
      <section className="wrap flex flex-col gap-[22px] pb-[clamp(40px,5vw,72px)] pt-[clamp(40px,6vw,80px)]">
        <span className="eyebrow">Official npm packages</span>
        <h1 className="display-1 m-0 max-w-[900px]">Geographic data, straight from npm.</h1>
        <p className="lead m-0 max-w-[720px]">
          {NPM_PACKAGES.length} official packages under the <code className="font-mono text-blue">@countrystatecity</code>{" "}
          scope. Choose bundled data for offline use, CDN-loaded snapshots for lazy loading,
          or the SDK and CLI for authenticated API access.
        </p>
        <pre className="m-0 w-fit max-w-full overflow-x-auto rounded-[20px] bg-field px-[22px] py-4 font-mono text-[13.5px] text-ink-code">
          npm install @countrystatecity/countries
        </pre>
      </section>

      <section className="border-y border-hair bg-mist">
        <div className="wrap flex flex-col gap-9 section-y">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="display-2 m-0 max-w-[640px]">The packages.</h2>
            <p className="m-0 max-w-[440px] text-[17px] leading-[1.55] text-ink-2">
              Install the slice you need: a phone input can use dial codes without bundling the full city dataset.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-3">
            {NPM_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-[22px]"
              >
                <a
                  href={`https://www.npmjs.com/package/${pkg.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] break-all text-blue no-underline hover:underline"
                >
                  {pkg.name}
                </a>
                <span className="text-[15px] leading-normal text-ink-2">{pkg.description}</span>
                <pre className="m-0 mt-auto overflow-x-auto rounded-[14px] bg-field px-3.5 py-2.5 font-mono text-[12px] text-ink-code">
                  npm i {pkg.name}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap flex flex-col gap-9 section-y">
        <h2 className="display-2 m-0 max-w-[640px]">Package or API?</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-3">
          {CHOICES.map((choice) => (
            <div
              key={choice.t}
              className="flex flex-col gap-3 rounded-[20px] border border-line bg-white p-[22px]"
            >
              <span className="font-cal text-[22px]">{choice.t}</span>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {choice.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[15px] leading-normal text-ink-2">
                    <span aria-hidden className="text-blue">
                      —
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaLink
            href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=npm_packages"
            location="npm_packages"
            track="api"
            className={buttonVariants({ size: "lg" })}
          >
            Get free API key →
          </CtaLink>
          <CtaLink
            href="https://docs.countrystatecity.in/api/sdks"
            location="npm_packages_docs"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Read the SDK docs
          </CtaLink>
        </div>
      </section>

      <section className="border-y border-hair bg-mist">
        <div className="wrap flex flex-col gap-9 section-y">
          <h2 className="display-2 m-0 max-w-[640px]">Questions.</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-x-10 gap-y-7">
            {NPM_FAQS.map((faq) => (
              <div key={faq.q} className="flex flex-col gap-2">
                <h3 className="m-0 font-cal text-[22px] font-normal">{faq.q}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-ink-2">{faq.a}</p>
              </div>
            ))}
          </div>
          <Tag className="w-fit max-w-full whitespace-normal text-[11.5px]">Data under ODbL, free to use with attribution</Tag>
        </div>
      </section>
    </>
  );
}
