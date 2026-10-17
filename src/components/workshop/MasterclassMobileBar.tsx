import { ArrowRight } from "lucide-react";

interface MasterclassMobileBarProps {
  onReserveClick: () => void;
}

export function MasterclassMobileBar({ onReserveClick }: MasterclassMobileBarProps) {
  return (
    <aside
      aria-label="Quick registration bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] p-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3 tone-light card-light pb-safe"
    >
      <div className="min-w-0">
        <div className="text-[10px] font-mono font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
          <span>Live Masterclass</span>
        </div>
        <div className="text-xs font-bold text-[#081F38] truncate mt-0.5">
          Tuesday, Oct 20 · 6 PM
        </div>
      </div>
      <button
        type="button"
        onClick={onReserveClick}
        data-arzon-dark="true"
        style={{
          backgroundColor: "#2563EB",
          color: "#ffffff",
          WebkitTextFillColor: "#ffffff",
        }}
        className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#2563EB] !bg-[#2563EB] hover:bg-[#1D4ED8] text-white !text-white text-xs font-bold shadow-md shadow-blue-500/25 active:scale-[0.98] shrink-0 cursor-pointer"
      >
        <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Reserve Free Seat</span>
        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" style={{ color: "#ffffff", stroke: "#ffffff" }} />
      </button>
    </aside>
  );
}
