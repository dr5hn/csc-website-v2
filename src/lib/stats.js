import { Zap, Users, Database, Globe, Star, ShieldCheck, GitBranch, Download, Eye } from "lucide-react";

// SINGLE SOURCE OF TRUTH - Core stat values
const CORE_VALUES = {
  countries: "250+",
  states: "5,000+",
  cities: "151,000+", // Single canonical value
  developers: "40,000+",
  apiRequests: "1B+",
  uptime: "99.9%",
  responseTime: "<200ms",
  formats: "9+",
  contributors: "127",
  downloads: "50M+",
  activeContributors: "1.2K+",
  pendingReviews: "89",
  changesVerified: "15K+",
};

// Core platform statistics (using numerical values for animations)
export const PLATFORM_STATS = {
  apiRequestsMonthly: {
    value: 1.2,
    suffix: "B+",
    label: "API Requests Monthly",
    decimals: 1,
  },
  developersWorldwide: {
    value: 40,
    suffix: "K+", 
    label: "Developers Worldwide",
    decimals: 0,
  },
  citiesAndStates: {
    value: 151,
    suffix: "K+",
    label: "Cities & States", 
    decimals: 0,
  },
  countriesCovered: {
    value: 250,
    suffix: "+",
    label: "Countries Covered",
    decimals: 0,
  },
  apiUptime: {
    value: 99.9,
    suffix: "%",
    label: "API Uptime",
    decimals: 1,
  },
};

// Repository/GitHub statistics
export const REPOSITORY_STATS = {
  contributors: {
    value: CORE_VALUES.contributors,
    label: "Contributors",
  },
  downloads: {
    value: CORE_VALUES.downloads,
    label: "Downloads", 
  },
  exportFormats: {
    value: CORE_VALUES.formats,
    label: "Export Formats",
  },
};

// Database content statistics  
export const DATABASE_STATS = {
  countries: {
    value: CORE_VALUES.countries,
    label: "Countries",
  },
  states: {
    value: CORE_VALUES.states,
    label: "States",
  },
  cities: {
    value: CORE_VALUES.cities,
    label: "Cities",
  },
  formats: {
    value: CORE_VALUES.formats,
    label: "Formats", 
  },
};

// Update tool specific statistics
export const UPDATE_TOOL_STATS = {
  activeContributors: {
    value: CORE_VALUES.activeContributors,
    label: "Active Contributors",
  },
  pendingReviews: {
    value: CORE_VALUES.pendingReviews,
    label: "Pending Reviews",
  },
  changesVerified: {
    value: CORE_VALUES.changesVerified, 
    label: "Changes Verified",
  },
};

// Text-based stats for descriptions and content (all reference CORE_VALUES)
export const TEXT_STATS = {
  countries: CORE_VALUES.countries,
  states: CORE_VALUES.states, 
  cities: CORE_VALUES.cities,
  developers: CORE_VALUES.developers,
  apiRequests: CORE_VALUES.apiRequests,
  uptime: CORE_VALUES.uptime,
  responseTime: CORE_VALUES.responseTime,
  formats: CORE_VALUES.formats,
};

// Template strings for common descriptions (using single canonical values)
export const STAT_DESCRIPTIONS = {
  fullCoverage: `${CORE_VALUES.countries} countries, ${CORE_VALUES.states} states and ${CORE_VALUES.cities} cities`,
  fullCoverageAlt: `${CORE_VALUES.countries} countries, ${CORE_VALUES.states} states, and ${CORE_VALUES.cities} cities`,
  developerTrust: `Trusted by ${CORE_VALUES.developers} developers worldwide with ${CORE_VALUES.apiRequests} monthly API requests`,
  slaPromise: `${CORE_VALUES.responseTime} response times, ${CORE_VALUES.uptime} uptime SLA`,
};

// Pre-configured stat sets for different UI components
export const MAIN_STATS_WITH_ICONS = [
  {
    icon: Zap,
    ...PLATFORM_STATS.apiRequestsMonthly,
    color: "blue",
  },
  {
    icon: Users,
    ...PLATFORM_STATS.developersWorldwide,
    color: "green", 
  },
  {
    icon: Database,
    ...PLATFORM_STATS.citiesAndStates,
    color: "orange",
  },
  {
    icon: Globe,
    ...PLATFORM_STATS.countriesCovered,
    color: "blue",
  },
  {
    icon: ShieldCheck,
    ...PLATFORM_STATS.apiUptime,
    color: "orange",
  },
];

// Repository stats with icons for CTA/pricing components (excluding dynamic forks)
export const REPOSITORY_STATS_WITH_ICONS = [
  {
    icon: Users, 
    value: REPOSITORY_STATS.contributors.value,
    label: REPOSITORY_STATS.contributors.label,
    accent: "green",
  },
  {
    icon: Download,
    value: REPOSITORY_STATS.downloads.value,
    label: REPOSITORY_STATS.downloads.label,
    accent: "blue",
  },
];

// Utility functions to create dynamic GitHub stats
export const createGitHubStarsStat = (formattedStars, loading, options = {}) => ({
  icon: options.icon || Star,
  value: loading ? 6.8 : formattedStars.value,
  suffix: loading ? "K+" : formattedStars.suffix,
  label: options.label || "GitHub Stars",
  color: options.color || "green",
  accent: options.accent || "blue",
  decimals: loading ? 1 : formattedStars.decimals,
});

export const createGitHubForksStat = (formattedForks, loading, options = {}) => ({
  icon: options.icon || GitBranch,
  value: loading ? 2.3 : formattedForks.value,
  suffix: loading ? "K+" : formattedForks.suffix,
  label: options.label || "Forks",
  color: options.color || "green",
  accent: options.accent || "green",
  decimals: loading ? 1 : formattedForks.decimals,
});

// Pre-built stat collections for common use cases
export const getMainStatsWithGitHub = (formattedStars, loading) => [
  ...MAIN_STATS_WITH_ICONS,
  createGitHubStarsStat(formattedStars, loading, { 
    label: "Open Source Stars",
    color: "green" 
  }),
];

export const getRepositoryStatsWithGitHub = (formattedStars, formattedForks, loading) => [
  createGitHubStarsStat(formattedStars, loading, { 
    label: "GitHub Stars",
    accent: "blue" 
  }),
  createGitHubForksStat(formattedForks, loading, { 
    label: "Forks",
    accent: "green" 
  }),
  ...REPOSITORY_STATS_WITH_ICONS,
];
