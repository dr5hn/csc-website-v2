import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { test } from "node:test";
import sitemap from "../app/sitemap.js";
import { SITE_URL } from "./seo.js";

/** Every public page in this static site must have exactly one canonical sitemap entry. */
test("sitemap covers every public page without missing, duplicate or obsolete URLs", async () => {
  const files = await readdir(new URL("../app/", import.meta.url), { recursive: true });
  const pages = files.filter((file) => /(^|\/)page\.(js|jsx|ts|tsx)$/.test(file));
  const expected = pages.map((file) => new URL(file.replace(/page\.(js|jsx|ts|tsx)$/, ""), `${SITE_URL}/`).href);
  assert.deepEqual(sitemap().map(({ url }) => url).sort(), expected.sort());
});
