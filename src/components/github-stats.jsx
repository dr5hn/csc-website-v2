"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, Users } from "lucide-react";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { REPOSITORY_STATS } from "@/lib/stats";

const getBaseStats = (stars, forks) => [
  { label: "Stars", value: stars || 6860, Icon: Star, color: "orange" },
  { label: "Forks", value: forks || 2300, Icon: GitFork, color: "blue" },
  { label: "Contributors", value: parseInt(REPOSITORY_STATS.contributors.value), Icon: Users, color: "green" },
];

export default function GitHubStats() {
  const { stars, forks } = useGitHubStars("dr5hn", "countries-states-cities-database");
  const [stats, setStats] = useState(getBaseStats(stars, forks));

  useEffect(() => {
    // Update stats when stars or forks change
    setStats(getBaseStats(stars, forks));
  }, [stars, forks]);

  useEffect(() => {
    // Simulate light "live" updates like the attached snippet
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((s) => {
          if (s.label === "Stars")
            return { ...s, value: s.value + Math.floor(Math.random() * 3) };
          if (s.label === "Forks")
            return { ...s, value: s.value + (Math.random() > 0.5 ? 1 : 0) };
          return s;
        })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-light/60 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-bold text-dark">Repository Metrics</div>
        <div className="text-xs text-lightgray">Sample data</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(({ label, value, Icon, color }) => {
          const colorCls =
            color === "green"
              ? "text-green"
              : color === "orange"
              ? "text-orange"
              : "text-blue";
          const grad =
            color === "green"
              ? "from-green to-green/80"
              : color === "orange"
              ? "from-orange to-orange/80"
              : "from-blue to-blue/80";
          return (
            <div
              key={label}
              className="text-center rounded-xl bg-white/60 border border-light/60 p-3 sm:p-4"
            >
              <div
                className={`mx-auto mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${colorCls} bg-current/10`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div
                className={`bg-gradient-to-r ${grad} bg-clip-text text-transparent text-2xl font-extrabold leading-none`}
                aria-label={`${value.toLocaleString()} ${label}`}
              >
                {value.toLocaleString()}
              </div>
              <div className="mt-0.5 text-xs font-medium text-darkgray">
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
