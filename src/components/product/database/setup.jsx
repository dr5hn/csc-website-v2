import CodePanel from "@/components/ui/code-panel";

const TABS = [
  { label: "Git", code: "git clone https://github.com/dr5hn/countries-states-cities-database.git\ncd countries-states-cities-database" },
  { label: "npm", code: "npm install @countrystatecity/countries\n# or, in the browser\nnpm install @countrystatecity/countries-browser" },
  { label: "PyPI", code: "pip install countrystatecity-countries" },
  { label: "CLI", code: "npm install -g @countrystatecity/cli\ncsc search cities --country IN --state MH" },
];

export default function DatabaseSetup() {
  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-3 pb-[clamp(56px,7vw,104px)]">
      <CodePanel tabs={TABS} />
      <div className="flex flex-col gap-3.5 rounded-3xl bg-field p-6">
        <span className="font-cal text-2xl">Licensing, in one place</span>
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] leading-normal text-ink-code">
          {[
            "Use it in commercial products.",
            "Credit CountryStateCity where the data appears.",
            "Share changes to the data itself under the same licence.",
          ].map((line) => (
            <li key={line} className="flex gap-2.5">
              <span aria-hidden="true" className="text-ok">✓</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <span className="font-mono text-[13px] text-ink-2">Data and packages: ODbL-1.0</span>
        <a href="https://docs.countrystatecity.in/" target="_blank" rel="noopener noreferrer" className="mt-auto text-[15px] font-semibold">
          Read the licence →
        </a>
      </div>
    </section>
  );
}
