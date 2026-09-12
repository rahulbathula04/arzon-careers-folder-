import { useState, useEffect, type FormEvent } from "react";
import {
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Clock,
  Building2,
  GraduationCap,
  ArrowLeft,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

const POPULAR_COLLEGES = [
  "National Institute of Pharmaceutical Education and Research (NIPER)",
  "Jamia Hamdard, New Delhi",
  "BITS Pilani - Department of Pharmacy",
  "Manipal College of Pharmaceutical Sciences, Manipal",
  "Bombay College of Pharmacy, Mumbai",
  "JSS College of Pharmacy, Ooty / Mysore",
  "Osmania University College of Technology, Hyderabad",
  "Andhra University College of Pharmaceutical Sciences, Visakhapatnam",
  "Sultan-ul-Uloom College of Pharmacy, Hyderabad",
  "Delhi Institute of Pharmaceutical Sciences and Research (DIPSAR)",
  "Kakatiya University, Warangal",
  "Institute of Chemical Technology (ICT), Mumbai",
  "SRM College of Pharmacy, Chennai",
  "NMIMS Shobhaben Pratapbhai Patel School of Pharmacy, Mumbai",
  "KLE College of Pharmacy, Belagavi",
  "Gokaraju Rangaraju College of Pharmacy, Hyderabad",
  "Anurag University - School of Pharmacy, Hyderabad",
  "Vikas College of Pharmaceutical Sciences",
  "Geethanjali College of Pharmacy, Hyderabad",
  "Sri Venkateswara College of Pharmacy, Chittoor",
  "Al-Ameen College of Pharmacy, Bangalore",
  "Madras Medical College - College of Pharmacy, Chennai",
];

const QUICK_BRANCH_PILLS = [
  { name: "Pharmacology", tag: "⚡ Core PV" },
  { name: "Pharmaceutics", tag: "Industry" },
  { name: "Pharmacy Practice", tag: "⚡ Clinical" },
  { name: "Regulatory Affairs", tag: "Safety" },
  { name: "Biotechnology", tag: "Research" },
  { name: "Life Sciences", tag: "General" },
];

const COMMON_BRANCHES = [
  "Pharmacology",
  "Pharmaceutics / Industrial Pharmacy",
  "Pharmacy Practice / Clinical Pharmacy",
  "Pharmaceutical Chemistry & Analysis",
  "Pharmacovigilance & Regulatory Affairs",
  "Biotechnology / Bioinformatics",
  "Microbiology / Biochemistry",
  "Life Sciences (General)",
  "Medicine (MBBS) / Dental (BDS)",
  "Hospital & Clinical Administration",
  "Other Healthcare Stream",
];

const GRADUATION_YEARS = [
  { value: "2026", label: "2026 (Final Year / Passing Out)" },
  { value: "2025", label: "2025 (Recent Graduate)" },
  { value: "2024", label: "2024 (Graduate)" },
  { value: "2023", label: "2023 or Earlier" },
  { value: "2027", label: "2027 (Pre-Final Year)" },
];

interface ArzonFloatingRegisterCardProps {
  name: string;
  phone: string;
  college: string;
  branch: string;
  degree: string;
  email: string;
  graduationYear: string;
  eligibleDegrees: string[];
  isSubmitting: boolean;
  errorMsg: string | null;
  fieldErrors: { name?: string; phone?: string; email?: string; college?: string; branch?: string };
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onCollegeChange: (val: string) => void;
  onBranchChange: (val: string) => void;
  onDegreeChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onGraduationYearChange: (val: string) => void;
  onInputFocus: () => void;
  onFieldBlur: (fieldName: string) => void;
  onSubmit: (e: FormEvent) => void;
  isVariantB?: boolean;
  allocatedSeats?: number;
  totalCapacity?: number;
  percentReserved?: number;
}

export function ArzonFloatingRegisterCard({
  name,
  phone,
  college,
  branch,
  degree,
  email,
  graduationYear,
  eligibleDegrees,
  isSubmitting,
  errorMsg,
  fieldErrors,
  onNameChange,
  onPhoneChange,
  onCollegeChange,
  onBranchChange,
  onDegreeChange,
  onEmailChange,
  onGraduationYearChange,
  onInputFocus,
  onFieldBlur,
  onSubmit,
  isVariantB,
  allocatedSeats = 432,
  totalCapacity = 500,
  percentReserved = 86,
}: ArzonFloatingRegisterCardProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Attempted, setStep1Attempted] = useState(false);

  // Live Countdown Timer to September 11, 2026 18:00:00 IST (12:30:00 UTC)
  const targetEpoch = new Date("2026-09-11T18:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, targetEpoch - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined" && isReducedMotion()) return;

    const timer = setInterval(() => {
      const diff = Math.max(0, targetEpoch - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetEpoch]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const isStep1Valid =
    name.trim().length >= 2 && phone.trim().replace(/\D/g, "").slice(-10).length === 10;

  const handleStep1Continue = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setStep1Attempted(true);

    const cleanName = name.trim();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    if (cleanName.length < 2) {
      document.getElementById("floating-form-name")?.focus();
      return;
    }
    if (cleanPhone.slice(-10).length !== 10) {
      document.getElementById("floating-form-phone")?.focus();
      return;
    }

    setStep(2);
    const card = document.getElementById("registration-card");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      handleStep1Continue(e);
      return;
    }
    onSubmit(e);
  };

  const passPreviewSerial = phone.replace(/\D/g, "").slice(-4) || "8492";

  return (
    <div
      id="registration-card"
      className="w-full rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-xl overflow-hidden tone-light text-left transition-all"
    >
      {/* Thin Editorial Amber Top Accent */}
      <div className="h-1.5 w-full bg-[var(--color-editorial-amber)]"></div>

      {/* Deep Medical Navy Header */}
      <div className="bg-[var(--color-medical-navy)] tone-dark px-5 sm:px-6 py-5 text-[var(--color-warm-paper)] border-b border-[#0A1F3E]">
        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-sans text-[11px] font-bold tracking-wider text-teal-400 uppercase">
              B.PHARM CAREER INTELLIGENCE 2026
            </span>
          </div>

          <span className="font-sans text-[11px] text-slate-300 font-semibold uppercase tracking-wider">
            SAT 19 SEP · 6 PM IST
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Reserve Your Free Seat
          </h3>
          <p className="font-sans text-xs text-slate-300">
            Live 75-minute market decoding masterclass on Google Meet. 100% free.
          </p>
        </div>

        {/* 10x Seat Capacity Gauge */}
        <div className="mt-3.5 space-y-1.5 p-2.5 rounded-lg bg-black/30 border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-white/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse"></span>
              <span>
                {allocatedSeats >= totalCapacity
                  ? `${allocatedSeats} Seats Reserved · Overcapacity Open`
                  : `${allocatedSeats} / ${totalCapacity} Seats Allocated`}
              </span>
            </span>
            <span className="text-[var(--color-clinical-teal)] font-bold">{percentReserved}% Reserved</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-clinical-teal)] to-emerald-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentReserved}%` }}
            />
          </div>
        </div>

        {/* Countdown Timer Strip */}
        <div suppressHydrationWarning className="mt-2.5 flex items-center justify-between px-3 py-1.5 rounded-md bg-white/5 font-mono text-xs text-white/80">
          <div className="flex items-center gap-1.5 text-white/70">
            <Clock className="w-3.5 h-3.5 text-[var(--color-editorial-amber)] shrink-0" />
            <span className="text-[10px] uppercase">Session Starts In</span>
          </div>
          <span suppressHydrationWarning className="font-bold text-white tracking-wider text-[11px]">
            {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
          </span>
        </div>

        {/* 2-Step Progress Indicator Ledger */}
        <div className="mt-3.5 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-left">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 p-1.5 rounded text-left transition-colors cursor-pointer ${
              step === 1
                ? "bg-white/10 text-white"
                : isStep1Valid
                ? "text-[var(--color-clinical-teal)] hover:bg-white/5"
                : "text-white/40"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                step === 1
                  ? "bg-white text-[var(--color-medical-navy)]"
                  : isStep1Valid
                  ? "bg-[var(--color-clinical-teal)] text-[#0B1325]"
                  : "bg-white/20 text-white/70"
              }`}
            >
              {isStep1Valid && step === 2 ? "✓" : "1"}
            </span>
            <div className="truncate">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-white/60">
                STEP 01
              </span>
              <span className="block font-sans text-xs font-semibold text-white truncate">
                Candidate Contact
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isStep1Valid) setStep(2);
            }}
            disabled={!isStep1Valid}
            className={`flex items-center gap-1.5 p-1.5 rounded text-left transition-colors ${
              step === 2
                ? "bg-white/10 text-white"
                : isStep1Valid
                ? "text-white/70 hover:bg-white/5 cursor-pointer"
                : "text-white/30 cursor-not-allowed"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                step === 2
                  ? "bg-white text-[var(--color-medical-navy)]"
                  : "bg-white/20 text-white/60"
              }`}
            >
              2
            </span>
            <div className="truncate">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-white/60">
                STEP 02
              </span>
              <span className="block font-sans text-xs font-semibold text-white truncate">
                College &amp; Stream
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 space-y-4">
        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="font-sans leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* ── STEP 1: IDENTITY & WHATSAPP ACCESS ── */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Full Name */}
            <div className="space-y-1">
              <label
                htmlFor="floating-form-name"
                className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
              >
                Full Name <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="floating-form-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  onFocus={onInputFocus}
                  onBlur={() => onFieldBlur("name")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleStep1Continue();
                    }
                  }}
                  placeholder="e.g. Dr. Ananya Sharma"
                  className={`w-full pl-3.5 pr-9 py-2.5 rounded-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    fieldErrors.name || (step1Attempted && name.trim().length < 2)
                      ? "border-rose-400 focus:ring-rose-200"
                      : name.trim().length >= 2
                      ? "border-emerald-500/60 focus:ring-emerald-100 focus:border-emerald-600"
                      : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
                  }`}
                />
                {name.trim().length >= 2 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>
              {(fieldErrors.name || (step1Attempted && name.trim().length < 2)) && (
                <p className="text-[11px] text-rose-600 font-sans mt-0.5">
                  {fieldErrors.name || "Please enter your full name (minimum 2 characters)."}
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1">
              <label
                htmlFor="floating-form-phone"
                className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
              >
                WhatsApp Number <span className="text-rose-600">*</span>
              </label>
              <div className="relative flex rounded-lg">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[var(--color-border-warm)] bg-[var(--color-warm-paper)] text-[var(--color-arzon-ink)] font-mono text-xs font-semibold select-none">
                  +91
                </span>
                <div className="relative flex-1">
                  <input
                    id="floating-form-phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    required
                    value={phone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                    onFocus={onInputFocus}
                    onBlur={() => onFieldBlur("phone")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleStep1Continue();
                      }
                    }}
                    placeholder="10-digit mobile number"
                    className={`w-full pl-3.5 pr-9 py-2.5 rounded-r-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      fieldErrors.phone ||
                      (step1Attempted && phone.trim().replace(/\D/g, "").slice(-10).length !== 10)
                        ? "border-rose-400 focus:ring-rose-200"
                        : phone.trim().replace(/\D/g, "").slice(-10).length === 10
                        ? "border-emerald-500/60 focus:ring-emerald-100 focus:border-emerald-600"
                        : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
                    }`}
                  />
                  {phone.trim().replace(/\D/g, "").slice(-10).length === 10 && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  )}
                </div>
              </div>
              <p className="text-[10.5px] text-stone-500 font-sans">
                Google Meet direct access link and case study dossier sent directly to this number.
              </p>
              {(fieldErrors.phone ||
                (step1Attempted && phone.trim().replace(/\D/g, "").slice(-10).length !== 10)) && (
                <p className="text-[11px] text-rose-600 font-sans mt-0.5">
                  {fieldErrors.phone || "Enter a valid 10-digit mobile number."}
                </p>
              )}
            </div>

            {/* Step 1 Continue CTA */}
            <button
              type="button"
              onClick={() => handleStep1Continue()}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-[0.99] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer group mt-2"
            >
              <span className="text-white">RESERVE MY FREE SEAT</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* ── STEP 2: ACADEMIC CREDENTIALS & LIVE PASS PREVIEW ── */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* 10x Innovation: Real-Time Dynamic Admission Pass Preview (Apple Wallet Style) */}
            <div className="rounded-xl border border-stone-800/20 bg-gradient-to-br from-white via-stone-50 to-blue-50/30 p-4 text-left font-mono relative overflow-hidden shadow-xs tone-light">
              <div className="flex items-center justify-between text-[10px] text-stone-500 border-b border-dashed border-stone-300 pb-2 mb-2.5">
                <span className="font-bold text-[#102E5C] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"></span>
                  <span>ARZON EXECUTIVE ADMISSION</span>
                </span>
                <span className="text-[#102E5C] font-mono text-[11px] font-bold bg-white tone-light px-2 py-0.5 rounded border border-stone-300 shadow-2xs">
                  PASS #{passPreviewSerial}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-serif font-bold text-stone-950 truncate">
                  {name.trim() || "Candidate Name"}
                </div>
                <div className="text-[11px] font-sans text-stone-700 flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-[#102E5C] bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-200/60">{degree}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-800 font-medium">{branch || "Specialization"}</span>
                </div>
                <div className="text-[11px] font-sans text-stone-500 truncate flex items-center gap-1 pt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{college || "Your College / University"}</span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>SEAT READY TO ISSUE</span>
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#102E5C] hover:underline font-bold cursor-pointer"
                >
                  Edit Name / Phone
                </button>
              </div>
            </div>

            {/* College / University Name */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="floating-form-college"
                  className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
                >
                  College / University Name <span className="text-rose-600">*</span>
                </label>
                <span className="text-[10px] font-mono text-stone-400 uppercase">Institution</span>
              </div>
              <div className="relative">
                <input
                  id="floating-form-college"
                  type="text"
                  required
                  list="arzon-college-datalist"
                  value={college}
                  onChange={(e) => onCollegeChange(e.target.value)}
                  onFocus={onInputFocus}
                  onBlur={() => onFieldBlur("college")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleFormSubmit(e);
                    }
                  }}
                  placeholder="e.g. Sultan-ul-Uloom College of Pharmacy, Hyderabad"
                  className={`w-full pl-3.5 pr-9 py-2.5 rounded-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    fieldErrors.college
                      ? "border-rose-400 focus:ring-rose-200"
                      : college.trim().length >= 2
                      ? "border-emerald-500/60 focus:ring-emerald-100 focus:border-emerald-600"
                      : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
                  }`}
                />
                {college.trim().length >= 2 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
                <datalist id="arzon-college-datalist">
                  {POPULAR_COLLEGES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <p className="text-[10.5px] text-stone-500 font-sans">
                Printed on your verified Workshop Participation Pass &amp; Field Guide Dossier.
              </p>
              {fieldErrors.college && (
                <p className="text-[11px] text-rose-600 font-sans mt-0.5">{fieldErrors.college}</p>
              )}
            </div>

            {/* Degree & Branch Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Degree */}
              <div className="space-y-1">
                <label
                  htmlFor="floating-form-degree"
                  className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
                >
                  Degree <span className="text-rose-600">*</span>
                </label>
                <select
                  id="floating-form-degree"
                  value={degree}
                  onChange={(e) => onDegreeChange(e.target.value)}
                  onFocus={onInputFocus}
                  onBlur={() => onFieldBlur("degree")}
                  className="w-full px-3 py-2.5 rounded-lg border border-[var(--color-border-warm)] bg-white tone-light text-[var(--color-arzon-ink)] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)] cursor-pointer"
                >
                  {eligibleDegrees.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch / Stream */}
              <div className="space-y-1">
                <label
                  htmlFor="floating-form-branch"
                  className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
                >
                  Branch / Stream <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="floating-form-branch"
                    type="text"
                    required
                    list="arzon-branch-datalist"
                    value={branch}
                    onChange={(e) => onBranchChange(e.target.value)}
                    onFocus={onInputFocus}
                    onBlur={() => onFieldBlur("branch")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFormSubmit(e);
                      }
                    }}
                    placeholder="e.g. Pharmacology"
                    className={`w-full pl-3 pr-8 py-2.5 rounded-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      fieldErrors.branch
                        ? "border-rose-400 focus:ring-rose-200"
                        : branch.trim().length >= 2
                        ? "border-emerald-500/60 focus:ring-emerald-100 focus:border-emerald-600"
                        : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
                    }`}
                  />
                  {branch.trim().length >= 2 && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  )}
                  <datalist id="arzon-branch-datalist">
                    {COMMON_BRANCHES.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>
                {fieldErrors.branch && (
                  <p className="text-[11px] text-rose-600 font-sans mt-0.5">{fieldErrors.branch}</p>
                )}
              </div>
            </div>

            {/* Quick Branch Preset Badges */}
            <div className="space-y-1 pt-0.5">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                Quick Stream Select:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_BRANCH_PILLS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => onBranchChange(p.name)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-sans font-medium transition-colors cursor-pointer ${
                      branch === p.name
                        ? "bg-[#1B3F8B] text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    <span>{p.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1 rounded ${
                        branch === p.name ? "bg-white/20 text-white" : "bg-white tone-light text-stone-500"
                      }`}
                    >
                      {p.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Graduation Year & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Graduation Year */}
              <div className="space-y-1">
                <label
                  htmlFor="floating-form-gradyear"
                  className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
                >
                  Graduation Year
                </label>
                <select
                  id="floating-form-gradyear"
                  value={graduationYear}
                  onChange={(e) => onGraduationYearChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[var(--color-border-warm)] bg-white tone-light text-[var(--color-arzon-ink)] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)] cursor-pointer"
                >
                  {GRADUATION_YEARS.map((y) => (
                    <option key={y.value} value={y.value}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mandatory Email */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="floating-form-email"
                    className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
                  >
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Verification</span>
                </div>
                <div className="relative">
                  <input
                    id="floating-form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    onFocus={onInputFocus}
                    onBlur={() => onFieldBlur("email")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleFormSubmit(e);
                      }
                    }}
                    placeholder="e.g. ananya@gmail.com"
                    className={`w-full pl-3 pr-8 py-2.5 rounded-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      fieldErrors.email
                        ? "border-rose-400 focus:ring-rose-200"
                        : email.trim().length >= 5 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                        ? "border-emerald-500/60 focus:ring-emerald-100 focus:border-emerald-600"
                        : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
                    }`}
                  />
                  {email.trim().length >= 5 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  )}
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-600 font-sans mt-0.5">{fieldErrors.email}</p>
                )}
              </div>
            </div>

            {/* Biggest Career Challenge Dropdown */}
            <div className="space-y-1 pt-1">
              <label
                htmlFor="floating-form-challenge"
                className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
              >
                What is your biggest career challenge? <span className="text-rose-600">*</span>
              </label>
              <select
                id="floating-form-challenge"
                className="w-full px-3 py-2.5 rounded-lg border border-[var(--color-border-warm)] bg-white tone-light text-[var(--color-arzon-ink)] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)] cursor-pointer"
              >
                <option value="choose-career">I don't know which career to choose</option>
                <option value="target-jobs">I don't know which jobs I can target</option>
                <option value="learn-skills">I don't know what skills to learn</option>
                <option value="shortlist-help">I'm applying but not getting shortlisted</option>
                <option value="corporate-careers">I want to understand healthcare corporate careers</option>
                <option value="prep-plan">I already have a career path but need a preparation plan</option>
              </select>
            </div>

            {/* WhatsApp Updates Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="floating-form-whatsapp-consent"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-[var(--color-border-warm)] text-[var(--color-medical-navy)] focus:ring-[var(--color-medical-navy)] mt-0.5 cursor-pointer"
              />
              <label
                htmlFor="floating-form-whatsapp-consent"
                className="text-xs text-stone-700 font-sans leading-snug cursor-pointer"
              >
                Send session reminder, Google Meet access link, and B.Pharm Career Map via WhatsApp
              </label>
            </div>

            {/* Primary Action Button (Deep Medical Navy) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#0A2246] active:scale-[0.99] text-white tone-dark font-mono text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 motion-safe:animate-spin text-[var(--color-clinical-teal)]" />
                  <span className="text-white">ISSUING PARTICIPATION PASS...</span>
                </>
              ) : (
                <>
                  <span className="text-white" style={{ color: "#FFFFFF" }}>
                    RESERVE MY FREE SEAT &amp; ISSUE PASS
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform"
                    style={{ color: "#FFFFFF" }}
                  />
                </>
              )}
            </button>

            {/* Back Button */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-mono text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Change Name or Phone</span>
              </button>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="pt-2 border-t border-[var(--color-border-warm)]/60 flex items-center justify-between text-[11px] text-stone-500 font-sans">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-clinical-teal)] shrink-0" />
            <span>Zero cost · 100% Free educational workshop</span>
          </div>
          <span className="font-mono text-[10px] text-stone-400">ARZON GLOBAL</span>
        </div>
      </form>
    </div>
  );
}
