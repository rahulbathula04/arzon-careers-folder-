import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/apply/success")({
  beforeLoad: () => {
    throw redirect({ to: "/enrol/success", statusCode: 301 });
  },
  head: () => ({
    meta: [{ title: "Enrolment success · Arzon Careers" }, { name: "robots", content: "noindex" }],
  }),
  component: () => null,
});
