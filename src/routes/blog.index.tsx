import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, BookOpen, Clock, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { pageSeo } from "@/lib/seo";
import { FindYourTrainingWidget } from "@/components/career/FindYourTrainingWidget";

export const Route = createFileRoute("/blog/")({
  head: () => {
    const seo = pageSeo({
      path: "/blog",
      title: "Healthcare Career Intelligence Blog & Research · Arzon Global",
      description:
        "Healthcare career intelligence, salary benchmarks, and software validation guides for Pharmacovigilance, Medical Coding, CDM, Regulatory & SAS Clinical.",
    });
    return {
      meta: [{ title: "Healthcare Career Intelligence Blog & Research · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: BlogHubComponent,
});

const CATEGORIES = [
  { id: "all", label: "All Intelligence" },
  { id: "pharmacovigilance", label: "Pharmacovigilance" },
  { id: "medical-coding", label: "Medical Coding" },
  { id: "clinical-data-management", label: "Clinical Data" },
  { id: "regulatory-affairs", label: "Regulatory Affairs" },
  { id: "sas-clinical", label: "SAS Clinical" },
  { id: "medical-writing", label: "Medical Writing" },
  { id: "healthcare-analytics", label: "Analytics" },
  { id: "ai-healthcare", label: "AI SaaS" },
];

function BlogHubComponent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];
  const regularPosts = filteredPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Header Banner / Eyebrow */}
      <section className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">
              ARZON GLOBAL · CAREER INTELLIGENCE JOURNAL
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight max-w-4xl">
            Healthcare Career Intelligence & Operational Research
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed">
            Empirical job description breakdowns, enterprise software tool specifications (Oracle Argus, ICD-10-CM, Medidata Rave, eCTD, SAS PROC SQL), and salary benchmarks for life science graduates.
          </p>

          {/* Search & Category Filter Control Bar */}
          <div className="mt-8 pt-8 border-t border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles, keywords, or tools (Argus, MedDRA, CPC...)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-stone-300 rounded-none text-xs font-sans text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-[#1B3F8B]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider border transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#0B1325] text-white border-[#0B1325]"
                      : "bg-white tone-light text-stone-700 border-stone-300 hover:bg-stone-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Featured Dossier Card (Shown when on "all" and no search query) */}
        {selectedCategory === "all" && searchQuery === "" && featuredPost && (
          <div className="mb-14">
            <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1B3F8B]" />
              FEATURED EDITORIAL DOSSIER
            </div>

            <div className="bg-white tone-light card-light border border-stone-300 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xs hover:border-[#1B3F8B] transition-colors">
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] font-bold text-stone-600 uppercase tracking-wider border border-stone-300 bg-stone-50 px-2 py-0.5">
                      {featuredPost.categoryLabel}
                    </span>
                    <span className="font-mono text-[10px] text-stone-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <Link
                    to="/blog/$slug"
                    params={{ slug: featuredPost.slug }}
                    className="group"
                  >
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 group-hover:text-[#1B3F8B] transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="mt-4 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
                    {featuredPost.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-stone-700 leading-normal">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
                  <div className="font-mono text-[10px] text-stone-500">
                    By {featuredPost.author.name} · {featuredPost.publishedDate}
                  </div>

                  <Link
                    to="/blog/$slug"
                    params={{ slug: featuredPost.slug }}
                    className="inline-flex items-center gap-2 bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    READ FULL DOSSIER <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-stone-100 relative min-h-[260px] border-t lg:border-t-0 lg:border-l border-stone-200 flex items-center justify-center p-6">
                <img
                  src={featuredPost.heroImage}
                  alt={featuredPost.heroImageAlt}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/thumbs/pharmacovigilance.webp";
                  }}
                  className="w-full h-full object-cover rounded-none border border-stone-300 max-h-[340px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-300 pb-3">
            <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1B3F8B]" />
              {selectedCategory === "all" ? "All Research Articles" : `${CATEGORIES.find(c => c.id === selectedCategory)?.label} Articles`}
            </h3>
            <span className="font-mono text-[11px] font-bold text-stone-500">
              {filteredPosts.length} ARTICLES FOUND
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white tone-light card-light p-12 text-center border border-stone-300 my-8">
              <p className="font-serif text-lg text-stone-700">No articles matched your criteria.</p>
              <p className="font-sans text-xs text-stone-500 mt-2">Try clearing your search query or selecting a different category filter.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 px-4 py-2 border border-stone-300 bg-stone-50 font-mono text-xs font-bold uppercase tracking-wider hover:bg-stone-100"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === "all" && searchQuery === "" ? regularPosts : filteredPosts).map((post) => (
                <article
                  key={post.slug}
                  className="bg-white tone-light card-light border border-stone-300 p-6 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider border border-stone-200 bg-stone-50 px-2 py-0.5">
                        {post.categoryLabel}
                      </span>
                      <span className="font-mono text-[10px] text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group"
                    >
                      <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#1B3F8B] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 font-sans text-xs text-stone-700 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1">
                      {post.keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className="font-mono text-[9px] text-stone-500 bg-stone-100 px-1.5 py-0.5 flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" /> {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-stone-500">
                      {post.publishedDate}
                    </span>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="font-mono text-xs font-bold text-stone-900 hover:text-[#1B3F8B] uppercase tracking-wider flex items-center gap-1"
                    >
                      READ <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Find Your Training Interactive Widget */}
        <FindYourTrainingWidget />

        {/* CTA Diagnostic Panel */}
        <section className="mt-12 bg-[#0B1325] text-white p-8 sm:p-12 border border-stone-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              CAREER FIT DIAGNOSTIC ENGINE
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Which Healthcare Career Track Matches Your Degree & Skillset?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Take the 90-second Arzon Career Engine assessment. Decodes 300+ live Tier-1 GCC job descriptions to calculate your precise percentile match across PV, Medical Coding, CDM, Regulatory Affairs, and SAS Clinical.
            </p>
          </div>

          <Link
            to="/career-engine/start"
            className="shrink-0 bg-white tone-light text-stone-900 hover:bg-stone-100 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-white"
          >
            START FIT TEST →
          </Link>
        </section>
      </main>
    </div>
  );
}
