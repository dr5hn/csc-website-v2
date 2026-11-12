// Marketing examples are excerpts of Community-plan responses. Field and endpoint
// availability follows the API plan; shared coverage bounds live in stats.js.
import { TEXT_STATS } from "./stats.js";
import { LOCATION_SAMPLES } from "../data/location-samples.js";

export const API_BASE_URL = "https://api.countrystatecity.in/v1";
export const API_KEY_HEADER = "X-CSCAPI-KEY";

/**
 * Builds the curl example shown on a landing page.
 *
 * @param {string} path - Endpoint path relative to the API base URL.
 * @returns {string} A runnable curl command with the auth header in place.
 */
export function curlExample(path) {
  return `curl --location '${API_BASE_URL}${path}' \\\n  --header '${API_KEY_HEADER}: YOUR_API_KEY'`;
}

export const COUNTRY_API = {
  slug: "country-api",
  resource: "Country",
  eyebrow: "Country API",
  headline: "Every country, in one endpoint.",
  summary:
    "A REST endpoint for every sovereign state and dependent territory, with ISO 3166-1 codes, dial codes, currencies, capitals, regions and coordinates. JSON over REST, with GraphQL on eligible paid plans. The free tier needs no card.",
  count: TEXT_STATS.countries,
  countLabel: "countries and territories",
  metaTitle: `Country API: ${TEXT_STATS.countries} Countries with ISO Codes`,
  metaDescription:
    `Country API covering ${TEXT_STATS.countries} countries and territories with ISO codes, dial codes, currencies and coordinates. JSON responses and a free tier.`,
  keywords: [
    "country api",
    "countries api",
    "country api free",
    "country list api",
    "iso country code api",
    "country code api",
  ],
  endpoints: [
    { method: "GET", path: "/countries", description: "List countries and territories" },
    { method: "GET", path: "/countries/{ciso}", description: "One country by ISO2 code or numeric id" },
    { method: "GET", path: "/iso/country", description: "Look a country up by any ISO code" },
    { method: "GET", path: "/iso/country/convert", description: "Convert between ISO2, ISO3 and numeric" },
    { method: "GET", path: "/subregions/{id}/countries", description: "Countries within a UN subregion" },
  ],
  sampleRequest: curlExample("/countries/IN"),
  sampleResponse: JSON.stringify({ id: 101, name: "India", iso2: "IN", iso3: "IND", phonecode: "91", capital: "New Delhi", currency: "INR", latitude: "20.00000000", longitude: "77.00000000" }, null, 2),
  fields: [
    { name: "id", note: "Stable numeric identifier" },
    { name: "name", note: "English name" },
    { name: "iso2", note: "ISO 3166-1 alpha-2" },
    { name: "iso3", note: "ISO 3166-1 alpha-3" },
    { name: "numeric_code", note: "ISO 3166-1 numeric" },
    { name: "phonecode", note: "International dial code" },
    { name: "capital", note: "Capital city" },
    { name: "currency", note: "ISO 4217 code" },
    { name: "currency_name", note: "Currency in words" },
    { name: "currency_symbol", note: "Display symbol" },
    { name: "tld", note: "Country-code top-level domain" },
    { name: "nationality", note: "Demonym" },
    { name: "native", note: "Name in the local script" },
    { name: "region", note: "UN region" },
    { name: "subregion", note: "UN subregion" },
    { name: "timezones", note: "Published timezone entries, when available" },
    { name: "latitude", note: "Centroid latitude" },
    { name: "longitude", note: "Centroid longitude" },
    { name: "emoji", note: "Flag emoji" },
    { name: "emojiU", note: "Flag emoji code points" },
    { name: "population", note: "When available; may be null" },
    { name: "gdp", note: "When available; may be null" },
    { name: "area_sq_km", note: "Land area" },
    { name: "postal_code_format", note: "Expected postcode shape" },
    { name: "postal_code_regex", note: "Validation pattern" },
    { name: "translations", note: "Name in other languages" },
    { name: "wikiDataId", note: "Wikidata item" },
  ],
  useCases: [
    "Country dropdowns in a signup or checkout form, with flags and dial codes already attached.",
    "Validating a shipping address against the right postcode pattern before you call a carrier.",
    "Converting between ISO2, ISO3 and numeric codes when two systems disagree.",
    "Routing or pricing by UN region and subregion rather than by a hand-kept list.",
  ],
  faqs: [
    {
      q: "Is the country API free?",
      a: "Community includes 3,000 requests per calendar month and 100 per day with basic fields, an API key and no card. Paid plans add higher limits, extra fields and endpoints. GraphQL and field selection depend on your plan; compare the current plans for availability.",
    },
    {
      q: "How many countries does it return?",
      a: `${TEXT_STATS.countries} country and territory records. Check the countries endpoint for the current entries and codes. Coverage and downloadable snapshots can differ by release.`,
    },
    {
      q: "Can I get the data offline instead of over HTTP?",
      a: "Yes. The same dataset is published as SQL, JSON, CSV, XML and more through the export tool and the open-source database, so you can ship it inside your application.",
    },
    {
      q: "How often does the country data change?",
      a: "Maintainers publish corrections to the underlying dataset and API. The /changes feed supports incremental syncing on eligible plans; check the current documentation for availability and retention.",
    },
  ],
};

export const STATE_API = {
  slug: "state-api",
  resource: "State",
  eyebrow: "State API",
  headline: "The layer most country datasets skip.",
  summary:
    "States, provinces and other administrative divisions linked to their parent country. Subdivision codes, division types and other fields depend on the record and your plan.",
  count: TEXT_STATS.states,
  countLabel: "states and regions",
  metaTitle: `State API: ${TEXT_STATS.states} States and Regions`,
  metaDescription:
    `State API covering ${TEXT_STATS.states} states and regions across ${TEXT_STATS.countries} countries and territories. JSON data with parent-country links and a free tier.`,
  keywords: [
    "state api",
    "states api",
    "province api",
    "iso 3166-2 api",
    "state list api",
    "administrative divisions api",
  ],
  endpoints: [
    { method: "GET", path: "/states", description: "Every state in the world, one call" },
    { method: "GET", path: "/countries/{ciso}/states", description: "States belonging to one country" },
    { method: "GET", path: "/countries/{ciso}/states/{siso}", description: "One state in full" },
    { method: "GET", path: "/iso/state", description: "Look a state up by its ISO 3166-2 code" },
    { method: "GET", path: "/timezone/{ciso}/{siso}", description: "Timezone for a given state" },
  ],
  sampleRequest: curlExample("/countries/IN/states/MH"),
  sampleResponse: JSON.stringify({ id: 4008, name: "Maharashtra", iso2: "MH", country_id: 101, country_code: "IN" }, null, 2),
  fields: [
    { name: "id", note: "Stable numeric identifier" },
    { name: "name", note: "English name" },
    { name: "iso2", note: "Subdivision part of the ISO code" },
    { name: "iso3166_2", note: "Full ISO 3166-2 code" },
    { name: "country_id", note: "Parent country id" },
    { name: "country_code", note: "Parent country ISO2" },
    { name: "type", note: "state, province, region, canton and so on" },
    { name: "level", note: "Depth in the official hierarchy" },
    { name: "parent_id", note: "Parent division, where one exists" },
    { name: "fips_code", note: "FIPS 10-4 code" },
    { name: "native", note: "Name in the local script" },
    { name: "latitude", note: "Centroid latitude" },
    { name: "longitude", note: "Centroid longitude" },
    { name: "timezone", note: "IANA zone" },
    { name: "population", note: "When available; may be null" },
    { name: "translations", note: "Name in other languages" },
    { name: "wikiDataId", note: "Wikidata item" },
  ],
  useCases: [
    "The second dropdown in a country, state and city address form, filtered by the country already chosen.",
    "Tax and shipping rules that differ by state, keyed on ISO 3166-2 rather than on a free-text name.",
    "Sales territories and reporting regions built on official divisions instead of an internal spreadsheet.",
    "Normalising inbound addresses where one system writes \"Maharashtra\" and another writes \"MH\".",
  ],
  faqs: [
    {
      q: "Which countries have state data?",
      a: "Coverage varies by country and territory. Records can represent different administrative levels. Use /countries/{ciso}/states to inspect the current entries for a country; some places may have no listed divisions.",
    },
    {
      q: "Do you return ISO 3166-2 codes?",
      a: "The iso3166_2 field contains a subdivision code when available, alongside iso2. Some records lack a code, and field access depends on your plan.",
    },
    {
      q: "What does the type field contain?",
      a: "A division classification such as state, province, region or prefecture, when available. Values and administrative levels vary by record and country; access to this field depends on your plan.",
    },
    {
      q: "Can I fetch every state in one request?",
      a: "GET /states lists states on Starter and higher plans. Community includes /countries/{ciso}/states for a country-by-country load. Check the current plan comparison for endpoint availability.",
    },
  ],
};

export const CITY_API = {
  slug: "city-api",
  resource: "City",
  eyebrow: "City API",
  headline: `${TEXT_STATS.cities} cities and settlements, linked by location.`,
  summary:
    "Cities, towns and settlements linked to countries and states. Community returns basic city fields; richer fields, nearby search and autocomplete are available on eligible paid plans.",
  count: TEXT_STATS.cities,
  countLabel: "cities and settlements",
  metaTitle: `City API: ${TEXT_STATS.cities} Cities and Settlements`,
  metaDescription:
    `City API covering ${TEXT_STATS.cities} cities and settlements. Free basic JSON access; coordinates, translations, autocomplete and nearby search on eligible plans.`,
  keywords: [
    "city api",
    "cities api",
    "city apis",
    "city database api",
    "city autocomplete api",
    "nearby cities api",
  ],
  endpoints: [
    { method: "GET", path: "/countries/{ciso}/cities", description: "Every city in a country" },
    { method: "GET", path: "/countries/{ciso}/states/{siso}/cities", description: "Cities within one state" },
    { method: "GET", path: "/search/autocomplete", description: "Type-ahead for a location picker" },
    { method: "GET", path: "/search/nearby", description: "Cities near a latitude and longitude" },
    { method: "GET", path: "/timezone/{ciso}/{siso}/{city_id}", description: "Timezone for a given city" },
  ],
  sampleRequest: curlExample("/countries/IN/states/MH/cities"),
  sampleResponse: JSON.stringify([{ id: LOCATION_SAMPLES[0].st[0].ci[0][1], name: LOCATION_SAMPLES[0].st[0].ci[0][0], kind: "settlement" }], null, 2),
  fields: [
    { name: "id", note: "Stable numeric identifier" },
    { name: "name", note: "English name" },
    { name: "native", note: "Name in the local script" },
    { name: "kind", note: "settlement, county or administrative unit" },
    { name: "type", note: "city, town, village and so on" },
    { name: "level", note: "Depth in the official hierarchy" },
    { name: "parent_id", note: "Containing division, where one exists" },
    { name: "state_id", note: "Parent state id" },
    { name: "state_code", note: "Parent state code" },
    { name: "country_id", note: "Parent country id" },
    { name: "country_code", note: "Parent country ISO2" },
    { name: "latitude", note: "Point latitude" },
    { name: "longitude", note: "Point longitude" },
    { name: "timezone", note: "IANA zone" },
    { name: "population", note: "When available; may be null" },
    { name: "translations", note: "Name in other languages" },
    { name: "wikiDataId", note: "Wikidata item" },
  ],
  useCases: [
    "The third dropdown in an address form, or a type-ahead that replaces all three.",
    "Showing the right local time for a user without asking them to pick a timezone.",
    "Finding the nearest serviceable city to a dropped pin, through /search/nearby.",
    "Seeding a store locator or coverage map with real coordinates rather than geocoding every row.",
  ],
  faqs: [
    {
      q: "How many cities does the API cover?",
      a: `${TEXT_STATS.cities} cities and settlements across ${TEXT_STATS.countries} countries and territories. Coverage varies by release. Parent links help identify places with the same name; returned fields depend on your plan.`,
    },
    {
      q: "Is there an autocomplete endpoint?",
      a: "GET /search/autocomplete returns ranked suggestions across countries, states and cities. It is available on Supporter and higher plans; basic city-list endpoints are also available on Community.",
    },
    {
      q: "Do cities come with coordinates and timezones?",
      a: "Coordinates and IANA timezones are included when populated and available on your plan. Some values may be missing or null; Community city responses contain basic fields rather than coordinates.",
    },
    {
      q: "Can I find cities near a point?",
      a: "On Supporter and higher plans, GET /search/nearby accepts coordinates and a radius and returns matching places ordered by distance. Check the endpoint documentation for accepted parameters and limits.",
    },
  ],
};

export const API_LANDING_PAGES = [COUNTRY_API, STATE_API, CITY_API];
