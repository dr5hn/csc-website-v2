import { readFile } from "node:fs/promises";
import { join } from "node:path";
import Link from "next/link";
import DropdownDemo from "@/components/guides/dropdown-demo";
import CopyButton from "@/components/ui/copy-button";
import JsonLd from "@/components/json-ld";
import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";

const PATH = "/guides/react-country-state-city-dropdown/";
const TITLE = "Country, State and City Dropdown in React";
const DESCRIPTION = "Build a dependent React location dropdown with a working demo, downloadable code, loading and retry states, stale-response protection and Next.js instructions.";
const DATE = "2026-11-12";
const FAQS = [
  { q: "Does this React dropdown need an API key?", a: "No. This example uses @countrystatecity/countries-browser, which fetches versioned JSON from jsDelivr. It requires a network connection to load data. It does not call the authenticated CSC API or consume an API request quota." },
  { q: "Can I use this in Next.js?", a: "Yes. Keep the use client directive in LocationDropdown.jsx, install the package, and render the component from an App Router page. Lists load in the browser after the component mounts; this is not server-side location search." },
  { q: "Why do state and city selections reset?", a: "A city belongs to a particular country and, when present, a state. Changing the country clears both dependent selections; changing the state clears the city. Keyed list components and Effect cleanup prevent late responses from restoring an old selection's options." },
  { q: "Is the dropdown an address validator?", a: "No. Selecting a listed place does not verify a street address, postcode or delivery destination. Coverage and administrative levels vary; provide a manual-entry path when the right place is missing." },
];
const LINK = "text-blue underline underline-offset-4 hover:text-blue-deep";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}`, type: "article", publishedTime: DATE, modifiedTime: DATE, images: [{ url: "/og/api.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og/api.png"] },
};

/** Publish the exact demo component as readable, copyable and downloadable guide code. */
export default async function ReactDropdownGuide() {
  const source = await readFile(join(process.cwd(), "public/examples/react-location-dropdown.jsx"), "utf8");
  return (
    <article className="wrap flex max-w-[1040px] flex-col gap-10 pb-[clamp(56px,7vw,104px)] pt-[clamp(40px,6vw,80px)] [&_p_code]:break-all [&_li_code]:break-all [&_section]:scroll-mt-32">
      <JsonLd data={breadcrumbSchema([{ name: TITLE, path: PATH }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: TITLE, description: DESCRIPTION, datePublished: DATE, dateModified: DATE, mainEntityOfPage: `${SITE_URL}${PATH}`, author: { "@type": "Organization", name: "CSC Database", url: SITE_URL }, publisher: { "@type": "Organization", name: "CSC Database", url: SITE_URL } }} />
      <JsonLd data={faqSchema(FAQS)} />
      <header className="flex flex-col gap-5">
        <span className="eyebrow">Implementation guide · React / Next.js</span>
        <h1 className="display-1 m-0">Country, state and city dropdown in React.</h1>
        <p className="lead m-0">Load countries first, states after a country is selected, and cities after a state is selected. Clear dependent values when a parent changes, and ignore late responses. This guide includes the component running in the demo.</p>
        <p className="m-0 text-sm text-ink-3">Tested <time dateTime={DATE}>12 November 2026</time> with <code>@countrystatecity/countries-browser@3.0.1</code>, using dataset <code>v5.2.0-export.1</code>. Uses a CDN snapshot; no API key required.</p>
        <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[['demo', 'Try the demo'], ['install', 'Install'], ['component', 'Copy the component'], ['nextjs', 'Next.js setup'], ['edge-cases', 'Handle edge cases'], ['package-or-api', 'Package or API?']].map(([id, label]) => <a key={id} href={`#${id}`} className={LINK}>{label}</a>)}
        </nav>
      </header>

      <section id="demo" className="flex flex-col gap-4">
        <h2 className="display-3 m-0">Try the dependent dropdown.</h2>
        <DropdownDemo />
        <p className="m-0 text-sm leading-normal text-ink-3">The demo uses the published package. Returned data depends on the package snapshot. A place can be absent, renamed or classified differently from the needs of your application.</p>
      </section>

      <section id="install" className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">1. Install the browser package.</h2>
        <pre className="m-0 overflow-x-auto rounded-[20px] bg-field p-5 font-mono text-sm text-ink-code"><code>npm install @countrystatecity/countries-browser@3.0.1</code></pre>
        <p className="m-0">Use React 18 or newer. This guide pins the tested package version. The browser package loads JSON from jsDelivr on demand and caches responses in memory. It does not bundle the entire city dataset into your initial page, and it needs network access when data is first loaded. Review package release notes before upgrading.</p>
      </section>

      <section id="component" className="flex min-w-0 flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">2. Add the React component.</h2>
        <p className="m-0">The file below is the exact component used above. Native labels, selects and buttons work without a UI library. Apply your own CSS to match your application.</p>
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton text={source} label="Copy React component" />
          <a href="/examples/react-location-dropdown.jsx" download="LocationDropdown.jsx" className={LINK}>Download LocationDropdown.jsx</a>
        </div>
        <details className="min-w-0 rounded-[20px] bg-field p-5">
          <summary className="cursor-pointer font-semibold text-ink">View the complete React component</summary>
          <pre tabIndex={0} aria-label="React component source" className="mb-0 max-h-[620px] overflow-auto font-mono text-[12.5px] leading-[1.65] text-ink-code"><code>{source}</code></pre>
        </details>
        <p className="m-0">For a React application, import and render <code>LocationDropdown</code> inside your page or form. Once a city is selected, the example displays its numeric ID with the country and state codes. Validate submitted values and their parent relationships on your server before storing them.</p>
      </section>

      <section id="nextjs" className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">3. Use it in Next.js App Router.</h2>
        <p className="m-0">Save the downloaded component as <code>app/components/LocationDropdown.jsx</code>. Keep its <code>&quot;use client&quot;</code> directive. Your page can remain a Server Component:</p>
        <pre className="m-0 overflow-x-auto rounded-[20px] bg-field p-5 font-mono text-sm text-ink-code"><code>{`// app/page.jsx\nimport LocationDropdown from "./components/LocationDropdown";\n\nexport default function Page() {\n  return <LocationDropdown />;\n}`}</code></pre>
        <p className="m-0">The country list loads in an Effect after the component mounts. In React development Strict Mode, an Effect may run an extra setup/cleanup cycle. Cleanup ignores obsolete results; it does not cancel network requests already started by the package.</p>
      </section>

      <section id="edge-cases" className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">Handle the cases a basic example misses.</h2>
        <ul className="m-0 flex flex-col gap-3 pl-6">
          <li><strong className="text-ink">Changing parents:</strong> country changes clear state and city; state changes clear city. Keyed child components start with empty options so cities from the previous country cannot remain selectable.</li>
          <li><strong className="text-ink">Slow responses:</strong> Effect cleanup ignores old results after a list unmounts. This matters when someone changes countries before the first request finishes.</li>
          <li><strong className="text-ink">Empty lists and CDN errors:</strong> in version 3.0.1, the state and city helpers can return an empty array after a fetch failure. An empty list is not proof that the location has no states or cities. Retry clears the package cache before requesting data again. Offer a manual-entry path in your application.</li>
          <li><strong className="text-ink">Cities with no state:</strong> the unassigned option calls <code>getCitiesOfState(countryCode, null)</code>. It checks the country-level city file in the package. Some countries have no such file or no returned records; the result can be empty. Map the unassigned UI marker to <code>null</code> before saving, as the output shows.</li>
          <li><strong className="text-ink">Names and IDs:</strong> use country codes, country-scoped state codes and city IDs rather than city names as identifiers. Duplicate city names exist. Check migration notes before updating stored IDs to a new data release.</li>
          <li><strong className="text-ink">Address coverage:</strong> these lists include settlements and other place types, and administrative levels vary. A dropdown cannot replace postal-address validation or a free-text fallback.</li>
        </ul>
      </section>

      <section id="package-or-api" className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">Choose a package or the hosted API.</h2>
        <p className="m-0">Use the browser package for a versioned snapshot loaded from a CDN without an API key. For a fully local dataset, review the bundled <Link href="/npm-packages/" className={LINK}>npm data packages</Link> and the build setup of your application.</p>
        <p className="m-0">Use the <Link href="/product/api/" className={LINK}>hosted API</Link> when you want the dataset currently served there, server-side requests, search or autocomplete on eligible plans. Compare <Link href="/pricing/" className={LINK}>field access, endpoints and quotas</Link>. Keep private API credentials on your server and apply permitted-use restrictions to browser integrations.</p>
        <div className="flex flex-wrap gap-3"><CtaLink href="https://app.countrystatecity.in?utm_source=website&utm_medium=guide&utm_content=react_dropdown" location="react_dropdown_guide" track="api" className={buttonVariants()}>Get a free API key →</CtaLink><Link href="/npm-packages/" className={buttonVariants({ variant: "outline" })}>Explore npm packages</Link></div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="display-3 m-0">Questions about the React dropdown.</h2>
        {FAQS.map(({ q, a }) => <div key={q}><h3 className="mb-2 mt-0 font-cal text-[22px]">{q}</h3><p className="m-0 text-[17px] leading-[1.65] text-ink-2">{a}</p></div>)}
      </section>

      <footer className="flex flex-col gap-3 border-t border-hair pt-6 text-sm leading-normal text-ink-3">
        <p className="m-0">For local SQL queries and checked parent relationships, follow the <Link href="/guides/import-country-state-city-csv-sql/" className={LINK}>country, state and city CSV import guide</Link>.</p>
        <p className="m-0">Data attribution: <a href="https://github.com/dr5hn/countries-states-cities-database" className={LINK}>Countries States Cities Database</a>, distributed under <a href="https://opendatacommons.org/licenses/odbl/1-0/" className={LINK}>ODbL-1.0</a>. Preserve the supplied package notices when redistributing data.</p>
        <p className="m-0">References: <a href="https://github.com/dr5hn/countrystatecity-npm/tree/main/packages/countries-browser" className={LINK}>browser package documentation</a>, <a href="https://cdn.jsdelivr.net/npm/@countrystatecity/countries-browser@3.0.1/dist/data/version.json" className={LINK}>tested snapshot provenance</a>, <a href="https://react.dev/reference/react-dom/components/select" className={LINK}>React controlled selects</a> and <a href="https://react.dev/reference/react/useEffect" className={LINK}>Effect cleanup</a>.</p>
      </footer>
    </article>
  );
}
