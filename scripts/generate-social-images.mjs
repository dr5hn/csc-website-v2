// Run after npm run build. Render native HTML cards using the site's fonts and brand assets.
import { readFile, readdir } from "node:fs/promises";
import { chromium } from "playwright";
import { STAT_DESCRIPTIONS } from "../src/lib/stats.js";

const cards = [
  ["home", "Open geographic data", "Every city, stacked. One request away.", STAT_DESCRIPTIONS.fullCoverage + ".", "/"],
  ["api", "REST + GraphQL API", "The geography API that forgives typos.", "Fuzzy search, autocomplete, nearby search and timezone helpers.", "/product/api/"],
  ["database", "Open database", "Country, state and city data. Yours to download.", "12 formats · Linked IDs · ODbL-1.0 data licence.", "/product/database/"],
  ["about", "About · since 2018", "Open geographic data, maintained with the community.", "Built and maintained by Darshan Gada, with community contributions.", "/about/"],
  ["ecosystem", "Ecosystem", "One dataset. Nine ways to use it.", "API, npm, PyPI, CLI, exports and more.", "/ecosystem/"],
  ["export-tool", "Export Tool", "The slice you need, in the format you use.", "13 formats · Filters · Translated names · Pay once for credits.", "/product/export-tool/"],
  ["update-tool", "Update Tool", "Help keep geographic data accurate.", "Submit a correction with a source and follow its review.", "/product/update-tool/"],
  ["pricing", "Pricing", "Free data. Flexible API access and exports.", "Compare API plans and one-time export credit packs.", "/pricing/"],
  ["faqs", "Help centre", "Your data and API questions, answered.", "Coverage, licensing, integration, pricing and request limits.", "/faqs/"],
  ["support", "Contact", "Find the right route for your question.", "Documentation, community support and plan-specific help.", "/contact/"],
];

/** Escape all template text before inserting it into HTML. */
function escape(text) {
  return text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

/** Embed local assets so rendering needs no server or network connection. */
async function asset(path, type) {
  return `data:${type};base64,${(await readFile(path)).toString("base64")}`;
}

const chunks = "out/_next/static/chunks";
let fonts = "";
for (const name of await readdir(chunks)) {
  if (!name.endsWith(".css")) continue;
  const css = await readFile(`${chunks}/${name}`, "utf8");
  for (const block of css.match(/@font-face\{[^}]+\}/g) ?? []) {
    if (!/font-family:(Cal Sans|Geist);/.test(block)) continue;
    const path = /url\(\.\.\/media\/([^)]+)\)/.exec(block)?.[1];
    if (path) fonts += block.replace(`../media/${path}`, await asset(`out/_next/static/media/${path}`, "font/woff2"));
  }
}
if (!fonts.includes("Cal Sans")) throw new Error("Build the site first to load its fonts.");
const logo = await asset("public/favicon.svg", "image/svg+xml");
const world = await asset("public/images/voxel-world.png", "image/png");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const [name, label, title, description, path] of cards) {
    await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>${fonts}
      *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;color:#101a2a;background:#fff;font-family:Geist,Arial,sans-serif}
      .brand{position:absolute;top:58px;left:60px;display:flex;align-items:center;gap:12px;font-size:28px;font-weight:600}.brand img{width:44px;height:44px}
      .map{position:absolute;right:36px;top:38px;width:524px;height:554px;border-radius:38px;background:#eef5fd;overflow:hidden}.map img{position:absolute;width:620px;height:auto;top:88px;left:-36px}
      .copy{position:absolute;left:60px;top:240px;width:620px;padding-right:20px}.label{font:20px monospace;text-transform:uppercase;letter-spacing:2px;color:#276bac}
      h1{margin:20px 0 18px;font-family:Cal Sans,Arial,sans-serif;font-size:54px;line-height:1;letter-spacing:-1px;font-weight:400}p{font-size:24px;line-height:1.35;margin:0;color:#465369}
      .url{position:absolute;bottom:42px;left:60px;font:19px monospace;color:#465369}.badge{position:absolute;right:64px;bottom:62px;width:435px;border-radius:24px;background:white;padding:26px;color:#276bac;font:22px monospace}
      </style><div class="map"><img src="${world}" alt=""></div><div class="brand"><img src="${logo}" alt="">CountryStateCity</div>
      <div class="copy"><div class="label">${escape(label)}</div><h1>${escape(title)}</h1><p>${escape(description)}</p></div>
      <div class="url">countrystatecity.in${escape(path)}</div><div class="badge">Open data. Linked records.</div></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("img").evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
    if (await page.locator(".copy").evaluate((element) => element.getBoundingClientRect().bottom > 550)) {
      throw new Error(`Social card text overflows: ${name}`);
    }
    await page.screenshot({ path: `public/og/${name}.png` });
  }
} finally {
  await browser.close();
}
