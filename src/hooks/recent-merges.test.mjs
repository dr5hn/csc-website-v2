import assert from "node:assert/strict";
import { test } from "node:test";
import { buildRecentMerges } from "./use-recent-merges.js";

const pr = (overrides = {}) => ({ number: 1719, title: "fix(cities): correct a city (#1643 research)", merged_at: "2026-10-06T12:07:27Z", user: { type: "User" }, labels: [{ name: "data:cities" }], ...overrides });

/** Display actual human merges in merge order, excluding automated exports and closed PRs. */
test("feed filters non-merges and automation, sorts by merge time and caps at five", () => {
  const prs = Array.from({ length: 7 }, (_, i) => pr({ number: 100 + i, merged_at: `2026-10-0${i + 1}T12:00:00Z` }));
  const result = buildRecentMerges([...prs, pr({ merged_at: null }), pr({ user: { type: "Bot" } }), pr({ title: "Database Export v3" }), pr({ labels: [{ name: "automated" }] }), pr({ labels: [{ name: "exports" }] })]);
  assert.deepEqual(result.map((p) => p.number), [106, 105, 104, 103, 102]);
  assert.equal(result[0].url, "https://github.com/dr5hn/countries-states-cities-database/pull/106");
  assert.equal(result[0].text, "Correct a city");
  assert.equal(result[0].scope, "cities");
  assert.equal(result[0].date, "Oct 7, 2026");
});

/** Malformed public fields must not become broken dates, empty labels or unsafe links. */
test("malformed records are discarded without losing valid records", () => {
  for (const bad of [null, {}, pr({ number: "../issues/1" }), pr({ number: -1 }), pr({ number: 1.5 }), pr({ title: null }), pr({ title: " " }), pr({ merged_at: "bad" }), pr({ merged_at: "2026-02-30T00:00:00Z" }), pr({ merged_at: "2026-99-99T00:00:00Z" }), pr({ labels: null }), pr({ labels: [null] }), pr({ user: null })]) {
    assert.deepEqual(buildRecentMerges([bad, pr()]).map((p) => p.number), [1719]);
  }
  assert.throws(() => buildRecentMerges({ message: "rate limited" }), TypeError);
  assert.deepEqual(buildRecentMerges([]), []);
});

/** Titles remain plain data even if they look like markup or agent instructions. */
test("title handling preserves untrusted text without deriving links from it", () => {
  const result = buildRecentMerges([pr({ title: '<script>alert("x")</script>', labels: [{ name: "data:states" }] })])[0];
  assert.equal(result.text, '<script>alert("x")</script>');
  assert.equal(result.scope, "states");
  assert.equal(result.kind, "update");
  assert.equal(result.url, "https://github.com/dr5hn/countries-states-cities-database/pull/1719");
});
