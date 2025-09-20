"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to fetch GitHub repository stars and format them
 * @param {string} username - GitHub username
 * @param {string} repo - Repository name
 * @returns {Object} - { stars, formattedStars, loading, error }
 */
export function useGitHubStars(username, repo) {
  const [stars, setStars] = useState(0);
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
        
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch repository data: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        } else {
          throw new Error('Invalid response from GitHub API');
        }
      } catch (err) {
        console.error('Error fetching GitHub stars:', err);
        setError(err.message);
        // Fallback to a reasonable default if API fails
        setStars(6800); // Close to the current hardcoded value
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [username, repo]);

  // Format stars count to K format
  const formatStarsCount = (count) => {
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

  const formattedStars = formatStarsCount(stars);

  return {
    stars,
    formattedStars,
    loading,
    error
  };
}
