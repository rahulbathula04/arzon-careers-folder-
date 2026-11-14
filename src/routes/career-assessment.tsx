import { createFileRoute } from "@tanstack/react-router";
import { CareerAssessmentLanding } from "@/components/career/CareerAssessmentLanding";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";
import { breadcrumbSchema } from "@/lib/jsonLd";

export const Route = createFileRoute("/career-assessment")({
  head: () => {
    const ps = pageSeo({
      path: "/career-assessment",
      title: "Clinical Interview Diagnostic · Drug Safety | Arzon Global",
      description:
        "Complete 40 realistic clinical interview scenarios to identify your knowledge, decision-making, and technical gaps against published CRO industry requirements.",
      image: SITE.ogImages.careerEngine,
    });
    return {
      meta: [{ title: "Clinical Interview Diagnostic | Arzon Global" }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Clinical Interview Diagnostic", path: "/career-assessment" },
          ]),
        },
      ],
    };
  },
  component: CareerAssessmentLanding,
});
