"use client";

import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { loadAnalytics, OPEN_EVENT, readConsent, stopAnalytics, writeConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

// Opt-in analytics notice. Nothing is loaded or stored until the visitor accepts; the footer's
// "Cookie settings" button reopens it so the choice can be changed at any time.
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent(window.localStorage);
    if (stored === "granted") loadAnalytics(window, document);
    if (stored === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (value) => {
    writeConsent(window.localStorage, value);
    if (value === "granted") loadAnalytics(window, document);
    else stopAnalytics(window, document);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <section
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-50 flex max-w-[420px] flex-col gap-3.5 rounded-[20px] border border-line bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,.16)]"
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-cal text-xl">Cookies</span>
        <p className="m-0 text-[15px] leading-[1.5] text-ink-2">
          We use Google Analytics cookies to see which pages help developers. They stay off unless you accept, and you can change your
          choice from Cookie settings in the footer.
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button type="button" onClick={() => choose("granted")} className={cn(buttonVariants({ size: "sm" }), "cursor-pointer")}>
          Accept
        </button>
        <button type="button" onClick={() => choose("denied")} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer")}>
          Decline
        </button>
      </div>
    </section>
  );
}
