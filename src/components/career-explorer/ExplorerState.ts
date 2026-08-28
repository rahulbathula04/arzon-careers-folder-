export type ExplorerStep =
  | "START"
  | "DEGREE_SELECTED"
  | "INTENT_SELECTED"
  | "CAREER_MAP_READY"
  | "CAREER_SELECTED"
  | "JOB_MATCH_READY"
  | "SKILL_GAP_READY"
  | "WHATSAPP_SAVED"
  | "EXPERT_READY"
  | "BOOKING_COMPLETE";

export interface StudentProfileState {
  degree: string | null;
  intent: string | null;
  selectedCareerId: string | null;
  savedCareerIds: string[];
  comparedCareerIds: string[];
  year: string;
  location: string;
  hasExperience: string;
  name: string;
  whatsapp: string;
  email: string;
  college: string;
  jobMatchScore: number | null;
  identifiedSkillGaps: string[];
  selectedExpertCategory: string | null;
  bookedAdvisorId: string | null;
  pqaScore: number;
}

export const INITIAL_STUDENT_PROFILE: StudentProfileState = {
  degree: null,
  intent: null,
  selectedCareerId: null,
  savedCareerIds: [],
  comparedCareerIds: [],
  year: "Final Year",
  location: "Hyderabad",
  hasExperience: "No",
  name: "",
  whatsapp: "",
  email: "",
  college: "",
  jobMatchScore: null,
  identifiedSkillGaps: [],
  selectedExpertCategory: null,
  bookedAdvisorId: null,
  pqaScore: 0,
};

export const INTENT_OPTIONS = [
  {
    id: "options",
    title: "Career Options",
    description: "I don't know which healthcare careers are available to me.",
    icon: "Compass",
  },
  {
    id: "jobs",
    title: "Current Jobs",
    description: "I want to know which corporate pharma jobs I qualify for.",
    icon: "Briefcase",
  },
  {
    id: "salary",
    title: "Salary Potential",
    description: "I want to understand realistic city compensation tiers.",
    icon: "TrendingUp",
  },
  {
    id: "skills",
    title: "Employer Skills",
    description: "I want to know what tools & guidelines enterprise JDs test for.",
    icon: "Wrench",
  },
  {
    id: "choice",
    title: "Career Choice",
    description: "I'm confused between two career paths (e.g. PV vs Clinical).",
    icon: "GitCompare",
  },
  {
    id: "expert",
    title: "Expert Guidance",
    description: "I want a 1-on-1 session with a former Novartis/IQVIA specialist.",
    icon: "UserCheck",
  },
];
