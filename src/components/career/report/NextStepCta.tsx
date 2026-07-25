import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Briefcase, Download, Sparkles } from "lucide-react";

export function NextStepCta({ primarySlug: _primarySlug }: { primarySlug: string | null }) {
  const triggerDownload = () => {
    const el = document.getElementById("report-download-pdf");
    el?.click();
  };

  return (
    <section aria-labelledby="report-next-step" className="rounded-2xl border border-white/10 bg-[#121723] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 text-white">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Recommended Next Action
        </span>
        <h2 id="report-next-step" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Want <span className="italic text-amber-400">recruiter-level deployment feedback</span>?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          ASSAY Hiring Simulation evaluates timed judgment, written clarity, and role-specific work samples. You walk away with an audited deployment score for top CROs.
        </p>
      </div>

      <div>
        <Link
          to="/career-engine"
          className="h-12 px-6 rounded-xl inline-flex items-center gap-2 text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
        >
          <span>Take ASSAY Hiring Simulation</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
        <Link to="/contact" className="inline-flex items-center gap-1.5 hover:text-white font-semibold">
          <Calendar className="h-4 w-4 text-blue-400" /> Book 1-on-1 Counselling
        </Link>
        <Link to="/internships" className="inline-flex items-center gap-1.5 hover:text-white font-semibold">
          <Briefcase className="h-4 w-4 text-blue-400" /> View Open Internships
        </Link>
        <button
          type="button"
          onClick={triggerDownload}
          className="inline-flex items-center gap-1.5 hover:text-white font-semibold"
        >
          <Download className="h-4 w-4 text-blue-400" /> Download Full PDF Report
        </button>
      </div>
    </section>
  );
}

export default NextStepCta;
