import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/healthcare-careers")({
  beforeLoad: () => {
    throw redirect({ to: "/careers", statusCode: 301 });
  },
});
