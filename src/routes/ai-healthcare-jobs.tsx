import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/ai-healthcare-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/ai-healthcare-jobs",
      title: "AI in Healthcare Jobs | Career Guide",
      description: "Understand healthcare AI, analytics and data roles, common skills, tools, eligibility and preparation paths.",
      image: "/og/about.jpg",
    });
    return { meta: [{ title: "AI in Healthcare Jobs | Arzon Global" }, ...seo.meta], links: seo.links };
  },
  component: AiHealthcareJobsPage,
});

function AiHealthcareJobsPage() {
  return (
    <ArzonJobIntelligencePage
      familyId="health-analytics-ai"
      eyebrow="CAREER INTELLIGENCE · AI IN HEALTHCARE"
      title="AI in healthcare jobs: understand the work, requirements and readiness path."
      description="Explore healthcare analytics, real-world evidence, data engineering and AI roles represented in Arzon's taxonomy, then assess the capabilities you need to build next."
      courseSlug="ai-intelligence"
    />
  );
}
