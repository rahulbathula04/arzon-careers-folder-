import { useState } from "react";
import { GraduationCap, Briefcase, Users, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const AUDIENCE_PROFILES = [
  {
    id: "student",
    icon: GraduationCap,
    label: "Final-Year Student",
    badge: "B.Pharm / B.Sc / Biotech",
    situation: "You're finishing your degree but placement season is months away. You're seeing peers struggle to get interviews despite good marks. Recruiters keep asking for 'experience' — but no one gives freshers a chance.",
    pain: ["No real-world clinical or coding exposure", "Applying blindly on Naukri & LinkedIn", "College projects that no recruiter cares about"],
    arzonAnswer: "We let you start building real healthcare role skills now, before you graduate. By the time placement season hits, you'll have an ACRI score and a verifiable project portfolio.",
    cta: "Start Before You Graduate",
    accentColor: "text-[#1B3F8B]",
    borderColor: "border-[#1B3F8B]",
    bgColor: "bg-sky-50/50",
    badgeBg: "bg-sky-50 border-sky-200 text-[#1B3F8B]",
  },
  {
    id: "graduate",
    icon: Briefcase,
    label: "Recent Graduate",
    badge: "0–2 Years Out",
    situation: "You've graduated but haven't landed a role in healthcare yet. You're overqualified for data entry but 'underqualified' for every PV or coding role that asks for experience. The gap feels impossible.",
    pain: ["Stuck in 'experience required' paradox", "Generic certificates not moving the needle", "No systematic way to demonstrate readiness"],
    arzonAnswer: "We close the gap with structured 12-week role tracks built from real job descriptions. You build the exact skills employers ask for, with artifacts you can prove.",
    cta: "Close the Experience Gap",
    accentColor: "text-[#8A6D1F]",
    borderColor: "border-amber-400",
    bgColor: "bg-amber-50/30",
    badgeBg: "bg-amber-50 border-amber-200 text-[#8A6D1F]",
  },
  {
    id: "professional",
    icon: Users,
    label: "Working Professional",
    badge: "Switching Tracks",
    situation: "You're currently in a general pharma, hospital, or unrelated role and want to transition into PV, Medical Coding, or CDM. You need structured upskilling without quitting your job.",
    pain: ["Can't take full-time courses during work hours", "Not sure which track matches your background", "Worried about wasting money on wrong course"],
    arzonAnswer: "Our live evening cohorts and ACRI diagnostic help you identify the right role before you invest. Switch tracks systematically with a verified outcome at the end.",
    cta: "Find Your Switch Track",
    accentColor: "text-teal-700",
    borderColor: "border-teal-400",
    bgColor: "bg-teal-50/30",
    badgeBg: "bg-teal-50 border-teal-200 text-teal-700",
  },
];

export function YouAreHere() {
  const [activeId, setActiveId] = useState<string>("student");
  const active = AUDIENCE_PROFILES.find((p) => p.id === activeId) || AUDIENCE_PROFILES[0];
  const Icon = active.icon;

  return (
    <section className="py-12 sm:py-16 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-50 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-stone-600 shadow-xs">
            YOU ARE HERE
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            You have the degree.
            <br />
            <span className="italic font-normal text-[#8A6D1F]">
              But do you have the career readiness?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            Select your situation. Understand why the career gap exists and exactly how Arzon closes it.
          </p>
        </div>

        {/* Profile Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {AUDIENCE_PROFILES.map((profile) => {
            const PIcon = profile.icon;
            const isActive = activeId === profile.id;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => setActiveId(profile.id)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 transition-all cursor-pointer w-full sm:w-auto ${
                  isActive
                    ? `${profile.borderColor} ${profile.bgColor} shadow-md`
                    : "border-stone-200 bg-stone-50 hover:bg-stone-100"
                }`}
              >
                <PIcon className={`h-5 w-5 shrink-0 ${isActive ? profile.accentColor : "text-stone-500"}`} />
                <div className="text-left">
                  <div className={`font-serif font-bold text-sm ${isActive ? "text-[#1A1A1A]" : "text-stone-600"}`}>
                    {profile.label}
                  </div>
                  <div className={`text-[11px] font-mono font-bold ${isActive ? profile.accentColor : "text-stone-400"}`}>
                    {profile.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Profile Deep-Dive */}
        <div className="bg-stone-50 tone-light rounded-3xl border border-stone-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xs">

          {/* Left: Situation + Pain */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl border ${active.bgColor} ${active.borderColor}`}>
                <Icon className={`h-6 w-6 ${active.accentColor}`} />
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-[#1A1A1A]">{active.label}</div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${active.badgeBg}`}>
                  {active.badge}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed font-medium bg-white tone-light card-light rounded-2xl border border-stone-200 p-5 shadow-xs">
              "{active.situation}"
            </p>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 block">
                THE CHALLENGES YOU FACE RIGHT NOW:
              </span>
              <ul className="space-y-2">
                {active.pain.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-stone-700 font-sans font-medium">
                    <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Arzon Answer */}
          <div className="lg:col-span-5 bg-white tone-light card-light rounded-2xl border-2 border-[#1B3F8B] p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1B3F8B] block">
                THE ARZON ANSWER FOR YOU
              </span>
              <p className="text-sm sm:text-base text-[#1A1A1A] font-sans leading-relaxed font-semibold">
                {active.arzonAnswer}
              </p>
              <ul className="space-y-2 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2 text-sm text-stone-800 font-sans font-medium">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>12-Week structured role track matched to your degree</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-800 font-sans font-medium">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>Verifiable ACRI readiness score employers can inspect</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-800 font-sans font-medium">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>ISO-certified candidate dossier for hiring manager review</span>
                </li>
              </ul>
            </div>

            <a
              href="#eligibility-quiz"
              style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
              className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-all cursor-pointer"
            >
              <span>{active.cta}</span>
              <ArrowRight className="h-4 w-4 shrink-0" style={{ color: "#FFFFFF" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
