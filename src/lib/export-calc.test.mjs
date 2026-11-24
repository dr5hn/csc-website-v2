import assert from "node:assert/strict";
import { test } from "node:test";

import { buildPreview, totalCredits } from "./export-calc.js";

const only = (...keys) => Object.fromEntries(keys.map((key) => [key, true]));

test("credits are the data types plus the format", () => {
  assert.equal(totalCredits(only("countries", "states"), "JSON"), 6);
  assert.equal(totalCredits(only("cities"), "CSV"), 7);
  assert.equal(totalCredits(only("countries", "states", "cities"), "PostgreSQL"), 13);
  assert.equal(totalCredits(only("counties"), "JSON"), 5);
  assert.equal(totalCredits(only("postcodes"), "JSON"), 7);
  assert.equal(totalCredits(only("counties", "postcodes"), "GeoJSON"), 18);
  assert.equal(totalCredits(only("countries", "states", "counties", "cities", "postcodes"), "JSON"), 18);
});

test("nothing selected costs nothing and produces no entries", () => {
  assert.equal(totalCredits(only(), "JSON"), 0);
  assert.deepEqual(buildPreview(only(), "JSON"), []);
});

test("the ZIP contains one data file per dataset or a shared workbook or script", () => {
  const types = only("counties", "postcodes");
  for (const [format, extension] of [["CSV", "csv"], ["JSON", "json"], ["YAML", "yml"], ["NDJSON", "ndjson"], ["XML", "xml"], ["Markdown", "md"], ["MongoDB", "json"], ["GeoJSON", "geojson"]]) {
    assert.deepEqual(buildPreview(types, format).map(({ file }) => file), [`counties.${extension}`, `postcodes.${extension}`]);
  }
  const workbook = buildPreview(types, "Excel");
  assert.deepEqual(workbook.map(({ file }) => file), ["workbook.xlsx"]);
  assert.match(workbook[0].text, /Sheet: Counties[\s\S]+Sheet: Postcodes/);
  const sqlite = buildPreview(types, "SQLite3");
  assert.deepEqual(sqlite.map(({ file }) => file), ["export.sql"]);
  assert.match(sqlite[0].text, /INSERT INTO "counties"[\s\S]+INSERT INTO "postcodes"/);
});

test("postcode previews preserve leading zeroes in JSON, CSV, YAML and SQL", () => {
  const types = only("postcodes");
  assert.equal(JSON.parse(buildPreview(types, "JSON")[0].text)[0].code, "02108");
  assert.match(buildPreview(types, "CSV")[0].text, /^"code".*\n"02108"/);
  assert.match(buildPreview(types, "YAML")[0].text, /^- code: "02108"/);
  assert.match(buildPreview(types, "SQL")[0].text, /'02108'/);
});

/** Guard against advertising paid exports as covered by the free trial. */
test("format estimates match export-tool base pricing", () => {
  for (const [format, cost] of Object.entries({ CSV: 3, Excel: 4, Markdown: 3, JSON: 2, NDJSON: 2, XML: 2, YAML: 2, SQL: 4, PostgreSQL: 5, "SQL Server": 5, SQLite3: 5, MongoDB: 3, GeoJSON: 7 })) {
    assert.equal(totalCredits(only("countries"), format), 1 + cost, format);
  }
});

/** MongoDB previews must be importable EJSON documents, as the export service emits. */
test("MongoDB preview uses EJSON lines and JSON files per dataset", () => {
  const lines = buildPreview(only("cities"), "MongoDB")[0].text.split("\n").map(JSON.parse);
  assert.deepEqual(lines[0].id, { $numberInt: "133024" });
  assert.equal(lines[1].name, "Pune");
  assert.deepEqual(lines[1].id, { $numberInt: "133504" });
  assert.equal(lines[0].latitude, "19.07283000");
});
