import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/proof")({
  beforeLoad: () => {
    throw redirect({ to: "/why-arzon", statusCode: 301 });
  },
  head: () => {
    const seo = pageSeo({
      path: "/proof",
      title: "Why Arzon · Proof, Methodology & Credibility",
      description: "Legacy proof page — merged into /why-arzon. Redirecting.",
      noindex: true,
    });
    return {
      meta: [{ title: "Why Arzon · Proof, Methodology & Credibility" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: () => null,
});
