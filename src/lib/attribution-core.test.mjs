import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ALLOWED_SOURCES,
  MAX_VALUE_LENGTH,
  isAppUrl,
  parseAttribution,
  sanitizeAttribution,
  withAttribution,
} from "./attribution-core.mjs";

const HERO =
  "https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=hero_signup";
const PLAN =
  "https://app.countrystatecity.in/pricing?plan=starter&utm_source=website";
const FULL = { source: "npm", campaign: "sdk_api_migration", package: "countries" };

describe("parseAttribution", () => {
  it("accepts every approved source name", () => {
    for (const source of ALLOWED_SOURCES) {
      assert.equal(parseAttribution(`?source=${source}`).source, source);
    }
  });

  it("drops source values outside the allowlist", () => {
    for (const bad of ["totally-made-up", "NPM", "<script>", "npm;github"]) {
      const parsed = parseAttribution(`?source=${encodeURIComponent(bad)}`);
      assert.equal(parsed.source, undefined, `expected ${bad} to be rejected`);
    }
    // " npm " trims back to an approved value and is kept.
    assert.equal(parseAttribution("?source=%20npm%20").source, "npm");
  });

  it("drops values over the length cap", () => {
    const long = "a".repeat(MAX_VALUE_LENGTH + 1);
    assert.deepEqual(parseAttribution(`?campaign=${long}`), {});
    assert.equal(
      parseAttribution(`?campaign=${"a".repeat(MAX_VALUE_LENGTH)}`).campaign.length,
      MAX_VALUE_LENGTH
    );
  });

  it("rejects personal data smuggled through campaign or package", () => {
    assert.deepEqual(parseAttribution("?campaign=user%40example.com"), {});
    assert.deepEqual(parseAttribution("?package=Jane%20Doe"), {});
    assert.deepEqual(parseAttribution("?package=%2Betc"), {});
  });

  it("ignores empty and missing params", () => {
    assert.deepEqual(parseAttribution(""), {});
    assert.deepEqual(parseAttribution("?source=&campaign="), {});
    assert.deepEqual(parseAttribution("?utm_source=website"), {});
  });

  it("takes the first value when a param repeats", () => {
    assert.equal(parseAttribution("?source=npm&source=github").source, "npm");
  });

  it("parses a full inbound link", () => {
    assert.deepEqual(
      parseAttribution("?source=npm&campaign=sdk_api_migration&package=countries"),
      FULL
    );
  });
});

describe("sanitizeAttribution", () => {
  it("re-validates untrusted stored objects", () => {
    assert.deepEqual(sanitizeAttribution({ source: "evil", campaign: "ok" }), {
      campaign: "ok",
    });
    assert.deepEqual(sanitizeAttribution({ source: 42 }), {});
  });

  it("ignores non-objects and unknown keys", () => {
    for (const input of [null, undefined, "npm", 7]) {
      assert.deepEqual(sanitizeAttribution(input), {});
    }
    assert.deepEqual(sanitizeAttribution({ evil: "x", source: "cli" }), {
      source: "cli",
    });
  });
});

describe("isAppUrl", () => {
  it("matches the app host only", () => {
    assert.equal(isAppUrl(HERO), true);
    assert.equal(isAppUrl(PLAN), true);
  });

  it("rejects look-alike hosts that a substring check would accept", () => {
    assert.equal(isAppUrl("https://evil.com/app.countrystatecity.in"), false);
    assert.equal(isAppUrl("https://app.countrystatecity.in.evil.com"), false);
    assert.equal(isAppUrl("https://evil.com/?x=app.countrystatecity.in"), false);
  });

  it("rejects other CSC hosts and relative hrefs", () => {
    assert.equal(isAppUrl("https://countrystatecity.in"), false);
    assert.equal(isAppUrl("https://export.countrystatecity.in"), false);
    assert.equal(isAppUrl("/product/api"), false);
    assert.equal(isAppUrl(undefined), false);
  });
});

describe("withAttribution", () => {
  it("leaves the href untouched when there is nothing to add", () => {
    assert.equal(withAttribution(HERO, {}), HERO);
    assert.equal(withAttribution(HERO, null), HERO);
    assert.equal(withAttribution(HERO, { source: "not-allowed" }), HERO);
  });

  it("preserves existing query params", () => {
    const url = new URL(withAttribution(HERO, FULL));
    assert.equal(url.searchParams.get("utm_content"), "hero_signup");
    assert.equal(url.searchParams.get("source"), "npm");
    assert.equal(url.searchParams.get("campaign"), "sdk_api_migration");
    assert.equal(url.searchParams.get("package"), "countries");
  });

  it("keeps the query ahead of a fragment", () => {
    const out = withAttribution("https://app.countrystatecity.in/pricing#plans", FULL);
    assert.ok(out.endsWith("#plans"), out);
    assert.equal(new URL(out).searchParams.get("source"), "npm");
  });

  it("never emits a duplicate key", () => {
    const out = withAttribution(`${HERO}&source=website`, { source: "npm" });
    assert.deepEqual(new URL(out).searchParams.getAll("source"), ["npm"]);
  });

  it("composes with the annual billing interval", () => {
    const url = new URL(`${withAttribution(PLAN, FULL)}&interval=annual`);
    assert.equal(url.searchParams.get("plan"), "starter");
    assert.equal(url.searchParams.get("source"), "npm");
    assert.equal(url.searchParams.get("interval"), "annual");
  });

  it("encodes rather than injects", () => {
    // Values reaching here are already validated, but defence in depth matters
    // if a caller ever passes raw input.
    const out = withAttribution(HERO, { campaign: "a&admin=1" });
    assert.equal(out, HERO, "invalid campaign should be dropped, not encoded in");
    const url = new URL(withAttribution(HERO, { package: "a.b-c_d" }));
    assert.equal(url.searchParams.get("package"), "a.b-c_d");
    assert.equal(url.searchParams.get("admin"), null);
  });

  it("returns unparseable hrefs unchanged", () => {
    assert.equal(withAttribution("/product/api", FULL), "/product/api");
  });
});
