"use client";

import { useEffect, useState } from "react";

const REPO = "dr5hn/countries-states-cities-database";

// Shown until the GitHub call returns, and kept if it fails (the unauthenticated limit
// is 60 requests an hour). Update it when the real count moves by a few hundred.
export const STARS_FALLBACK = 9800;

// Module-level cache: every star button on a page shares one request.
let _promise = null;

function fetchStars() {
  if (_promise) return _promise;
  _promise = fetch(`https://api.github.com/repos/${REPO}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((repo) => (Number.isFinite(repo?.stargazers_count) ? repo.stargazers_count : null))
    .catch(() => {
      _promise = null;
      return null;
    });
  return _promise;
}

/** GitHub star count for the database repo, formatted like "9.0K". Never blank. */
export function useRepoStars() {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    let active = true;
    fetchStars().then((n) => {
      if (active && n !== null) setStars(n);
    });
    return () => {
      active = false;
    };
  }, []);

  const count = stars ?? STARS_FALLBACK;
  return { stars: count, label: `${(count / 1000).toFixed(1)}K`, live: stars !== null };
}
