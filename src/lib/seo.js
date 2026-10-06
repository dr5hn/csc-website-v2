// Shared JSON-LD builders. Plan and price data come from src/data so the markup
// cannot drift from what the pricing pages show.
import { API_PLAN_CARDS } from "@/data/pricing-tiers";
import { exportPricingPlans } from "@/data/export-pricing";
import { STAT_DESCRIPTIONS } from "@/lib/stats";

export const SITE_URL = "https://countrystatecity.in";
const REPO_URL = "https://github.com/dr5hn/countries-states-cities-database";
const ODBL_URL = "https://opendatacommons.org/licenses/odbl/1-0/";

const publisher = { "@type": "Organization", name: "CSC Database", url: SITE_URL };

const toPrice = (text) => text.replace(/[^0-9.]/g, "");

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

export function apiApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CSC Database API",
    url: `${SITE_URL}/product/api/`,
    description: `REST and GraphQL API for ${STAT_DESCRIPTIONS.fullCoverageAlt}.`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    publisher,
    offers: API_PLAN_CARDS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.description,
      price: toPrice(plan.price),
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing/`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: toPrice(plan.price),
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
    })),
  };
}

export function exportApplicationSchema() {
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
    offers: exportPricingPlans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: `${plan.credits}. ${plan.description}`,
      price: toPrice(plan.price),
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing/`,
    })),
  };
}

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
