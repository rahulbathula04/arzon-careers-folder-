import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/training/")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses",
      statusCode: 301,
    });
  },
  head: () => ({
    meta: [
      { title: "Arzon Global Role Readiness Programmes" },
      {
        name: "description",
        content:
          "Arzon Global healthcare role-readiness programmes, applied projects and readiness assessment.",
      },
    ],
  }),
  component: TrainingRedirect,
});

function TrainingRedirect() {
  return null;
}
