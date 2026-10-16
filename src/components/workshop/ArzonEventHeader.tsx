import { ArrowRight } from "lucide-react";

interface ArzonEventHeaderProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

export function ArzonEventHeader({ onReserveClick }: ArzonEventHeaderProps) {
  return (
    <header className="sticky top-16 z-40 w-full bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)] tone-light card-light transition-all">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 sm:h-13 items-center justify-between gap-4">
          {/* Left: Masterclass Context */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-bold text-xs sm:text-sm text-[#081F38] tracking-tight whitespace-nowrap">
              Pharmacovigilance Masterclass
            </span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50/90 text-blue-700 font-mono text-[10.5px] font-semibold border border-blue-200/70 whitespace-nowrap shrink-0">
              Oct 20 · 6:00 PM IST
            </span>
          </div>

          {/* Right: Section Anchors & Action */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600">
              <a href="#outcomes" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Outcomes
              </a>
              <a href="#mentor" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Mentor
              </a>
              <a href="#eligibility" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Eligibility
              </a>
              <a href="#why-arzon" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Why Arzon
              </a>
              <a href="#reviews" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Reviews
              </a>
              <a href="#faq" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                FAQ
              </a>
            </nav>

            <button
              type="button"
              onClick={onReserveClick}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <span>Reserve Free Seat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
