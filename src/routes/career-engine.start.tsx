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
import { saveEarlyDiagnosticProfile } from "@/lib/careerEngineDiagnostic.functions";
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
  qualification: z.string().min(1, "Please select your academic qualification").default("B.Pharm"),
  graduationYear: z.string().min(1, "Please select your graduation year").default("2026"),
  currentStatus: z.string().min(1, "Please select your current status").default("Actively Job Hunting (Fresher)"),
  targetRole: z.string().default("Drug Safety Associate"),
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
    qualification: existing?.qualification ?? "B.Pharm",
    graduationYear: existing?.graduationYear ?? "2026",
    currentStatus: existing?.currentStatus ?? "Actively Job Hunting (Fresher)",
    targetRole: existing?.targetRole ?? "Drug Safety Associate",
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
        qualification: validData.qualification,
        graduationYear: validData.graduationYear,
        currentStatus: validData.currentStatus,
        targetRole: validData.targetRole,
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
            college: validData.college,
            qualification: validData.qualification,
            graduationYear: validData.graduationYear,
            currentStatus: validData.currentStatus,
            targetRole: validData.targetRole,
          });

          // Persist full academic dossier to server immediately so admin dashboard shows college, degree, and year from second 1
          if (leadId && !leadId.startsWith("lead_local_")) {
            void saveEarlyDiagnosticProfile({
              data: {
                leadId,
                college: validData.college,
                qualification: validData.qualification,
                graduationYear: validData.graduationYear,
                currentStatus: validData.currentStatus,
                targetRole: validData.targetRole,
              },
            }).catch((err) => {
              console.warn("Could not persist early diagnostic profile to server:", err);
            });
          }
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

    // Direct mobile-first launch without obstructive desktop advisories
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
            FREE · 40 CLINICAL CASE QUESTIONS · ~15 MINUTES
          </PremiumChip>
        </div>
        <h1 className="font-sans text-xl sm:text-4xl lg:text-5xl font-bold text-[#081F38] tracking-tight leading-snug sm:leading-tight">
          Drug Safety Associate Clinical Interview Diagnostic
        </h1>
        <p className="text-xs sm:text-base text-slate-600 mx-auto max-w-xl font-sans leading-relaxed">
          Test your technical interview readiness across 40 realistic ICSR casework scenarios, MedDRA coding dilemmas, and regulatory clock decisions evaluated against published CRO entry standards.
        </p>
        <p className="mx-auto hidden sm:inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-bold">
          <span>40 Casework Scenarios</span>
          <span>·</span>
          <span>~15 Minutes</span>
          <span>·</span>
          <span>8 Core PV Competencies</span>
          <span>·</span>
          <span>Instant Recruiter Feedback</span>
        </p>
      </div>

      {/* Target Role Selector Ribbon */}
      <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-3 sm:p-4 text-left">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
          Selected Target Job Track:
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#081F38] text-white text-xs font-bold shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Drug Safety Associate (PV / ICSR) · Active Diagnostic</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 text-xs font-medium">
            <span>Clinical Data Management (EDC) · Coming Soon</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-400 text-xs font-medium">
            <span>Medical Coding (ICD-10) · Coming Soon</span>
          </span>
        </div>
      </div>

      {/* Core Competencies Tested */}
      <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "ICSR Validity", sub: "ICH E2D & GVP Module VI (4 Mandatory Elements)" },
          { label: "MedDRA Hierarchy", sub: "MSSO PTC Diagnosis vs Symptoms Supersession" },
          { label: "Regulatory Clocks", sub: "ICH E2A SUSAR Clocks & Day 0 Identification" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white tone-light card-light p-3 text-left shadow-2xs transition-colors hover:border-blue-400"
          >
            <div className="flex items-center gap-1.5 text-blue-700">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider truncate">
                {item.label}
              </p>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 font-sans leading-tight">
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Published Guidelines Trust Banner */}
      <div className="mt-3 rounded-xl border border-slate-200/90 bg-white p-2.5 sm:p-3 text-center shadow-2xs">
        <p className="font-mono text-[9.5px] sm:text-[10px] text-slate-500 font-medium">
          Evaluated under published clinical safety standards: <strong>ICH E2A / E2D</strong> · <strong>ICH-GCP E6(R2)</strong> · <strong>EMA GVP Module VI</strong> · <strong>MedDRA MSSO PTC</strong>
        </p>
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
              className="mt-1.5 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans text-base sm:text-sm"
              placeholder="Your full name"
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
              className="mt-1.5 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans text-base sm:text-sm"
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
                className="h-12 rounded-l-none rounded-r-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans font-mono text-base sm:text-sm"
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
              className="mt-1.5 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-[#081F38] placeholder:text-slate-400 focus:bg-white focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600 transition-all font-sans text-base sm:text-sm"
              placeholder="e.g. rahul@gmail.com"
            />
            <p className="mt-1 text-[11px] text-slate-500 font-sans">For official assessment summary and PDF copy.</p>
          </div>
        </div>

        {/* Academic & Professional Status Details */}
        <div className="border-t border-slate-100 pt-4 mt-1">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic &amp; Clinical Background</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Qualification */}
            <div>
              <Label htmlFor="qualification" className="text-xs font-bold text-slate-700 block mb-1.5">
                Qualification *
              </Label>
              <select
                id="qualification"
                value={form.qualification}
                onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 text-base sm:text-xs font-semibold text-[#081F38] focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer"
              >
                <option value="B.Pharm">B.Pharm (Bachelor of Pharmacy)</option>
                <option value="Pharm.D">Pharm.D (Doctor of Pharmacy)</option>
                <option value="M.Pharm">M.Pharm (Pharmacology / Clinical / Other)</option>
                <option value="BDS">BDS (Dental Surgery)</option>
                <option value="MBBS">MBBS / MD</option>
                <option value="M.Sc Life Sciences">M.Sc Life Sciences / Biotech / Biochem</option>
                <option value="B.Sc Life Sciences">B.Sc Life Sciences / Chemistry</option>
                <option value="Nursing / Allied Health">Nursing / Allied Health Sciences</option>
              </select>
            </div>

            {/* Graduation Year */}
            <div>
              <Label htmlFor="graduationYear" className="text-xs font-bold text-slate-700 block mb-1.5">
                Graduation Year *
              </Label>
              <select
                id="graduationYear"
                value={form.graduationYear}
                onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 text-base sm:text-xs font-semibold text-[#081F38] focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer"
              >
                <option value="2026">2026 (Final Year Student)</option>
                <option value="2025">2025 (Recent Graduate)</option>
                <option value="2024">2024 (Batch)</option>
                <option value="2023 or Prior">2023 or Prior (Experienced / Gap)</option>
              </select>
            </div>

            {/* Current Status */}
            <div>
              <Label htmlFor="currentStatus" className="text-xs font-bold text-slate-700 block mb-1.5">
                Current Status *
              </Label>
              <select
                id="currentStatus"
                value={form.currentStatus}
                onChange={(e) => setForm({ ...form, currentStatus: e.target.value })}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 text-base sm:text-xs font-semibold text-[#081F38] focus:bg-white focus:border-blue-600 focus:outline-none transition cursor-pointer"
              >
                <option value="Actively Job Hunting (Fresher)">Actively Job Hunting (Fresher)</option>
                <option value="Currently Studying (Final Year)">Currently Studying (Final Year)</option>
                <option value="Currently Employed (0-1 Year)">Currently Employed (0–1 Year)</option>
                <option value="Working Professional Transitioning">Working Professional Transitioning</option>
              </select>
            </div>
          </div>

          {/* Target Job Role Badge */}
          <div className="mt-3.5 rounded-xl border border-blue-200/90 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 motion-safe:animate-pulse" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 block">
                  Target Clinical Diagnostic Track
                </span>
                <strong className="text-xs font-bold text-[#081F38] font-sans">
                  Drug Safety Associate (PV / ICSR)
                </strong>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
              40-Question Casework Simulator
            </span>
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
            className="inline-flex h-13 sm:h-12 w-full sm:w-auto sm:min-w-[280px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 text-sm sm:text-base font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all active:scale-[0.98] cursor-pointer"
          >
            {busy ? (
              <AiThinkingLoader label="Initializing Diagnostic…" size="sm" textClassName="text-white" />
            ) : (
              <>
                <span>Start Clinical Diagnostic (40 Qs · 15 Mins)</span>
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
