import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { generateAtsResume } from "@/lib/resume.functions";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/student/resume")({
  head: () => {
    const seo = pageSeo({
      path: "/student/resume",
      title: "AI Resume Builder · Arzon Careers",
      description: "Your personalized ATS-optimized resume.",
      noindex: true,
    });
    return {
      meta: [{ title: "AI Resume Builder · Arzon Careers" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: StudentResume,
});

function StudentResume() {
  const atsResumeFn = useServerFn(generateAtsResume);
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResume() {
      try {
        // Fallback or read from sessionStorage for the demo
        const savedResult = sessionStorage.getItem("ce_result");
        if (savedResult) {
          const result = JSON.parse(savedResult) as CareerEngineResult;
          const res = await atsResumeFn({ data: { result } });
          if (res.ok) {
            setResume(res.resume);
          }
        }
      } catch (e) {
        console.error("Failed to load resume", e);
      } finally {
        setLoading(false);
      }
    }
    loadResume();
  }, [atsResumeFn]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="h-8 w-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex h-screen items-center justify-center tone-dark bg-surface-dark text-white">
        <p>No Career Engine result found. Please complete the assessment first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen tone-dark bg-surface-dark p-8 text-white">
      <div className="mx-auto max-w-3xl space-y-8 pt-12">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold tracking-tight text-white">
            AI Resume Builder
          </h1>
          <p className="mt-2 text-white/60">Your personalized ATS-optimized profile.</p>
        </div>

        <div className="glass-panel-deep rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/50">
                Goal Gradient
              </p>
              <h2 className="mt-1 text-2xl font-bold font-display text-white">
                ATS Compatibility Score
              </h2>
            </div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/5 shadow-inner">
              <svg
                className="absolute inset-0 h-full w-full -rotate-90 transform"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="46" className="fill-none stroke-white/10 stroke-[8]" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  className="fill-none stroke-sky-400 stroke-[8] transition-all duration-1000 ease-out"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * resume.atsScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-mono text-2xl font-bold text-white">{resume.atsScore}%</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-sky-500/10 px-5 py-4 border border-sky-400/20">
            <p className="text-sm text-sky-100">
              You are <strong className="text-sky-400 font-bold">{100 - resume.atsScore}%</strong>{" "}
              away from a guaranteed interview shortlist.
            </p>
            <Link to="/apply" className="rounded-full bg-sky-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-sky-300 hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              Close the Gap
            </Link>
          </div>
        </div>

        <div className="glass-panel-deep rounded-2xl p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-display font-semibold">AI Summary</h2>
          <p className="text-white/80 leading-relaxed">{resume.summary}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h3 className="mb-4 text-lg font-semibold text-emerald-400">Strengths to Highlight</h3>
            <ul className="space-y-2 text-white/80">
              {resume.skills.map((skill: string) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6">
            <h3 className="mb-4 text-lg font-semibold text-rose-400">Gaps to Address</h3>
            <ul className="space-y-2 text-white/80">
              {resume.gapsToAddress.length > 0 ? (
                resume.gapsToAddress.map((gap: string) => (
                  <li key={gap} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    <span>{gap}</span>
                  </li>
                ))
              ) : (
                <p className="text-white/50">No significant gaps detected.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
