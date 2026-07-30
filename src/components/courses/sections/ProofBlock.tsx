import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import type { Course } from "@/data/courses";
import type { RichCourseMeta } from "@/data/courseMeta";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";
import { JDInsights } from "@/components/courses/JDInsights";
import { SyllabusAccordion } from "@/components/courses/SyllabusAccordion";
import { DeploymentReadyBlock } from "@/components/courses/DeploymentReadyBlock";
import { BrochureButton } from "@/components/courses/BrochureButton";
import { MentorCard } from "@/components/courses/MentorCard";
import { getDeploymentReadiness } from "@/data/deploymentReadiness";

type Theme = ReturnType<typeof getTrackTheme>;

/** Beat 07 - full proof stack: JD analysis, deployment-ready framework,
 *  syllabus accordion, mentor. */
export function ProofBlock({
  course,
  meta,
  theme,
}: {
  course: Course;
  meta: RichCourseMeta;
  theme: Theme;
}) {
  const dep = getDeploymentReadiness(course.slug);
  return (
    <ConversionSection
      id="proof"
      step="07"
      eyebrow="The proof stack"
      title="What hiring managers actually ask for - and how we mirror it."
      subtitle={course.blurb}
      theme={theme}
    >
      <JDInsights course={course} />

      <div className="mt-10">
        <div className="flex items-center gap-2">
          <Wrench className={`h-4 w-4 ${theme.accentText}`} />
          <p
            className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
          >
            Tools you'll master
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {course.tools.map((t) => (
            <span
              key={t}
              className="rounded-full border px-3 py-1.5 font-mono text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.15)",
                color: "#E2E8F0",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {dep && (
        <div className="mt-12">
          <DeploymentReadyBlock data={dep} accentText={theme.accentText} />
        </div>
      )}

      <div className="mt-12">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <BrochureButton course={course} />
          <Link
            to="/certificates/sample/$slug"
            params={{ slug: course.slug }}
            className="inline-flex h-11 items-center rounded-full border px-4 text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.15)",
              color: "#F8FAFC",
            }}
          >
            See sample certificate
          </Link>
        </div>
        <div className="tone-light rounded-2xl border border-white/10 bg-white p-2 text-[#0A0F1E] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-6">
          <SyllabusAccordion modules={course.syllabus} slug={course.slug} />
        </div>
      </div>

      <div className="mt-12">
        <MentorCard meta={meta} theme={theme} />
      </div>
    </ConversionSection>
  );
}
