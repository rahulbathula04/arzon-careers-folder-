import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { DegreePathway } from "@/data/degreePathways";

interface DegreeCardProps {
  degree: DegreePathway;
}

export function DegreeCard({ degree }: DegreeCardProps) {
  // Determine highest starting CTC among roles
  const topCtc = degree.eligibleRoles[0]?.typicalStartingCtc ?? "₹3.5L – ₹5.0L";

  const fitBadge = (fit: string) => {
    switch (fit) {
      case "Direct Prerequisite":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "High Alignment":
        return "bg-blue-50 text-[#1D4ED8] border-blue-200";
      default:
        return "bg-amber-50 text-amber-900 border-amber-200";
    }
  };

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all group tone-light card-light relative overflow-hidden">
      {/* Top Accent Gradient Line on Hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Badges Bar: Duration + Starting CTC */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E4EAF2]">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#475569]">
            <Clock className="h-3 w-3 text-[#2563EB]" />
            <span>{degree.typicalDuration}</span>
          </div>

          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-800">
            <span className="text-[10px] text-emerald-600">Starting:</span>
            <span>{topCtc}</span>
          </div>
        </div>

        {/* Degree Title & Overview */}
        <div className="pt-4">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
            {degree.shortTitle}
          </span>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-[#081F38] tracking-tight group-hover:text-[#2563EB] transition-colors">
            {degree.degreeName}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 font-normal">
            {degree.overview}
          </p>
        </div>

        {/* Top Eligible Career Roles */}
        <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Top Industry Role Matches ({degree.eligibleRoles.length})
            </span>
          </div>

          <div className="space-y-1.5">
            {degree.eligibleRoles.slice(0, 3).map((role) => (
              <div
                key={role.roleSlug + role.roleName}
                className="flex items-center justify-between gap-2 rounded-lg bg-[#F8FAFC] border border-slate-100 px-2.5 py-1.5 text-xs text-[#081F38] tone-light card-light"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                  <span className="font-semibold truncate">{role.roleName}</span>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.2 font-mono text-[9.5px] font-bold ${fitBadge(
                    role.fitLevel,
                  )}`}
                >
                  {role.fitLevel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Foundation to Industry Tooling Bridge */}
        <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Core Academic Subjects Mapped
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {degree.coreSubjects.slice(0, 4).map((subject) => (
              <span
                key={subject}
                className="rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 font-mono text-[10px] font-medium text-[#475569]"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions: Primary Pathway Link + Secondary Fit Diagnostic */}
      <div className="mt-5 pt-4 border-t border-[#E4EAF2] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <Link
          to="/degrees/$slug"
          params={{ slug: degree.slug }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs"
        >
          <span>Explore Pathway</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/career-engine/start"
          className="inline-flex items-center justify-center gap-1 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#081F38] px-3.5 py-2.5 text-xs font-bold transition-all tone-light card-light shadow-2xs"
        >
          <Sparkles className="h-3 w-3 text-[#2563EB]" />
          <span>Check Fit</span>
        </Link>
      </div>
    </article>
  );
}
