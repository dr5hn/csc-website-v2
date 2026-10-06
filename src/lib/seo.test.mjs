import assert from "node:assert/strict";
import { test } from "node:test";
import { apiApplicationSchema, exportApplicationSchema } from "./seo.js";

/** New catalog amounts must appear instead of the fixed build-time prices. */
test("offers use the visible live catalog and selected billing interval", () => {
  const plans = [{ name: "Supporter", price: "$12", priceAnnual: "$120" }];
  const monthly = apiApplicationSchema(plans).offers[0];
  const annual = apiApplicationSchema(plans, true).offers[0];
  assert.equal(monthly.price, "12");
  assert.equal(monthly.priceSpecification.billingDuration, "P1M");
  assert.equal(annual.price, "120");
  assert.equal(annual.priceSpecification.billingDuration, "P1Y");
  assert.equal(exportApplicationSchema([{ name: "Starter", price: "$25", credits: "10 Credits" }]).offers[0].price, "25");
});

/** Annual mode must retain monthly-only paid plans and the free plan. */
test("offers handle nullable annual amounts without claiming paid plans are free", () => {
  const result = apiApplicationSchema([
    { name: "Community", price: "$0", priceAnnual: null },
    { name: "Supporter", price: "$12", priceAnnual: null },
  ], true);
  assert.deepEqual(result.offers.map((offer) => offer.price), ["0", "12"]);
  assert.ok(result.offers.every((offer) => offer.priceSpecification.billingDuration === "P1M"));
});

/** Contact-only and malformed prices must not be emitted as numeric offers. */
test("non-numeric prices never produce misleading structured amounts", () => {
  for (const price of ["Contact us", "", "$-5", "$1.2.3", "$9 per month", null, undefined, 9]) {
    const plans = [{ name: "Custom", price }];
    assert.deepEqual(apiApplicationSchema(plans).offers, [], String(price));
    assert.deepEqual(exportApplicationSchema(plans).offers, [], String(price));
  }
});

/** The API introduction has no full plan cards, so it must not advertise hidden offers. */
test("API introduction does not include undisplayed paid offers", () => {
  assert.equal(apiApplicationSchema().offers, undefined);
});
