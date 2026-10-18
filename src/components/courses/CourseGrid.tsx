import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, BookOpen, RotateCcw } from "lucide-react";
import { COURSES } from "@/data/courses";
import { ARZON_CORE_PROGRAMME_SLUGS } from "@/data/siteArchitecture";
import { CourseCard } from "./CourseCard";

type SortKey = "default" | "salary-high" | "demand" | "alpha";
type DegreeId = "all" | "pharm" | "pharmd" | "lifesci" | "medical";
type CategoryTabId =
  | "all"
  | "pv"
  | "data-sas"
  | "coding-rcm"
  | "regulatory-writing"
  | "informatics-ai";

const CORE_COURSES = COURSES.filter((course) =>
  ARZON_CORE_PROGRAMME_SLUGS.includes(course.slug as (typeof ARZON_CORE_PROGRAMME_SLUGS)[number]),
);

const CATEGORY_TABS: { id: CategoryTabId; label: string; slugs?: readonly string[] }[] = [
  { id: "all", label: "All Programmes" },
  { id: "pv", label: "Pharmacovigilance & Safety", slugs: ["pharmacovigilance"] },
  {
    id: "data-sas",
    label: "Clinical Data & SAS",
    slugs: ["clinical-data-management", "sas-clinical"],
  },
  {
    id: "coding-rcm",
    label: "Medical Coding & RCM",
    slugs: ["medical-coding", "healthcare-rcm"],
  },
  {
    id: "regulatory-writing",
    label: "Regulatory & Writing",
    slugs: ["regulatory-affairs", "medical-writing"],
  },
  {
    id: "informatics-ai",
    label: "Health Informatics & AI",
    slugs: ["clinical-saas", "digital-health-fhir", "bioinformatics", "ai-intelligence"],
  },
];

const DEGREE_FILTERS: { id: DegreeId; label: string }[] = [
  { id: "all", label: "All Degrees" },
  { id: "pharm", label: "B.Pharm / M.Pharm" },
  { id: "pharmd", label: "Pharm.D" },
  { id: "lifesci", label: "B.Sc / M.Sc Life Sciences" },
  { id: "medical", label: "MBBS / BDS / Allied Health" },
];

const DEGREE_COMPATIBILITY: Record<string, DegreeId[]> = {
  pharmacovigilance: ["pharm", "pharmd", "lifesci", "medical"],
  "clinical-data-management": ["pharm", "pharmd", "lifesci", "medical"],
  "sas-clinical": ["pharm", "pharmd", "lifesci"],
  "medical-coding": ["pharm", "lifesci", "medical"],
  "healthcare-rcm": ["pharm", "lifesci", "medical"],
  "regulatory-affairs": ["pharm", "pharmd"],
  "medical-writing": ["pharm", "pharmd", "medical"],
  "clinical-saas": ["pharm", "lifesci"],
  "digital-health-fhir": ["pharm", "lifesci"],
  bioinformatics: ["lifesci", "pharm"],
  "ai-intelligence": ["pharm", "lifesci"],
};

const DEMAND_RANK = { "Very High": 3, High: 2, Steady: 1 } as const;

function salaryUpper(salary: string): number {
  const m = salary.match(/[\d.]+/g);
  if (!m) return 0;
  return Number(m[m.length - 1]);
}

export function CourseGrid() {
  const [activeTab, setActiveTab] = useState<CategoryTabId>("all");
  const [degree, setDegree] = useState<DegreeId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeCategory = CATEGORY_TABS.find((t) => t.id === activeTab);

    let list = CORE_COURSES.filter((c) => {
      // Category Tab Filter
      if (activeCategory && activeCategory.slugs) {
        if (!activeCategory.slugs.includes(c.slug)) return false;
      }

      // Degree Filter
      if (degree !== "all") {
        const allowed = DEGREE_COMPATIBILITY[c.slug] || [];
        if (!allowed.includes(degree)) return false;
      }

      // Query Search
      if (q) {
        const hay =
          `${c.title} ${c.blurb} ${c.category} ${c.tools.join(" ")} ${c.jd.hiringRoles.join(" ")} ${c.jd.topSkills.join(" ")} ${c.jd.sampleEmployers.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    // Sorting
    if (sort === "salary-high") {
      list = [...list].sort((a, b) => salaryUpper(b.jd.salary) - salaryUpper(a.jd.salary));
    } else if (sort === "demand") {
      list = [...list].sort((a, b) => DEMAND_RANK[b.jd.demand] - DEMAND_RANK[a.jd.demand]);
    } else if (sort === "alpha") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [activeTab, degree, query, sort]);

  const clear = () => {
    setActiveTab("all");
    setDegree("all");
    setQuery("");
    setSort("default");
  };

  const isFiltered = activeTab !== "all" || degree !== "all" || query.length > 0 || sort !== "default";

  return (
    <div className="space-y-6">
      {/* Category Tabs Bar */}
      <div className="overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-2 border-b border-[#E4EAF2] pb-3">
          {CATEGORY_TABS.map((tab) => {
            const count = tab.slugs
              ? CORE_COURSES.filter((c) => tab.slugs?.includes(c.slug)).length
              : CORE_COURSES.length;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE] hover:text-[#081F38] tone-light card-light"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search, Degree Filter & Sort Row */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role, tool, or skill (e.g., 'ICSR', 'MedDRA', 'Base SAS', 'eCTD')"
            className="h-12 w-full rounded-full border border-[#E2E8F0] bg-white pl-11 pr-10 text-xs sm:text-sm font-semibold text-[#081F38] placeholder:text-[#64748B] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 tone-light card-light"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#64748B] hover:text-[#081F38]"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        {/* Filters Group (Degree + Sort + Mobile toggle) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Degree Filter Dropdown */}
          <div className="min-w-[170px] flex-1 sm:flex-initial">
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value as DegreeId)}
              aria-label="Filter by degree"
              className="h-12 w-full rounded-full border border-[#E2E8F0] bg-white px-4 text-xs sm:text-sm font-bold text-[#081F38] outline-none transition focus:border-[#2563EB] tone-light card-light"
            >
              {DEGREE_FILTERS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="min-w-[160px] flex-1 sm:flex-initial">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort programmes"
              className="h-12 w-full rounded-full border border-[#E2E8F0] bg-white px-4 text-xs sm:text-sm font-bold text-[#081F38] outline-none transition focus:border-[#2563EB] tone-light card-light"
            >
              <option value="default">Sort: Featured</option>
              <option value="salary-high">Salary: High → Low</option>
              <option value="demand">Demand: High First</option>
              <option value="alpha">A → Z</option>
            </select>
          </div>

          {/* Quick Toggle for Degree Pills on Mobile */}
          <button
            type="button"
            onClick={() => setShowMobileFilters((v) => !v)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 text-xs font-bold text-[#081F38] transition hover:bg-[#F8FAFC] lg:hidden tone-light card-light"
            aria-expanded={showMobileFilters}
          >
            <SlidersHorizontal className="h-4 w-4 text-[#2563EB]" />
            <span>Degrees</span>
          </button>
        </div>
      </div>

      {/* Degree Pills bar */}
      <div
        className={`flex flex-wrap items-center gap-2 pt-1 ${
          showMobileFilters ? "flex" : "hidden lg:flex"
        }`}
      >
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748B] mr-1">
          Degree Fit:
        </span>
        {DEGREE_FILTERS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDegree(d.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              degree === d.id
                ? "bg-[#081F38] text-white shadow-xs"
                : "border border-[#E2E8F0] bg-white text-[#475569] hover:text-[#081F38] tone-light card-light"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Results Count & Clear Filter Bar */}
      <div className="flex items-center justify-between border-t border-[#E4EAF2] pt-4 text-xs text-[#64748B]">
        <span>
          Showing <span className="font-bold text-[#081F38]">{filtered.length}</span> of{" "}
          <span className="font-bold text-[#081F38]">{CORE_COURSES.length}</span> verified healthcare programmes
        </span>
        {isFiltered && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 font-bold text-[#2563EB] hover:text-[#1D4ED8]"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white p-12 text-center tone-light card-light">
          <BookOpen className="mx-auto h-12 w-12 text-[#64748B]/40" />
          <h3 className="mt-4 text-lg font-bold text-[#081F38]">
            No programmes match your current filters
          </h3>
          <p className="mt-1.5 text-sm text-[#475569]">
            Try adjusting your search keywords, switching categories, or resetting the degree filter.
          </p>
          <button
            type="button"
            onClick={clear}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1D4ED8]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Show all {CORE_COURSES.length} programmes</span>
          </button>
        </div>
      )}
    </div>
  );
}
