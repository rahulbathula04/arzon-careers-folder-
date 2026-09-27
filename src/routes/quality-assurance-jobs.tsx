import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/quality-assurance-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/quality-assurance-jobs",
      title: "Healthcare Quality Assurance Jobs | Career Guide",
      description: "Understand regulated healthcare quality and compliance work, recurring skills and preparation paths using Arzon's current regulatory evidence.",
      image: "/og/about.jpg",
    });
    return { meta: [{ title: "Healthcare Quality Assurance Jobs | Arzon Global" }, ...seo.meta], links: seo.links };
  },
  component: QualityAssuranceJobsPage,
});

function QualityAssuranceJobsPage() {
  return (
    <ArzonJobIntelligencePage
      familyId="regulatory"
      eyebrow="CAREER INTELLIGENCE · QUALITY & COMPLIANCE"
      title="Healthcare quality assurance jobs: understand the work, requirements and readiness path."
      description="Arzon's current role taxonomy does not contain a dedicated quality-assurance family, so this page uses regulatory and compliance roles as its evidence base rather than inventing QA job data."
      courseSlug="regulatory-affairs"
      roleFilter={(role) => role.pathSlug === "regulatory-affairs"}
    />
  );
}
