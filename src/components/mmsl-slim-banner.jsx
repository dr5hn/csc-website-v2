import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function MmslSlimBanner() {
  return (
    <div className="bg-gradient-to-br from-white via-light/30 to-blue/5">
      <div className="container mx-auto px-4 py-6">
        <Link
          href="https://makemysitelive.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-white/60 border-l-4 border-l-[#0d9488] border border-light/70 shadow-sm px-10 py-7 hover:shadow-md hover:bg-white/80 transition-all duration-300"
        >
          {/* Left — logo + text */}
          <div className="flex items-center gap-5">
            <Image
              src="/mmsl-icon.png"
              alt="MakeMySiteLive"
              width={52}
              height={52}
              className="w-13 h-13 object-contain shrink-0"
            />
            <div>
              <p className="text-xl font-bold text-dark leading-tight">
                Build &amp; launch websites{" "}
                <span className="text-[#0d9488]">faster with MakeMySiteLive</span>
              </p>
              <p className="text-sm text-darkgray mt-1">
                Deploy your next site in under 2 minutes. Simple, fast, reliable.
              </p>
            </div>
          </div>

          {/* Right — CTA + badge */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl bg-[#0d9488] px-7 py-3 text-base font-semibold text-white group-hover:bg-[#0b7a70] transition-colors duration-200">
              Explore MakeMySiteLive
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-[#0d9488] font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Free to start
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
