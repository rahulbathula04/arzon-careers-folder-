import { useState, useRef, type MouseEvent } from "react";
import { QrCode, ShieldCheck, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";

import { WORKSHOP_CONFIG } from "@/data/workshopConfig";

interface Interactive3dBoardingPassProps {
  name: string;
  degree?: string;
  passId?: string;
  isConfirmed?: boolean;
  dateText?: string;
  timeText?: string;
}

export function Interactive3dBoardingPass({
  name,
  degree = "B.Pharm / Pharm.D / Life Sciences",
  passId = "HC-84920",
  isConfirmed = false,
  dateText = WORKSHOP_CONFIG.dateDisplay,
  timeText = WORKSHOP_CONFIG.timeDisplay,
}: Interactive3dBoardingPassProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const displayName = name.trim() ? name.trim().toUpperCase() : "YOUR NAME HERE";
  const displayDegree = degree.trim() ? degree.trim().toUpperCase() : "B.PHARM / PHARM.D / M.PHARM";

  return (
    <div
      className="relative select-none w-full max-w-[420px] mx-auto perspective-1000 py-2 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1200px" }}
      title="Click to flip boarding pass"
    >
      <div
        ref={cardRef}
        className="relative w-full rounded-3xl transition-transform duration-200 ease-out shadow-2xl"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ─────────────────────────────────────────────────────────────
            FRONT SIDE: HOLOGRAPHIC VIP BOARDING PASS
           ───────────────────────────────────────────────────────────── */}
        <div
          className="w-full rounded-3xl border-2 border-stone-800/90 bg-gradient-to-b from-[#0B1325] via-[#0E1B38] to-[#070D1B] text-white p-6 sm:p-7 space-y-5 relative overflow-hidden shadow-2xl backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Holographic metallic reflection shimmer overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 mix-blend-overlay"
            style={{
              transform: `translate(${rotateY * 2}px, ${rotateX * 2}px)`,
            }}
          />

          {/* Top Notch Cutouts mimicking boarding pass perforation */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF8F5] border border-stone-300" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF8F5] border border-stone-300" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <img src={arzonIcon} alt="Arzon Global" className="h-5 w-5 object-contain" />
              <div>
                <span className="font-mono text-xs font-black tracking-widest text-white uppercase block">
                  ARZON GLOBAL
                </span>
                <span className="font-mono text-[9px] text-sky-300 tracking-wider uppercase block">
                  ACADEMIC CAREER INITIATIVE
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                LIMITED SEATS · BATCH 01
              </span>
            </div>
          </div>

          {/* Interaction Title */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 block font-semibold">
              YEARLY TWICE INDUSTRY CONNECT · BIANNUAL EVENT
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Pharmacovigilance Industry Connect
            </h3>
            <p className="font-sans text-xs text-sky-200/80">
              Live Interactive ICSR Forensics · 20+ Yrs PV Leadership
            </p>
          </div>

          {/* Candidate Dynamic Binding Zone */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3 backdrop-blur-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 block">
                  CONFIRMED ATTENDEE
                </span>
                <span className="font-sans text-sm font-extrabold text-white truncate block tracking-wide">
                  {displayName}
                </span>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 block">
                  QUALIFICATION
                </span>
                <span className="font-mono text-xs font-bold text-amber-300 truncate block">
                  {displayDegree}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 block">
                  DATE &amp; TIME
                </span>
                <span className="font-mono text-xs font-bold text-white block">
                  {dateText} · {timeText.split("–")[0]?.trim() || timeText}
                </span>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 block">
                  SESSION ACCESS
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                  LIVE ON GOOGLE MEET
                </span>
              </div>
            </div>
          </div>

          {/* Card Footer with QR Code & Barcode */}
          <div className="pt-2 flex items-center justify-between border-t border-dashed border-white/15">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400 block">
                PASS IDENTIFIER
              </span>
              <span className="font-mono text-sm font-black tracking-widest text-sky-300 block">
                {passId}
              </span>
              <span className="text-[10px] text-stone-400 font-sans block">
                100% Free · 0 INR Investment
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Mock Barcode */}
              <div className="hidden sm:flex flex-col items-center gap-0.5 opacity-60">
                <div className="flex gap-0.5 h-7">
                  {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2].map((w, i) => (
                    <div key={i} className="bg-slate-200 rounded-2xs" style={{ width: `${w}px` }} />
                  ))}
                </div>
                <span className="font-mono text-[8px] text-stone-400">VERIFIED ENTRY</span>
              </div>

              {/* QR Code Container */}
              <div className="w-12 h-12 rounded-xl bg-white card-light p-1 flex items-center justify-center shadow-md">
                <QrCode className="w-full h-full text-[#0B1325]" />
              </div>
            </div>
          </div>

          {/* Flip Hint */}
          <div className="text-center pt-1">
            <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest hover:text-white transition-colors">
              ↻ Tap card to inspect faculty lineup &amp; agenda
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BACK SIDE: FACULTY & BLUEPRINT DOSSIER
           ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-[#070D1B] via-[#0E1B38] to-[#0B1325] text-white p-6 sm:p-7 space-y-4 shadow-2xl backface-hidden flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-black text-amber-300 uppercase tracking-wider">
                EXECUTIVE FACULTY DOSSIER
              </span>
              <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED CREDENTIALS
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif text-lg font-bold text-white">
                Mohamed Kumail Abbas · M.Pharm
              </h4>
              <p className="font-mono text-xs text-sky-200">
                20+ Years Pharmacovigilance &amp; ICSR Operations
              </p>
              <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                Led 30+ drug safety associates and medical doctors across global safety hubs. Former leadership at:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center font-mono text-[11px] font-bold">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                Accenture
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                Cognizant
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                Novaspire
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                Quintiles
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-400/10 border border-amber-400/20 p-3 space-y-1 text-center">
            <span className="font-mono text-[10px] font-bold text-amber-300 uppercase block">
              2 COMPLIMENTARY TAKEAWAYS INCLUDED
            </span>
            <p className="text-[11px] text-stone-200 font-sans">
              1. MedDRA 27.0 Quick Reference Chart <br />
              2. ICSR 4-Point Validity Checklist
            </p>
          </div>

          <div className="text-center pt-1 border-t border-white/10">
            <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest hover:text-white transition-colors">
              ↻ Tap to flip back to ticket pass
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
