import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy",
  description: "What the CountryStateCity website collects, which cookies it uses, which third parties it contacts, and how to change your choices.",
  alternates: {
    canonical: "/privacy/",
  },
};

const UPDATED = "October 7, 2026";
const EMAIL = "support@countrystatecity.in";

// Everything the site stores in the browser. Keep in sync with src/lib/consent.js and the components that write these keys.
const STORAGE = [
  ["csc-cookie-consent", "Browser storage", "Remembers whether you accepted or declined analytics cookies.", "Until you clear it"],
  ["csc-promo-hidden", "Browser storage", "Remembers that you closed the announcement bar.", "Until you clear it"],
  ["csc-billing", "Browser storage", "Remembers the monthly or annual choice on the pricing page.", "Until you clear it"],
  ["csc_attribution", "Session storage", "Keeps the source, campaign and package from a link you arrived with (for example from npm), so buttons that open the app can pass it along.", "Until you close the tab"],
  ["_ga, _ga_…", "Cookies (Google Analytics)", "Tell Google Analytics which visits belong together. Set only after you accept.", "Up to two years"],
];

const THIRD_PARTIES = [
  ["Google Analytics", "Loaded only after you accept cookies. Receives your IP address, the pages you view, the buttons and links you click and how far you scroll."],
  ["Mintlify", "Provides the “Ask the docs” assistant. Its script loads on every page. If you open it, the questions you type are sent to Mintlify to be answered."],
  ["GitHub", "Your browser asks api.github.com for the live star count and the recently merged database changes, so GitHub sees your IP address."],
  ["Our own APIs", "Your browser calls api.countrystatecity.in and eapi.countrystatecity.in for live statistics and current plan and credit prices."],
];

const SECTIONS = [
  {
    t: "Who this covers",
    body: [
      "This policy covers the CountryStateCity website at countrystatecity.in, built and maintained by Darshan Gada. The API console, Export Tool and Update Tool are separate services where you create an account. Account details, and billing details on paid plans, are collected there rather than on this website.",
    ],
  },
  {
    t: "What we collect",
    body: [
      "The website has no sign-up forms, comments or newsletter. We do not ask you to type any personal information into it.",
      "Like any website, our hosting and Cloudflare, which sits in front of it, see your IP address, browser type and the pages you request. They use this to deliver the site and keep it secure.",
      "If you email us, we receive your email address and whatever you write. If you contribute to the database on GitHub, your username and contribution are public in the repository history.",
      "If you accept cookies, Google Analytics also records which pages you view, which buttons and links you click, how far you scroll, your approximate location and your device and browser type.",
    ],
  },
];

const SECTIONS_AFTER = [
  {
    t: "How we use it",
    body: [
      "We use it to run and secure the site, to see which pages help developers (only if you accept cookies), and to answer your emails. We do not sell personal data and there is no advertising on this site.",
    ],
  },
  {
    t: "Who we share it with",
    body: [
      "Only the providers above, which process data to deliver the site or answer your request, and authorities where the law requires it. Several of them, including Google, GitHub and Cloudflare, operate in other countries, so your data can be processed outside the one you live in. Links to other sites, such as GitHub, npm, PyPI and Kaggle, are governed by those sites’ own policies.",
    ],
  },
  {
    t: "How long we keep it",
    body: [
      "Emails are kept as long as needed to answer you and keep a record of the request. Analytics data is kept for the period set in our Google Analytics account. Hosting and Cloudflare logs follow those providers’ retention schedules. The items in your browser stay until you clear them or, for session storage, until you close the tab.",
    ],
  },
  {
    t: "Your choices and rights",
    body: [
      "Analytics cookies are off until you accept. You can change your choice at any time with Cookie settings in the footer; declining removes the Google Analytics cookies. You can also clear this site’s storage in your browser settings.",
      `Depending on where you live, you may have the right to ask what we hold about you, and to have it corrected or deleted, or to object to how it is used. Email ${EMAIL} and we will respond. You can also complain to your local data protection authority.`,
    ],
  },
  {
    t: "Children",
    body: ["This website is written for developers and is not aimed at children."],
  },
  {
    t: "Changes to this policy",
    body: [`When we change this policy we update the date at the top. The current version is always on this page. Last updated ${UPDATED}.`],
  },
];

function Section({ t, body }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="m-0 font-cal text-[26px] font-normal">{t}</h2>
      {body.map((p) => (
        <p key={p} className="m-0 text-base leading-[1.65] text-ink-2">
          {p}
        </p>
      ))}
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy/" }])} />
      <article className="wrap flex max-w-[800px] flex-col gap-10 pb-[clamp(56px,7vw,104px)] pt-[clamp(40px,6vw,88px)]">
        <header className="flex flex-col gap-[18px]">
          <div className="eyebrow">Legal · updated {UPDATED}</div>
          <h1 className="m-0 font-cal text-[length:clamp(40px,5.4vw,72px)] font-normal leading-[.98] tracking-[-.025em] [text-wrap:balance]">
            Privacy policy
          </h1>
          <p className="lead m-0">
            The short version: this website asks you for nothing, and Google Analytics cookies stay off unless you accept them.
          </p>
        </header>

        {SECTIONS.map((s) => (
          <Section key={s.t} {...s} />
        ))}

        <section className="flex flex-col gap-3">
          <h2 className="m-0 font-cal text-[26px] font-normal">Cookies and browser storage</h2>
          <p className="m-0 text-base leading-[1.65] text-ink-2">
            Everything the site keeps in your browser, and why. Only the Google Analytics cookies depend on your consent; the rest are
            small settings that make the site work the way you left it.
          </p>
          <ul className="m-0 flex list-none flex-col overflow-hidden rounded-[20px] border border-line p-0">
            {STORAGE.map(([name, type, purpose, duration], i) => (
              <li key={name} className={`flex flex-col gap-1 px-5 py-4 ${i > 0 ? "border-t border-hair" : ""}`}>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <code className="font-mono text-[14px] font-semibold text-ink">{name}</code>
                  <span className="text-[13px] text-ink-3">
                    {type} · {duration}
                  </span>
                </span>
                <span className="text-[15px] leading-normal text-ink-2">{purpose}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="m-0 font-cal text-[26px] font-normal">Services your browser contacts</h2>
          <p className="m-0 text-base leading-[1.65] text-ink-2">
            Loading a page makes your browser contact the services below, which means each one receives your IP address. Fonts are served
            from our own domain.
          </p>
          <ul className="m-0 flex list-none flex-col overflow-hidden rounded-[20px] border border-line p-0">
            {THIRD_PARTIES.map(([name, what], i) => (
              <li key={name} className={`flex flex-col gap-1 px-5 py-4 ${i > 0 ? "border-t border-hair" : ""}`}>
                <span className="text-base font-semibold">{name}</span>
                <span className="text-[15px] leading-normal text-ink-2">{what}</span>
              </li>
            ))}
          </ul>
        </section>

        {SECTIONS_AFTER.map((s) => (
          <Section key={s.t} {...s} />
        ))}

        <section className="flex flex-col gap-2 rounded-[20px] bg-field p-6">
          <h2 className="m-0 font-cal text-[22px] font-normal">Questions</h2>
          <p className="m-0 text-base leading-[1.6] text-ink-2">
            Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> about anything on this page.
          </p>
        </section>
      </article>
    </>
  );
}
