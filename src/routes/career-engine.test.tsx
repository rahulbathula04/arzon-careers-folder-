import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AcriAssessmentTerminal } from "@/components/acri/assessment/AcriAssessmentTerminal";

const searchSchema = z.object({
  code: z.string().optional(),
  mode: z.string().optional(),
});

export const Route = createFileRoute("/career-engine/test")({
  validateSearch: (search: Record<string, unknown>) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "ACRI Pharmacovigilance Associate Assessment · Arzon Global" },
      {
        name: "description",
        content:
          "Calibrated occupational readiness assessment for Pharmacovigilance Associates covering ICH E2B(R3), WHO-UMC causality, MedDRA coding, and safety triage.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <AcriAssessmentTerminal />
    </main>
  );
}
