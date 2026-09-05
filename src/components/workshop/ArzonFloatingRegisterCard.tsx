import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Loader2, Clock } from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

interface ArzonFloatingRegisterCardProps {
  name: string;
  phone: string;
  degree: string;
  email: string;
  eligibleDegrees: string[];
  isSubmitting: boolean;
  errorMsg: string | null;
  fieldErrors: { name?: string; phone?: string; email?: string };
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onDegreeChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onInputFocus: () => void;
  onFieldBlur: (fieldName: string) => void;
  onSubmit: (e: FormEvent) => void;
  isVariantB?: boolean;
}

export function ArzonFloatingRegisterCard({
  name,
  phone,
  degree,
  email,
  eligibleDegrees,
  isSubmitting,
  errorMsg,
  fieldErrors,
  onNameChange,
  onPhoneChange,
  onDegreeChange,
  onEmailChange,
  onInputFocus,
  onFieldBlur,
  onSubmit,
}: ArzonFloatingRegisterCardProps) {
  // Live Countdown Timer to September 6, 2026 18:00:00 IST (12:30:00 UTC)
  const targetEpoch = new Date("2026-09-06T18:00:00+05:30").getTime();
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

  return (
    <div
      id="registration-card"
      className="w-full rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-xl overflow-hidden tone-light text-left transition-all"
    >
      {/* Thin Editorial Accent Bar */}
      <div className="h-1.5 w-full bg-[var(--color-editorial-amber)]"></div>

      {/* Deep Medical Navy Event Desk Header */}
      <div className="bg-[var(--color-medical-navy)] tone-dark px-5 sm:px-6 py-5 text-[var(--color-warm-paper)] border-b border-[#0A1F3E]">
        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-clinical-teal)]"></span>
            </span>
            <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-clinical-teal)] uppercase">
              LIVE WORKING SESSION
            </span>
          </div>

          <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">
            SUN 6 SEP · 6 PM IST
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
            Reserve Your Free Seat
          </h3>
          <p className="font-sans text-xs text-white/80">
            Interactive case walkthrough on Google Meet. 100% free.
          </p>
        </div>

        {/* Real Countdown Timer Chip */}
        <div className="mt-4 flex items-center justify-between px-3 py-2 rounded-lg bg-black/25 border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-1.5 text-white/70">
            <Clock className="w-3.5 h-3.5 text-[var(--color-editorial-amber)] shrink-0" />
            <span className="text-[10px] uppercase font-medium">Session Starts In</span>
          </div>
          <span className="font-bold text-white tracking-wider">
            {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
          </span>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={onSubmit} className="p-5 sm:p-6 space-y-4">
        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="font-sans leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1">
          <label
            htmlFor="floating-form-name"
            className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
          >
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="floating-form-name"
            type="text"
            required
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onFocus={onInputFocus}
            onBlur={() => onFieldBlur("name")}
            placeholder="e.g. Dr. Ananya Sharma"
            className={`w-full px-3.5 py-2.5 rounded-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              fieldErrors.name
                ? "border-rose-400 focus:ring-rose-200"
                : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
            }`}
          />
          {fieldErrors.name && (
            <p className="text-[11px] text-rose-600 font-sans mt-0.5">{fieldErrors.name}</p>
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
            <input
              id="floating-form-phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              onFocus={onInputFocus}
              onBlur={() => onFieldBlur("phone")}
              placeholder="10-digit mobile number"
              className={`w-full px-3.5 py-2.5 rounded-r-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                fieldErrors.phone
                  ? "border-rose-400 focus:ring-rose-200"
                  : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
              }`}
            />
          </div>
          <p className="text-[10.5px] text-stone-500 font-sans">
            Google Meet link and case dossier sent directly to this number.
          </p>
          {fieldErrors.phone && (
            <p className="text-[11px] text-rose-600 font-sans mt-0.5">{fieldErrors.phone}</p>
          )}
        </div>

        {/* Subtle Divider */}
        <div className="w-full h-px bg-[var(--color-border-warm)]/60 my-2"></div>

        {/* Degree */}
        <div className="space-y-1">
          <label
            htmlFor="floating-form-degree"
            className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
          >
            Degree / Background <span className="text-rose-600">*</span>
          </label>
          <select
            id="floating-form-degree"
            value={degree}
            onChange={(e) => onDegreeChange(e.target.value)}
            onFocus={onInputFocus}
            onBlur={() => onFieldBlur("degree")}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border-warm)] bg-white tone-light text-[var(--color-arzon-ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)] focus:bg-white transition-all cursor-pointer"
          >
            {eligibleDegrees.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Email */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="floating-form-email"
              className="block text-xs font-mono font-semibold text-[var(--color-arzon-ink)] uppercase tracking-wider"
            >
              Email Address <span className="text-stone-400 font-normal lowercase">(optional)</span>
            </label>
            <span className="text-[10px] font-mono text-stone-400 uppercase">Calendar Invite</span>
          </div>
          <input
            id="floating-form-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onFocus={onInputFocus}
            onBlur={() => onFieldBlur("email")}
            placeholder="e.g. ananya@gmail.com"
            className={`w-full px-3.5 py-2.5 rounded-lg border bg-white tone-light text-[var(--color-arzon-ink)] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              fieldErrors.email
                ? "border-rose-400 focus:ring-rose-200"
                : "border-[var(--color-border-warm)] focus:ring-[var(--color-medical-navy)]/20 focus:border-[var(--color-medical-navy)]"
            }`}
          />
          {fieldErrors.email && (
            <p className="text-[11px] text-rose-600 font-sans mt-0.5">{fieldErrors.email}</p>
          )}
        </div>

        {/* WhatsApp Updates Checkbox */}
        <div className="flex items-start gap-2 pt-1">
          <input
            id="floating-form-whatsapp-consent"
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-[var(--color-border-warm)] text-[var(--color-medical-navy)] focus:ring-[var(--color-medical-navy)] mt-0.5 cursor-pointer"
          />
          <label htmlFor="floating-form-whatsapp-consent" className="text-xs text-stone-700 font-sans leading-snug cursor-pointer">
            Send session reminder, Google Meet access, and case study notes via WhatsApp
          </label>
        </div>

        {/* Primary CTA (Deep Medical Navy #102E5C Universal Rule) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#0A2246] active:scale-[0.99] text-white tone-dark font-mono text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 motion-safe:animate-spin text-[var(--color-clinical-teal)]" />
              <span className="text-white">CONFIRMING YOUR SEAT...</span>
            </>
          ) : (
            <>
              <span className="text-white" style={{ color: '#FFFFFF' }}>RESERVE MY FREE SEAT</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" style={{ color: '#FFFFFF' }} />
            </>
          )}
        </button>

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
