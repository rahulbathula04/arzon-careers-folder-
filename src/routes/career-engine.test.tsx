import { createFileRoute } from "@tanstack/react-router";
import { CareerShell } from "@/components/career/CareerShell";
import { EnterpriseAiAssessmentEngine } from "@/components/candidate/EnterpriseAiAssessmentEngine";
import { MemoizedHealthcare3dCanvas } from "@/components/3d/Healthcare3dCanvas";

export const Route = createFileRoute("/career-engine/test")({
  head: () => ({
    meta: [
      { title: "Healthcare Career ACRI Diagnostic Test · Arzon Global" },
      { name: "description", content: "15-minute calibrated clinical and enterprise diagnostic evaluating Pharmacovigilance, Medical Coding, Clinical Data Management, and CDISC SAS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  return (
    <CareerShell>
      <main className="py-10 bg-[#FAF8F5] min-h-screen text-[#1A1A1A] relative overflow-hidden">
        <MemoizedHealthcare3dCanvas className="absolute inset-0 pointer-events-none opacity-25 z-0" />
        <div className="relative z-10">
          <EnterpriseAiAssessmentEngine />
        </div>
      </main>
    </CareerShell>
  );
}
