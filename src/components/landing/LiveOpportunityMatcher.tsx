import { useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { List, LayoutPanelLeft } from "lucide-react";
import { LiveOpportunitiesData, type LiveRoleBrief } from "@/data/liveOpportunities";
import { CandidateProfileIntelligence } from "@/components/opportunity/CandidateProfileIntelligence";
import { OpportunityFilterBar } from "@/components/opportunity/OpportunityFilterBar";
import { OpportunityCard } from "@/components/opportunity/OpportunityCard";
import { OpportunityDetailPanel } from "@/components/opportunity/OpportunityDetailPanel";

export function LiveOpportunityMatcher() {
  const shouldReduceMotion = useReducedMotion();
  const allRoles: LiveRoleBrief[] = LiveOpportunitiesData.ROLES;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"MATCH" | "CTC" | "OPENINGS">("MATCH");
  const [selectedRoleId, setSelectedRoleId] = useState<string>(allRoles[0]?.id || "");
  // Mobile tab: "list" or "detail"
  const [mobileTab, setMobileTab] = useState<"list" | "detail">("list");

  // Filter & Sort Logic
  const filteredRoles = useMemo(() => {
    let result = [...allRoles];

    if (selectedCategory !== "ALL") {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.role.toLowerCase().includes(q) ||
          r.employer.toLowerCase().includes(q) ||
          r.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "MATCH") return b.overallMatch - a.overallMatch;
      if (sortBy === "OPENINGS") return b.openingsCount - a.openingsCount;
      if (sortBy === "CTC") {
        const aNum = parseInt(a.ctcDisplay.replace(/\D/g, "") || "0", 10);
        const bNum = parseInt(b.ctcDisplay.replace(/\D/g, "") || "0", 10);
        return bNum - aNum;
      }
      return 0;
    });

    return result;
  }, [allRoles, selectedCategory, searchQuery, sortBy]);

  // Auto-select first role if current selected is no longer in filtered list
  const selectedRole = useMemo(() => {
    return filteredRoles.find((r) => r.id === selectedRoleId) || filteredRoles[0] || allRoles[0];
  }, [filteredRoles, selectedRoleId, allRoles]);

  const handleCardSelect = (roleId: string) => {
    setSelectedRoleId(roleId);
    // On mobile, selecting a card switches to detail view
    setMobileTab("detail");
  };

  return (
    <section id="opportunity-matcher" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] text-stone-900 border-t border-stone-200">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Compact Product Header */}
        <div className="space-y-2 max-w-3xl">
          <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider block">
            OPPORTUNITY MATCHER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Roles That Match Your Verified Profile
          </h2>
          <p className="text-sm text-stone-600 font-sans leading-relaxed">
            Matched using your ACRI benchmark, verified skills, and role preferences.
          </p>
        </div>

        {/* Profile Intelligence Banner */}
        <CandidateProfileIntelligence matchedCount={filteredRoles.length} />

        {/* Filter & Sort Bar */}
        <OpportunityFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredRoles.length}
        />

        {/* Mobile Tab Bar — only visible on small screens */}
        {filteredRoles.length > 0 && (
          <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-200/60 border border-stone-300/60 lg:hidden">
            <button
              onClick={() => setMobileTab("list")}
              className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-xs font-mono font-bold transition-all ${
                mobileTab === "list"
                  ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Opportunities ({filteredRoles.length})
            </button>
            <button
              onClick={() => setMobileTab("detail")}
              className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-xs font-mono font-bold transition-all ${
                mobileTab === "detail"
                  ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <LayoutPanelLeft className="h-3.5 w-3.5" />
              {selectedRole ? selectedRole.role.split(" ").slice(0, 2).join(" ") + "…" : "Details"}
            </button>
          </div>
        )}

        {/* Content Area */}
        {filteredRoles.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Feed — always visible on desktop, tab-controlled on mobile */}
            <div className={`lg:col-span-5 space-y-3 ${mobileTab === "detail" ? "hidden lg:block" : ""}`}>
              {filteredRoles.map((role) => (
                <OpportunityCard
                  key={role.id}
                  opportunity={role}
                  isSelected={selectedRole?.id === role.id}
                  onSelect={() => handleCardSelect(role.id)}
                />
              ))}
            </div>

            {/* Right Detail Panel — always visible on desktop, tab-controlled on mobile */}
            <div className={`lg:col-span-7 ${mobileTab === "list" ? "hidden lg:block" : ""}`}>
              {selectedRole && <OpportunityDetailPanel opportunity={selectedRole} />}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="tone-light p-12 text-center rounded-2xl border border-stone-300 bg-white space-y-3 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-stone-900">No Matching Opportunities Found</h3>
            <p className="text-xs text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
              Try adjusting your search query or switching category filters to explore all open briefs.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
              }}
              className="mt-2 h-9 px-5 rounded-xl border border-stone-300 bg-stone-100 text-xs font-mono text-stone-800 hover:bg-stone-200 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] focus:ring-offset-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
