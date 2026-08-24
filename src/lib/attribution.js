"use client";

import { useEffect, useState } from "react";
import {
  parseAttribution,
  sanitizeAttribution,
} from "./attribution-core.mjs";

export { isAppUrl, withAttribution } from "./attribution-core.mjs";

const STORAGE_KEY = "csc_attribution";

/**
 * Stores attribution for the rest of the tab session. Failures are ignored:
 * private-mode and storage-quota errors must not break a CTA.
 *
 * @param {Record<string, string>} attribution
 */
function persist(attribution) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Attribution is best-effort; the link still works without it.
  }
}

/**
 * Reads previously stored attribution, re-validating it on the way out since
 * session storage is writable by any same-origin script.
 *
 * @returns {Record<string, string>}
 */
function loadPersisted() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeAttribution(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

/**
 * Resolves attribution for the current page view. A fresh inbound link wins and
 * replaces any stored value; otherwise the value the visitor arrived with is
 * reused, because client-side navigation drops the query string and would
 * otherwise strip attribution off the pricing and product CTAs.
 *
 * @returns {Record<string, string>}
 */
function resolveAttribution() {
  if (typeof window === "undefined") return {};

  const inbound = parseAttribution(window.location.search);
  if (Object.keys(inbound).length > 0) {
    persist(inbound);
    return inbound;
  }
  return loadPersisted();
}

/**
 * Attribution for the current visit, resolved after mount so that statically
 * exported pages hydrate without a markup mismatch.
 *
 * @returns {Record<string, string>} Empty until the first effect runs.
 */
export function useInboundAttribution() {
  const [attribution, setAttribution] = useState({});

  useEffect(() => {
    setAttribution(resolveAttribution());
  }, []);

  return attribution;
}
