"use client";

import { useEffect, useId, useState } from "react";
import { clearCache, getCountries, getStatesOfCountry, getCitiesOfState } from "@countrystatecity/countries-browser";

const UNASSIGNED = "__unassigned__";
const LABELS = { country: "Country or territory", state: "State or region", city: "City or place" };

/** Load one dependent list and ignore responses after its parent selection changes. */
function LocationSelect({ kind, country = "", state = "", value, onChange }) {
  const id = useId();
  const [result, setResult] = useState({ items: [], loading: true, error: "" });
  const [attempt, setAttempt] = useState(0);
  const enabled = kind === "country" || (kind === "state" ? Boolean(country) : Boolean(country && state));

  useEffect(() => {
    let active = true;
    if (!enabled) return;
    const request = kind === "country" ? getCountries()
      : kind === "state" ? getStatesOfCountry(country)
      : getCitiesOfState(country, state === UNASSIGNED ? null : state);

    request.then((items) => {
      if (!Array.isArray(items) || !items.every((item) => item && typeof item.name === "string" && item.name.trim() &&
        (kind === "country" || item.country_code === country) &&
        (kind === "city" ? Number.isSafeInteger(item.id) && item.id > 0 && item.state_code === (state === UNASSIGNED ? null : state)
          : typeof item.iso2 === "string" && (kind === "country" ? /^[A-Z]{2}$/ : /^[A-Z0-9-]{1,16}$/).test(item.iso2))) ||
        new Set(items.map((item) => kind === "city" ? item.id : item.iso2)).size !== items.length) {
        throw new TypeError("Invalid location list");
      }
      if (active) setResult({ items, loading: false, error: "" });
    }).catch(() => {
      if (active) setResult({ items: [], loading: false, error: "Could not load a valid location list. Retry the request." });
    });
    return () => { active = false; };
  }, [kind, country, state, attempt, enabled]);

  const { items, loading, error } = result;
  const empty = enabled && !loading && !error && items.length === 0;
  const placeholder = !enabled ? (kind === "state" ? "Choose a country first" : "Choose a state or the unassigned option first")
    : loading ? "Loading…" : `Choose ${kind}`;

  return (
    <div>
      <label htmlFor={id}>{LABELS[kind]}</label>
      <select id={id} name={kind} value={value} onChange={(event) => onChange(event.target.value)}
        disabled={!enabled || loading || Boolean(error) || (empty && kind !== "state")} aria-describedby={`${id}-status`}>
        <option value="">{placeholder}</option>
        {items.map((item) => <option key={kind === "city" ? item.id : item.iso2}
          value={kind === "city" ? String(item.id) : item.iso2}>{item.name}</option>)}
        {kind === "state" && enabled && !loading && !error && <option value={UNASSIGNED}>No listed state (unassigned places)</option>}
      </select>
      <p id={`${id}-status`} role="status">
        {enabled && loading ? "Loading locations…" : error || (empty ? "No entries returned. This can also mean the CDN is unavailable." : "")}
      </p>
      {enabled && !loading && (error || empty) && <button type="button" onClick={() => {
        clearCache();
        setResult({ items: [], loading: true, error: "" });
        setAttempt((count) => count + 1);
      }}>Retry {LABELS[kind].toLowerCase()}</button>}
    </div>
  );
}

/** A native React dropdown: changing a parent clears and remounts its dependent lists. */
export default function LocationDropdown() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <fieldset>
      <legend>Choose a location</legend>
      <LocationSelect kind="country" value={country} onChange={(code) => {
        setCountry(code); setState(""); setCity("");
      }} />
      <LocationSelect key={`states-${country}`} kind="state" country={country} value={state} onChange={(code) => {
        setState(code); setCity("");
      }} />
      <LocationSelect key={`cities-${country}-${state}`} kind="city" country={country} state={state} value={city} onChange={setCity} />
      <output aria-label="Selected location" aria-live="polite">
        {city ? JSON.stringify({ country_code: country, state_code: state === UNASSIGNED ? null : state, city_id: Number(city) })
          : "Choose a location to see its codes and city ID."}
      </output>
    </fieldset>
  );
}
