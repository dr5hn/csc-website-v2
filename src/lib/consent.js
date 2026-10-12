// Basic consent mode: the Google tag is not requested until analytics consent.
export const CONSENT_KEY = "csc-cookie-consent";
export const OPEN_EVENT = "csc:open-cookie-settings";
export const GA_ID = "G-XPF0QLDXVS";

const GA_COOKIE = /^(_ga|_gid$|_gat)/;
const DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

/** The stored choice: "granted", "denied", or null when the visitor has not chosen (or storage is blocked). */
export function readConsent(win) {
  try {
    const value = win.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Save a valid choice, including when accessing localStorage itself is blocked. */
export function writeConsent(win, value) {
  if (value !== "granted" && value !== "denied") return;
  try {
    win.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice holds for this visit only.
  }
}

/** Load Google Analytics once, after consent. Safe to call again: later calls only re-enable it. */
export function loadAnalytics(win, doc) {
  win[`ga-disable-${GA_ID}`] = false;
  if (!win.__cscAnalyticsLoaded) {
    win.dataLayer = win.dataLayer || [];
    win.gtag = function gtag() {
      // Also gate our event helpers and queued events during withdrawal.
      if (win[`ga-disable-${GA_ID}`]) return;
      win.dataLayer.push(arguments);
    };
    win.gtag("consent", "default", { ...DENIED });
  }
  // Analytics acceptance never grants advertising consent.
  win.gtag("consent", "update", { ...DENIED, analytics_storage: "granted" });
  if (win.__cscAnalyticsLoaded) return;
  win.__cscAnalyticsLoaded = true;
  win.gtag("js", new Date());
  win.gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = doc.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  doc.head.appendChild(script);
}

/** Cookie names Google Analytics sets, read from a document.cookie string. */
export function analyticsCookieNames(cookieString) {
  return cookieString
    .split(";")
    .map((pair) => pair.split("=")[0].trim())
    .filter((name) => GA_COOKIE.test(name));
}

/** Host and every parent domain a cookie could have been set on: a.b.in → ["a.b.in", "b.in"]. */
export function cookieDomains(hostname) {
  const parts = hostname.split(".");
  return parts.slice(0, Math.max(parts.length - 1, 1)).map((_, i) => parts.slice(i).join("."));
}

/** Stop Analytics and remove its cookies (used when a visitor declines or withdraws consent). */
export function stopAnalytics(win, doc) {
  win[`ga-disable-${GA_ID}`] = true;
  // Do not send a consent-mode ping after withdrawal. The UI reloads a loaded
  // page to discard Google's listeners; the next page will not load the tag.
  for (const name of analyticsCookieNames(doc.cookie)) {
    doc.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of cookieDomains(win.location.hostname)) {
      doc.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
  }
}
