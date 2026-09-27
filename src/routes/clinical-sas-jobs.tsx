import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/clinical-sas-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/clinical-sas-jobs",
      title: "Clinical SAS Jobs for Freshers | Career Guide",
      description: "Understand Clinical SAS roles, recurring skills, tools, eligibility and preparation paths before choosing training.",
      image: "/og/about.jpg",
    });
    return { meta: [{ title: "Clinical SAS Jobs for Freshers | Arzon Global" }, ...seo.meta], links: seo.links };
  },
  component: ClinicalSasJobsPage,
});

function ClinicalSasJobsPage() {
  return (
    <ArzonJobIntelligencePage
      familyId="clinical-data"
      eyebrow="CAREER INTELLIGENCE · CLINICAL SAS"
      title="Clinical SAS jobs: understand the work, requirements and readiness path."
      description="Explore clinical programming roles and the capabilities employers repeatedly ask for. Then use the Career Engine to work out what you should build next."
      courseSlug="sas-clinical"
    />
  );
}
