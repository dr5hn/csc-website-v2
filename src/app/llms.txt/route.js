import { STAT_DESCRIPTIONS, TEXT_STATS } from "../../lib/stats.js";
import { SITE_URL, REPO_URL } from "../../lib/seo.js";
import { API_BASE_URL, API_KEY_HEADER } from "../../lib/api-landing-pages.js";
import { NPM_PACKAGES } from "../../lib/npm-packages.js";
import { PYPI_PACKAGES } from "../../data/ecosystem-channels.js";

export const dynamic = "force-static";

/** Export the AI-facing index from the same coverage and package catalogs as the pages. */
export function GET() {
  return new Response(`# Country State City

> An open geographical dataset of ${STAT_DESCRIPTIONS.fullCoverage},
> available as a hosted REST and GraphQL API, a downloadable database in ${TEXT_STATS.formats} formats,
> npm and Python packages, and a browser-based export tool.

Operated by dr5hn. The source is the countries-states-cities-database repository on GitHub.
Coverage varies by record and release. API data, package snapshots and database releases can differ by version.

## Key facts

- API base URL: ${API_BASE_URL}
- Authentication: an API key in the ${API_KEY_HEADER} request header
- Free Community tier: basic fields, 100 requests per day and 3,000 per month; both limits apply
- [Current pricing and plan capabilities](${SITE_URL}/pricing/): compare quotas, field access and endpoints
- Data licence: [Open Database License (ODbL-1.0)](https://opendatacommons.org/licenses/odbl/1-0/), with attribution and applicable share-alike requirements
- The npm SDK and CLI use MIT. Check the licence of each package; API access is subject to service terms.
- [Source repository](${REPO_URL}): release files, provenance and community corrections

## APIs

- [Country API](${SITE_URL}/country-api/): ${TEXT_STATS.countries} countries and territories, with ISO codes, dial codes, currencies, capitals and coordinates. Field availability follows the API plan.
- [State API](${SITE_URL}/state-api/): ${TEXT_STATS.states} states and regions with parent-country links. Extended fields, including ISO 3166-2 codes, depend on the plan.
- [City API](${SITE_URL}/city-api/): ${TEXT_STATS.cities} cities and settlements. Community provides basic fields; coordinates, translations, autocomplete and nearby search require eligible plans.
- [API overview](${SITE_URL}/product/api/): REST access with plan-specific field filtering, search, GraphQL and change-feed capabilities

## npm packages

There are ${NPM_PACKAGES.length} official packages under the @countrystatecity scope.
Bundled data packages run locally without an API key. countries-browser and geojson load snapshots
from a CDN and need a network connection when loading. The SDK and API-backed CLI commands call
the hosted API, require a key, and follow API-plan quotas and capabilities.

${NPM_PACKAGES.map(({ name, description }) => `- [${name}](https://www.npmjs.com/package/${name}): ${description}`).join("\n")}

- [npm integration and package selection](${SITE_URL}/npm-packages/)

## Python packages

There are ${PYPI_PACKAGES.length} official Python packages. The API client needs a network connection
and API key; the other packages provide local snapshots without an API key.

${PYPI_PACKAGES.map(({ name, desc }) => `- [${name}](https://pypi.org/project/${name}/): ${desc}`).join("\n")}

## Database and tools

- [Offline database](${SITE_URL}/product/database/): versioned data in ${TEXT_STATS.formats} formats, including SQL, JSON, CSV, XML and YAML
- [Export tool](${SITE_URL}/product/export-tool/): select fields and filters and download a custom extract
- [Update tool](${SITE_URL}/product/update-tool/): submit and track corrections to the dataset
- [Ecosystem](${SITE_URL}/ecosystem/): compare access methods and package options
- [Download statistics](${SITE_URL}/adoption-stats.json): per-package counts, reporting periods and last successful update dates; downloads are not unique users

## Implementation guides

- [React country, state and city dropdown](${SITE_URL}/guides/react-country-state-city-dropdown/): a working CDN-backed example with dependent selections, retries and unassigned state links
- [Import country, state and city CSV into SQLite](${SITE_URL}/guides/import-country-state-city-csv-sql/): a pinned snapshot, verified importer, preserved IDs, nullable state links and foreign-key checks

## Reference

- [Documentation](https://docs.countrystatecity.in): endpoints, authentication, SDKs and installation guides
- [Machine-readable documentation](https://docs.countrystatecity.in/llms-full.txt): full API documentation as text
- [FAQs](${SITE_URL}/faqs/)
- [About](${SITE_URL}/about/)
- [Contact](${SITE_URL}/contact/)
`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
