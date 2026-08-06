import React from "react";
import { ArrowRight, UserCheck, ShieldCheck, Code, Award, Send } from "lucide-react";

/**
 * Section 3B — The Recruiter's Desk (The Hiring System)
 * Design: High-contrast white background, 5-stage horizontal/vertical pipeline
 * explaining how Arzon prepares candidates around how recruiters actually evaluate.
 */
export function HiringSystemBlock() {
  const steps = [
    {
      num: "01",
      title: "Candidate Sourcing & Skill Audit",
      desc: "Degree verification. We map your current coding capability against live HSBC & JPMorgan job descriptions.",
      icon: UserCheck,
    },
    {
      num: "02",
      title: "Production Code & GitHub Audit",
      desc: "You build real banking data labs (Scikit-learn, PyTorch, Spacy RAG). Code is audited for production OOP standards.",
      icon: Code,
    },
    {
      num: "03",
      title: "HackerRank Benchmark Clearing",
      desc: "Timed mock assessments matching HSBC's Day 1 screening format. You pass internal thresholds before candidate routing.",
      icon: Award,
    },
    {
      num: "04",
      title: "Partner Desk Submission",
      desc: "Your verified assessment scorecard, GitHub repository, and ISO 9001 internship certificate are packaged for partner review.",
      icon: Send,
    },
    {
      num: "05",
      title: "Hiring Manager Review & Interview",
      desc: "Direct delivery to talent acquisition decision-makers at HSBC, JPMorgan Chase, and partner GCCs across India.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="hiring-system"
      aria-labelledby="hiring-system-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white tone-light text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            INSIDER RECRUITMENT INFRASTRUCTURE
          </p>
          <h2
            id="hiring-system-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            We built a recruitment system around{" "}
            <span className="italic text-[#1B3F8B]">how global banks actually evaluate fresh graduates.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Stop guessing what recruiters want. Every step in our 12-week pipeline matches the exact evaluation criteria used by HSBC and JPMorgan Chase talent acquisition teams.
          </p>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-3 flex flex-col justify-between hover:border-[#1B3F8B]/50 transition-all hover:shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-[#1B3F8B]/10 px-2.5 py-1 rounded-full border border-[#1B3F8B]/20">
                      STEP {s.num}
                    </span>
                    <Icon className="h-5 w-5 text-[#1B3F8B]" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#1A1A1A] leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {s.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:flex justify-end pt-2 text-stone-400">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
