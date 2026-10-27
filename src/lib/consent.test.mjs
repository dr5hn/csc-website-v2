import assert from "node:assert/strict";
import { test } from "node:test";
import { analyticsCookieNames, CLARITY_ID, cookieDomains, GA_ID, loadAnalytics, readConsent, stopAnalytics, writeConsent } from "./consent.js";

const memory = (initial = {}) => {
  const data = { ...initial };
  return { localStorage: { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = v; } }, data };
};

/** Only the two recorded values count as a choice; anything else means the banner shows. */
test("readConsent returns a stored choice and treats everything else as undecided", () => {
  assert.equal(readConsent(memory({ "csc-cookie-consent": "granted" })), "granted");
  assert.equal(readConsent(memory({ "csc-cookie-consent": "denied" })), "denied");
  assert.equal(readConsent(memory()), null);
  assert.equal(readConsent(memory({ "csc-cookie-consent": "yes" })), null);
  assert.equal(readConsent({ localStorage: { getItem() { throw new Error("blocked"); } } }), null);
  assert.equal(readConsent({ get localStorage() { throw new Error("blocked"); } }), null);
});

/** Both blocked methods and a blocked storage getter must preserve a working choice UI. */
test("writeConsent stores valid choices and survives blocked storage", () => {
  const storage = memory();
  writeConsent(storage, "granted");
  assert.equal(storage.data["csc-cookie-consent"], "granted");
  writeConsent(storage, "invalid");
  assert.equal(storage.data["csc-cookie-consent"], "granted");
  assert.doesNotThrow(() => writeConsent({ localStorage: { setItem() { throw new Error("blocked"); } } }, "denied"));
  assert.doesNotThrow(() => writeConsent({ get localStorage() { throw new Error("blocked"); } }, "denied"));
});

/** Analytics must not touch the page until consent, load once, and be re-enabled (not duplicated) on a second grant. */
test("loadAnalytics injects one script, queues config, and is safe to repeat", () => {
  const appended = [];
  const doc = { createElement: () => ({}), head: { appendChild: (el) => appended.push(el) } };
  const win = {};
  loadAnalytics(win, doc);
  loadAnalytics(win, doc);
  assert.equal(appended.length, 2);
  assert.equal(appended[0].src, `https://www.clarity.ms/tag/${CLARITY_ID}`);
  assert.equal(appended[1].src, `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  assert.deepEqual([...win.dataLayer[0]], ["consent", "default", {
    analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  }]);
  assert.deepEqual([...win.dataLayer[1]], ["consent", "update", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  }]);
  assert.deepEqual([...win.dataLayer[3]], ["config", GA_ID, {
    allow_google_signals: false, allow_ad_personalization_signals: false,
  }]);
  assert.equal(win[`ga-disable-${GA_ID}`], false);
});

/** Cleanup must cover both measurement cookies and the parent domain. */
test("analytics cookie names and parent domains are found for cleanup", () => {
  assert.deepEqual(analyticsCookieNames("a=1; _ga=GA1.1; _ga_ABC=x; _gid=2; _clck=3; _clsk=4; csc-billing=annual"), ["_ga", "_ga_ABC", "_gid", "_clck", "_clsk"]);
  assert.deepEqual(analyticsCookieNames(""), []);
  assert.deepEqual(cookieDomains("www.countrystatecity.in"), ["www.countrystatecity.in", "countrystatecity.in"]);
  assert.deepEqual(cookieDomains("localhost"), ["localhost"]);
});

/** Legacy cookies must be removed even when the tag was never loaded on this page. */
test("stopAnalytics disables GA and expires its cookies on the host and parent domains", () => {
  const writes = [];
  const doc = { get cookie() { return "_ga=1; keep=2"; }, set cookie(value) { writes.push(value); } };
  const win = { location: { hostname: "www.countrystatecity.in" } };
  stopAnalytics(win, doc);
  assert.equal(win[`ga-disable-${GA_ID}`], true);
  assert.deepEqual(writes, [
    "_ga=; Max-Age=0; path=/",
    "_ga=; Max-Age=0; path=/; domain=www.countrystatecity.in",
    "_ga=; Max-Age=0; path=/; domain=countrystatecity.in",
  ]);
});

/** No queued events or cookieless consent pings after withdrawal; reaccept restores analytics only. */
test("withdrawal blocks events and a later grant restores analytics consent", () => {
  const doc = { get cookie() { return ""; }, set cookie(_) {} };
  doc.createElement = () => ({});
  doc.head = { appendChild() {} };
  const win = { location: { hostname: "countrystatecity.in" } };
  loadAnalytics(win, doc);
  const before = win.dataLayer.length;
  stopAnalytics(win, doc);
  win.gtag("event", "click");
  assert.equal(win.dataLayer.length, before);
  loadAnalytics(win, doc);
  assert.deepEqual([...win.dataLayer.at(-1)], ["consent", "update", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  }]);
});
