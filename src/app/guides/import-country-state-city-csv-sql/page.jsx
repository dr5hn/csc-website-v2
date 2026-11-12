import { readFile } from "node:fs/promises";
import { join } from "node:path";
import Link from "next/link";
import CopyButton from "@/components/ui/copy-button";
import JsonLd from "@/components/json-ld";
import CtaLink from "@/components/cta-link";
import { buttonVariants } from "@/components/ui/button";
import { breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";

const PATH = "/guides/import-country-state-city-csv-sql/";
const TITLE = "Import Country, State and City CSV into SQLite";
const DESCRIPTION = "Import a verified country, state and city CSV snapshot into SQLite with Python, preserved IDs, nullable state links, foreign-key checks and downloadable SQL queries.";
const DATE = "2026-11-12";
const RELEASE = "v5.2.0-export.1";
const COMMIT = "9b255c45fc53e02a8dff547d88558d4fe91784d5";
const RELEASE_URL = `https://github.com/dr5hn/countries-states-cities-database/releases/tag/${RELEASE}`;
const ASSETS = `https://github.com/dr5hn/countries-states-cities-database/releases/download/${RELEASE}`;
const RAW = `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/${COMMIT}`;
const LINK = "text-blue underline underline-offset-4 hover:text-blue-deep";
const FAQS = [
  { q: "How do I import country, state and city CSV files into SQL?", a: "Choose one pinned snapshot, verify the source files, then import countries, states and cities in that order. Preserve the supplied IDs and enable foreign-key enforcement. This guide provides a Python standard-library importer that creates a new local SQLite projection." },
  { q: "Why does a city sometimes have no state?", a: "The tested v5.2.0-export.1 snapshot contains three cities with blank CSV state_id values. The importer converts those blanks to SQL NULL. A left join to states preserves these rows when querying the complete city dataset." },
  { q: "Does this import every CSV column?", a: "No. The example retains IDs, names, country links, state links and ISO2 codes in three entity tables, plus a provenance table. Counties, coordinates, translations, population and other columns are outside this projection. Use the published engine-specific exports when you need their database schema." },
  { q: "Can I load a MySQL dump into PostgreSQL or SQLite?", a: "Select the export for the target database engine. The release publishes separate MySQL, PostgreSQL and SQLite files. This guide executes and tests the CSV-to-SQLite path; SQL syntax, types and import tooling differ across engines." },
];
const DOWNLOAD = `set -eu
mkdir csc-csv-demo
cd csc-csv-demo

curl -fL '${RAW}/csv/countries.csv' -o countries.csv
curl -fL '${RAW}/csv/states.csv' -o states.csv
curl -fL '${ASSETS}/csv-cities.csv.gz' -o cities.csv.gz
curl -fL '${SITE_URL}/examples/import-csc-csv.py' -o import-csc-csv.py`;
const RESULT = `{
  "release": "v5.2.0-export.1",
  "countries": 250,
  "states": 5327,
  "cities": 156169,
  "cities_without_state": 3
}`;

/** Make long code blocks copyable and keyboard-scrollable without a separate viewer. */
function CodeBlock({ label, code }) {
  return <div className="min-w-0 overflow-hidden rounded-[20px] border border-line bg-field">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2"><span className="font-mono text-sm text-ink-3">{label}</span><CopyButton text={code} /></div>
    <pre tabIndex={0} aria-label={label} className="m-0 max-h-[620px] overflow-auto p-5 font-mono text-[12.5px] leading-[1.65] text-ink-code"><code>{code}</code></pre>
  </div>;
}

export const metadata = {
  title: TITLE, description: DESCRIPTION, alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}`, type: "article", publishedTime: DATE, modifiedTime: DATE, images: [{ url: "/og/database.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og/database.png"] },
};

/** Publish the exact importer and queries executed against the pinned release. */
export default async function CsvSqlGuide() {
  const [importer, queries] = await Promise.all([
    readFile(join(process.cwd(), "public/examples/import-csc-csv.py"), "utf8"),
    readFile(join(process.cwd(), "public/examples/csc-location-queries.sql"), "utf8"),
  ]);
  return (
    <article className="wrap flex max-w-[1040px] flex-col gap-10 pb-[clamp(56px,7vw,104px)] pt-[clamp(40px,6vw,80px)] [&_p_code]:break-all [&_li_code]:break-all [&_section]:scroll-mt-32 [&_ul]:list-disc">
      <JsonLd data={breadcrumbSchema([{ name: TITLE, path: PATH }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: TITLE, description: DESCRIPTION, datePublished: DATE, dateModified: DATE, mainEntityOfPage: `${SITE_URL}${PATH}`, author: { "@type": "Organization", name: "CSC Database", url: SITE_URL }, publisher: { "@type": "Organization", name: "CSC Database", url: SITE_URL } }} />
      <JsonLd data={faqSchema(FAQS)} />
      <header className="flex flex-col gap-5">
        <span className="eyebrow">Implementation guide · CSV / SQL / Python</span>
        <h1 className="display-1 m-0">Import country, state and city CSV into SQLite.</h1>
        <p className="lead m-0">Use one pinned snapshot, import parent tables first, preserve location IDs and keep null state links. This recipe builds a local SQLite database with the Python standard library and checks its relationships before publishing the file.</p>
        <p className="m-0 text-sm text-ink-3">Tested <time dateTime={DATE}>12 November 2026</time> against release <a href={RELEASE_URL} className={LINK}>{RELEASE}</a>. The counts below describe that snapshot. The import needs Python 3.9+ with sqlite3; the download commands use curl and a POSIX shell.</p>
        <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">{[['format', 'Choose a format'], ['download', 'Download pinned files'], ['import', 'Import CSV'], ['queries', 'Run SQL'], ['checks', 'Verify results']].map(([id, label]) => <a key={id} href={`#${id}`} className={LINK}>{label}</a>)}</nav>
      </header>

      <section id="format" className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">1. Choose the format for your task.</h2>
        <p className="m-0">CSV is useful for a small, explicit SQL projection or an ETL pipeline. Here, countries retain <code>id, name, iso2</code>; states retain <code>id, name, country_id, iso2</code>; cities retain <code>id, name, country_id, state_id</code>. A separate <code>import_info</code> table records the release and source commit. The shipped importer accepts this pinned snapshot; custom or filtered files need their own verified hashes and required parent rows.</p>
        <p className="m-0">The example deliberately leaves other columns out. For a ready-made database export, select the matching engine from the same release:</p>
        <ul className="m-0 flex flex-col gap-2 pl-6">
          <li><a href={`${ASSETS}/sql-world.sql.gz`} className={LINK}>MySQL SQL export</a></li>
          <li><a href={`${ASSETS}/psql-world.sql.gz`} className={LINK}>PostgreSQL SQL export</a></li>
          <li><a href={`${ASSETS}/sqlite-world.sqlite3.gz`} className={LINK}>SQLite database export</a></li>
        </ul>
        <p className="m-0">This guide validates the CSV-to-SQLite path. Review the release notes and target-engine tooling before loading a different export into an empty database.</p>
      </section>

      <section id="download" className="flex min-w-0 flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">2. Download one reproducible snapshot.</h2>
        <p className="m-0">Countries and states are reference CSVs from the release commit. Cities come from the matching compressed release asset. The importer checks all three file sizes and SHA-256 hashes before reading CSV rows. Keep the city file compressed.</p>
        <CodeBlock label="Download commands" code={DOWNLOAD} />
        <p className="m-0">The command creates a new <code>csc-csv-demo</code> directory and stops if it already exists or a download fails. The pinned source commit is <code>{COMMIT}</code>. Source links: <a href={`${RAW}/csv/countries.csv`} className={LINK}>countries CSV</a>, <a href={`${RAW}/csv/states.csv`} className={LINK}>states CSV</a>, <a href={`${ASSETS}/csv-cities.csv.gz`} className={LINK}>compressed cities CSV</a>.</p>
      </section>

      <section id="import" className="flex min-w-0 flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">3. Build a new local database.</h2>
        <p className="m-0">From the new directory, run the importer. It preserves IDs, imports countries before states and cities, and enables SQLite foreign keys. The composite state relationship also checks that a city and its selected state belong to the same country.</p>
        <CodeBlock label="Import command" code="python3 import-csc-csv.py . locations.sqlite" />
        <p className="m-0">CSV values are read with quoting-aware UTF-8 parsing and bound SQL parameters. Blank city <code>state_id</code> values become SQL <code>NULL</code>. Invalid identifiers, duplicate keys and broken relationships stop the import. An existing output file is preserved.</p>
        <p className="m-0">The importer builds in a private temporary directory beside the output, then publishes with a same-filesystem hard link. This requires a filesystem that supports hard links. A failure leaves no newly published database; an output created by another process during the import is also preserved.</p>
        <a href="/examples/import-csc-csv.py" download="import-csc-csv.py" className={LINK}>Download the Python importer</a>
        <details className="min-w-0"><summary className="mb-4 cursor-pointer font-semibold text-ink">View the complete importer and pinned checksums</summary><CodeBlock label="Python importer" code={importer} /></details>
      </section>

      <section id="queries" className="flex min-w-0 flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">4. Join locations by their IDs.</h2>
        <p className="m-0">Join cities to countries by <code>country_id</code>. Use a left join for the optional state link when listing every city. State codes are country-scoped; city names are useful search filters but can repeat.</p>
        <CodeBlock label="SQL queries" code={queries} />
        <a href="/examples/csc-location-queries.sql" download="csc-location-queries.sql" className={LINK}>Download the SQL queries</a>
        <p className="m-0">If the SQLite3 CLI is installed, download the query file into the same directory and run it read-only:</p>
        <CodeBlock label="Optional SQLite CLI" code={`curl -fL '${SITE_URL}/examples/csc-location-queries.sql' -o csc-location-queries.sql\nsqlite3 -readonly -header -column locations.sqlite < csc-location-queries.sql`} />
      </section>

      <section id="checks" className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">5. Check counts and nullable links.</h2>
        <p className="m-0">The exact importer above was run against all three pinned source files. It produced this result:</p>
        <CodeBlock label="Verified import result" code={RESULT} />
        <p className="m-0">The joined Mumbai row is <code>133024, Mumbai, Maharashtra, India</code>. <code>PRAGMA foreign_key_check</code> returned no rows. A left join to states retained all 156,169 cities; an inner join returned 156,166, omitting the three valid null-state records.</p>
        <ul className="m-0 flex flex-col gap-2 pl-6">
          <li>Keep foreign-key enforcement enabled on each SQLite connection that writes data.</li>
          <li>Record the release with imported IDs, and review migration notes before upgrading snapshots.</li>
          <li>When using a filtered export, include its required parent countries and states and verify their relationships.</li>
          <li>Inspect place types and administrative levels in the source when your application needs a narrower definition of a city.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-5"><h2 className="display-3 m-0">Questions about importing CSV into SQL.</h2>{FAQS.map(({ q, a }) => <div key={q}><h3 className="mb-2 mt-0 font-cal text-[22px]">{q}</h3><p className="m-0 text-[17px] leading-[1.65] text-ink-2">{a}</p></div>)}</section>

      <section className="flex flex-col gap-4 text-[17px] leading-[1.65] text-ink-2">
        <h2 className="display-3 m-0 text-ink">Choose how you maintain the data.</h2>
        <p className="m-0">A local snapshot works for offline queries, prototypes and application-specific joins. The <Link href="/product/api/" className={LINK}>hosted API</Link> provides managed access to the dataset currently served there, with search and other features on eligible plans. The <Link href="/product/export-tool/" className={LINK}>Export Tool</Link> provides filtered downloads; compare fields, formats and pricing for your use case.</p>
        <div className="flex flex-wrap gap-3"><CtaLink href="https://app.countrystatecity.in?utm_source=website&utm_medium=guide&utm_content=csv_sql_import" location="csv_sql_guide" track="api" className={buttonVariants()}>Get a free API key →</CtaLink><Link href="/product/database/" className={buttonVariants({ variant: "outline" })}>Explore database formats</Link></div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-hair pt-6 text-sm leading-normal text-ink-3">
        <p className="m-0">Continue with the <Link href="/guides/react-country-state-city-dropdown/" className={LINK}>working React country, state and city dropdown guide</Link>.</p>
        <p className="m-0">Data attribution: <a href={RELEASE_URL} className={LINK}>Countries States Cities Database</a>, under <a href="https://opendatacommons.org/licenses/odbl/1-0/" className={LINK}>ODbL-1.0</a>. Preserve applicable release notices and review attribution and share-alike requirements when redistributing data.</p>
        <p className="m-0">References: <a href="https://docs.python.org/3/library/csv.html" className={LINK}>Python CSV parsing</a>, <a href="https://docs.python.org/3/library/sqlite3.html" className={LINK}>Python SQLite</a> and <a href="https://www.sqlite.org/foreignkeys.html" className={LINK}>SQLite foreign keys</a>.</p>
      </footer>
    </article>
  );
}
