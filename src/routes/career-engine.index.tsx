import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";
import { breadcrumbSchema } from "@/lib/jsonLd";

export const Route = createFileRoute("/career-engine/")({
  beforeLoad: () => {
    throw redirect({ to: "/career-assessment", statusCode: 301 });
  },
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
      links: [{ rel: "canonical", href: `${SITE.origin}/career-assessment` }],
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
  component: () => null,
});
