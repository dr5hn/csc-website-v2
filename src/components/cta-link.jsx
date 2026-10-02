"use client";

import Link from "next/link";
import { trackAPI, trackExternalLink, trackTool } from "@/lib/analytics";
import { isAppUrl, useInboundAttribution, withAttribution } from "@/lib/attribution";

// Which GA4 conversion a link counts as. Anything else is logged as a plain
// outbound click so every call to action stays an identifiable element.
const TRACKERS = {
  api: (location) => trackAPI.requestKey(location),
  export: (location) => trackTool.useExport(location),
  update: (location) => trackTool.useUpdate(location),
  github: (location) => trackTool.visitGitHub(location),
};

/**
 * Link for calls to action. Carries inbound attribution onto app.countrystatecity.in
 * URLs, opens other sites in a new tab and reports the click to analytics.
 *
 * @param {string} location - Where the link sits, e.g. "home_hero". Used as the GA4 button_location.
 * @param {"api"|"export"|"update"|"github"} [track] - Conversion type to record.
 */
export default function CtaLink({ href, location, track, children, onClick, ...props }) {
  const attribution = useInboundAttribution();
  const finalHref = isAppUrl(href) ? withAttribution(href, attribution) : href;
  const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
  const external = isExternal && !href.startsWith("mailto:");

  const handleClick = (event) => {
    onClick?.(event);
    if (!location) return;
    if (track) TRACKERS[track](location);
    else if (isExternal) trackExternalLink(href, location, typeof children === "string" ? children : "");
  };

  if (!isExternal) {
    return (
      <Link href={finalHref} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={finalHref}
      onClick={handleClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
