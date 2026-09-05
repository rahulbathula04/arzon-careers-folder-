import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";

export function ArzonProgramBridge() {
  return (
    <section className="py-8 sm:py-10 bg-white border-b border-stone-200/90 text-left tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-[#FAF9F6] p-6 sm:p-8 tone-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-block px-3.5 py-1.5 rounded bg-stone-200/80 border-l-4 border-[#1B3F8B] text-stone-950 font-serif text-lg sm:text-xl font-extrabold tracking-tight">
              About Arzon Healthcare Career Intelligence
            </div>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
              Arzon Global bridges academic degrees with clinical industry expectations. If you decide Pharmacovigilance is the right direction after this workshop, explore our verified role tracks, salary benchmarks, and case simulations.
            </p>
          </div>

          <Link
            to="/pharmacovigilance-jobs"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-900 font-mono text-xs font-semibold uppercase tracking-wider shadow-2xs transition-colors shrink-0 tone-light"
          >
            <span>EXPLORE PV ROLE TRACK</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
