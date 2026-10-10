import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  X,
  CheckCircle2,
  Download,
  ArrowRight,
  FileText,
  Mail,
  Phone,
  User,
  Check,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { applyAcriCandidateFn } from "@/lib/acri-core.functions";
import { logAcriFunnelEvent } from "@/lib/acri/acriCandidateStore";
import { submitApplication } from "@/lib/applications.functions";
import { submitCareerStarterKitLead } from "@/lib/careerStarterKit.functions";
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
  const submitStarterKit = useServerFn(submitCareerStarterKitLead);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  // Form State - Clear, minimal, 4 essential fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentCommunications, setConsentCommunications] = useState(true);

  const hasTriggeredRef = useRef(false);

  // Trigger lead magnet after the second section — at the starting of the 3rd section
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

      if (sections.length >= 3) {
        // Section 3 is the 3rd section (index 2: Section 1 = Hero, Section 2 = Middle, Section 3 = 3rd Section)
        const section3 = sections[2];
        const rect = section3.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // "start lead magnet after second section like starting of 3rd section":
        // Trigger the instant the 3rd section starts entering the viewport
        const reachedStartOfSection3 = rect.top <= viewportHeight * 0.85;

        if (reachedStartOfSection3) {
          triggerModal("reached_start_of_section_3");
          return;
        }
      } else if (sections.length === 2) {
        // If page has only 2 sections: trigger after section 2 has been scrolled
        const section2 = sections[1];
        const rect = section2.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrolledPastSection2 = rect.bottom <= viewportHeight * 0.85 || rect.top <= -40;

        if (scrolledPastSection2) {
          triggerModal("scrolled_past_section_2");
          return;
        }
      } else if (sections.length === 1) {
        // Fallback for single section page: user scrolled down 1.4 viewports
        const scrollRoot = document.getElementById("app-scroll-root");
        const scrollY = scrollRoot ? scrollRoot.scrollTop : (window.scrollY || window.pageYOffset);
        if (scrollY >= Math.max(1100, window.innerHeight * 1.4)) {
          triggerModal("fallback_single_section_scroll");
          return;
        }
      }
    };

    // Attach listeners to both #app-scroll-root and window
    const scrollRoot = document.getElementById("app-scroll-root");
    scrollRoot?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("scroll", checkScroll, { passive: true });

    // Also attach IntersectionObserver directly to the 3rd section for frame-perfect trigger
    const setupObserver = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, #app-scroll-root section, section")
      ).filter((s) => s.offsetHeight > 80 && s.offsetParent !== null);

      if (sections.length >= 3 && typeof IntersectionObserver !== "undefined") {
        const section3 = sections[2];
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              // Trigger right at the starting of 3rd section
              if (entry.isIntersecting && entry.boundingClientRect.top <= window.innerHeight * 0.9) {
                triggerModal("observer_entered_section_3");
                return;
              }
            }
          },
          { threshold: [0, 0.1, 0.25] }
        );
        observer.observe(section3);
      } else if (sections.length === 2 && typeof IntersectionObserver !== "undefined") {
        const section2 = sections[1];
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                triggerModal("observer_exited_section_2");
                return;
              }
            }
          },
          { threshold: [0, 0.25] }
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
    if (!fullName.trim() || !email.trim() || !mobile.trim()) {
      toast.error("Please fill in your name, email and WhatsApp number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanPhoneDigits = mobile.replace(/\D/g, "");
      const cleanPhone = cleanPhoneDigits.length >= 10 ? cleanPhoneDigits.slice(-10) : mobile.trim();
      const clientFp = ("lead-magnet-" + Date.now() + "-" + Math.random().toString(36).substring(2)).slice(0, 32);

      // 1. Attach lead to Admin Dashboard Applications Pipeline (/admin/applications)
      try {
        await submitApp({
          data: {
            name: fullName.trim(),
            email: email.trim(),
            phone: cleanPhone,
            programSlug: "lead-magnet-2026-pv-guide",
            programName: "2026 PV Career Guide · Lead Magnet",
            whatsappOptin: consentCommunications,
            degree: highestQualification,
            notes: JSON.stringify({
              source: "scroll_lead_magnet",
              trigger: "start_of_section_3",
              qualification: highestQualification,
              submittedAt: new Date().toISOString(),
            }),
            utmSource: "scroll-lead-magnet",
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] Admin applications pipeline sync notice:", err);
      }

      // 2. Attach lead to Admin Dashboard ACRI Candidates (/admin/acri)
      try {
        await applyCandidate({
          data: {
            fullName: fullName.trim(),
            email: email.trim(),
            mobile: cleanPhone,
            highestQualification,
            collegeUniversity: "Lead Magnet Applicant",
            currentlyWorking: "no",
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] ACRI candidates sync notice:", err);
      }

      // 3. Attach lead to Admin Dashboard Career Engine Leads (/admin/leads)
      try {
        await submitStarterKit({
          data: {
            name: fullName.trim(),
            email: email.trim(),
            phone: cleanPhone,
            qualification: highestQualification,
            whatsappOptin: consentCommunications,
            sourcePath: pathname,
            clientFp,
            utmSource: "scroll-lead-magnet",
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] Career engine leads sync notice:", err);
      }

      // 4. Save session context
      if (typeof window !== "undefined") {
        const profilePayload = {
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: cleanPhone,
          qualification: highestQualification,
          college: "Lead Magnet Applicant",
          code: "",
          consentedAt: new Date().toISOString(),
          legalConsentAccepted: true,
        };
        sessionStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(profilePayload));
        localStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(profilePayload));
        localStorage.setItem(SUBMITTED_KEY, "1");
      }

      setStep("success");
      logAcriFunnelEvent("lead_magnet_submitted", {
        email: email.trim(),
        qualification: highestQualification,
      });
      toast.success("2026 Guide ready! Click below to download.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs motion-safe:animate-in motion-safe:fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white card-light tone-light border border-slate-200/90 shadow-2xl overflow-hidden font-sans text-slate-900 max-h-[92dvh] sm:max-h-[90vh] flex flex-col">
        {/* Sleek top brand accent line in Arzon Deep Navy */}
        <div className="h-1 w-full bg-gradient-to-r from-[#071A4A] via-[#1557D6] to-[#071A4A] shrink-0" />

        {/* Minimal Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain">
          {step === "form" ? (
            <div>
              {/* Restrained Eyebrow Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#1557D6] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                <FileText className="h-3 w-3" />
                <span>2026 Healthcare Career Intelligence</span>
              </div>

              {/* Clear, Minimal Headline */}
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#071A4A] tracking-tight leading-snug">
                Get the 2026 Pharmacovigilance Career &amp; Salary Guide
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                40+ hiring CRO directory, entry-level salary benchmarks (₹3.8L–₹5.5L), and ACRI Cohort 01 assessment key in one PDF.
              </p>

              {/* 3 Clean Highlights (Minimal, Uncluttered) */}
              <div className="my-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-left font-sans">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>40+ CRO Directory</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Salary Benchmarks</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Simulation Key</span>
                </div>
              </div>

              {/* Clean Lead Capture Form (2x2 Grid) */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-0.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Bathula"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1557D6]/20 focus:border-[#1557D6] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1557D6]/20 focus:border-[#1557D6] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* WhatsApp Mobile */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. 93473 79041"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1557D6]/20 focus:border-[#1557D6] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Highest Qualification */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Degree / Background <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white tone-light text-[16px] sm:text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1557D6]/20 focus:border-[#1557D6] transition-colors"
                    >
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clean, Unobtrusive Consent */}
                <label className="flex items-start gap-2 pt-0.5 text-[11px] text-slate-500 cursor-pointer font-sans">
                  <input
                    type="checkbox"
                    checked={consentCommunications}
                    onChange={(e) => setConsentCommunications(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-[#071A4A] focus:ring-[#1557D6] shrink-0"
                  />
                  <span className="leading-tight">
                    Send me the 2026 Field Guide and ACRI invitation via WhatsApp &amp; Email.
                  </span>
                </label>

                {/* Primary Action Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Attaching to Admissions &amp; preparing guide…</span>
                    ) : (
                      <>
                        <span>Download 2026 Guide &amp; Key →</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-2 font-mono">
                    Instant PDF download · Attached to Admissions · Zero spam
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* Clean Minimal Success View */
            <div className="text-center py-2 space-y-3.5">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto border border-emerald-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Ready for Download · Attached to Admissions
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#071A4A] mt-2">
                  Your 2026 Guide is Ready
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your profile has been attached to Admissions and a copy dispatched to <strong>{email}</strong>. Download it immediately below.
                </p>
              </div>

              {/* Direct Download Button */}
              <div className="space-y-2 pt-1 max-w-sm mx-auto">
                <a
                  href="/Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                  download="Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#071A4A] hover:bg-[#1557D6] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <Download className="h-4 w-4" />
                  <span>Download 2026 Field Guide (PDF) ↓</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate({ to: "/career-assessment" });
                  }}
                  className="w-full min-h-[40px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>Explore Free Career Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>

                <div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer py-1"
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
