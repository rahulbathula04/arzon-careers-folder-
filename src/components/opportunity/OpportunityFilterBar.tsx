import { Search, SlidersHorizontal } from "lucide-react";

interface OpportunityFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: "MATCH" | "CTC" | "OPENINGS";
  onSortChange: (sort: "MATCH" | "CTC" | "OPENINGS") => void;
  totalResults: number;
}

export function OpportunityFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults,
}: OpportunityFilterBarProps) {
  const categories = [
    { id: "ALL", label: "All Roles" },
    { id: "AI_ML", label: "AI & ML" },
    { id: "DATA", label: "Data Engineering" },
    { id: "QUANT", label: "Quant Fintech" },
    { id: "CLOUD", label: "Cloud Infra" },
  ];

  return (
    <div className="space-y-4">
      {/* Search & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search roles, skills, or companies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="tone-light w-full h-11 pl-10 pr-4 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1B3F8B] shadow-xs transition-all font-sans"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-stone-500 flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "MATCH" | "CTC" | "OPENINGS")}
            className="tone-light h-11 px-3 rounded-xl border border-stone-300 bg-white text-xs font-mono text-stone-800 focus:outline-none focus:border-[#1B3F8B] shadow-xs transition-all"
          >
            <option value="MATCH">Highest Match Score</option>
            <option value="CTC">Highest Compensation</option>
            <option value="OPENINGS">Most Openings</option>
          </select>
        </div>
      </div>

      {/* Category Pills & Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`tone-light px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isActive
                    ? "bg-[#1B3F8B] text-white shadow-xs"
                    : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs font-semibold text-stone-600">
          {totalResults} {totalResults === 1 ? "Opportunity" : "Opportunities"} Matched
        </span>
      </div>
    </div>
  );
}
