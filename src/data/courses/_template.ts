/**
 * COURSE TEMPLATE — copy this block into src/data/courses.ts as a new
 * entry in COURSES[]. Follow docs/role-track-playbook.md when filling
 * it in. Every field except aiRisk/salaryYear1/salaryYear3/lastBatch
 * is required.
 *
 * Naming rule:
 *   title: "Fresher {Role Title} Track — {Tool 1} + {Tool 2} + {Tool 3}"
 *   heroTagline: "Built from {N} live {Role Title} JDs. {tools/skills} the way {top 3 employers} actually hire for."
 *
 * After adding the entry, also add a matching JdProvenance entry to
 * src/data/jdProvenance.ts so the credibility components light up.
 */

import { Briefcase } from "lucide-react";
import type { Course } from "../courses";

export const COURSE_TEMPLATE: Course = {
  slug: "role-slug",
  title: "Fresher {Role Title} Track — {Tool 1} + {Tool 2} + {Tool 3}",
  roleTitle: "{Role Title}",
  seniority: "Fresher",
  jdRefreshedOn: "YYYY-MM-DD",
  category: "Pharmacy & Life Sciences",
  Icon: Briefcase,
  blurb: "One-sentence plain-English description of what this role does day-to-day.",
  heroTagline:
    "Built from {N} live {Role Title} JDs. {tools/skills} the way {Employer 1, Employer 2, Employer 3} actually hire for.",
  tools: ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"],
  jd: {
    topSkills: [
      "Skill phrase from JDs #1",
      "Skill phrase from JDs #2",
      "Skill phrase from JDs #3",
      "Skill phrase from JDs #4",
      "Skill phrase from JDs #5",
    ],
    hiringRoles: ["Variant role title #1", "Variant role title #2"],
    salary: "₹X – Y LPA",
    demand: "High",
    sampleEmployers: ["Employer 1", "Employer 2", "Employer 3", "Employer 4", "Employer 5"],
  },
  syllabus: [
    {
      weeks: "W1–2",
      title: "Foundations module title",
      topics: ["Topic A", "Topic B", "Topic C"],
      deliverable: "A real artefact (not a quiz)",
      jdSkill: "The exact JD phrase this module satisfies",
    },
    // ...repeat for 6 modules (W1–2, W3–4, ... W11–12)
  ],
  projects: {
    minor: ["Minor capstone #1", "Minor capstone #2"],
    major:
      "Major capstone = the deliverable most often named in the JD sample (e.g. 'process 50 ICSR cases', 'code 100 charts')",
  },
  certification:
    "Verified {Role Title} Internship Certificate + Project Letter from associated partner.",
};
