import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/career-engine/lead")({
  beforeLoad: () => {
    // Legacy compatibility route. The public Career Engine now captures the
    // lead before the assessment and shows the report directly after scoring.
    throw redirect({ to: "/career-engine/test" });
  },
  component: () => null,
});
