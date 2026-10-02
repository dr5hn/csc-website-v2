// SINGLE SOURCE OF TRUTH - fixed claims used in copy and metadata.
// Live figures (requests, countries, states, cities) come from src/hooks/use-platform-stats.js;
// these are the canonical static values shown wherever a number is not fetched.
const CORE_VALUES = {
  countries: "250+",
  states: "5,300+",
  cities: "152,900+",
  developers: "50,000+",
  developersShort: "50K+",
  apiRequests: "50M+",
  uptime: "99.9%",
  responseTime: "<200ms",
  formats: "12",
};

// Text-based stats for descriptions and content (all reference CORE_VALUES)
export const TEXT_STATS = {
  countries: CORE_VALUES.countries,
  states: CORE_VALUES.states,
  cities: CORE_VALUES.cities,
  developers: CORE_VALUES.developers,
  developersShort: CORE_VALUES.developersShort,
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
