import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/clinical-data-management-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/clinical-data-management-jobs",
      title: "Clinical Data Management Jobs for Freshers | Career Guide",
      description: "Understand clinical data management roles, EDC skills, eligibility and preparation paths before choosing training.",
      image: "/og/about.jpg",
    });
    return { meta: [{ title: "Clinical Data Management Jobs for Freshers | Arzon Global" }, ...seo.meta], links: seo.links };
  },
  component: ClinicalDataManagementJobsPage,
});

function ClinicalDataManagementJobsPage() {
  return (
    <ArzonJobIntelligencePage
      familyId="clinical-data"
      eyebrow="CAREER INTELLIGENCE · CLINICAL DATA MANAGEMENT"
      title="Clinical data management jobs: understand the work, requirements and readiness path."
      description="Review the roles, recurring skills and employer signals behind clinical data management before deciding how to prepare."
      courseSlug="clinical-data-management"
    />
  );
}
