import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { COURSES, type AIRisk } from "@/data/courses";
import { ARZON_CORE_PROGRAMME_SLUGS } from "@/data/siteArchitecture";
import { getAIRisk } from "@/data/courseExtras";
import { CourseCard } from "./CourseCard";

type SortKey = "default" | "salary-high" | "demand" | "alpha";

const CORE_COURSES = COURSES.filter((course) =>
  ARZON_CORE_PROGRAMME_SLUGS.includes(course.slug as (typeof ARZON_CORE_PROGRAMME_SLUGS)[number]),
);

const RISK_FILTERS: { id: AIRisk | "all"; label: string }[] = [
  { id: "all", label: "All AI postures" },
  { id: "resistant", label: "AI-resistant" },
  { id: "audit", label: "AI-audit" },
  { id: "augmented", label: "AI-augmented" },
];

const DEMAND_RANK = { "Very High": 3, High: 2, Steady: 1 } as const;

function salaryUpper(salary: string): number {
  const m = salary.match(/[\d.]+/g);
  if (!m) return 0;
  return Number(m[m.length - 1]);
}

export function CourseGrid() {
  
  const [risk, setRisk] = useState<AIRisk | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = CORE_COURSES.filter((c) => {

      if (risk !== "all" && getAIRisk(c) !== risk) return false;
      if (q) {
        const hay =
          `${c.title} ${c.blurb} ${c.tools.join(" ")} ${c.jd.hiringRoles.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "salary-high")
      list = [...list].sort((a, b) => salaryUpper(b.jd.salary) - salaryUpper(a.jd.salary));
    else if (sort === "demand")
      list = [...list].sort((a, b) => DEMAND_RANK[b.jd.demand] - DEMAND_RANK[a.jd.demand]);
    else if (sort === "alpha") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [category, risk, query, sort]);

  const clear = () => {
    setRisk("all");
    setQuery("");
    setSort("default");
  };

  const isFiltered = risk !== "all" || query.length > 0 || sort !== "default";

  return (
    <div>
      {/* Search + sort row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--arzon-ink-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role, tool, or skill (e.g. 'Argus', 'ICSR', 'SAS')"
            className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-[var(--arzon-ink)] placeholder:text-[var(--arzon-ink-muted)] outline-none focus:border-[var(--arzon-blue-600)] shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--arzon-ink-muted)] hover:text-[var(--arzon-ink)]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-12 min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[var(--arzon-ink)] outline-none focus:border-[var(--arzon-blue-600)] shadow-sm sm:flex-initial"
          >
            <option value="default">Sort: Featured</option>
            <option value="salary-high">Salary (high → low)</option>
            <option value="demand">Demand</option>
            <option value="alpha">A → Z</option>
          </select>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[var(--arzon-ink)] hover:bg-slate-50 shadow-sm sm:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className={`mt-5 space-y-3 ${showFilters ? "" : "hidden sm:block"}`}>
        <div className="flex flex-wrap gap-2">
          {RISK_FILTERS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRisk(r.id)}
              className={`rounded-full border px-3 py-1 text-micro font-semibold transition-all ${
                risk === r.id
                  ? "border-primary-glow bg-primary/15 text-primary-glow"
                  : "border-[var(--arzon-border)] bg-white text-[var(--arzon-ink)]/60 hover:text-[var(--arzon-ink)]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="mt-6 flex items-center justify-between text-xs text-[var(--arzon-ink-muted)]">
        <span>
          Showing <span className="font-semibold text-[var(--arzon-ink)]">{filtered.length}</span> of{" "}
          {CORE_COURSES.length} core programmes
        </span>
        {isFiltered && (
          <button
            type="button"
            onClick={clear}
            className="font-semibold text-[var(--arzon-ink)] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-[var(--arzon-border)] bg-white p-12 text-center">
          <p className="font-display text-h4 text-[var(--arzon-ink)]">No programmes match those filters.</p>
          <p className="mt-2 text-sm text-[var(--arzon-ink-muted)]">
            Try widening your search or clearing filters.
          </p>
          <button
            type="button"
            onClick={clear}
            className="mt-4 inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-black"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
