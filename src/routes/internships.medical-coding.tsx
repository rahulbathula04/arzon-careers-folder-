import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/internships/medical-coding")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses/$slug",
      params: { slug: "medical-coding" },
      statusCode: 301,
    });
  },
});
