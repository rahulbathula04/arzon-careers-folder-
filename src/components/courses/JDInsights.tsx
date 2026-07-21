import { Briefcase, Target, TrendingUp, Users2 } from "lucide-react";
import type { Course } from "@/data/courses";
import { getTrackTheme } from "@/data/trackTheme";

export function JDInsights({ course }: { course: Course }) {
  const theme = getTrackTheme(course.slug);
  const items = [
    { Icon: Target, label: "Top JD skills", value: course.jd.topSkills.join(" · ") },
    { Icon: Briefcase, label: "Roles you can apply for", value: course.jd.hiringRoles.join(" · ") },
    {
      Icon: TrendingUp,
      label: "Avg salary · Demand",
      value: `${course.jd.salary} · ${course.jd.demand}`,
    },
    { Icon: Users2, label: "Sample employers", value: course.jd.sampleEmployers.join(" · ") },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ Icon, label, value }) => (
        <div key={label} className="rounded-2xl border border-white/10 bg-[#111A2E] p-5">
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${theme.accentText}`} />
            <p
              className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
            >
              {label}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/85">{value}</p>
        </div>
      ))}
    </div>
  );
}
