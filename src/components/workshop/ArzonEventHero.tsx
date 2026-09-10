import mentorKumailImg from "@/assets/mentor-kumail.jpg";
import { Calendar, Clock, Video, ShieldCheck, ArrowRight, Pill, AlertCircle, CheckCircle2, Users } from "lucide-react";
import { WorkshopCountdown } from "@/components/workshop/WorkshopCountdown";

// Workshop event date ISO (Asia/Kolkata = UTC+5:30)
const WORKSHOP_ISO = "2026-09-11T18:00:00+05:30";

interface ArzonEventHeroProps {
  onReserveClick: () => void;
  isVariantB?: boolean;
}

// ── Inline Oracle Argus Case Mockup ──────────────────────────────────────────
// Renders a wireframe approximation of the ICSR case that will be triaged live.
// This is the single biggest trust-signal: it shows the work is real, not slides.
function ArgusLiveCasePreview() {
  const fields = [
    { label: "Case #", value: "071223-METF-IND", mono: true },
    { label: "Drug", value: "Metformin ER 500 mg", mono: false },
    { label: "Event", value: "Acute Metabolic Acidosis", mono: false, highlight: true },
    { label: "Reporter", value: "Healthcare Professional", mono: false },
    { label: "Country", value: "India", mono: false },
    { label: "Day 0 Date", value: "23 DEC 2023", mono: true },
  ];

  const validity = [
    { label: "Identifiable patient", check: true },
    { label: "Suspect medicinal product", check: true },
    { label: "Identifiable reporter", check: true },
    { label: "Adverse event / outcome", check: true },
  ];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white shadow-lg overflow-hidden tone-light select-none">
      {/* Argus window title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1B3F8B] border-b border-[#0f2a5e]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-80" />
        </div>
        <span className="font-mono text-[10px] font-bold text-white/70 uppercase tracking-widest ml-1">
          ORACLE ARGUS · Adverse Event Intake
        </span>
        <span className="ml-auto font-mono text-[9px] text-white/40 uppercase tracking-wider hidden sm:block">
          ICSR #071223
        </span>
      </div>

      {/* Side-nav simulation + main content */}
      <div className="flex text-left">
        {/* Slim sidebar */}
        <div className="hidden sm:flex flex-col gap-1 p-2 bg-stone-50 border-r border-stone-100 w-28 shrink-0">
          {["Intake", "Validity", "Product", "Narrative", "Regulatory"].map((item, i) => (
            <div
              key={item}
              className={`px-2 py-1.5 rounded text-[9.5px] font-mono font-semibold cursor-default ${
                i === 1
                  ? "bg-[#1B3F8B] text-white"
                  : "text-stone-500 hover:bg-stone-100"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Case fields */}
        <div className="flex-1 p-4 space-y-3">
          {/* Case ID header row */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400">
              ICSR Details
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 font-mono text-[9px] font-bold text-amber-700 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 motion-safe:animate-pulse" />
              IN TRIAGE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {fields.map(({ label, value, mono, highlight }) => (
              <div key={label} className="space-y-0.5">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-stone-400 block">
                  {label}
                </span>
                <span
                  className={`block text-[11px] font-semibold leading-tight ${
                    mono ? "font-mono" : "font-sans"
                  } ${highlight ? "text-red-600 font-bold" : "text-stone-800"}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ICH E2D Validity checklist */}
          <div className="pt-2 border-t border-stone-100 space-y-1.5">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#1B3F8B] block">
              ICH E2D Validity — 4 Criteria
            </span>
            <div className="grid grid-cols-2 gap-1">
              {validity.map(({ label, check }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="font-mono text-[9px] text-stone-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-stone-50 border-t border-stone-100">
        <span className="font-mono text-[9px] text-stone-400 uppercase tracking-wider">
          MedDRA v27.0 · SOC/PT pending
        </span>
        <span className="font-mono text-[9px] font-bold text-[#1B3F8B] uppercase tracking-wider">
          Live demo in session →
        </span>
      </div>
    </div>
  );
}

export function ArzonEventHero({ onReserveClick, isVariantB = false }: ArzonEventHeroProps) {
  return (
    <div className="relative text-left space-y-7">

      {/* ── Coordinate Strip ── */}
      <div className="flex items-center justify-between font-mono text-[9px] text-stone-400 tracking-widest uppercase border-b border-stone-200 pb-2.5">
        <span>ARZON / HC-2026 · SESSION 01</span>
        <span className="hidden sm:inline">INDIA · PHARMACOVIGILANCE OPERATIONS</span>
      </div>

      {/* ── Live Session Pill + Urgency ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-clinical-teal)]" />
          </span>
          <span className="font-mono text-[10px] font-bold tracking-widest text-stone-700 uppercase">
            Live Working Session
          </span>
          <span className="w-px h-2.5 bg-stone-300" />
          <span className="font-mono text-[9.5px] text-stone-500 uppercase tracking-wider">
            Fri 11 Sep · 6 PM IST
          </span>
        </div>
        <span className="hidden sm:flex items-center gap-2">
          <span className="w-8 h-px bg-[var(--color-editorial-amber)]" />
          <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-[var(--color-editorial-amber)]">
            Free · 75 Min · Certificate
          </span>
        </span>
      </div>

      {/* ── DOMINANT HEADLINE ── */}
      <div className="space-y-1.5">
        {isVariantB ? (
          <h1 className="font-serif tracking-tight">
            <span className="block text-lg sm:text-xl lg:text-2xl text-stone-500 font-normal leading-snug">
              What does a Pharmacovigilance Associate
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-[var(--color-arzon-ink)] leading-[0.95] tracking-tight uppercase">
              ACTUALLY DO?
            </span>
          </h1>
        ) : (
          <h1 className="font-serif tracking-tight">
            <span className="block text-lg sm:text-xl text-stone-500 font-normal leading-snug mb-1">
              See a Real Pharmacovigilance Case Processed.
            </span>
            <span className="block text-3xl sm:text-[2.85rem] lg:text-[3.5rem] font-black leading-[0.96] tracking-tight text-[var(--color-arzon-ink)]">
              Understand What Employers
            </span>
            <span
              className="block text-3xl sm:text-[2.85rem] lg:text-[3.5rem] font-black leading-[0.96] tracking-tight"
              style={{ color: "#D99A20" }}
            >
              Actually Test.
            </span>
          </h1>
        )}
        <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg pt-1">
          A 75-minute, practitioner-led session. No prior experience required.
        </p>
      </div>

      {/* ── Eligibility trust tags ── */}
      <div className="flex flex-wrap gap-2">
        {["B.Pharm", "M.Pharm", "Pharm.D", "Life Sciences", "No PV Exp. Needed"].map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 font-mono text-[9.5px] font-semibold text-stone-600 uppercase tracking-wider"
          >
            <ShieldCheck className="w-2.5 h-2.5 text-[var(--color-clinical-teal)]" />
            {tag}
          </span>
        ))}
      </div>

      {/* ── Interactive Case Preview ── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-arzon-ink)]">
            INTERACTIVE CASE GEN
          </span>
          <span className="w-6 h-px bg-stone-300" />
          <span className="font-mono text-[9.5px] text-stone-500">Can you process this case?</span>
        </div>
        <p className="font-sans text-[11px] text-stone-500 italic">
          The same type employers test. A real adverse event in real time.
        </p>
        <ArgusLiveCasePreview />
        <button
          type="button"
          onClick={onReserveClick}
          className="mt-1 font-mono text-[11px] font-bold text-[var(--color-medical-navy)] underline underline-offset-2 hover:no-underline flex items-center gap-1 cursor-pointer"
        >
          Try the first step → <span className="italic text-stone-400">Experience a live walkthrough at the session</span>
        </button>
      </div>

      {/* ── Mentor Card ── */}
      <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden max-w-lg tone-light">
        <div className="flex items-center justify-between px-4 pt-3 pb-2.5 border-b border-stone-100 text-[9.5px] font-mono font-bold uppercase tracking-widest text-stone-400">
          <span className="flex items-center gap-1.5 text-[var(--color-clinical-teal)]">
            <span className="w-1 h-1 rounded-full bg-[var(--color-clinical-teal)]" />
            Practitioner-Led
          </span>
          <span>Ex-Cognizant · Accenture · Quintiles</span>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
              <img
                src={mentorKumailImg}
                alt="Mohamed Kumail Abbas — Manager, Pharmacovigilance & Drug Safety Mentor"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0A66C2] rounded flex items-center justify-center text-white font-bold text-[9px] shadow-sm"
              title="Verified LinkedIn Profile"
            >
              in
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--color-arzon-ink)] leading-tight">
                Mohamed Kumail Abbas
              </h3>
              <span className="font-mono text-[10px] font-semibold text-[var(--color-clinical-teal)] uppercase tracking-wide">
                M.Pharm
              </span>
            </div>
            <p className="font-sans text-xs font-medium text-[var(--color-medical-navy)] mt-0.5">
              Manager, Pharmacovigilance · Novaspire
            </p>
            <p className="font-sans text-[11px] text-stone-500 leading-relaxed mt-1">
              10+ Years Experience · 3000+ ICSRs Processed
            </p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="font-mono text-[9px] text-stone-400 ml-1">Trained Safety Associates</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Event Meta Row ── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs text-stone-600 font-sans">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-semibold text-[var(--color-arzon-ink)]">Fri 11 Sep 2026</span>
        </div>
        <span className="text-stone-200 hidden sm:block">|</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span><strong className="text-[var(--color-arzon-ink)]">6:00 – 7:15 PM IST</strong> · 75 min</span>
        </div>
        <span className="text-stone-200 hidden sm:block">|</span>
        <div className="flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5 text-[var(--color-clinical-teal)]" />
          <span className="font-semibold text-[var(--color-clinical-teal)]">Google Meet</span>
        </div>
        <span className="text-stone-200 hidden sm:block">|</span>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-semibold text-stone-600">Join 500+ students</span>
        </div>
      </div>

      {/* ── Countdown Timer ── */}
      <WorkshopCountdown targetIso={WORKSHOP_ISO} />

      {/* ── Mobile-only CTA ── */}
      <div className="lg:hidden pt-1">
        <button
          type="button"
          id="hero-mobile-reserve-btn"
          onClick={onReserveClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-arzon-ink)] hover:bg-[var(--color-medical-navy)] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
          style={{ color: "#FFFFFF" }}
        >
          Reserve My Free Seat
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="mt-2 font-mono text-[10px] text-stone-400 uppercase tracking-wide">
          100% Free · No payment · Certificate included
        </p>
      </div>
    </div>
  );
}
