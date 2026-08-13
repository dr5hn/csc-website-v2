"use client";

import { useEffect, useState } from "react";

const ATTRIBUTION_KEYS = ["source", "campaign", "package"];

function readInboundAttribution() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) attribution[key] = value;
  }
  return attribution;
}

// Reads source/campaign/package off the current page's URL, if present.
// Values are passed through as-is; csc-app validates the source allowlist on receipt.
export function useInboundAttribution() {
  const [attribution, setAttribution] = useState({});

  useEffect(() => {
    setAttribution(readInboundAttribution());
  }, []);

  return attribution;
}

export function withAttribution(href, attribution) {
  const keys = Object.keys(attribution || {});
  if (keys.length === 0) return href;

  const separator = href.includes("?") ? "&" : "?";
  const query = keys
    .map((key) => `${key}=${encodeURIComponent(attribution[key])}`)
    .join("&");
  return `${href}${separator}${query}`;
}
