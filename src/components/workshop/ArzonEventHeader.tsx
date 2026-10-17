import { ArrowRight } from "lucide-react";

interface ArzonEventHeaderProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

export function ArzonEventHeader({ onReserveClick }: ArzonEventHeaderProps) {
  return (
    <header className="sticky top-16 z-40 w-full bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)] tone-light card-light transition-all">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 sm:h-13 items-center justify-between gap-4">
          {/* Left: Masterclass Context */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-semibold text-xs sm:text-sm text-slate-900 tracking-tight whitespace-nowrap">
              Pharmacovigilance Masterclass
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#1D4ED8] font-mono text-[10.5px] font-semibold border border-[#BFDBFE] whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
              <span>Oct 20 · 6:00 PM IST</span>
            </span>
          </div>

          {/* Right: Section Anchors & Action */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-600">
              <a href="#outcomes" className="hover:text-[#2563EB] transition-colors whitespace-nowrap">
                Outcomes
              </a>
              <a href="#mentor" className="hover:text-[#2563EB] transition-colors whitespace-nowrap">
                Mentor
              </a>
              <a href="#eligibility" className="hover:text-[#2563EB] transition-colors whitespace-nowrap">
                Eligibility
              </a>
              <a href="#why-arzon" className="hover:text-[#2563EB] transition-colors whitespace-nowrap">
                Why Arzon
              </a>
              <a href="#reviews" className="hover:text-[#2563EB] transition-colors whitespace-nowrap">
                Reviews
              </a>
              <a href="#faq" className="hover:text-[#2563EB] transition-colors whitespace-nowrap">
                FAQ
              </a>
            </nav>

            <button
              type="button"
              onClick={onReserveClick}
              data-arzon-dark="true"
              style={{
                backgroundColor: "#2563EB",
                color: "#ffffff",
                WebkitTextFillColor: "#ffffff",
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-[#2563EB] !bg-[#2563EB] hover:bg-[#1D4ED8] text-white !text-white text-xs font-semibold transition-all shadow-xs hover:shadow-md shadow-blue-600/20 active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Reserve Seat</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2]" style={{ color: "#ffffff", stroke: "#ffffff" }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
