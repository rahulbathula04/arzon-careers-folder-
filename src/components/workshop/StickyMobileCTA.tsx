import { ArrowRight } from "lucide-react";

interface StickyMobileCTAProps {
  onReserveClick: () => void;
  isVisible: boolean;
  percentReserved?: number;
}

export function StickyMobileCTA({
  onReserveClick,
  isVisible,
  percentReserved = 86,
}: StickyMobileCTAProps) {
  if (!isVisible) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 tone-light card-light backdrop-blur-md border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-in slide-in-from-bottom duration-300"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 motion-safe:animate-pulse" />
          <p className="font-mono text-[10px] font-bold text-rose-600 uppercase tracking-wider">
            {percentReserved}% RESERVED · FREE PASS
          </p>
        </div>
        <p className="font-sans text-xs font-bold text-slate-900 truncate">
          Sat, 19 Sep @ 6 PM · Google Meet
        </p>
      </div>
      <button
        type="button"
        onClick={onReserveClick}
        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer min-h-[46px]"
      >
        <span>RESERVE SEAT</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

