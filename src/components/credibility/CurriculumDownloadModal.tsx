import React, { useEffect } from "react";
import { X, Download, FileText, CheckCircle2, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import type { TrainingProgram } from "@/data/credibility/curricula";

interface CurriculumDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: TrainingProgram | null;
}

export function CurriculumDownloadModal({
  isOpen,
  onClose,
  program,
}: CurriculumDownloadModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !program) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Curriculum details for ${program.roleName}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#081F38]/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-2xl bg-white tone-light card-light rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#081F38] text-white">
          <div className="flex items-center gap-2.5 truncate pr-2">
            <FileText className="w-5 h-5 text-[#60A5FA]" />
            <div className="truncate">
              <h2 className="text-base sm:text-lg font-bold leading-tight truncate text-white">
                {program.roleName}
              </h2>
              <span className="text-xs text-slate-300">
                Official 2026 Training Curriculum
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto max-h-[68vh] space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#2563EB]" /> Duration
              </span>
              <strong className="text-[#081F38] text-xs sm:text-sm block mt-0.5">
                {program.duration}
              </strong>
            </div>

            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Target Cohort
              </span>
              <strong className="text-[#081F38] text-xs sm:text-sm block mt-0.5 truncate">
                {program.targetAudience}
              </strong>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#64748B] block">Compensation Band</span>
              <strong className="text-[#10B981] text-xs sm:text-sm block mt-0.5">
                {program.salaryRange}
              </strong>
            </div>
          </div>

          {/* Tools Mastered */}
          <div>
            <span className="text-xs font-semibold text-[#081F38] block mb-1.5">
              Practical Systems & Tools Mastered:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {program.toolsMastered.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#EEF6FF] text-[#2563EB] border border-[#D0E1FD]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Modules Accordion / List */}
          <div>
            <span className="text-xs font-bold text-[#081F38] block mb-2">
              Syllabus Module Breakdown:
            </span>
            <div className="space-y-2">
              {program.modules.map((mod, idx) => (
                <div
                  key={mod.title}
                  className="p-3 rounded-xl border border-[#E2E8F0] bg-white tone-light card-light"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#081F38]">
                    <span className="text-[#2563EB] font-mono">{mod.week}</span>
                    <span className="text-[#64748B] text-[11px]">Module {idx + 1}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#081F38] mt-0.5">
                    {mod.title}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {mod.topics.map((t) => (
                      <li
                        key={t}
                        className="text-xs text-[#64748B] flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation Note */}
          <p className="text-xs text-[#64748B] italic bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
            ℹ {program.accreditationNote}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#64748B]">
            Official document: {program.pdfFileSize}
          </span>
          <a
            href={program.pdfDownloadUrl}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-white text-xs sm:text-sm font-bold hover:bg-[#1D4ED8] transition-colors shadow-sm min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Syllabus PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
