import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildFromApi as buildApiPricing } from "./use-api-pricing.js";
import { buildFromApi as buildExportPricing } from "./use-export-pricing.js";

/** Model the public API's nullable prices and limits. */
function plan(overrides = {}) {
  return {
    key: "supporter", name: "Supporter", priceMonthly: 9, priceAnnual: 90,
    dailyLimit: 1000, monthlyLimit: 30000, maxWhitelistEntries: 3,
    dataAccessLevel: "full", features: ["Live catalog feature"],
    featureFlags: { restApi: true, fuzzySearch: true }, badges: ["Most Popular"],
    ...overrides,
  };
}

/** Model the export tool's five packages, using deliberately different live prices. */
function packages() {
  return Object.fromEntries([
    ["CUSTOM", 1, 3], ["STARTER", 10, 25], ["BASIC", 20, 35],
    ["STANDARD", 30, 45], ["PREMIUM", 40, 55],
  ].map(([key, credits, price]) => [key, { name: key, credits, price }]));
}

describe("live export pricing", () => {
  it("derives prices, quantities and discounts from the response", () => {
    const result = buildExportPricing(packages());
    assert.equal(result.plans[1].price, "$25");
    assert.equal(result.plans[1].cta, "Buy 10 Credits");
    assert.equal(result.plans[3].description, "50% savings compared to Custom Credits.");
    assert.equal(result.customCredits.price, "$3.00");
  });

  it("rejects missing or invalid packages instead of displaying invalid money", () => {
    for (const value of [undefined, null, "20", -1, NaN, Infinity]) {
      const data = packages();
      data.STARTER.price = value;
      assert.throws(() => buildExportPricing(data), /Invalid credit package/);
    }
    const data = packages();
    data.CUSTOM.credits = 0;
    assert.throws(() => buildExportPricing(data), /Invalid credit package/);
    delete data.CUSTOM;
    assert.throws(() => buildExportPricing(data), /Invalid credit package/);
  });
});

describe("live API pricing", () => {
  it("does not advertise a paid monthly-only plan as free annually", () => {
    const result = buildApiPricing([plan({ priceAnnual: null })]);
    assert.equal(result.cards[0].price, "$9");
    assert.equal(result.cards[0].priceAnnual, null);
    assert.equal(result.sections[0].rows[1].values.supporter, "Not available");
  });

  it("retains free community pricing when the annual price is null", () => {
    const result = buildApiPricing([plan({ key: "community", priceMonthly: 0, priceAnnual: null })]);
    assert.equal(result.cards[0].priceAnnual, "$0");
    assert.equal(result.sections[0].rows[1].values.community, "Free");
  });

  it("renders nullable limits without discarding the live catalog", () => {
    const result = buildApiPricing([plan({ dailyLimit: null, monthlyLimit: null, maxWhitelistEntries: null })]);
    for (const row of result.sections[0].rows.slice(2)) {
      assert.equal(row.values.supporter, "Unlimited");
    }
  });

  it("keeps extended access separate from full translations access", () => {
    const result = buildApiPricing([plan({ dataAccessLevel: "coordinates" })]);
    for (const section of result.sections.slice(1, 4)) {
      assert.equal(section.rows[1].values.supporter, true);
      assert.equal(section.rows[2].values.supporter, false);
    }
  });

  it("rejects malformed or unrecognized catalogs so callers retain fallback data", () => {
    for (const payload of [null, {}, [], [{ key: "unknown" }], [plan({ priceMonthly: "9" })],
      [plan({ features: [{}] })], [plan({ featureFlags: { restApi: "false" } })]]) {
      assert.throws(() => buildApiPricing(payload), TypeError);
    }
  });

  it("uses live features and prices without requiring every tier to be active", () => {
    const result = buildApiPricing([plan({ priceMonthly: 12, priceAnnual: 130 })]);
    assert.equal(result.cards.length, 1);
    assert.equal(result.cards[0].price, "$12");
    assert.equal(result.cards[0].priceAnnual, "$130");
    assert.deepEqual(result.cards[0].features, ["Live catalog feature"]);
    assert.equal(result.sections[4].rows.find((row) => row.label === "Fuzzy / Typo-Tolerant Search").values.supporter, true);
  });
});
