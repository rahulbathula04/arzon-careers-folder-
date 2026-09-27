import { createFileRoute } from "@tanstack/react-router";
import { CareerIntelligenceLanding } from "@/components/career/CareerIntelligenceLanding";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/medical-coding-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/medical-coding-jobs",
      title: "Medical Coding Jobs for Freshers: Roles, Skills & Career Path · Arzon Global",
      description: "Understand medical coding jobs for freshers, coding work, employer requirements, code sets, role options and how to check your fit.",
    });
    return { meta: seo.meta, links: seo.links };
  },
  component: () => (
    <CareerIntelligenceLanding
      title="Medical coding jobs: understand the work before you train"
      description="A career-intelligence guide for students and graduates considering medical coding. See the work, code sets, employer requirements and role options, then check your fit."
      programmeSlug="medical-coding"
      programmeLabel="Medical Coding"
      roleSlugs={["medical-coder", "inpatient-coder", "outpatient-coder"]}
      searchIntent="Medical coding jobs"
      howWorkLooks={[
        "Review clinical documentation such as physician notes and operative reports.",
        "Identify diagnoses, procedures and documented clinical details relevant to coding.",
        "Assign ICD-10-CM, CPT and HCPCS Level II codes according to applicable guidelines.",
        "Apply coding, documentation and compliance checks and resolve queries.",
      ]}
      employerRequirements={[
        "Medical terminology, anatomy and pathology",
        "ICD-10-CM working knowledge",
        "CPT and HCPCS Level II fundamentals",
        "Coding guidelines and compliance concepts",
        "Consistent accuracy and documentation skills",
      ]}
      tools={["ICD-10-CM", "CPT", "HCPCS Level II", "Encoder software", "EHR documentation"]}
    />
  ),
});
