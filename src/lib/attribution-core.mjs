/**
 * Pure attribution helpers, kept free of React so they can be unit-tested under
 * plain `node --test`. The client-side hook lives in `./attribution.js`.
 *
 * Inbound `?source=&campaign=&package=` values are attacker-supplied: anyone can
 * craft a link to the marketing site. Everything here treats them as untrusted.
 */

export const ATTRIBUTION_KEYS = ["source", "campaign", "package"];

/** Task 06's approved source names. Anything else is discarded, not forwarded. */
export const ALLOWED_SOURCES = ["npm", "github", "cli", "sdk_docs", "playground"];

/** Caps outbound URL growth and keeps junk out of downstream event logs. */
export const MAX_VALUE_LENGTH = 64;

/** Campaign/package have no fixed allowlist, so constrain their shape instead. */
const SAFE_VALUE = /^[A-Za-z0-9._-]+$/;

const APP_HOSTNAME = "app.countrystatecity.in";

/**
 * Normalises a single attribution value.
 *
 * @param {string} key - One of ATTRIBUTION_KEYS.
 * @param {unknown} value - Raw value from a URL or from session storage.
 * @returns {string|null} The accepted value, or null if it must be dropped.
 */
function sanitizeValue(key, value) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_VALUE_LENGTH) return null;

  if (key === "source") {
    return ALLOWED_SOURCES.includes(trimmed) ? trimmed : null;
  }
  // Rejects emails, spaces and punctuation, so a crafted link cannot smuggle
  // personal data through campaign/package into the app's event pipeline.
  return SAFE_VALUE.test(trimmed) ? trimmed : null;
}

/**
 * Filters an arbitrary object down to the attribution keys that survive
 * validation. Safe to run on session-storage contents.
 *
 * @param {unknown} input
 * @returns {Record<string, string>}
 */
export function sanitizeAttribution(input) {
  const attribution = {};
  if (!input || typeof input !== "object") return attribution;

  for (const key of ATTRIBUTION_KEYS) {
    const value = sanitizeValue(key, input[key]);
    if (value) attribution[key] = value;
  }
  return attribution;
}

/**
 * Extracts validated attribution from a URL query string.
 *
 * @param {string} search - e.g. `?source=npm&package=countries`.
 * @returns {Record<string, string>}
 */
export function parseAttribution(search) {
  const params = new URLSearchParams(search || "");
  const raw = {};
  for (const key of ATTRIBUTION_KEYS) raw[key] = params.get(key);
  return sanitizeAttribution(raw);
}

/**
 * True only for absolute URLs whose host is the CSC app. Compares the parsed
 * hostname rather than matching a substring, so `https://evil.com/app.country…`
 * does not qualify.
 *
 * @param {unknown} href
 * @returns {boolean}
 */
export function isAppUrl(href) {
  if (typeof href !== "string") return false;
  try {
    return new URL(href).hostname === APP_HOSTNAME;
  } catch {
    return false; // Relative hrefs such as "/product/api".
  }
}

/**
 * Appends attribution to `href` via URL parsing, so an existing query string,
 * a fragment, or a duplicate key are all handled correctly.
 *
 * @param {string} href - Absolute destination URL.
 * @param {Record<string, string>} attribution
 * @returns {string} `href` unchanged when there is nothing valid to append.
 */
export function withAttribution(href, attribution) {
  const accepted = sanitizeAttribution(attribution);
  const keys = Object.keys(accepted);
  if (keys.length === 0) return href;

  let url;
  try {
    url = new URL(href);
  } catch {
    return href;
  }

  // set() rather than append() so we never emit the same key twice.
  for (const key of keys) url.searchParams.set(key, accepted[key]);
  return url.toString();
}
