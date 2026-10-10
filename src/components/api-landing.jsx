import Link from "next/link";

import CtaLink from "@/components/cta-link";
import Tag from "@/components/ui/tag";
import { buttonVariants } from "@/components/ui/button";
import { API_BASE_URL, API_KEY_HEADER } from "@/lib/api-landing-pages";

const SIBLINGS = [
  { slug: "country-api", label: "Country API", blurb: "250 countries, ISO codes, dial codes" },
  { slug: "state-api", label: "State API", blurb: "5,308 states with ISO 3166-2" },
  { slug: "city-api", label: "City API", blurb: "153,765 cities with coordinates" },
];

/**
 * Renders one resource landing page: country, state or city.
 *
 * Every section is driven by the data in lib/api-landing-pages.js, so the three
 * pages stay genuinely different. They list different endpoints, different
 * fields and different examples rather than one template with the nouns
 * swapped.
 *
 * @param {{page: object}} props - The resource description to render.
 */
export default function ApiLanding({ page }) {
  const siblings = SIBLINGS.filter((s) => s.slug !== page.slug);

  return (
    <>
      <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,80px)]">
        <div className="flex flex-col gap-[22px] px-2">
          <span className="eyebrow">{page.eyebrow}</span>
          <h1 className="display-1 m-0">{page.headline}</h1>
          <p className="lead m-0">{page.summary}</p>

          <div className="flex flex-wrap gap-3">
            <CtaLink
              href={`https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=${page.slug}_hero`}
              location={`${page.slug}_hero`}
              track="api"
              className={buttonVariants({ size: "lg" })}
            >
              Get free API key →
            </CtaLink>
            <CtaLink
              href="https://docs.countrystatecity.in/api/introduction"
              location={`${page.slug}_hero_docs`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Read the docs
            </CtaLink>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-hair pt-2.5 text-[15px] text-ink-3">
            <div>
              <b className="font-semibold text-ink">{page.count}</b> {page.countLabel}
            </div>
            <div>
              <b className="font-semibold text-ink">{page.fieldCount}</b> fields per record
            </div>
            <div>
              <b className="font-semibold text-ink">3,000</b> free requests / mo
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2.5 rounded-[clamp(24px,3vw,32px)] bg-field p-2.5">
          <div className="flex items-center justify-between gap-2 px-3 pt-2">
            <span className="font-mono text-[12.5px] text-ink-3">Request</span>
            <Tag className="text-[11.5px]">200 OK</Tag>
          </div>
          <pre className="m-0 overflow-x-auto rounded-[20px] bg-white p-[18px] font-mono text-[12.5px] leading-[1.6] text-ink-code">
            {page.sampleRequest}
          </pre>
          <span className="px-3 font-mono text-[12.5px] text-ink-3">Response</span>
          <pre className="m-0 overflow-x-auto rounded-[20px] bg-white p-[18px] font-mono text-[12.5px] leading-[1.6] text-ink-code">
            {page.sampleResponse}
          </pre>
        </div>
      </section>

      <section className="border-y border-hair bg-mist">
        <div className="wrap flex flex-col gap-9 section-y">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="display-2 m-0 max-w-[640px]">Endpoints</h2>
            <p className="m-0 max-w-[460px] text-[17px] leading-[1.55] text-ink-2">
              Every path below is live on <code className="font-mono text-blue">{API_BASE_URL}</code>{" "}
              and takes your key in the{" "}
              <code className="font-mono text-blue">{API_KEY_HEADER}</code> header.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-3">
            {page.endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-[22px]"
              >
                <Tag className="w-fit text-[11.5px]">{endpoint.method}</Tag>
                <span className="font-mono text-[13px] break-all text-blue">{endpoint.path}</span>
                <span className="text-[15px] leading-normal text-ink-2">{endpoint.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap flex flex-col gap-9 section-y">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="display-2 m-0 max-w-[640px]">
            {page.fieldCount} fields on every {page.resource.toLowerCase()}.
          </h2>
          <p className="m-0 max-w-[420px] text-[17px] leading-[1.55] text-ink-2">
            Take them all, or name the ones you want with{" "}
            <code className="font-mono text-blue">?fields=</code> and keep the response small.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-x-8 gap-y-0">
          {page.fields.map((field) => (
            <div key={field.name} className="flex items-baseline gap-3 border-b border-hair py-2.5">
              <code className="shrink-0 font-mono text-[13px] text-blue">{field.name}</code>
              <span className="text-[14px] leading-normal text-ink-2">{field.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-hair bg-mist">
        <div className="wrap flex flex-col gap-9 section-y">
          <h2 className="display-2 m-0 max-w-[640px]">What people build with it.</h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-3 p-0">
            {page.useCases.map((useCase) => (
              <li
                key={useCase}
                className="rounded-[20px] border border-line bg-white p-[22px] text-[15px] leading-[1.55] text-ink-2"
              >
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap flex flex-col gap-9 section-y">
        <h2 className="display-2 m-0 max-w-[640px]">Questions.</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-x-10 gap-y-7">
          {page.faqs.map((faq) => (
            <div key={faq.q} className="flex flex-col gap-2">
              <h3 className="m-0 font-cal text-[22px] font-normal">{faq.q}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-ink-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-hair bg-mist">
        <div className="wrap flex flex-col gap-6 section-y">
          <h2 className="display-3 m-0">The rest of the hierarchy.</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-3">
            {siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/${sibling.slug}`}
                className="flex flex-col gap-1.5 rounded-[20px] border border-line bg-white p-[22px] no-underline hover:border-blue hover:no-underline"
              >
                <span className="font-cal text-[22px] text-ink">{sibling.label} →</span>
                <span className="text-[15px] leading-normal text-ink-2">{sibling.blurb}</span>
              </Link>
            ))}
            <Link
              href="/product/database"
              className="flex flex-col gap-1.5 rounded-[20px] border border-line bg-white p-[22px] no-underline hover:border-blue hover:no-underline"
            >
              <span className="font-cal text-[22px] text-ink">Offline database →</span>
              <span className="text-[15px] leading-normal text-ink-2">
                The same data as SQL, JSON, CSV and more
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
