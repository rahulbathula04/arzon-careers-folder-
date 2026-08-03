import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "pricing", statusCode: 301 });
  },
  head: () => {
    const seo = pageSeo({
      path: "/pricing",
      title: "Programme Pricing & Fee Structure · Arzon Careers",
      description: "Transparent 12-week workforce readiness programme fees. No hidden loan traps. Essential, Career, and Elite tiers.",
      noindex: false,
    });
    return {
      meta: [{ title: "Programme Pricing & Fee Structure · Arzon Careers" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: () => null,
});
