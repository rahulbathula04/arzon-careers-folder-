import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/clinical-trials-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/clinical-trials-jobs",
      title: "Clinical Trials Jobs for Freshers | Career Guide",
      description: "Understand clinical trial data workflows, EDC roles, common skills, eligibility and preparation paths.",
      image: "/og/about.jpg",
    });
    return { meta: [{ title: "Clinical Trials Jobs for Freshers | Arzon Global" }, ...seo.meta], links: seo.links };
  },
  component: ClinicalTrialsJobsPage,
});

function ClinicalTrialsJobsPage() {
  return (
    <ArzonJobIntelligencePage
      familyId="clinical-data"
      eyebrow="CAREER INTELLIGENCE · CLINICAL TRIALS"
      title="Clinical trials jobs: understand the work, requirements and readiness path."
      description="Explore the clinical-trial data roles represented in Arzon's current taxonomy, including EDC, data review and clinical data coordination, then assess what you need to build next."
      courseSlug="clinical-data-management"
      roleFilter={(role) => role.pathSlug === "clinical-data-management"}
    />
  );
}
