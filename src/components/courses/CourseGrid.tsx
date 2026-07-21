import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, COURSES, type CourseCategory, type AIRisk } from "@/data/courses";
import { getAIRisk } from "@/data/courseExtras";
import { CourseCard } from "./CourseCard";

type CategoryTab = "All" | CourseCategory;
type SortKey = "default" | "salary-high" | "demand" | "alpha";

const CATEGORY_TABS: CategoryTab[] = ["All", ...CATEGORIES];

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
  const [category, setCategory] = useState<CategoryTab>("All");
  const [risk, setRisk] = useState<AIRisk | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = COURSES.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
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
    setCategory("All");
    setRisk("all");
    setQuery("");
    setSort("default");
  };

  const isFiltered = category !== "All" || risk !== "all" || query.length > 0 || sort !== "default";

  return (
    <div>
      {/* Search + sort row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role, tool, or skill (e.g. 'Argus', 'React', 'GA4')"
            className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-10 text-sm text-white placeholder:text-white/60 outline-none focus:border-gold/40 focus:bg-white/[0.06]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/60 hover:text-white"
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
            className="h-12 min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-gold/40 sm:flex-initial"
          >
            <option value="default">Sort: Featured</option>
            <option value="salary-high">Salary (high → low)</option>
            <option value="demand">Demand</option>
            <option value="alpha">A → Z</option>
          </select>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white hover:bg-white/[0.08] sm:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className={`mt-5 space-y-3 ${showFilters ? "" : "hidden sm:block"}`}>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setCategory(tab)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                category === tab
                  ? "border-white/30 bg-white/15 text-white shadow-[0_8px_24px_-12px_rgba(255,255,255,0.25)]"
                  : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {RISK_FILTERS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRisk(r.id)}
              className={`rounded-full border px-3 py-1 text-micro font-semibold transition-all ${
                risk === r.id
                  ? "border-primary-glow bg-primary/15 text-primary-glow"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="mt-6 flex items-center justify-between text-xs text-white/55">
        <span>
          Showing <span className="font-semibold text-white">{filtered.length}</span> of{" "}
          {COURSES.length} programmes
        </span>
        {isFiltered && (
          <button
            type="button"
            onClick={clear}
            className="font-semibold text-white hover:underline"
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
        <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
          <p className="font-display text-h4 text-white">No programmes match those filters.</p>
          <p className="mt-2 text-sm text-white/55">
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
