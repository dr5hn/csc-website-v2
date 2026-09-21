"use client";

const DOCS_URL = "https://docs.countrystatecity.in";

/**
 * Inline trigger that opens the docs assistant, optionally with a question
 * already asked on the visitor's behalf.
 *
 * Renders a real link to the docs and only hijacks the click when the
 * assistant is actually available, so a blocked, slow or not-yet-allowlisted
 * widget leaves a working link rather than a dead control.
 *
 * @param {string} source - Entry point label, surfaced in Mintlify analytics.
 * @param {string} [question] - Asked immediately; omit to just open the panel.
 */
export default function AskDocs({ source, question, className = "", children }) {
  const handleClick = (event) => {
    const assistant = window.MintlifyAssistant;
    if (!assistant) return; // fall through to the href

    event.preventDefault();
    const opened = question
      ? assistant.ask(question, { source })
      : assistant.open({ source });

    opened?.catch((error) => {
      console.error("Docs assistant could not open:", error);
    });
  };

  return (
    <a href={DOCS_URL} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
