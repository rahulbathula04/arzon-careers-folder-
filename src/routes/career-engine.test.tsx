import { createFileRoute } from "@tanstack/react-router";
import { CareerEngineAssessment } from "@/components/career/CareerEngineAssessment";

export const Route = createFileRoute("/career-engine/test")({
  head: () => ({
    meta: [
      { title: "Career Assessment · Arzon Global" },
      {
        name: "description",
        content:
          "Complete Arzon's free career assessment to understand the healthcare and life-science roles worth exploring next.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CareerEngineTestPage,
});

function CareerEngineTestPage() {
  return <CareerEngineAssessment />;
}
