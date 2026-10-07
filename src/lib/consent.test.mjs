import assert from "node:assert/strict";
import { test } from "node:test";
import { analyticsCookieNames, cookieDomains, GA_ID, loadAnalytics, readConsent, stopAnalytics, writeConsent } from "./consent.js";

const memory = (initial = {}) => {
  const data = { ...initial };
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = v; }, data };
};

/** Only the two recorded values count as a choice; anything else means the banner shows. */
test("readConsent returns a stored choice and treats everything else as undecided", () => {
  assert.equal(readConsent(memory({ "csc-cookie-consent": "granted" })), "granted");
  assert.equal(readConsent(memory({ "csc-cookie-consent": "denied" })), "denied");
  assert.equal(readConsent(memory()), null);
  assert.equal(readConsent(memory({ "csc-cookie-consent": "yes" })), null);
  assert.equal(readConsent({ getItem() { throw new Error("blocked"); } }), null);
});

test("writeConsent stores the choice and survives blocked storage", () => {
  const storage = memory();
  writeConsent(storage, "granted");
  assert.equal(storage.data["csc-cookie-consent"], "granted");
  assert.doesNotThrow(() => writeConsent({ setItem() { throw new Error("blocked"); } }, "denied"));
});

/** Analytics must not touch the page until consent, load once, and be re-enabled (not duplicated) on a second grant. */
test("loadAnalytics injects one script, queues config, and is safe to repeat", () => {
  const appended = [];
  const doc = { createElement: () => ({}), head: { appendChild: (el) => appended.push(el) } };
  const win = {};
  loadAnalytics(win, doc);
  loadAnalytics(win, doc);
  assert.equal(appended.length, 1);
  assert.equal(appended[0].src, `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  assert.deepEqual([...win.dataLayer[1]], ["config", GA_ID]);
  assert.equal(win[`ga-disable-${GA_ID}`], false);
});

test("analytics cookie names and parent domains are found for cleanup", () => {
  assert.deepEqual(analyticsCookieNames("a=1; _ga=GA1.1; _ga_ABC=x; _gid=2; csc-billing=annual"), ["_ga", "_ga_ABC", "_gid"]);
  assert.deepEqual(analyticsCookieNames(""), []);
  assert.deepEqual(cookieDomains("www.countrystatecity.in"), ["www.countrystatecity.in", "countrystatecity.in"]);
  assert.deepEqual(cookieDomains("localhost"), ["localhost"]);
});

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

/** Withdrawing consent must also tell a loaded Analytics, not only clear cookies. */
test("stopAnalytics signals withdrawn consent when Analytics is loaded", () => {
  const calls = [];
  const doc = { get cookie() { return ""; }, set cookie(_) {} };
  const win = { gtag: (...args) => calls.push(args), location: { hostname: "countrystatecity.in" } };
  stopAnalytics(win, doc);
  assert.deepEqual(calls, [["consent", "update", { analytics_storage: "denied" }]]);
});
