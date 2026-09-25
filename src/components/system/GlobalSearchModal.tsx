import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Calculator,
  BarChart3,
  Layers,
  FileText,
  ShieldCheck,
  Activity,
  Users,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

interface GlobalSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchEntry {
  title: string;
  description: string;
  to: string;
  category: "Assess" | "Training" | "Roles" | "Students" | "Tools & Research" | "Corporate";
  icon: typeof Award;
  keywords?: string;
}

const SEARCH_REGISTRY: SearchEntry[] = [
  // Assess
  {
    title: "ACRI Pharmacovigilance Certification",
    description: "Standardized 100-point industry readiness evaluation",
    to: "/acri/pharmacovigilance-certification",
    category: "Assess",
    icon: Award,
    keywords: "acri certification test exam assessment score pv pharmacovigilance",
  },
  {
    title: "Clinical Work Simulation Terminal",
    description: "Hands-on authentic PV associate scenario test",
    to: "/career-engine/test",
    category: "Assess",
    icon: Activity,
    keywords: "simulation test terminal work career engine scenario",
  },
  {
    title: "ACRI Scoring Methodology",
    description: "9-dimension evaluation rubric and calibration data",
    to: "/acri",
    category: "Assess",
    icon: FileText,
    keywords: "methodology rubric standard dimensions framework scoring",
  },
  {
    title: "Verify ACRI Credential",
    description: "Public verification of candidate certification codes",
    to: "/verify",
    category: "Assess",
    icon: ShieldCheck,
    keywords: "verify certificate verification credential authenticity proof",
  },

  // Training
  {
    title: "12-Week Pharmacovigilance Cohort",
    description: "Oracle Argus, MedDRA, ICSR, Signal Detection, Narrative Writing",
    to: "/courses",
    category: "Training",
    icon: BookOpen,
    keywords: "training course cohort argus meddra icsr signal detection clinical",
  },
  {
    title: "Applied Clinical Internships",
    description: "Verified proof-of-work capstone for recruitment readiness",
    to: "/internships",
    category: "Training",
    icon: Layers,
    keywords: "internship capstone proof of work live cases projects",
  },

  // Roles
  {
    title: "Pharmacovigilance Associate",
    description: "Safety reports, ICSR processing, triage & adverse event triage",
    to: "/pv-associate",
    category: "Roles",
    icon: Briefcase,
    keywords: "pv associate pharmacovigilance drug safety medical reviewer",
  },
  {
    title: "Clinical Data Management (CDM)",
    description: "eCRF design, EDC systems, data cleaning & discrepancy management",
    to: "/roles",
    category: "Roles",
    icon: Briefcase,
    keywords: "cdm clinical data management rave inform discrepancy edc",
  },
  {
    title: "Medical Coder",
    description: "ICD-10-CM, CPT, HCPCS code assignment & compliance audits",
    to: "/roles",
    category: "Roles",
    icon: Briefcase,
    keywords: "medical coder coding icd-10 cpt hcpcs ahima aapc",
  },
  {
    title: "Regulatory Affairs Executive",
    description: "eCTD submissions, dossier management & ICH guidelines",
    to: "/roles",
    category: "Roles",
    icon: Briefcase,
    keywords: "regulatory affairs ectd submissions fda cdsco ich cmc",
  },

  // Students & Pathways
  {
    title: "4th-Year Pharmacy Students",
    description: "Final year curriculum bridge & campus placement accelerator",
    to: "/students/4th-year",
    category: "Students",
    icon: GraduationCap,
    keywords: "final year 4th year student bpharm pharmd placements",
  },
  {
    title: "3rd-Year Trajectory Planning",
    description: "Skill roadmap and clinical research career foundations",
    to: "/students/3rd-year",
    category: "Students",
    icon: GraduationCap,
    keywords: "3rd year third pharmacy clinical foundation",
  },
  {
    title: "Graduates Rapid Pivot",
    description: "Transition from retail/sales into clinical data careers",
    to: "/students/graduates",
    category: "Students",
    icon: GraduationCap,
    keywords: "graduates passout gap year career pivot transition",
  },
  {
    title: "Degree Specialization Pathways",
    description: "B.Pharm, M.Pharm, Pharm.D & Life Sciences career maps",
    to: "/degrees",
    category: "Students",
    icon: GraduationCap,
    keywords: "degree bpharm mpharm pharmd bsc msc life sciences biotech",
  },

  // Tools & Research
  {
    title: "Skill Gap Analyzer",
    description: "Interactive diagnostic for your industry competency gaps",
    to: "/tools/skill-gap-analyzer",
    category: "Tools & Research",
    icon: BarChart3,
    keywords: "skill gap analyzer diagnostic evaluation benchmark",
  },
  {
    title: "Role Competency Matrix",
    description: "Side-by-side comparison of clinical data career pathways",
    to: "/tools/role-matrix",
    category: "Tools & Research",
    icon: Layers,
    keywords: "matrix comparison roles salaries requirements skills",
  },
  {
    title: "Career ROI Calculator",
    description: "Calculate starting salary multiple against preparation cost",
    to: "/tools/cost-calculator",
    category: "Tools & Research",
    icon: Calculator,
    keywords: "roi cost calculator investment salary return compensation",
  },
  {
    title: "Quarterly Life Sciences Hiring Index",
    description: "Employment trends, CRO hiring volumes & fresher salary bands",
    to: "/research",
    category: "Tools & Research",
    icon: FileText,
    keywords: "research reports hiring index salary report whitepaper cro data",
  },

  // Corporate
  {
    title: "Employer Talent Console",
    description: "Hire ACRI-verified Pharmacovigilance & CDM candidates",
    to: "/recruiters",
    category: "Corporate",
    icon: Users,
    keywords: "recruiters employers hire candidates talent pool cro pharma",
  },
  {
    title: "Candidate Sign In",
    description: "Access your candidate dossier and assessment dashboard",
    to: "/login",
    category: "Corporate",
    icon: KeyRound,
    keywords: "login sign in portal student account dossier",
  },
];

export function GlobalSearchModal({ open, onOpenChange }: GlobalSearchModalProps) {
  const navigate = useNavigate();

  // Handle Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleSelect = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  const categories: SearchEntry["category"][] = [
    "Assess",
    "Training",
    "Roles",
    "Students",
    "Tools & Research",
    "Corporate",
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search certifications, roles, training, tools..." />
      <CommandList className="max-h-[380px] p-2">
        <CommandEmpty>No results found for that query.</CommandEmpty>

        {categories.map((category) => {
          const items = SEARCH_REGISTRY.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.to + item.title}
                    value={`${item.title} ${item.description} ${item.keywords || ""}`}
                    onSelect={() => handleSelect(item.to)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-stone-100 aria-selected:bg-stone-100"
                  >
                    <div className="h-8 w-8 rounded-md bg-[#FAF8F5] border border-stone-200 flex items-center justify-center shrink-0 text-[#1B3F8B]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#0B1325] truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">
                        {item.description}
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-stone-400 opacity-60 shrink-0" />
                  </CommandItem>
                );
              })}
              <CommandSeparator className="my-1.5" />
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
