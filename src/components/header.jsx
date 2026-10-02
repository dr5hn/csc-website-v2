"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CtaLink from "@/components/cta-link";
import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Founder products shown in the announcement bar and the Products menu. Links open
// in a new tab and carry utm_source=countrystatecity (interaction spec 6).
const PROMOS = [
  { name: "MakeMySiteLive", line: "Publish your website in under 2 minutes", href: "https://makemysitelive.com/", badge: "New", icon: "/icons/makemysitelive.svg" },
  { name: "RemoteGigs", line: "Find remote jobs and gigs", href: "https://remotegig.in/", badge: "", icon: "/icons/remotegigs.png" },
];

const promoHref = (href, medium) => `${href}?utm_source=countrystatecity&utm_medium=${medium}`;

const MEGA = [
  {
    label: "Build",
    items: [
      { t: "API", d: "REST and GraphQL, free tier", href: "/product/api" },
      { t: "Packages", d: "npm and PyPI, offline or live", href: "/ecosystem" },
      { t: "CLI", d: "Search and generate code", href: "/ecosystem" },
    ],
  },
  {
    label: "Data",
    items: [
      { t: "Database", d: "Open data in 12 formats", href: "/product/database" },
      { t: "Export Tool", d: "Just the slice you need", href: "/product/export-tool" },
    ],
  },
  {
    label: "Community",
    items: [
      { t: "Update Tool", d: "Suggest a fix", href: "/product/update-tool" },
      { t: "GitHub", d: "Issues and releases", href: "https://github.com/dr5hn/countries-states-cities-database" },
    ],
  },
];

const LOGINS = [
  { t: "Get API key", d: "app.countrystatecity.in", href: "https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=header_login" },
  { t: "Export Tool", d: "export.countrystatecity.in", href: "https://export.countrystatecity.in/" },
  { t: "Update Tool", d: "manager.countrystatecity.in", href: "https://manager.countrystatecity.in/" },
];

const MOBILE_LINKS = [
  { t: "About", href: "/about", key: "about" },
  { t: "Ecosystem", href: "/ecosystem", key: "ecosystem" },
  { t: "Pricing", href: "/pricing", key: "pricing" },
  { t: "Support", href: "/contact", key: "support" },
  { t: "Docs", href: "https://docs.countrystatecity.in/", key: "" },
];

const PROMO_HIDDEN_KEY = "csc-promo-hidden";

function activeKey(pathname) {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/ecosystem")) return "ecosystem";
  if (pathname.startsWith("/product")) return "products";
  if (pathname.startsWith("/pricing")) return "pricing";
  if (pathname.startsWith("/contact") || pathname.startsWith("/faqs")) return "support";
  return "";
}

const navLink = (on) =>
  cn(
    "rounded-full px-3 py-2.5 text-[15px] font-medium no-underline hover:bg-mist hover:no-underline",
    on ? "text-blue hover:text-blue" : "text-ink-code hover:text-ink-code"
  );

function PromoChip({ promo, showLine, className, ...props }) {
  return (
    <a
      href={promoHref(promo.href, "announcement")}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-[30px] min-w-0 items-center gap-2 rounded-full border border-line-2 bg-white pl-1 pr-3 text-ink no-underline transition-colors hover:border-blue hover:text-ink hover:no-underline",
        className
      )}
      {...props}
    >
      <Image src={promo.icon} alt="" width={22} height={22} className="size-[22px] shrink-0 rounded-md" />
      <span className="whitespace-nowrap font-semibold">{promo.name}</span>
      {showLine && <span className="hidden truncate text-ink-2 min-[1180px]:inline">{promo.line}</span>}
      {promo.badge && (
        <span className="rounded-full border border-live-line bg-live-bg px-[7px] py-px text-[11px] font-semibold text-live-ink">
          {promo.badge}
        </span>
      )}
      <span aria-hidden="true" className="font-semibold text-blue">↗</span>
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const active = activeKey(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoFade, setPromoFade] = useState(1);
  const [promoPaused, setPromoPaused] = useState(false);
  const [promoHidden, setPromoHidden] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(112);

  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const sheetRef = useRef(null);
  const fadeTimer = useRef(null);

  // Close every menu on navigation.
  useEffect(() => {
    setProductsOpen(false);
    setLoginOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    const onKey = (event) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setLoginOpen(false);
        setSheetOpen(false);
      }
    };
    const onDocClick = (event) => {
      if (!event.target.closest?.("header")) {
        setProductsOpen(false);
        setLoginOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  function goPromo(next) {
    clearTimeout(fadeTimer.current);
    setPromoFade(0);
    fadeTimer.current = setTimeout(() => {
      setPromoIndex(next);
      setPromoFade(1);
    }, 250);
  }

  // Rotate the single mobile promo chip every 6 s; pause on hover or focus, and not at all
  // for reduced motion.
  useEffect(() => {
    if (promoHidden || promoPaused || PROMOS.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => goPromo((promoIndex + 1) % PROMOS.length), 6000);
    return () => clearInterval(id);
  }, [promoHidden, promoPaused, promoIndex]);

  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  // Mobile sheet: lock body scroll and hand focus back to the menu button on close.
  useEffect(() => {
    if (!sheetOpen) return;
    sheetRef.current?.show();
    const desktop = window.matchMedia("(min-width: 960px)");
    const closeOnDesktop = () => { if (desktop.matches) setSheetOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setHeaderHeight(headerRef.current?.getBoundingClientRect().height ?? 112);
    const button = menuButtonRef.current;
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = original;
      button?.focus();
    };
  }, [sheetOpen]);

  function dismissPromo() {
    try {
      localStorage.setItem(PROMO_HIDDEN_KEY, "1");
    } catch {
      // Storage can be blocked; the bar just reappears next visit.
    }
    document.documentElement.dataset.promoHidden = "1";
    setPromoHidden(true);
  }

  const promo = PROMOS[promoIndex];

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b border-hair text-ink transition-shadow",
        sheetOpen ? "bg-white" : "bg-white/90 backdrop-blur-[14px]",
        (scrolled || productsOpen) && "shadow-[0_6px_20px_-12px_rgb(14_26_43/0.25)]"
      )}
    >
      {!promoHidden && !sheetOpen && (
        <div
          className="promo-bar h-10 border-b border-line-2 bg-field"
          onMouseEnter={() => setPromoPaused(true)}
          onMouseLeave={() => setPromoPaused(false)}
          onFocus={() => setPromoPaused(true)}
          onBlur={() => setPromoPaused(false)}
        >
          <div className="wrap-flush relative flex h-full items-center justify-center gap-3 pr-11 text-sm">
            <span className="whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[.06em] text-ink-3">
              <span className="hidden min-[960px]:inline">More from the founder</span>
              <span className="max-[479px]:hidden min-[960px]:hidden">Also by us</span>
            </span>
            <div className="hidden min-w-0 items-center gap-2 min-[960px]:flex">
              {PROMOS.map((p) => (
                <PromoChip key={p.name} promo={p} showLine />
              ))}
            </div>
            <div className="flex min-w-0 items-center gap-2 min-[960px]:hidden">
              <PromoChip promo={promo} style={{ opacity: promoFade, transition: "opacity .3s" }} />
              <div className="flex shrink-0 gap-0.5">
                {PROMOS.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    aria-label={`Show ${p.name}`}
                    onClick={() => goPromo(i)}
                    className="flex h-6 w-4 cursor-pointer items-center justify-center"
                  >
                    <span className={cn("h-1.5 rounded-sm transition-[width]", i === promoIndex ? "w-4 bg-blue" : "w-1.5 bg-[#a8c4e4]")} />
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={dismissPromo}
              aria-label="Hide announcement"
              className="absolute right-[clamp(8px,3vw,48px)] top-1/2 size-8 -translate-y-1/2 cursor-pointer rounded-lg text-base text-ink-3 hover:bg-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Link
        href="#main-content"
        className="absolute left-3 top-[-60px] z-[60] rounded-[10px] bg-blue px-3.5 py-2.5 text-sm text-white focus:top-3 focus:text-white"
      >
        Skip to content
      </Link>

      <div className="wrap relative flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="CountryStateCity home" className="flex shrink-0 items-center no-underline hover:no-underline">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1.5 min-[960px]:flex">
          <Link href="/about" className={navLink(active === "about")}>About</Link>
          <Link href="/ecosystem" className={navLink(active === "ecosystem")}>Ecosystem</Link>
          <button
            type="button"
            aria-expanded={productsOpen}
            aria-controls="products-menu"
            onClick={() => {
              setProductsOpen((v) => !v);
              setLoginOpen(false);
            }}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2.5 text-[15px] font-medium",
              productsOpen ? "bg-field" : "bg-transparent",
              active === "products" ? "text-blue" : "text-ink-code"
            )}
          >
            Products
            <span aria-hidden="true" className={cn("text-[11px] transition-transform", productsOpen && "rotate-180")}>▾</span>
          </button>
          <Link href="/pricing" className={navLink(active === "pricing")}>Pricing</Link>
          <Link href="/contact" className={navLink(active === "support")}>Support</Link>
        </nav>

        <div className="relative hidden items-center gap-2 min-[960px]:flex">
          <button
            type="button"
            aria-expanded={loginOpen}
            aria-controls="login-menu"
            onClick={() => {
              setLoginOpen((v) => !v);
              setProductsOpen(false);
            }}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2.5 text-[15px] font-medium text-ink-code",
              loginOpen && "bg-field"
            )}
          >
            Log in <span aria-hidden="true" className="text-[11px]">▾</span>
          </button>
          <CtaLink
            href="https://docs.countrystatecity.in/"
            location="header_docs"
            className={buttonVariants({ size: "sm" })}
          >
            Docs
          </CtaLink>
          {loginOpen && (
            <div
              id="login-menu"
              className="absolute right-0 top-[calc(100%+10px)] flex w-[280px] flex-col rounded-[20px] border border-line bg-white p-2 shadow-[0_1px_3px_rgb(14_26_43/0.08),0_24px_48px_-20px_rgb(14_26_43/0.3)]"
            >
              {LOGINS.map((l) => (
                <CtaLink
                  key={l.t}
                  href={l.href}
                  location="header_login"
                  className="flex flex-col gap-0.5 rounded-[14px] px-3.5 py-3 no-underline hover:bg-mist hover:no-underline"
                >
                  <span className="text-[15px] font-semibold text-ink">{l.t}</span>
                  <span className="font-mono text-xs text-ink-3">{l.d}</span>
                </CtaLink>
              ))}
            </div>
          )}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Menu"
          aria-expanded={sheetOpen}
          aria-controls="mobile-sheet"
          onClick={() => setSheetOpen((v) => !v)}
          className={cn(
            "flex size-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl min-[960px]:hidden",
            sheetOpen && "bg-field"
          )}
        >
          <span className={cn("h-0.5 w-5 bg-ink transition-transform", sheetOpen && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("h-0.5 w-5 bg-ink transition-transform", sheetOpen && "-translate-y-[3.5px] -rotate-45")} />
        </button>
      </div>

      {productsOpen && (
        <div
          id="products-menu"
          className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_24px_48px_-24px_rgb(14_26_43/0.25)] min-[960px]:block"
        >
          <div className="wrap grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.1fr)] gap-6 pb-7 pt-6">
            {MEGA.map((group) => (
              <div key={group.label} className="flex flex-col gap-1">
                <span className="px-3 pb-1.5 font-mono text-xs uppercase tracking-[.08em] text-blue">{group.label}</span>
                {group.items.map((item) => (
                  <CtaLink
                    key={item.t}
                    href={item.href}
                    location={`header_menu_${item.t.toLowerCase().replace(/\s+/g, "_")}`}
                    className="flex flex-col gap-0.5 rounded-[14px] px-3 py-2.5 no-underline hover:bg-mist hover:no-underline"
                  >
                    <span className="text-[15px] font-semibold text-ink">{item.t}</span>
                    <span className="text-[13px] text-ink-3">{item.d}</span>
                  </CtaLink>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-2.5 rounded-[20px] bg-field p-5">
              <span className="font-cal text-[22px]">One dataset, nine channels</span>
              <span className="text-sm leading-normal text-ink-2">Same records and IDs everywhere. Not sure which to use?</span>
              <Link href="/ecosystem" className="mt-auto text-sm font-semibold">See the ecosystem →</Link>
              <div className="flex flex-col gap-1.5 border-t border-line-2 pt-2.5">
                <span className="font-mono text-[11px] uppercase tracking-[.06em] text-ink-3">More from the founder</span>
                {PROMOS.map((p) => (
                  <a
                    key={p.name}
                    href={promoHref(p.href, "menu")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-ink-code no-underline hover:text-ink-code hover:no-underline"
                  >
                    <Image src={p.icon} alt="" width={20} height={20} className="size-5 shrink-0 rounded-[5px]" />
                    <span className="font-semibold">{p.name}</span>
                    {p.badge && (
                      <span className="rounded-full bg-live-bg px-[7px] py-px text-[11px] font-semibold text-live-ink">{p.badge}</span>
                    )}
                    <span aria-hidden="true" className="text-blue">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {sheetOpen && (
        <dialog
          ref={sheetRef}
          id="mobile-sheet"
          onClose={() => setSheetOpen(false)}
          onClick={(event) => { if (event.target.closest("a")) setSheetOpen(false); }}
          aria-modal="true"
          aria-label="Menu"
          style={{ top: headerHeight, height: `calc(100dvh - ${headerHeight}px)` }}
          className="fixed inset-x-0 m-0 flex max-h-none w-full max-w-none flex-col gap-[18px] overflow-y-auto border-0 bg-white px-5 pb-24 pt-3 text-ink"
        >
          {MEGA.map((group) => (
            <div key={group.label} className="flex flex-col">
              <span className="py-1.5 font-mono text-xs uppercase tracking-[.08em] text-blue">{group.label}</span>
              {group.items.map((item) => (
                <CtaLink
                  key={item.t}
                  href={item.href}
                  location={`mobile_menu_${item.t.toLowerCase().replace(/\s+/g, "_")}`}
                  className="flex min-h-12 items-center justify-between border-b border-hair text-[17px] font-medium text-ink no-underline hover:text-ink hover:no-underline"
                >
                  {item.t}
                  <span aria-hidden="true" className="text-[#a8b4c4]">›</span>
                </CtaLink>
              ))}
            </div>
          ))}
          <div className="flex flex-col">
            {MOBILE_LINKS.map((l) => (
              <CtaLink
                key={l.t}
                href={l.href}
                location={`mobile_${l.t.toLowerCase()}`}
                className={cn(
                  "flex min-h-12 items-center border-b border-hair text-[17px] font-medium no-underline hover:no-underline",
                  l.key && active === l.key ? "text-blue hover:text-blue" : "text-ink hover:text-ink"
                )}
              >
                {l.t}
              </CtaLink>
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-mist p-3.5">
            <span className="font-mono text-[11px] uppercase tracking-[.06em] text-ink-3">More from the founder</span>
            {PROMOS.map((p) => (
              <a
                key={p.name}
                href={promoHref(p.href, "menu")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-between gap-2.5 text-ink no-underline hover:text-ink hover:no-underline"
              >
                <span className="flex items-center gap-3">
                  <Image src={p.icon} alt="" width={32} height={32} className="size-8 shrink-0 rounded-lg" />
                  <span className="flex flex-col">
                    <span className="text-[15px] font-semibold">{p.name}</span>
                    <span className="text-[13px] text-ink-3">{p.line}</span>
                  </span>
                </span>
                <span aria-hidden="true" className="text-blue">↗</span>
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-2.5">
            <CtaLink
              href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=mobile_signup"
              location="mobile_signup"
              track="api"
              className={buttonVariants({ size: "lg", className: "h-[52px] py-0" })}
            >
              Get free API key
            </CtaLink>
            <CtaLink
              href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=mobile_dashboard"
              location="mobile_dashboard"
              className={buttonVariants({ variant: "outline", className: "h-12 py-0 text-base" })}
            >
              Dashboard
            </CtaLink>
          </div>
        </dialog>
      )}
    </header>
  );
}
