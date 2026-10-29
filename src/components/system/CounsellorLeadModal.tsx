import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  X,
  Phone,
  User,
  Check,
  ArrowRight,
  MessageCircle,
  GraduationCap,
  BookOpen,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitApplication } from "@/lib/applications.functions";
import { submitCareerStarterKitLead } from "@/lib/careerStarterKit.functions";
import { applyAcriCandidateFn } from "@/lib/acri-core.functions";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY } from "@/components/landing/constants";
import { toast } from "sonner";

export const PROGRAMME_OPTIONS = [
  "Pharmacovigilance & Drug Safety",
  "Clinical Data Management (CDM)",
  "Regulatory Affairs & Documentation",
  "Medical Coding & Clinical Informatics",
  "Clinical SAS & Biostatistics",
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
}

/**
 * Universal global trigger helper.
 * Can be called from any component or button on the platform.
 */
export function openCounsellorModal(options?: OpenCounsellorModalOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("arzon:open-counsellor-modal", { detail: options || {} })
    );
  }
}

export function CounsellorLeadModal() {
  const { pathname } = useLocation();
  const submitApp = useServerFn(submitApplication);
  const submitLead = useServerFn(submitCareerStarterKitLead);
  const applyCandidate = useServerFn(applyAcriCandidateFn);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [sourceTag, setSourceTag] = useState("direct_counsellor_cta");

  // Candidate fields with localStorage pre-population
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

  const [phone, setPhone] = useState(() => {
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

  const [degree, setDegree] = useState<string>(QUALIFICATION_OPTIONS[0]);
  const [programme, setProgramme] = useState<string>(PROGRAMME_OPTIONS[0]);
  const [preferredFormat, setPreferredFormat] = useState<"whatsapp" | "call">("whatsapp");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen to the global trigger event
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<OpenCounsellorModalOptions>;
      const detail = customEvent.detail || {};
      setSourceTag(detail.source || "direct_counsellor_cta");

      if (detail.programme) {
        // Match closest programme or set directly
        const matched = PROGRAMME_OPTIONS.find(
          (p) => p.toLowerCase().includes(detail.programme!.toLowerCase()) || detail.programme!.toLowerCase().includes(p.toLowerCase())
        );
        setProgramme(matched || detail.programme);
      }
      if (detail.degree) {
        setDegree(detail.degree);
      }
      setStep("form");
      setIsOpen(true);
    };

    window.addEventListener("arzon:open-counsellor-modal", handleOpen);
    return () => window.removeEventListener("arzon:open-counsellor-modal", handleOpen);
  }, []);

  // ESC key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = phone.replace(/\D/g, "");
    if (!fullName.trim() || cleanDigits.length < 10) {
      toast.error("Please enter your full name and a valid 10-digit WhatsApp number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanPhone = cleanDigits.slice(-10);
      const userEmail = `${cleanPhone}@arzoncandidate.local`;
      const clientFp = ("counsellor-" + Date.now() + "-" + Math.random().toString(36).substring(2)).slice(0, 32);
      const programSlug = programme.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50);

      // 1. Sync to Admin Applications Pipeline (/admin/applications)
      try {
        await submitApp({
          data: {
            name: fullName.trim(),
            email: userEmail,
            phone: cleanPhone,
            programSlug,
            programName: programme,
            whatsappOptin: true,
            degree,
            notes: JSON.stringify({
              source: sourceTag,
              preferredFormat,
              pathname,
              degree,
              submittedAt: new Date().toISOString(),
            }),
            utmSource: `counsellor-cta-${sourceTag}`,
          },
        });
      } catch (err) {
        console.warn("[CounsellorLeadModal] Applications pipeline notice:", err);
      }

      // 2. Sync to Career Engine Leads (/admin/leads)
      try {
        await submitLead({
          data: {
            name: fullName.trim(),
            email: userEmail,
            phone: cleanPhone,
            qualification: degree,
            whatsappOptin: true,
            sourcePath: pathname,
            clientFp,
            utmSource: `counsellor-cta-${sourceTag}`,
          },
        });
      } catch (err) {
        console.warn("[CounsellorLeadModal] Leads pipeline notice:", err);
      }

      // 3. Sync to ACRI Candidate Store (/admin/acri)
      try {
        await applyCandidate({
          data: {
            fullName: fullName.trim(),
            email: userEmail,
            mobile: cleanPhone,
            highestQualification: degree,
            collegeUniversity: "Counselling Applicant",
            currentlyWorking: "no",
          },
        });
      } catch (err) {
        console.warn("[CounsellorLeadModal] ACRI sync notice:", err);
      }

      // Cache profile locally
      try {
        localStorage.setItem(
          "arzon_acri_candidate_profile",
          JSON.stringify({
            fullName: fullName.trim(),
            email: userEmail,
            mobile: cleanPhone,
            degree,
            programme,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch {}

      setStep("success");
      toast.success("Counsellor request submitted! Connect on WhatsApp below.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // WhatsApp prefilled message
  const whatsappMessage = encodeURIComponent(
    `Hi Arzon Team! My name is ${fullName.trim() || "a candidate"}. I have completed ${degree}. I am interested in ${programme} and would like to speak with a healthcare career counsellor.`
  );
  const whatsappUrl = `https://wa.me/${COUNSELLOR_PHONE}?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-testid="counsellor-lead-modal"
      aria-label="Talk to a Healthcare Career Counsellor"
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal / Drawer Surface */}
      <div
        className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-white card-light tone-light border border-slate-200 shadow-2xl overflow-hidden font-sans text-slate-900 z-10 motion-safe:animate-in motion-safe:slide-in-from-bottom-6 sm:motion-safe:zoom-in-95 duration-250 max-h-[92vh] overflow-y-auto"
      >
        {/* Mobile Drag Notch Indicator */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        {/* Top Brand Accent Gradient Bar */}
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

        <div className="p-5 sm:p-7">
          {step === "form" ? (
            <div>
              {/* Header */}
              <div className="text-left mb-5 pr-8">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] mb-2">
                  <Sparkles className="h-3 w-3 text-[#2563EB]" />
                  <span>DIRECT CAREER ADVISORY • 100% FREE</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#081F38] leading-tight">
                  Talk to a Healthcare Career Counsellor
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Get personalized guidance on role eligibility, GCC hiring requirements, and salary expectations for your qualification.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 91212 83638"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Degree / Qualification */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all cursor-pointer"
                    >
                      {QUALIFICATION_OPTIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Programme of Interest */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Programme / Role
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={programme}
                      onChange={(e) => setProgramme(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all cursor-pointer"
                    >
                      {PROGRAMME_OPTIONS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Format */}
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Communication
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredFormat("whatsapp")}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        preferredFormat === "whatsapp"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span>WhatsApp Chat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredFormat("call")}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        preferredFormat === "call"
                          ? "border-[#2563EB] bg-blue-50 text-[#1D4ED8]"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-[#2563EB]" />
                      <span>Phone Callback</span>
                    </button>
                  </div>
                </div>

                {/* Primary Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold text-sm transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Connecting with Counsellor…</span>
                    ) : (
                      <>
                        <span>Connect with Career Counsellor</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.2]" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Free Advisory • Zero spam • Instant guidance</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="text-center space-y-4 py-2">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center ring-4 ring-emerald-50/60 mb-2">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#081F38]">
                  Your Career Counsellor is Ready!
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto leading-relaxed">
                  We have logged your enquiry in our counsellor queue. You can now chat directly on WhatsApp with our senior advisory team.
                </p>
              </div>

              {/* Direct Actions */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-[#10B981] hover:bg-[#059669] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp Now →</span>
                </a>

                <a
                  href={`tel:${COUNSELLOR_PHONE}`}
                  className="w-full py-3 px-4 rounded-full border border-slate-200 bg-white card-light tone-light hover:bg-slate-50 text-[#081F38] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <PhoneCall className="w-4 h-4 text-[#2563EB]" />
                  <span>Call Counsellor: {COUNSELLOR_PHONE_DISPLAY}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1 px-4 rounded-full hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
