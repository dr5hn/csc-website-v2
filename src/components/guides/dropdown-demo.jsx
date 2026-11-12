"use client";

import { useState } from "react";
import LocationDropdown from "../../../public/examples/react-location-dropdown.jsx";
import { buttonVariants } from "@/components/ui/button";

/** Mount the downloadable example only after a visitor requests CDN data. */
export default function DropdownDemo() {
  const [started, setStarted] = useState(false);
  return (
    <div className="rounded-[24px] border border-line bg-field p-[clamp(18px,3vw,30px)]">
      {started ? (
        <div className="[&_fieldset]:flex [&_fieldset]:min-w-0 [&_fieldset]:flex-col [&_fieldset]:gap-5 [&_legend]:mb-5 [&_legend]:font-cal [&_legend]:text-2xl [&_label]:mb-2 [&_label]:block [&_select]:min-h-11 [&_select]:w-full [&_select]:min-w-0 [&_select]:rounded-xl [&_select]:border [&_select]:border-line [&_select]:bg-white [&_select]:p-3 [&_select]:disabled:opacity-60 [&_p]:mb-0 [&_p]:text-sm [&_p]:text-ink-3 [&_button]:mt-2 [&_button]:cursor-pointer [&_button]:text-blue [&_button]:underline [&_output]:break-all [&_output]:rounded-xl [&_output]:bg-white [&_output]:p-4 [&_output]:font-mono [&_output]:text-sm">
          <LocationDropdown />
        </div>
      ) : (
        <>
          <p className="mb-5 mt-0 text-ink-2">Try India → Maharashtra → Mumbai, or choose a different country or territory. Starting the demo loads public package data from jsDelivr.</p>
          <button type="button" className={buttonVariants()} onClick={() => setStarted(true)}>Start dropdown demo</button>
          <noscript><p>The interactive demo needs JavaScript. The complete guide and downloadable code are available below.</p></noscript>
        </>
      )}
    </div>
  );
}
