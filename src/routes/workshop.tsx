import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/workshop")({
  beforeLoad: () => {
    throw redirect({ to: "/healthcare-career-workshop", statusCode: 301 });
  },
});
