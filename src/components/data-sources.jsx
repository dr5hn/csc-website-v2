import Link from "next/link";

/** Link coverage claims to the serving API, versioned data and licence. */
export default function DataSources() {
  return (
    <p className="m-0 text-sm leading-normal text-ink-3">
      Coverage varies by release. Check the <Link href="https://api.countrystatecity.in/stats" className="text-blue hover:underline">API statistics</Link> and{" "}
      <Link href="https://github.com/dr5hn/countries-states-cities-database/releases" className="text-blue hover:underline">database releases</Link> for current data. Read the{" "}
      <Link href="https://github.com/dr5hn/countries-states-cities-database/blob/master/LICENSE" className="text-blue hover:underline">ODbL-1.0 licence</Link> before using the database.
    </p>
  );
}
