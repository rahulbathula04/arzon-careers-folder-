import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  X,
  Download,
  ArrowRight,
  FileText,
  Mail,
  Phone,
  User,
  Check,
  Sparkles,
  Laptop,
} from "lucide-react";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { useServerFn } from "@tanstack/react-start";
import { applyAcriCandidateFn } from "@/lib/acri-core.functions";
import { logAcriFunnelEvent } from "@/lib/acri/acriCandidateStore";
import { submitApplication } from "@/lib/applications.functions";
import { submitCareerStarterKitLead } from "@/lib/careerStarterKit.functions";
import {
  isEligibleForLeadCapture,
  markLeadAsConverted,
  markLeadAsDismissed,
  hasStudentAlreadyConverted,
} from "@/lib/lead-capture-rules";
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

export function AcriScrollLeadMagnet() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const applyCandidate = useServerFn(applyAcriCandidateFn);
  const submitApp = useServerFn(submitApplication);
  const submitStarterKit = useServerFn(submitCareerStarterKitLead);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentCommunications, setConsentCommunications] = useState(true);

  const hasTriggeredRef = useRef(false);
  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up auto-dismiss timer on unmount
  useEffect(() => {
    return () => {
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }
    };
  }, []);

  // Rules-based non-intrusive acquisition trigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Rule 1 & 2: Check global student conversion status & route quiet zones
    if (!isEligibleForLeadCapture(pathname)) {
      return;
    }

    const pageMountTime = Date.now();
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;

    const triggerCard = (reason: string) => {
      if (hasTriggeredRef.current) return;
      // Re-verify eligibility right before showing
      if (!isEligibleForLeadCapture(pathname)) return;

      hasTriggeredRef.current = true;
      setIsOpen(true);
      logAcriFunnelEvent("lead_magnet_triggered_by_scroll", {
        trigger_reason: reason,
        pathname,
      });
      cleanup();
    };

    const evaluateEngagement = () => {
      if (hasTriggeredRef.current) return;

      const elapsedMs = Date.now() - pageMountTime;
      const scrollRoot = document.getElementById("app-scroll-root");
      const scrollY = scrollRoot ? scrollRoot.scrollTop : (window.scrollY || window.pageYOffset);

      // Student Acquisition Rule 5: Minimum 6s dwell time + 500px scroll depth
      // Ensures the student is genuinely reading the curriculum, not bouncing or accidentally touching
      if (scrollY >= 500) {
        if (elapsedMs >= 6000) {
          triggerCard("deep_scroll_after_dwell");
        } else {
          const remainingMs = Math.max(1000, 6000 - elapsedMs);
          if (scrollTimeout) clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (!hasTriggeredRef.current) {
              triggerCard("deep_scroll_delayed_dwell");
            }
          }, remainingMs);
        }
      }
    };

    const scrollRoot = document.getElementById("app-scroll-root");
    scrollRoot?.addEventListener("scroll", evaluateEngagement, { passive: true });
    window.addEventListener("scroll", evaluateEngagement, { passive: true });

    // Passive observer on section 2 with 6s dwell gate
    const setupObserver = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, #app-scroll-root section, section")
      ).filter((s) => s.offsetHeight > 100 && s.offsetParent !== null);

      if (sections.length >= 2 && typeof IntersectionObserver !== "undefined") {
        const section2 = sections[1];
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting && !hasTriggeredRef.current) {
                const elapsedMs = Date.now() - pageMountTime;
                const remainingMs = Math.max(1200, 6500 - elapsedMs);
                if (scrollTimeout) clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                  if (!hasTriggeredRef.current) {
                    triggerCard("observer_section2_reading");
                  }
                }, remainingMs);
                return;
              }
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(section2);
      }
    };

    const initialTimer = setTimeout(() => {
      setupObserver();
      evaluateEngagement();
    }, 1500);

    const cleanup = () => {
      clearTimeout(initialTimer);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollRoot?.removeEventListener("scroll", evaluateEngagement);
      window.removeEventListener("scroll", evaluateEngagement);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };

    return cleanup;
  }, [pathname]);

  // Handle ESC key to dismiss effortlessly
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    markLeadAsDismissed();
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
              trigger: "section_2_reading",
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

      // Rule 1: Mark lead as permanently converted so it NEVER appears again
      markLeadAsConverted({
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: cleanPhone,
        qualification: highestQualification,
      });

      // Auto-trigger browser download
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

      setStep("success");
      logAcriFunnelEvent("lead_magnet_submitted", {
        email: email.trim(),
        qualification: highestQualification,
      });
      toast.success("Free Guide unlocked! Your download has started.");

      // Student Acquisition Rule 4: Auto-dismiss success card after 6s so it doesn't linger
      autoDismissTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 6000);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If student has already converted or modal is not open, do not render anything
  if (!isOpen || hasStudentAlreadyConverted()) return null;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] pointer-events-auto"
      role="region"
      aria-label="Career Field Guide Offer"
    >
      {/* Floating Apple Card: Non-blocking, shadow-rich, elegant */}
      <div
        className="relative rounded-2xl bg-white card-light tone-light border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden font-sans text-slate-900 motion-safe:animate-in motion-safe:slide-in-from-bottom-5 duration-300"
      >
        {/* Subtle top indicator bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

        {/* Circular Apple close control */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors z-10 flex items-center justify-center cursor-pointer shadow-2xs"
          aria-label="Dismiss offer for 7 days"
          title="Not now"
        >
          <X className="h-3.5 w-3.5 stroke-[2.2]" />
        </button>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          {step === "form" ? (
            <div>
              {/* Header */}
              <div className="text-left mb-4 pr-6">
                <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase">
                  Free Career Intelligence
                </span>
                <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900 leading-snug">
                  2026 Pharmacovigilance Field Guide
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Salary benchmarks, 40+ hiring CROs directory, and complimentary clinical simulation pass.
                </p>
              </div>

              {/* Minimal Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Bathula"
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-3 focus:ring-blue-500/15 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-3 focus:ring-blue-500/15 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="e.g. 93473 79041"
                        className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-3 focus:ring-blue-500/15 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Degree
                    </label>
                    <select
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-3 focus:ring-blue-500/15 focus:border-blue-600 transition-all cursor-pointer"
                    >
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-arzon-dark="true"
                    style={{
                      backgroundColor: "#0f172a",
                      color: "#ffffff",
                      WebkitTextFillColor: "#ffffff",
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 !bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white !text-white font-medium text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                        Preparing guide…
                      </span>
                    ) : (
                      <>
                        <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                          Get Free Field Guide (PDF)
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 stroke-[2.2]" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                    <span>Instant PDF download · Zero spam</span>
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="text-slate-400 hover:text-slate-600 underline cursor-pointer"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Apple Minimalist Delivery View */
            <div className="text-center space-y-3.5">
              <div className="space-y-1">
                <div className="mx-auto w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  Your Field Guide is Ready
                </h3>

                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Download started. Backup copy sent to{" "}
                  <span className="font-medium text-slate-800">{email}</span>.
                </p>
              </div>

              {/* Primary Asset Card: High-contrast Apple File Tile */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-left space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    data-arzon-dark="true"
                    style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                    className="w-9 h-9 rounded-lg bg-slate-900 !bg-slate-900 text-white !text-white flex items-center justify-center shrink-0 shadow-xs"
                  >
                    <FileText className="w-4 h-4 stroke-[1.75]" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-xs text-slate-900 truncate">
                        2026 Pharmacovigilance Field Guide
                      </h4>
                      <span className="text-[9px] font-medium text-slate-500 bg-slate-200/60 px-1 py-0.2 rounded shrink-0">
                        PDF
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      40+ CRO directory · Salary benchmarks · Interview Q&amp;A
                    </p>
                  </div>
                </div>

                {/* Indestructible High-Contrast Action Buttons */}
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href="/Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                    download="Arzon_2026_Healthcare_Career_Starter_Kit.pdf"
                    data-arzon-dark="true"
                    style={{
                      backgroundColor: "#0f172a",
                      color: "#ffffff",
                      WebkitTextFillColor: "#ffffff",
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-900 !bg-slate-900 hover:bg-slate-800 text-white !text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.99] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.2]" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                    <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Download PDF</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      try {
                        generateStarterKitPDF({ candidateName: fullName, degree: highestQualification });
                        toast.success("Personalized PDF generated!");
                      } catch (e) {
                        console.error("Personalized PDF failed", e);
                      }
                    }}
                    className="py-2 px-2.5 rounded-lg border border-slate-200 bg-white card-light hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs shrink-0"
                    title="Generate custom PDF stamped with your profile"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Personalized</span>
                  </button>
                </div>
              </div>

              {/* Complimentary Simulation Pass Banner */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5 flex items-center justify-between gap-2 text-left">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Laptop className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-semibold text-xs text-slate-900 truncate">
                      Clinical Simulation Pass
                    </h5>
                    <p className="text-[10px] text-slate-500 truncate">
                      Case triage &amp; standardized coding pass
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  data-arzon-dark="true"
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    WebkitTextFillColor: "#ffffff",
                  }}
                  onClick={() => {
                    setIsOpen(false);
                    navigate({ to: "/career-assessment" });
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-md bg-blue-600 !bg-blue-600 hover:bg-blue-700 text-white !text-white font-medium text-xs transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Launch</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.2]" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                </button>
              </div>

              {/* Footer Dismiss Control */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[11px] text-slate-400">Auto-closing in a moment</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1 px-2.5 rounded-md hover:bg-slate-100"
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
