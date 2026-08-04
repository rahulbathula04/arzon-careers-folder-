import { useState, useRef, useEffect } from "react";
import {
  Calendar, Clock, Video, CheckCircle2, ArrowRight, XCircle,
  Sparkles, X, Send, ChevronDown, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitWorkshopLead } from "@/lib/workshop.functions";

// ── Custom Degree Dropdown (replaces native <select> - avoids white popup) ──
const DEGREES = [
  "B.Pharm / Pharm.D",
  "M.Pharm (PV / Regulatory / Pharmacology)",
  "B.Sc / M.Sc Life Sciences / Biotech",
  "MBBS / BDS / BAMS / BHMS",
  "B.Tech Biotech / Bioinformatics",
  "MBA Healthcare / Hospital Admin",
  "Other Healthcare Qualification",
];

interface DegreeDropdownProps {
  value: string;
  onChange: (v: string) => void;
}

function DegreeDropdown({ value, onChange }: DegreeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus option when focusedIdx changes
  useEffect(() => {
    if (open && focusedIdx >= 0) {
      optionRefs.current[focusedIdx]?.focus();
    }
  }, [open, focusedIdx]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setFocusedIdx(0);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIdx(Math.min(idx + 1, DEGREES.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx === 0) { setOpen(false); triggerRef.current?.focus(); }
      else setFocusedIdx(idx - 1);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(DEGREES[idx]);
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div ref={ref} className="relative w-full" role="combobox" aria-expanded={open} aria-haspopup="listbox">
      <button
        ref={triggerRef}
        type="button"
        id="degree-trigger"
        aria-label="Select your degree"
        aria-controls="degree-listbox"
        onClick={() => { setOpen((o) => !o); setFocusedIdx(0); }}
        onKeyDown={handleTriggerKeyDown}
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-700 bg-[#080d1a] px-4 py-3 text-sm text-white font-sans font-semibold hover:border-blue-500/60 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
      >
        <span className={value ? "text-white" : "text-slate-400"}>{value || "Select your degree"}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-blue-400" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="degree-listbox"
            role="listbox"
            aria-label="Degree options"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1.5 left-0 right-0 z-50 rounded-xl border border-slate-700 bg-[#0f172a] py-1.5 shadow-2xl shadow-black/60 overflow-hidden"
          >
            {DEGREES.map((deg, idx) => (
              <button
                key={deg}
                ref={(el) => { optionRefs.current[idx] = el; }}
                type="button"
                role="option"
                aria-selected={value === deg}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                onClick={() => {
                  onChange(deg);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-sans font-medium transition-colors cursor-pointer focus:outline-none focus:bg-blue-600/20 ${
                  value === deg
                    ? "bg-blue-600/30 text-blue-200"
                    : "text-slate-200 hover:bg-[#080d1a] hover:text-white"
                }`}
              >
                {deg}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Before / After items ──────────────────────────────────────────────────────
const BEFORE_ITEMS = [
  "Uncertain which domain fits your specific qualification",
  "Binge-watching conflicting YouTube advice & forum threads",
  "Applying blindly without software skills (Argus, MedDRA, eCTD)",
  "Unsure about starting pay bands across different MNCs",
];
const AFTER_ITEMS = [
  "Exact data-backed match score for your specific degree",
  "Clear 12-week roadmap tailored for top MNC technical rounds",
  "Clarity on mandatory corporate software tools & expectations",
  "Direct insight into real recruiter hiring criteria and salaries",
];

// ── Main Component ────────────────────────────────────────────────────────────
interface WorkshopRegistrationCardProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
}

export function WorkshopRegistrationCard({
  isOpenModal,
  onCloseModal,
  onOpenModal,
}: WorkshopRegistrationCardProps) {
  const [degree, setDegree] = useState(DEGREES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await submitWorkshopLead({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          degree,
          source: "workshop-page",
          utmSource: typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("utm_source") ?? undefined
            : undefined,
        },
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Escape key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpenModal) onCloseModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpenModal, onCloseModal]);

  // Autofocus name input when modal opens
  useEffect(() => {
    if (isOpenModal && !submitted) {
      const timer = setTimeout(() => nameInputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpenModal, submitted]);

  // Reset state when modal closes
  const handleClose = () => {
    onCloseModal();
    // keep submitted state across re-open so user sees confirmation
  };

  return (
    <section className="tone-dark bg-[#020617] py-24 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Healthcare Career Intelligence Workshop
          </h2>
          <p className="mt-3 text-base text-slate-300 font-sans leading-relaxed">
            A 90-minute live executive session designed to replace months of guesswork with complete career certainty.
          </p>
        </div>

        {/* Before vs After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Before */}
          <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/60 p-6 sm:p-8 flex flex-col backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-mono font-bold text-slate-300 text-xs uppercase tracking-wider">BEFORE WORKSHOP</span>
              <span className="text-rose-400 text-xs font-mono font-bold">❌ Career Guesswork</span>
            </div>
            <div className="mt-6 space-y-4 flex-1">
              {BEFORE_ITEMS.map((item) => (
                <div key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-sans">
                  <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl border border-blue-500/30 bg-[#0f172a]/80 p-6 sm:p-8 flex flex-col backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
              <span className="font-mono font-bold text-blue-300 text-xs uppercase tracking-wider">AFTER WORKSHOP</span>
              <span className="text-emerald-400 text-xs font-mono font-bold">✓ Career Certainty</span>
            </div>
            <div className="mt-6 space-y-4 flex-1">
              {AFTER_ITEMS.map((item) => (
                <div key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-sans">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Workshop Card */}
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 text-center shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-mono mb-6 pb-6 border-b border-slate-800">
            <span className="flex items-center gap-2 font-semibold">
              <Calendar className="h-4 w-4 text-blue-400" />
              Upcoming Weekend Session
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-emerald-400" />
              90 Minutes Live
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <Video className="h-4 w-4 text-sky-400" />
              Live Interactive Zoom
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-sans">
            Reserve Your Personalized Intelligence Session
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 font-sans">
            Get your degree-specific match score, salary trajectory, and corporate software roadmap in 90 minutes.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Reserve Intelligence Session</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 shadow-2xl text-white"
            >
              {/* Close */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#080d1a] border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 mb-1.5">
                    <Sparkles className="h-4 w-4" />
                    <span>30-SECOND RESERVATION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                    Find Your Best-Fit Career Path
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                    Enter your degree details to unlock your personal intelligence analysis.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Degree - Custom dropdown */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        YOUR DEGREE QUALIFICATION
                      </label>
                      <DegreeDropdown value={degree} onChange={setDegree} />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        FULL NAME <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        style={{ backgroundColor: "#080d1a", color: "#ffffff" }}
                        className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* WhatsApp / Phone */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        WHATSAPP / MOBILE NUMBER <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        style={{ backgroundColor: "#080d1a", color: "#ffffff" }}
                        className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        EMAIL ADDRESS <span className="text-slate-500 font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        style={{ backgroundColor: "#080d1a", color: "#ffffff" }}
                        className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-xs text-rose-400 font-sans bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all cursor-pointer mt-2 shadow-lg shadow-blue-600/30"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 motion-safe:animate-spin" />
                          <span>Confirming your seat...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Confirm My Workshop Seat</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-500 text-center font-sans">
                      Zero spam. We'll only reach out about your session.
                    </p>
                  </form>
                </div>
              ) : (
                /* Success State */
                <div className="py-6 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-sans">
                    Seat Confirmed, {name.split(" ")[0]}! 🎉
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-sm mx-auto font-sans">
                    Your seat for the Healthcare Career Intelligence Workshop is locked. Our team will share your Zoom link and pre-workshop career match report via WhatsApp at <strong className="text-white font-mono">{phone}</strong>.
                  </p>
                  <div className="mt-5 rounded-xl bg-[#080d1a] border border-slate-800 p-4 text-left max-w-xs mx-auto space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Degree-specific Match Score</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Live 90-Minute Intelligence Session</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>No Sales Calls, Pure Intelligence</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#080d1a] px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors"
                  >
                    <span>Done</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
