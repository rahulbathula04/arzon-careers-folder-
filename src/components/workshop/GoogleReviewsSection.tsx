import { useState } from "react";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import { REVIEWS, AGGREGATE_RATING } from "@/data/reviews";

interface GoogleReviewsSectionProps {
  onReserveClick: () => void;
}

export function GoogleReviewsSection({ onReserveClick }: GoogleReviewsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = [
    "All",
    "Pharmacovigilance (PV)",
    "Medical Coding & RCM",
    "Clinical Data Management (CDM)",
    "Regulatory Affairs (RA)",
    "Healthcare Analytics",
  ];

  const filteredReviews =
    selectedFilter === "All"
      ? REVIEWS
      : REVIEWS.filter(
          (r) =>
            r.domain.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            selectedFilter.toLowerCase().includes(r.domain.toLowerCase())
        );

  return (
    <section id="reviews" className="w-full bg-slate-50 py-12 sm:py-16 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Verified Rating Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white card-light border border-slate-300 text-slate-900 font-sans text-xs font-bold shadow-xs mb-3">
            {/* Google G SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-extrabold text-slate-900">Google Rating {AGGREGATE_RATING.ratingValue}</span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-slate-500 font-medium">({AGGREGATE_RATING.reviewCount}+ Google Reviews)</span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified Reviews From Pharmacy Candidates
          </h2>
          <p className="font-sans text-sm text-slate-600 mt-2">
            Real feedback from B.Pharm, M.Pharm & Pharm.D candidates who gained practical career clarity and role readiness through Arzon Global.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white card-light text-slate-700 border border-slate-200 hover:border-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredReviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white card-light rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Rating & Domain Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-sans text-[10px] font-extrabold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full uppercase">
                    {rev.domain}
                  </span>
                </div>

                {/* Review Body */}
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 italic">
                  "{rev.body}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Author Initials Avatar */}
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-teal-400 font-sans font-bold text-xs flex items-center justify-center shrink-0">
                    {rev.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <span className="font-sans font-bold text-xs text-slate-900 block leading-tight">
                      {rev.author}
                    </span>
                    <span className="font-sans text-[10px] text-slate-500 block">
                      {rev.degree} · {rev.college}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Callout Banner */}
        <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="font-sans text-xs font-bold text-white ml-1.5">4.9 / 5 Rating</span>
            </div>
            <h3 className="font-sans text-lg sm:text-xl font-extrabold text-white">
              Join 440+ Pharmacy Graduates Who Decoded Their Career Direction
            </h3>
            <p className="font-sans text-xs text-slate-300">
              100% Free 75-minute live career intelligence masterclass on Google Meet.
            </p>
          </div>

          <button
            type="button"
            onClick={onReserveClick}
            className="shrink-0 py-3.5 px-6 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-sans text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>GET MY FREE CAREER MAP + RESERVE SEAT</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
}
