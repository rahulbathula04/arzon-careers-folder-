import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Consolidation: /internships/* is being collapsed into /courses/*.
 * Returns a 301 during SSR so search engines transfer authority cleanly.
 */
export const Route = createFileRoute("/internships/pharmacovigilance")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses/$slug",
      params: { slug: "pharmacovigilance" },
      statusCode: 301,
    });
  },
});
