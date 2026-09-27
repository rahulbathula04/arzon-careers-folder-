import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/pharmacovigilance-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/pharmacovigilance-jobs",
      title: "Pharmacovigilance Jobs for Freshers | Career Guide",
      description:
        "Understand pharmacovigilance roles, common skills, tools, eligibility and career pathways before choosing training.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Pharmacovigilance Jobs for Freshers | Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Pharmacovigilance Jobs for Freshers",
            description: "Career intelligence for pharmacovigilance roles.",
            url: "https://arzoncareers.in/pharmacovigilance-jobs",
          }),
        },
      ],
    };
  },
  component: PharmacovigilanceJobsPage,
});

function PharmacovigilanceJobsPage() {
  return (
    <>
      <ArzonJobIntelligencePage
        familyId="drug-safety"
        eyebrow="CAREER INTELLIGENCE · PHARMACOVIGILANCE"
        title="Pharmacovigilance jobs: understand the work, requirements and readiness path."
        description="Explore drug-safety roles from entry level upward. See the recurring skills and tools in Arzon's role dataset, then use the Career Engine to work out what you should build next."
        courseSlug="pharmacovigilance"
        mobileImageSrc="/images/bpharm-male-graduate.jpg"
      />
      <div className="sr-only">
        <Link to="/career-engine">Get My Career Plan</Link>
        <Link to="/courses/$slug" params={{ slug: "pharmacovigilance" }}>Explore Pharmacovigilance Programme</Link>
        <ArrowRight />
      </div>
    </>
  );
}
