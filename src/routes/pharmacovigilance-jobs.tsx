import { createFileRoute } from "@tanstack/react-router";
import { CareerIntelligenceLanding } from "@/components/career/CareerIntelligenceLanding";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/pharmacovigilance-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/pharmacovigilance-jobs",
      title: "Pharmacovigilance Jobs for Freshers: Roles, Skills & Career Path · Arzon Global",
      description: "Understand pharmacovigilance jobs for freshers, the work involved, employer requirements, common tools, role options and how to check your fit.",
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: () => (
    <CareerIntelligenceLanding
      title="Pharmacovigilance jobs: understand the role before you train"
      description="A career-intelligence guide for students and graduates considering pharmacovigilance. See the work, requirements, tools and role paths, then check your fit."
      programmeSlug="pharmacovigilance"
      programmeLabel="Pharmacovigilance"
      roleSlugs={["pv-associate", "drug-safety-associate", "signal-detection-associate"]}
      searchIntent="Pharmacovigilance jobs"
      howWorkLooks={[
        "Review adverse-event information and determine the case-processing workflow.",
        "Capture patient, product, event and reporter information in safety systems.",
        "Code clinical information and maintain case consistency.",
        "Write or update case narratives and follow up for missing information.",
      ]}
      employerRequirements={[
        "Pharmacovigilance and ICSR fundamentals",
        "Medical terminology and clinical interpretation",
        "MedDRA coding concepts",
        "GVP awareness and documentation discipline",
        "Clear written communication and attention to detail",
      ]}
      tools={["Oracle Argus Safety", "ARISg", "MedDRA", "WHO Drug Dictionary", "Excel"]}
    />
  ),
});
