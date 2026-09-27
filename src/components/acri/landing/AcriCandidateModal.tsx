import { useState } from "react";
import { X, ShieldCheck, CheckCircle2, Copy, ArrowRight, Clock, Award, Layers, BarChart3, Check } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { applyAcriCandidateFn } from "@/lib/acri-core.functions";
import { submitApplication } from "@/lib/applications.functions";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface AcriCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteGenerated?: (code: string) => void;
}

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

export function AcriCandidateModal({ isOpen, onClose, onInviteGenerated }: AcriCandidateModalProps) {
  const navigate = useNavigate();
  const applyCandidate = useServerFn(applyAcriCandidateFn);
  const submitApp = useServerFn(submitApplication);

  // Form State (Exact 6 fields requested)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[0]);
  const [collegeUniversity, setCollegeUniversity] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState<"yes" | "no">("no");

  // Legal Consent State (DPDP & Educational Declaration)
  const [consentAccuracy, setConsentAccuracy] = useState(true);
  const [consentCommunications, setConsentCommunications] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  // Flow State: "form" | "submitted"
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !mobile.trim() || !collegeUniversity.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!consentAccuracy || !consentCommunications) {
      toast.error("Please verify and accept the required legal and dispatch consent declarations.");
      return;
    }

    setIsSubmitting(true);
    try {
      // The database is the authoritative candidate ledger. Never allocate
      // invite codes or fabricate candidate state in browser storage.
      const serverRes = await applyCandidate({
        data: {
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          highestQualification,
          collegeUniversity: collegeUniversity.trim(),
          currentlyWorking,
        },
      });

      if (!serverRes?.success || !serverRes.candidateId) {
        throw new Error("ACRI registration was not persisted.");
      }

      // Pending-review candidates do not receive a real invite until admissions approval.
      const assignedCode = "";
      setGeneratedCode(assignedCode);

      // 2. Persist only the resumable browser session context, never the
      // authoritative candidate record or invitation ledger.
      if (typeof window !== "undefined") {
        const candidateProfileData = {
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
          JSON.stringify(candidateProfileData)
        );
        localStorage.setItem(
          "arzon_acri_candidate_profile",
          JSON.stringify(candidateProfileData)
        );
        localStorage.setItem("arzon_acri_active_code", assignedCode);
      }

      // 3. Register application into core Admin Applications Pipeline
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
      } catch (e) {
        console.error("Applications pipeline sync failed:", e);
        throw new Error("Candidate registration succeeded, but the admissions application could not be recorded.");
      }

      if (onInviteGenerated) onInviteGenerated(assignedCode);

      setStep("submitted");
      toast.success("Application submitted. Admissions review is pending.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to process application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white card-light border border-stone-200 shadow-2xl overflow-hidden font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Brand Strip */}
        <div className="bg-[#005B4F] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-100">
              ACRI PHARMACOVIGILANCE · COHORT 01
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-[#00473E] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 max-h-[85vh] overflow-y-auto">
          {step === "form" ? (
            <div>
              <div className="mb-6">
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-2.5 py-1 rounded-full">
                  100 LAUNCH INVITES · COHORT 01
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1325] mt-2">
                  Claim Your ACRI Invite
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Join the first 100 candidates for the ACRI Pharmacovigilance Certification.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 2. Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@university.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 3. Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 4. Highest Qualification */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white card-light focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  >
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. College / University */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    College / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeUniversity}
                    onChange={(e) => setCollegeUniversity(e.target.value)}
                    placeholder="e.g. Bombay College of Pharmacy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005B4F]/40 focus:border-[#005B4F] transition-all"
                  />
                </div>

                {/* 6. Are you currently working? */}
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Are you currently working?
                  </label>
                  <div className="flex items-center gap-6 text-sm text-stone-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="working"
                        value="no"
                        checked={currentlyWorking === "no"}
                        onChange={() => setCurrentlyWorking("no")}
                        className="text-[#005B4F] focus:ring-[#005B4F]"
                      />
                      <span>No (Student / Fresher)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="working"
                        value="yes"
                        checked={currentlyWorking === "yes"}
                        onChange={() => setCurrentlyWorking("yes")}
                        className="text-[#005B4F] focus:ring-[#005B4F]"
                      />
                      <span>Yes (Employed)</span>
                    </label>
                  </div>
                </div>

                {/* Mandatory Legal & Educational Consent Process */}
                <div className="pt-2 pb-1 space-y-2.5 rounded-xl bg-stone-50 border border-stone-200/80 p-3 text-left">
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
                      <strong>Educational Accuracy:</strong> I certify that my educational details are authentic. I consent to the processing of my candidate dossier and assessment responses for occupational grading pursuant to the{" "}
                      <a href="/terms" target="_blank" className="text-[#005B4F] underline hover:text-[#00473E]">
                        Terms of Service
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
                      <strong>Admissions Dispatch:</strong> I authorize Arzon Global Admissions to dispatch my confidential examination access key, verification link, and official credential certificate via WhatsApp and Email.
                    </span>
                  </label>

                  <div className="pt-0.5 text-[10px] font-mono text-stone-500">
                    ● Encrypted &amp; Logged under the Digital Personal Data Protection (DPDP) Act, 2023.
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consentAccuracy || !consentCommunications}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Executing legal dossier registration…</span>
                    ) : (
                      <>
                        <span>EXECUTE REGISTRATION &amp; CLAIM INVITE →</span>
                      </>
                    )}
                  </button>
                  <span className="block text-center text-[11px] text-stone-500 mt-2 font-mono">
                    No payment required. Access is issued after admissions review.
                  </span>
                </div>
              </form>
            </div>
          ) : (
            /* Institutional Onboarding Confirmation & Direct Workstation Launcher */
            <div className="text-center py-2 space-y-4 font-sans">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#E8F7F1] text-[#005B4F] mx-auto border border-[#005B4F]/20">
                <CheckCircle2 className="h-7 w-7 text-[#005B4F]" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full border border-[#005B4F]/20">
                  ● APPLICATION LOGGED · PENDING REVIEW · COHORT 01
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-2">
                  Application Logged
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your application has been recorded. An access invitation will be issued after admissions review.
                </p>
              </div>

              {/* Allocated Key Banner */}
              <div className="rounded-2xl border-2 border-[#005B4F]/30 bg-[#FAF9F6] p-4 text-left space-y-2.5 card-light tone-light shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#005B4F] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>Your Allocated Examination Key</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    PENDING REVIEW
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-stone-200 card-light tone-light">
                  <span className="font-mono text-base font-black tracking-wider text-stone-900">
                    {generatedCode || "PENDING REVIEW"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode || "PENDING REVIEW");
                      setCopiedCode(true);
                      toast.success("Application reference copied to clipboard");
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                  >
                    {copiedCode ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-stone-500" />}
                    <span>{copiedCode ? "Copied" : "Copy Key"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-stone-600">
                  <div>
                    <span className="text-stone-400 block text-[10px]">CANDIDATE</span>
                    <span className="font-medium text-stone-800">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">QUALIFICATION</span>
                    <span className="font-medium text-stone-800 truncate block">{highestQualification}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">DISPATCH CHANNELS</span>
                    <span className="font-medium text-stone-800 truncate block">{email}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">LEGAL CONSENT STATUS</span>
                    <span className="font-medium text-emerald-700">DPDP Act Verified</span>
                  </div>
                </div>
              </div>

              {/* Direct Launch Workstation CTA */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-slate-50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>CLOSE</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-mono text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                  >
                    Return to Overview
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
