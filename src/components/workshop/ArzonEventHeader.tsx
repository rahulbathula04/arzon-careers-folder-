import { ArrowRight } from "lucide-react";

interface ArzonEventHeaderProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

export function ArzonEventHeader({ onReserveClick }: ArzonEventHeaderProps) {
  return (
    <div className="sticky top-16 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 tone-light card-light transition-all">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between gap-4">
          {/* Left: Masterclass Context */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-bold text-xs sm:text-sm text-[#081F38] whitespace-nowrap">
              Pharmacovigilance Masterclass
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10.5px] font-semibold border border-blue-100 whitespace-nowrap shrink-0">
              Oct 20 · 6:00 PM IST
            </span>
          </div>

          {/* Right: Section Anchors & Action */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-600">
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
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <span>Reserve Free Seat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
