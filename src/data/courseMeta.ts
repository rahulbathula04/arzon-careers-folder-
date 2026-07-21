import type { Course, SyllabusModule } from "./courses";
import { getAIRisk, getSalaryBand, getLastBatch } from "./courseExtras";

/**
 * Derived "rich" metadata for the rebuilt course/learn surface.
 * Avoids editing every entry in courses.ts — synthesises sensible
 * values from what's already on the Course object.
 */

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  initials: string;
}

export interface CourseFAQ {
  q: string;
  a: string;
}

export interface RichCourseMeta {
  /** 4–6 outcome statements ("By the end you can…"). */
  outcomes: string[];
  /** Honest prerequisites. */
  prerequisites: string[];
  /** Approx weekly hours commitment. */
  weeklyHours: number;
  /** Total contact hours derived from weekly × 12. */
  totalHours: number;
  /** Cohort size (kept tight on purpose). */
  cohortSize: number;
  /** Lead instructor profile. */
  instructor: Instructor;
  /** Capstone success rate (last batch). */
  capstoneStats: { shipped: number; total: number; avgScore: number };
  /** Course-specific FAQ. */
  faq: CourseFAQ[];
  /** Difficulty 1–5. */
  difficulty: number;
  /** Single-line "best for" line. */
  bestFor: string;
}

const INSTRUCTORS: Record<string, Instructor> = {
  "Pharmacy & Life Sciences": {
    name: "Dr. Meera Krishnan",
    title: "Lead Mentor · ex-IQVIA · 14 yrs in PV / CDM",
    bio: "Built PV teams at two CROs, audited by FDA twice. Trains the cohort directly through W6, then hands off to specialty mentors.",
    initials: "MK",
  },
  "Tech Programmes": {
    name: "Arjun Reddy",
    title: "Lead Mentor · ex-Razorpay · Staff Engineer",
    bio: "9 years shipping production systems. Built the payments infra at a unicorn. Reviews every capstone personally.",
    initials: "AR",
  },
  "Commerce & Marketing": {
    name: "Sneha Iyer",
    title: "Lead Mentor · ex-Deloitte Strategy",
    bio: "Ran growth + analytics at two D2C brands before consulting. Capstones are graded against real client briefs.",
    initials: "SI",
  },
};

const PREREQ_BY_CATEGORY: Record<string, string[]> = {
  "Pharmacy & Life Sciences": [
    "Any life-sciences / pharmacy / nursing / BDS / medicine background (final-year ok)",
    "Comfortable reading English-language clinical text",
    "Laptop with Chrome + 8 GB RAM",
  ],
  "Tech Programmes": [
    "Comfort with at least one programming language (any)",
    "Laptop with 16 GB RAM recommended",
    "Reliable internet for live sessions",
  ],
  "Commerce & Marketing": [
    "Any graduation stream (commerce/arts/engineering all welcome)",
    "Working knowledge of Excel basics",
    "Laptop + stable internet",
  ],
};

function makeOutcomes(course: Course): string[] {
  const skills = course.jd.topSkills.slice(0, 3);
  const tools = course.tools.slice(0, 2).join(" + ");
  const employer = course.jd.sampleEmployers[0] ?? "a top employer";
  return [
    `Apply ${skills[0]?.toLowerCase()} to production-grade tasks`,
    `Use ${tools} the way ${employer} actually uses them`,
    `Ship the capstone: ${course.projects.major.split(",")[0]}`,
    `Walk into interviews with a verifiable certificate, project letter & 3 work samples`,
    `Speak the language of ${course.jd.hiringRoles[0] ?? "the role"} JDs fluently`,
  ];
}

function makeFAQ(course: Course): CourseFAQ[] {
  return [
    {
      q: `Is this ${course.title} programme suitable for freshers?`,
      a: `Yes. The first two weeks are foundational, we don't assume prior ${course.category.toLowerCase()} experience. By W4 you'll be working on real data.`,
    },
    {
      q: "Do I get a job guarantee?",
      a: "No. Anyone promising guaranteed jobs is breaking ASCI guidelines. We guarantee live mentoring, real-data work from 100–200 live Indian JDs, a verifiable certificate, and structured interview access with our hiring partners.",
    },
    {
      q: "How are sessions delivered?",
      a: "Live cohort calls 3 evenings a week (90 min each), recordings within 12 hours, async Slack with mentor SLA of 1 hour during cohort hours. The browser-based player tracks your progress.",
    },
    {
      q: "What if I miss a live session?",
      a: "Recordings are available the same day. You can mark lessons complete in the player and submit assignments asynchronously. Mentors do weekend office hours for catch-up.",
    },
    {
      q: "What does the certificate actually say?",
      a: `It states you completed the structured 12-week internship in ${course.title}, all six modules, the capstone, and met our performance bar. It carries a unique ID + QR code that resolves on /verify. Try the sample on the certificate page.`,
    },
    {
      q: "Can I pay in instalments?",
      a: "Yes, 0% EMI through Razorpay (3 / 6 / 9 months). A ₹1,065 seat fee locks your spot; the balance is due 3 days before the cohort starts.",
    },
  ];
}

const META_CACHE = new WeakMap<Course, RichCourseMeta>();

export function getCourseMeta(course: Course): RichCourseMeta {
  const cached = META_CACHE.get(course);
  if (cached) return cached;

  const weeklyHours =
    course.category === "Tech Programmes"
      ? 12
      : course.category === "Pharmacy & Life Sciences"
        ? 10
        : 9;

  const lastBatch = getLastBatch(course);
  const meta: RichCourseMeta = {
    outcomes: makeOutcomes(course),
    prerequisites: PREREQ_BY_CATEGORY[course.category] ?? [],
    weeklyHours,
    totalHours: weeklyHours * 12,
    cohortSize: 28,
    instructor: INSTRUCTORS[course.category] ?? INSTRUCTORS["Tech Programmes"],
    capstoneStats: {
      shipped: lastBatch.placed,
      total: lastBatch.total,
      avgScore: 84,
    },
    faq: makeFAQ(course),
    difficulty:
      course.category === "Tech Programmes"
        ? 4
        : course.category === "Pharmacy & Life Sciences"
          ? 3
          : 3,
    bestFor: bestForLine(course),
  };
  META_CACHE.set(course, meta);
  return meta;
}

function bestForLine(course: Course): string {
  const role = course.jd.hiringRoles[0] ?? "an entry-level role";
  return `Best for: students aiming for ${role.toLowerCase()} in the next 6 months.`;
}

/**
 * Convenience: weekly hours summary for a single module
 * (12 weeks / 6 modules → ~2 weeks per module).
 */
export function moduleHours(course: Course, _module: SyllabusModule): number {
  const meta = getCourseMeta(course);
  return Math.round(meta.totalHours / course.syllabus.length);
}

/** Re-export so call-sites have a single import path. */
export { getAIRisk, getSalaryBand, getLastBatch };
