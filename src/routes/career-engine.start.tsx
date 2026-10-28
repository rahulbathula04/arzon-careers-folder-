import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, GraduationCap, Mail, Phone, User, Sparkles, Monitor, X, Copy } from "lucide-react";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { CareerShell } from "@/components/career/CareerShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  startSession,
  createLeadEarly,
  attachReferralToLead,
  saveProfile,
  getProfile,
  getSessionId,
  startFreshAttempt,
  getAttemptId,
  hasResumableAttempt,
} from "@/lib/careerEngineApi";
import { toast } from "sonner";
import { track } from "@/lib/track";
import { trackAttemptStarted, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import {
  markReadinessSubmitted,
  markReadinessStarted,
} from "@/lib/readinessJourney";
import { trackEvent } from "@/lib/analytics";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { TARGET_TOTAL } from "@/data/careerEngineSampler";
import { CompanyBrandLogo } from "@/components/career/result/CompanyLogos";

export const Route = createFileRoute("/career-engine/start")({
  head: () => ({
    meta: [
      { title: "Begin Career Assessment · Arzon Global" },
      {
        name: "description",
        content: "Where should we send your free personalised healthcare career report?",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search) =>
    z
      .object({
        role: z.string().optional().catch(undefined),
        ref: z.string().optional().catch(undefined),
        name: z.string().optional().catch(undefined),
        identity: z.string().optional().catch(undefined),
        fit: z.string().optional().catch(undefined),
      })
      .parse(search),
  component: StartPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name (at least 2 characters)").max(80),
  college: z.string().trim().min(3, "Please enter your college or university name").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please enter a valid email address"),
  whatsappOptin: z.boolean().default(true),
  // Honeypot: must stay empty. Real users never see or fill this.
  website: z.string().max(0, "request rejected").optional().default(""),
});

function StartPage() {
  const navigate = useNavigate();
  const { role: roleContext, ref: refCode, name: refName, fit: refFit } = Route.useSearch();
  const existing = getProfile();
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    college: existing?.college ?? "",
    phone: existing?.phone ?? "",
    email: existing?.email && !existing.email.includes("@arzon.local") ? existing.email : "",
    whatsappOptin: existing?.whatsappOptin ?? true,
    website: "",
  });
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDesktopAdvisory, setShowDesktopAdvisory] = useState(false);
  const [pendingValidData, setPendingValidData] = useState<z.infer<typeof schema> | null>(null);
  const [existingResult, setExistingResult] = useState<{
    archetype?: { name: string };
    fitScore: number;
  } | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    try {
      const raw =
        sessionStorage.getItem("ce_result") ||
        localStorage.getItem("ce_completed_result") ||
        localStorage.getItem("ce_result");
      if (raw) {
        setExistingResult(JSON.parse(raw));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (roleContext && typeof window !== "undefined") window.sessionStorage.setItem("arzon_career_engine_role_context", roleContext);
    if (refCode && typeof window !== "undefined") {
      window.sessionStorage.setItem("ce_referrer_code", refCode);
      if (refName) window.sessionStorage.setItem("ce_referrer_name", refName);
    }
    trackCEFunnelStep({ step: "lead_form" });
    track("ce_start_viewed", { props: { flow: "v2" } });
  }, [roleContext, refCode, refName]);

  const runFlow = async (validData: z.infer<typeof schema>) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setBusy(true);
    setErrorMsg(null);

    try {
      saveProfile({
        name: validData.name,
        college: validData.college,
        phone: validData.phone,
        email: validData.email,
        whatsappOptin: validData.whatsappOptin,
      });

      markReadinessStarted();

      let attemptId = getAttemptId();
      if (!attemptId || !hasResumableAttempt()) {
        attemptId = startFreshAttempt();
      }

      let sessionId = getSessionId();
      if (!sessionId) {
        try {
          sessionId = await startSession();
        } catch {
          // session init fallback
        }
      }

      trackAttemptStarted({
        sessionId: sessionId ?? null,
        attemptId: attemptId ?? null,
      });

      let leadId: string | undefined;
      if (sessionId) {
        try {
          leadId = await createLeadEarly({
            sessionId,
            name: validData.name,
            email: validData.email,
            phone: validData.phone,
            whatsappOptin: validData.whatsappOptin,
          });
        } catch {
          // lead creation best-effort
        }
      }

      const referralCode = (
        refCode ||
        (typeof window !== "undefined" ? window.sessionStorage.getItem("ce_referrer_code") : null) ||
        ""
      ).trim().toLowerCase();

      if (
        leadId &&
        !leadId.startsWith("lead_local_") &&
        referralCode &&
        /^[a-f0-9]{32}$/.test(referralCode)
      ) {
        try {
          const attributed = await attachReferralToLead({ leadId, referralCode });
          if (attributed) {
            track("ce_referral_assessment_started", {
              lead_id: leadId,
              props: { referral_code: referralCode },
            });
          }
        } catch (referralError) {
          // Referral tracking must never block a candidate from taking the assessment.
          console.warn("Referral attribution could not be recorded", referralError);
        }
      }

      markReadinessSubmitted({ leadId });

      trackEvent("readiness_lead_captured", {
        step: 1,
        has_whatsapp_consent: validData.whatsappOptin,
      });

      track("lead_form_complete", {
        props: {
          flow: "career_engine",
          has_whatsapp_consent: validData.whatsappOptin,
        },
      });

      navigate({ to: "/career-engine/test" });
    } catch (err) {
      console.warn("start.test submit fallback active", err);
      window.location.href = "/career-engine/test";
    } finally {
      inFlightRef.current = false;
    }
  };

  const handleProceedFromAdvisory = (validData?: z.infer<typeof schema>) => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("ce_desktop_advisory_seen", "true");
      } catch {
        /* ignore */
      }
    }
    setShowDesktopAdvisory(false);
    const dataToRun = validData || pendingValidData;
    if (dataToRun) {
      runFlow(dataToRun);
    }
  };

  const handleCopyLinkForDesktop = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://arzoncareers.in/career-engine/start";
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Assessment link copied! Send it to WhatsApp or email to open on desktop.", { duration: 4000 });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Please check your details";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const advisoryDismissed = typeof window !== "undefined" && sessionStorage.getItem("ce_desktop_advisory_seen");

    if (isMobile && !advisoryDismissed) {
      setPendingValidData(parsed.data);
      setShowDesktopAdvisory(true);
      return;
    }

    await runFlow(parsed.data);
  };

  return (
    <CareerShell>
      {refName && (
        <div className="mb-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#1557D6] font-bold block">
            PEER CAREER IDENTITY CHALLENGE
          </span>
          <p className="mt-1 text-sm font-bold text-[#071A4A]">
            {refName} discovered their Career Identity{refFit ? ` (${refFit}% Fit)` : ""}.
          </p>
          <p className="text-xs text-[#3F4A60] mt-0.5">
            Think your profile is built differently? Take the 6-minute diagnostic to find your clinical career identity.
          </p>
        </div>
      )}

      {existingResult?.archetype?.name && (
        <div className="mb-4 sm:mb-6 rounded-xl sm:rounded-2xl border border-emerald-200 bg-emerald-50/90 p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 shrink-0" />
            <div className="text-left min-w-0">
              <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block truncate">
                PREVIOUS DIAGNOSTIC ON RECORD
              </span>
              <p className="text-xs sm:text-sm font-bold text-emerald-950 mt-0.5 truncate">
                {existingResult.archetype.name} · {Math.round(existingResult.fitScore)}% Role Fit
              </p>
              <p className="hidden sm:block text-xs text-emerald-800/80 mt-0.5">
                Your report and official certificate are securely saved. You can view them or retake the assessment below.
              </p>
            </div>
          </div>
          <Link
            to="/career-engine/result"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors w-full sm:w-auto text-center"
          >
            <span>View Saved Dossier</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>
      )}

      <div className="arzon-engine-intro text-center space-y-2 sm:space-y-3">
        <div>
          <PremiumChip variant="gold" size="sm">
            FREE · NO LOGIN · ABOUT 6 MINUTES
          </PremiumChip>
        </div>
        <h1 className="font-sans text-xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-snug sm:leading-tight">
          Find the healthcare role that fits your background.
        </h1>
        <p className="text-xs sm:text-base text-[var(--arzon-ink-soft)] mx-auto max-w-md font-sans leading-relaxed">
          <span className="sm:hidden">Answer 42 questions to discover your matching healthcare career path and personalised skill readiness score.</span>
          <span className="hidden sm:inline">Answer {TARGET_TOTAL} questions across your interests, skills, work preferences and career goals. We’ll compare your responses with healthcare role families and show the paths worth exploring next.</span>
        </p>
        <p className="mx-auto hidden sm:inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--arzon-ink-muted)] font-bold">
          <span>{TARGET_TOTAL} questions</span>
          <span>·</span>
          <span>~6 minutes</span>
          <span>·</span>
          <span>13 traits</span>
          <span>·</span>
          <span>6 paths</span>
          <span>·</span>
          <span>Role readiness signal</span>
        </p>
      </div>

      {/* What the assessment looks at */}
      <div className="mt-4 sm:mt-6 hidden sm:grid grid-cols-3 gap-2 sm:gap-3">
        {["Role fit","Work style","Readiness"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--arzon-border)] bg-white tone-light card-light p-2.5 sm:p-3.5 text-center shadow-xs transition-colors hover:border-[#1B3F8B]/40"
          >
            <ShieldCheck className="mx-auto h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--arzon-blue-700)]" />
            <p className="mt-1.5 sm:mt-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-ink-soft)] truncate">
              {label}
            </p>
            <div className="mx-auto mt-1.5 sm:mt-2 h-1 w-full max-w-[48px] sm:max-w-[60px] rounded-full bg-[var(--arzon-blue-100)]">
              <div className="h-full w-1/3 rounded-full bg-[var(--arzon-navy-950)]" />
            </div>
            <p className="mt-1 sm:mt-1.5 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
              Locked
            </p>
          </div>
        ))}
      </div>

      {/* Recruiter Benchmarked Employers Trust Banner */}
      <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-4 text-center shadow-2xs">
        <p className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 sm:mb-2.5">
          Scored Against Live Entry-Level Requisitions At:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 opacity-90">
          <CompanyBrandLogo company="cognizant" className="h-3 sm:h-4.5 w-auto" />
          <CompanyBrandLogo company="iqvia" className="h-3 sm:h-4.5 w-auto" />
          <CompanyBrandLogo company="parexel" className="h-3 sm:h-4.5 w-auto" />
          <CompanyBrandLogo company="novartis" className="h-3 sm:h-4.5 w-auto" />
          <CompanyBrandLogo company="accenture" className="h-3 sm:h-4.5 w-auto" />
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        aria-busy={busy}
        className="arzon-engine-form mt-4 sm:mt-7 space-y-3.5 sm:space-y-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-4 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]"
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        >
          <input
            id="company_url"
            name="company_url"
            type="text"
            tabIndex={-1}
            autoComplete="new-password"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>

        {/* Header Eyebrow */}
        <div className="border-b border-slate-100 pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-50 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[9.5px] sm:text-[10px] font-bold text-blue-700 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>CANDIDATE ONBOARDING</span>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-500 font-medium">Step 1 of 2</span>
          </div>
          <h2 className="mt-2 font-sans text-lg sm:text-2xl font-bold tracking-tight text-[#081F38]">
            Enter Your Academic &amp; Contact Details
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-600 font-sans">
            Your verified career fit score and benchmark analysis will be tied to this candidate profile.
          </p>
        </div>

        {/* 4 Fields: 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="name" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Full Name *</span>
            </Label>
            <Input
              id="name"
              autoComplete="name"
              required
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans"
              placeholder="e.g. Rahul Bathula"
            />
            <p className="mt-1 text-[11px] text-slate-500 font-sans">Used on your verified result card &amp; record.</p>
          </div>

          {/* College Name */}
          <div>
            <Label htmlFor="college" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>College or University *</span>
            </Label>
            <Input
              id="college"
              autoComplete="organization"
              required
              value={form.college}
              onChange={(e) => setForm({ ...form, college: e.target.value })}
              className="mt-1.5 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans"
              placeholder="e.g. Osmania Medical College / JNTUH"
            />
            <p className="mt-1 text-[11px] text-slate-500 font-sans">Current institute or graduating college.</p>
          </div>

          {/* WhatsApp Mobile */}
          <div>
            <Label htmlFor="phone" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>WhatsApp Mobile Number *</span>
            </Label>
            <div className="mt-1.5 flex items-center shadow-2xs">
              <span className="inline-flex h-12 items-center rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 px-3.5 text-xs font-mono font-bold text-slate-700">
                +91
              </span>
              <Input
                id="phone"
                inputMode="numeric"
                autoComplete="tel"
                required
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                className="h-12 rounded-l-none rounded-r-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans font-mono"
                placeholder="98765 43210"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500 font-sans">Where your instant report link is sent.</p>
          </div>

          {/* Email Address */}
          <div>
            <Label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Email Address *</span>
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans"
              placeholder="e.g. rahul@gmail.com"
            />
            <p className="mt-1 text-[11px] text-slate-500 font-sans">For official assessment summary and PDF copy.</p>
          </div>
        </div>

        {/* WhatsApp Opt-in Card */}
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-blue-200/80 bg-blue-50/50 p-4 text-xs text-slate-700 font-sans shadow-2xs hover:bg-blue-50 transition-colors">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
            checked={form.whatsappOptin}
            onChange={(e) => setForm({ ...form, whatsappOptin: e.target.checked })}
          />
          <div>
            <span className="font-semibold text-slate-900 block">
              Send my verified career evaluation and counsellor briefing on WhatsApp
            </span>
            <span className="text-[11px] text-slate-600 mt-0.5 block">
              Instant PDF report, percentile rating, and one-on-one advisory from Arzon career team.
            </span>
          </div>
        </label>

        {errorMsg ? (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-800 font-semibold"
          >
            {errorMsg}
          </div>
        ) : null}

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Private · No Spam · Verifiable ACRI Ledger</span>
          </p>

          <button
            type="submit"
            disabled={busy}
            aria-disabled={busy}
            data-fab-avoid
            className="inline-flex h-12 w-full sm:w-auto sm:min-w-[260px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 text-sm font-bold text-white shadow-[0_2px_12px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all active:scale-[0.98] cursor-pointer"
          >
            {busy ? (
              <AiThinkingLoader label="Initializing Diagnostic…" size="sm" textClassName="text-white" />
            ) : (
              <>
                <span>Begin Career Assessment (10 Mins)</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </>
            )}
          </button>
        </div>

        <p className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--arzon-ink-muted)] pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--arzon-amber-600)]" /> Private · Your answers are used to generate your assessment
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link to="/career-engine" className="text-xs text-[var(--arzon-ink-muted)] hover:text-[var(--arzon-ink-soft)] underline">
          ← Back to Overview
        </Link>
      </div>

      {/* ─── Desktop View Experience Advisory Modal (Mobile Only Prompt) ─── */}
      {showDesktopAdvisory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl text-slate-900 overflow-hidden tone-light card-light">
            {/* Ambient Background Accent */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-100/50 blur-2xl" />

            {/* Close / Dismiss Button */}
            <button
              type="button"
              onClick={() => handleProceedFromAdvisory()}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close advisory and continue"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header with Dual Device Badges */}
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 text-blue-600 shadow-2xs shrink-0">
                <Monitor className="h-5 w-5" />
              </div>
              <div className="min-w-0 pr-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-blue-700 block">
                  RECOMMENDED VIEW · 2026 DOSSIER
                </span>
                <h3 className="font-serif text-lg font-bold text-[#081F38] tracking-tight mt-0.5 leading-snug">
                  Desktop View Recommended
                </h3>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              This clinical diagnostic generates <strong>multi-column employer ATS matrices</strong>, <strong>6-vector capability radar charts</strong>, and an <strong>official printable verification record</strong>.
            </p>

            {/* Instructional Box */}
            <div className="mt-3.5 rounded-2xl border border-blue-200/80 bg-blue-50/60 p-3.5 text-xs text-blue-950 font-sans space-y-2">
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span>
                  <strong>For the richest visual experience:</strong> Open this test on a laptop/desktop, or enable <strong>&ldquo;Desktop Site&rdquo;</strong> in your mobile browser settings.
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>
                  You can also complete the entire 6-minute diagnostic right now on mobile with zero friction.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={() => handleProceedFromAdvisory()}
                className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#081F38] hover:bg-[#0D2E54] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <span>Continue on Mobile</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleCopyLinkForDesktop}
                className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>Copy Link to Open on Desktop</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </CareerShell>
  );
}
