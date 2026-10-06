"use client";

import { useEffect, useState } from "react";

const REPO = "dr5hn/countries-states-cities-database";
const COUNT = 5;

// Real merged pull requests, shown until the GitHub call returns and kept if it fails (the
// unauthenticated limit is 60 requests an hour). Refresh them when the feed looks old.
const FALLBACK = [
  { number: 1719, title: "fix(cities): merge 110 duplicate municipalities into the older id (JP 89, ES 21) and fix 22 kept records (#1643 deep research, 10–50k)", merged_at: "2026-10-06", labels: ["data:cities"] },
  { number: 1718, title: "fix(cities): 440 records — 233 state links, 76 names, 132 Wikidata items (#1643 deep research, 10–50k)", merged_at: "2026-10-06", labels: ["data:cities"] },
  { number: 1717, title: "fix(cities): 408 records — 307 territories/quarters retyped, 101 Philippine LGU points (#1643 deep research, 10–50k)", merged_at: "2026-10-06", labels: ["data:cities"] },
  { number: 1715, title: "fix(cities): 649 records — 579 territories and quarters retyped, 70 points (65 Philippine LGUs) (#1643 deep research)", merged_at: "2026-10-05", labels: ["data:cities"] },
  { number: 1714, title: "fix(cities): merge the second Maragusan record into 145046 (#1643)", merged_at: "2026-10-05", labels: ["data:cities"] },
];

const KINDS = { fix: "fix", feat: "add" };
const SKIP_LABELS = ["exports", "automated"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "fix(cities): 440 records (#1643 deep research)" → { text, kind: "fix", scope: "cities" }
function tidy(pr) {
  const match = /^(\w+)(?:\(([^)]+)\))?!?:\s*(.*)$/.exec(pr.title.trim());
  const rest = (match ? match[3] : pr.title).replace(/\s*\(#\d+[^)]*\)\s*$/, "").trim();
  const labelScope = pr.labels.find((l) => l.startsWith("data:"))?.slice(5);
  const [, month, day] = pr.merged_at.slice(0, 10).split("-");
  return {
    number: pr.number,
    text: rest.charAt(0).toUpperCase() + rest.slice(1),
    kind: (match && KINDS[match[1]]) || "update",
    scope: (match && match[2]) || labelScope || "data",
    date: `${MONTHS[Number(month) - 1]} ${Number(day)}`,
    url: `https://github.com/${REPO}/pull/${pr.number}`,
  };
}

const isHumanMerge = (pr) =>
  pr.merged_at && pr.user?.type !== "Bot" && !pr.title.startsWith("Database Export") && !pr.labels.some((l) => SKIP_LABELS.includes(l.name ?? l));

// Module-level cache: every feed on a page shares one request.
let _promise = null;

function fetchMerges() {
  if (_promise) return _promise;
  _promise = fetch(`https://api.github.com/repos/${REPO}/pulls?state=closed&sort=updated&direction=desc&per_page=40`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((prs) => {
      const merges = prs
        .filter(isHumanMerge)
        .sort((a, b) => b.merged_at.localeCompare(a.merged_at))
        .slice(0, COUNT)
        .map((pr) => tidy({ number: pr.number, title: pr.title, merged_at: pr.merged_at, labels: pr.labels.map((l) => l.name) }));
      return merges.length ? merges : null;
    })
    .catch(() => {
      _promise = null;
      return null;
    });
  return _promise;
}

/** The latest merged database changes from GitHub. Never empty: starts from a snapshot of real ones. */
export function useRecentMerges() {
  const [merges, setMerges] = useState(null);

  useEffect(() => {
    let active = true;
    fetchMerges().then((list) => {
      if (active && list) setMerges(list);
    });
    return () => {
      active = false;
    };
  }, []);

  return { merges: merges ?? FALLBACK.map(tidy), live: merges !== null };
}
