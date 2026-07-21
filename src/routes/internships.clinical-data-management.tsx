import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/internships/clinical-data-management")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses/$slug",
      params: { slug: "clinical-data-management" },
      statusCode: 301,
    });
  },
});
