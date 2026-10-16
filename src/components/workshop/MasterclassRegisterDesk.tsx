import { useState, type FormEvent } from "react";
import { User, Phone, CheckCircle, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

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
    <section id="reserve-seat" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            06 · Reserve Your Seat
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug mb-3">
            Before you invest in a career path, understand the work.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Register for the free Pharmacovigilance Masterclass.
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm tone-light card-light">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-8">
            {/* 1. Candidate Identity */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
                Your Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm transition-all outline-hidden bg-white tone-light"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    WhatsApp number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-xs font-mono font-semibold">
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
                      className="w-full px-4 py-3 rounded-r-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm transition-all outline-hidden bg-white tone-light"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question 1: Qualification */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <label className="block text-sm font-semibold text-[#081F38]">
                1. What is your current qualification and status? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUALIFICATION_OPTIONS.map((opt) => {
                  const isSelected = qualificationStatus === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onQualificationChange(opt)}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/70 text-blue-900 font-semibold shadow-2xs"
                          : "border-slate-200/90 hover:border-slate-300 bg-white tone-light text-slate-700"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
                          isSelected
                            ? "border-blue-600 bg-blue-600"
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
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <label className="block text-sm font-semibold text-[#081F38]">
                2. Where are you with pharmacovigilance? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PV_STAGE_OPTIONS.map((opt) => {
                  const isSelected = pvStage === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onPvStageChange(opt)}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/70 text-blue-900 font-semibold shadow-2xs"
                          : "border-slate-200/90 hover:border-slate-300 bg-white tone-light text-slate-700"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
                          isSelected
                            ? "border-blue-600 bg-blue-600"
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
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <label className="block text-sm font-semibold text-[#081F38]">
                3. What do you most want to understand? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LEARNING_GOAL_OPTIONS.map((opt) => {
                  const isSelected = learningGoal === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onLearningGoalChange(opt)}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/70 text-blue-900 font-semibold shadow-2xs"
                          : "border-slate-200/90 hover:border-slate-300 bg-white tone-light text-slate-700"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
                          isSelected
                            ? "border-blue-600 bg-blue-600"
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
            <div className="pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 motion-safe:animate-spin" />
                    <span>Reserving your seat...</span>
                  </>
                ) : (
                  <>
                    <span>RESERVE MY FREE SEAT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 mt-4 text-center leading-relaxed">
                * We'll send your session confirmation and joining information through WhatsApp, subject to the registration and messaging setup. Your details will be handled according to the applicable privacy notice and your communication preferences.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
