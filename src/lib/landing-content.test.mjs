import assert from "node:assert/strict";
import {test} from "node:test";
import {API_LANDING_PAGES, CITY_API, COUNTRY_API, STATE_API, API_BASE_URL} from "./api-landing-pages.js";
import {TEXT_STATS} from "./stats.js";
import {LOCATION_SAMPLES} from "../data/location-samples.js";
import {NPM_PACKAGES} from "./npm-packages.js";

/** Coverage stays consistent when the shared verified bounds are refreshed. */
test("landing coverage reuses the site's shared values in SEO descriptions and page totals",()=>{
  for(const [page,count] of [[COUNTRY_API,TEXT_STATS.countries],[STATE_API,TEXT_STATS.states],[CITY_API,TEXT_STATS.cities]]){
    assert.equal(page.count,count);
    assert.ok(page.metaTitle.includes(count));
    assert.ok(page.metaDescription.includes(count));
  }
});

/** A list request must show a list, and Community examples must not advertise paid fields. */
test("API examples have the documented response shape and Community field boundary",()=>{
  const country=JSON.parse(COUNTRY_API.sampleResponse);
  const state=JSON.parse(STATE_API.sampleResponse);
  const cities=JSON.parse(CITY_API.sampleResponse);
  assert.equal(Array.isArray(country),false);
  assert.equal(Array.isArray(state),false);
  assert.equal(Array.isArray(cities),true);
  assert.deepEqual(Object.keys(cities[0]).sort(),["id","kind","name"]);
  assert.equal(cities[0].id,LOCATION_SAMPLES[0].st[0].ci[0][1]);
  assert.equal(cities[0].name,LOCATION_SAMPLES[0].st[0].ci[0][0]);
  assert.equal(country.id,state.country_id);
  for(const record of [country,state])assert.equal("wikiDataId" in record,false);
  for(const page of API_LANDING_PAGES){
    assert.ok(page.sampleRequest.includes(API_BASE_URL));
    assert.ok(page.sampleRequest.includes("YOUR_API_KEY"));
    assert.ok(page.endpoints.every(e=>e.method==="GET"&&e.path.startsWith("/")));
  }
});

/** The official list includes the live SDK as well as data and tooling, without duplicate installs. */
test("package list includes the SDK and CLI with unique scoped package names",()=>{
 const names=NPM_PACKAGES.map(p=>p.name);
 assert.equal(new Set(names).size,names.length);
 assert.ok(names.includes("@countrystatecity/sdk"));
 assert.ok(names.includes("@countrystatecity/cli"));
 assert.ok(names.includes("@countrystatecity/countries-browser"));
 assert.ok(names.every(name=>name.startsWith("@countrystatecity/")));
});
