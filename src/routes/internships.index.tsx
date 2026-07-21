import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/internships/")({
  beforeLoad: () => {
    throw redirect({ to: "/courses", statusCode: 301 });
  },
});
