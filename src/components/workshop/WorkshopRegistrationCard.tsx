import { useState } from "react";
import { Sparkles, Calendar, Clock, CheckCircle2, ArrowRight, ShieldCheck, User, Mail, Phone, BookOpen, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkshopRegistrationCardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function WorkshopRegistrationCard({ isOpen, onClose, onOpen }: WorkshopRegistrationCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState("B.Pharm / Pharm.D");
  const [preferredSession, setPreferredSession] = useState("Weekend Intake - Live Interactive");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const workshopAgenda = [
    {
      session: "Session 1",
      title: "Healthcare Domain Landscape & Salary Mapping",
      desc: "Uncover hidden high-paying roles in Pharmacovigilance, CDM, Regulatory Affairs & Health Analytics."
    },
    {
      session: "Session 2",
      title: "Corporate Software & Tool Intelligence",
      desc: "Live walkthrough of Argus Safety, MedDRA 26.0, eCTD publishing, and SAS programming environments."
    },
    {
      session: "Session 3",
      title: "AI Impact & Future-Proof Role Selection",
      desc: "Detailed evaluation of automation risk and identifying AI-augmented, indispensable roles."
    },
    {
      session: "Session 4",
      title: "Personal 1-on-1 Career Diagnostic & Roadmap",
      desc: "Constructing your tailored 12-week deployment roadmap tailored to your graduation timeline."
    }
  ];

  return (
    <section id="workshop" className="bg-slate-900 py-20 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>THE NEXT OBVIOUS STEP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            Reserve your seat in the Healthcare Career Intelligence Workshop.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            No sales funnel. No hype webinars. 90 minutes of pure domain intelligence, live software demonstrations, and personal career matching.
          </p>
        </div>

        {/* Workshop Overview Card */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-blue-500/40 bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Upcoming Intake Session</h3>
                <p className="text-xs text-slate-400">Live Interactive Virtual Session</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                <Clock className="h-3.5 w-3.5" />
                Duration: 90 Mins
              </span>
              <span className="text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                Fee: 100% Free Discovery
              </span>
            </div>
          </div>

          {/* Agenda Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {workshopAgenda.map((item) => (
              <div key={item.session} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="text-xs font-mono font-bold text-blue-400 block mb-1">
                  {item.session}
                </span>
                <h4 className="text-sm font-bold text-slate-100 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Registration Trigger CTA */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Small cohort sizes maintained for 1-on-1 interaction.</span>
            </div>

            <button
              type="button"
              onClick={onOpen}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Start My Career Discovery</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

        </div>

      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-white shadow-2xl"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="pr-8">
                    <span className="text-xs font-mono font-bold text-blue-400 block mb-1">
                      RESERVE YOUR CAREER SESSION
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white">
                      Find My Best-Fit Career
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter your details to receive instant access to the Healthcare Career Intelligence Workshop session.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Dr. Ananya Sharma"
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ananya@example.com"
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Educational Background</label>
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="B.Pharm / Pharm.D">B.Pharm / Pharm.D</option>
                        <option value="MBBS / BDS / AYUSH">MBBS / BDS / AYUSH</option>
                        <option value="M.Sc / B.Sc Life Sciences">M.Sc / B.Sc Life Sciences</option>
                        <option value="Biotechnology / Bioinformatics">Biotechnology / Bioinformatics</option>
                        <option value="Nursing / Allied Health">Nursing / Allied Health</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Confirming Reservation..." : "Reserve My Career Session"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Seat Reservation Active!
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                    Thank you, <strong className="text-white">{name}</strong>. Your Healthcare Career Intelligence session details and meeting link have been reserved for <strong className="text-white">{email}</strong>.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-800 px-6 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700"
                  >
                    Done
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
