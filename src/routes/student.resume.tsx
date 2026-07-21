import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { generateAtsResume } from "@/lib/resume.functions";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

import { pageSeo } from "@/lib/seo";

// @ts-expect-error Route tree generation runs during Vite build
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
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
        <p>No Career Engine result found. Please complete the assessment first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Resume Builder</h1>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">ATS Compatibility Score</h2>
            <span className="text-3xl font-bold text-primary">{resume.atsScore}%</span>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-primary transition-all duration-1000"
              style={{ width: `${resume.atsScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">AI Summary</h2>
          <p className="text-white/80">{resume.summary}</p>
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
