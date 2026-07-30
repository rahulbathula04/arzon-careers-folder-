/**
 * Career Engine v3 - large evidence-based question bank.
 *
 * Authored questions across 6 sections. Each test session draws a deterministic
 * 40-question subset (5 profile + 14 scenario + 8 behaviour + 6 micro + 4
 * lifestyle + 3 commitment) via src/data/careerEngineSampler.ts, so each user
 * gets a fresh, non-repeating assessment.
 *
 * Trait weights, archetype list and scoring contract are unchanged.
 */

export type Stream = "MPC" | "BiPC" | "Commerce" | "Arts";

export type Trait =
  | "detail"
  | "logic"
  | "language"
  | "screen"
  | "patient"
  | "data"
  | "writing"
  | "sales"
  | "compliance"
  | "tech"
  | "lab"
  | "empathy"
  | "pressure";

export type ArchetypeId =
  | "coder"
  | "sentinel"
  | "data_storyteller"
  | "regulatory_architect"
  | "operator"
  | "ai_builder";

export type QuestionKind =
  | "profile"
  | "scenario"
  | "behaviour"
  | "micro"
  | "lifestyle"
  | "commitment";

export interface QuestionOption {
  value: string;
  label: string;
  weights?: Partial<Record<Trait, number>>;
  /** For micro-task questions only - true if this is the correct answer. */
  correct?: boolean;
  /**
   * Optional human-authored "what this answer reveals" microcopy. When
   * present, overrides the auto-derived insight built from `weights`.
   */
  reveals?: string;
}

export interface Question {
  id: string;
  kind: QuestionKind;
  prompt: string;
  helper?: string;
  scenario?: string;
  options: QuestionOption[];
  inputType?: "text" | "candidate_info";
  placeholder?: string;
  showIf?: (a: Record<string, string>) => boolean;
  /**
   * Optional stream allow-list. When set, this question is only drawn for
   * users whose `stream` answer is in the list. When omitted, the question
   * is universal and drawn for every stream.
   *
   * Used by `buildAssessment(seed, stream)` so a BBA / Commerce student
   * never sees a clinical-pharma scenario, an MPC student never sees a
   * "patient at the bedside" scenario, etc.
   */
  streams?: Stream[];
  required?: boolean;
  /**
   * Optional adaptive metadata. Both fields are non-breaking - when omitted
   * the question is treated as "medium" difficulty and "universally
   * relevant" by the adaptive ordering layer in
   * `src/data/careerEngineAdaptive.ts`. They never change which 40 questions
   * are drawn; they only re-rank the *unanswered* pool so the next question
   * shown is the most informative one for this candidate.
   */
  difficulty?: "easy" | "medium" | "hard";
  /**
   * Path slugs this question discriminates between. If a candidate is
   * already leaning hard into one of these paths the question is prioritised
   * for confirmation; if all of these paths are clearly off, it's pushed
   * down so a more relevant question surfaces first.
   */
  paths?: string[];
  /**
   * Optional "what this question measures" one-liner. When omitted, the
   * insight panel falls back to the per-kind `KIND_META.why` copy.
   */
  measures?: string;
}

const ifStream =
  (...streams: Stream[]) =>
  (a: Record<string, string>) =>
    streams.includes(a.stream as Stream);

export const QUESTIONS: Question[] = [
  // ─────────────────────────────────────────────
  // PROFILE (5) - always shown, fixed order
  // ─────────────────────────────────────────────
  {
    id: "stream",
    kind: "profile",
    prompt: "Quick start: what did you study in 11th & 12th?",
    helper: "We use this to personalise the rest of the test.",
    required: true,
    options: [
      { value: "MPC", label: "MPC (Maths, Physics, Chemistry)" },
      { value: "BiPC", label: "BiPC (Biology, Physics, Chemistry)" },
      { value: "Commerce", label: "Commerce / CEC / MEC" },
      { value: "Arts", label: "Arts / Humanities" },
    ],
  },
  {
    id: "year",
    kind: "profile",
    prompt: "Where are you in your degree right now?",
    options: [
      { value: "1", label: "1st year" },
      { value: "2", label: "2nd year" },
      { value: "3", label: "3rd year" },
      { value: "4", label: "Final year" },
      { value: "graduated", label: "Already graduated" },
    ],
  },
  {
    id: "course",
    kind: "profile",
    prompt: "Your degree?",
    options: [
      { value: "pharma", label: "B.Pharm / Pharm.D" },
      { value: "lifesci", label: "B.Sc Life Sciences / Biotech / Microbiology" },
      { value: "med", label: "BDS / BHMS / BAMS / Nursing / Physio" },
      { value: "engg", label: "B.Tech / B.E (any branch)" },
      { value: "comm", label: "B.Com / BBA / BMS" },
      { value: "agri", label: "B.Sc Agri / B.Tech Agri / Horticulture / Vet" },
      { value: "arts", label: "BA / Other" },
    ],
  },
  {
    id: "college_name",
    kind: "profile",
    prompt: "Which college or university are you currently attending or graduated from?",
    helper:
      "Type your college or university name (e.g. Osmania University, JNTUH, Andhra University, NIPER, SRM, etc.)",
    inputType: "text",
    placeholder: "e.g. St. Pauls College of Pharmacy / JNTU Hyderabad",
    options: [],
  },
  {
    id: "candidate_info",
    kind: "profile",
    prompt:
      "Enter your contact details so we can save & personalize your verified Career Fit Dossier",
    helper: "Your dossier & verified fit score will be generated for this profile.",
    inputType: "candidate_info",
    options: [],
  },
  {
    id: "city",
    kind: "profile",
    prompt: "Where do you live right now?",
    options: [
      { value: "metro", label: "Metro (Hyd / Blr / Mum / Del / Chn / Pun)" },
      { value: "tier2", label: "Tier-2 city" },
      { value: "town", label: "Smaller town / village" },
    ],
  },
  {
    id: "english_self",
    kind: "profile",
    prompt: "Honestly - how comfortable are you reading English at work-pace?",
    helper: "This is just self-rating; we'll also test it in 2 questions.",
    options: [
      { value: "fluent", label: "Fluent. I think in English", weights: { language: 2 } },
      { value: "good", label: "Good. Slow with technical text", weights: { language: 1 } },
      { value: "okay", label: "Okay. Need to re-read often" },
      { value: "weak", label: "Weak. I'd struggle", weights: { language: -2 } },
    ],
  },

  // ─────────────────────────────────────────────
  // SCENARIO (50) - forced-choice, every option plausible
  // ─────────────────────────────────────────────
  {
    id: "saturday",
    kind: "scenario",
    prompt: "It's a free Saturday. You'd genuinely rather…",
    options: [
      {
        value: "course",
        label: "Finish the online course I started",
        weights: { detail: 2, compliance: 1, screen: 1 },
      },
      { value: "movie", label: "Meet friends, watch a movie", weights: { sales: 2, empathy: 1 } },
      {
        value: "help",
        label: "Help a relative with something they're stuck on",
        weights: { patient: 3, empathy: 3 },
      },
      {
        value: "tinker",
        label: "Tinker with a side-project on my laptop",
        weights: { tech: 3, logic: 2 },
      },
    ],
  },
  {
    id: "evening_6pm",
    kind: "scenario",
    prompt: "It's 6 pm. Three things landed at once. Which do you reach for first?",
    helper: "All three are real jobs. Pick what you'd actually pick.",
    options: [
      {
        value: "doc",
        label: "Finish a 12-page report due tomorrow",
        weights: { compliance: 3, writing: 2, pressure: 2 },
      },
      {
        value: "calls",
        label: "Call back 4 anxious customers still waiting",
        weights: { patient: 3, empathy: 2, sales: 1 },
      },
      {
        value: "debug",
        label: "Debug a script that failed all afternoon",
        weights: { tech: 3, logic: 2, pressure: 1 },
      },
      {
        value: "review",
        label: "Review 30 forms for typos",
        weights: { detail: 3, compliance: 2, screen: 1 },
      },
    ],
  },
  {
    id: "team_role",
    kind: "scenario",
    prompt: "In a 5-person project, you naturally end up as…",
    options: [
      { value: "lead", label: "The one running the meeting", weights: { sales: 3, pressure: 1 } },
      {
        value: "doc",
        label: "The one writing the doc nobody else wants to",
        weights: { writing: 3, detail: 2, compliance: 1 },
      },
      {
        value: "build",
        label: "The one actually building the thing",
        weights: { tech: 2, logic: 2 },
      },
      {
        value: "qc",
        label: "The one checking the others' work",
        weights: { detail: 3, compliance: 2 },
      },
    ],
  },
  {
    id: "boring_part",
    kind: "scenario",
    prompt: "Every job has a boring part. Which boring part could you actually live with?",
    options: [
      {
        value: "forms",
        label: "Filling repetitive forms for hours",
        weights: { detail: 3, compliance: 2, screen: 2 },
      },
      {
        value: "calls",
        label: "Same 20 phone calls every morning",
        weights: { sales: 3, patient: 1, pressure: 1 },
      },
      {
        value: "code",
        label: "Staring at one buggy line of code",
        weights: { tech: 3, logic: 2, pressure: 1 },
      },
      {
        value: "specs",
        label: "Reading 80-page regulatory specs",
        weights: { compliance: 3, language: 2, writing: 1 },
      },
    ],
  },
  {
    id: "mistake_costs",
    kind: "scenario",
    prompt: "Which mistake would bother you the most if it happened on your watch?",
    options: [
      {
        value: "patient",
        label: "A patient got the wrong dose",
        weights: { empathy: 3, patient: 2, compliance: 1 },
      },
      {
        value: "audit",
        label: "A regulator flagged your submission",
        weights: { compliance: 3, pressure: 2, detail: 1 },
      },
      {
        value: "data",
        label: "A data error skewed the trial result",
        weights: { data: 3, detail: 2, logic: 1 },
      },
      {
        value: "deadline",
        label: "Your team missed a launch deadline",
        weights: { sales: 2, pressure: 2 },
      },
    ],
  },
  {
    id: "salary_vs",
    kind: "scenario",
    prompt: "Two job offers, same date. You'd pick…",
    options: [
      {
        value: "high_alone",
        label: "₹7 LPA, work alone from laptop, US night shift",
        weights: { tech: 2, screen: 2, pressure: 1 },
      },
      {
        value: "mid_team",
        label: "₹5 LPA, office team, day shift, lots of process",
        weights: { compliance: 2, sales: 1, detail: 1 },
      },
      {
        value: "low_purpose",
        label: "₹4 LPA, hospital-based, see patients daily",
        weights: { patient: 3, empathy: 2 },
      },
      {
        value: "mid_lead",
        label: "₹5.5 LPA, client-facing, frequent travel",
        weights: { sales: 3, pressure: 1 },
      },
    ],
  },
  {
    id: "feedback",
    kind: "scenario",
    prompt: "Your manager says your work has 3 errors per page. You think…",
    options: [
      {
        value: "fix",
        label: "Fair. I'll build a checklist so it doesn't repeat",
        weights: { compliance: 3, detail: 2, logic: 1 },
      },
      {
        value: "tool",
        label: "I should automate the repetitive part",
        weights: { tech: 2, logic: 2 },
      },
      {
        value: "ask",
        label: "Let me sit with someone who does it well",
        weights: { sales: 1, empathy: 1, patient: 1 },
      },
      {
        value: "push",
        label: "The volume was too high, push back on workload",
        weights: { pressure: -1, sales: 1 },
      },
    ],
  },
  {
    id: "long_doc",
    kind: "scenario",
    prompt: "A 60-page PDF lands in your inbox. Realistically, you…",
    options: [
      {
        value: "read",
        label: "Read it cover-to-cover with notes",
        weights: { language: 3, writing: 2, screen: 2, detail: 1 },
      },
      {
        value: "skim",
        label: "Skim, then deep-dive on 2 sections",
        weights: { language: 1, logic: 1 },
      },
      { value: "summary", label: "Ask AI for a summary first", weights: { tech: 2, logic: 1 } },
      {
        value: "avoid",
        label: "Ask if there's a video version",
        weights: { language: -1, screen: -1, sales: 1 },
      },
    ],
  },
  {
    id: "stranger_call",
    kind: "scenario",
    prompt: "A 10-minute phone call with a stranger feels…",
    options: [
      {
        value: "easy",
        label: "Easy. I do it without thinking",
        weights: { sales: 3, patient: 2, empathy: 1 },
      },
      {
        value: "warm",
        label: "Fine if I can prepare what to say",
        weights: { sales: 1, patient: 1 },
      },
      {
        value: "drain",
        label: "Drains me even if it goes well",
        weights: { sales: -1, screen: 1, detail: 1 },
      },
      { value: "avoid", label: "I'd rather text", weights: { sales: -2, tech: 1, screen: 1 } },
    ],
  },
  {
    id: "rules",
    kind: "scenario",
    prompt: "Your company adds 4 new SOPs this quarter. Honest reaction?",
    options: [
      { value: "good", label: "Good. Clearer is safer", weights: { compliance: 3, detail: 1 } },
      { value: "ok", label: "Fine, I'll follow them", weights: { compliance: 1 } },
      {
        value: "ugh",
        label: "More paperwork. Slows things down",
        weights: { compliance: -1, sales: 1 },
      },
      {
        value: "fight",
        label: "Half are pointless. I'd push back",
        weights: { compliance: -2, tech: 1, pressure: 1 },
      },
    ],
  },
  {
    id: "patient_story",
    kind: "scenario",
    prompt: "A patient cries while you're explaining their report. You…",
    streams: ["BiPC"],
    options: [
      {
        value: "stay",
        label: "Sit with them; the explanation can wait",
        weights: { empathy: 3, patient: 3 },
      },
      {
        value: "calm",
        label: "Hand them tissue, finish calmly, follow up",
        weights: { empathy: 2, patient: 2, pressure: 1 },
      },
      {
        value: "refer",
        label: "Refer to a counsellor - not my expertise",
        weights: { compliance: 1, empathy: 1 },
      },
      { value: "freeze", label: "Honestly, I'd freeze", weights: { patient: -2, empathy: -1 } },
    ],
  },
  {
    id: "weekend_job",
    kind: "scenario",
    prompt: "Pick the weekend gig you'd survive 6 months of:",
    options: [
      { value: "tutor", label: "Tutoring 1-on-1", weights: { patient: 2, empathy: 2, sales: 1 } },
      {
        value: "audit",
        label: "Counting inventory in a pharmacy",
        weights: { detail: 3, compliance: 2 },
      },
      { value: "shop", label: "Selling at a phone shop", weights: { sales: 3, pressure: 1 } },
      {
        value: "data",
        label: "Cleaning a 5,000-row Excel sheet",
        weights: { data: 3, screen: 2, detail: 1 },
      },
    ],
  },
  {
    id: "ai_relation",
    kind: "scenario",
    prompt: "Your honest relationship with AI tools (ChatGPT, Claude, etc.)?",
    options: [
      {
        value: "build",
        label: "I build small tools / agents with them",
        weights: { tech: 3, logic: 2 },
      },
      {
        value: "daily",
        label: "Daily - for studies and writing",
        weights: { tech: 1, language: 1 },
      },
      { value: "cheat", label: "I use it but feel it's cheating", weights: { compliance: 1 } },
      { value: "rare", label: "Rarely. I prefer my own brain", weights: { tech: -1, detail: 1 } },
    ],
  },
  {
    id: "clinic_chaos",
    kind: "scenario",
    prompt:
      "A clinic is overflowing - receptionist absent, billing broken, 3 vendors waiting. What do you do?",
    streams: ["BiPC"],
    options: [
      {
        value: "triage",
        label: "Triage: handle vendors first, then billing",
        weights: { sales: 3, pressure: 2, compliance: 1 },
      },
      {
        value: "fix",
        label: "Fix the billing system before it spreads",
        weights: { tech: 2, logic: 2, pressure: 1 },
      },
      {
        value: "patients",
        label: "Calm the patients in the waiting room",
        weights: { patient: 3, empathy: 2 },
      },
      {
        value: "leave",
        label: "Honestly, this is not my problem",
        weights: { sales: -2, pressure: -2 },
      },
    ],
  },
  {
    id: "first_hour",
    kind: "scenario",
    prompt: "First hour at a new desk job. You…",
    options: [
      {
        value: "sop",
        label: "Read the SOP folder end-to-end",
        weights: { compliance: 3, detail: 2, language: 1 },
      },
      { value: "ask", label: "Walk around and meet the team", weights: { sales: 2, empathy: 1 } },
      {
        value: "setup",
        label: "Set up tools, shortcuts, dashboards",
        weights: { tech: 2, data: 1, screen: 1 },
      },
      {
        value: "work",
        label: "Ask for the first ticket and start",
        weights: { pressure: 2, logic: 1 },
      },
    ],
  },
  {
    id: "quiet_room",
    kind: "scenario",
    prompt: "A perfectly quiet 2-hour block lands on your calendar. You'd spend it…",
    options: [
      {
        value: "review",
        label: "Reviewing 40 case files for accuracy",
        weights: { detail: 3, compliance: 1, screen: 1 },
      },
      {
        value: "model",
        label: "Building a small data model",
        weights: { data: 3, logic: 2, tech: 1 },
      },
      {
        value: "write",
        label: "Writing a clean report draft",
        weights: { writing: 3, language: 2 },
      },
      {
        value: "talk",
        label: "Calling 5 leads I've been putting off",
        weights: { sales: 3, pressure: 1 },
      },
    ],
  },
  {
    id: "messy_data",
    kind: "scenario",
    prompt: "Someone hands you a messy 3,000-row sheet and says 'find what's wrong'. You feel…",
    options: [
      {
        value: "excited",
        label: "Excited - this is fun",
        weights: { data: 3, detail: 2, logic: 1 },
      },
      { value: "ok", label: "Fine, I'll work through it", weights: { data: 1, detail: 1 } },
      {
        value: "delegate",
        label: "I'd rather brief someone else to do it",
        weights: { sales: 2, data: -1 },
      },
      { value: "no", label: "Honestly, I'd push back", weights: { data: -2, screen: -1 } },
    ],
  },
  {
    id: "vendor_pitch",
    kind: "scenario",
    prompt: "A vendor is pitching software for ₹12L/year. The team looks at you. You…",
    options: [
      {
        value: "ask",
        label: "Ask 5 hard questions before they finish",
        weights: { logic: 2, pressure: 2, sales: 1 },
      },
      {
        value: "trial",
        label: "Suggest a 30-day pilot with clear KPIs",
        weights: { compliance: 2, data: 2, logic: 1 },
      },
      { value: "build", label: "Wonder if we could just build it", weights: { tech: 3, logic: 1 } },
      {
        value: "go",
        label: "Trust it if the demo looked clean",
        weights: { sales: 1, compliance: -1 },
      },
    ],
  },
  {
    id: "spelling",
    kind: "scenario",
    prompt: "You spot a spelling error in a finalised drug-label PDF that already went out. You…",
    streams: ["BiPC"],
    options: [
      {
        value: "raise",
        label: "Raise it immediately, even if awkward",
        weights: { compliance: 3, detail: 3, pressure: 1 },
      },
      {
        value: "log",
        label: "Quietly log it for the next revision cycle",
        weights: { compliance: 1, detail: 2 },
      },
      { value: "ignore", label: "Ignore - too late now", weights: { compliance: -3, detail: -2 } },
      { value: "blame", label: "Find out who approved it", weights: { compliance: 1, sales: 1 } },
    ],
  },
  {
    id: "edge_case",
    kind: "scenario",
    prompt:
      "You find a weird edge case in trial data - 1 patient out of 800 with impossible vitals. You…",
    streams: ["BiPC", "MPC"],
    options: [
      {
        value: "investigate",
        label: "Stop and investigate before continuing",
        weights: { detail: 3, data: 2, compliance: 2 },
      },
      { value: "flag", label: "Flag in a comment, keep moving", weights: { detail: 1, data: 1 } },
      {
        value: "exclude",
        label: "Exclude as obvious data entry error",
        weights: { data: -1, compliance: -1 },
      },
      {
        value: "ask",
        label: "Bring it up in tomorrow's standup",
        weights: { sales: 1, empathy: 1 },
      },
    ],
  },
  {
    id: "deadline_slip",
    kind: "scenario",
    prompt: "Friday 5 pm. A submission is at 60% and due Monday 9 am. You…",
    options: [
      {
        value: "weekend",
        label: "Block the weekend, ship it clean",
        weights: { pressure: 3, compliance: 2, detail: 1 },
      },
      {
        value: "extend",
        label: "Negotiate a 1-day extension first",
        weights: { sales: 2, compliance: 1 },
      },
      {
        value: "team",
        label: "Pull 2 teammates in to parallelise",
        weights: { sales: 2, pressure: 2 },
      },
      { value: "panic", label: "Honestly - I'd panic", weights: { pressure: -2 } },
    ],
  },
  {
    id: "explain_it",
    kind: "scenario",
    prompt: "You have to explain a complex topic to a non-technical relative. You'd…",
    options: [
      {
        value: "story",
        label: "Tell a story they can relate to",
        weights: { empathy: 2, sales: 2, language: 1 },
      },
      { value: "draw", label: "Draw a quick diagram", weights: { logic: 2, writing: 1 } },
      {
        value: "tabs",
        label: "Send them 3 well-chosen articles",
        weights: { language: 2, writing: 2 },
      },
      {
        value: "skip",
        label: "Avoid - they won't get it anyway",
        weights: { empathy: -2, sales: -1 },
      },
    ],
  },
  {
    id: "mistake_self",
    kind: "scenario",
    prompt: "You sent the wrong file to a client at 11 pm. Realising it at 7 am, you…",
    options: [
      {
        value: "own",
        label: "Email them immediately, own it",
        weights: { compliance: 2, sales: 2, pressure: 2 },
      },
      {
        value: "boss",
        label: "Loop my manager first, then act",
        weights: { compliance: 2, detail: 1 },
      },
      {
        value: "fix",
        label: "Send the correct file with a quick note",
        weights: { sales: 2, pressure: 1 },
      },
      {
        value: "hope",
        label: "Hope they didn't open it yet",
        weights: { compliance: -3, pressure: -1 },
      },
    ],
  },
  {
    id: "shadow_doc",
    kind: "scenario",
    prompt: "On a shadow day, the most exciting room is…",
    streams: ["BiPC"],
    options: [
      {
        value: "icu",
        label: "ICU - patients, monitors, urgency",
        weights: { patient: 3, empathy: 2, pressure: 2 },
      },
      { value: "lab", label: "The clinical lab - assays running", weights: { lab: 3, detail: 2 } },
      {
        value: "room",
        label: "The data room - dashboards on screens",
        weights: { data: 3, screen: 2, logic: 1 },
      },
      {
        value: "office",
        label: "The compliance office - files, audits",
        weights: { compliance: 3, detail: 2 },
      },
    ],
  },
  {
    id: "side_hustle",
    kind: "scenario",
    prompt: "If you had to start a side project tomorrow, you'd…",
    options: [
      {
        value: "app",
        label: "Build a small app that solves something",
        weights: { tech: 3, logic: 2 },
      },
      { value: "blog", label: "Start a blog or newsletter", weights: { writing: 3, language: 2 } },
      { value: "tutor", label: "Tutor school kids", weights: { patient: 2, empathy: 2, sales: 1 } },
      { value: "shop", label: "Resell something online", weights: { sales: 3, pressure: 1 } },
    ],
  },
  {
    id: "messy_meeting",
    kind: "scenario",
    prompt: "A meeting is going in circles after 30 min. You…",
    options: [
      {
        value: "summarise",
        label: "Summarise the 3 decisions we need to make",
        weights: { logic: 2, sales: 2, writing: 1 },
      },
      { value: "wait", label: "Stay quiet, take notes", weights: { detail: 2, writing: 1 } },
      { value: "leave", label: "Excuse myself politely", weights: { compliance: -1, sales: 1 } },
      {
        value: "challenge",
        label: "Call out the one assumption everyone's made",
        weights: { logic: 3, pressure: 2 },
      },
    ],
  },
  {
    id: "perfection",
    kind: "scenario",
    prompt: "Your honest standard for 'good enough' work is…",
    options: [
      {
        value: "perfect",
        label: "Zero errors, even if it takes longer",
        weights: { detail: 3, compliance: 2, pressure: 1 },
      },
      {
        value: "ship",
        label: "Ship clean, fix in v2",
        weights: { tech: 2, pressure: 1, sales: 1 },
      },
      { value: "agreed", label: "Whatever the spec says, no more", weights: { compliance: 2 } },
      { value: "vibe", label: "Looks fine to me", weights: { detail: -2, compliance: -1 } },
    ],
  },
  {
    id: "morning",
    kind: "scenario",
    prompt: "Your most productive 2 hours of the day are typically…",
    options: [
      {
        value: "early",
        label: "Early morning, before anyone messages",
        weights: { detail: 2, screen: 1 },
      },
      { value: "midday", label: "Late morning to lunch", weights: { sales: 1, logic: 1 } },
      { value: "late", label: "Evening, when it's quiet", weights: { tech: 2, screen: 2 } },
      { value: "night", label: "Late night", weights: { tech: 2, screen: 3, pressure: 1 } },
    ],
  },
  {
    id: "feedback_give",
    kind: "scenario",
    prompt: "A junior asks for feedback on their report. You…",
    options: [
      {
        value: "line",
        label: "Go through line-by-line with them",
        weights: { detail: 3, empathy: 1, writing: 1 },
      },
      {
        value: "frame",
        label: "Give them a framework to self-edit",
        weights: { logic: 2, writing: 2, sales: 1 },
      },
      {
        value: "rewrite",
        label: "Just rewrite the worst paragraph as example",
        weights: { writing: 2, detail: 1 },
      },
      {
        value: "polite",
        label: "Say it's good, don't want to discourage",
        weights: { detail: -1, empathy: 1, compliance: -1 },
      },
    ],
  },
  {
    id: "tool_pick",
    kind: "scenario",
    prompt: "Given a choice of tools to learn deeply, you'd pick…",
    options: [
      {
        value: "excel",
        label: "Excel + SQL until you're dangerous",
        weights: { data: 3, logic: 2 },
      },
      { value: "code", label: "Python + a few libraries", weights: { tech: 3, logic: 2 } },
      {
        value: "med",
        label: "ICD-10 / SNOMED coding standards",
        weights: { compliance: 3, detail: 2, language: 1 },
      },
      { value: "crm", label: "A CRM and a great pitch deck", weights: { sales: 3, pressure: 1 } },
    ],
  },
  {
    id: "criticism",
    kind: "scenario",
    prompt: "Hardest criticism for you to hear is…",
    options: [
      { value: "slow", label: "'You're too slow'", weights: { pressure: 1 } },
      { value: "sloppy", label: "'Your work is sloppy'", weights: { detail: 2, compliance: 1 } },
      { value: "cold", label: "'You're cold with people'", weights: { empathy: 2, patient: 1 } },
      { value: "lost", label: "'You missed the bigger picture'", weights: { logic: 2, data: 1 } },
    ],
  },
  {
    id: "compliance_grey",
    kind: "scenario",
    prompt: "A teammate suggests skipping a 'pointless' compliance step to save 2 days. You…",
    options: [
      { value: "no", label: "Refuse - process is process", weights: { compliance: 3, detail: 1 } },
      {
        value: "escalate",
        label: "Escalate to the QA lead, not act alone",
        weights: { compliance: 2, sales: 1 },
      },
      { value: "ok", label: "Agree if the risk is low", weights: { compliance: -2, pressure: 1 } },
      {
        value: "fix",
        label: "Push to fix the broken process instead",
        weights: { logic: 2, sales: 1, tech: 1 },
      },
    ],
  },
  {
    id: "story_pull",
    kind: "scenario",
    prompt: "Which dataset would you pull first to understand a clinic's churn?",
    streams: ["BiPC"],
    options: [
      {
        value: "appts",
        label: "Appointment cancellations by reason",
        weights: { data: 3, logic: 2 },
      },
      {
        value: "nps",
        label: "Patient feedback (NPS) scores",
        weights: { empathy: 2, patient: 2, data: 1 },
      },
      {
        value: "billing",
        label: "Billing disputes raised in last 90 days",
        weights: { compliance: 2, data: 2 },
      },
      { value: "staff", label: "Staff attrition by role", weights: { sales: 2, data: 1 } },
    ],
  },
  {
    id: "writing_style",
    kind: "scenario",
    prompt: "Your writing style at its best is…",
    options: [
      {
        value: "tight",
        label: "Tight, factual, no fluff",
        weights: { writing: 3, compliance: 2, detail: 1 },
      },
      {
        value: "warm",
        label: "Warm, conversational, easy to read",
        weights: { writing: 2, empathy: 2, sales: 1 },
      },
      { value: "data", label: "Numbers-led with charts", weights: { data: 3, logic: 1 } },
      {
        value: "rare",
        label: "I avoid writing when I can",
        weights: { writing: -2, language: -1 },
      },
    ],
  },
  {
    id: "presentation",
    kind: "scenario",
    prompt: "You have to present to 30 people next week. Real reaction?",
    options: [
      { value: "love", label: "I love it, I'll over-prepare", weights: { sales: 3, pressure: 2 } },
      { value: "ok", label: "Fine if I rehearse twice", weights: { sales: 1, pressure: 1 } },
      { value: "dread", label: "I dread it but I'll do it", weights: { pressure: 1 } },
      { value: "no", label: "I'd ask someone else to present", weights: { sales: -2 } },
    ],
  },
  {
    id: "follow_up",
    kind: "scenario",
    prompt: "A WhatsApp lead has gone cold for 5 days. You…",
    options: [
      { value: "call", label: "Call them - texts get lost", weights: { sales: 3, patient: 1 } },
      { value: "voice", label: "Send a voice note", weights: { sales: 2, empathy: 1 } },
      { value: "drop", label: "Drop them, move to next lead", weights: { pressure: 1 } },
      {
        value: "value",
        label: "Send a useful resource, no ask",
        weights: { sales: 2, empathy: 2, writing: 1 },
      },
    ],
  },
  {
    id: "spec_change",
    kind: "scenario",
    prompt: "Day 4 of a 5-day task, the spec changes by 40%. You…",
    options: [
      {
        value: "redo",
        label: "Redo it cleanly within deadline",
        weights: { pressure: 3, compliance: 2 },
      },
      {
        value: "note",
        label: "Document the impact and reset the timeline",
        weights: { compliance: 3, writing: 2 },
      },
      {
        value: "vent",
        label: "Vent to the team first, then start",
        weights: { sales: 1, empathy: 1 },
      },
      {
        value: "salvage",
        label: "Salvage what overlaps, ship a hybrid",
        weights: { logic: 2, tech: 1, pressure: 1 },
      },
    ],
  },
  {
    id: "data_weird",
    kind: "scenario",
    prompt: "A chart shows revenue 'up 40%' but you suspect a unit error. You…",
    options: [
      {
        value: "verify",
        label: "Pull the raw query before celebrating",
        weights: { data: 3, detail: 2, logic: 1 },
      },
      {
        value: "ship",
        label: "Ship the chart, flag the suspicion",
        weights: { data: 1, sales: 1 },
      },
      { value: "leave", label: "It's not my chart", weights: { data: -2, compliance: -1 } },
      {
        value: "rebuild",
        label: "Rebuild the dashboard from scratch",
        weights: { data: 2, tech: 2, detail: 1 },
      },
    ],
  },
  {
    id: "code_pair",
    kind: "scenario",
    prompt: "Pair-programming with someone faster than you. Honest feeling?",
    options: [
      {
        value: "learn",
        label: "Great - I'll learn 5 things",
        weights: { tech: 2, empathy: 1, logic: 1 },
      },
      { value: "ok", label: "Fine, I'll keep up", weights: { tech: 1, pressure: 1 } },
      { value: "self", label: "I'd rather work alone", weights: { tech: 1, screen: 1, sales: -1 } },
      { value: "out", label: "I'd avoid coding altogether", weights: { tech: -3 } },
    ],
  },
  {
    id: "values",
    kind: "scenario",
    prompt: "Pick the value that resonates most with your ideal job:",
    options: [
      {
        value: "impact",
        label: "Visible impact on real patients",
        weights: { patient: 3, empathy: 2 },
      },
      {
        value: "craft",
        label: "Mastering a craft over years",
        weights: { detail: 2, tech: 2, compliance: 1 },
      },
      {
        value: "freedom",
        label: "Freedom - flexible hours, remote",
        weights: { tech: 1, screen: 2, sales: -1 },
      },
      { value: "money", label: "High earning potential fast", weights: { sales: 2, pressure: 2 } },
    ],
  },
  {
    id: "sales_role",
    kind: "scenario",
    prompt: "A 'sales' role pays 30% more than the others. You…",
    options: [
      { value: "love", label: "I'd take it - I like talking", weights: { sales: 3, pressure: 1 } },
      {
        value: "trial",
        label: "Try for 6 months, see if I survive",
        weights: { sales: 1, pressure: 1 },
      },
      { value: "no", label: "No - money isn't worth the energy drain", weights: { sales: -2 } },
      {
        value: "back",
        label: "Only a back-office role would suit me",
        weights: { detail: 2, screen: 1, sales: -1 },
      },
    ],
  },
  {
    id: "first_quit",
    kind: "scenario",
    prompt: "What's most likely to make you quit a job in year 1?",
    options: [
      {
        value: "boring",
        label: "Boring repetitive work",
        weights: { tech: 1, sales: 1, detail: -1 },
      },
      { value: "boss", label: "A toxic manager", weights: { empathy: 2 } },
      {
        value: "ethics",
        label: "Being asked to cut compliance corners",
        weights: { compliance: 3 },
      },
      { value: "money", label: "Underpaid for the workload", weights: { sales: 1, pressure: -1 } },
    ],
  },
  {
    id: "research",
    kind: "scenario",
    prompt: "Reading a new research paper, you naturally focus on…",
    options: [
      {
        value: "method",
        label: "The methodology section",
        weights: { detail: 3, compliance: 2, logic: 1 },
      },
      { value: "results", label: "The results tables", weights: { data: 3, logic: 2 } },
      { value: "intro", label: "The intro to get the story", weights: { writing: 2, language: 2 } },
      { value: "skip", label: "I'd ask AI to summarise", weights: { tech: 2, language: -1 } },
    ],
  },
  {
    id: "drug_stockout",
    kind: "scenario",
    prompt: "A pharmacy stockout is reported. Your first instinct?",
    streams: ["BiPC"],
    options: [
      {
        value: "supplier",
        label: "Call the supplier and chase",
        weights: { sales: 3, pressure: 2 },
      },
      {
        value: "audit",
        label: "Audit how it happened to prevent repeat",
        weights: { compliance: 3, detail: 2 },
      },
      {
        value: "patient",
        label: "Find substitute meds for waiting patients",
        weights: { patient: 3, empathy: 2 },
      },
      {
        value: "system",
        label: "Build a re-order alert in the system",
        weights: { tech: 3, data: 2 },
      },
    ],
  },
  {
    id: "audit_visit",
    kind: "scenario",
    prompt: "An auditor is visiting in 3 days. The right move is…",
    options: [
      {
        value: "prep",
        label: "Spend 3 days perfecting the document binder",
        weights: { compliance: 3, detail: 3 },
      },
      {
        value: "honest",
        label: "Be honest about gaps; show the fix plan",
        weights: { compliance: 2, sales: 1, empathy: 1 },
      },
      {
        value: "polish",
        label: "Polish only what they're likely to check",
        weights: { compliance: 1, logic: 1 },
      },
      { value: "hide", label: "Hide the messiest folders", weights: { compliance: -3 } },
    ],
  },
  {
    id: "model_fail",
    kind: "scenario",
    prompt: "An AI model you trained gives biased outputs in testing. You…",
    options: [
      {
        value: "stop",
        label: "Don't ship until it's fixed",
        weights: { compliance: 3, tech: 2, empathy: 2 },
      },
      {
        value: "guard",
        label: "Ship with safety guardrails and warnings",
        weights: { tech: 2, compliance: 1, logic: 1 },
      },
      {
        value: "blame",
        label: "Blame the dataset and move on",
        weights: { tech: -1, compliance: -2 },
      },
      {
        value: "retrain",
        label: "Spend 2 weeks rebalancing the data",
        weights: { detail: 3, data: 2, tech: 2 },
      },
    ],
  },
  {
    id: "patient_lie",
    kind: "scenario",
    prompt: "A patient is clearly hiding a symptom from you. You…",
    streams: ["BiPC"],
    options: [
      {
        value: "ask",
        label: "Ask gentle, indirect questions",
        weights: { empathy: 3, patient: 2, sales: 1 },
      },
      {
        value: "data",
        label: "Order tests that would catch it",
        weights: { detail: 2, compliance: 2, patient: 1 },
      },
      {
        value: "note",
        label: "Note your concern in the file, move on",
        weights: { compliance: 1, writing: 1 },
      },
      { value: "skip", label: "It's their choice - I respect it", weights: { patient: -1 } },
    ],
  },
  {
    id: "owner_mind",
    kind: "scenario",
    prompt: "You see a problem outside your job description. You…",
    options: [
      { value: "fix", label: "Fix it quietly", weights: { tech: 1, compliance: 1, pressure: 1 } },
      { value: "flag", label: "Flag it to the right person", weights: { sales: 1, compliance: 2 } },
      { value: "own", label: "Volunteer to lead the fix", weights: { sales: 3, pressure: 2 } },
      { value: "leave", label: "Leave it - not my circus", weights: { sales: -1, compliance: -1 } },
    ],
  },
  {
    id: "metric",
    kind: "scenario",
    prompt: "If you had to pick ONE number to report to your CEO weekly, you'd pick…",
    options: [
      { value: "rev", label: "Revenue per cohort", weights: { data: 2, sales: 2 } },
      {
        value: "errors",
        label: "Error rate per 1000 records",
        weights: { detail: 3, compliance: 2 },
      },
      { value: "nps", label: "Patient NPS", weights: { empathy: 3, patient: 2 } },
      { value: "ttr", label: "Time to resolution", weights: { logic: 2, pressure: 2 } },
    ],
  },
  {
    id: "office_layout",
    kind: "scenario",
    prompt: "Your dream desk neighbour is…",
    options: [
      {
        value: "coder",
        label: "A quiet engineer with headphones",
        weights: { tech: 2, screen: 1 },
      },
      { value: "doctor", label: "A doctor between rounds", weights: { patient: 2, empathy: 2 } },
      {
        value: "analyst",
        label: "A data analyst muttering at dashboards",
        weights: { data: 3, logic: 1 },
      },
      {
        value: "sales",
        label: "A sales lead on back-to-back calls",
        weights: { sales: 3, pressure: 1 },
      },
    ],
  },

  // Stream-specific scenarios so Commerce / Arts / MPC students get
  // questions that map to roles they actually consider.
  {
    id: "client_pitch",
    kind: "scenario",
    prompt: "You're 5 minutes into a client pitch and they cut you off with a hard objection. You…",
    streams: ["Commerce", "Arts"],
    options: [
      {
        value: "agree",
        label: "Acknowledge it, then reframe with a 1-line answer",
        weights: { sales: 3, empathy: 2, pressure: 2 },
      },
      {
        value: "data",
        label: "Pull the slide with the numbers that addresses it",
        weights: { data: 2, sales: 2, logic: 1 },
      },
      {
        value: "story",
        label: "Tell a 30-sec story of a similar client we won",
        weights: { sales: 2, writing: 2, empathy: 1 },
      },
      {
        value: "stall",
        label: "Park it, promise to circle back over email",
        weights: { sales: -1, compliance: 1 },
      },
    ],
  },
  {
    id: "month_close",
    kind: "scenario",
    prompt: "It's month-end close. Three of your reconciliations don't tie out by ₹4,000. You…",
    streams: ["Commerce"],
    options: [
      {
        value: "trace",
        label: "Trace every entry until the gap is found",
        weights: { detail: 3, compliance: 2, data: 1 },
      },
      {
        value: "pivot",
        label: "Build a pivot to spot the outlier fast",
        weights: { data: 3, logic: 2, tech: 1 },
      },
      {
        value: "flag",
        label: "Flag, post a provisional, fix in next cycle",
        weights: { compliance: 1, pressure: 1 },
      },
      { value: "ignore", label: "₹4k is small, leave it", weights: { detail: -2, compliance: -2 } },
    ],
  },
  {
    id: "ad_budget",
    kind: "scenario",
    prompt:
      "Your ₹2L Instagram ad spend converted only 8 leads this week. The boss wants the plan by 9am. You…",
    streams: ["Commerce", "Arts"],
    options: [
      {
        value: "diag",
        label: "Cut the worst-performing ad set, double the best",
        weights: { data: 3, logic: 2, sales: 1 },
      },
      {
        value: "hook",
        label: "Rewrite the hook, test 3 new creatives",
        weights: { writing: 2, sales: 2 },
      },
      {
        value: "chan",
        label: "Move 50% of budget to WhatsApp ads",
        weights: { sales: 2, tech: 1 },
      },
      {
        value: "wait",
        label: "Hold steady, one week is not enough signal",
        weights: { logic: 1, compliance: 1 },
      },
    ],
  },
  {
    id: "design_brief",
    kind: "scenario",
    prompt: "A client wants 'a fresh, modern look'. That's the entire brief. You…",
    streams: ["Arts", "Commerce"],
    options: [
      {
        value: "discover",
        label: "Run a 30-min discovery call before opening Figma",
        weights: { empathy: 3, sales: 2, language: 1 },
      },
      {
        value: "moodboard",
        label: "Send 3 moodboards, ask them to pick a direction",
        weights: { writing: 2, sales: 2, detail: 1 },
      },
      {
        value: "examples",
        label: "Ask for 3 brands they wish they looked like",
        weights: { logic: 2, sales: 1, empathy: 1 },
      },
      {
        value: "guess",
        label: "Just send v1 - they'll know what they want when they see it",
        weights: { compliance: -2 },
      },
    ],
  },
  {
    id: "field_visit",
    kind: "scenario",
    prompt:
      "You're inspecting a 5-acre farm and yields are 30% below the district average. First move?",
    streams: ["BiPC"],
    options: [
      {
        value: "soil",
        label: "Pull a soil sample, check pH and nutrients",
        weights: { lab: 3, detail: 2, data: 1 },
      },
      {
        value: "talk",
        label: "Sit with the farmer, walk the field together",
        weights: { empathy: 3, patient: 2, sales: 1 },
      },
      {
        value: "data",
        label: "Compare last 3 seasons of inputs vs yield",
        weights: { data: 3, logic: 2, detail: 1 },
      },
      {
        value: "buy",
        label: "Recommend a different seed variety on the spot",
        weights: { sales: 2, compliance: -1 },
      },
    ],
  },
  {
    id: "engg_failure",
    kind: "scenario",
    prompt:
      "Production line stops. The root-cause is unclear. The plant manager wants you to talk in 10 min. You…",
    streams: ["MPC"],
    options: [
      {
        value: "trace",
        label: "Trace the last 3 sensor logs before the halt",
        weights: { tech: 3, logic: 2, data: 1 },
      },
      {
        value: "5why",
        label: "Run a quick 5-Whys with the line operator",
        weights: { empathy: 2, logic: 2, compliance: 1 },
      },
      {
        value: "history",
        label: "Pull the last 30 days of similar incidents",
        weights: { data: 3, detail: 2 },
      },
      {
        value: "guess",
        label: "Restart and watch what fails first",
        weights: { tech: 1, compliance: -2 },
      },
    ],
  },

  // Stream-specific micros so non-pharma students get skill-checks they
  // actually find relevant. Commerce gets accounting / marketing math,
  // Arts gets language / brief work, MPC gets engineering math.
  {
    id: "micro_business_growth",
    kind: "micro",
    prompt: "A shop grows from ₹4L → ₹5L monthly revenue. That's…",
    streams: ["Commerce", "Arts"],
    options: [
      { value: "25", label: "+25%", correct: true, weights: { data: 3, logic: 2, sales: 1 } },
      { value: "20", label: "+20%", weights: { logic: -1 } },
      { value: "100", label: "+1L %", weights: { logic: -2 } },
      { value: "10", label: "+10%", weights: { logic: -1 } },
    ],
  },
  {
    id: "micro_break_even",
    kind: "micro",
    prompt: "Fixed cost ₹60,000/month. You earn ₹120 profit per unit sold. Break-even units?",
    streams: ["Commerce"],
    options: [
      {
        value: "500",
        label: "500 units",
        correct: true,
        weights: { data: 3, logic: 3, detail: 1 },
      },
      { value: "600", label: "600 units", weights: { logic: -1 } },
      { value: "50", label: "50 units", weights: { logic: -2 } },
      { value: "5000", label: "5,000 units", weights: { logic: -1 } },
    ],
  },
  {
    id: "micro_invoice",
    kind: "micro",
    prompt: "Invoice total ₹11,800 includes 18% tax. The base (pre-tax) amount is closest to…",
    streams: ["Commerce"],
    options: [
      { value: "10k", label: "₹10,000", correct: true, weights: { data: 3, detail: 2, logic: 2 } },
      { value: "9676", label: "₹9,676", weights: { logic: -1 } },
      { value: "11800", label: "₹11,800", weights: { logic: -2 } },
      { value: "10800", label: "₹10,800", weights: { logic: -1 } },
    ],
  },
  {
    id: "micro_brief_clean",
    kind: "micro",
    prompt: "Pick the cleanest 1-line brand line:",
    streams: ["Arts", "Commerce"],
    options: [
      {
        value: "a",
        label: "“Refunds in 24 hours, no questions.”",
        correct: true,
        weights: { writing: 3, language: 2, sales: 1 },
      },
      {
        value: "b",
        label: "“We are committed to providing refund processing efficiently within timeframes.”",
        weights: { writing: -1, language: -1 },
      },
      { value: "c", label: "“Refund timeline as per terms.”", weights: { writing: -1 } },
      { value: "d", label: "“Money back maybe.”", weights: { language: -2 } },
    ],
  },
  {
    id: "micro_engg_unit",
    kind: "micro",
    prompt: "A motor draws 2.5 A at 230 V. Power consumed (W) is closest to…",
    streams: ["MPC"],
    options: [
      { value: "575", label: "575 W", correct: true, weights: { logic: 3, data: 2, detail: 1 } },
      { value: "92", label: "92 W", weights: { logic: -1 } },
      { value: "230", label: "230 W", weights: { logic: -1 } },
      { value: "1150", label: "1150 W", weights: { logic: -1 } },
    ],
  },

  // Stream-specific behaviour questions
  {
    id: "field_sales_done",
    kind: "behaviour",
    prompt:
      "Have you ever sold something to a stranger face-to-face (event stall, college fest, family business)?",
    streams: ["Commerce", "Arts"],
    options: [
      {
        value: "many",
        label: "Many times - I'm comfortable",
        weights: { sales: 3, pressure: 2, empathy: 1 },
      },
      { value: "few", label: "A few times", weights: { sales: 1 } },
      { value: "tried", label: "Once, hated it", weights: { sales: -1 } },
      { value: "no", label: "Never tried", weights: { sales: -1 } },
    ],
  },
  {
    id: "build_done",
    kind: "behaviour",
    prompt: "Have you ever built or fixed something physical - circuit, model, project hardware?",
    streams: ["MPC"],
    options: [
      {
        value: "many",
        label: "Yes, many - and I enjoyed it",
        weights: { tech: 3, lab: 2, detail: 1, logic: 1 },
      },
      { value: "some", label: "A few class projects", weights: { tech: 1, lab: 1 } },
      { value: "rare", label: "Bare minimum", weights: { tech: -1 } },
      { value: "no", label: "I'd rather not", weights: { tech: -2 } },
    ],
  },

  // ─────────────────────────────────────────────
  // BEHAVIOUR (35) - past-evidence questions
  // ─────────────────────────────────────────────
  {
    id: "read_long",
    kind: "behaviour",
    prompt:
      "In the LAST 6 months, how often did you read something longer than 5 pages all the way through?",
    helper: "Textbook chapter, article, manual - not social media.",
    options: [
      { value: "weekly", label: "Weekly or more", weights: { language: 3, screen: 2, detail: 1 } },
      { value: "monthly", label: "A few times", weights: { language: 1, screen: 1 } },
      { value: "rare", label: "Once or twice", weights: { language: -1 } },
      { value: "no", label: "Honestly - no", weights: { language: -2, screen: -1 } },
    ],
  },
  {
    id: "wrote_long",
    kind: "behaviour",
    prompt: "Last time you wrote something over 500 words in English?",
    options: [
      { value: "month", label: "In the last month", weights: { writing: 3, language: 2 } },
      { value: "term", label: "This term", weights: { writing: 1, language: 1 } },
      { value: "year", label: "Over a year ago", weights: { writing: -1 } },
      { value: "never", label: "Can't remember", weights: { writing: -2, language: -1 } },
    ],
  },
  {
    id: "built_anything",
    kind: "behaviour",
    prompt: "Have you ever built or shipped something on a computer?",
    helper: "Website, app, script, even a working Excel macro.",
    options: [
      {
        value: "shipped",
        label: "Yes, others used it",
        weights: { tech: 4, logic: 2, pressure: 1 },
      },
      { value: "finished", label: "Yes, finished but for myself", weights: { tech: 3, logic: 1 } },
      { value: "tried", label: "Started, didn't finish", weights: { tech: 1 } },
      { value: "no", label: "Never tried", weights: { tech: -1 } },
    ],
  },
  {
    id: "led_anything",
    kind: "behaviour",
    prompt: "Have you ever organised something for 10+ people?",
    helper: "College fest, fundraiser, sports team, family event.",
    options: [
      { value: "many", label: "Many times", weights: { sales: 3, pressure: 2 } },
      { value: "once", label: "Once or twice", weights: { sales: 1, pressure: 1 } },
      { value: "no", label: "No", weights: { sales: -1 } },
    ],
  },
  {
    id: "internship",
    kind: "behaviour",
    prompt: "Internships or part-time work so far?",
    options: [
      {
        value: "paid",
        label: "Yes - paid, in healthcare/pharma",
        weights: { compliance: 2, detail: 1, pressure: 1 },
      },
      { value: "paid_other", label: "Yes - paid, other field", weights: { sales: 1, pressure: 1 } },
      { value: "unpaid", label: "Yes - unpaid / volunteer", weights: { empathy: 1, patient: 1 } },
      { value: "no", label: "Not yet", weights: {} },
    ],
  },
  {
    id: "lab_done",
    kind: "behaviour",
    prompt: "Hours per week in an actual wet lab in your degree so far?",
    showIf: ifStream("BiPC", "MPC"),
    options: [
      { value: "many", label: "6+ hours, I enjoy it", weights: { lab: 3, detail: 1 } },
      { value: "some", label: "Some, it's okay", weights: { lab: 1 } },
      { value: "min", label: "Bare minimum", weights: { lab: -1 } },
      { value: "hate", label: "I avoid lab whenever I can", weights: { lab: -2 } },
    ],
  },
  {
    id: "data_done",
    kind: "behaviour",
    prompt: "Comfort with Excel / Google Sheets, honestly?",
    options: [
      {
        value: "vlookup",
        label: "Pivot tables, vlookup, formulas",
        weights: { data: 3, logic: 2 },
      },
      { value: "basic", label: "Basic formulas (sum, average)", weights: { data: 1 } },
      { value: "open", label: "I can open and type", weights: { data: -1 } },
      { value: "no", label: "I avoid spreadsheets", weights: { data: -2 } },
    ],
  },
  {
    id: "screen_today",
    kind: "behaviour",
    prompt: "Average non-entertainment screen time per day?",
    options: [
      { value: "8", label: "8+ hours, fine with it", weights: { screen: 3, detail: 1 } },
      { value: "5", label: "4–7 hours", weights: { screen: 2 } },
      { value: "2", label: "1–3 hours", weights: { screen: 0 } },
      { value: "1", label: "Under an hour", weights: { screen: -2, patient: 1 } },
    ],
  },
  {
    id: "code_run",
    kind: "behaviour",
    prompt: "Have you ever written code that ran end-to-end (any language)?",
    options: [
      { value: "many", label: "Many small programs", weights: { tech: 3, logic: 2 } },
      { value: "few", label: "A few class assignments", weights: { tech: 1, logic: 1 } },
      { value: "tried", label: "Tried, got stuck on errors", weights: { tech: 0, pressure: -1 } },
      { value: "no", label: "Never", weights: { tech: -2 } },
    ],
  },
  {
    id: "patient_real",
    kind: "behaviour",
    prompt: "Have you spent time with sick or elderly people, beyond brief visits?",
    streams: ["BiPC"],
    options: [
      {
        value: "month",
        label: "Weeks/months as primary support",
        weights: { patient: 3, empathy: 3, pressure: 1 },
      },
      { value: "some", label: "A few days here and there", weights: { patient: 1, empathy: 1 } },
      { value: "rare", label: "Only during a single illness", weights: { empathy: 1 } },
      { value: "no", label: "Not really", weights: { patient: -1 } },
    ],
  },
  {
    id: "public_speak",
    kind: "behaviour",
    prompt: "Last time you spoke publicly to 20+ people?",
    options: [
      { value: "month", label: "This month", weights: { sales: 3, pressure: 2 } },
      { value: "year", label: "This year", weights: { sales: 2, pressure: 1 } },
      { value: "old", label: "Years ago", weights: { sales: 0 } },
      { value: "never", label: "Never", weights: { sales: -2 } },
    ],
  },
  {
    id: "english_med",
    kind: "behaviour",
    prompt: "Comfort reading dense English (clinical notes, contracts, manuals)?",
    options: [
      {
        value: "easy",
        label: "Easy - I do it weekly",
        weights: { language: 3, compliance: 1, screen: 1 },
      },
      { value: "ok", label: "Slow but I get through", weights: { language: 1 } },
      { value: "tools", label: "Need translator/dictionary", weights: { language: -1 } },
      { value: "no", label: "Avoid it", weights: { language: -3 } },
    ],
  },
  {
    id: "deadline_history",
    kind: "behaviour",
    prompt: "When did you last meet a hard external deadline (exam, submission)?",
    options: [
      {
        value: "always",
        label: "I never miss them",
        weights: { compliance: 3, pressure: 2, detail: 1 },
      },
      { value: "mostly", label: "Mostly on time", weights: { compliance: 1, pressure: 1 } },
      { value: "fifty", label: "About half the time", weights: { compliance: -1 } },
      { value: "miss", label: "Often miss", weights: { compliance: -2, pressure: -1 } },
    ],
  },
  {
    id: "side_project",
    kind: "behaviour",
    prompt: "Have you ever taught yourself a skill outside class?",
    options: [
      { value: "yes", label: "Yes, multiple", weights: { tech: 1, logic: 1, pressure: 1 } },
      { value: "one", label: "One serious one", weights: { detail: 1 } },
      { value: "tried", label: "Started but stopped", weights: {} },
      { value: "no", label: "No", weights: { tech: -1 } },
    ],
  },
  {
    id: "feedback_take",
    kind: "behaviour",
    prompt: "When was the last time you actively asked for honest feedback?",
    options: [
      {
        value: "month",
        label: "In the last month",
        weights: { empathy: 1, sales: 1, compliance: 1 },
      },
      { value: "term", label: "This term", weights: {} },
      { value: "year", label: "Over a year ago", weights: { compliance: -1 } },
      { value: "never", label: "I avoid feedback", weights: { empathy: -1, compliance: -1 } },
    ],
  },
  {
    id: "doc_proof",
    kind: "behaviour",
    prompt: "Have you proofread anything formal (paper, contract) for someone?",
    options: [
      {
        value: "often",
        label: "Often - friends ask me",
        weights: { detail: 3, language: 2, writing: 2 },
      },
      { value: "few", label: "A few times", weights: { detail: 1, language: 1 } },
      { value: "no", label: "No", weights: {} },
      { value: "bad", label: "I miss errors myself", weights: { detail: -2 } },
    ],
  },
  {
    id: "team_conflict",
    kind: "behaviour",
    prompt: "Last time a teammate frustrated you, you…",
    options: [
      { value: "talk", label: "Talked it out directly", weights: { sales: 2, empathy: 2 } },
      { value: "vent", label: "Vented to a friend, moved on", weights: { empathy: 1 } },
      {
        value: "carry",
        label: "Carried the work to avoid drama",
        weights: { pressure: 1, compliance: 1 },
      },
      { value: "exit", label: "Withdrew from the project", weights: { sales: -1, pressure: -1 } },
    ],
  },
  {
    id: "money_track",
    kind: "behaviour",
    prompt: "Do you track your own money - income, spend, savings?",
    options: [
      {
        value: "sheet",
        label: "Yes, in a sheet/app",
        weights: { data: 2, detail: 2, compliance: 1 },
      },
      { value: "head", label: "Mentally, roughly", weights: { logic: 1 } },
      { value: "rare", label: "Only when I'm broke", weights: { data: -1 } },
      { value: "no", label: "No", weights: { data: -2, detail: -1 } },
    ],
  },
  {
    id: "shadow",
    kind: "behaviour",
    prompt: "Have you shadowed a working professional in any field?",
    options: [
      { value: "many", label: "Multiple, different fields", weights: { empathy: 1, sales: 1 } },
      { value: "one", label: "One, briefly", weights: {} },
      { value: "no", label: "No", weights: {} },
    ],
  },
  {
    id: "exam_stress",
    kind: "behaviour",
    prompt: "Honest pattern under exam stress?",
    options: [
      { value: "calm", label: "Calm, methodical", weights: { pressure: 3, detail: 1 } },
      { value: "ramp", label: "Anxious early, calm at desk", weights: { pressure: 2 } },
      { value: "panic", label: "Panic, study-blank", weights: { pressure: -2 } },
      {
        value: "avoid",
        label: "Often skip if too stressed",
        weights: { pressure: -3, compliance: -1 },
      },
    ],
  },
  {
    id: "hours_real",
    kind: "behaviour",
    prompt: "Longest stretch you've focused on one task without phone breaks?",
    options: [
      { value: "3p", label: "3+ hours", weights: { detail: 3, screen: 2, pressure: 1 } },
      { value: "12", label: "1–2 hours", weights: { detail: 1 } },
      { value: "30", label: "About 30 min", weights: { detail: -1 } },
      { value: "10", label: "10 min max", weights: { detail: -2, screen: -1 } },
    ],
  },
  {
    id: "cold_message",
    kind: "behaviour",
    prompt: "Have you ever sent a cold message asking a stranger for help?",
    options: [
      { value: "many", label: "Many times - comfortable", weights: { sales: 3, pressure: 2 } },
      { value: "few", label: "A few times", weights: { sales: 1 } },
      { value: "tried", label: "Drafted, didn't send", weights: { sales: -1 } },
      { value: "no", label: "No, can't imagine", weights: { sales: -2 } },
    ],
  },
  {
    id: "complain",
    kind: "behaviour",
    prompt: "When a service messes up, you typically…",
    options: [
      {
        value: "polite",
        label: "Politely escalate to a supervisor",
        weights: { sales: 2, pressure: 1, empathy: 1 },
      },
      { value: "fight", label: "Fight hard until it's fixed", weights: { pressure: 2, sales: 2 } },
      {
        value: "review",
        label: "Leave a detailed review online",
        weights: { writing: 2, language: 1 },
      },
      { value: "let", label: "Let it go", weights: { sales: -1, pressure: -1 } },
    ],
  },
  {
    id: "research_pref",
    kind: "behaviour",
    prompt: "When you research a topic, you mostly…",
    options: [
      { value: "deep", label: "Read 2–3 long-form articles", weights: { language: 3, detail: 1 } },
      { value: "video", label: "Watch YouTube", weights: { language: -1 } },
      { value: "ask", label: "Ask a person who knows", weights: { sales: 2, empathy: 1 } },
      { value: "ai", label: "Ask AI and read the answer", weights: { tech: 2 } },
    ],
  },
  {
    id: "follow_through",
    kind: "behaviour",
    prompt: "When you start a 3-month side commitment, you usually…",
    options: [
      {
        value: "finish",
        label: "Finish it well",
        weights: { compliance: 2, pressure: 1, detail: 1 },
      },
      { value: "trail", label: "Lose steam in month 2", weights: { pressure: -1 } },
      { value: "drop", label: "Drop within 3 weeks", weights: { compliance: -2 } },
      { value: "never", label: "Don't start them", weights: {} },
    ],
  },
  {
    id: "small_lead",
    kind: "behaviour",
    prompt: "Have you ever managed a junior or younger person at any task?",
    options: [
      {
        value: "often",
        label: "Often, comfortable",
        weights: { sales: 2, empathy: 1, pressure: 1 },
      },
      { value: "few", label: "A few times", weights: { sales: 1 } },
      { value: "no", label: "No", weights: {} },
      { value: "hate", label: "I'd hate to", weights: { sales: -1 } },
    ],
  },
  {
    id: "blood",
    kind: "behaviour",
    prompt: "How do you react around blood, needles, body fluids?",
    streams: ["BiPC"],
    options: [
      { value: "fine", label: "Completely fine", weights: { patient: 3, lab: 2, empathy: 1 } },
      { value: "ok", label: "Uncomfortable but ok", weights: { patient: 1 } },
      { value: "hard", label: "Really hard for me", weights: { patient: -2, lab: -1 } },
      { value: "no", label: "Faint at the sight", weights: { patient: -3, lab: -2 } },
    ],
  },
  {
    id: "hospital_time",
    kind: "behaviour",
    prompt: "Total time you've spent inside a working hospital so far?",
    streams: ["BiPC"],
    options: [
      { value: "weeks", label: "Weeks/months", weights: { patient: 2, empathy: 1 } },
      { value: "days", label: "Several days", weights: { patient: 1 } },
      { value: "few", label: "A few visits", weights: {} },
      { value: "none", label: "Almost none", weights: { patient: -1 } },
    ],
  },
  {
    id: "research_paper",
    kind: "behaviour",
    prompt: "Have you read a peer-reviewed research paper end-to-end?",
    options: [
      { value: "many", label: "Many", weights: { language: 3, logic: 2, compliance: 1 } },
      { value: "few", label: "A few", weights: { language: 1 } },
      { value: "one", label: "Once", weights: {} },
      { value: "no", label: "Never", weights: { language: -1 } },
    ],
  },
  {
    id: "git_use",
    kind: "behaviour",
    prompt: "Do you know what git/GitHub is and have you used it?",
    options: [
      { value: "use", label: "Yes, I use it regularly", weights: { tech: 3, logic: 2 } },
      { value: "tried", label: "Tried it once or twice", weights: { tech: 1 } },
      { value: "know", label: "Heard of it, never used", weights: {} },
      { value: "no", label: "No idea", weights: { tech: -1 } },
    ],
  },
  {
    id: "small_money",
    kind: "behaviour",
    prompt: "Have you ever earned your own money (any amount)?",
    options: [
      {
        value: "regular",
        label: "Regularly, current job/freelance",
        weights: { sales: 2, pressure: 2 },
      },
      { value: "few", label: "A few one-off gigs", weights: { sales: 1 } },
      { value: "tried", label: "Tried but gave up", weights: {} },
      { value: "no", label: "Never", weights: { sales: -1 } },
    ],
  },
  {
    id: "documentation",
    kind: "behaviour",
    prompt: "Have you written documentation/SOPs anyone else used?",
    options: [
      {
        value: "yes",
        label: "Yes, used by a team",
        weights: { writing: 3, compliance: 3, detail: 2 },
      },
      { value: "self", label: "Yes, for myself", weights: { writing: 1, detail: 1 } },
      { value: "no", label: "No", weights: {} },
    ],
  },
  {
    id: "fix_others",
    kind: "behaviour",
    prompt: "Friends/family bring you their broken phones/computers because…",
    options: [
      { value: "fix", label: "I usually fix them", weights: { tech: 3, logic: 2 } },
      { value: "try", label: "I try, sometimes succeed", weights: { tech: 1 } },
      { value: "google", label: "I just google fast", weights: { tech: 1, screen: 1 } },
      { value: "no", label: "They don't, I'd be lost", weights: { tech: -2 } },
    ],
  },
  {
    id: "english_speak",
    kind: "behaviour",
    prompt: "Are you comfortable holding a 5-min English conversation with a stranger?",
    options: [
      { value: "yes", label: "Yes, easily", weights: { language: 2, sales: 2 } },
      { value: "ok", label: "With a colleague yes, stranger no", weights: { language: 1 } },
      {
        value: "hard",
        label: "Hard, I switch to my language",
        weights: { language: -1, sales: -1 },
      },
      { value: "avoid", label: "Avoid English conversation", weights: { language: -3, sales: -2 } },
    ],
  },
  {
    id: "punctual",
    kind: "behaviour",
    prompt: "Do people consider you punctual?",
    options: [
      {
        value: "very",
        label: "Very - I arrive early",
        weights: { compliance: 2, detail: 1, pressure: 1 },
      },
      { value: "ok", label: "Mostly on time", weights: { compliance: 1 } },
      { value: "late", label: "Often late by a bit", weights: { compliance: -1 } },
      { value: "very_late", label: "Notoriously late", weights: { compliance: -2, pressure: -1 } },
    ],
  },

  // ─────────────────────────────────────────────
  // MICRO (25) - small skill-checks; one option correct
  // ─────────────────────────────────────────────
  {
    id: "micro_pv",
    kind: "micro",
    prompt: "Which adverse event appeared FIRST in this case note?",
    streams: ["BiPC"],
    scenario:
      "“45F started Drug X on 12 Mar. On 18 Mar developed rash; fever 38.9 °C noted same evening. Drug stopped 19 Mar; symptoms resolved by 22 Mar.”",
    options: [
      {
        value: "rash",
        label: "Rash",
        correct: true,
        weights: { detail: 3, language: 2, compliance: 1 },
      },
      { value: "fever", label: "Fever", weights: { language: -1 } },
      { value: "same", label: "Both started the same day", weights: {} },
      { value: "ns", label: "Not stated in the note", weights: { detail: -1 } },
    ],
  },
  {
    id: "micro_code",
    kind: "micro",
    prompt: "Which one is the odd one out?",
    streams: ["BiPC"],
    helper: "Real ICD-10 codes - used in medical coding daily.",
    scenario: "J45.901   J45.902   J45.909   M54.5",
    options: [
      { value: "m54", label: "M54.5", correct: true, weights: { detail: 3, logic: 2 } },
      { value: "j901", label: "J45.901", weights: {} },
      { value: "j902", label: "J45.902", weights: {} },
      { value: "j909", label: "J45.909", weights: {} },
    ],
  },
  {
    id: "micro_data",
    kind: "micro",
    prompt: "Which row looks WRONG in this trial dataset?",
    streams: ["BiPC", "MPC"],
    scenario:
      "Patient | Age | Dose (mg) | BP\n101 | 34 | 50 | 120/80\n102 | 41 | 50 | 118/76\n103 | 29 | 500 | 122/79\n104 | 55 | 50 | 130/85",
    options: [
      {
        value: "103",
        label: "Patient 103 - dose looks 10× too high",
        correct: true,
        weights: { data: 3, detail: 2, logic: 2 },
      },
      { value: "101", label: "Patient 101", weights: {} },
      { value: "104", label: "Patient 104", weights: {} },
      { value: "none", label: "Nothing looks wrong", weights: { data: -1, detail: -1 } },
    ],
  },
  {
    id: "micro_pattern",
    kind: "micro",
    prompt: "What number comes next?",
    scenario: "2, 6, 12, 20, 30, ?",
    options: [
      { value: "42", label: "42", correct: true, weights: { logic: 3, tech: 1 } },
      { value: "40", label: "40", weights: {} },
      { value: "38", label: "38", weights: {} },
      { value: "skip", label: "I don't enjoy these", weights: { logic: -1, sales: 1 } },
    ],
  },
  {
    id: "micro_english",
    kind: "micro",
    prompt: "Pick the sentence written in clean medical-report English:",
    streams: ["BiPC"],
    options: [
      {
        value: "a",
        label: "“The patient is improving and tolerating the medication well.”",
        correct: true,
        weights: { language: 3, writing: 2 },
      },
      {
        value: "b",
        label: "“Patient is improve and is taking medicine and is good now.”",
        weights: { language: -1 },
      },
      {
        value: "c",
        label: "“The medication is being tolerated patient-wise good.”",
        weights: { language: -1 },
      },
      {
        value: "d",
        label: "“Patient med tolerate ok improvement seen.”",
        weights: { language: -2 },
      },
    ],
  },
  {
    id: "micro_logic",
    kind: "micro",
    prompt: "All clinical trial drugs need approval. Drug Z has approval. Therefore…",
    streams: ["BiPC", "MPC"],
    options: [
      { value: "a", label: "Drug Z is in a clinical trial OR is approved", weights: {} },
      { value: "b", label: "Drug Z must be safe", weights: { logic: -1 } },
      {
        value: "c",
        label: "We can't conclude Drug Z is in a clinical trial",
        correct: true,
        weights: { logic: 3, compliance: 1 },
      },
      { value: "d", label: "Drug Z is not in a clinical trial", weights: { logic: -1 } },
    ],
  },
  {
    id: "micro_unit",
    kind: "micro",
    prompt: "A vial reads 250 mg / 5 mL. Doctor wants 100 mg. How many mL?",
    streams: ["BiPC"],
    options: [
      { value: "2", label: "2 mL", correct: true, weights: { logic: 2, data: 2, detail: 1 } },
      { value: "5", label: "5 mL", weights: { detail: -1 } },
      { value: "1", label: "1 mL", weights: { logic: -1 } },
      { value: "25", label: "0.25 mL", weights: { logic: -1 } },
    ],
  },
  {
    id: "micro_chart",
    kind: "micro",
    prompt: "BP readings: 118/78, 122/80, 119/79, 188/110, 120/82. Which value is the outlier?",
    streams: ["BiPC"],
    options: [
      { value: "188", label: "188/110", correct: true, weights: { data: 3, detail: 2 } },
      { value: "118", label: "118/78", weights: {} },
      { value: "120", label: "120/82", weights: {} },
      { value: "none", label: "All look normal", weights: { data: -2, detail: -1 } },
    ],
  },
  {
    id: "micro_dose_freq",
    kind: "micro",
    prompt: "BID means…",
    streams: ["BiPC"],
    helper: "Standard prescription abbreviation.",
    options: [
      {
        value: "twice",
        label: "Twice a day",
        correct: true,
        weights: { compliance: 3, detail: 2, language: 1 },
      },
      { value: "once", label: "Once a day", weights: { compliance: -1 } },
      { value: "thrice", label: "Three times a day", weights: { compliance: -1 } },
      { value: "bed", label: "At bedtime", weights: { compliance: -1 } },
    ],
  },
  {
    id: "micro_confidential",
    kind: "micro",
    prompt: "A patient ID accidentally appears in a public report draft. The right action is…",
    streams: ["BiPC"],
    options: [
      {
        value: "redact",
        label: "Stop, redact, and notify the privacy officer",
        correct: true,
        weights: { compliance: 3, empathy: 2, detail: 2 },
      },
      { value: "send", label: "Send anyway, fix in v2", weights: { compliance: -3 } },
      { value: "ask", label: "Ask the patient if it's ok", weights: { empathy: 1, compliance: 0 } },
      { value: "ignore", label: "Probably nobody will notice", weights: { compliance: -3 } },
    ],
  },
  {
    id: "micro_seq",
    kind: "micro",
    prompt: "Pick the next term: 1, 1, 2, 3, 5, 8, ?",
    options: [
      { value: "13", label: "13", correct: true, weights: { logic: 3, tech: 1 } },
      { value: "11", label: "11", weights: {} },
      { value: "16", label: "16", weights: {} },
      { value: "10", label: "10", weights: {} },
    ],
  },
  {
    id: "micro_letter",
    kind: "micro",
    prompt: "Pick the next letter: A, C, F, J, ?",
    options: [
      { value: "O", label: "O", correct: true, weights: { logic: 3 } },
      { value: "M", label: "M", weights: {} },
      { value: "N", label: "N", weights: {} },
      { value: "K", label: "K", weights: {} },
    ],
  },
  {
    id: "micro_pct",
    kind: "micro",
    prompt: "30% of 240 is…",
    options: [
      { value: "72", label: "72", correct: true, weights: { data: 2, logic: 2 } },
      { value: "60", label: "60", weights: {} },
      { value: "80", label: "80", weights: {} },
      { value: "70", label: "70", weights: {} },
    ],
  },
  {
    id: "micro_table",
    kind: "micro",
    prompt: "From this table, which clinic has the BEST appointment-show-up rate?",
    scenario: "Clinic | Booked | Showed\nA | 120 | 102\nB | 80  | 60\nC | 200 | 150\nD | 50  | 48",
    options: [
      {
        value: "D",
        label: "Clinic D (96%)",
        correct: true,
        weights: { data: 3, logic: 2, detail: 1 },
      },
      { value: "A", label: "Clinic A", weights: {} },
      { value: "C", label: "Clinic C", weights: { data: -1 } },
      { value: "B", label: "Clinic B", weights: { data: -1 } },
    ],
  },
  {
    id: "micro_grammar",
    kind: "micro",
    prompt: "Pick the grammatically clean sentence:",
    streams: ["BiPC"],
    options: [
      {
        value: "a",
        label: "“Each patient was monitored carefully throughout the trial.”",
        correct: true,
        weights: { language: 3, writing: 2 },
      },
      {
        value: "b",
        label: "“Each patients was monitor carefully throughout the trial.”",
        weights: { language: -1 },
      },
      {
        value: "c",
        label: "“Each patient were monitor careful through the trial.”",
        weights: { language: -2 },
      },
      {
        value: "d",
        label: "“Each of patient is being monitor in the trial carefully.”",
        weights: { language: -1 },
      },
    ],
  },
  {
    id: "micro_age_group",
    kind: "micro",
    prompt: "ICD-10 P codes are used for…",
    streams: ["BiPC"],
    helper: "If you know it, great; if not, infer from the letter.",
    options: [
      {
        value: "neonatal",
        label: "Conditions originating in the perinatal period",
        correct: true,
        weights: { detail: 2, compliance: 2, language: 1 },
      },
      { value: "preg", label: "Pregnancy complications", weights: { compliance: -1 } },
      { value: "psych", label: "Psychiatric disorders", weights: { compliance: -1 } },
      { value: "post", label: "Post-surgical care", weights: { compliance: -1 } },
    ],
  },
  {
    id: "micro_seriousness",
    kind: "micro",
    prompt: "Which adverse event would be considered SERIOUS by ICH definitions?",
    streams: ["BiPC"],
    options: [
      {
        value: "hosp",
        label: "Required hospitalisation",
        correct: true,
        weights: { compliance: 3, detail: 2, language: 1 },
      },
      { value: "mild", label: "Mild headache, resolved next day", weights: { compliance: -1 } },
      { value: "rash", label: "Itchy rash, no treatment needed", weights: { compliance: -1 } },
      { value: "tired", label: "Patient felt tired", weights: { compliance: -1 } },
    ],
  },
  {
    id: "micro_priority",
    kind: "micro",
    prompt: "Three tasks in the queue. Pick the one that should be done FIRST:",
    streams: ["BiPC"],
    options: [
      {
        value: "ae",
        label: "Log a serious adverse event from yesterday",
        correct: true,
        weights: { compliance: 3, pressure: 2, detail: 1 },
      },
      { value: "newsl", label: "Draft the monthly newsletter", weights: { compliance: -1 } },
      { value: "tidy", label: "Tidy up your inbox folders", weights: { compliance: -1 } },
      { value: "lunch", label: "Plan team lunch", weights: { compliance: -1 } },
    ],
  },
  {
    id: "micro_typo",
    kind: "micro",
    prompt: "Spot the typo: 'The patient was administred 5 mg of dexamethasone twice daily.'",
    streams: ["BiPC"],
    options: [
      {
        value: "admin",
        label: "administred → administered",
        correct: true,
        weights: { detail: 3, language: 2, writing: 1 },
      },
      { value: "dex", label: "dexamethasone is misspelled", weights: { detail: -1 } },
      { value: "twice", label: "twice should be 'two times'", weights: { detail: -1 } },
      { value: "none", label: "No typo", weights: { detail: -2 } },
    ],
  },
  {
    id: "micro_anatomy",
    kind: "micro",
    prompt: "The myocardium is part of the…",
    streams: ["BiPC"],
    options: [
      {
        value: "heart",
        label: "Heart",
        correct: true,
        weights: { language: 1, lab: 1, patient: 1 },
      },
      { value: "liver", label: "Liver", weights: {} },
      { value: "lung", label: "Lung", weights: {} },
      { value: "kidney", label: "Kidney", weights: {} },
    ],
  },
  {
    id: "micro_ratio",
    kind: "micro",
    prompt: "If 8 of 200 trial subjects had nausea, that's…",
    streams: ["BiPC", "MPC"],
    options: [
      { value: "4pct", label: "4%", correct: true, weights: { data: 2, logic: 2, detail: 1 } },
      { value: "8pct", label: "8%", weights: {} },
      { value: "0.4", label: "0.4%", weights: {} },
      { value: "40", label: "40%", weights: { logic: -1 } },
    ],
  },
  {
    id: "micro_chart_read",
    kind: "micro",
    prompt:
      "Q1: 120, Q2: 180, Q3: 150, Q4: 210. Quarter with the LARGEST jump from previous quarter?",
    options: [
      { value: "q2", label: "Q2 (+60)", correct: true, weights: { data: 3, logic: 2 } },
      { value: "q4", label: "Q4 (+60)", weights: { detail: -1 } },
      { value: "q3", label: "Q3", weights: {} },
      { value: "q1", label: "Q1", weights: {} },
    ],
  },
  {
    id: "micro_sql",
    kind: "micro",
    prompt: "Which clause LIMITS rows in SQL?",
    options: [
      { value: "where", label: "WHERE", correct: true, weights: { tech: 2, data: 2, logic: 1 } },
      { value: "select", label: "SELECT", weights: {} },
      { value: "from", label: "FROM", weights: {} },
      { value: "order", label: "ORDER BY", weights: {} },
    ],
  },
  {
    id: "micro_excel",
    kind: "micro",
    prompt: "In Excel, =VLOOKUP(A2, B:D, 3, FALSE) returns the value from…",
    options: [
      {
        value: "third",
        label: "The 3rd column of B:D for the row matching A2",
        correct: true,
        weights: { data: 3, logic: 2, detail: 1 },
      },
      { value: "row3", label: "The 3rd row of column A", weights: { data: -1 } },
      { value: "first", label: "The first matching cell in B", weights: { data: -1 } },
      { value: "row", label: "The row number of A2", weights: { data: -1 } },
    ],
  },
  {
    id: "micro_truth",
    kind: "micro",
    prompt: "A trial reports p < 0.05 for a treatment. Best honest interpretation?",
    streams: ["BiPC", "MPC"],
    options: [
      {
        value: "evid",
        label: "There is evidence the effect isn't due to chance alone",
        correct: true,
        weights: { logic: 3, data: 2, compliance: 1 },
      },
      { value: "proof", label: "The treatment is proven to work", weights: { logic: -1 } },
      { value: "5pct", label: "The treatment fails 5% of the time", weights: { logic: -1 } },
      { value: "none", label: "Means nothing without context", weights: { logic: 1 } },
    ],
  },

  // ─────────────────────────────────────────────
  // LIFESTYLE (15)
  // ─────────────────────────────────────────────
  {
    id: "wfh",
    kind: "lifestyle",
    prompt: "Your dream work setup, 2 years from now?",
    options: [
      { value: "wfh", label: "Mostly work-from-home", weights: { screen: 2, tech: 1, sales: -1 } },
      { value: "office", label: "Office with a small team", weights: { sales: 1, compliance: 1 } },
      {
        value: "field",
        label: "Field / hospital, on the move",
        weights: { patient: 3, empathy: 1, screen: -1 },
      },
      { value: "hybrid", label: "Hybrid - both", weights: { sales: 1, screen: 1 } },
    ],
  },
  {
    id: "shift",
    kind: "lifestyle",
    prompt: "Could you do night shifts (US-hours) for higher pay?",
    options: [
      { value: "yes", label: "Yes, no problem", weights: { screen: 1, pressure: 1 } },
      { value: "temp", label: "1–2 years to set up career", weights: { screen: 1 } },
      { value: "no", label: "No, I value my sleep", weights: { screen: -1, patient: 1 } },
      { value: "hate", label: "Absolutely not", weights: { screen: -2 } },
    ],
  },
  {
    id: "salary",
    kind: "lifestyle",
    prompt: "Realistic first-year salary expectation?",
    helper: "We'll flag if it's way off-market for your fit.",
    options: [
      { value: "low", label: "₹2.5 – 4 LPA. I'll grow from there" },
      { value: "mid", label: "₹4 – 6 LPA" },
      { value: "high", label: "₹6 – 9 LPA" },
      { value: "vhigh", label: "₹9 LPA+" },
    ],
  },
  {
    id: "relocate",
    kind: "lifestyle",
    prompt: "Willing to relocate to Hyderabad / Bangalore / Chennai for a job?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "may", label: "Maybe, depends" },
      { value: "no", label: "No, my city only" },
    ],
  },
  {
    id: "travel",
    kind: "lifestyle",
    prompt: "How do you feel about field travel (3–5 days a month)?",
    options: [
      { value: "love", label: "Love it", weights: { sales: 2, patient: 1, pressure: 1 } },
      { value: "ok", label: "Fine occasionally", weights: { sales: 1 } },
      { value: "no", label: "Prefer not", weights: { sales: -1, screen: 1 } },
      { value: "never", label: "Strict no-travel", weights: { sales: -2, screen: 2 } },
    ],
  },
  {
    id: "team_size",
    kind: "lifestyle",
    prompt: "Ideal team size to work in?",
    options: [
      { value: "solo", label: "Solo with a manager", weights: { tech: 1, screen: 1, sales: -1 } },
      {
        value: "small",
        label: "Small team of 3–5",
        weights: { compliance: 1, sales: 1, empathy: 1 },
      },
      { value: "med", label: "Mid-size 10–25", weights: { sales: 2, compliance: 1 } },
      { value: "big", label: "Large 50+", weights: { compliance: 2, sales: 1 } },
    ],
  },
  {
    id: "dress",
    kind: "lifestyle",
    prompt: "How important is a flexible dress code?",
    options: [
      { value: "max", label: "Very - I need casual", weights: { tech: 2, screen: 1 } },
      { value: "mid", label: "Smart casual is fine", weights: { sales: 1 } },
      { value: "form", label: "I prefer formal", weights: { compliance: 2, sales: 1 } },
      { value: "any", label: "Don't care", weights: {} },
    ],
  },
  {
    id: "weekend_work",
    kind: "lifestyle",
    prompt: "Honest reaction to occasional weekend work for important launches?",
    options: [
      {
        value: "ok",
        label: "Fine if rare and meaningful",
        weights: { pressure: 2, compliance: 1 },
      },
      { value: "comp", label: "Only if compensated", weights: { sales: 1 } },
      { value: "no", label: "Strict 5-day for me", weights: { pressure: -1 } },
      { value: "never", label: "Absolutely never", weights: { pressure: -2 } },
    ],
  },
  {
    id: "commute",
    kind: "lifestyle",
    prompt: "Max one-way commute you can sustain?",
    options: [
      { value: "30", label: "Under 30 min", weights: { patient: 1 } },
      { value: "60", label: "Up to 60 min", weights: {} },
      { value: "90", label: "Up to 90 min", weights: { pressure: 1 } },
      { value: "wfh", label: "WFH only", weights: { tech: 2, screen: 2 } },
    ],
  },
  {
    id: "retire_pic",
    kind: "lifestyle",
    prompt: "Picture yourself in 5 years. The most appealing image is…",
    options: [
      {
        value: "clinic",
        label: "Running a small clinic",
        weights: { patient: 3, empathy: 2, sales: 2 },
      },
      { value: "lead", label: "Leading a 20-person team", weights: { sales: 3, pressure: 2 } },
      {
        value: "ic",
        label: "Senior individual contributor",
        weights: { tech: 2, detail: 2, screen: 1 },
      },
      {
        value: "found",
        label: "Founder of a tiny company",
        weights: { tech: 2, sales: 2, pressure: 2 },
      },
    ],
  },
  {
    id: "intl",
    kind: "lifestyle",
    prompt: "How important is international career mobility (US/UK)?",
    options: [
      { value: "must", label: "Must - that's the goal", weights: { language: 2, pressure: 1 } },
      { value: "nice", label: "Nice to have", weights: { language: 1 } },
      { value: "india", label: "I want to build in India", weights: { sales: 1, empathy: 1 } },
      { value: "city", label: "I want to stay near home", weights: { patient: 1 } },
    ],
  },
  {
    id: "stability_vs",
    kind: "lifestyle",
    prompt: "What matters more day-to-day?",
    options: [
      {
        value: "stable",
        label: "Predictable hours, stable salary",
        weights: { compliance: 2, detail: 1 },
      },
      {
        value: "growth",
        label: "Steep learning, even if chaotic",
        weights: { tech: 2, pressure: 2 },
      },
      {
        value: "money",
        label: "High pay, high stress is fine",
        weights: { sales: 2, pressure: 2 },
      },
      { value: "purpose", label: "Meaning over money", weights: { patient: 2, empathy: 2 } },
    ],
  },
  {
    id: "office_culture",
    kind: "lifestyle",
    prompt: "Pick the office culture you'd thrive in:",
    options: [
      {
        value: "structured",
        label: "Structured, process-led",
        weights: { compliance: 2, detail: 2 },
      },
      {
        value: "startup",
        label: "Startup-y, move fast",
        weights: { tech: 2, pressure: 2, sales: 1 },
      },
      { value: "warm", label: "Warm, people-first", weights: { empathy: 2, patient: 1 } },
      {
        value: "academic",
        label: "Academic, research-heavy",
        weights: { language: 2, logic: 2, detail: 1 },
      },
    ],
  },
  {
    id: "tools_use",
    kind: "lifestyle",
    prompt: "How many hours a day at a computer keyboard could you sustain?",
    options: [
      { value: "10p", label: "10+ hours, no issue", weights: { screen: 3, tech: 1 } },
      { value: "8", label: "Around 8 hours", weights: { screen: 2 } },
      { value: "4", label: "4 hours max", weights: { patient: 1, screen: -1 } },
      {
        value: "min",
        label: "I want to be away from screens",
        weights: { patient: 3, screen: -2 },
      },
    ],
  },
  {
    id: "sleep",
    kind: "lifestyle",
    prompt: "Honest sleep pattern at your best?",
    options: [
      { value: "early", label: "Early bird (10pm – 6am)", weights: { patient: 1, compliance: 1 } },
      { value: "stand", label: "Standard (12am – 8am)", weights: {} },
      { value: "late", label: "Late (2am – 10am)", weights: { tech: 1, screen: 1 } },
      { value: "irreg", label: "Very irregular", weights: { pressure: -1 } },
    ],
  },

  // ─────────────────────────────────────────────
  // COMMITMENT (10)
  // ─────────────────────────────────────────────
  {
    id: "study_hours",
    kind: "commitment",
    prompt: "How many hours a week can you commit to learning?",
    options: [
      { value: "lt5", label: "Under 5 hours" },
      { value: "5_10", label: "5 – 10 hours" },
      { value: "10_20", label: "10 – 20 hours" },
      { value: "20p", label: "20+ hours. I'm serious" },
    ],
  },
  {
    id: "budget",
    kind: "commitment",
    prompt: "Family budget for upskilling?",
    options: [
      { value: "lt15", label: "Under ₹15k" },
      { value: "15_30", label: "₹15k – ₹30k" },
      { value: "30p", label: "₹30k+" },
      { value: "emi", label: "I'd prefer EMI" },
    ],
  },
  {
    id: "start_when",
    kind: "commitment",
    prompt: "When do you want to start?",
    options: [
      { value: "now", label: "Right away. Next batch" },
      { value: "next", label: "Next 1–2 months" },
      { value: "later", label: "After my exams (3+ months)" },
    ],
  },
  {
    id: "exam_target",
    kind: "commitment",
    prompt: "Are you preparing for any major exam in the next 6 months?",
    options: [
      { value: "none", label: "No" },
      { value: "uni", label: "University finals only" },
      { value: "compete", label: "GATE / CAT / NEET-PG / similar" },
      { value: "abroad", label: "GRE / IELTS / OET" },
    ],
  },
  {
    id: "decision_maker",
    kind: "commitment",
    prompt: "Who decides about your career path right now?",
    options: [
      { value: "me", label: "Mostly me", weights: { pressure: 1 } },
      { value: "parents", label: "Mostly parents", weights: { compliance: 1 } },
      { value: "both", label: "Discuss together", weights: { empathy: 1 } },
      { value: "advisor", label: "An advisor / counsellor", weights: {} },
    ],
  },
  {
    id: "support",
    kind: "commitment",
    prompt: "How supportive is your family of a non-traditional path?",
    options: [
      { value: "very", label: "Very supportive" },
      { value: "open", label: "Open if I show evidence" },
      { value: "skept", label: "Skeptical, but won't block" },
      { value: "block", label: "Strong push for clinical/govt only" },
    ],
  },
  {
    id: "english_invest",
    kind: "commitment",
    prompt: "Ready to spend 30 min a day on English if it's part of the path?",
    options: [
      { value: "yes", label: "Yes, daily" },
      { value: "alt", label: "Few times a week" },
      { value: "min", label: "Bare minimum" },
      { value: "no", label: "Honestly, no" },
    ],
  },
  {
    id: "code_invest",
    kind: "commitment",
    prompt: "Ready to spend 1 hr a day learning code if the path needs it?",
    options: [
      { value: "love", label: "Yes, sounds fun" },
      { value: "ok", label: "Ok if structured" },
      { value: "min", label: "Reluctantly" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "mentor_open",
    kind: "commitment",
    prompt: "Open to a 1-on-1 mentor calling you weekly?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "wk", label: "Bi-weekly" },
      { value: "mo", label: "Monthly is enough" },
      { value: "no", label: "I prefer self-paced" },
    ],
  },
  {
    id: "job_urgency",
    kind: "commitment",
    prompt: "How soon do you NEED to start earning?",
    options: [
      { value: "now", label: "Within 3 months" },
      { value: "6mo", label: "Within 6 months" },
      { value: "1y", label: "Within a year" },
      { value: "no", label: "No urgency" },
    ],
  },
];

/** Visible questions in order, filtered by branching rules. */
export function visibleQuestions(answers: Record<string, string>): Question[] {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(answers));
}
