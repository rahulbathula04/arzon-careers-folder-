import { useState, useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  X,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  User,
  Phone,
  GraduationCap,
  Target,
  Building2,
  Sparkles,
  ShieldCheck,
  Calendar,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitExpertConsultationLead } from "@/lib/careerStarterKit.functions";
import { toast } from "sonner";
import { track } from "@/lib/track";

export const QUALIFICATIONS = [
  { value: "B.Pharm", label: "B.Pharm (Bachelor of Pharmacy)" },
  { value: "Pharm.D", label: "Pharm.D (Doctor of Pharmacy)" },
  { value: "M.Pharm", label: "M.Pharm (Master of Pharmacy)" },
  { value: "B.Sc / M.Sc Life Sciences", label: "B.Sc / M.Sc Life Sciences / Biotech" },
  { value: "MBBS / BDS", label: "MBBS / BDS" },
  { value: "Nursing / Allied Health", label: "Nursing / Allied Health" },
  { value: "Other Healthcare Degree", label: "Other Healthcare Degree" },
] as const;

export const TARGET_TRACKS = [
  { value: "Fresher PV Associate", label: "Pharmacovigilance (Drug Safety Associate)" },
  { value: "Clinical Data Associate", label: "Clinical Data Management (CDM)" },
  { value: "Medical Coding Specialist", label: "Medical Coding (ICD-10 / CPT)" },
  { value: "Regulatory Affairs Trainee", label: "Regulatory Affairs (eCTD / Dossiers)" },
  { value: "Help Me Choose", label: "Help Me Choose (General Career Guidance)" },
] as const;

export interface OpenExpertModalOptions {
  targetTrack?: string;
  source?: string;
  qualification?: string;
}

/**
 * Universal trigger helper to launch the Expert Profile Analysis modal.
 */
export function openExpertModal(options?: OpenExpertModalOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("arzon:open-expert-modal", { detail: options || {} })
    );
  }
}

export function UnifiedExpertModal() {
  const { pathname } = useLocation();
  const submitLead = useServerFn(submitExpertConsultationLead);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [sourceTag, setSourceTag] = useState("direct_expert_cta");

  // Form State
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [qualification, setQualification] = useState<string>(QUALIFICATIONS[0].value);
  const [targetTrack, setTargetTrack] = useState<string>(TARGET_TRACKS[0].value);
  const [college, setCollege] = useState("");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [whatsappOptin, setWhatsappOptin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resolvedWaUrl, setResolvedWaUrl] = useState("");

  // Load any previously saved candidate profile from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved =
        localStorage.getItem("arzon_candidate_profile") ||
        localStorage.getItem("ce_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name && !fullName) setFullName(parsed.name);
        if (parsed?.phone && !mobile) setMobile(parsed.phone);
        if (parsed?.qualification) {
          const matched = QUALIFICATIONS.find((q) =>
            q.value.toLowerCase().includes(parsed.qualification.toLowerCase()) ||
            parsed.qualification.toLowerCase().includes(q.value.toLowerCase())
          );
          if (matched) setQualification(matched.value);
        }
        if (parsed?.college && !college) setCollege(parsed.college);
        if (parsed?.graduationYear) setGraduationYear(parsed.graduationYear);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Listen for custom trigger event across the entire application
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<OpenExpertModalOptions>;
      const detail = customEvent.detail || {};

      if (detail.targetTrack) {
        const matched = TARGET_TRACKS.find((t) =>
          t.value.toLowerCase().includes(detail.targetTrack!.toLowerCase()) ||
          t.label.toLowerCase().includes(detail.targetTrack!.toLowerCase()) ||
          detail.targetTrack!.toLowerCase().includes(t.value.toLowerCase())
        );
        setTargetTrack(matched ? matched.value : detail.targetTrack);
      }
      if (detail.qualification) {
        const matchedQ = QUALIFICATIONS.find((q) =>
          q.value.toLowerCase().includes(detail.qualification!.toLowerCase()) ||
          q.label.toLowerCase().includes(detail.qualification!.toLowerCase())
        );
        if (matchedQ) setQualification(matchedQ.value);
      }
      if (detail.source) {
        setSourceTag(detail.source);
      }

      setStep("form");
      setIsOpen(true);

      try {
        track("expert_modal_opened", {
          props: {
            source: detail.source || "direct_expert_cta",
            pathname,
            targetTrack: detail.targetTrack,
          },
        });
      } catch {}
    };

    window.addEventListener("arzon:open-expert-modal", handleOpen);

    return () => {
      window.removeEventListener("arzon:open-expert-modal", handleOpen);
    };
  }, [pathname]);

  // Autofocus first input on open
  useEffect(() => {
    if (!isOpen || step !== "form") return;
    const t = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 120);
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

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      toast.error("Please enter your full name.");
      nameInputRef.current?.focus();
      return;
    }

    const cleanDigits = mobile.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      toast.error("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save locally for future session prefill
      try {
        localStorage.setItem(
          "arzon_candidate_profile",
          JSON.stringify({
            name: fullName.trim(),
            phone: cleanDigits,
            qualification,
            targetRole: targetTrack,
            college: college.trim(),
            graduationYear,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch {}

      const res = await submitLead({
        data: {
          name: fullName.trim(),
          phone: cleanDigits,
          qualification,
          targetTrack,
          college: college.trim(),
          graduationYear,
          source: sourceTag,
          whatsappOptin,
        },
      });

      setResolvedWaUrl(res?.whatsappLink || "https://wa.me/919121283638");
      setStep("success");
      toast.success("Profile submitted! An expert counselor will contact you shortly.");
    } catch (err: any) {
      console.warn("[UnifiedExpertModal] Error:", err);
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-[24px] sm:rounded-[28px] border border-[#CDE3DD] bg-white tone-light card-light text-[#0B3934] shadow-[0_24px_70px_rgba(0,40,35,0.25)] motion-safe:animate-in motion-safe:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#004B45] via-[#008F83] to-[#E7C982]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-3.5 top-3.5 z-10 grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "form" ? (
          <div className="p-5 sm:p-6 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="pr-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#008F83]/20 bg-[#DFF1EF]/70 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#004B45]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
                </span>
                <span>Arzon Advisory · 2026</span>
              </div>
              <h2 className="mt-1.5 text-[20px] sm:text-[22px] font-bold tracking-tight text-[#063F39] leading-snug">
                Talk to Clinical Career Experts
              </h2>
              <p className="mt-1 text-[11.5px] sm:text-[12px] leading-relaxed text-[#5C756F]">
                Evaluate your academic background against published CRO requirements. Our senior counselors assess your current situation, clarify your desired role, identify the practical skill gap, and give you clear next steps.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#004B45] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    ref={nameInputRef}
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name (e.g. Rahul Bathula)"
                    className="h-10 w-full pl-10 pr-3 text-[13px] rounded-xl border border-slate-200/90 bg-[#F8FBFA] text-slate-900 placeholder:text-slate-400 font-medium outline-none focus:outline-none focus:border-[#008F83] focus:ring-2 focus:ring-[#008F83]/15 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Field 2: WhatsApp Mobile Number with Flag Badge */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#004B45] mb-1">
                  WhatsApp Mobile Number *
                </label>
                <div className="flex h-10 rounded-xl border border-slate-200/90 bg-[#F8FBFA] overflow-hidden focus-within:border-[#008F83] focus-within:ring-2 focus-within:ring-[#008F83]/15 focus-within:bg-white transition-all">
                  <div className="flex items-center gap-1 px-3 bg-slate-100/70 border-r border-slate-200/80 text-[12px] font-bold text-slate-600 select-none shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="98765 43210"
                    className="h-full w-full px-3 text-[13px] font-mono font-medium text-slate-900 placeholder:text-slate-400 bg-transparent outline-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Field 3: Degree (Full width, clear legible display) */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#004B45] mb-1">
                  Your Degree *
                </label>
                <div className="relative">
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200/90 bg-[#F8FBFA] pl-3.5 pr-8 text-[12.5px] font-medium text-slate-900 outline-none focus:outline-none focus:border-[#008F83] focus:ring-2 focus:ring-[#008F83]/15 focus:bg-white transition-all cursor-pointer"
                  >
                    {QUALIFICATIONS.map((q) => (
                      <option key={q.value} value={q.value}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Field 4: Full-width Target Career Track */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#004B45] mb-1">
                  Target Career Track *
                </label>
                <div className="relative">
                  <select
                    value={targetTrack}
                    onChange={(e) => setTargetTrack(e.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200/90 bg-[#F8FBFA] pl-3.5 pr-8 text-[12.5px] font-medium text-slate-900 outline-none focus:outline-none focus:border-[#008F83] focus:ring-2 focus:ring-[#008F83]/15 focus:bg-white transition-all cursor-pointer"
                  >
                    {TARGET_TRACKS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Field 5: College / University & Passout Year */}
              <div className="grid grid-cols-[1.5fr_1fr] gap-2.5">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#004B45] mb-1">
                    College / University <span className="font-normal text-slate-400 normal-case">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. Malla Reddy, Osmania..."
                      className="h-10 w-full pl-9 pr-3 text-[12px] rounded-xl border border-slate-200/90 bg-[#F8FBFA] text-slate-900 placeholder:text-slate-400 font-medium outline-none focus:outline-none focus:border-[#008F83] focus:ring-2 focus:ring-[#008F83]/15 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#004B45] mb-1">
                    Passout Year
                  </label>
                  <div className="relative">
                    <select
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="h-10 w-full appearance-none rounded-xl border border-slate-200/90 bg-[#F8FBFA] pl-3 pr-7 text-[12px] font-medium text-slate-900 outline-none focus:outline-none focus:border-[#008F83] focus:ring-2 focus:ring-[#008F83]/15 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="2027">2027</option>
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023 or earlier">2023 / Earlier</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-3 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* WhatsApp Consent Toggle */}
              <label className="flex items-start gap-2 pt-0.5 text-[11px] leading-snug text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappOptin}
                  onChange={(e) => setWhatsappOptin(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded accent-[#008F83]"
                />
                <span>
                  I agree to receive profile evaluation updates and roadmaps via WhatsApp / Call.
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-[#004B45] hover:bg-[#003B35] !text-white text-white font-bold text-[13px] tracking-normal transition-all shadow-[0_6px_20px_rgba(0,75,69,0.22)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 motion-safe:animate-spin" />
                    <span>Analyzing profile...</span>
                  </>
                ) : (
                  <>
                    <span>Request Expert Profile Evaluation</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-medium text-[#40615A]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Dignity-first evaluation · Direct counselor call within 15–30 mins</span>
            </div>
          </div>
        ) : (
          /* Step 2: Confirmation & Expectations */
          <div className="p-6 sm:p-7 text-center space-y-4">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            </div>

            <div>
              <h3 className="text-[20px] font-bold tracking-tight text-[#063F39]">
                Profile Submitted for Expert Review
              </h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[#5C756F] max-w-sm mx-auto">
                Thank you, <strong>{fullName}</strong>. Your academic profile ({qualification}) has been logged directly with our admissions and senior counselor team.
              </p>
            </div>

            {/* Protocol Explanation */}
            <div className="rounded-2xl border border-slate-200/90 bg-[#F4FAF9] p-3.5 text-left space-y-2 text-[11.5px] text-slate-700">
              <p className="font-bold text-[#004B45] uppercase tracking-wider text-[9.5px] font-mono">
                What to expect on your counselor call:
              </p>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#008F83] shrink-0">1.</span>
                <span>We review your {qualification} background and college coursework.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#008F83] shrink-0">2.</span>
                <span>We map your profile to entry hiring criteria for <strong>{targetTrack}</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#008F83] shrink-0">3.</span>
                <span>We outline the exact practical gaps and give you your next step.</span>
              </div>
            </div>

            {/* WhatsApp Quick Connect Button */}
            <div className="pt-1 flex flex-col gap-2">
              <a
                href={resolvedWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[12.5px] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Expert on WhatsApp Now</span>
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium py-1 cursor-pointer"
              >
                Close &amp; Return to Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
