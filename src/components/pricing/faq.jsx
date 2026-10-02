"use client";

import { useState } from "react";

import Link from "next/link";

// Answers carried over from the pre-redesign pricing FAQ, which were corrected to match the
// API's actual behaviour (limits are enforced on every plan; downgrades wait for the next bill).
const FAQS = [
  ["Can I change plans anytime?", "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, and we'll prorate the billing accordingly. Downgrades take effect at your next billing date, and you keep your current plan until then."],
  ["What happens if I exceed my request limit?", "Daily and monthly request limits are enforced on both free and paid plans. We'll email you as you approach your daily limit, and once you reach a limit, further requests are rejected until it resets. You can wait for the reset, upgrade your plan, or contact us about a custom plan for higher volumes."],
  ["Do unused credits expire?", "No, Export Tool credits never expire. You can use them whenever you need to export data."],
  ["Is there a setup fee?", "No setup fees for any plan. You only pay for what you use."],
];

export default function PricingFaq() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="border-t border-hair bg-mist">
      <div className="mx-auto flex max-w-[calc(880px+2*clamp(20px,4vw,64px))] flex-col gap-5 px-[clamp(20px,4vw,64px)] py-[clamp(56px,7vw,96px)]">
        <h2 className="m-0 font-cal text-[length:clamp(30px,3.4vw,44px)] font-normal">Questions</h2>
        <div className="flex flex-col gap-2">
          {FAQS.map(([q, a], i) => (
            <div key={q} className="overflow-hidden rounded-[18px] border border-line bg-white">
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-[18px] text-left text-base font-semibold text-ink"
              >
                {q}
                <span aria-hidden="true" className="font-mono text-blue">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="px-5 pb-[18px] text-[15px] leading-[1.55] text-ink-2">{a}</div>}
            </div>
          ))}
        </div>
        <div className="text-[15px] text-ink-2">
          Something else? <a href="https://docs.countrystatecity.in/" target="_blank" rel="noopener noreferrer" className="text-blue hover:text-blue-deep hover:underline">Ask the docs</a> or{" "}
          <Link href="/contact" className="text-blue hover:text-blue-deep hover:underline">contact support</Link>.
        </div>
      </div>
    </section>
  );
}
