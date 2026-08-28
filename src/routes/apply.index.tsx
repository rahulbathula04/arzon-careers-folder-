import { createFileRoute } from "@tanstack/react-router";
import { ApplicationForm } from "@/components/landing/ApplicationForm";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/apply/")({
  head: () => ({
    meta: [
      { title: "Apply for Live Healthcare Roles Â· Arzon Global" },
      {
        name: "description",
        content: "Submit your profile for current Arzon Global healthcare opportunities.",
      },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  return (
    <main className="min-h-app bg-[#070D1B] text-slate-100 tone-dark">
      <ApplicationForm />
      <Footer />
    </main>
  );
}
