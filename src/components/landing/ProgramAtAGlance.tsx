import {
  Clock,
  Monitor,
  FolderKanban,
  Users,
  BarChart3,
  BadgeIndianRupee,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const STATS = [
  {
    icon: Clock,
    label: "Duration",
    value: "12 Weeks",
    sub: "8 Training + 4 Applied",
    color: "text-[#1B3F8B]",
    bg: "bg-sky-50 border-sky-200",
  },
  {
    icon: Monitor,
    label: "Format",
    value: "Live + Applied",
    sub: "Evening cohorts + internship",
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-200",
  },
  {
    icon: FolderKanban,
    label: "Projects",
    value: "3+ Deliverables",
    sub: "Real case files & capstone",
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
  },
  {
    icon: Users,
    label: "Mentorship",
    value: "Included",
    sub: "Industry practitioners, not academics",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
  {
    icon: BarChart3,
    label: "ACRI Assessment",
    value: "Pre & Post",
    sub: "Measurable readiness score",
    color: "text-[#8A6D1F]",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    icon: BadgeIndianRupee,
    label: "Investment",
    value: "₹29,999",
    sub: "EMI available · See pricing below",
    color: "text-rose-700",
    bg: "bg-rose-50 border-rose-200",
  },
];

export function ProgramAtAGlance() {
  return (
    <section className="py-8 sm:py-10 bg-white tone-light text-[#1A1A1A] border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Label */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-1 w-6 bg-[#1B3F8B] rounded-full" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-stone-500">
              PROGRAM AT A GLANCE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
            ISO 9001:2015 Certified Program
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-white tone-light card-light rounded-2xl border p-4 space-y-2 shadow-xs hover:shadow-sm transition-shadow ${stat.bg}`}
              >
                <div className={`p-2 rounded-xl border inline-flex ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                    {stat.label}
                  </div>
                  <div className={`font-serif font-bold text-base sm:text-lg mt-0.5 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-sans text-stone-500 mt-0.5 font-medium leading-tight">
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5">
          <div>
            <p className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
              Next Intake
            </p>
            <p className="font-serif font-bold text-[#1A1A1A] text-base sm:text-lg mt-0.5">
              Cohorts open quarterly · Limited to 35 candidates
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href="#pricing"
              className="flex-1 sm:flex-none h-11 sm:h-12 px-5 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold border border-[#1B3F8B] text-[#1B3F8B] rounded-xl hover:bg-sky-50 transition-all cursor-pointer"
            >
              See Pricing
            </a>
            <a
              href="#eligibility-quiz"
              style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
              className="flex-1 sm:flex-none h-11 sm:h-12 px-5 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-sm transition-all cursor-pointer"
            >
              Check Readiness{" "}
              <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: "#FFFFFF" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
