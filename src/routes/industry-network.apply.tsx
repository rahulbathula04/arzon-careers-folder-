import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/industry-network/apply")({
  beforeLoad: () => {
    throw redirect({ to: "/industry-network-programme/apply" });
  },
  component: () => null,
});
