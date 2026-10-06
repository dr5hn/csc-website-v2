import assert from "node:assert/strict";
import { test } from "node:test";
import { formatCount } from "./use-platform-stats.js";

/** A plus suffix must never claim more requests than have actually been served. */
test("abbreviated lower bounds floor counts instead of rounding up", () => {
  for (const n of [1999, 1999999, 1999999999]) {
    assert.equal(formatCount(n).value, 1.9);
  }
  assert.deepEqual(formatCount(250), { value: 250, suffix: "+", decimals: 0 });
});
