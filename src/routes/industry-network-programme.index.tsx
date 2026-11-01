import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/industry-network-programme/")({
  beforeLoad: () => {
    throw redirect({ to: "/industry-network" });
  },
  component: () => null,
});
