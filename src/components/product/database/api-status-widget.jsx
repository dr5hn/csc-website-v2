import Link from "next/link";

export default function APIStatusWidget() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-green/60 bg-white/70 p-3 md:p-4 relative">
      {/* Status Dot */}
      <span aria-hidden className="relative inline-flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/60 opacity-60"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green"></span>
      </span>

      <div className="space-y-0.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-green">
          <span className="sr-only">API status:</span>
          <Link href="https://status.countrystatecity.in/" target="_blank" className="content-[''] before:absolute before:inset-0">
            <span>All Systems Operational</span>
          </Link>
        </div>
        <div className="text-xs md:text-sm text-darkgray">Uptime: 99.98%</div>
      </div>
    </div>
  );
}
