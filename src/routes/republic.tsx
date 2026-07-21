import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/republic")({
  beforeLoad: () => {
    throw redirect({ to: "/why-arzon", statusCode: 301 });
  },
  head: () => {
    const seo = pageSeo({
      path: "/republic",
      title: "Why Arzon · Republic of Skills",
      description: "Legacy republic page — merged into /why-arzon. Redirecting.",
      noindex: true,
    });
    return { meta: [{ title: "Why Arzon · Republic of Skills" }, ...seo.meta], links: seo.links };
  },
  component: () => null,
});
