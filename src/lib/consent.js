// Cookie consent for analytics. Google Analytics is the only thing here that sets cookies, and it
// loads only after a visitor accepts: until then no request goes to Google and no _ga cookie exists.
export const CONSENT_KEY = "csc-cookie-consent";
export const OPEN_EVENT = "csc:open-cookie-settings";
export const GA_ID = "G-XPF0QLDXVS";

const GA_COOKIE = /^(_ga|_gid$|_gat)/;

/** The stored choice: "granted", "denied", or null when the visitor has not chosen (or storage is blocked). */
export function readConsent(storage) {
  try {
    const value = storage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(storage, value) {
  try {
    storage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice holds for this visit only.
  }
}

/** Load Google Analytics once, after consent. Safe to call again: later calls only re-enable it. */
export function loadAnalytics(win, doc) {
  win[`ga-disable-${GA_ID}`] = false;
  if (win.__cscAnalyticsLoaded) return;
  win.__cscAnalyticsLoaded = true;
  win.dataLayer = win.dataLayer || [];
  win.gtag = function gtag() {
    // GA reads the Arguments object itself; pushing a plain array does not work.
    win.dataLayer.push(arguments);
  };
  win.gtag("js", new Date());
  win.gtag("config", GA_ID);
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
  // Tell a loaded Analytics that storage is withdrawn, so its closing hits on this page carry no cookies.
  if (typeof win.gtag === "function") win.gtag("consent", "update", { analytics_storage: "denied" });
  for (const name of analyticsCookieNames(doc.cookie)) {
    doc.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of cookieDomains(win.location.hostname)) {
      doc.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
  }
}
