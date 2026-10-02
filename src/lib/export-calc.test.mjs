import assert from "node:assert/strict";
import { test } from "node:test";

import { buildPreview, fileName, totalCredits } from "./export-calc.js";

const only = (...keys) => ({ countries: keys.includes("countries"), states: keys.includes("states"), cities: keys.includes("cities") });

test("credits are the data types plus the format", () => {
  // Matches the "Countries + States · JSON = 6 credits" example on the pricing page.
  assert.equal(totalCredits(only("countries", "states"), "JSON"), 6);
  assert.equal(totalCredits(only("cities"), "CSV"), 5);
  assert.equal(totalCredits(only("countries", "states", "cities"), "PostgreSQL"), 13);
});

test("nothing selected costs nothing and previews a prompt", () => {
  assert.equal(totalCredits(only(), "JSON"), 0);
  assert.match(buildPreview(only(), "JSON", false), /Pick at least one/);
});

test("multi-table tabular exports are several files", () => {
  assert.equal(fileName(only("countries", "states"), "CSV"), "2 files · .csv");
  assert.equal(fileName(only("countries", "states"), "JSON"), "countries-states.json");
});

test("translations only touch countries and states", () => {
  assert.match(buildPreview(only("countries"), "JSON", true), /"fr": "Inde"/);
  assert.doesNotMatch(buildPreview(only("cities"), "JSON", true), /translations/);
});
