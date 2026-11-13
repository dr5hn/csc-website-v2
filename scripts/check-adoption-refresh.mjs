import { appendFile } from "node:fs/promises";
import { scheduledRefreshNeeded } from "../src/lib/adoption-stats.mjs";

const refresh = await scheduledRefreshNeeded(async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000), cache: "no-store" });
  if (!response.ok) throw new Error(`Snapshot: HTTP ${response.status}`);
  return response.json();
});
console.log(refresh ? "Download statistics need a refresh." : "All download statistics are fresh; skipping scheduled deployment.");
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `refresh=${refresh}\n`);
