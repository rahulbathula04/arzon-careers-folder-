import { Star, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AcriTestimonials() {
  const testimonials = [
    {
      name: "Priya S.",
      degree: "M.Pharm, 2025",
      avatar: "/images/avatar-priya.jpg",
      quote:
        "The assessment showed me exactly what I was missing. After following the learning path, I got shortlisted for an interview!",
    },
    {
      name: "Rahul K.",
      degree: "B.Pharm, 2024",
      avatar: "/images/avatar-rahul.jpg",
      quote:
        "The case scenarios felt just like real work. The ACRI certification gave me confidence to apply.",
    },
    {
      name: "Sneha P.",
      degree: "Life Sciences Graduate",
      avatar: "/images/avatar-sneha.jpg",
      quote:
        "Best platform for healthcare students. The structured roadmap really works.",
    },
  ];

  return (
    <section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-stone-200/60">
          <div>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-[#0B1325]">
              What Our Students Say
            </h2>
            <p className="mt-1 text-sm text-stone-500 font-medium">
              Real journeys. Real transformations.
            </p>
          </div>

          <div>
            <Link
              to="/placements"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#0B1325] transition-colors"
            >
              <span>View More Stories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-light rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover border border-stone-200"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-sans text-sm font-bold text-[#0B1325]">{t.name}</h3>
                    <p className="text-xs text-stone-500 font-medium">{t.degree}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* 5-Star Rating */}
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
