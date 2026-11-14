import { useState, useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  X,
  Phone,
  Check,
  ArrowRight,
  MessageCircle,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitFastCounsellorLead } from "@/lib/workshop.functions";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY } from "@/components/landing/constants";
import { track } from "@/lib/track";
import { toast } from "sonner";

export const PROGRAMME_OPTIONS = [
  "Pharmacovigilance & Drug Safety",
  "Clinical Data Management (CDM)",
  "Regulatory Affairs & Documentation",
  "Medical Coding & Clinical Informatics",
  "Clinical SAS & Biostatistics",
  "Bioinformatics & Genomics",
  "Digital Health & Clinical AI",
  "General Healthcare Career Guidance (Help Me Choose)",
] as const;

export const QUALIFICATION_OPTIONS = [
  "B.Pharm (Bachelor of Pharmacy)",
  "Pharm.D (Doctor of Pharmacy)",
  "M.Pharm (Pharmacology / Clinical / Pharmaceutics)",
  "MBBS / Medical Graduate",
  "BDS / Dental Graduate",
  "B.Sc / M.Sc Life Sciences / Biotechnology / Microbiology",
  "B.Sc / M.Sc Nursing / Allied Health Sciences",
  "Other Healthcare / Science Degree",
] as const;

export interface OpenCounsellorModalOptions {
  programme?: string;
  source?: string;
  degree?: string;
  question?: string;
}

/**
 * Universal global trigger helper.
 * Opens the 1-Field Instant WhatsApp Bridge from any CTA on the platform.
 */
export function openCounsellorModal(options?: OpenCounsellorModalOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("arzon:open-counsellor-modal", { detail: options || {} })
    );
  }
}

interface CachedCandidateMeta {
  phone: string;
  name: string;
  email: string;
  college: string;
  degree: string;
}

function readCachedCandidateMeta(): CachedCandidateMeta {
  const empty: CachedCandidateMeta = {
    phone: "",
    name: "",
    email: "",
    college: "",
    degree: "",
  };
  if (typeof window === "undefined") return empty;

  try {
    const sources = [
      localStorage.getItem("arzon_acri_candidate_profile"),
      localStorage.getItem("ce_profile") || sessionStorage.getItem("ce_profile"),
      localStorage.getItem("arzon_candidate_profile"),
    ];
    for (const raw of sources) {
      if (!raw) continue;
      const p = JSON.parse(raw);
      if (!p || typeof p !== "object") continue;
      if (!empty.phone && (p.mobile || p.phone)) {
        const clean = String(p.mobile || p.phone).replace(/\D/g, "").slice(-10);
        if (clean.length === 10) empty.phone = clean;
      }
      if (!empty.name && (p.fullName || p.name)) empty.name = String(p.fullName || p.name);
      if (!empty.email && p.email) empty.email = String(p.email);
      if (!empty.college && (p.college || p.collegeUniversity)) {
        empty.college = String(p.college || p.collegeUniversity);
      }
      if (!empty.degree && (p.degree || p.highestQualification)) {
        empty.degree = String(p.degree || p.highestQualification);
      }
    }
  } catch {
    // Ignore storage read errors
  }

  return empty;
}

function inferProgrammeFromPath(pathname: string): string {
  const p = pathname.toLowerCase();
  if (p.includes("pv-associate") || p.includes("pharmacovigilance")) {
    return "Pharmacovigilance & Drug Safety";
  }
  if (p.includes("bioinformatics")) return "Bioinformatics & Genomics";
  if (p.includes("clinical-data-management") || p.includes("cdm")) {
    return "Clinical Data Management (CDM)";
  }
  if (p.includes("regulatory-affairs")) return "Regulatory Affairs & Documentation";
  if (p.includes("medical-coding")) return "Medical Coding & Clinical Informatics";
  if (p.includes("clinical-sas")) return "Clinical SAS & Biostatistics";
  if (p.includes("industry-network")) return "Arzon Global Industry Network Programme";
  if (p.includes("acri")) return "ACRI Clinical Readiness Assessment";
  return "Healthcare Career Guidance";
}

export function CounsellorLeadModal() {
  const { pathname } = useLocation();
  const submitFastLead = useServerFn(submitFastCounsellorLead);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"bridge" | "success">("bridge");
  const [sourceTag, setSourceTag] = useState("direct_counsellor_cta");
  const [programme, setProgramme] = useState<string>("Healthcare Career Guidance");
  const [cachedMeta, setCachedMeta] = useState<CachedCandidateMeta>(() => readCachedCandidateMeta());
  const [phone, setPhone] = useState<string>(() => readCachedCandidateMeta().phone);
  const [wasPrefilled, setWasPrefilled] = useState<boolean>(() => Boolean(readCachedCandidateMeta().phone));
  const [extraQuestion, setExtraQuestion] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resolvedWaUrl, setResolvedWaUrl] = useState<string>("");

  // Listen to global trigger event and refresh prefill from storage
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<OpenCounsellorModalOptions>;
      const detail = customEvent.detail || {};

      const meta = readCachedCandidateMeta();
      setCachedMeta(meta);
      if (meta.phone) {
        setPhone(meta.phone);
        setWasPrefilled(true);
      } else {
        setWasPrefilled(false);
      }

      setSourceTag(detail.source || "direct_counsellor_cta");
      setProgramme(detail.programme || inferProgrammeFromPath(pathname));
      setExtraQuestion(detail.question || "");
      setStep("bridge");
      setIsOpen(true);

      try {
        track("whatsapp_bridge_opened", {
          props: {
            source: detail.source || "direct_counsellor_cta",
            pathname,
            prefilled: Boolean(meta.phone),
          },
        });
      } catch {
        // Never block UI
      }
    };

    window.addEventListener("arzon:open-counsellor-modal", handleOpen);
    return () => window.removeEventListener("arzon:open-counsellor-modal", handleOpen);
  }, [pathname]);

  // Autofocus phone input smoothly when modal opens
  useEffect(() => {
    if (!isOpen || step !== "bridge") return;
    const t = setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 80);
    return () => clearTimeout(t);
  }, [isOpen, step]);

  // ESC key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll while active
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const buildFallbackWhatsAppUrl = (digits10: string) => {
    const greetingName = cachedMeta.name ? `My name is ${cachedMeta.name} and my ` : "My ";
    const text = encodeURIComponent(
      `Hi Arzon Team! ${greetingName}WhatsApp number is +91 ${digits10}. I am interested in ${programme} and would like to talk to an expert.`
    );
    return `https://wa.me/${COUNSELLOR_PHONE}?text=${text}`;
  };

  const launchWhatsApp = (url: string) => {
    try {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.assign(url);
      } else {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (!win || win.closed) {
          window.location.assign(url);
        }
      }
    } catch {
      window.location.assign(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = phone.replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      toast.error("Please enter a valid 10-digit WhatsApp number.");
      phoneInputRef.current?.focus();
      return;
    }

    const digits10 = cleanDigits.slice(-10);
    setIsSubmitting(true);

    // Cache number in localStorage for future 1-tap pre-fill
    try {
      const prev = JSON.parse(localStorage.getItem("arzon_candidate_profile") || "{}");
      localStorage.setItem(
        "arzon_candidate_profile",
        JSON.stringify({
          ...prev,
          phone: digits10,
          name: cachedMeta.name || prev.name || "",
          email: cachedMeta.email || prev.email || "",
          college: cachedMeta.college || prev.college || "",
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage errors
    }

    let targetWaUrl = buildFallbackWhatsAppUrl(digits10);

    try {
      const res = await submitFastLead({
        data: {
          name: cachedMeta.name || "WhatsApp Direct Lead",
          phone: digits10,
          email: cachedMeta.email || "",
          college: cachedMeta.college || "Direct WhatsApp CTA",
          degree: cachedMeta.degree || "Healthcare Graduate",
          source: sourceTag || "whatsapp_fast_bridge",
          programName: programme,
          question: extraQuestion || `Instant WhatsApp Connect from ${pathname} (+91 ${digits10})`,
        },
      });
      if (res?.whatsappLink) {
        targetWaUrl = res.whatsappLink;
      }
    } catch (err) {
      console.warn("[WhatsAppBridge] Lead sync fallback active:", err);
    }

    try {
      track("whatsapp_click", {
        props: {
          source: sourceTag,
          pathname,
          programme,
          bridge: "1_field_fast_bridge",
        },
      });
    } catch {
      // Never block redirect
    }

    setResolvedWaUrl(targetWaUrl);
    setStep("success");
    setIsSubmitting(false);
    toast.success("Opening WhatsApp chat with Arzon Expert...");
    launchWhatsApp(targetWaUrl);
  };

  if (!isOpen) return null;

  const cleanDigits = phone.replace(/\D/g, "");
  const isPhoneValid = cleanDigits.length >= 10;
  const displayWaUrl =
    resolvedWaUrl || buildFallbackWhatsAppUrl(cleanDigits.slice(-10) || "0000000000");

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-testid="counsellor-lead-modal"
      aria-label="Connect with Arzon Experts on WhatsApp"
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Compact WhatsApp Bridge Surface */}
      <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white card-light tone-light border border-slate-200 shadow-2xl overflow-hidden font-sans text-slate-900 z-10 motion-safe:animate-in motion-safe:slide-in-from-bottom-6 sm:motion-safe:zoom-in-95 duration-200">
        {/* Mobile Drag Notch Indicator */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        {/* Top Brand Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#081F38] via-[#2563EB] to-[#10B981]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer shadow-2xs z-20"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 stroke-[2.2]" />
        </button>

        <div className="p-6 sm:p-7">
          {step === "bridge" ? (
            <div>
              {/* Header */}
              <div className="text-left mb-5 pr-8">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F7F1] border border-[#10B981]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#047857] mb-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] motion-safe:animate-pulse" />
                  <span>INSTANT WHATSAPP CONNECT</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#081F38] leading-tight">
                  Talk to Experts on WhatsApp
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Enter your WhatsApp number below and we&apos;ll connect you directly for{" "}
                  <span className="font-semibold text-[#081F38]">{programme}</span>.
                </p>
              </div>

              {/* Single-Field Instant WhatsApp Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="whatsapp-bridge-phone"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    WhatsApp Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="inline-flex items-center gap-1.5 pl-3.5 pr-2.5 py-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs sm:text-sm font-bold text-[#081F38] select-none">
                      <Phone className="h-3.5 w-3.5 text-[#10B981]" />
                      <span>+91</span>
                    </span>
                    <input
                      ref={phoneInputRef}
                      id="whatsapp-bridge-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      required
                      maxLength={14}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter 10-digit WhatsApp number"
                      className="w-full px-3.5 py-3.5 rounded-r-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-sm sm:text-base font-semibold tracking-wide text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#10B981]/25 focus:border-[#10B981] transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400"
                    />
                  </div>
                  {wasPrefilled && isPhoneValid ? (
                    <p className="mt-1.5 text-[11px] font-medium text-[#047857] flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      <span>Pre-filled from your previous session — 1 tap to open chat.</span>
                    </p>
                  ) : null}
                </div>

                {/* Single Primary WhatsApp Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="whatsapp-bridge-submit"
                  className="w-full py-3.5 px-5 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 motion-safe:animate-spin" />
                      <span>Connecting to WhatsApp…</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 fill-current" />
                      <span>Continue to WhatsApp</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.2]" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>Direct human expert reply · Zero spam · Takes 2 seconds</span>
                </div>
              </form>
            </div>
          ) : (
            /* Success & Instant Fallback Screen */
            <div className="text-center space-y-4 py-2">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#E6F7F1] text-[#047857] flex items-center justify-center ring-4 ring-emerald-50/60 mb-2">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#081F38]">
                  Connecting You to WhatsApp!
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  If WhatsApp didn&apos;t open automatically, tap the green button below to start chatting directly.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href={displayWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open WhatsApp Chat Now →</span>
                </a>

                <a
                  href={`tel:${COUNSELLOR_PHONE}`}
                  className="w-full py-3 px-4 rounded-full border border-slate-200 bg-white card-light tone-light hover:bg-slate-50 text-[#081F38] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <PhoneCall className="w-4 h-4 text-[#2563EB]" />
                  <span>Prefer a call? {COUNSELLOR_PHONE_DISPLAY}</span>
                </a>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1 px-4 rounded-full hover:bg-slate-100"
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
