import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, CalendarDays, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Layers, Target, Briefcase, Award, GraduationCap } from "lucide-react";
import { COUNSELLOR_PHONE } from "./constants";

const STEPS = [
  {
    num: "01",
    title: "Understand the Role",
    desc: "Learn what a Fresher Pharmacovigilance Associate actually does and what the role requires.",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "Build the Skills",
    desc: "Train around the recurring requirements identified from current industry hiring.",
    icon: Layers,
  },
  {
    num: "03",
    title: "Work on Practical Projects",
    desc: "Apply your learning through role-specific practical work.",
    icon: Target,
  },
  {
    num: "04",
    title: "Get Assessed",
    desc: "Test your knowledge and practical capability against the track requirements.",
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Gain Internship Experience",
    desc: "Complete structured practical experience as part of the program.",
    icon: Briefcase,
  },
  {
    num: "06",
    title: "Become Role-Ready",
    desc: "Complete your final assessment and career preparation.",
    icon: GraduationCap,
  },
];

function getUpcomingCohortDate() {
  const now = new Date();
  let target = new Date(now.getFullYear(), now.getMonth(), 15);
  if (now.getDate() >= 12) {
    target = new Date(now.getFullYear(), now.getMonth(), 30);
  }
  if (now.getDate() >= 27) {
    target = new Date(now.getFullYear(), now.getMonth() + 1, 15);
  }
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(target);
}

export function LimitedSeatsCountdown() {
  const cohortDate = getUpcomingCohortDate();
  const waMessage = encodeURIComponent(
    "Hi Arzon Global! I am interested in the Fresher Pharmacovigilance Associate – 12 Week Role Track. I want to check my eligibility and details.",
  );
  const waUrl = `https://wa.me/${COUNSELLOR_PHONE}?text=${waMessage}`;

  return (
    <section
      id="limited-seats"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]"
    >
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50 px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
            FRESHER PHARMACOVIGILANCE ASSOCIATE
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#151C2E] tracking-tight leading-tight">
            Train for the Role.{" "}
            <span className="italic text-[#8A6D1F]">Not Just the Degree.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed font-medium">
            A 12-week role track built around the skills and capabilities commonly expected in current entry-level Pharmacovigilance roles.
          </p>
        </div>

        {/* 6-Stage Curriculum Journey Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B]">
              What you'll go through
            </h3>
            <span className="text-xs font-mono font-semibold text-[#8A6D1F]">
              6 Guided Milestones
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-slate-200/90 bg-white tone-light p-5 sm:p-6 space-y-3 shadow-xs hover:shadow-md transition-all hover:border-slate-300 flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {step.num}
                    </span>
                    <step.icon className="h-4 w-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#151C2E]">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentic Cohort Status & Next Batch Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white tone-light p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#151C2E]">
                  NEXT COHORT
                </span>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-700">
                  Applications are open
                </span>
              </div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#151C2E]">
                Starts <span className="text-[#8A6D1F]">{cohortDate}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              <span>Limited cohort capacity</span>
            </div>
          </div>

          {/* Highlights & Tags */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-xs font-mono font-bold text-[#475569]">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              12 Weeks Duration
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Online & Flexible
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Role-Specific Practical Training
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/pv-associate"
              style={{ color: "#FFFFFF", backgroundColor: "#151C2E" }}
              className="w-full sm:w-auto flex-1 rounded-full hover:bg-[#2563EB] text-slate-50 text-sm font-bold h-12 px-6 flex items-center justify-center gap-2 transition-colors shadow-md group"
            >
              <span className="text-slate-50 font-bold">Check Your Eligibility</span>
              <ArrowRight className="h-4 w-4 text-slate-50 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-slate-50 text-sm font-bold h-12 px-6 flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageCircle className="h-4 w-4 text-slate-50" />
              <span className="text-slate-50 font-bold">Chat with Arzon Global on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
