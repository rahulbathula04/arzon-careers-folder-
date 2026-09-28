import { createFileRoute } from "@tanstack/react-router";
import { CareerEngineAssessment } from "@/components/career/CareerEngineAssessment";

export const Route = createFileRoute("/career-engine/test")({
  head: () => ({
    meta: [
      { title: "Career Fit Assessment · Arzon Global" },
      {
        name: "description",
        content:
          "Complete the Arzon Career Engine assessment to receive a role-fit report, skill-gap signals and recommended next steps.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  return <CareerEngineAssessment />;
}
