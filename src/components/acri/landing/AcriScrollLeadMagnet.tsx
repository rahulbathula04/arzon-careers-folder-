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
  Briefcase,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
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

export function AcriScrollLeadMagnet() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const applyCandidate = useServerFn(applyAcriCandidateFn);
  const submitApp = useServerFn(submitApplication);
  const submitStarterKit = useServerFn(submitCareerStarterKitLead);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

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

  // Section 2 Crossing Trigger Engine (Active for EVERY visitor on EVERY visit)
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

    // Force-open listener for developer console helper window.__openLeadMagnet()
    const handleForceOpen = () => {
      hasTriggeredRef.current = false;
      userDismissedThisViewRef.current = false;
      triggerCard("window_helper_force_open");
    };
    window.addEventListener("arzon:open-lead-magnet", handleForceOpen);

    // Reset listener for developer console helper window.__resetLeadMagnet()
    const handleReset = () => {
      hasTriggeredRef.current = false;
      userDismissedThisViewRef.current = false;
    };
    window.addEventListener("arzon:reset-lead-magnet", handleReset);

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
        if (el) {
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

      if (sections.length >= 2) {
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

    // Signal 4: Intersection Observer on Section 2 (fires the instant Section 2 touches viewport)
    const attachObserver = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, #app-scroll-root section, section, .arzon-v2-container")
      ).filter((s) => s.offsetHeight > 80 && s.offsetParent !== null);

      if (sections.length >= 2 && typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                triggerCard("crossed_section_2_observer");
                return;
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
      window.removeEventListener("arzon:open-lead-magnet", handleForceOpen);
      window.removeEventListener("arzon:reset-lead-magnet", handleReset);
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

      // 1. Sync to Admin Applications Pipeline (/admin/applications)
      try {
        await submitApp({
          data: {
            name: fullName.trim(),
            email: userEmail,
            phone: cleanPhone,
            programSlug: "2026-healthcare-career-intelligence-guide",
            programName: "The Healthcare Career Intelligence Guide 2026",
            whatsappOptin: consentCommunications,
            degree: highestQualification,
            notes: JSON.stringify({
              source: "scroll_lead_magnet_v2",
              asset: "The_Healthcare_Career_Intelligence_Guide_2026",
              qualification: highestQualification,
              submittedAt: new Date().toISOString(),
            }),
            utmSource: "career-intelligence-guide-lead-magnet",
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] Admin applications pipeline sync notice:", err);
      }

      // 2. Sync to ACRI Candidate Store (/admin/acri)
      try {
        await applyCandidate({
          data: {
            fullName: fullName.trim(),
            email: userEmail,
            mobile: cleanPhone,
            highestQualification,
            collegeUniversity: "Lead Magnet Applicant",
            currentlyWorking: "no",
          },
        });
      } catch (err) {
        console.warn("[AcriScrollLeadMagnet] ACRI candidates sync notice:", err);
      }

      // 3. Sync to Career Starter Kit Leads (/admin/leads)
      try {
        await submitStarterKit({
          data: {
            name: fullName.trim(),
            email: userEmail,
            phone: cleanPhone,
            qualification: highestQualification,
            whatsappOptin: consentCommunications,
            sourcePath: pathname,
            clientFp,
            utmSource: "career-intelligence-guide-lead-magnet",
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
        downloadAnchor.download = "The_Healthcare_Career_Intelligence_Guide_2026.pdf";
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
      toast.success("2026 Career Intelligence Guide unlocked! Download starting.");

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
        className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:right-6 sm:inset-x-auto z-[99] w-full sm:w-[440px] sm:max-w-[440px] pointer-events-auto"
        role="region"
        aria-label="The Healthcare Career Intelligence Guide 2026 Offer"
      >
        <div
          className="relative rounded-t-3xl sm:rounded-2xl bg-white card-light tone-light border border-slate-200/95 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.18),0_20px_50px_-10px_rgba(0,0,0,0.25)] overflow-hidden font-sans text-slate-900 motion-safe:animate-in motion-safe:slide-in-from-bottom-6 duration-300 max-h-[90vh] overflow-y-auto"
        >
          {/* Mobile Drag Notch Indicator */}
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

          {/* Top Brand Indicator Bar (Deep Navy to Arzon Blue Gradient) */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#081F38] via-[#2563EB] to-[#10B981]" />

          {/* Circular Close Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors z-20 flex items-center justify-center cursor-pointer shadow-2xs"
            aria-label="Dismiss offer"
            title="Close"
          >
            <X className="h-4 w-4 stroke-[2.2]" />
          </button>

          {/* Card Body */}
          <div className="p-5 sm:p-6">
            {step === "form" ? (
              <div>
                {/* Header Badge & Title */}
                <div className="text-left mb-3.5 pr-8">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] mb-2">
                    <Sparkles className="h-3 w-3 text-[#2563EB]" />
                    <span>⭐ 2026 OFFICIAL RELEASE · FREE 21-PAGE GUIDE</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#081F38] leading-tight">
                    The Healthcare Career Intelligence Guide 2026
                  </h3>

                  <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                    From your degree to your first industry job. 6 career pathways, 30-day action plan, and job-readiness checklist for B.Pharm, Pharm.D, M.Pharm &amp; life sciences.
                  </p>
                </div>

                {/* 3 High-Value Visual Proof Pillars */}
                <div className="mb-4 grid grid-cols-3 gap-1.5 rounded-xl border border-blue-100 bg-[#F8FAFC] p-2 text-center">
                  <div className="flex flex-col items-center justify-center p-1">
                    <Briefcase className="h-4 w-4 text-[#2563EB] mb-1" />
                    <span className="text-[11px] font-bold text-[#081F38]">6 Pathways</span>
                    <span className="text-[9px] text-[#64748B] leading-none mt-0.5">PV, CDM, RA &amp; More</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-x border-slate-200/80 p-1">
                    <BookOpen className="h-4 w-4 text-[#10B981] mb-1" />
                    <span className="text-[11px] font-bold text-[#081F38]">30-Day Plan</span>
                    <span className="text-[9px] text-[#64748B] leading-none mt-0.5">Action Roadmap</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1">
                    <ShieldCheck className="h-4 w-4 text-[#7C3AED] mb-1" />
                    <span className="text-[11px] font-bold text-[#081F38]">Checklist</span>
                    <span className="text-[9px] text-[#64748B] leading-none mt-0.5">Readiness Audit</span>
                  </div>
                </div>

                {/* Streamlined Capture Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="Your WhatsApp number"
                          className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Degree / Qualification
                      </label>
                      <select
                        value={highestQualification}
                        onChange={(e) => setHighestQualification(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all cursor-pointer"
                      >
                        {QUALIFICATIONS.map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-8 pr-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary High-Impact CTA Button */}
                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Preparing 2026 Guide…</span>
                      ) : (
                        <>
                          <span>Download Free 2026 Guide (PDF)</span>
                          <ArrowRight className="h-4 w-4 stroke-[2.2]" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5 px-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 inline" /> Instant PDF · Zero Spam
                      </span>
                      <button
                        type="button"
                        onClick={handleDismiss}
                        className="text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer transition-colors"
                      >
                        Not now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Success / Delivery State */
              <div className="text-center space-y-4 py-2">
                <div className="space-y-1.5">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 ring-4 ring-emerald-50/60">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#081F38]">
                    Your 2026 Career Intelligence Guide is Ready!
                  </h3>

                  <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
                    Download has started. WhatsApp confirmation sent to{" "}
                    <span className="font-semibold text-slate-800">{mobile || "your number"}</span>.
                  </p>
                </div>

                {/* Primary Asset Download Tile */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3.5 text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#081F38] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-5 h-5 text-blue-200" />
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
                        21-page official release · 6 career pathways · 30-day action plan
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                    <a
                      href="/The_Healthcare_Career_Intelligence_Guide_2026.pdf"
                      download="The_Healthcare_Career_Intelligence_Guide_2026.pdf"
                      className="w-full sm:flex-1 py-2.5 px-3 rounded-full bg-[#081F38] hover:bg-[#0f2d52] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.99] cursor-pointer"
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
                      className="w-full sm:w-auto py-2.5 px-3.5 rounded-full border border-slate-200 bg-white card-light hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Stamp My Name</span>
                    </button>
                  </div>
                </div>

                {/* Complimentary Role Assessment Invitation */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 flex items-center justify-between gap-3 text-left">
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-[#081F38]">
                      Free Role Match Assessment
                    </h5>
                    <p className="text-[11px] text-[#64748B]">
                      See if your aptitude matches Pharmacovigilance or CDM
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate({ to: "/career-engine/start" });
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-slate-400">Auto-closing shortly</span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-slate-100"
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
