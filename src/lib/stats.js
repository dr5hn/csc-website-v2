// Conservative coverage shared by the API and database snapshots, checked 2026-10-06.
// Sources: https://api.countrystatecity.in/stats and the GitHub database releases.
// Counts differ by release; live API counts come from use-platform-stats.js.
export const TEXT_STATS = {
  countries: "250",
  states: "5,300+",
  cities: "150,000+",
  formats: "12",
};

export const STAT_DESCRIPTIONS = {
  fullCoverage: `${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states and ${TEXT_STATS.cities} cities`,
  fullCoverageAlt: `${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states, and ${TEXT_STATS.cities} cities`,
};
