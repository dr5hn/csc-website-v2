import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy",
  description: "What the CountryStateCity website collects, which cookies it uses, which third parties it contacts, and how to change your choices.",
  alternates: {
    canonical: "/privacy/",
  },
};

const UPDATED = "October 13, 2026";
const EMAIL = "support@countrystatecity.in";

// First-party storage. Mintlify also uses in-memory analytics after opt-in.
const STORAGE = [
  ["csc-cookie-consent", "Browser storage", "Remembers whether you accepted or declined optional analytics.", "Until you clear it"],
  ["csc-promo-hidden", "Browser storage", "Remembers that you closed the announcement bar.", "Until you clear it"],
  ["csc-billing", "Browser storage", "Remembers the monthly or annual choice on the pricing page.", "Until you clear it"],
  ["csc_attribution", "Session storage", "Keeps the source, campaign and package from a link you arrived with (for example from npm), so buttons that open the app can pass it along. This campaign attribution is stored even if you decline optional analytics.", "For the tab session; browsers may restore sessions"],
  ["_ga, _ga_…", "Cookies (Google Analytics)", "Tell Google Analytics which visits belong together. Set only after you accept and removed if you decline.", "Default expiry: two years, refreshed on analytics visits"],
];

const THIRD_PARTIES = [
  ["Google Analytics", "Loaded only after you accept optional analytics. Receives your IP address, page URLs and referrers, device and browser information, and tracked interactions. Google advertising consent stays denied."],
  ["Mintlify and PostHog", "The “Ask the docs” assistant loads only after you accept optional analytics. Mintlify’s widget uses PostHog for usage events and temporary identifiers held in memory. Questions and any contact details you submit through the assistant are sent to Mintlify."],
  ["GitHub", "Pages showing live star counts or recent database changes request them from api.github.com, which receives your IP address."],
  ["Our own APIs", "Pages showing live statistics or pricing call api.countrystatecity.in or eapi.countrystatecity.in. These requests disclose your IP address even if you decline optional analytics."],
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
      "The marketing pages have no account sign-up form, comments or newsletter. The optional docs assistant accepts questions and can offer a contact form; include only information you want to send to that service.",
      "Like any website, our hosting and Cloudflare, which sits in front of it, see your IP address, browser type and the pages you request. They use this to deliver the site and keep it secure.",
      "If you email us, we receive your email address and whatever you write. If you contribute to the database on GitHub, your username and contribution are public in the repository history.",
      "If you accept optional analytics, Google Analytics receives page and interaction data and can derive approximate location from your connection. Mintlify also records usage of its docs assistant.",
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
      "The browser services above and our hosting and email providers process data to deliver the site or answer your request. The API also integrates the services described below. Several providers operate in other countries, so your data can be processed outside the one you live in. Links to other sites, such as GitHub, npm, PyPI and Kaggle, are governed by those sites’ own policies.",
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
      "Google Analytics and the docs assistant are off until you accept optional analytics. You can change your choice at any time with Cookie settings in the footer; declining removes the Google Analytics cookies and reloads a page that had analytics running to stop it. You can also clear this site’s storage in your browser settings. The choice on this website does not control account storage or operational usage records in the separate API and dashboard.",
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

/** Render a titled group of policy paragraphs. */
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

/** Describe verified marketing-site behaviour and distinguish separate account services. */
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
            Google Analytics and the docs assistant stay off unless you accept optional analytics. Site preferences and campaign attribution use separate browser storage.
          </p>
        </header>

        {SECTIONS.map((s) => (
          <Section key={s.t} {...s} />
        ))}

        <section className="flex flex-col gap-3">
          <h2 className="m-0 font-cal text-[26px] font-normal">Cookies and browser storage</h2>
          <p className="m-0 text-base leading-[1.65] text-ink-2">
            The site’s cookies and browser storage are listed below. Preference settings and campaign attribution have different purposes;
            campaign attribution is used to understand how visitors reach the app. After opt-in, the docs assistant also uses temporary analytics identifiers in memory.
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
            The services below receive your IP address when contacted. Some depend on the page you view or your analytics choice.
            The marketing site’s fonts are served from our own domain.
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

        <Section
          t="The separate API and dashboard"
          body={[
            "The API account system stores your name and email address, GitHub username and avatar when you sign in with GitHub, API keys and allowed hosts or IP addresses, communication preferences, and plan and payment references. It also keeps account and conversion milestones, billing events, email delivery attempts and internal support notes. When supplied during registration, source, campaign and package attribution is saved on the account.",
            "The API records operational usage totals and statistics about routes, response status, response time, source country and referring host. These records support usage limits, billing and service monitoring, independently of this website’s analytics choice. Deactivating an account disables access; it does not delete the account record or its usage history.",
            "The API uses Dodo Payments for paid plans, GitHub for GitHub sign-in, and a configured SMTP email service for authentication and notifications. Sentry can receive diagnostic and performance data when configured; Slack can receive operational alerts and summaries when configured. Our server and Cloudflare receive network request information. The dashboard stores sign-in state in your browser.",
          ]}
        />

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
