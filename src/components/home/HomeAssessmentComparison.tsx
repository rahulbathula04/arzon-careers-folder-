import { ArrowRight, Compass, FileText, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HomeAssessmentComparison() {
  return (
    <section id="career-assessment" className="border-b border-[#E4EAF2] bg-white py-12 sm:py-16 tone-light">
      <div className="ap-shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1557D6]">
              START WITH DIRECTION
            </p>
            <h2 className="text-3xl font-serif font-bold leading-tight tracking-tight text-[#071A4A] sm:text-4xl">
              Not sure which healthcare role fits you?
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Use the free Career Assessment to explore role options based on your background, interests and working preferences. Review the result before deciding whether a programme is right for you.
            </p>
            <Link
              to="/career-assessment"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1557D6] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1044A5]"
            >
              Take the free Career Assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 max-w-md text-xs leading-5 text-slate-500">
              The result is career guidance, not a hiring decision, professional certification or guarantee of employment.
            </p>
          </div>

          <div className="rounded-2xl border border-[#DCE5F0] bg-[#F8FAFC] p-5 sm:p-7">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-[#1557D6] shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#071A4A]">What to look for in your result</p>
                <p className="mt-0.5 text-xs text-slate-500">A practical starting point for career research</p>
              </div>
            </div>
            <div className="grid gap-4 pt-5 sm:grid-cols-2">
              <div className="flex gap-3">
                <Search className="mt-0.5 h-4 w-4 shrink-0 text-[#1557D6]" />
                <div>
                  <p className="text-sm font-semibold text-[#071A4A]">Role options</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">Understand the kinds of work different healthcare roles involve.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Compass className="mt-0.5 h-4 w-4 shrink-0 text-[#1557D6]" />
                <div>
                  <p className="text-sm font-semibold text-[#071A4A]">Next steps</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">Use the result to decide which role requirements to explore next.</p>
                </div>
              </div>
            </div>
            <Link to="/roles" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#1557D6] hover:underline">
              Browse the role directory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
