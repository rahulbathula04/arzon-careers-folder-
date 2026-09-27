import { createFileRoute } from "@tanstack/react-router";
import { ArzonJobIntelligencePage } from "@/components/career/ArzonJobIntelligencePage";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/medical-coding-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/medical-coding-jobs",
      title: "Medical Coding Jobs for Freshers · Role Requirements & Career Guide",
      description:
        "Understand medical coding roles, common code sets, skills, eligibility and preparation paths before choosing training.",
      image: "/og/medical-coding.jpg",
    });
    return {
      meta: [{ title: "Medical Coding Jobs for Freshers · Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Medical Coding Jobs for Freshers",
            description: "Career intelligence for medical coding roles.",
            url: "https://arzoncareers.in/medical-coding-jobs",
          }),
        },
      ],
    };
  },
  component: MedicalCodingJobsPage,
});

function MedicalCodingJobsPage() {
  return (
    <ArzonJobIntelligencePage
      familyId="medical-coding"
      eyebrow="CAREER INTELLIGENCE · MEDICAL CODING"
      title="Medical coding jobs: understand the work, requirements and readiness path."
      description="Explore medical-coding roles and the skills behind them. Review the recurring coding capabilities, then use the Career Engine to decide what preparation makes sense for you."
      courseSlug="medical-coding"
      mobileImageSrc="/images/bpharm-male-graduate.jpg"
    />
  );
}
