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

  // Legal Consent State (DPDP Compliance & Educational Declaration)
  const [consentAccuracy, setConsentAccuracy] = useState(true);
  const [consentCommunications, setConsentCommunications] = useState(true);

  const hasTriggeredRef = useRef(false);

  // Scroll detection: trigger ONLY after the user scrolls past the second section
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not show on test or admin workstation
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/career-engine/test") ||
      pathname.startsWith("/acri/assessment") ||
      pathname.startsWith("/acri/test")
    ) {
      return;
    }

    // Check if dismissed in this session or already submitted
    try {
      const isDismissed = sessionStorage.getItem(DISMISSED_KEY);
      const isSubmitted = localStorage.getItem(SUBMITTED_KEY);
      if (isDismissed || isSubmitted) return;
    } catch {}

    let observer: IntersectionObserver | null = null;

    const triggerModal = (reason: string) => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
      logAcriFunnelEvent("lead_magnet_triggered_by_scroll", {
        trigger_reason: reason,
        pathname,
      });
      cleanup();
    };

    const checkScroll = () => {
      if (hasTriggeredRef.current) return;

      // Query visible sections inside main or the scroll root
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, #app-scroll-root section, section")
      ).filter((s) => s.offsetHeight > 80 && s.offsetParent !== null);

      if (sections.length >= 2) {
        // Section 2 is the 2nd section (index 1)
        const section2 = sections[1];
        const rect = section2.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // The requirement: "after scrolling second section then only lead magnet has to open"
        // Condition: user has scrolled into and through the second section:
        // 1. The bottom of section 2 has scrolled past 75% of viewport height (meaning user is near or past its bottom)
        // OR
        // 2. The top of section 2 has scrolled completely past the top of viewport (rect.top <= -40)
        const hasScrolledPastSection2 =
          rect.bottom <= viewportHeight * 0.75 || rect.top <= -40;

        if (hasScrolledPastSection2) {
          triggerModal("scrolled_past_section_2");
          return;
        }
      } else if (sections.length === 1) {
        // Fallback if page only has 1 section: user scrolled down 1.2 viewports
        const scrollRoot = document.getElementById("app-scroll-root");
        const scrollY = scrollRoot ? scrollRoot.scrollTop : (window.scrollY || window.pageYOffset);
        if (scrollY >= Math.max(900, window.innerHeight * 1.2)) {
          triggerModal("fallback_single_section_scroll");
          return;
        }
      }
    };

    // Attach listeners to both #app-scroll-root and window
    const scrollRoot = document.getElementById("app-scroll-root");
    scrollRoot?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("scroll", checkScroll, { passive: true });

    // Also attach IntersectionObserver to section 2 for high accuracy
    const setupObserver = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, #app-scroll-root section, section")
      ).filter((s) => s.offsetHeight > 80 && s.offsetParent !== null);

      if (sections.length >= 2 && typeof IntersectionObserver !== "undefined") {
        const section2 = sections[1];
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              // When section 2 is exiting upwards (i.e. user scrolled past it)
              if (
                !entry.isIntersecting &&
                entry.boundingClientRect.top < 0 &&
                entry.boundingClientRect.bottom < window.innerHeight * 0.75
              ) {
                triggerModal("observer_exited_section_2");
                return;
              }
            }
          },
          { threshold: [0, 0.25, 0.5, 0.75, 1.0] }
        );
        observer.observe(section2);
      }
    };

    // Initial check after paint
    const timer = setTimeout(() => {
      setupObserver();
      checkScroll();
    }, 350);

    const cleanup = () => {
      clearTimeout(timer);
      scrollRoot?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("scroll", checkScroll);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };

    return cleanup;
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
      // 2. Persist only non-authoritative session context
      if (typeof window !== "undefined") {
        const profilePayload = {
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          qualification: highestQualification,
          college: collegeUniversity.trim(),
          code: "",
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
        localStorage.setItem(SUBMITTED_KEY, "1");
      }

      // 4. Core Admin Applications Pipeline sync
      try {
        await submitApp({
          data: {
            name: fullName.trim(),
            email: email.trim(),
            phone: mobile.trim(),
            programSlug: "acri-pharmacovigilance",
            programName: "ACRI Pharmacovigilance Certification · Pending Review",
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
      toast.success("Application logged. Admissions review is pending.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-950/75 backdrop-blur-md motion-safe:animate-in motion-safe:fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl bg-white card-light border border-stone-200 shadow-2xl overflow-hidden font-sans text-stone-900 max-h-[92dvh] sm:max-h-[90vh] flex flex-col">
        {/* Top Authority Header Strip */}
        <div className="bg-[#005B4F] px-4 sm:px-7 py-3 sm:py-3.5 flex items-center justify-between text-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-100">
              ACRI PHARMACOVIGILANCE · COHORT 01 INTAKE
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 sm:p-1 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-emerald-200 hover:text-slate-50 hover:bg-[#00473E] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-7 overflow-y-auto space-y-4 sm:space-y-5 overscroll-contain">
          {step === "form" ? (
            <div>
              {/* Badge & Headlines */}
              <div className="space-y-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 motion-safe:animate-pulse" />
                  <span>Exclusive Healthcare Graduate Access · 100 Seat Cap</span>
                </div>

                <h2 className="font-serif font-bold text-xl min-[380px]:text-2xl sm:text-3xl text-[#0B1325] tracking-tight leading-snug">
                  Claim Your ACRI Cohort 01 Invite + 2026 PV Field Guide
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  You are viewing the official Healthcare Career Intelligence System. Request your private single-use examination key for Launch Cohort 01 and instantly download the 2026 Pharmacovigilance Career Intelligence Starter Kit.
                </p>
              </div>

              {/* 3 Core Value Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF9F6] border border-stone-200 text-left font-sans">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#005B4F]">
                    <BookOpen className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>01 · PV Field Guide</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-600 leading-tight">
                    40+ CRO employer map, fresher pay (₹3.8L–₹5.5L), Argus cheat sheet.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#005B4F]">
                    <KeyRound className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>02 · Workstation Key</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-600 leading-tight">
                    25-min calibrated battery testing ICH E2B(R3) & MedDRA case processing.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#005B4F]">
                    <Award className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>03 · Official Credential</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-600 leading-tight">
                    Tamper-proof verifiable badge issued by the Admissions Board.
                  </p>
                </div>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 pt-2">
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
                        className="w-full pl-9 pr-3 py-2.5 sm:py-2 rounded-xl border border-stone-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
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
                        className="w-full pl-9 pr-3 py-2.5 sm:py-2 rounded-xl border border-stone-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
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
                        className="w-full pl-9 pr-3 py-2.5 sm:py-2 rounded-xl border border-stone-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
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
                      className="w-full px-3 py-2.5 sm:py-2 rounded-xl border border-stone-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
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
                      className="w-full pl-9 pr-3 py-2.5 sm:py-2 rounded-xl border border-stone-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
                    />
                  </div>
                </div>

                {/* Mandatory Legal & Educational Consent Process */}
                <div className="pt-2 pb-1 space-y-2 rounded-xl bg-stone-50 border border-stone-200/80 p-3 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-bold text-stone-800 uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>Candidate Legal Declaration &amp; Consent</span>
                  </div>

                  <label className="flex items-start gap-2.5 text-[11px] sm:text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentAccuracy}
                      onChange={(e) => setConsentAccuracy(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"
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

                  <label className="flex items-start gap-2.5 text-[11px] sm:text-xs text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentCommunications}
                      onChange={(e) => setConsentCommunications(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-[#005B4F] focus:ring-[#005B4F]"
                    />
                    <span className="leading-tight">
                      <strong>Dispatch Authorization:</strong> I authorize Arzon Admissions to dispatch my confidential examination access key and verification credentials via WhatsApp and Email.
                    </span>
                  </label>

                  <div className="pt-0.5 text-[9px] sm:text-[10px] font-mono text-stone-500">
                    ● Encrypted &amp; Logged under the Digital Personal Data Protection (DPDP) Act, 2023.
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consentAccuracy || !consentCommunications}
                    className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Queueing dossier…</span>
                    ) : (
                      <>
                        <span>CLAIM INVITE &amp; ACCESS FIELD GUIDE →</span>
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 mt-2 font-mono">
                    <span>● Live cohort availability</span>
                    <span>Application review required · Cohort 01</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* ── Instant Fulfillment & Admissions Confirmation Screen ── */
            <div className="text-center py-2 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border border-[#005B4F]/20">
                <CheckCircle2 className="h-7 w-7 text-[#005B4F]" />
              </div>

              <div>
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/20">
                  ● APPLICATION LOGGED · ADMISSIONS REVIEW IN PROGRESS
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1325] mt-2.5">
                  Application Under Admissions Review
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-sm mx-auto leading-relaxed font-sans">
                  Thank you, <strong>{fullName}</strong>. Your candidate dossier has been queued for Admissions Board review for Launch Cohort 01.
                </p>
              </div>

              {/* Protocol Notice Box */}
              <div className="rounded-2xl border border-stone-200 bg-[#FAF9F6] p-3.5 sm:p-4 text-left space-y-2.5 font-sans">
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
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>DOWNLOAD 2026 CAREER STARTER KIT ↓</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate({ to: "/acri/invite" });
                  }}
                  className="w-full min-h-[44px] py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  ENTER INVITE CODE WHEN APPROVED →
                </button>

                <div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs font-mono font-medium text-stone-500 hover:text-stone-800 transition-colors cursor-pointer py-1"
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
