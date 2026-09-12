import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, GraduationCap, Clock, CheckCircle2, Sparkles, Target, Compass, BookOpen } from "lucide-react";

export interface YearPathway {
  id: string;
  badgeLabel: string;
  title: string;
  headline: string;
  subtitle: string;
  primaryFocus: string;
  keyMilestones: string[];
  recommendedActions: { label: string; route: string; variant: "primary" | "secondary" }[];
  opportunityCostNote: string;
  recommendedRoleTracks: string[];
}

export const YEAR_PATHWAYS: YearPathway[] = [
  {
    id: "1st-2nd-year",
    badgeLabel: "1st & 2nd Year Students",
    title: "Early Career Exploration & Foundation",
    headline: "Understand Industry Roles Before Campus Recruitment Arrives",
    subtitle: "Explore life science and healthcare career options early. Understand what Pharmacovigilance, Medical Coding, and Clinical Research actually involve before choosing electives.",
    primaryFocus: "Domain Clarity & Role Mapping",
    keyMilestones: [
      "Map your college degree (B.Pharm, Pharm.D, B.Sc) to global healthcare industry roles",
      "Understand entry-level job descriptions in GCCs (Global Capability Centers)",
      "Build basic familiarity with industry terminology (ICSR, ICD-10, GCP, CDISC)"
    ],
    recommendedActions: [
      { label: "Explore Career Role Profiles", route: "/roles", variant: "primary" },
      { label: "Compare Career Options", route: "/comparisons", variant: "secondary" }
    ],
    opportunityCostNote: "Starting exploration early gives you 18–24 months to build skills without panic before final year.",
    recommendedRoleTracks: ["Pharmacovigilance", "Medical Coding", "Clinical Data Management"]
  },
  {
    id: "3rd-year",
    badgeLabel: "3rd Year Students",
    title: "Practical Skill Acquisition & Tool Fluency",
    headline: "Build Real Software Capability Alongside University Theory",
    subtitle: "Third year is the strategic acquisition window. Start practicing on industry databases like Oracle Argus Safety, MedDRA coding, and Medidata RAVE.",
    primaryFocus: "Technical Tool Mastery & Practice Assignments",
    keyMilestones: [
      "Hands-on case processing in Oracle Argus & MedDRA coding rules",
      "ICD-10-CM chart auditing & eCRF data management workflows",
      "Complete industry case assignments to build a verified portfolio"
    ],
    recommendedActions: [
      { label: "Explore Role Training", route: "/training", variant: "primary" },
      { label: "View Practical Internships", route: "/internships", variant: "secondary" }
    ],
    opportunityCostNote: "Students who acquire tool fluency in 3rd year transition directly into internships during final year.",
    recommendedRoleTracks: ["Pharmacovigilance Associate", "Medical Coder", "Clinical Data Associate"]
  },
  {
    id: "4th-year",
    badgeLabel: "4th Year Students (High Intent)",
    title: "Role Preparation & 12-Week Applied Internship",
    headline: "Graduate Career-Ready Without Losing a Year After College",
    subtitle: "Don't wait until degree completion to start job search prep. Combine focused 12-week role training with applied capstone internships in your final semester.",
    primaryFocus: "12-Week Role Training & Capstone Internship",
    keyMilestones: [
      "12-week intensive role training (Argus Safety, ICD-10, CDISC SAS, RAVE)",
      "Applied capstone internship with ISO-verifiable credential",
      "Technical interview preparation on 300+ real job description interview questions"
    ],
    recommendedActions: [
      { label: "View 12-Week Training Tracks", route: "/training", variant: "primary" },
      { label: "Calculate Relocation & Prep Costs", route: "/tools/cost-calculator", variant: "secondary" }
    ],
    opportunityCostNote: "Preparing before graduation saves up to ₹1,39,000 in metro PG/living expenses and 6–12 months of post-college idle time.",
    recommendedRoleTracks: ["PV Safety Specialist", "Certified Medical Coder", "Clinical SAS Programmer"]
  },
  {
    id: "graduates",
    badgeLabel: "Recent Graduates",
    title: "Fast-Track Career Readiness & Industry Entry",
    headline: "Eliminate Post-Graduation Idle Time With Practical Role Training",
    subtitle: "Already completed your degree? Stop spending months figuring out what to learn. Transition directly into structured role-focused training and applied internship work.",
    primaryFocus: "Fast-Track Preparation & Industry Portfolio",
    keyMilestones: [
      "Focused practical training on live de-identified case datasets",
      "Applied capstone internship with public verification URL & QR validation",
      "Direct technical prep for immediate entry-level hiring drives"
    ],
    recommendedActions: [
      { label: "Explore Role Preparation", route: "/training", variant: "primary" },
      { label: "Read Empirical Market Reports", route: "/research", variant: "secondary" }
    ],
    opportunityCostNote: "Structured 12-week role training reduces job-search friction and gets you application-ready faster.",
    recommendedRoleTracks: ["Drug Safety Associate", "Clinical Research Coordinator", "Regulatory Affairs Executive"]
  }
];

export function StudentYearPaths() {
  const [activeTab, setActiveTab] = useState<string>("4th-year");
  const currentPath = YEAR_PATHWAYS.find((p) => p.id === activeTab) || YEAR_PATHWAYS[2];

  return (
    <section id="student-pathways" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>STUDENT &amp; GRADUATE PATHWAYS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Start Preparing <span className="italic text-[#1B3F8B]">Before You Graduate</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
            Select your current academic stage to discover the most effective preparation timeline for your career goals.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-stone-200/70 border border-stone-300/80">
          {YEAR_PATHWAYS.map((path) => {
            const isActive = activeTab === path.id;
            return (
              <button
                key={path.id}
                type="button"
                onClick={() => setActiveTab(path.id)}
                className={`relative px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? "bg-[#1B3F8B] text-slate-50 shadow-md font-sans"
                    : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/80"
                }`}
              >
                <span>{path.badgeLabel}</span>
                {path.id === "4th-year" && (
                  <span className={`text-[10px] font-mono font-normal uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-amber-400 text-stone-900 font-bold" : "bg-amber-100 text-amber-900"
                  }`}>
                    High Intent
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pathway Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 lg:p-10 shadow-lg space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Focus & Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {currentPath.primaryFocus}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-3 leading-snug">
                    {currentPath.headline}
                  </h3>
                  <p className="mt-3 text-stone-700 text-sm sm:text-base leading-relaxed">
                    {currentPath.subtitle}
                  </p>
                </div>

                {/* Key Milestones */}
                <div className="space-y-3 pt-2 border-t border-stone-200">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
                    RECOMMENDED PREPARATION MILESTONES
                  </h4>
                  <ul className="space-y-2.5">
                    {currentPath.keyMilestones.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-stone-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  {currentPath.recommendedActions.map((action, i) => (
                    <Link
                      key={i}
                      to={action.route}
                      className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        action.variant === "primary"
                          ? "bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 shadow-sm hover:shadow-md"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300"
                      }`}
                    >
                      <span>{action.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column: Opportunity Cost & Recommended Roles */}
              <div className="lg:col-span-5 space-y-6 bg-stone-50/80 rounded-2xl border border-stone-200 p-5 sm:p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#8A6D1F] font-mono text-xs font-bold uppercase tracking-wider">
                    <Clock className="h-4 w-4" />
                    <span>OPPORTUNITY COST INSIGHT</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {currentPath.opportunityCostNote}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    RECOMMENDED TARGET ROLES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentPath.recommendedRoleTracks.map((role, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-white tone-light border border-stone-300 text-stone-800 text-xs font-bold font-mono shadow-2xs"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono">ARZON PRINCIPLE</span>
                  <span className="font-bold text-[#1B3F8B]">Train for Roles, Not Courses</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
