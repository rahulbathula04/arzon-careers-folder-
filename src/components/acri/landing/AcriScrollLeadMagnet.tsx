import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Download,
  ArrowRight,
  BookOpen,
  KeyRound,
  Award,
  Sparkles,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  User,
  Check,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { applyAcriCandidateFn } from "@/lib/acri-core.functions";
import { logAcriFunnelEvent } from "@/lib/acri/acriCandidateStore";
import { submitApplication } from "@/lib/applications.functions";
import { toast } from "sonner";

const QUALIFICATIONS = [
  "B.Pharm (Bachelor of Pharmacy)",
  "M.Pharm (Pharmacology / Clinical / Pharmaceutics)",
  "Pharm.D (Doctor of Pharmacy)",
  "MBBS / Medical Graduate",
  "BDS / Dental Graduate",
  "B.Sc / M.Sc Life Sciences / Biotechnology",
  "B.Sc / M.Sc Nursing",
  "Other Healthcare / Science Degree",
];

const DISMISSED_KEY = "arzon_acri_lead_magnet_dismissed";
const SUBMITTED_KEY = "arzon_acri_lead_magnet_submitted";

export function AcriScrollLeadMagnet() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const applyCandidate = useServerFn(applyAcriCandidateFn);
  const submitApp = useServerFn(submitApplication);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[0]);
  const [collegeUniversity, setCollegeUniversity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedInviteCode, setGeneratedInviteCode] = useState<string>("");

  // Legal Consent State (DPDP Compliance & Educational Declaration)
  const [consentAccuracy, setConsentAccuracy] = useState(true);
  const [consentCommunications, setConsentCommunications] = useState(true);

  const hasTriggeredRef = useRef(false);

  // Scroll detection: trigger after user scrolls 3 pages (~2.8x viewport height)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not show on admin routes or test workstation
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/career-engine/test") ||
      pathname.startsWith("/acri/assessment")
    ) {
      return;
    }

    // Check if dismissed in this session or already submitted
    try {
      const isDismissed = sessionStorage.getItem(DISMISSED_KEY);
      const isSubmitted = localStorage.getItem(SUBMITTED_KEY);
      if (isDismissed || isSubmitted) return;
    } catch {}

    const handleScroll = () => {
      if (hasTriggeredRef.current) return;

      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY || window.pageYOffset;
      // 3 pages threshold (approx 2.8 screen heights or min 1800px)
      const threshold = Math.max(1800, viewportHeight * 2.8);

      if (scrollPosition >= threshold) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
        logAcriFunnelEvent("lead_magnet_triggered_by_scroll", {
          scrollY: scrollPosition,
          threshold,
          pathname,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
    logAcriFunnelEvent("lead_magnet_dismissed", { pathname });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !mobile.trim() || !collegeUniversity.trim()) {
      toast.error("Please fill in all required healthcare details.");
      return;
    }

    if (!consentAccuracy || !consentCommunications) {
      toast.error("Please verify and accept the required legal declarations to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      // The database is authoritative. Pending candidates receive no invite code.
      const serverRes = await applyCandidate({ data: {
        fullName: fullName.trim(), email: email.trim(), mobile: mobile.trim(),
        highestQualification, collegeUniversity: collegeUniversity.trim(), currentlyWorking: "no",
      }});
      if (!serverRes?.success || !serverRes.candidateId) throw new Error("ACRI registration was not persisted.");
      const assignedCode = "";
      setGeneratedInviteCode(assignedCode);

      // 2. Persist only non-authoritative session context
      if (typeof window !== "undefined") {
        const profilePayload = {
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          qualification: highestQualification,
          college: collegeUniversity.trim(),
          code: assignedCode,
          consentedAt: new Date().toISOString(),
          legalConsentAccepted: true,
        };
        sessionStorage.setItem(
          "arzon_acri_candidate_profile",
          JSON.stringify(profilePayload)
        );
        localStorage.setItem(
          "arzon_acri_candidate_profile",
          JSON.stringify(profilePayload)
        );
        localStorage.setItem("arzon_acri_active_code", assignedCode);
        localStorage.setItem(SUBMITTED_KEY, "1");
      }

      // 3. Server function sync
      try {
        await applyCandidate({
          data: {
            fullName: fullName.trim(),
            email: email.trim(),
            mobile: mobile.trim(),
            highestQualification,
            collegeUniversity: collegeUniversity.trim(),
            currentlyWorking: "no",
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] Server sync fallback:", err);
      }

      // 4. Core Admin Applications Pipeline sync
      try {
        await submitApp({
          data: {
            name: fullName.trim(),
            email: email.trim(),
            phone: mobile.trim(),
            programSlug: "acri-pharmacovigilance",
            programName: `ACRI Pharmacovigilance Certification (Cohort 01 Seat: ${localRes?.inviteCode || "Allocated"})`,
            whatsappOptin: true,
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] Applications pipeline sync fallback:", err);
      }

      setStep("success");
      logAcriFunnelEvent("lead_magnet_submitted", {
        email: email.trim(),
        qualification: highestQualification,
      });
      toast.success("Application logged! Your Cohort 01 dossier has been submitted.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-md motion-safe:animate-in motion-safe:fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-white card-light border border-stone-200 shadow-2xl overflow-hidden font-sans text-stone-900 max-h-[92vh] flex flex-col">
        {/* Top Authority Header Strip */}
        <div className="bg-[#005B4F] px-5 sm:px-7 py-3.5 flex items-center justify-between text-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-100">
              ACRI PHARMACOVIGILANCE · COHORT 01 INTAKE
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-slate-50 hover:bg-[#00473E] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          {step === "form" ? (
            <div>
              {/* Badge & Headlines */}
              <div className="space-y-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] font-mono text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 motion-safe:animate-pulse" />
                  <span>Exclusive Healthcare Graduate Access · 100 Seat Cap</span>
                </div>

                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0B1325] tracking-tight leading-snug">
                  Claim Your ACRI Cohort 01 Invite + 2026 PV Field Guide
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  You are viewing the official Healthcare Career Intelligence System. Request your private single-use examination key for Launch Cohort 01 and instantly download the 2026 Pharmacovigilance Career Intelligence Starter Kit.
                </p>
              </div>

              {/* 3 Core Value Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-[#FAF9F6] border border-stone-200 text-left font-sans">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#005B4F]">
                    <BookOpen className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>01 · PV Field Guide</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    40+ CRO employer map, fresher pay (₹3.8L–₹5.5L), Argus cheat sheet.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#005B4F]">
                    <KeyRound className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>02 · Workstation Key</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    25-min calibrated battery testing ICH E2B(R3) & MedDRA case processing.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#005B4F]">
                    <Award className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>03 · Official Credential</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    Tamper-proof verifiable badge issued by the Admissions Board.
                  </p>
                </div>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Bathula"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white tone-light text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white tone-light text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Mobile / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      WhatsApp Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. +91 93473 79041"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white tone-light text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                      />
                    </div>
                  </div>

                  {/* Highest Qualification */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Degree / Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white tone-light text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                    >
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* College / University */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    College / University Institute <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={collegeUniversity}
                      onChange={(e) => setCollegeUniversity(e.target.value)}
                      placeholder="e.g. Osmania University College of Technology"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white tone-light text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                    />
                  </div>
                </div>

                {/* Mandatory Legal & Educational Consent Process */}
                <div className="pt-2 pb-1 space-y-2 rounded-xl bg-stone-50 border border-stone-200/80 p-3 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-800 uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>Candidate Legal Declaration &amp; Consent</span>
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentAccuracy}
                      onChange={(e) => setConsentAccuracy(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"
                    />
                    <span className="leading-tight">
                      <strong>Educational Accuracy:</strong> I certify my educational qualifications are authentic and consent to assessment data processing under the{" "}
                      <a href="/terms" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">
                        Privacy Policy
                      </a>.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentCommunications}
                      onChange={(e) => setConsentCommunications(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"
                    />
                    <span className="leading-tight">
                      <strong>Dispatch Authorization:</strong> I authorize Arzon Admissions to dispatch my confidential examination access key and verification credentials via WhatsApp and Email.
                    </span>
                  </label>

                  <div className="pt-0.5 text-[10px] font-mono text-stone-500">
                    ● Encrypted &amp; Logged under the Digital Personal Data Protection (DPDP) Act, 2023.
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consentAccuracy || !consentCommunications}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Queueing dossier…</span>
                    ) : (
                      <>
                        <span>CLAIM INVITE &amp; ACCESS FIELD GUIDE →</span>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 font-mono">
                    <span>● Live cohort availability</span>
                    <span>Application review required · Cohort 01</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* ── Instant Fulfillment & Admissions Confirmation Screen ── */
            <div className="text-center py-2 space-y-5">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border border-[#005B4F]/20">
                <CheckCircle2 className="h-7 w-7 text-[#005B4F]" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/20">
                  ● APPLICATION LOGGED · ADMISSIONS REVIEW IN PROGRESS
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-2.5">
                  Application Under Admissions Review
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-sm mx-auto leading-relaxed font-sans">
                  Thank you, <strong>{fullName}</strong>. Your candidate dossier has been queued for Admissions Board review for Launch Cohort 01.
                </p>
              </div>

              {/* Protocol Notice Box */}
              <div className="rounded-2xl border border-stone-200 bg-[#FAF9F6] p-4 text-left space-y-2.5 font-sans">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-800 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-[#005B4F]" />
                  <span>Onboarding &amp; Access Protocol</span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-[#005B4F]">01</span>
                    <span><strong>Admissions Review:</strong> Reviewing degree qualification and healthcare alignment.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-[#005B4F]">02</span>
                    <span><strong>Access Key Dispatch:</strong> Once accepted, your private key will be dispatched to <strong>{email}</strong> and <strong>{mobile}</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-[#005B4F]">03</span>
                    <span><strong>Zero Duplicate Registration:</strong> Your profile is pre-loaded for immediate workstation launch.</span>
                  </div>
                </div>
              </div>

              {/* Immediate Download & Entry Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <a
                  href="/Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                  download="Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>DOWNLOAD 2026 CAREER STARTER KIT ↓</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate({
                      to: "/career-engine/test",
                      search: { code: generatedInviteCode || "ARZON-ACRI-005" },
                    });
                  }}
                  className="w-full py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  ENTER ASSESSMENT WORKSTATION →
                </button>

                <div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs font-mono font-medium text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
