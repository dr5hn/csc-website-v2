"use client";

import { useState, useEffect } from "react";

const REPO = "dr5hn/countries-states-cities-database";

const headers = () => ({
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "CSC-Website",
  ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  }),
});

// Module-level cache — all components share one fetch per session
let _statsCache = null;
let _statsPromise = null;

async function fetchAllGitHubStats() {
  if (_statsCache) return _statsCache;
  if (_statsPromise) return _statsPromise;

  _statsPromise = (async () => {
    // 1. Repo stats (stars + forks) — 1 request
    const repoRes = await fetch(`https://api.github.com/repos/${REPO}`, { headers: headers() });
    const repo = repoRes.ok ? await repoRes.json() : {};

    // 2. Contributors — paginated but cached once
    let count = 0;
    let page = 1;
    while (true) {
      const res = await fetch(
        `https://api.github.com/repos/${REPO}/contributors?per_page=100&page=${page}&anon=1`,
        { headers: headers() }
      );
      if (!res.ok) break;
      const data = await res.json();
      count += data.length;
      const link = res.headers.get("Link") || "";
      if (!link.includes('rel="next"') || data.length === 0) break;
      page++;
      if (page > 50) break;
    }

    _statsCache = {
      stars: repo.stargazers_count ?? null,
      forks: repo.forks_count ?? null,
      contributors: count || null,
    };
    return _statsCache;
  })().catch(() => {
    _statsPromise = null; // allow retry on failure
    return { stars: null, forks: null, contributors: null };
  });

  return _statsPromise;
}

export function useGithubStats() {
  const [stats, setStats] = useState(_statsCache ?? { stars: null, forks: null, contributors: null, loading: true });

  useEffect(() => {
    if (_statsCache) { setStats({ ..._statsCache, loading: false }); return; }
    fetchAllGitHubStats().then((s) => setStats({ ...s, loading: false }));
  }, []);

  return stats;
}

export function useGithubContributors() {
  const [contributorCount, setContributorCount] = useState(_statsCache?.contributors ?? null);
  const [loading, setLoading] = useState(!_statsCache);

  useEffect(() => {
    if (_statsCache) { setContributorCount(_statsCache.contributors); setLoading(false); return; }
    fetchAllGitHubStats().then((s) => { setContributorCount(s.contributors); setLoading(false); });
  }, []);

  return { contributorCount, loading };
}
