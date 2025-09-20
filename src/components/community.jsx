import Link from "next/link";
import { BookOpen, MessageCircle, Heart } from "lucide-react";
import { TEXT_STATS } from "@/lib/stats";

import GitHubIcon from "@/icons/GitHub";

async function getContributorCount() {
  const repo = "dr5hn/countries-states-cities-database";
  let count = 0;
  let page = 1;
  let hasMore = true;

  // It's recommended to use a GitHub Personal Access Token for higher rate limits
  // Add GITHUB_TOKEN to your .env.local file
  const headers = {};
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // The GitHub API for contributors is paginated. We need to fetch all pages to get the total count.
    while (hasMore) {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/contributors?per_page=100&page=${page}&anon=1`,
        {
          headers,
          next: { revalidate: 3600 } // Re-fetch data every hour
        }
      );

      if (!res.ok) {
        console.error(`GitHub API Error: ${res.status}`);
        throw new Error('Failed to fetch contributors');
      }

      const contributors = await res.json();
      count += contributors.length;

      // Check the 'Link' header to see if there's a next page
      const linkHeader = res.headers.get('Link');
      if (linkHeader && linkHeader.includes('rel="next"')) {
        page++;
      } else {
        hasMore = false;
      }
    }
    return count.toString();
  } catch (error) {
    console.error("Error fetching GitHub contributors on server:", error);
    return "50+"; // Fallback value in case of an error
  }
}

export default async function CommunitySection() {
  const contributorCount = await getContributorCount();
  return (
    <section className="relative container mx-auto px-4 py-6 lg:py-12 !pt-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 tracking-tight">
            Community & Support
          </h2>
          <p className="text-lg text-darkgray">
            Join our community of developers and get the help you need
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 md:mb-12">
          {/* GitHub */}
          <Link
            href="https://github.com"
            className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-light/50 hover:border-light transition-all duration-300 hover:shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-dark/10 rounded-xl flex items-center justify-center group-hover:bg-dark/20 transition-colors duration-300">
                <GitHubIcon className="w-6 h-6 text-dark" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark">Open Source</h3>
                <p className="text-sm text-darkgray">
                  Contribute to our GitHub repo
                </p>
              </div>
            </div>
            <p className="text-darkgray">
              Explore our codebase, report issues, and contribute to making
              location data more accessible for everyone.
            </p>
          </Link>

          {/* Support Docs */}
          <Link
            href="/docs/support"
            className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-light/50 hover:border-light transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center group-hover:bg-blue/20 transition-colors duration-300">
                <BookOpen className="w-6 h-6 text-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark">
                  Support Docs
                </h3>
                <p className="text-sm text-darkgray">
                  Get help when you need it
                </p>
              </div>
            </div>
            <p className="text-darkgray">
              Comprehensive guides, API references, and troubleshooting tips to
              help you integrate quickly.
            </p>
          </Link>
        </div>

        {/* Response Time & Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-success" />
              <span className="text-2xl font-bold text-dark">{TEXT_STATS.apiRequests}</span>
            </div>
            <p className="text-sm text-darkgray">API Requests a month</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <GitHubIcon className="w-5 h-5 text-dark" />
              <span className="text-2xl font-bold text-dark">{contributorCount}</span>
            </div>
            <p className="text-sm text-darkgray">Open source contributions</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-danger" />
              <span className="text-2xl font-bold text-dark">99%</span>
            </div>
            <p className="text-sm text-darkgray">Developer satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
