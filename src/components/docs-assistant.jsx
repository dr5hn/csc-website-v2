"use client";

import Script from "next/script";

// Mintlify docs assistant widget. Answers visitor questions from
// docs.countrystatecity.in and links back to the relevant docs pages.
//
// The widget ID is public and safe to commit: chats only start from origins
// allowlisted under Mintlify > Settings > Widget. An origin that is missing
// there loads the script fine but refuses to open a conversation, so add any
// new preview or staging host to that list before testing on it.
const ASSISTANT_CONFIG = {
  id: "mint_widget_d355fc9e-9252-4aab-b257-86c438f867cf",
  supportEmail: "api@countrystatecity.in",
  starterQuestions: [
    "How do I get an API key and make my first request?",
    "How do I build a country, state and city dropdown?",
    "Which fields are available on my plan?",
  ],
  labels: {
    title: "CSC Docs Assistant",
    trigger: "Ask the docs",
    placeholder: "Ask about the API, database or tools...",
  },
  appearance: {
    variant: "widget",
    theme: "system",
    accent: "#2296f3", // --color-blue in globals.css
    radius: "16px",
    side: "bottom",
    align: "end",
    logo: {
      light: "https://countrystatecity.in/favicon.svg",
      dark: "https://countrystatecity.in/favicon.svg",
    },
  },
};

/**
 * Loads the Mintlify assistant widget and mounts it once the loader is ready.
 *
 * Mount this once, in the root layout. The loader is a module script, so it
 * only defines window.MintlifyAssistant after it executes — init() therefore
 * runs from onReady rather than at render time.
 */
export default function DocsAssistant() {
  return (
    <Script
      type="module"
      src="https://widget.mintlify.com/v1/embed.js"
      strategy="afterInteractive"
      onReady={() => {
        // The widget is a progressive enhancement: if it cannot mount (origin
        // not allowlisted, plan limits, network), the site must carry on
        // working, so failures are logged rather than surfaced or thrown.
        window.MintlifyAssistant?.init(ASSISTANT_CONFIG).catch((error) => {
          console.error("Docs assistant failed to initialise:", error);
        });
      }}
      onError={(error) => {
        console.error("Docs assistant loader failed to load:", error);
      }}
    />
  );
}
