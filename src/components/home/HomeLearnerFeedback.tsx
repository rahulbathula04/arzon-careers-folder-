import { useState } from "react";
import { ArrowRight, Star, Linkedin, Quote, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface ReviewItem {
  id: string;
  source: "google" | "linkedin" | "justdial" | "arzon";
  sourceLabel: string;
  rating?: number;
  badge?: string;
  body: string;
  author: string;
  role: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "diksha",
    source: "google",
    sourceLabel: "Google Review",
    rating: 5,
    body: "Training at Arzon helped me understand real case processing. The mentors were very supportive.",
    author: "Diksha Sharma",
    role: "B.Pharm, 2024",
  },
  {
    id: "gantaran",
    source: "linkedin",
    sourceLabel: "LinkedIn Post",
    badge: "Verified",
    body: "Described an Arzon Global workshop on AI in Pharma as giving fine insight into how the industry works.",
    author: "Gantararnarayanan A",
    role: "M.Pharm, 2024",
  },
  {
    id: "suraj",
    source: "justdial",
    sourceLabel: "Justdial Review",
    rating: 5,
    body: "Good content, practical sessions and useful projects. Helped me prepare for interviews.",
    author: "Suraj Bangar",
    role: "B.Pharm, 2024",
  },
  {
    id: "kavya",
    source: "arzon",
    sourceLabel: "Arzon Feedback",
    badge: "Verified",
    body: "The CDM programme gave me hands-on exposure to real datasets and EDC tools.",
    author: "Kavya Reddy",
    role: "Pharm.D, 2024",
  },
];

export function HomeLearnerFeedback() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = REVIEWS_DATA.filter((r) => {
    if (activeTab === "all") return true;
    return r.source === activeTab;
  });

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E4EAF2] tone-light card-light" id="testimonials">
      <div className="ap-shell">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1557D6] mb-2 flex items-center gap-1.5">
              <span>LEARNER FEEDBACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#071A4A] tracking-tight leading-tight">
              Real experiences, shown with their source.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">
              Public learner posts and Arzon-published feedback stay clearly labelled. No learner profiles are embedded here.
            </p>
          </div>

          <Link
            to={"/reviews" as any}
            className="inline-flex items-center gap-2 rounded-full border border-[#E4EAF2] bg-white hover:bg-slate-50 text-[#071A4A] px-6 py-3 text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 self-start md:self-auto tone-light card-light"
          >
            <span>View all testimonials</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Source Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "bg-slate-100 text-[#475569] hover:bg-slate-200"
            }`}
          >
            All Sources (48)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("google")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "google"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "bg-slate-100 text-[#475569] hover:bg-slate-200"
            }`}
          >
            Google (4.5/5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("justdial")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "justdial"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "bg-slate-100 text-[#475569] hover:bg-slate-200"
            }`}
          >
            Justdial (4.4/5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("linkedin")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "linkedin"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "bg-slate-100 text-[#475569] hover:bg-slate-200"
            }`}
          >
            LinkedIn (Public posts)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("arzon")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "arzon"
                ? "bg-[#071A4A] text-white shadow-xs"
                : "bg-slate-100 text-[#475569] hover:bg-slate-200"
            }`}
          >
            Arzon (Published feedback)
          </button>
        </div>

        {/* 4 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((r) => (
            <article
              key={r.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-xs hover:shadow-md transition-shadow tone-light card-light"
            >
              <div>
                {/* Source Badge & Rating */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#334155]">
                    {r.source === "google" && <span className="h-2 w-2 rounded-full bg-amber-500" />}
                    {r.source === "linkedin" && <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />}
                    {r.source === "justdial" && <span className="h-2 w-2 rounded-full bg-orange-500" />}
                    {r.source === "arzon" && <span className="h-2 w-2 rounded-full bg-[#1557D6]" />}
                    <span>{r.sourceLabel}</span>
                  </span>

                  {r.rating ? (
                    <div className="flex items-center gap-0.5">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  )}
                </div>

                {/* Review Body */}
                <p className="text-xs text-[#334155] leading-relaxed italic mb-4">
                  "{r.body}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[#EEF6FF] text-[#1557D6] font-bold text-xs shrink-0">
                  {r.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-[#071A4A] truncate">
                    {r.author}
                  </strong>
                  <span className="block text-[10px] text-[#64748B] truncate">
                    {r.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
