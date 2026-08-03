import { useState } from "react";
import { CheckCircle2, ChevronRight, Compass, ShieldCheck, Flag, Award, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function FutureTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(3); // Default to Workshop step

  const milestones = [
    {
      step: 1,
      title: "Today",
      subtitle: "Career Confusion & Guesswork",
      detail: "Graduating with a degree in pharmacy, medicine, or life sciences without knowing which specific corporate domain matches your skills.",
      status: "Starting Point"
    },
    {
      step: 2,
      title: "Career Discovery",
      subtitle: "Data & Market Mapping",
      detail: "Evaluating real JD data, salary trends, work-life balance, and software tool requirements across 6 major healthcare domains.",
      status: "Discovery Phase"
    },
    {
      step: 3,
      title: "Skill Assessment",
      subtitle: "Personal Diagnostic",
      detail: "Taking the 30-second Career Decision Engine to identify your 90%+ match domain and software prerequisite checklist.",
      status: "Fit Assessment"
    },
    {
      step: 4,
      title: "Workshop Session",
      subtitle: "Interactive Strategy",
      detail: "Attending the 90-minute Healthcare Career Intelligence live session for software walkthroughs and 1-on-1 career mapping.",
      status: "Current Action"
    },
    {
      step: 5,
      title: "Applied Learning",
      subtitle: "Tool Practice",
      detail: "Mastering corporate Argus Safety, eCTD, SAS, or MedDRA workflows rather than outdated academic memorization.",
      status: "Capability Build"
    },
    {
      step: 6,
      title: "Live Projects",
      subtitle: "Dossier & Safety Cases",
      detail: "Executing real corporate projects (processing ICSR safety cases, compiling eCTD Module 3 dossiers, CDISC SDTM coding).",
      status: "Portfolio Build"
    },
    {
      step: 7,
      title: "Internship & Deployment",
      subtitle: "Hiring Partner Network",
      detail: "Deploying directly into verified employer interviews (IQVIA, Novartis, Cognizant, Parexel, Accenture) with validated proof.",
      status: "Career Success"
    }
  ];

  const current = milestones[selectedMilestone - 1];

  return (
    <section className="bg-slate-950 py-20 text-white relative border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-4">
            <Compass className="h-3.5 w-3.5" />
            <span>THE HEALTHCARE CAREER TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-100 tracking-tight">
            See your exact path from confusion to employment.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Students immediately understand where they are today and how each milestone leads directly to employer placement.
          </p>
        </div>

        {/* Horizontal Scrollable Timeline Bar */}
        <div className="mt-14 overflow-x-auto pb-6 scrollbar-none">
          <div className="flex items-center min-w-max px-4 space-x-3">
            {milestones.map((m) => {
              const isSelected = selectedMilestone === m.step;
              return (
                <button
                  key={m.step}
                  type="button"
                  onClick={() => setSelectedMilestone(m.step)}
                  className={`flex flex-col items-start p-4 rounded-2xl border transition-all text-left cursor-pointer w-48 ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                      : "border-slate-800 bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      {m.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{m.status}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{m.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{m.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Detailed Callout */}
        <motion.div
          key={selectedMilestone}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-3xl border border-blue-500/30 bg-slate-900/90 p-6 sm:p-8 shadow-xl max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                Milestone Step {current.step} of 7
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {current.title} — {current.subtitle}
              </h3>
            </div>
            <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              {current.status}
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-300 leading-relaxed font-sans">
            {current.detail}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
