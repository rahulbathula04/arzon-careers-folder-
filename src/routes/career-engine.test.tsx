import { createFileRoute } from "@tanstack/react-router";
import { CareerShell } from "@/components/career/CareerShell";
import { EnterpriseAiAssessmentEngine } from "@/components/candidate/EnterpriseAiAssessmentEngine";

export const Route = createFileRoute("/career-engine/test")({
  head: () => ({
    meta: [
      { title: "Enterprise AI & Quant ACRI Diagnostic Test · Arzon Global" },
      { name: "description", content: "20-minute calibrated technical diagnostic evaluating DSA, SQL Lakehouse, Enterprise AI, and CI/CD." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  return (
    <CareerShell>
      <main className="py-10 bg-[#FAF8F5] min-h-screen text-[#1A1A1A]">
        <EnterpriseAiAssessmentEngine />
      </main>
    </CareerShell>
  );
}
