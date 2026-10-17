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
  Gift,
  Sparkles,
  Laptop,
  BookOpen,
} from "lucide-react";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
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
        // Immediately deliver free value gift: auto-download PDF
        try {
          const downloadAnchor = document.createElement("a");
          downloadAnchor.href = "/Arzon_2026_Healthcare_Career_Starter_Kit.pdf";
          downloadAnchor.download = "Arzon_2026_Healthcare_Career_Starter_Kit.pdf";
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          document.body.removeChild(downloadAnchor);
        } catch (dlErr) {
          console.warn("[AcriScrollLeadMagnet] Auto-download triggered via manual fallback:", dlErr);
        }
      }

      setStep("success");
      logAcriFunnelEvent("lead_magnet_submitted", {
        email: email.trim(),
        qualification: highestQualification,
      });
      toast.success("Free Value Gift unlocked! Your download has started.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md motion-safe:animate-in motion-safe:fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[480px] rounded-3xl bg-white card-light tone-light border border-black/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden font-sans text-slate-900">
        {/* Apple-style circular close control */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10 flex items-center justify-center cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-3.5 w-3.5 stroke-[2.5]" />
        </button>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {step === "form" ? (
            <div>
              {/* Apple Minimal Header */}
              <div className="text-left mb-5">
                <span className="text-[11px] font-semibold text-blue-600 tracking-wider uppercase">
                  Career Intelligence Pack
                </span>
                <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
                  Get the 2026 Pharmacovigilance Guide
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Direct access to 40+ hiring companies, salary benchmarks, and your complimentary clinical case assessment pass.
                </p>
              </div>

              {/* Apple-Style Refined Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Bathula"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. 93473 79041"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Degree
                    </label>
                    <select
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all cursor-pointer"
                    >
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label className="flex items-start gap-2 pt-0.5 text-xs text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentCommunications}
                    onChange={(e) => setConsentCommunications(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-blue-500"
                  />
                  <span className="leading-tight">
                    Send me the 2026 Field Guide and career updates via WhatsApp &amp; Email.
                  </span>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Preparing your guide…</span>
                    ) : (
                      <>
                        <span>Get the Free Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">
                    Instant PDF download · Assessment pass included · Zero spam
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* Apple Minimalist Delivery View */
            <div className="text-center space-y-4">
              {/* Apple Success Badge & Header */}
              <div className="space-y-1.5">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                  Your Field Guide is Ready
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  We've started your download and sent a backup copy to{" "}
                  <span className="font-medium text-slate-800">{email}</span>.
                </p>
              </div>

              {/* Primary Asset Card: Clean Apple File Tile */}
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <FileText className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-slate-900 truncate">
                        2026 Pharmacovigilance Career Field Guide
                      </h3>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded shrink-0">
                        PDF
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      40+ CRO directory · Salary benchmarks · Interview Q&amp;A
                    </p>
                  </div>
                </div>

                {/* Apple Buttons: Primary Download + Personalized */}
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href="/Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                    download="Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.99]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      try {
                        generateStarterKitPDF({ candidateName: fullName, degree: highestQualification });
                        toast.success("Personalized PDF stamped with your profile generated!");
                      } catch (e) {
                        console.error("Personalized PDF failed", e);
                      }
                    }}
                    className="py-2.5 px-3 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-white text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Generate a custom PDF stamped with your name"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Personalized Edition</span>
                  </button>
                </div>
              </div>

              {/* Secondary Asset Card: Apple Companion Banner */}
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-xs text-slate-900 truncate">
                      ACRI Clinical Simulation Pass
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      Complimentary access to case triage &amp; standardized coding
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate({ to: "/career-assessment" });
                  }}
                  className="shrink-0 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <span>Launch</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Minimal Apple Sheet Footer */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate({ to: "/starter-kit" });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Read 20 Q&amp;As Online</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-100"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
