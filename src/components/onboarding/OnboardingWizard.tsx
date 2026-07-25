import { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { waLink, NEXT_COHORT } from "@/components/landing/constants";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  actionText: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Verify WhatsApp & Contact",
    subtitle: "Confirm your phone to receive instant batch updates & LMS magic login",
    actionText: "Confirm Contact Details",
  },
  {
    id: 2,
    title: "Upload Profile & Qualification",
    subtitle: "Submit your degree details so your mentor can tailor your learning path",
    actionText: "Upload Qualification / Resume",
  },
  {
    id: 3,
    title: "Join Private Cohort Community",
    subtitle: "Connect with fellow peers & instructors in your WhatsApp batch group",
    actionText: "Join WhatsApp Batch Group",
  },
  {
    id: 4,
    title: "Schedule 1-on-1 Mentor Intro",
    subtitle: "Book your 15-minute 1-on-1 onboarding orientation call with an industry expert",
    actionText: "Book Orientation Call",
  },
];

interface Props {
  studentName?: string;
  studentPhone?: string;
  tierName?: string;
}

export function OnboardingWizard({ studentName = "Student", studentPhone, tierName = "Career Master" }: Props) {
  const [completed, setCompleted] = useState<number[]>([1]); // Step 1 pre-checked upon payment success
  const [activeStep, setActiveStep] = useState<number>(2);
  const [isDone, setIsDone] = useState<boolean>(false);

  const progressPct = Math.round((completed.length / STEPS.length) * 100);

  const completeStep = (stepId: number) => {
    if (!completed.includes(stepId)) {
      const nextCompleted = [...completed, stepId];
      setCompleted(nextCompleted);
      toast.success(`Step ${stepId} completed! 🎉`);

      if (nextCompleted.length === STEPS.length) {
        setIsDone(true);
        toast.success("🔥 Day-0 Onboarding Complete! Welcome to Arzon Global.");
      } else {
        const nextId = STEPS.find(s => !nextCompleted.includes(s.id))?.id ?? 2;
        setActiveStep(nextId);
      }
    }
  };

  const handleStepAction = (stepId: number) => {
    if (stepId === 1) {
      completeStep(1);
    } else if (stepId === 2) {
      toast.info("Uploading qualification profile...");
      setTimeout(() => completeStep(2), 800);
    } else if (stepId === 3) {
      const text = `Hi Arzon! I have confirmed my enrolment for the ${tierName} programme (${NEXT_COHORT.label} batch). Please add me to the private cohort WhatsApp group!`;
      window.open(waLink(text), "_blank", "noopener");
      completeStep(3);
    } else if (stepId === 4) {
      window.open("https://cal.com/arzon-onboarding/15min", "_blank", "noopener");
      completeStep(4);
    }
  };

  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Day-0 Activation Wizard
          </div>
          <h2 className="font-grotesk text-2xl font-bold text-white">
            Welcome aboard, {studentName}! 🚀
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Complete your 4-step onboarding checklist to unlock instant LMS access & mentor scheduling.
          </p>
        </div>

        {/* Progress Circle & Counter */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-800">
          <div className="relative h-12 w-12 flex items-center justify-center font-bold text-sm text-emerald-400">
            <svg className="absolute inset-0 h-12 w-12 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-500 ease-out"
                strokeDasharray={`${progressPct}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            {progressPct}%
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-300">Progress</p>
            <p className="text-micro text-slate-500">{completed.length} of 4 Completed</p>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isDone ? (
        <div className="mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold mb-3">
            ✓
          </div>
          <h3 className="font-grotesk text-xl font-bold text-white">All Onboarding Steps Complete!</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Your LMS account is active. Your mentor orientation details & WhatsApp cohort group link have been dispatched.
          </p>
          <Button 
            className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-full"
            onClick={() => window.location.href = "/dashboard"}
          >
            Enter Student LMS Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        /* Checklist Steps */
        <div className="mt-6 space-y-3">
          {STEPS.map((step) => {
            const isCompleted = completed.includes(step.id);
            const isActive = activeStep === step.id;

            return (
              <div
                key={step.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
                  isCompleted
                    ? "border-emerald-500/30 bg-emerald-950/10 opacity-90"
                    : isActive
                    ? "border-emerald-500 bg-slate-900/90 shadow-lg ring-1 ring-emerald-500/50"
                    : "border-slate-800 bg-slate-950/40 opacity-70"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => completeStep(step.id)}
                      className="mt-0.5 text-emerald-400 transition-transform active:scale-95"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="h-6 w-6 text-slate-600 hover:text-emerald-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-grotesk text-base font-semibold text-white">
                          Step {step.id}: {step.title}
                        </span>
                        {isCompleted && (
                          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-micro font-medium text-emerald-400">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-caption text-slate-400 mt-0.5">{step.subtitle}</p>
                    </div>
                  </div>

                  {!isCompleted && (
                    <Button
                      size="sm"
                      onClick={() => handleStepAction(step.id)}
                      className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 rounded-xl text-xs"
                    >
                      {step.actionText} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
