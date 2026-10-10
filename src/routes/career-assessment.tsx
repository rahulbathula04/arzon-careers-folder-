import { createFileRoute } from "@tanstack/react-router";
import { CareerAssessmentLanding } from "@/components/career/CareerAssessmentLanding";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";
import { breadcrumbSchema } from "@/lib/jsonLd";

export const Route = createFileRoute("/career-assessment")({
  head: () => {
    const ps = pageSeo({
      path: "/career-assessment",
      title: "Career Assessment · Healthcare Role Fit | Arzon Global",
      description:
        "Understand which healthcare careers fit your background, interests and current strengths before committing time and money to a programme.",
      image: SITE.ogImages.careerEngine,
    });
    return {
      meta: [{ title: "Career Assessment | Arzon Global" }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Career Assessment", path: "/career-assessment" },
          ]),
        },
      ],
    };
  },
  component: CareerAssessmentLanding,
});
