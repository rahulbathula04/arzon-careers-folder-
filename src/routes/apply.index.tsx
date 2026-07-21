import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/apply/")({
  beforeLoad: () => {
    throw redirect({ to: "/enrol", statusCode: 301 });
  },
  head: () => ({
    meta: [{ title: "Enrol · Arzon Careers" }, { name: "robots", content: "noindex" }],
  }),
  component: () => null,
});
