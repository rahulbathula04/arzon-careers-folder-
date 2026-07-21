/**
 * RoleFitQuiz — 3-question dialog that captures the reader's existing
 * skills, graduation year, and domain preference. Answers persist via
 * ReportStateContext and drive personalized tool + 30/60/90 output.
 */
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useReportState, type QuizProfile } from "./ReportStateContext";
import { REPORT_TONES } from "./reportTones";

const SKILL_OPTIONS = [
  "Excel",
  "SQL",
  "Python",
  "MedDRA",
  "Argus",
  "ARISg",
  "Rave EDC",
  "SAS",
  "R",
  "ICH-GCP",
  "CDSCO SUGAM",
  "eCTD",
  "Regulatory writing",
  "Medical writing",
  "PowerBI",
  "Tableau",
];

const DOMAINS = [
  "Pharmacovigilance",
  "Clinical data management",
  "Regulatory affairs",
  "Medical writing",
  "SAS / stats programming",
  "Medical coding",
  "AI in healthcare",
];

export function RoleFitQuiz() {
  const state = useReportState();
  const open = state.quizOpen;
  const [skills, setSkills] = useState<string[]>([]);
  const [gradYear, setGradYear] = useState<number | null>(null);
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    if (open && state.quizProfile) {
      setSkills(state.quizProfile.skills);
      setGradYear(state.quizProfile.gradYear);
      setDomain(state.quizProfile.domain);
    } else if (open) {
      setSkills([]);
      setGradYear(null);
      setDomain(null);
    }
  }, [open, state.quizProfile]);

  const toggleSkill = (s: string) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const currentYear = new Date().getFullYear();
  const years = [-2, -1, 0, 1, 2].map((offset) => currentYear + offset);

  const save = () => {
    const profile: QuizProfile = {
      skills,
      gradYear,
      domain,
      savedAt: new Date().toISOString(),
    };
    state.setQuizProfile(profile);
    state.closeQuiz();
  };

  const clear = () => {
    state.setQuizProfile(null);
    state.closeQuiz();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? state.closeQuiz() : null)}>
      <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto border-white/10 bg-[#0B1120] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Sparkles className={`h-5 w-5 ${REPORT_TONES.primary.iconFill}`} aria-hidden />
            Personalize your plan
          </DialogTitle>
          <DialogDescription className="text-white/70">
            3 quick questions — updates your 30/60/90 plan and tool list so it reflects what you
            already know.
          </DialogDescription>
        </DialogHeader>

        <section className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            1 · Skills you can already use
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SKILL_OPTIONS.map((s) => {
              const on = skills.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSkill(s)}
                  aria-pressed={on}
                  className={`report-focus-ring rounded-full border px-3 py-1 text-xs transition ${
                    on
                      ? `${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            2 · Graduation year
          </p>
          <div className="flex flex-wrap gap-1.5">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setGradYear(y)}
                aria-pressed={gradYear === y}
                className={`report-focus-ring rounded-full border px-3 py-1 text-xs transition ${
                  gradYear === y
                    ? `${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText}`
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            3 · Domain preference
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DOMAINS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDomain(d)}
                aria-pressed={domain === d}
                className={`report-focus-ring rounded-full border px-3 py-1 text-xs transition ${
                  domain === d
                    ? `${REPORT_TONES.warn.chipBorder} ${REPORT_TONES.warn.chipBg} ${REPORT_TONES.warn.chipText}`
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </section>

        <DialogFooter className="gap-2 sm:justify-between">
          {state.quizProfile ? (
            <Button variant="ghost" onClick={clear} className="text-white/60 hover:text-white">
              <X className="mr-1 h-3.5 w-3.5" /> Clear personalization
            </Button>
          ) : (
            <span />
          )}
          <Button
            onClick={save}
            className={`${REPORT_TONES.primary.accentBg} text-slate-950 hover:brightness-110`}
          >
            Save & personalize
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RoleFitQuiz;
