import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, X, PhoneCall, Building2 } from "lucide-react";
import { submitApplication } from "@/lib/applications.functions";

interface QuickLeadRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrack?: string;
}

export function QuickLeadRegisterModal({
  isOpen,
  onClose,
  defaultTrack = "Tier-1 Enterprise AI & Quant Eng",
}: QuickLeadRegisterModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [track, setTrack] = useState(defaultTrack);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignedLeadId, setAssignedLeadId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      // Call server lead application submission function
      const res = await submitApplication({
        data: {
          name,
          email: `${phone.replace(/\D/g, "")}@candidate.arzon.global`,
          phone,
          programSlug: "enterprise-ai-quant",
          programName: track,
          utmSource: "1click_modal_quick_register",
        },
      });

      if (res && res.applicationId) {
        setAssignedLeadId(res.applicationId);
      }
      setStep("success");
    } catch (err) {
      console.error("[QuickLeadRegisterModal] Error submitting lead:", err);
      setStep("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep("form");
    setName("");
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-[#0F172A] text-slate-100 p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 h-8 w-8 rounded-full border border-slate-700 bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-slate-50 hover:bg-slate-700 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "form" ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                <Sparkles className="h-3.5 w-3.5 motion-safe:animate-pulse" /> Fast-Track Registration
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-50 tracking-tight">
                Check My Eligibility in 30 Seconds
              </h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed font-sans">
                Direct partner-desk intake for Tier-1 Enterprise Tech & Quant Fintech open roles (₹6–18 LPA).
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/80 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                  WhatsApp / Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/80 text-sm text-slate-50 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Target Accelerator Track
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-700 bg-slate-900/80 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Tier-1 Enterprise AI & Quant Eng">Tier-1 Enterprise AI & Quant Eng (₹14–18 LPA)</option>
                  <option value="Enterprise ML Data Engineer">Enterprise ML Data Engineer (₹8–14 LPA)</option>
                  <option value="Cloud AI & GenAI Systems">Cloud AI & GenAI Systems (₹10–16 LPA)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-slate-50 text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="h-4 w-4 motion-safe:animate-spin" /> Verifying Eligibility...
                    </>
                  ) : (
                    <>
                      Submit & Check Eligibility <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>100% Free · No spam · Instant ACRI benchmark preview</span>
            </div>
          </div>
        ) : (
          /* Step 2: Instant Success & SLA Booking */
          <div className="py-4 space-y-6 text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                Eligibility Status: Pre-Approved
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-slate-50">
                Registration Confirmed!
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans max-w-sm mx-auto">
                Thank you <strong className="text-slate-50">{name}</strong>. Your candidate file has been routed to the Tier-1 Enterprise & Quant Intake Desk.
              </p>
            </div>

            {/* Quick Details Box */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">Assigned Track:</span>
                <span className="font-bold text-blue-400">{track}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">SLA Response Window:</span>
                <span className="font-bold text-emerald-400">Within 15 Minutes</span>
              </div>
              {assignedLeadId && (
                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400 font-mono">Reference ID:</span>
                  <span className="font-mono text-slate-300 text-[11px]">{assignedLeadId.slice(0, 8)}...</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <a
                href={`https://wa.me/?text=Hi%20Arzon%20Team%2C%20my%20name%20is%20${encodeURIComponent(name)}.%20I%20just%20registered%20for%20the%20${encodeURIComponent(track)}%20intake.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-50 text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="h-4 w-4" /> Connect directly on WhatsApp
              </a>

              <button
                onClick={handleReset}
                className="w-full py-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-all"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
