import { type FormEvent, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Loader2, Users } from "lucide-react";

interface QuickRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: string;
  isSubmitting: boolean;
  errorMsg: string | null;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onCollegeChange: (v: string) => void;
  onDegreeChange: (v: string) => void;
  onGraduationYearChange: (v: string) => void;
  onInputFocus?: (fieldName?: string) => void;
  onSubmit: (e: FormEvent) => void;
  allocatedSeats?: number;
  totalCapacity?: number;
  percentReserved?: number;
}

export function QuickRegisterModal({
  isOpen,
  onClose,
  name,
  phone,
  college,
  degree,
  graduationYear,
  isSubmitting,
  errorMsg,
  onNameChange,
  onPhoneChange,
  onCollegeChange,
  onDegreeChange,
  onGraduationYearChange,
  onInputFocus,
  onSubmit,
  allocatedSeats = 432,
  totalCapacity = 500,
  percentReserved = 86,
}: QuickRegisterModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-register-title"
        className="relative w-full max-w-lg bg-white tone-light card-light rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[92vh] flex flex-col"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        {/* Top Header Band */}
        <div className="bg-[#0B1325] tone-dark text-white p-4 sm:p-5 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider motion-safe:animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
              FREE PASS
            </span>
            <span className="text-teal-400 text-xs font-bold">
              {percentReserved}% RESERVED ({allocatedSeats}/{totalCapacity})
            </span>
          </div>

          <h2 id="quick-register-title" className="font-sans font-bold text-lg sm:text-xl text-white">
            Reserve Your Free Live Session Seat
          </h2>
          <p className="font-sans text-xs text-slate-300 mt-0.5">
            Sat, 19 Sep @ 6:00 PM IST · 75 Mins · Google Meet
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-3.5 text-left">
            {/* Full Name */}
            <div>
              <label htmlFor="quick-name" className="block text-xs font-bold text-slate-800 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="quick-name"
                type="text"
                required
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                onFocus={() => onInputFocus?.("name")}
                placeholder="e.g. Priya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-600 font-sans text-sm min-h-[44px]"
              />
            </div>

            {/* WhatsApp Phone */}
            <div>
              <label htmlFor="quick-phone" className="block text-xs font-bold text-slate-800 mb-1">
                WhatsApp Number <span className="text-rose-500">*</span>
                <span className="text-[11px] font-normal text-slate-500 ml-1">(for Google Meet access)</span>
              </label>
              <input
                id="quick-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                onFocus={() => onInputFocus?.("phone")}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-600 font-sans text-sm min-h-[44px]"
              />
            </div>

            {/* Pharmacy College Name */}
            <div>
              <label htmlFor="quick-college" className="block text-xs font-bold text-slate-800 mb-1">
                College / Institution Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="quick-college"
                type="text"
                required
                value={college}
                onChange={(e) => onCollegeChange(e.target.value)}
                onFocus={() => onInputFocus?.("college")}
                placeholder="e.g. Bombay College of Pharmacy"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-600 font-sans text-sm min-h-[44px]"
              />
            </div>

            {/* Degree & Graduation Year Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="quick-degree" className="block text-xs font-bold text-slate-800 mb-1">
                  Degree
                </label>
                <select
                  id="quick-degree"
                  value={degree}
                  onChange={(e) => onDegreeChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white tone-light font-sans text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-600 min-h-[44px]"
                >
                  <option value="B.Pharm">B.Pharm</option>
                  <option value="M.Pharm">M.Pharm</option>
                  <option value="Pharm.D">Pharm.D</option>
                  <option value="Life Sciences">B.Sc / M.Sc Life Sciences</option>
                </select>
              </div>

              <div>
                <label htmlFor="quick-grad-year" className="block text-xs font-bold text-slate-800 mb-1">
                  Year of Passing
                </label>
                <select
                  id="quick-grad-year"
                  value={graduationYear}
                  onChange={(e) => onGraduationYearChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white tone-light font-sans text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-600 min-h-[44px]"
                >
                  <option value="2027">2027 (Pre-final)</option>
                  <option value="2026">2026 (Final Year)</option>
                  <option value="2025">2025 (Recent Graduate)</option>
                  <option value="2024">2024 &amp; Earlier</option>
                </select>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-75 text-white font-sans text-sm font-bold shadow-lg shadow-teal-600/25 transition-all cursor-pointer min-h-[48px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 motion-safe:animate-spin text-white" />
                  <span>Reserving Your Seat...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM MY FREE PASS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trust Micro-Footer */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                100% Free · No Card Required
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                500+ Indian Graduates
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
