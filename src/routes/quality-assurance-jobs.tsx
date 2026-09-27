import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/quality-assurance-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/quality-assurance-jobs",
      title: "Healthcare Quality Assurance Jobs | Career Guide",
      description: "Understand regulated healthcare quality and compliance roles, recurring skills and preparation paths.",
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
      eyebrow="CAREER INTELLIGENCE · QUALITY ASSURANCE"
      title="Healthcare quality assurance jobs: understand the work, requirements and readiness path."
      description="Use the regulatory and compliance roles in Arzon's current taxonomy as the evidence base, then assess the capabilities you need for your target quality role."
      courseSlug="regulatory-affairs"
    />
  );
}
