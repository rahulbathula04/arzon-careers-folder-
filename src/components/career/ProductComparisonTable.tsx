import { ArrowRight, BookOpen, Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ProductComparisonTableProps {
  onApplyAcri?: () => void;
  activeProduct?: "assessment" | "acri";
}

/**
 * Public comparison for the Career Assessment journey.
 * ACRI is paused as a public product; the legacy props remain temporarily so
 * older internal callers continue to type-check while those screens are retired.
 */
export function ProductComparisonTable(_props: ProductComparisonTableProps) {
  return (
    <section className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xs tone-light sm:p-7">
      <div className="mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1557D6]">Choose your next step</p>
        <h2 className="mt-2 text-2xl font-serif font-bold text-[#071A4A] sm:text-3xl">Start with career direction. Then explore the work.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          You do not need to choose a programme before understanding the roles it prepares you for.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-[#DCE5F0] bg-[#F8FAFC] p-5">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-[#1557D6] shadow-sm">
            <Compass className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#071A4A]">Career Assessment</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Explore role options using your background, interests and working preferences.</p>
          <Link to="/career-assessment" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#1557D6] hover:underline">
            Take the free assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <article className="rounded-xl border border-[#DCE5F0] bg-white p-5">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#F8FAFC] text-[#1557D6]">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#071A4A]">Role directory and programmes</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Review responsibilities, skills and programme structure before deciding how to prepare.</p>
          <Link to="/roles" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#1557D6] hover:underline">
            Explore roles <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </div>
      <p className="mt-5 text-center text-xs leading-5 text-slate-500">
        Career Assessment provides guidance. It does not certify professional competence or predict employment.
      </p>
    </section>
  );
}
