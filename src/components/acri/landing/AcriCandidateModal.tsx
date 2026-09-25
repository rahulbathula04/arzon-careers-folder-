import { useState } from "react";
import { X, ShieldCheck, CheckCircle2, Copy, ArrowRight, Clock, Award, Layers, BarChart3, Check } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { applyAcriCandidateFn } from "@/lib/acri-core.functions";
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

  // Form State (Exact 6 fields requested)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [highestQualification, setHighestQualification] = useState(QUALIFICATIONS[0]);
  const [collegeUniversity, setCollegeUniversity] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState<"yes" | "no">("no");

  // Flow State: "form" | "invite_ready"
  const [step, setStep] = useState<"form" | "invite_ready">("form");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !mobile.trim() || !collegeUniversity.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Authoritative Server-Side Transaction
      const res = await applyCandidate({
        data: {
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          highestQualification,
          collegeUniversity: collegeUniversity.trim(),
          currentlyWorking,
        },
      });

      if (res?.inviteCode) {
        setGeneratedCode(res.inviteCode);
        setStep("invite_ready");
        if (onInviteGenerated) onInviteGenerated(res.inviteCode);
        toast.success("Application recorded. Invite code issued!");
      } else {
        throw new Error("Failed to provision invitation. Please retry.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to process application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success("Invite code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartAssessment = () => {
    onClose();
    navigate({
      to: "/career-engine/test",
      search: { code: generatedCode },
    });
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

                {/* Submit CTA */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Requesting invite…</span>
                    ) : (
                      <>
                        <span>REQUEST MY INVITE →</span>
                      </>
                    )}
                  </button>
                  <span className="block text-center text-[11px] text-stone-500 mt-2">
                    100 Launch Invites. No payment required for Cohort 01.
                  </span>
                </div>
              </form>
            </div>
          ) : (
            /* Post-Submission Screen matching spec */
            <div className="text-center py-2 space-y-5">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#E8F7F1] text-[#005B4F] mx-auto">
                <CheckCircle2 className="h-8 w-8 text-[#005B4F]" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold text-[#005B4F] uppercase tracking-widest bg-[#E8F7F1] px-3 py-1 rounded-full">
                  APPLICATION RECORDED · COHORT 01
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#0B1325] mt-2">
                  You&apos;re on the ACRI Launch List.
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your application has been recorded. Your ACRI invitation has been provisioned for <strong>{email}</strong>.
                </p>
              </div>

              {/* What You'll Receive Card */}
              <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 text-left space-y-2.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  What you&apos;ll receive:
                </span>
                <div className="space-y-1.5 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>25-minute timed certification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>9 evaluated PV competencies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>ACRI readiness score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>Detailed capability profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-[#005B4F]" />
                    <span>Shareable, verifiable credential</span>
                  </div>
                </div>
              </div>

              {/* Code Display Box */}
              <div className="bg-[#FAF8F5] border-2 border-dashed border-[#005B4F]/30 rounded-2xl p-4 text-center space-y-2">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                  YOUR INVITE CODE
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#005B4F] tracking-wider select-all">
                    {generatedCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-white card-light border border-stone-200 text-stone-600 hover:text-[#005B4F] transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-[11px] text-stone-500 block">
                  Check your email for your invite code.
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartAssessment}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer group"
                >
                  <span>START CERTIFICATION →</span>
                  <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] text-stone-400 mt-2">
                  Your 25-minute timer will begin only when you enter the assessment session.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
