import { type FormEvent } from "react";
import { User, Phone, ArrowRight, Loader2, ShieldCheck, Users, CalendarCheck } from "lucide-react";

interface MasterclassRegisterDeskProps {
  name: string;
  phone: string;
  qualificationStatus: string;
  pvStage: string;
  learningGoal: string;
  isSubmitting: boolean;
  errorMsg: string | null;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onQualificationChange: (val: string) => void;
  onPvStageChange: (val: string) => void;
  onLearningGoalChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const QUALIFICATION_OPTIONS = [
  "B.Pharm student",
  "B.Pharm graduate",
  "M.Pharm student or graduate",
  "Pharm.D student or graduate",
  "Other relevant life-sciences qualification",
];

const PV_STAGE_OPTIONS = [
  "Exploring it as a career",
  "Preparing to apply for drug safety roles",
  "Comparing healthcare career options",
  "Looking for structured pharmacovigilance training",
];

const LEARNING_GOAL_OPTIONS = [
  "What a drug safety professional does",
  "Skills required for entry-level roles",
  "How to prepare for job applications",
  "What further training may be useful",
];

export function MasterclassRegisterDesk({
  name,
  phone,
  qualificationStatus,
  pvStage,
  learningGoal,
  isSubmitting,
  errorMsg,
  onNameChange,
  onPhoneChange,
  onQualificationChange,
  onPvStageChange,
  onLearningGoalChange,
  onSubmit,
}: MasterclassRegisterDeskProps) {
  return (
    <section id="register" className="py-16 sm:py-24 border-b border-[#E4EAF2] bg-white tone-light card-light">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 text-[#1D4ED8] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <span>06 · Reserve Your Seat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-2.5">
            Before you invest in a career path,{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              understand the work.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Register for the free live Pharmacovigilance Masterclass with Mohamed Kumail Abbas, M.Pharm.
          </p>
        </div>

        {/* Apple-Grade Registration Bezel with Homepage Accents */}
        <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-white tone-light card-light border border-[#E2E8F0] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
          {/* Top Micro Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED]" />

          {/* Live Seat Allocation Header Gauge */}
          <div className="mb-8 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#2563EB] font-bold">
                <Users className="w-3.5 h-3.5 text-[#2563EB]" />
                Live Allocation
              </span>
              <span className="font-mono text-[#081F38] font-bold px-2.5 py-0.5 rounded-full bg-[#EEF6FF] border border-[#BFDBFE]">
                348 / 500 Seats Allocated (70%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200/70 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] transition-all duration-500" 
                style={{ width: "70%" }}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* 1. Candidate Identity */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Candidate Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => onNameChange(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm transition-all focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-medium text-slate-700 mb-1.5">
                    WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-xs font-mono font-medium">
                      +91
                    </span>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => onPhoneChange(e.target.value)}
                      placeholder="10-digit number"
                      maxLength={10}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-r-xl border border-slate-200 bg-slate-50/60 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm transition-all focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question 1: Qualification */}
            <div className="pt-5 border-t border-slate-100 space-y-2.5">
              <label className="block text-xs sm:text-sm font-semibold text-[#081F38]">
                1. What is your current qualification and status? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUALIFICATION_OPTIONS.map((opt) => {
                  const isSelected = qualificationStatus === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onQualificationChange(opt)}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#2563EB] bg-[#EEF6FF]/60 ring-1 ring-[#2563EB] shadow-2xs font-semibold text-[#081F38]"
                          : "border-slate-200 bg-slate-50/40 hover:bg-[#EEF6FF]/30 hover:border-[#BFDBFE] text-slate-700 font-medium"
                      }`}
                    >
                      <span className="truncate pr-2">{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#2563EB] bg-[#2563EB]"
                            : "border-slate-300 bg-white tone-light"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white tone-light" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Where are you with PV? */}
            <div className="pt-5 border-t border-slate-100 space-y-2.5">
              <label className="block text-xs sm:text-sm font-semibold text-[#081F38]">
                2. Where are you with pharmacovigilance? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PV_STAGE_OPTIONS.map((opt) => {
                  const isSelected = pvStage === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onPvStageChange(opt)}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#2563EB] bg-[#EEF6FF]/60 ring-1 ring-[#2563EB] shadow-2xs font-semibold text-[#081F38]"
                          : "border-slate-200 bg-slate-50/40 hover:bg-[#EEF6FF]/30 hover:border-[#BFDBFE] text-slate-700 font-medium"
                      }`}
                    >
                      <span className="truncate pr-2">{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#2563EB] bg-[#2563EB]"
                            : "border-slate-300 bg-white tone-light"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white tone-light" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 3: What do you most want to understand? */}
            <div className="pt-5 border-t border-slate-100 space-y-2.5">
              <label className="block text-xs sm:text-sm font-semibold text-[#081F38]">
                3. What do you most want to understand? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LEARNING_GOAL_OPTIONS.map((opt) => {
                  const isSelected = learningGoal === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onLearningGoalChange(opt)}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#2563EB] bg-[#EEF6FF]/60 ring-1 ring-[#2563EB] shadow-2xs font-semibold text-[#081F38]"
                          : "border-slate-200 bg-slate-50/40 hover:bg-[#EEF6FF]/30 hover:border-[#BFDBFE] text-slate-700 font-medium"
                      }`}
                    >
                      <span className="truncate pr-2">{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#2563EB] bg-[#2563EB]"
                            : "border-slate-300 bg-white tone-light"
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white tone-light" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-5 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                data-arzon-dark="true"
                style={{
                  backgroundColor: "#2563EB",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#2563EB] !bg-[#2563EB] hover:bg-[#1D4ED8] text-white !text-white font-sans text-sm sm:text-base font-bold shadow-md hover:shadow-xl shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 motion-safe:animate-spin" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                    <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Reserving your seat...</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Reserve My Free Seat</span>
                    <ArrowRight className="w-4 h-4 stroke-[2]" style={{ color: "#ffffff", stroke: "#ffffff" }} />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3.5 mt-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Instant WhatsApp Confirmation</span>
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <CalendarCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>Google Meet Access Link</span>
                </span>
              </div>

              <p className="text-[10.5px] text-slate-400 mt-2 text-center leading-relaxed font-sans">
                * We'll send your session confirmation directly via WhatsApp. Zero marketing spam.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
