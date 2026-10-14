import { BarChart3, BookOpen, ShieldCheck, Users } from "lucide-react";

export function HomeStatsStrip() {
  const stats = [
    {
      icon: BookOpen,
      value: "60+",
      label: "Healthcare Career Paths",
      sublabel: "PV, CDM, Coding, SAS & RA",
      badge: "LIVE MAPPED",
      badgeColor: "bg-[#EEF6FF] text-[#2563EB] border-[#D0E1FD]",
      iconBg: "bg-[#EEF6FF] text-[#2563EB] border-[#D0E1FD]",
      accentGlow: "from-[#2563EB] to-[#60A5FA]",
    },
    {
      icon: BarChart3,
      value: "2,000+",
      label: "Job Descriptions Analysed",
      sublabel: "Monthly MNC & CRO intake tracking",
      badge: "MONTHLY INTAKE",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      accentGlow: "from-emerald-600 to-teal-400",
    },
    {
      icon: Users,
      value: "1,00,000+",
      label: "Life Science Students Guided",
      sublabel: "Webinars, workshops & campus drives",
      badge: "NATIONAL REACH",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
      iconBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      accentGlow: "from-indigo-600 to-blue-400",
    },
    {
      icon: ShieldCheck,
      value: "Industry-Oriented",
      label: "Practical Audit Learning",
      sublabel: "ICH-GCP & MedDRA calibrated",
      badge: "AUDIT READY",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
      iconBg: "bg-amber-50 text-amber-700 border-amber-200",
      accentGlow: "from-amber-600 to-orange-400",
    },
  ];

  return (
    <section className="border-b border-[#E4EAF2] bg-gradient-to-b from-white to-[#F8FAFC] py-8 sm:py-12 tone-light card-light relative">
      <div className="ap-shell">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-3.5 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] hover:border-[#2563EB]/40 hover:-translate-y-0.5 transition-all duration-300 tone-light card-light group overflow-hidden"
              >
                {/* Top Subtle Hover Accent Bar */}
                <div
                  className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-1.5">
                  <div
                    className={`grid h-8 w-8 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl border ${item.iconBg} shadow-2xs group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full border px-1.5 sm:px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-mono font-bold tracking-wider uppercase truncate ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Stat Number & Descriptive Labels */}
                <div className="mt-3 sm:mt-4">
                  <div className="font-sans text-xl sm:text-[28px] font-extrabold tracking-tight text-[#081F38] group-hover:text-[#2563EB] transition-colors leading-none">
                    {item.value}
                  </div>

                  <div className="text-xs sm:text-[13px] font-bold text-[#081F38] mt-1.5 leading-tight">
                    {item.label}
                  </div>

                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug line-clamp-2">
                    {item.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
