import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/regulatory-affairs-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/regulatory-affairs-jobs",
      title: "Regulatory Affairs Jobs for Freshers | Career Guide",
      description: "Understand regulatory affairs roles, submission skills, eligibility and preparation paths before choosing training.",
      image: "/og/about.jpg",
    });
    return { meta: [{ title: "Regulatory Affairs Jobs for Freshers | Arzon Global" }, ...seo.meta], links: seo.links };
  },
  component: RegulatoryAffairsJobsPage,
});

function RegulatoryAffairsJobsPage() {
  return (
    <ArzonJobIntelligencePage
      familyId="regulatory"
      eyebrow="CAREER INTELLIGENCE · REGULATORY AFFAIRS"
      title="Regulatory affairs jobs: understand the work, requirements and readiness path."
      description="Explore regulatory roles, submission capabilities and recurring employer requirements before choosing preparation."
      courseSlug="regulatory-affairs"
    />
  );
}
