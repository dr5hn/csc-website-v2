import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { PACKAGES, downloadWindow, packageDownloads, releaseDownloads, refreshMetrics, validMetric } from "./adoption-stats.mjs";

const now = new Date("2026-11-12T06:17:00.000Z");
const window = { start: "2026-10-12", end: "2026-11-10" };

/** Return bounded provider fixtures with zero-download days intentionally absent. */
async function provider(url) {
  const parsed = new URL(url);
  if (parsed.hostname === "api.github.com") return [{ draft: false, assets: [{ id: 1, name: "countries.json", download_count: 17 }] }];
  const name = decodeURIComponent(parsed.hostname === "api.npmjs.org" ? parsed.pathname.split("/").at(-1) : parsed.pathname.split("/")[3]);
  if (parsed.hostname === "api.npmjs.org") {
    const [start, end] = parsed.pathname.split("/")[3].split(":");
    return { package: name, start, end, downloads: 7 };
  }
  return { package: name, type: "overall_downloads", data: [
    { category: "without_mirrors", date: "2026-10-11", downloads: 100 },
    { category: "without_mirrors", date: window.start, downloads: 2 },
    { category: "without_mirrors", date: window.end, downloads: 3 },
    { category: "without_mirrors", date: "2026-11-11", downloads: 100 },
  ] };
}

/** A full UTC period must cross month and year boundaries without local-time shifts. */
test("download windows contain 30 complete UTC days with reporting allowance", () => {
  assert.deepEqual(downloadWindow(now), window);
  assert.deepEqual(downloadWindow(new Date("2026-01-02T00:00:00Z")), { start: "2025-12-02", end: "2025-12-31" });
});

/** Every configured package is counted once; mirror/out-of-period rows cannot inflate PyPI totals. */
test("provider aggregation counts all packages and the explicit period", async () => {
  const npm = await packageDownloads("npm", provider, window, now.toISOString());
  const pypi = await packageDownloads("pypi", provider, window, now.toISOString());
  assert.equal(npm.downloads, PACKAGES.npm.length * 7);
  assert.equal(pypi.downloads, PACKAGES.pypi.length * 5);
  for (const [key, metric] of Object.entries({ npm, pypi })) assert.equal(validMetric(key, metric), true);
  const inactive = await packageDownloads("pypi", async (url) => {
    const data = await provider(url);
    return data.package === PACKAGES.pypi[0] ? { ...data, data: [] } : data;
  }, window, now.toISOString());
  assert.equal(inactive.packages[0].downloads, 0);
  assert.equal(inactive.downloads, (PACKAGES.pypi.length - 1) * 5);
});

/** A mismatched name/window or invalid provider row invalidates the whole ecosystem metric. */
test("malformed or stale responses cannot become download totals", async () => {
  for (const patch of [{ package: "unrelated" }, { start: "2026-10-13" }, { downloads: -1 }, { downloads: "100" }]) {
    await assert.rejects(packageDownloads("npm", async (url) => ({ ...await provider(url), ...patch }), window, now.toISOString()), TypeError);
  }
  for (const row of [
    { category: "with_mirrors", date: window.end, downloads: 999 },
    { category: "without_mirrors", date: "not-a-date", downloads: 3 },
    { category: "without_mirrors", date: "2026-02-30", downloads: 3 },
    { category: "without_mirrors", date: "2026-10-01", downloads: 3 },
    { category: "without_mirrors", date: window.end, downloads: null },
  ]) await assert.rejects(packageDownloads("pypi", async (url) => ({ ...await provider(url), data: [row] }), window, now.toISOString()), TypeError);
});

/** Paginate past the first 100 releases and count only downloadable database files. */
test("GitHub lifetime counts include older releases and exclude supporting assets", async () => {
  const calls = [];
  const result = await releaseDownloads(async (url) => {
    calls.push(url);
    if (calls.length === 1) return Array.from({ length: 100 }, (_, i) => ({ draft: false, assets: [{ id: i + 1, name: "world.sql.gz", download_count: 2 }] }));
    return [
      { draft: true, assets: [{ id: 101, name: "draft.json", download_count: 999 }] },
      { draft: false, prerelease: true, assets: [
        { id: 102, name: "countries.json", download_count: 3 },
        { id: 103, name: "SHA256SUMS", download_count: 999 },
        { id: 104, name: "NOTICE-SOURCES.txt", download_count: 999 },
        { id: 105, name: "migrations-from-v4.0.tar.gz", download_count: 999 },
        { id: 106, name: "mongodb-world-mongodb-dump.tar.gz", download_count: 5 },
      ] },
    ];
  }, now.toISOString());
  assert.equal(calls.length, 2);
  assert.ok(calls[1].endsWith("page=2"));
  assert.deepEqual(result, { downloads: 208, releases: 101, assets: 102, updatedAt: now.toISOString() });
  await assert.rejects(releaseDownloads(async () => [{ draft: false, assets: [{ id: 1, name: "x.json", download_count: "10" }] }], now.toISOString()), TypeError);
});

/** An unavailable provider preserves the entire last successful metric and its old timestamp. */
test("provider outages retain prior counts and never publish partial or invented zeros", async () => {
  const previous = await refreshMetrics({}, provider, now);
  const next = await refreshMetrics(previous, async (url) => {
    if (url.includes(encodeURIComponent(PACKAGES.npm[1]))) throw new Error("rate limited");
    return provider(url);
  }, new Date("2026-11-13T06:17:00Z"));
  assert.deepEqual(next.npm, previous.npm);
  assert.equal(next.pypi.updatedAt, "2026-11-13T06:17:00.000Z");
  await assert.rejects(refreshMetrics({}, async () => { throw new Error("offline"); }, now), /No valid npm/);
});

/** Repeated deployments on one UTC day must reuse the snapshot and respect provider caching. */
test("same-day valid snapshots need no provider requests", async () => {
  const previous = await refreshMetrics({}, provider, now);
  const next = await refreshMetrics(previous, async () => { throw new Error("must not fetch"); }, now);
  assert.deepEqual(next, previous);
});

/** Cached JSON is a trust boundary and cannot silently omit packages or substitute totals. */
test("cache validation rejects invalid counts, dates, duplicates and incomplete coverage", async () => {
  const metric = await packageDownloads("npm", provider, window, now.toISOString());
  for (const patch of [
    { downloads: metric.downloads + 1 }, { downloads: Infinity }, { updatedAt: "invalid" },
    { start: "2026-99-99" }, { end: "2026-11-09" }, { packages: metric.packages.slice(1) },
    { packages: metric.packages.map(() => metric.packages[0]) },
  ]) assert.equal(validMetric("npm", { ...metric, ...patch }), false);
});

/** Static builds must ship real validated snapshots even without access to statistics providers. */
test("checked-in snapshot is complete and safe to render without network requests", async () => {
  const snapshot = JSON.parse(await readFile(new URL("../../public/adoption-stats.json", import.meta.url), "utf8"));
  assert.equal(snapshot.version, 1);
  for (const key of ["npm", "pypi", "github"]) assert.equal(validMetric(key, snapshot[key]), true, key);
});
