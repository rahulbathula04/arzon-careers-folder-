import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/career-engine/enrol")({
  beforeLoad: () => {
    // Career Engine uses the canonical enrolment flow. Keeping a second payment
    // implementation here creates a price/order/cohort source-of-truth split.
    throw redirect({
      to: "/enrol/$tier",
      params: { tier: "career" },
      search: { source: "career-engine" },
    });
  },
  component: () => null,
});
