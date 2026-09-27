import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/training/")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses",
      statusCode: 301,
    });
  },
  head: () => {
    const seo = pageSeo({
      path: "/training",
      title: "Arzon Global Role Readiness Programmes",
      description:
        "Arzon Global healthcare role-readiness programmes, applied projects and readiness assessment.",
      image: "/og/internships.jpg",
    });
    return {
      meta: seo.meta,
      links: seo.links,
    };
  },
  component: TrainingRedirect,
});

function TrainingRedirect() {
  return null;
}
