import { useState } from "react";
import { 
  Calendar, Clock, Video, CheckCircle2, ArrowRight, XCircle, Sparkles, X, Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkshopRegistrationCardProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
}

export function WorkshopRegistrationCard({
  isOpenModal,
  onCloseModal,
  onOpenModal
}: WorkshopRegistrationCardProps) {
  const [degree, setDegree] = useState("B.Pharm / Pharm.D");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;
    setSubmitted(true);
  };

  const beforeItems = [
    "Uncertain which domain fits your specific qualification",
    "Binge-watching conflicting YouTube advice & forum threads",
    "Applying blindly without software skills (Argus, MedDRA, eCTD)",
    "Unsure about starting pay bands across different MNCs"
  ];

  const afterItems = [
    "Exact data-backed match score for your specific degree",
    "Clear 12-week roadmap tailored for top MNC technical rounds",
    "Clarity on mandatory corporate software tools & expectations",
    "Direct insight into real recruiter hiring criteria and salaries"
  ];

  return (
    <section className="tone-dark bg-[#020617] py-24 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Healthcare Career Intelligence Workshop
          </h2>
          <p className="mt-3 text-base text-slate-300 font-sans leading-relaxed">
            A 90-minute live executive session designed to replace months of guesswork with complete career certainty.
          </p>
        </div>

        {/* Before vs After Transformation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Before */}
          <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/60 p-6 sm:p-8 min-h-[380px] flex flex-col justify-between backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-mono font-bold text-slate-300 text-xs uppercase tracking-wider">BEFORE WORKSHOP</span>
                <span className="text-rose-400 text-xs font-mono font-bold">❌ Career Guesswork</span>
              </div>
              <div className="mt-6 space-y-4">
                {beforeItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-sans">
                    <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl border border-blue-500/30 bg-[#0f172a]/80 p-6 sm:p-8 min-h-[380px] flex flex-col justify-between backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
                <span className="font-mono font-bold text-blue-300 text-xs uppercase tracking-wider">AFTER WORKSHOP</span>
                <span className="text-emerald-400 text-xs font-mono font-bold">✓ Career Certainty</span>
              </div>
              <div className="mt-6 space-y-4">
                {afterItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-sans">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Live Workshop Session Card */}
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 text-center shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-mono mb-6 pb-6 border-b border-slate-800">
            <span className="flex items-center gap-2 font-semibold">
              <Calendar className="h-4 w-4 text-blue-400" />
              Upcoming Weekend Session
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-emerald-400" />
              90 Minutes Live
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <Video className="h-4 w-4 text-sky-400" />
              Live Interactive Zoom
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-sans">
            Reserve Your Personalized Intelligence Session
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 font-sans">
            Get your degree-specific match score, salary trajectory, and corporate software roadmap in 90 minutes.
          </p>

          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Reserve Intelligence Session</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Reservation Modal - Deep Dark Theme with Perfect Form Contrast */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0f172a] p-6 sm:p-8 shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={onCloseModal}
                className="absolute top-5 right-5 p-1.5 rounded-xl bg-[#080d1a] border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>30-SECOND RESERVATION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                    Find Your Best-Fit Career Path
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                    Enter your degree details to unlock your personal intelligence analysis.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Select Qualification Field */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        YOUR DEGREE QUALIFICATION
                      </label>
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                        className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-sm text-white font-sans font-semibold focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="B.Pharm / Pharm.D" style={{ backgroundColor: "#0f172a", color: "#ffffff" }}>
                          B.Pharm / Pharm.D
                        </option>
                        <option value="M.Pharm" style={{ backgroundColor: "#0f172a", color: "#ffffff" }}>
                          M.Pharm (PV / Regulatory / Pharmacology)
                        </option>
                        <option value="B.Sc / M.Sc Life Sciences" style={{ backgroundColor: "#0f172a", color: "#ffffff" }}>
                          B.Sc / M.Sc Life Sciences / Biotech
                        </option>
                        <option value="MBBS / BDS / BAMS / BHMS" style={{ backgroundColor: "#0f172a", color: "#ffffff" }}>
                          MBBS / BDS / BAMS / BHMS
                        </option>
                        <option value="B.Tech Biotech / Bio-info" style={{ backgroundColor: "#0f172a", color: "#ffffff" }}>
                          B.Tech Biotech / Bioinformatics
                        </option>
                      </select>
                    </div>

                    {/* Full Name Field */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                        className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-sm text-white placeholder-slate-400 font-sans focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* WhatsApp Mobile Number Field */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                        WHATSAPP / MOBILE NUMBER
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your 10-digit mobile number"
                        style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
                        className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-sm text-white placeholder-slate-400 font-sans focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer mt-2 shadow-lg shadow-blue-600/30"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Confirm My Workshop Seat</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-sans">
                    Reservation Confirmed, {name}!
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-sm mx-auto font-sans">
                    Your seat for the Healthcare Career Intelligence Workshop is locked. Our team will share your Zoom link and pre-workshop match report on WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-[#080d1a] px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                  >
                    <span>Done</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
