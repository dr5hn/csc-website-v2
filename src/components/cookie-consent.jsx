"use client";

import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import DocsAssistant from "@/components/docs-assistant";
import { CONSENT_KEY, loadAnalytics, OPEN_EVENT, readConsent, stopAnalytics, writeConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

/** Offer an analytics choice and unload the tag when consent is withdrawn. */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [consented, setConsented] = useState(false);
  const notice = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    const stored = readConsent(window);
    setConsented(stored === "granted");
    if (stored === "granted") loadAnalytics(window, document);
    else stopAnalytics(window, document); // Includes cookies from the old opt-out site.
    if (stored === null) setOpen(true);
    const reopen = () => {
      opener.current = document.activeElement;
      setOpen(true);
      notice.current?.focus({ preventScroll: true });
    };
    const synchronize = (event) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      const value = readConsent(window);
      setConsented(value === "granted");
      if (value === "granted") loadAnalytics(window, document);
      else {
        stopAnalytics(window, document);
        if (window.__cscAnalyticsLoaded) window.location.reload();
      }
      setOpen(value === null);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    window.addEventListener("storage", synchronize);
    return () => {
      window.removeEventListener(OPEN_EVENT, reopen);
      window.removeEventListener("storage", synchronize);
    };
  }, []);

  useEffect(() => {
    if (open && opener.current) notice.current?.focus({ preventScroll: true });
  }, [open]);

  const choose = (value) => {
    writeConsent(window, value);
    setConsented(value === "granted");
    if (value === "granted") loadAnalytics(window, document);
    else {
      stopAnalytics(window, document);
      if (window.__cscAnalyticsLoaded) window.location.reload();
    }
    setOpen(false);
    opener.current?.focus({ preventScroll: true });
  };

  return (
    <>
      {/* Mintlify's widget also sends usage analytics, so it shares the opt-in gate. */}
      {consented && <DocsAssistant />}
      {open && (
        <section
          ref={notice}
          tabIndex={-1}
          role="region"
          aria-label="Cookie notice"
          className="fixed inset-x-4 bottom-4 z-50 flex max-h-[calc(100dvh-32px)] max-w-[420px] flex-col gap-3.5 overflow-y-auto rounded-[20px] border border-line bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,.16)]"
        >
          <div className="flex flex-col gap-1.5">
            <span className="font-cal text-xl">Optional analytics</span>
            <p className="m-0 text-[15px] leading-[1.5] text-ink-2">
              Google Analytics cookies and the docs assistant’s usage analytics help us improve the site. They stay off unless you accept, and you can change your
              choice from Cookie settings in the footer.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={() => choose("granted")} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "min-w-24 cursor-pointer")}>
              Accept
            </button>
            <button type="button" onClick={() => choose("denied")} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "min-w-24 cursor-pointer")}>
              Decline
            </button>
          </div>
        </section>
      )}
    </>
  );
}
