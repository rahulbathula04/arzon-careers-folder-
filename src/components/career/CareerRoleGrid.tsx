import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { CAREER_ROLES, type CareerRole } from "@/data/careerRoles";
import type { FamilyId } from "@/data/careerFamilies";

type FamilyFilter = "all" | FamilyId;
type SeniorityFilter = "all" | "entry" | "mid" | "senior";
type SortOption = "ctc-high" | "jd-count" | "alphabetical";

interface FamilyTab {
  id: FamilyFilter;
  label: string;
  count: number;
}

export function CareerRoleGrid() {
  const [selectedFamily, setSelectedFamily] = useState<FamilyFilter>("all");
  const [selectedSeniority, setSelectedSeniority] = useState<SeniorityFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("ctc-high");

  // Family tabs with live counts
  const familyTabs: FamilyTab[] = useMemo(() => {
    return [
      { id: "all", label: "All Roles", count: CAREER_ROLES.length },
      {
        id: "drug-safety",
        label: "Drug Safety & PV",
        count: CAREER_ROLES.filter((r) => r.familyId === "drug-safety").length,
      },
      {
        id: "clinical-data",
        label: "Clinical Data & SAS",
        count: CAREER_ROLES.filter((r) => r.familyId === "clinical-data").length,
      },
      {
        id: "medical-coding",
        label: "Medical Coding & RCM",
        count: CAREER_ROLES.filter((r) => r.familyId === "medical-coding").length,
      },
      {
        id: "regulatory",
        label: "Regulatory Affairs",
        count: CAREER_ROLES.filter((r) => r.familyId === "regulatory").length,
      },
      {
        id: "health-analytics-ai",
        label: "Health Analytics & AI",
        count: CAREER_ROLES.filter((r) => r.familyId === "health-analytics-ai").length,
      },
      {
        id: "commercial-healthcare",
        label: "Commercial Operations",
        count: CAREER_ROLES.filter((r) => r.familyId === "commercial-healthcare").length,
      },
    ];
  }, []);

  // Filtered & sorted roles
  const filteredRoles = useMemo(() => {
    let result = [...CAREER_ROLES];

    // Filter by Family
    if (selectedFamily !== "all") {
      result = result.filter((r) => r.familyId === selectedFamily);
    }

    // Filter by Seniority
    if (selectedSeniority !== "all") {
      result = result.filter((r) => r.seniority === selectedSeniority);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((role) => {
        const matchName = role.name.toLowerCase().includes(q);
        const matchBlurb = role.blurb.toLowerCase().includes(q);
        const matchSkills = role.skills.some((s) => s.toLowerCase().includes(q));
        const matchCompanies = role.topCompanies.some((c) => c.toLowerCase().includes(q));
        return matchName || matchBlurb || matchSkills || matchCompanies;
      });
    }

    // Sort Results
    switch (sortBy) {
      case "ctc-high": {
        result.sort((a, b) => {
          const maxA = a.salary?.entry?.max ?? 0;
          const maxB = b.salary?.entry?.max ?? 0;
          return maxB - maxA;
        });
        break;
      }
      case "jd-count": {
        result.sort((a, b) => {
          const countA = a.evidence?.jdCount ?? 0;
          const countB = b.evidence?.jdCount ?? 0;
          return countB - countA;
        });
        break;
      }
      case "alphabetical": {
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      }
      default:
        break;
    }

    return result;
  }, [selectedFamily, selectedSeniority, searchQuery, sortBy]);

  const handleReset = () => {
    setSelectedFamily("all");
    setSelectedSeniority("all");
    setSearchQuery("");
    setSortBy("ctc-high");
  };

  // Salary values in careerRoles.ts are already expressed in LPA (lakhs per annum).
  // Do not divide by 100,000: that converted valid bands such as 3.5–5 LPA into 0.0L.
  const formatSalary = (role: CareerRole) => {
    if (!role.salary?.entry) return "Salary data being sourced";
    const minL = role.salary.entry.min.toFixed(1);
    const maxL = role.salary.entry.max.toFixed(1);
    return `₹${minL}L – ₹${maxL}L`;
  };

  const getCleanSlug = (slug: string) => {
    return slug.split(".").pop() ?? slug;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ─── CONTROLS BAR: DOMAIN TABS, SEARCH, SENIORITY & SORT ──────────── */}
      <div className="flex flex-col gap-4 bg-[#F8FAFC]/90 p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] tone-light card-light">
        {/* Top Row: Domain Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {familyTabs.map((tab) => {
            const isActive = selectedFamily === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFamily(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#081F38] tone-light card-light"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Row: Search, Seniority & Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-[#E4EAF2]">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, tools (e.g. Argus, ICD-10, SAS), or employers..."
              className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-9 py-2 text-xs sm:text-sm text-[#081F38] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/15 transition-all tone-light card-light"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#94A3B8] hover:text-[#081F38]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Seniority Filter */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="seniority-select" className="text-xs font-semibold text-[#64748B] sr-only sm:not-sr-only">
                Level:
              </label>
              <select
                id="seniority-select"
                value={selectedSeniority}
                onChange={(e) => setSelectedSeniority(e.target.value as SeniorityFilter)}
                className="rounded-xl border border-[#CBD5E1] bg-white px-2.5 py-2 text-xs font-semibold text-[#081F38] focus:border-[#2563EB] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/15 tone-light card-light cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="entry">Entry Level (Freshers)</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#64748B]" />
              <label htmlFor="sort-select" className="text-xs font-semibold text-[#64748B] sr-only sm:not-sr-only">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-[#CBD5E1] bg-white px-2.5 py-2 text-xs font-semibold text-[#081F38] focus:border-[#2563EB] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/15 tone-light card-light cursor-pointer"
              >
                <option value="ctc-high">Highest Starting CTC</option>
                <option value="jd-count">Most JD Evidence</option>
                <option value="alphabetical">Alphabetical (A–Z)</option>
              </select>
            </div>

            <div className="hidden xl:inline-flex items-center rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 font-mono text-[11px] font-bold text-[#64748B] tone-light card-light">
              <span>{filteredRoles.length} Roles Found</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ROLE CARDS GRID ──────────────────────────────────────────────── */}
      {filteredRoles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredRoles.map((role) => {
            const cleanSlug = getCleanSlug(role.slug);
            const salaryText = formatSalary(role);

            return (
              <article
                key={role.slug}
                className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all group tone-light card-light relative overflow-hidden"
              >
                {/* Top Accent Gradient Line on Hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Badges Bar: Seniority + JD Count */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E4EAF2]">
                    <div className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase text-[#475569]">
                      <span>{role.seniority} level</span>
                    </div>

                    {role.evidence && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                        <span>{role.evidence.jdCount} JDs Analysed</span>
                      </div>
                    )}
                  </div>

                  {/* Role Name & Salary Band */}
                  <div className="pt-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#081F38] tracking-tight group-hover:text-[#2563EB] transition-colors">
                      {role.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-2 font-normal">
                      {role.blurb}
                    </p>

                    <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 px-3 py-1 font-mono text-xs font-bold text-emerald-900">
                      <span className="text-[10px] text-emerald-700">Starting CTC:</span>
                      <span>{salaryText}</span>
                    </div>
                  </div>

                  {/* Key Skills Tags */}
                  <div className="mt-4 pt-3.5 border-t border-[#F1F5F9]">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      Primary Tooling &amp; Skills
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {role.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 font-mono text-[10px] font-medium text-[#475569]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Hiring Companies */}
                  {role.topCompanies && role.topCompanies.length > 0 && (
                    <div className="mt-3 pt-2 text-[11px] text-[#64748B] flex items-center gap-1.5 truncate">
                      <Building2 className="h-3.5 w-3.5 text-[#94A3B8] shrink-0" />
                      <span className="truncate">
                        Hiring: <strong className="text-[#334155]">{role.topCompanies.slice(0, 3).join(", ")}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-4 border-t border-[#E4EAF2] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Link
                    to="/roles/$slug"
                    params={{ slug: cleanSlug }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs"
                  >
                    <span>View Role Profile</span>
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
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] tone-light card-light">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF6FF] text-[#2563EB] border border-[#BFDBFE] mb-3">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#081F38]">
            No career roles match your criteria
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-sm">
            Try adjusting your search keywords, changing your seniority level, or reset all criteria to view all 60 role profiles.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 text-xs font-bold transition-all shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset filters &amp; view all</span>
          </button>
        </div>
      )}
    </div>
  );
}
