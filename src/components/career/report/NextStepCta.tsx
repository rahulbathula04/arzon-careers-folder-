/**
 * NextStepCta — the "Ready?" block that closes the report. One dominant
 * action (start the cohort tied to the user's primary path) plus three
 * secondary links. Replaces the previous dead-end at the bottom of the
 * report. Uses only routes that already exist in the app.
 */
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Briefcase, Download } from "lucide-react";
import { REPORT_TONES } from "./reportTones";

export function NextStepCta({ primarySlug: _primarySlug }: { primarySlug: string | null }) {
  const triggerDownload = () => {
    const el = document.getElementById("report-download-pdf");
    el?.click();
  };

  return (
    <section
      aria-labelledby="report-next-step"
      className="report-hero-plate report-print-hide relative overflow-hidden"
    >
      <p
        className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] ${REPORT_TONES.primary.softEyebrow}`}
      >
        Now what?
      </p>
      <h2
        id="report-next-step"
        className="mt-3 font-serif text-3xl leading-tight tracking-tight text-white sm:text-4xl"
      >
        Want recruiter-level feedback?
      </h2>
      <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] text-white/70">
        ASSAY Hiring Simulation puts you through the same signals a real recruiter uses — timed
        judgement, written clarity, and a role-specific work sample. You walk out with a verdict,
        not a personality label.
      </p>

      <div className="mt-6">
        <Link
          to="/career-engine"
          className={`inline-flex h-14 items-center gap-2.5 rounded-full ${REPORT_TONES.primary.solidCtaBg} px-7 font-grotesk text-base font-bold text-slate-900 shadow-[0_20px_60px_-20px_rgba(37,99,235,0.45)] transition hover:brightness-110`}
        >
          Take ASSAY Hiring Simulation
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
        <li>
          <Link to="/contact" className="inline-flex items-center gap-1.5 hover:text-white">
            <Calendar className={`h-4 w-4 ${REPORT_TONES.primary.chipPillText}`} aria-hidden />
            Book counselling
          </Link>
        </li>
        <li>
          <Link to="/internships" className="inline-flex items-center gap-1.5 hover:text-white">
            <Briefcase className={`h-4 w-4 ${REPORT_TONES.primary.chipPillText}`} aria-hidden />
            View internships
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={triggerDownload}
            className="inline-flex items-center gap-1.5 hover:text-white"
          >
            <Download className={`h-4 w-4 ${REPORT_TONES.primary.chipPillText}`} aria-hidden />
            Download PDF
          </button>
        </li>
      </ul>
    </section>
  );
}

export default NextStepCta;
