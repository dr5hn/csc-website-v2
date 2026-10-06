// JSON-LD builders receive the same plans rendered by the pricing components.
import { STAT_DESCRIPTIONS } from "./stats.js";

export const SITE_URL = "https://countrystatecity.in";
const REPO_URL = "https://github.com/dr5hn/countries-states-cities-database";
const ODBL_URL = "https://opendatacommons.org/licenses/odbl/1-0/";

const publisher = { "@type": "Organization", name: "CSC Database", url: SITE_URL };

const toPrice = (text) => typeof text === "string" ? /^\$(\d+(?:\.\d+)?)$/.exec(text)?.[1] : undefined;

/** Describe the page hierarchy using canonical URLs. */
export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** Describe the API, with offers matching the visible billing interval and catalog. */
export function apiApplicationSchema(plans = [], annual = false) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CSC Database API",
    url: `${SITE_URL}/product/api/`,
    description: `REST and GraphQL API for ${STAT_DESCRIPTIONS.fullCoverageAlt}.`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    publisher,
    ...(plans.length ? { offers: plans.flatMap((plan) => {
      const yearly = annual && plan.price !== "$0" && plan.priceAnnual != null;
      const price = toPrice(yearly ? plan.priceAnnual : plan.price);
      if (price === undefined) return [];
      return [{
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        price,
        priceCurrency: "USD",
        url: `${SITE_URL}/pricing/`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "USD",
          billingDuration: yearly ? "P1Y" : "P1M",
        },
      }];
    }) } : {}),
  };
}

/** Describe the export tool with the credit packs currently displayed. */
export function exportApplicationSchema(plans) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CSC Export Tool",
    url: `${SITE_URL}/product/export-tool/`,
    description:
      "Export country, state and city data in 13 formats, filtered by region or country, with translated names and flag images.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    publisher,
    offers: plans.flatMap((plan) => {
      const price = toPrice(plan.price);
      if (price === undefined) return [];
      return [{
        "@type": "Offer",
        name: plan.name,
        description: `${plan.credits}. ${plan.description}`,
        price,
        priceCurrency: "USD",
        url: `${SITE_URL}/pricing/#export`,
      }];
    }),
  };
}

/** Describe the free database and its data license. */
export function datasetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Countries States Cities Database",
    description: `Open-source database of ${STAT_DESCRIPTIONS.fullCoverageAlt}, available as JSON, CSV, SQL, XML, YAML and more.`,
    url: `${SITE_URL}/product/database/`,
    sameAs: REPO_URL,
    license: ODBL_URL,
    isAccessibleForFree: true,
    keywords: ["countries", "states", "cities", "geographic data", "location data"],
    creator: publisher,
  };
}

/** Identify the website and its publisher. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CSC Database",
    alternateName: "Countries States Cities Database",
    url: SITE_URL,
    publisher,
  };
}
