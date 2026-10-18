import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, Sparkles, RotateCcw } from "lucide-react";
import { DEGREE_PATHWAYS, type DegreePathway } from "@/data/degreePathways";
import { DegreeCard } from "@/components/degrees/DegreeCard";

type DegreeCategory = "all" | "pharmacy" | "lifesciences" | "allied";
type SortOption = "recommended" | "ctc-high" | "duration-asc" | "alphabetical";

interface CategoryTab {
  id: DegreeCategory;
  label: string;
  count: number;
}

export function DegreeGrid() {
  const [activeCategory, setActiveCategory] = useState<DegreeCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  // Category counts
  const categoryTabs: CategoryTab[] = useMemo(() => {
    return [
      { id: "all", label: "All Qualifications", count: DEGREE_PATHWAYS.length },
      {
        id: "pharmacy",
        label: "Pharmacy",
        count: DEGREE_PATHWAYS.filter((d) => d.category === "pharmacy").length,
      },
      {
        id: "lifesciences",
        label: "Life Sciences",
        count: DEGREE_PATHWAYS.filter((d) => d.category === "lifesciences").length,
      },
      {
        id: "allied",
        label: "Allied & Clinical",
        count: DEGREE_PATHWAYS.filter((d) => d.category === "allied").length,
      },
    ];
  }, []);

  // Filter and sort degrees
  const filteredDegrees = useMemo(() => {
    let result = [...DEGREE_PATHWAYS];

    // Filter by Category
    if (activeCategory !== "all") {
      result = result.filter((d) => d.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((degree) => {
        const matchName = degree.degreeName.toLowerCase().includes(q);
        const matchShort = degree.shortTitle.toLowerCase().includes(q);
        const matchOverview = degree.overview.toLowerCase().includes(q);
        const matchSubjects = degree.coreSubjects.some((s) => s.toLowerCase().includes(q));
        const matchRoles = degree.eligibleRoles.some(
          (r) =>
            r.roleName.toLowerCase().includes(q) ||
            r.keySkillsNeeded.some((skill) => skill.toLowerCase().includes(q)),
        );
        return matchName || matchShort || matchOverview || matchSubjects || matchRoles;
      });
    }

    // Sort Results
    switch (sortBy) {
      case "ctc-high": {
        const parseCtc = (ctcStr?: string) => {
          if (!ctcStr) return 0;
          const match = ctcStr.match(/₹([\d.]+)L/);
          return match ? parseFloat(match[1]) : 0;
        };
        result.sort((a, b) => {
          const ctcA = parseCtc(a.eligibleRoles[0]?.typicalStartingCtc);
          const ctcB = parseCtc(b.eligibleRoles[0]?.typicalStartingCtc);
          return ctcB - ctcA;
        });
        break;
      }
      case "duration-asc": {
        const parseDuration = (dStr: string) => {
          const match = dStr.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : 4;
        };
        result.sort((a, b) => parseDuration(a.typicalDuration) - parseDuration(b.typicalDuration));
        break;
      }
      case "alphabetical": {
        result.sort((a, b) => a.degreeName.localeCompare(b.degreeName));
        break;
      }
      case "recommended":
      default:
        // Preserves the curated order defined in DEGREE_PATHWAYS
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSortBy("recommended");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ─── CONTROLS BAR: CATEGORY TABS, SEARCH & SORT ────────────────────── */}
      <div className="flex flex-col gap-4 bg-[#F8FAFC]/90 p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] tone-light card-light">
        {/* Top Row: Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
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

        {/* Bottom Row: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#E4EAF2]">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by degree, role (e.g. PV, Coding, SAS), or subjects..."
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

          {/* Sort Selector & Result Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#64748B]" />
              <label htmlFor="degree-sort" className="text-xs font-semibold text-[#64748B] sr-only sm:not-sr-only">
                Sort:
              </label>
              <select
                id="degree-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-semibold text-[#081F38] focus:border-[#2563EB] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/15 tone-light card-light cursor-pointer"
              >
                <option value="recommended">Curated Order</option>
                <option value="ctc-high">Highest Starting CTC</option>
                <option value="duration-asc">Shortest Duration</option>
                <option value="alphabetical">Alphabetical (A–Z)</option>
              </select>
            </div>

            <div className="hidden md:inline-flex items-center rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 font-mono text-[11px] font-bold text-[#64748B] tone-light card-light">
              <span>
                {filteredDegrees.length} of {DEGREE_PATHWAYS.length} Degrees
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── DEGREE CARDS GRID ─────────────────────────────────────────────── */}
      {filteredDegrees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredDegrees.map((degree) => (
            <DegreeCard key={degree.slug} degree={degree} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] tone-light card-light">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF6FF] text-[#2563EB] border border-[#BFDBFE] mb-3">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#081F38]">
            No degree pathways match &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-sm">
            Try adjusting your search keywords, clearing your filter, or reset all criteria to see all 7 healthcare qualifications.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
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
