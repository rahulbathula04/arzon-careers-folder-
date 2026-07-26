import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  GraduationCap,
  Briefcase,
  Award,
  Check,
  Trophy,
  Sparkles,
} from "lucide-react";

type Step = {
  i: string;
  icon: typeof ClipboardCheck;
  weeks: string;
  title: string;
  desc: ReactNode;
  checklist: string[];
  gradient: string;
  accentColor: string;
  xpLabel: string;
  xpBg: string;
  xpFg: string;
};

const STEPS: Step[] = [
  {
    i: "01",
    icon: ClipboardCheck,
    weeks: "DAY 0",
    title: "Apply in 1 minute",
    desc: (
      <>
        Fill the form. A counsellor calls you back the <strong>same day or next morning.</strong>
      </>
    ),
    checklist: ["1-minute form", "Same-day callback", "No payment to apply"],
    gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",
    accentColor: "#2563eb",
    xpLabel: "# +1 COUNSELLOR CALL",
    xpBg: "bg-blue-50 border-blue-200",
    xpFg: "text-blue-700",
  },
  {
    i: "02",
    icon: GraduationCap,
    weeks: "WEEKS 1–8",
    title: "Learn live for 8 weeks",
    desc: (
      <>
        <strong>Live classes with industry mentors.</strong> Weekly homework on{" "}
        <strong>real medical files.</strong>
      </>
    ),
    checklist: ["Live industry mentors", "Graded weekly homework", "Real medical files"],
    gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",
    accentColor: "#ea580c",
    xpLabel: "# +8 GRADED LESSONS",
    xpBg: "bg-orange-50 border-orange-200",
    xpFg: "text-orange-700",
  },
  {
    i: "03",
    icon: Briefcase,
    weeks: "WEEKS 9–12",
    title: "Real internship · 4 weeks",
    desc: (
      <>
        Work on <strong>actual hospital or CRO projects.</strong> Get a certificate you can{" "}
        <strong>verify online.</strong>
      </>
    ),
    checklist: ["Hospital / CRO project", "Mentor reviews", "Verifiable certificate"],
    gradient: "from-[#047857] via-[#059669] to-[#0d9488]",
    accentColor: "#059669",
    xpLabel: "# +1 CAPSTONE PROJECT",
    xpBg: "bg-emerald-50 border-emerald-200",
    xpFg: "text-emerald-700",
  },
  {
    i: "04",
    icon: Award,
    weeks: "WEEK 12+",
    title: "Resume + interview help",
    desc: (
      <>
        We fix your CV, do mock interviews, and connect you to <strong>hiring partners.</strong>
      </>
    ),
    checklist: ["CV rewrite", "Mock interviews", "Direct hiring intros"],
    gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",
    accentColor: "#7c3aed",
    xpLabel: "# +1 SHOT AT AN OFFER",
    xpBg: "bg-purple-50 border-purple-200",
    xpFg: "text-purple-700",
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 240, damping: 22 },
    },
  };

  return (
    <section
      id="how"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Section Title Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">
            4 simple steps
          </h2>
          <p className="text-sm sm:text-base text-[#5B6472] leading-relaxed">
            No long lectures. No PDFs to read alone. You learn while you do real work.
          </p>
        </div>

        {/* Master Outer Container (Matching Image 2) */}
        <div className="rounded-[32px] border border-slate-200/90 bg-gradient-to-b from-[#F0F5FF]/70 via-white to-[#F8FAFC] p-6 sm:p-10 space-y-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
          {/* Header pill badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-amber-300/80 px-5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A6D1F] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              12 WEEKS · 4 STAGES · 3+ DELIVERABLES
            </span>
          </div>

          {/* Connected Process Node Timeline Bar (Desktop) */}
          <div className="hidden lg:block relative max-w-4xl mx-auto py-4">
            {/* Dashed Connecting Line */}
            <div className="absolute top-9 left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-300 z-0" />

            <div className="flex items-center justify-between relative z-10">
              {STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.i} className="flex flex-col items-center space-y-2">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-4 ring-white"
                      style={{ backgroundColor: s.accentColor }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">
                      {s.weeks}
                    </span>
                  </div>
                );
              })}
              {/* Node 5: Hired */}
              <div className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-4 ring-white bg-amber-500">
                  <Trophy className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#707C90]">
                  HIRED
                </span>
              </div>
            </div>
          </div>

          {/* 4 Vertical Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.article
                  variants={itemVariants}
                  key={step.i}
                  className="flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Header Banner */}
                  <div
                    className={`bg-gradient-to-r ${step.gradient} p-4 text-white relative min-h-[85px] flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className="inline-flex items-center gap-1 bg-white/95 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                        STEP {step.i}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-white/95 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                        {step.weeks}
                      </span>
                    </div>

                    <Icon className="absolute right-2 bottom-1 h-12 w-12 opacity-25 select-none pointer-events-none" />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-[#151C2E]">{step.title}</h3>
                      <p className="text-xs text-[#5B6472] leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                      {step.checklist.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-[#151C2E] font-medium"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* XP Tag */}
                    <div className="pt-2">
                      <span
                        className={`inline-block w-full text-center px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold tracking-wider ${step.xpBg} ${step.xpFg}`}
                      >
                        {step.xpLabel}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
