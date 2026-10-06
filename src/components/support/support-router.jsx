"use client";

import { useState } from "react";

import CtaLink from "@/components/cta-link";
import CopyButton from "@/components/ui/copy-button";
import { buttonVariants } from "@/components/ui/button";
import { trackContact } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const ROUTES = [
  { t: "API or account", d: "Keys, limits, errors", eyebrow: "API and account help", title: "Check the docs, then email the API team.", body: "Most key, quota and error questions are covered in the docs. If yours isn't, email with your account email and the request that failed.", steps: ["Include the endpoint and the response code", "Never send your API key in full"], cta: "Open the docs", href: "https://docs.countrystatecity.in/", email: "api@countrystatecity.in", kind: "api" },
  { t: "Export or billing", d: "Credits, receipts, downloads", eyebrow: "Export Tool and billing", title: "Credits, invoices and failed downloads.", body: "For missing credits, receipts or an export that didn't finish, email the export team with your order details.", steps: ["Include your account email and order date", "Credits never expire, so nothing is lost"], cta: "Open Export Tool", href: "https://export.countrystatecity.in/", email: "export@countrystatecity.in", kind: "export" },
  { t: "Data correction", d: "Wrong or missing place", eyebrow: "Data correction", title: "Fix it directly in the Update Tool.", body: "Corrections are faster through the Update Tool than by email: they're reviewed in the open and ship in the next release.", steps: ["Add a source link with your change", "Track review status in the tool"], cta: "Submit a change", href: "/product/update-tool", email: "", kind: "update" },
  { t: "Bug", d: "Something is broken", eyebrow: "Bug report", title: "Open an issue on GitHub.", body: "Bugs in the API, packages or data files are tracked publicly, so others can see the fix too.", steps: ["Say what you expected and what happened", "Include steps to reproduce"], cta: "Report an issue", href: "https://github.com/dr5hn/countries-states-cities-database/issues", email: "", kind: "issue" },
  { t: "Enterprise or custom", d: "Higher limits, SLAs", eyebrow: "Enterprise and custom plans", title: "Need more than the Business plan?", body: "We offer negotiated limits, custom data access and dedicated support.", steps: ["Tell us your expected monthly requests", "Mention any compliance or invoicing needs"], cta: "Compare plans", href: "/pricing", email: "support@countrystatecity.in", kind: "general" },
  { t: "Something else", d: "Partnerships, press, hello", eyebrow: "General", title: "Say hello.", body: "For anything that doesn't fit above, email support and it will reach the right person.", steps: ["We reply within 24–48 hours on business days"], cta: "Ask the docs assistant", href: "https://docs.countrystatecity.in/", email: "support@countrystatecity.in", kind: "general" },
];

export default function SupportRouter() {
  const [route, setRoute] = useState(0);
  const S = ROUTES[route];

  return (
    <section className="wrap-flush flex flex-col gap-7 pb-[clamp(56px,7vw,96px)] pt-[clamp(40px,6vw,80px)]">
      <div className="flex max-w-[760px] flex-col gap-3.5 px-2">
        <div className="eyebrow">Support</div>
        <h1 className="display-1 m-0">What do you need?</h1>
        <p className="lead m-0">Pick one and we&apos;ll point you to the fastest route. Reply times depend on your plan: about one business day on Professional and Business, two to three on Supporter, and community support on free plans.</p>
      </div>
      <div className="flex flex-wrap items-stretch gap-2.5">
        <div role="group" aria-label="What do you need?" className="grid min-w-0 flex-[1_1_340px] grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] content-start gap-2">
          {ROUTES.map((r, i) => (
            <button
              key={r.t}
              type="button"
              aria-pressed={i === route}
              onClick={() => setRoute(i)}
              className={cn(
                "flex min-h-[88px] cursor-pointer flex-col justify-between gap-1.5 rounded-[18px] border-[1.5px] px-[18px] py-4 text-left transition-colors",
                i === route ? "border-blue bg-field" : "border-line bg-white"
              )}
            >
              <span className="font-cal text-xl text-ink">{r.t}</span>
              <span className="text-sm text-ink-2">{r.d}</span>
            </button>
          ))}
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4 rounded-[clamp(24px,3vw,32px)] bg-field p-[clamp(20px,3vw,32px)]" aria-live="polite">
          <span className="eyebrow text-xs">{S.eyebrow}</span>
          <span className="font-cal text-[length:clamp(26px,3vw,36px)] leading-[1.1]">{S.title}</span>
          <span className="text-base leading-[1.55] text-ink-2">{S.body}</span>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {S.steps.map((s) => (
              <li key={s} className="flex gap-2.5 text-[15px] leading-normal text-ink-code">
                <span aria-hidden="true" className="shrink-0 text-ok">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-1.5">
            <CtaLink
              href={S.href}
              location={`support_${S.kind}`}
              track={S.kind === "update" ? "update" : undefined}
              onClick={S.kind === "issue" ? () => trackContact.githubIssue() : undefined}
              className={buttonVariants()}
            >
              {S.cta}
            </CtaLink>
            {S.email && (
              <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-3.5 pr-1.5">
                <span className="font-mono text-sm text-ink">{S.email}</span>
                <CopyButton text={S.email} className="py-1.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
