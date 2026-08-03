import { useState } from "react";
import { XCircle, CheckCircle2, Frown, Smile, ArrowDown, HelpCircle, ShieldAlert, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CareerGuessworkEnemy() {
  const [activeTab, setActiveTab] = useState<"current" | "desired">("current");

  const emotionalSteps = [
    {
      id: "1",
      current: "I'm confused about which healthcare path fits my background.",
      desired: "I know exactly which career fits my degree & skills.",
      currentDetail: "Trying to filter through 50+ vague role titles without knowing daily expectations.",
      desiredDetail: "Data-driven mapping matching B.Pharm/Pharm.D/MBBS/BDS directly to domain roles."
    },
    {
      id: "2",
      current: "I don't know which healthcare domain pays well & has long-term stability.",
      desired: "I know the 5-year salary trajectory and corporate demand.",
      currentDetail: "Relying on random advice from seniors, Instagram reels, and YouTube channels.",
      desiredDetail: "Real JD metrics from top employers (IQVIA, Novartis, Accenture, Parexel)."
    },
    {
      id: "3",
      current: "I don't know who to trust after seeing so many fake institutes.",
      desired: "I have transparent proof & government-aligned accreditation.",
      currentDetail: "Burnt out by high-pressure sales calls promising '100% placement guarantees'.",
      desiredDetail: "Verified proof methodology, ISO standards, and zero sales funnel pressure."
    },
    {
      id: "4",
      current: "I'm afraid of wasting another year and money on irrelevant courses.",
      desired: "I have a clear 12-week roadmap directly to employment.",
      currentDetail: "Enrolling in theoretical courses that don't teach real corporate software.",
      desiredDetail: "Direct hands-on experience with Argus, eCTD, SAS, and MedDRA."
    },
    {
      id: "5",
      current: "I don't know if AI will replace this healthcare career in 3 years.",
      desired: "I know my role is AI-augmented and future-proof.",
      currentDetail: "Uncertainty around automation replacing routine medical or coding work.",
      desiredDetail: "Clear AI-risk scores showing why human domain expertise is indispensable."
    }
  ];

  return (
    <section className="bg-slate-900 py-20 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-400 mb-4">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>THE ENEMY: CAREER GUESSWORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            Stop letting guesswork decide your future.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Students spend 6 to 12 months trying to answer "What should I become?" through YouTube, Reddit, Instagram, and pushy sales webinars. We eliminate guesswork entirely.
          </p>
        </div>

        {/* Contrast Grid: Old Way vs Healthcare Career Intelligence */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* The Old Way */}
          <div className="rounded-2xl border border-red-900/40 bg-slate-950/80 p-6 sm:p-8 relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <XCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">The Old EdTech & Webinar Model</h3>
                <p className="text-xs text-red-400 font-medium">Sales Funnels & Generic Training</p>
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">"Free Webinars"</strong> that are 90% hard-sell pitch decks for 1-lakh courses.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">Vague Job Guarantees</strong> without explaining tool requirements or actual hiring JDs.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">Theory-Heavy Syllabi</strong> disconnected from real Argus, eCTD, SAS, or MedDRA workflows.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">Zero Career Intelligence</strong> — students leave still wondering if the role fits them.</span>
              </li>
            </ul>
          </div>

          {/* Healthcare Career Intelligence */}
          <div className="rounded-2xl border border-blue-500/40 bg-gradient-to-b from-blue-950/40 via-slate-950 to-slate-950 p-6 sm:p-8 relative overflow-hidden shadow-2xl ring-1 ring-blue-500/20">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Healthcare Career Intelligence</h3>
                <p className="text-xs text-blue-400 font-medium">Clarity, Data & Proof First</p>
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Domain-Fit Analysis</strong> before spending a single rupee on education or certifications.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Live Market Salary & Hiring Data</strong> aggregated directly from top life-science companies in India.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Hands-on Software Intelligence</strong> showcasing Argus Safety, MedDRA, eCTD, and SAS in action.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Future-Proof AI Assessment</strong> evaluating long-term security across each specialization.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* The Emotional Journey Interactive Stepper */}
        <div className="mt-20 rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-100">
                The User's Emotional Transformation
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Toggle between where you are today vs. where Healthcare Career Intelligence takes you.
              </p>
            </div>

            <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("current")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "current"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Frown className="h-4 w-4" />
                <span>Current State 😞</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("desired")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "desired"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Smile className="h-4 w-4" />
                <span>Desired State 😊</span>
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <AnimatePresence mode="wait">
              {emotionalSteps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`rounded-2xl p-5 border transition-all ${
                    activeTab === "current"
                      ? "border-red-900/30 bg-red-950/10 hover:bg-red-950/20"
                      : "border-emerald-900/30 bg-emerald-950/10 hover:bg-emerald-950/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      activeTab === "current" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-base font-bold ${
                        activeTab === "current" ? "text-red-200" : "text-emerald-200"
                      }`}>
                        {activeTab === "current" ? `"${step.current}"` : `"${step.desired}"`}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        {activeTab === "current" ? step.currentDetail : step.desiredDetail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
