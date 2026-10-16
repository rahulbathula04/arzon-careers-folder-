import { type FormEvent } from "react";
import { User, Phone, ArrowRight, Loader2, ShieldCheck, Users, CalendarCheck, CheckCircle2 } from "lucide-react";

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
    <section id="register" className="py-12 sm:py-16 border-b border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
            <span>06 · Reserve Your Seat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight leading-snug mb-2">
            Before you invest in a career path, understand the work.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Register for the free live Pharmacovigilance Masterclass with Mohamed Kumail Abbas, M.Pharm.
          </p>
        </div>

        {/* Compact Form Container */}
        <div className="p-5 sm:p-8 rounded-2xl bg-white tone-light card-light border border-slate-200/90 shadow-2xs relative overflow-hidden">
          {/* Live Seat Allocation Header Gauge */}
          <div className="mb-6 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-blue-700">
                <Users className="w-3.5 h-3.5" />
                Live Attendance Status
              </span>
              <span className="font-mono text-slate-600">348 / 500 Seats Allocated (70%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500" 
                style={{ width: "70%" }}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* 1. Candidate Identity */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Your Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full name <span className="text-rose-500">*</span>
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
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 text-slate-900 text-xs sm:text-sm transition-all outline-hidden bg-white tone-light"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-xs font-mono font-semibold">
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
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 text-slate-900 text-xs sm:text-sm transition-all outline-hidden bg-white tone-light"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question 1: Qualification */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
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
                      style={{ color: isSelected ? "#081F38" : "#334155" }}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#2563EB] bg-[#EFF6FF] shadow-xs ring-1 ring-blue-500/20"
                          : "border-slate-200/90 hover:border-slate-300 bg-white tone-light"
                      }`}
                    >
                      <span
                        style={{ color: isSelected ? "#081F38" : "#334155" }}
                        className={isSelected ? "font-bold text-[#081F38]" : "font-medium text-slate-700"}
                      >
                        {opt}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
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
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
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
                      style={{ color: isSelected ? "#081F38" : "#334155" }}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#2563EB] bg-[#EFF6FF] shadow-xs ring-1 ring-blue-500/20"
                          : "border-slate-200/90 hover:border-slate-300 bg-white tone-light"
                      }`}
                    >
                      <span
                        style={{ color: isSelected ? "#081F38" : "#334155" }}
                        className={isSelected ? "font-bold text-[#081F38]" : "font-medium text-slate-700"}
                      >
                        {opt}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
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
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
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
                      style={{ color: isSelected ? "#081F38" : "#334155" }}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#2563EB] bg-[#EFF6FF] shadow-xs ring-1 ring-blue-500/20"
                          : "border-slate-200/90 hover:border-slate-300 bg-white tone-light"
                      }`}
                    >
                      <span
                        style={{ color: isSelected ? "#081F38" : "#334155" }}
                        className={isSelected ? "font-bold text-[#081F38]" : "font-medium text-slate-700"}
                      >
                        {opt}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
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
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 motion-safe:animate-spin" />
                    <span>Reserving your seat...</span>
                  </>
                ) : (
                  <>
                    <span>RESERVE MY FREE SEAT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant WhatsApp Confirmation</span>
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  <CalendarCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Google Meet Integration</span>
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mt-2 text-center leading-relaxed">
                * We'll send your session confirmation through WhatsApp. Your details are handled strictly under Arzon's Privacy Policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
