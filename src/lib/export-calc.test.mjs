import assert from "node:assert/strict";
import { test } from "node:test";

import { buildPreview, fileName, totalCredits } from "./export-calc.js";

const only = (...keys) => ({ countries: keys.includes("countries"), states: keys.includes("states"), cities: keys.includes("cities") });

test("credits are the data types plus the format", () => {
  // Matches the "Countries + States · JSON = 6 credits" example on the pricing page.
  assert.equal(totalCredits(only("countries", "states"), "JSON"), 6);
  assert.equal(totalCredits(only("cities"), "CSV"), 7);
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

/** Guard against advertising paid exports as covered by the free trial. */
test("format estimates match export-tool base pricing", () => {
  for (const [format, cost] of Object.entries({ CSV: 3, Excel: 4, Markdown: 3, JSON: 2, NDJSON: 2, XML: 2, YAML: 2, SQL: 4, PostgreSQL: 5, "SQL Server": 5, SQLite3: 5, MongoDB: 3, GeoJSON: 4 })) {
    assert.equal(totalCredits(only("countries"), format), 1 + cost, format);
  }
});

/** MongoDB previews must be importable EJSON documents, as the export service emits. */
test("MongoDB preview uses EJSON lines and JSON files per dataset", () => {
  const lines = buildPreview(only("cities"), "MongoDB", false).split("\n").map(JSON.parse);
  assert.deepEqual(lines[0].id, { $numberInt: "133024" });
  assert.equal(lines[1].name, "Pune");
  assert.deepEqual(lines[1].id, { $numberInt: "133504" });
  assert.equal(lines[0].latitude, "19.07283000");
  assert.equal(fileName(only("countries", "cities"), "MongoDB"), "2 files · .json");
});
