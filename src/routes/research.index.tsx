import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";

export const Route = createFileRoute("/research/")({
  head: () => {
    const ps = pageSeo({
      path: "/research",
      title: "Arzon Research | Career Intelligence & Healthcare Studies",
      description: "Empirical research, clinical studies, and career intelligence reports by Arzon Global.",
      image: SITE.ogImages?.about || "/og/about.jpg",
    });
    return {
      meta: ps.meta,
      links: ps.links,
    };
  },
  beforeLoad: () => {
    throw redirect({ to: "/resources", statusCode: 301 });
  },
});
