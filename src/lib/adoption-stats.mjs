import { NPM_PACKAGES } from "./npm-packages.js";
import { PYPI_PACKAGES } from "../data/ecosystem-channels.js";

export const PACKAGES = {
  npm: NPM_PACKAGES.map(({ name }) => name),
  pypi: PYPI_PACKAGES.map(({ name }) => name),
};
export const RELEASE_REPO = "dr5hn/countries-states-cities-database";
const DAY = 86_400_000;
/** Counts must survive JSON round trips without coercion, overflow or negative values. */
const isCount = (value) => Number.isSafeInteger(value) && value >= 0;
/** Require a real ISO calendar date, including correct month and leap-day bounds. */
const isDate = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

/** Use a complete UTC window with two days of allowance for source reporting lag. */
export function downloadWindow(now) {
  const end = new Date(now.toISOString().slice(0, 10)).getTime() - 2 * DAY;
  return { start: new Date(end - 29 * DAY).toISOString().slice(0, 10), end: new Date(end).toISOString().slice(0, 10) };
}

/** Reject partial, malformed or mismatched cached statistics before publishing them. */
export function validMetric(key, value) {
  if (!value || !isCount(value.downloads) || typeof value.updatedAt !== "string" || !Number.isFinite(Date.parse(value.updatedAt)) || new Date(value.updatedAt).toISOString() !== value.updatedAt || Date.parse(value.updatedAt) > Date.now() + DAY) return false;
  if (key === "github") return isCount(value.releases) && isCount(value.assets) && value.releases > 0 && value.assets > 0;
  if (!PACKAGES[key] || !isDate(value.start) || !isDate(value.end) || value.end > value.updatedAt.slice(0, 10) || Date.parse(value.end) - Date.parse(value.start) !== 29 * DAY) return false;
  const entries = value.packages;
  return Array.isArray(entries) && entries.length === PACKAGES[key].length &&
    new Set(entries.map((entry) => entry?.name)).size === entries.length &&
    entries.every((entry) => PACKAGES[key].includes(entry?.name) && isCount(entry.downloads)) &&
    entries.reduce((total, entry) => total + entry.downloads, 0) === value.downloads;
}

/** Aggregate every configured package over the same explicit 30-day window. */
export async function packageDownloads(key, request, window, updatedAt) {
  const packages = [];
  let reportedThrough = "";
  for (const name of PACKAGES[key]) {
    const data = await request(key === "npm"
      ? `https://api.npmjs.org/downloads/point/${window.start}:${window.end}/${encodeURIComponent(name)}`
      : `https://pypistats.org/api/packages/${name}/overall?mirrors=false`);
    if (data.package !== name) throw new TypeError(`Unexpected ${key} package: ${name}`);
    let downloads;
    if (key === "npm") {
      if (data.start !== window.start || data.end !== window.end || !isCount(data.downloads)) throw new TypeError(`Invalid npm window: ${name}`);
      downloads = data.downloads;
    } else {
      if (data.type !== "overall_downloads" || !Array.isArray(data.data)) throw new TypeError(`Missing PyPI history: ${name}`);
      const days = new Map();
      for (const row of data.data) {
        if (row.category !== "without_mirrors" || !isDate(row.date) || !isCount(row.downloads) || days.has(row.date)) throw new TypeError(`Invalid PyPI history: ${name}`);
        days.set(row.date, row.downloads);
        if (row.date > reportedThrough) reportedThrough = row.date;
      }
      // PyPI Stats omits zero-download days, including for inactive packages.
      // Check provider freshness across the set, not each package's last install.
      downloads = [...days].filter(([date]) => date >= window.start && date <= window.end).reduce((total, [, count]) => total + count, 0);
    }
    packages.push({ name, downloads });
  }
  if (key === "pypi" && reportedThrough < window.end) throw new TypeError("Stale PyPI history");
  return { ...window, updatedAt, packages, downloads: packages.reduce((total, entry) => total + entry.downloads, 0) };
}

/** Count data-file assets across all published releases, including prereleases. */
export async function releaseDownloads(request, updatedAt) {
  let downloads = 0, releases = 0, assets = 0;
  const seen = new Set();
  for (let page = 1; page <= 100; page++) {
    const data = await request(`https://api.github.com/repos/${RELEASE_REPO}/releases?per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length > 100) throw new TypeError("Invalid GitHub releases");
    for (const release of data) {
      if (typeof release.draft !== "boolean" || !Array.isArray(release.assets)) throw new TypeError("Invalid GitHub release");
      if (release.draft) continue;
      releases++;
      for (const asset of release.assets) {
        if (!Number.isSafeInteger(asset.id) || typeof asset.name !== "string" || !isCount(asset.download_count) || seen.has(asset.id)) throw new TypeError("Invalid GitHub asset");
        seen.add(asset.id);
        // Count database files, not checksums, licences, migration tools or source archives.
        if (/\.(?:json|csv|sql|sqlite3?|db|parquet|xml|ya?ml|geojson|toon)(?:\.(?:gz|zip|xz|bz2))?$/i.test(asset.name) || /mongodb.*dump\.tar\.gz$/i.test(asset.name)) {
          downloads += asset.download_count;
          assets++;
        }
      }
    }
    if (data.length < 100) return { downloads, releases, assets, updatedAt };
  }
  throw new RangeError("GitHub release pagination limit exceeded");
}

/** Keep the last successful whole metric when a provider fails; never publish a partial sum. */
export async function refreshMetrics(previous, request, now = new Date()) {
  const result = { version: 1 };
  const window = downloadWindow(now);
  const outcomes = await Promise.allSettled(["npm", "pypi", "github"].map((key) => {
    const cached = previous?.[key];
    if (validMetric(key, cached) && cached.updatedAt.slice(0, 10) === now.toISOString().slice(0, 10) &&
        (key === "github" || (cached.start === window.start && cached.end === window.end))) return cached;
    return key === "github" ? releaseDownloads(request, now.toISOString()) : packageDownloads(key, request, window, now.toISOString());
  }));
  for (const [i, key] of ["npm", "pypi", "github"].entries()) {
    const outcome = outcomes[i];
    if (outcome.status === "fulfilled" && validMetric(key, outcome.value)) result[key] = outcome.value;
    else if (validMetric(key, previous?.[key])) {
      console.warn(`Keeping cached ${key} downloads: ${outcome.reason?.message || "invalid response"}`);
      result[key] = previous[key];
    } else throw new Error(`No valid ${key} download snapshot`, { cause: outcome.reason });
  }
  return result;
}
