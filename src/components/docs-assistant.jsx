"use client";

import Script from "next/script";

// Mintlify docs assistant widget. Answers visitor questions from
// docs.countrystatecity.in and links back to the relevant docs pages.
//
// The widget ID is public and safe to commit: chats only start from origins
// allowlisted under Mintlify > Settings > Widget. An origin that is missing
// there loads the script fine but refuses to open a conversation, so add any
// new preview or staging host to that list before testing on it.
//
// The config is held as JSON rather than an object literal on purpose.
// Production builds strip literal properties that are never read in this file:
// the object escapes into init(), which the optimiser does not account for, so
// the deployed bundle shipped `{}` and the widget refused to start with
// "init(config) requires an id". Both the Turbopack and webpack builds do it,
// and dev builds do not, so it only appeared once deployed. A string cannot be
// property-eliminated, so every setting below survives the build.
//
// accent matches --color-blue in globals.css.
const ASSISTANT_CONFIG_JSON = `{
  "id": "mint_widget_d355fc9e-9252-4aab-b257-86c438f867cf",
  "supportEmail": "api@countrystatecity.in",
  "starterQuestions": [
    "How do I get an API key and make my first request?",
    "How do I build a country, state and city dropdown?",
    "Which fields are available on my plan?"
  ],
  "labels": {
    "title": "CSC Docs Assistant",
    "trigger": "Ask the docs",
    "placeholder": "Ask about the API, database or tools..."
  },
  "appearance": {
    "variant": "widget",
    "theme": "system",
    "accent": "#2296f3",
    "radius": "16px",
    "side": "bottom",
    "align": "end",
    "logo": {
      "light": "https://countrystatecity.in/favicon.svg",
      "dark": "https://countrystatecity.in/favicon.svg"
    }
  }
}`;

/**
 * Parses the widget config, returning null if it is unusable.
 *
 * Guards the build hazard described above: a config that lost its id would
 * otherwise leave a launcher on the page that can never start a chat.
 */
function readAssistantConfig() {
  try {
    const config = JSON.parse(ASSISTANT_CONFIG_JSON);
    if (!config.id) {
      console.error("Docs assistant: config is missing its widget id.");
      return null;
    }
    return config;
  } catch (error) {
    console.error("Docs assistant: config is not valid JSON:", error);
    return null;
  }
}

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
        const config = readAssistantConfig();
        if (!config) return;

        // The widget is a progressive enhancement: if it cannot mount (origin
        // not allowlisted, plan limits, network), the site must carry on
        // working, so failures are logged rather than surfaced or thrown.
        window.MintlifyAssistant?.init(config).catch((error) => {
          console.error("Docs assistant failed to initialise:", error);
        });
      }}
      onError={(error) => {
        console.error("Docs assistant loader failed to load:", error);
      }}
    />
  );
}
