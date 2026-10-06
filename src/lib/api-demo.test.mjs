import assert from "node:assert/strict";
import { test } from "node:test";
import { runDemo } from "./api-demo.js";

/** Invalid coordinates must never produce misleading distances. */
test("nearby rejects incomplete, non-finite and out-of-range coordinates", () => {
  for (const query of ["19", "19,", ",72", " , ", "91,0", "0,-181", "Infinity,0", "19,72,1", "abc,72"]) {
    assert.deepEqual(runDemo(2, query), [], query);
  }
});

/** Valid coordinates still return ordered, finite distances. */
test("nearby finds Mumbai and accepts zero coordinates", () => {
  assert.equal(runDemo(2, "19.0760, 72.8777")[0].name, "Mumbai");
  assert.equal(runDemo(2, "19.0760, 72.8777")[0].tag, "0 km");
  assert.equal(runDemo(2, "0,0").length, 3);
  assert.ok(runDemo(2, "0,0").every((row) => !row.tag.includes("NaN")));
});

/** Real IANA rules must change the displayed offset across seasons. */
test("timezone demo accounts for northern and southern daylight saving", () => {
  const january = new Date("2026-01-15T12:00:00Z");
  const july = new Date("2026-07-15T12:00:00Z");
  assert.equal(runDemo(3, "Munich", january)[0].tag, "UTC+1");
  assert.equal(runDemo(3, "Munich", july)[0].tag, "UTC+2");
  assert.equal(runDemo(3, "Sydney", january)[0].tag, "UTC+11");
  assert.equal(runDemo(3, "Sydney", july)[0].tag, "UTC+10");
  assert.equal(runDemo(3, "Mumbai", january)[0].tag, "UTC+5:30");
});
