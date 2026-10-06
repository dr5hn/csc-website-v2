"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/logo";

const SOCIAL = [
  { t: "GitHub", href: "https://github.com/dr5hn" },
  { t: "LinkedIn", href: "https://www.linkedin.com/in/dr5hn/" },
  { t: "X", href: "https://x.com/dr5hn" },
  { t: "Kaggle", href: "https://www.kaggle.com/datasets/darshangada/countries-states-cities-database" },
  { t: "data.world", href: "https://data.world/dr5hn/country-state-city" },
];

const COLUMNS = [
  {
    t: "Products",
    links: [
      { t: "API", href: "/product/api" },
      { t: "Export Tool", href: "/product/export-tool" },
      { t: "Database", href: "/product/database" },
      { t: "Update Tool", href: "/product/update-tool" },
      { t: "Ecosystem", href: "/ecosystem" },
    ],
  },
  {
    t: "Resources",
    links: [
      { t: "Docs", href: "https://docs.countrystatecity.in/" },
      { t: "Status", href: "https://status.countrystatecity.in/" },
      { t: "Playground", href: "https://playground.countrystatecity.in/" },
      { t: "Database demo", href: "https://demo.countrystatecity.in/" },
      { t: "Encyclopedia", href: "https://countrystatecity.org/" },
    ],
  },
  {
    t: "Company",
    links: [
      { t: "About", href: "/about" },
      { t: "Pricing", href: "/pricing" },
      { t: "Support", href: "/contact" },
      { t: "FAQs", href: "/faqs" },
    ],
  },
  {
    t: "More from the founder",
    links: [
      { t: "MakeMySiteLive ↗", href: "https://makemysitelive.com/?utm_source=countrystatecity&utm_medium=footer", icon: "/icons/makemysitelive.svg" },
      { t: "RemoteGigs ↗", href: "https://remotegig.in/?utm_source=countrystatecity&utm_medium=footer", icon: "/icons/remotegigs.png" },
    ],
  },
];

const isExternal = (href) => /^https?:\/\//.test(href);

function FooterLink({ href, icon, children }) {
  const className = "text-ink-2 no-underline hover:text-blue hover:no-underline";
  const label = icon ? (
    <span className="inline-flex items-center gap-2">
      <Image src={icon} alt="" width={20} height={20} className="size-5 shrink-0 rounded-[5px]" />
      {children}
    </span>
  ) : (
    children
  );
  if (!isExternal(href)) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  // The bottom bar keeps 88px below it so the fixed "Ask the docs" widget never covers Back to top.
  return (
    <footer className="border-t border-hair bg-mist text-ink">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-8 pb-6 pt-[clamp(40px,5vw,64px)]">
        <div className="col-span-2 flex min-w-0 max-w-[360px] flex-col gap-3.5">
          <Link href="/" aria-label="CountryStateCity home" className="flex no-underline hover:no-underline">
            <Logo iconSize={30} wordmarkClass="text-xl" />
          </Link>
          <p className="m-0 text-[15px] leading-[1.55] text-ink-2">
            Open geographic data for developers. Built and maintained by Darshan Gada, with community contributions.
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.t}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line-2 bg-white px-3 py-2 text-[13px] font-medium text-ink-code no-underline hover:border-blue hover:text-ink-code hover:no-underline"
              >
                {s.t}
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.t} aria-label={column.t} className="flex flex-col gap-2.5 text-[15px]">
            <span className="font-semibold">{column.t}</span>
            {column.links.map((link) => (
              <FooterLink key={link.t} href={link.href} icon={link.icon}>
                {link.t}
              </FooterLink>
            ))}
          </nav>
        ))}
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-line pb-[88px] pt-[18px] text-sm text-ink-3">
        <span>© {new Date().getFullYear()} Country State City. Data under ODbL-1.0.</span>
        <div className="flex items-center gap-4">
          <span>Made with care in India</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="min-h-9 cursor-pointer whitespace-nowrap rounded-full border border-line-2 bg-white px-3.5 py-2 text-[13px] font-medium text-ink-code"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
