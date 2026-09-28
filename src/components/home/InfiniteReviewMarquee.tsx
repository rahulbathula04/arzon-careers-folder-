import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const LANES = [
  REVIEWS.slice(0, 4),
  REVIEWS.slice(4, 8),
  REVIEWS.slice(8, 12),
] as const;

export function InfiniteReviewMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[#07152F] py-20 text-white sm:py-24" aria-labelledby="student-stories-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">
              Published student reviews
            </p>
            <h2 id="student-stories-heading" className="mt-4 font-serif text-4xl leading-[0.98] tracking-tight sm:text-5xl">
              Don't take our word for it.
              <br />
              Read what students published.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>Source-labelled review records</span>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        {LANES.map((lane, laneIndex) => {
          const items = [...lane, ...lane];
          const reverse = laneIndex === 1;
          return (
            <div key={laneIndex} className="relative overflow-hidden">
              <motion.div
                className="flex w-max gap-4 px-5 sm:px-8"
                animate={reduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={reduceMotion ? undefined : { duration: 34 + laneIndex * 8, ease: "linear", repeat: Infinity }}
              >
                {items.map((review, index) => (
                  <article
                    key={`${review.author}-${index}`}
                    className="w-[300px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:w-[360px]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                        {Array.from({ length: review.rating }).map((_, starIndex) => (
                          <Star key={starIndex} className="h-3.5 w-3.5 fill-current text-amber-300" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        {review.verifiedSource ?? "Published"}
                      </span>
                    </div>
                    <Quote className="mt-5 h-6 w-6 text-blue-200/70" />
                    <p className="mt-3 min-h-[118px] text-sm leading-6 text-slate-100/90">
                      “{review.body}”
                    </p>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="font-semibold text-white">{review.author}</p>
                      <p className="mt-1 text-xs text-slate-300">{review.degree} · {review.college}</p>
                      <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.12em] text-blue-200">{review.domain}</p>
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl items-center gap-3 px-5 text-[11px] text-slate-400 sm:px-8">
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Hover to pause on supported pointer devices</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </section>
  );
}
