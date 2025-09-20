"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to fetch GitHub repository stats and format them
 * @param {string} username - GitHub username
 * @param {string} repo - Repository name
 * @returns {Object} - { stars, forks, formattedStars, formattedForks, loading, error }
 */
export function useGitHubStars(username, repo) {
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || !repo) {
      setLoading(false);
      return;
    }

    const fetchStars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add headers to potentially avoid rate limiting
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'CSC-Website'
        };
        
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
          headers
        });
        
        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 403) {
            console.warn('GitHub API rate limit exceeded, using fallback values');
            throw new Error('Rate limit exceeded');
          } else if (response.status === 404) {
            console.warn('Repository not found, using fallback values');
            throw new Error('Repository not found');
          } else {
            throw new Error(`Failed to fetch repository data: ${response.status}`);
          }
        }
        
        const data = await response.json();
        
        if (data && typeof data.stargazers_count === 'number' && typeof data.forks_count === 'number') {
          setStars(data.stargazers_count);
          setForks(data.forks_count);
        } else {
          throw new Error('Invalid response from GitHub API');
        }
      } catch (err) {
        console.warn('GitHub API unavailable, using fallback values:', err.message);
        setError(null); // Don't show error to users, just use fallbacks
        // Fallback to reasonable defaults if API fails
        setStars(6800); // Close to the current hardcoded value
        setForks(2300); // Close to the current hardcoded value
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [username, repo]);

  // Format count to K format
  const formatCount = (count) => {
    if (count >= 1000) {
      const kValue = count / 1000;
      return {
        value: parseFloat(kValue.toFixed(1)),
        suffix: "K+",
        decimals: 1
      };
    }
    return {
      value: count,
      suffix: "+",
      decimals: 0
    };
  };

  const formattedStars = formatCount(stars);
  const formattedForks = formatCount(forks);

  return {
    stars,
    forks,
    formattedStars,
    formattedForks,
    loading,
    error
  };
}
