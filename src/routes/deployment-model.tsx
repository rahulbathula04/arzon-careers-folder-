import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/deployment-model")({
  beforeLoad: () => {
    throw redirect({ to: "/why-arzon", statusCode: 301 });
  },
  head: () => {
    const seo = pageSeo({
      path: "/deployment-model",
      title: "Why Arzon · Deployment-Ready Model",
      description: "Legacy deployment-model page - merged into /why-arzon. Redirecting.",
      noindex: true,
    });
    return {
      meta: [{ title: "Why Arzon · Deployment-Ready Model" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: () => null,
});
