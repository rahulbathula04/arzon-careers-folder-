import { Search, UserCheck, BookOpen, Award, Briefcase } from "lucide-react";

export function HomeJourneyRoadmap() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Explore Roles",
      desc: "See real job requirements from 2,000+ JDs",
    },
    {
      number: 2,
      icon: UserCheck,
      title: "Assess Your Fit",
      desc: "Get a personalised career report",
    },
    {
      number: 3,
      icon: BookOpen,
      title: "Learn & Build Skills",
      desc: "Role-focused training with real projects",
    },
    {
      number: 4,
      icon: Award,
      title: "Showcase Proof",
      desc: "Work samples & ACRI certification",
    },
    {
      number: 5,
      icon: Briefcase,
      title: "Apply With Confidence",
      desc: "Guidance, interview prep and placement support",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="ap-shell">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center justify-center gap-1.5">
            <span>YOUR JOURNEY WITH ARZON</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">
            From guidance to placement readiness.
          </h2>
        </div>

        {/* 5-Step Process Track */}
        <div className="relative">
          {/* Connector Line behind steps (desktop) */}
          <div
            className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-[2px] bg-[#E4EAF2] -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Badge */}
                  <div className="relative mb-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white border-2 border-[#D0E1FD] group-hover:border-[#1557D6] text-[#1557D6] shadow-sm transition-all tone-light card-light">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#1557D6] text-white text-[10px] font-mono font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sans text-sm sm:text-base font-bold text-[#071A4A] leading-tight mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
