import { ArrowRight } from "lucide-react";

interface StickyMobileCTAProps {
  onReserveClick: () => void;
  isVisible: boolean;
}

export function StickyMobileCTA({ onReserveClick, isVisible }: StickyMobileCTAProps) {
  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 tone-light backdrop-blur-md border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
          Free · Live Session
        </p>
        <p className="font-serif text-xs font-bold text-[var(--color-medical-navy)] truncate">
          B.Pharm Career Map 2026
        </p>
      </div>
      <button
        type="button"
        onClick={onReserveClick}
        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
        style={{ color: '#FFFFFF' }}
      >
        GET FREE MAP
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
