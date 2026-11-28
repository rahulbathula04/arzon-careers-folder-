import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  X,
  Download,
  ArrowRight,
  FileText,
  Check,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { useServerFn } from "@tanstack/react-start";
import { logAcriFunnelEvent } from "@/lib/acri/acriCandidateStore";
import { submitCareerStarterKitLead } from "@/lib/careerStarterKit.functions";
import {
  isEligibleForLeadCapture,
  markLeadAsConverted,
  markLeadAsDismissed,
  isDebugModeActive,
  STORAGE_KEYS,
} from "@/lib/lead-capture-rules";
import { toast } from "sonner";

const QUALIFICATIONS = [
  "B.Pharm (Bachelor of Pharmacy)",
  "M.Pharm (Pharmacology / Clinical / Pharmaceutics)",
  "Pharm.D (Doctor of Pharmacy)",
  "MBBS / Medical Graduate",
  "BDS / Dental Graduate",
  "B.Sc / M.Sc Life Sciences / Biotechnology",
  "B.Sc / M.Sc Nursing / Allied Health",
  "Other Healthcare / Science Degree",
];

export interface OpenLeadMagnetOptions {
  roleTitle?: string;
  source?: string;
}

/**
 * Universal programmatic helper to trigger the lead magnet / role blueprint modal.
 */
export function openLeadMagnetModal(options?: OpenLeadMagnetOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("arzon:open-lead-magnet", { detail: options || {} })
    );
  }
}

export function AcriScrollLeadMagnet() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const submitStarterKit = useServerFn(submitCareerStarterKitLead);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [targetRole, setTargetRole] = useState<string | null>(null);

  // Pre-populate if student entered details previously in this browser
  const [fullName, setFullName] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const p = localStorage.getItem("arzon_acri_candidate_profile");
      if (p) {
        const parsed = JSON.parse(p);
        if (parsed?.fullName) return parsed.fullName;
      }
      const c = localStorage.getItem("arzon_candidate_profile");
      if (c) {
        const parsed = JSON.parse(c);
        if (parsed?.name) return parsed.name;
      }
    } catch {}
    return "";
  });

  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const e = localStorage.getItem("arzon_user_email");
      if (e) return e;
      const p = localStorage.getItem("arzon_acri_candidate_profile");
      if (p) {
        const parsed = JSON.parse(p);
        if (parsed?.email) return parsed.email;
      }
    } catch {}
    return "";
  });

  const [mobile, setMobile] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const p = localStorage.getItem("arzon_acri_candidate_profile");
      if (p) {
        const parsed = JSON.parse(p);
        if (parsed?.mobile) return parsed.mobile;
      }
    } catch {}
    return "";
  });

  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentCommunications, setConsentCommunications] = useState(true);

  const hasTriggeredRef = useRef(false);
  const userDismissedThisViewRef = useRef(false);
  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up auto-dismiss timer on unmount
  useEffect(() => {
    return () => {
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }
    };
  }, []);

  // 1. Permanent User-Action Trigger Engine (Always Active for button clicks across ANY route/session)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleForceOpen = (e?: Event) => {
      const detail = (e as CustomEvent)?.detail;
      setTargetRole(detail?.roleTitle || null);
      setStep("form");
      setIsOpen(true);
      userDismissedThisViewRef.current = false;
      hasTriggeredRef.current = true;
      logAcriFunnelEvent("lead_magnet_triggered", {
        trigger_reason: detail?.source || "user_action_button",
        pathname,
      });
    };

    const handleReset = () => {
      hasTriggeredRef.current = false;
      userDismissedThisViewRef.current = false;
    };

    window.addEventListener("arzon:open-lead-magnet", handleForceOpen);
    window.addEventListener("arzon:reset-lead-magnet", handleReset);
    (window as any).__openLeadMagnet = (roleTitle?: string) => {
      handleForceOpen({ detail: { roleTitle, source: "window_helper" } } as any);
    };

    return () => {
      window.removeEventListener("arzon:open-lead-magnet", handleForceOpen);
      window.removeEventListener("arzon:reset-lead-magnet", handleReset);
      delete (window as any).__openLeadMagnet;
    };
  }, [pathname]);

  // 2. Section 2 Crossing Trigger Engine (Active for EVERY visitor on EVERY visit)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reset trigger refs on route change so returning visitors always get the prompt
    hasTriggeredRef.current = false;
    userDismissedThisViewRef.current = false;

    // Rule check: is route eligible? (only disabled on active test exams & admin)
    if (!isEligibleForLeadCapture(pathname)) {
      return;
    }

    const isDebugForce = isDebugModeActive();

    let triggerTimeout: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerCard = (reason: string) => {
      if (hasTriggeredRef.current || userDismissedThisViewRef.current) return;
      hasTriggeredRef.current = true;

      // Small 150ms delay so scroll animation settles naturally
      triggerTimeout = setTimeout(() => {
        setIsOpen(true);
        logAcriFunnelEvent("lead_magnet_triggered", {
          trigger_reason: reason,
          pathname,
        });
      }, 150);
    };

    // Instant debug trigger if ?debug, ?popup, ?leadmagnet etc.
    if (isDebugForce) {
      const debugTimer = setTimeout(() => {
        triggerCard("debug_url_parameter");
      }, 150);
      return () => clearTimeout(debugTimer);
    }

    // Multi-signal Section 2 crossing evaluation
    const evaluateSectionCrossing = () => {
      if (hasTriggeredRef.current || userDismissedThisViewRef.current) return;

      const scrollRoot = document.getElementById("app-scroll-root");
      const rootScroll = scrollRoot ? scrollRoot.scrollTop : 0;
      const winScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const effectiveScrollY = Math.max(rootScroll, winScroll);

      // Signal 1: Depth crossing (> 150px means user scrolled past Hero into Section 2)
      if (effectiveScrollY >= 150) {
        triggerCard("crossed_section_2_scroll");
        return;
      }

      // Signal 2: Landmark element viewport crossing (e.g. #career-paths, #priority-tracks)
      const landmarkSelectors = [
        "#career-paths",
        "#priority-tracks",
        "main section:nth-of-type(2)",
        "#app-scroll-root section:nth-of-type(2)",
        ".arzon-v2-container",
      ];
      for (const sel of landmarkSelectors) {
        const el = document.querySelector<HTMLElement>(sel);
        if (el && effectiveScrollY >= 100) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.95 && rect.bottom > 0) {
            triggerCard("crossed_section_2_landmark");
            return;
          }
        }
      }

      // Signal 3: Physical Section 2 viewport entry via generic sections
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, #app-scroll-root section, section, .arzon-v2-container")
      ).filter((s) => s.offsetHeight > 80 && s.offsetParent !== null);

      if (sections.length >= 2 && effectiveScrollY >= 100) {
        const rect = sections[1].getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.95) {
          triggerCard("crossed_section_2_view");
          return;
        }
      }
    };

    // Attach comprehensive scroll & interaction listeners (capture phase ensures inner scrollers are caught)
    const scrollRoot = document.getElementById("app-scroll-root");
    scrollRoot?.addEventListener("scroll", evaluateSectionCrossing, { passive: true });
    window.addEventListener("scroll", evaluateSectionCrossing, { passive: true, capture: true });
    document.addEventListener("scroll", evaluateSectionCrossing, { passive: true, capture: true });
    window.addEventListener("touchmove", evaluateSectionCrossing, { passive: true });
    window.addEventListener("wheel", evaluateSectionCrossing, { passive: true });

    // Signal 4: Intersection Observer on Section 2 (fires when user scrolls into Section 2)
    const attachObserver = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, #app-scroll-root section, section, .arzon-v2-container")
      ).filter((s) => s.offsetHeight > 80 && s.offsetParent !== null);

      if (sections.length >= 2 && typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                const scrollRoot = document.getElementById("app-scroll-root");
                const rootScroll = scrollRoot ? scrollRoot.scrollTop : 0;
                const winScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
                const effectiveScrollY = Math.max(rootScroll, winScroll);
                // Require active scroll past top of hero before observer triggers
                if (effectiveScrollY >= 100) {
                  triggerCard("crossed_section_2_observer");
                  return;
                }
              }
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(sections[1]);
      }
    };
    attachObserver();

    // Signal 5: Desktop Exit Intent (cursor leaves top of browser after 3s)
    const handleMouseOut = (e: MouseEvent) => {
      if (hasTriggeredRef.current || userDismissedThisViewRef.current) return;
      if (e.relatedTarget === null && e.clientY <= 0) {
        triggerCard("desktop_exit_intent");
      }
    };
    document.addEventListener("mouseout", handleMouseOut);

    // Fallback: If user stays on page 15s without scrolling
    fallbackTimer = setTimeout(() => {
      if (!hasTriggeredRef.current && !userDismissedThisViewRef.current) {
        triggerCard("page_dwell_fallback");
      }
    }, 15000);

    // Initial staggered checks on mount in case already scrolled
    const timer1 = setTimeout(evaluateSectionCrossing, 200);
    const timer2 = setTimeout(evaluateSectionCrossing, 600);
    const timer3 = setTimeout(evaluateSectionCrossing, 1200);

    const cleanup = () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (triggerTimeout) clearTimeout(triggerTimeout);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      scrollRoot?.removeEventListener("scroll", evaluateSectionCrossing);
      window.removeEventListener("scroll", evaluateSectionCrossing, true);
      document.removeEventListener("scroll", evaluateSectionCrossing, true);
      window.removeEventListener("touchmove", evaluateSectionCrossing);
      window.removeEventListener("wheel", evaluateSectionCrossing);
      document.removeEventListener("mouseout", handleMouseOut);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };

    return cleanup;
  }, [pathname]);

  // Handle ESC key to dismiss
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
    userDismissedThisViewRef.current = true;
    setIsOpen(false);
    markLeadAsDismissed();
    logAcriFunnelEvent("lead_magnet_dismissed", { pathname });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim()) {
      toast.error("Please enter your name and WhatsApp number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanPhoneDigits = mobile.replace(/\D/g, "");
      const cleanPhone = cleanPhoneDigits.length >= 10 ? cleanPhoneDigits.slice(-10) : mobile.trim();
      const userEmail = email.trim() || `${cleanPhone}@arzoncandidate.local`;
      const clientFp = ("lead-magnet-" + Date.now() + "-" + Math.random().toString(36).substring(2)).slice(0, 32);

      // Single Canonical Lead Write: Sync to Career Starter Kit Leads (/admin/leads)
      try {
        await submitStarterKit({
          data: {
            name: fullName.trim(),
            email: userEmail,
            phone: cleanPhone,
            qualification: highestQualification,
            targetRole: targetRole || undefined,
            whatsappOptin: consentCommunications,
            sourcePath: pathname,
            clientFp,
            utmSource: targetRole
              ? `role-${targetRole.toLowerCase().replace(/\s+/g, "-")}`
              : "career-intelligence-guide-lead-magnet",
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] Career engine leads sync notice:", err);
      }

      // Mark lead as converted
      markLeadAsConverted({
        fullName: fullName.trim(),
        email: userEmail,
        mobile: cleanPhone,
        qualification: highestQualification,
      });

      // Auto-trigger browser download of the verified 2026 PDF
      try {
        const downloadAnchor = document.createElement("a");
        downloadAnchor.href = "/The_Healthcare_Career_Intelligence_Guide_2026.pdf";
        downloadAnchor.download = targetRole
          ? `${targetRole.replace(/\s+/g, "_")}_Blueprint_2026.pdf`
          : "The_Healthcare_Career_Intelligence_Guide_2026.pdf";
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
      } catch (dlErr) {
        console.warn("[AcriScrollLeadMagnet] Auto-download triggered via manual fallback:", dlErr);
      }

      setStep("success");
      logAcriFunnelEvent("lead_magnet_submitted", {
        email: userEmail,
        qualification: highestQualification,
      });
      toast.success(
        targetRole
          ? `${targetRole} Blueprint unlocked! Download starting.`
          : "2026 Career Intelligence Guide unlocked! Download starting."
      );

      // Auto-dismiss success card after 8s so it doesn't trap the screen
      autoDismissTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 8000);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render when open (never permanently blocked by past conversions)
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop Overlay (gentle focus on mobile, dismissible by tapping) */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-2xs z-[98] sm:hidden motion-safe:animate-in motion-safe:fade-in duration-200"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Main Container: Mobile Bottom Drawer / Desktop Bottom-Right Card */}
      <aside
        data-lead-magnet-active="true"
        data-fab-avoid="true"
        className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:right-6 sm:inset-x-auto z-[99] w-full sm:w-[420px] sm:max-w-[420px] pointer-events-auto"
        role="region"
        aria-label="The Healthcare Career Intelligence Guide 2026 Offer"
      >
        <div
          className="relative rounded-t-2xl sm:rounded-2xl bg-white card-light tone-light border border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.12),0_16px_40px_rgba(0,0,0,0.16)] overflow-hidden font-sans text-slate-900 motion-safe:animate-in motion-safe:slide-in-from-bottom-4 duration-300 max-h-[92vh] overflow-y-auto"
        >
          {/* Mobile Drag Notch Indicator */}
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-2.5 mb-0.5 sm:hidden" />

          {/* Minimal Close Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 flex items-center justify-center cursor-pointer"
            aria-label="Dismiss offer"
            title="Close"
          >
            <X className="h-4 w-4 stroke-[2]" />
          </button>

          {/* Card Body */}
          <div className="p-5 sm:p-6">
            {step === "form" ? (
              <div>
                {/* Minimal Header Badge & Title */}
                <div className="text-left mb-3 pr-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{targetRole ? "Official Role Dossier · 2026 Edition" : "Free PDF Guide · 2026 Edition"}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#081F38] leading-snug">
                    {targetRole ? `${targetRole} Blueprint 2026` : "The Healthcare Career Intelligence Guide"}
                  </h3>

                  <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                    {targetRole
                      ? `Day-1 operational tasks, enterprise tool stack, and top 25 technical interview questions for ${targetRole}.`
                      : "From your degree to your first industry job: 6 career pathways, a 30-day preparation roadmap, and industry readiness checklist."}
                  </p>
                </div>

                {/* Minimal Feature Highlights */}
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 border-y border-slate-100 py-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="font-medium text-slate-800">{targetRole ? "Day-1 Tasks" : "6 Core Pathways"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="font-medium text-slate-800">{targetRole ? "Interview Pack" : "30-Day Roadmap"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="font-medium text-slate-800">{targetRole ? "Tool Workflows" : "Readiness Audit"}</span>
                  </span>
                </div>

                {/* Streamlined Clean Capture Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white tone-light hover:border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 text-xs text-slate-900 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white tone-light hover:border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 text-xs text-slate-900 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Degree / Qualification
                      </label>
                      <select
                        value={highestQualification}
                        onChange={(e) => setHighestQualification(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white tone-light hover:border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 text-xs text-slate-900 focus:outline-none transition-all cursor-pointer"
                      >
                        {QUALIFICATIONS.map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Email Address <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white tone-light hover:border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 text-xs text-slate-900 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Primary Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 sm:py-3 rounded-lg bg-[#081F38] hover:bg-[#0f2d52] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Preparing 2026 Blueprint…</span>
                      ) : (
                        <>
                          <span>{targetRole ? `Get ${targetRole} Blueprint (WhatsApp)` : "Download Free Guide (PDF)"}</span>
                          <ArrowRight className="h-4 w-4 stroke-[2]" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-0.5">
                      <span className="flex items-center gap-1 text-slate-500">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 inline" /> Instant PDF · Zero Spam
                      </span>
                      <button
                        type="button"
                        onClick={handleDismiss}
                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        Maybe later
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Success / Delivery State */
              <div className="text-center space-y-4 py-2">
                <div className="space-y-1.5">
                  <div className="mx-auto w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 ring-4 ring-emerald-50/60">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#081F38]">
                    Your 2026 Career Guide is Ready!
                  </h3>

                  <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
                    Download has started. WhatsApp confirmation sent to{" "}
                    <span className="font-semibold text-slate-800">{mobile || "your number"}</span>.
                  </p>
                </div>

                {/* Primary Asset Download Tile */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3.5 text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#081F38] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-4 h-4 text-blue-200" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-[#081F38] truncate">
                          The Healthcare Career Intelligence Guide 2026
                        </h4>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                          PDF
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                        21-page release · 6 career pathways · 30-day plan
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-0.5">
                    <a
                      href="/The_Healthcare_Career_Intelligence_Guide_2026.pdf"
                      download="The_Healthcare_Career_Intelligence_Guide_2026.pdf"
                      className="w-full sm:flex-1 py-2 px-3 rounded-lg bg-[#081F38] hover:bg-[#0f2d52] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.99] cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Again</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        try {
                          generateStarterKitPDF({ candidateName: fullName, degree: highestQualification });
                          toast.success("Personalized PDF stamped with your name!");
                        } catch (e) {
                          console.error("Personalized PDF failed", e);
                        }
                      }}
                      className="w-full sm:w-auto py-2 px-3 rounded-lg border border-slate-200 bg-white card-light hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Stamp My Name</span>
                    </button>
                  </div>
                </div>

                {/* Complimentary Role Assessment Invitation */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between gap-3 text-left">
                  <div className="min-w-0">
                    <h5 className="font-semibold text-xs text-[#081F38]">
                      Free Role Match Assessment
                    </h5>
                    <p className="text-[11px] text-[#64748B]">
                      Identify whether your background best fits PV, CDM, or Medical Affairs
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate({ to: "/career-engine/start" });
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <span>Start</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-slate-400">Auto-closing shortly</span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-slate-100"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
