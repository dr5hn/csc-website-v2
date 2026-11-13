import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { test } from "node:test";
import { GET } from "../app/llms.txt/route.js";
import { NPM_PACKAGES } from "./npm-packages.js";
import { PYPI_PACKAGES } from "../data/ecosystem-channels.js";
import { SITE_URL } from "./seo.js";

/** Adding a published package must also update the index consumed by answer engines. */
test("machine-readable index links every official npm and Python package once", async () => {
  const response = GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
  const text = await response.text();
  const urls = [...text.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map((match) => match[1]);
  for (const [packages, prefix, suffix] of [[NPM_PACKAGES, "https://www.npmjs.com/package/", ""], [PYPI_PACKAGES, "https://pypi.org/project/", "/"]]) {
    assert.deepEqual(urls.filter((url) => url.startsWith(prefix)).sort(), packages.map(({ name }) => `${prefix}${name}${suffix}`).sort());
  }
});

/** References must resolve to real source pages or public artifacts before a static deployment. */
test("machine-readable index references existing local pages and artifacts", async () => {
  const text = await GET().text();
  const paths = [...text.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map((match) => new URL(match[1])).filter((url) => url.origin === SITE_URL).map((url) => url.pathname);
  for (const path of paths) {
    const file = path.endsWith("/") ? `../app${path}page.jsx` : `../../public${path}`;
    await assert.doesNotReject(access(new URL(file, import.meta.url)), path);
  }
});
