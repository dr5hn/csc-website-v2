"use client";

import { useState, useEffect } from 'react';

export function useGithubStats(repo = "dr5hn/countries-states-cities-database") {
  const [stats, setStats] = useState({
    stars: null,
    forks: null,
    contributors: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'CSC-Website'
        };

        // 1. Fetch main repo data (stars, forks)
        const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, {
          headers
        });

        if (!repoResponse.ok) {
          throw new Error(`Failed to fetch repo stats: ${repoResponse.status}`);
        }

        const repoData = await repoResponse.json();

        if (!isMounted) return;

        // 2. Fetch contributor count (paginated)
        let contributorCount = 0;
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const contributorsResponse = await fetch(
            `https://api.github.com/repos/${repo}/contributors?per_page=100&page=${page}&anon=1`,
            { headers }
          );

          if (!contributorsResponse.ok) {
            console.warn(`Failed to fetch contributors page ${page}: ${contributorsResponse.status}`);
            break;
          }

          const contributors = await contributorsResponse.json();
          contributorCount += contributors.length;

          // Check if there's a next page
          const linkHeader = contributorsResponse.headers.get('Link');
          if (linkHeader && linkHeader.includes('rel="next"')) {
            page++;
          } else {
            hasMore = false;
          }

          // Prevent infinite loops
          if (page > 50) break;
        }

        if (!isMounted) return;

        setStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          contributors: contributorCount,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        if (isMounted) {
          setStats(prev => ({
            ...prev,
            loading: false,
            error: error.message
          }));
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [repo]);

  return stats;
}

// Hook specifically for contributor count
export function useGithubContributors(repo = "dr5hn/countries-states-cities-database") {
  const [contributorCount, setContributorCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContributors() {
      setLoading(true);
      setError(null);

      try {
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'CSC-Website'
        };

        let count = 0;
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `https://api.github.com/repos/${repo}/contributors?per_page=100&page=${page}&anon=1`,
            { headers }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch contributors: ${response.status}`);
          }

          const contributors = await response.json();
          count += contributors.length;

          // Check if there's a next page
          const linkHeader = response.headers.get('Link');
          if (linkHeader && linkHeader.includes('rel="next"')) {
            page++;
          } else {
            hasMore = false;
          }

          // Prevent infinite loops
          if (page > 50) break;
        }

        if (isMounted) {
          setContributorCount(count);
          setLoading(false);
        }

      } catch (error) {
        console.error('Error fetching GitHub contributors:', error);
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    }

    fetchContributors();

    return () => {
      isMounted = false;
    };
  }, [repo]);

  return { contributorCount, loading, error };
}
