import { readFile, writeFile, rename } from "node:fs/promises";
import { refreshMetrics, validMetric } from "../src/lib/adoption-stats.mjs";

/** Fetch public statistics with bounded waits; the GitHub token stays in the build. */
async function request(url) {
  const headers = { "User-Agent": "CSC-Website-Download-Stats", Accept: "application/json" };
  if (new URL(url).hostname === "api.github.com" && process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`${new URL(url).hostname}: HTTP ${response.status}`);
  return response.json();
}

const file = new URL("../public/adoption-stats.json", import.meta.url);
const previous = JSON.parse(await readFile(file, "utf8"));
try {
  // The deployed snapshot preserves the latest successful values across builds.
  const deployed = await request("https://countrystatecity.in/adoption-stats.json");
  for (const key of ["npm", "pypi", "github"]) {
    if (validMetric(key, deployed[key]) && (!validMetric(key, previous[key]) || Date.parse(deployed[key].updatedAt) > Date.parse(previous[key].updatedAt))) previous[key] = deployed[key];
  }
} catch (error) {
  console.warn(`Using repository snapshot: ${error.message}`);
}
const snapshot = await refreshMetrics(previous, request);
const temporary = new URL(`${file.href}.tmp`);
await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`);
await rename(temporary, file);
for (const key of ["npm", "pypi", "github"]) console.log(`${key}: ${snapshot[key].downloads.toLocaleString("en-US")} downloads (${snapshot[key].updatedAt})`);
