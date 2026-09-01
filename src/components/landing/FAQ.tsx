import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Reveal } from "@/components/motion/Reveal";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BorderBeam } from "@/components/magicui/border-beam";

const INSTITUTIONAL_FAQS = [
  {
    q: "Can recruiters verify my internship?",
    a: "Yes. Every Arzon internship comes with a unique public verification URL and QR code. Recruiters at top pharma companies, CROs, or healthcare BPOs can enter your Certificate ID on our public verifier (/verify) to instantly confirm your ISO 9001:2015 & MSME registration, project repository, and completion date.",
  },
  {
    q: "Can I get rejected during the eligibility review?",
    a: "Yes. We reject approximately 64% of applicants during our initial screening call. If you have no life-sciences background and are unwilling to complete pre-course preparation, or if your degree timeline does not match partner intake windows, we will tell you frankly and advise alternative preparation paths.",
  },
  {
    q: "Why are there only 60 seats per cohort?",
    a: "We limit each cohort to 60 seats to ensure strict 1:1 project review and match the quarterly intake quota agreed upon with our recruitment partners. Accepting hundreds of students per batch would compromise training quality and destroy our partner desk routing efficiency.",
  },
  {
    q: "How do hiring partners receive candidate profiles?",
    a: "Once you pass our internal benchmark assessment (75/100 threshold), your profile, containing your verified assessment scorecard, capstone project work, and internship certificate, is routed through Arzon's certified partner desk (VMO ID: ENT2026-GLOBAL-VMO026) directly to partner talent acquisition decision-makers.",
  },
  {
    q: "What happens if I fail the internal mock assessment?",
    a: "You get 2 additional retake opportunities included in your enrollment. Our mentors provide a detailed diagnostic report showing your weak areas (e.g., MedDRA coding accuracy, ICSR case narratives, eCRF query management) and assign targeted lab exercises before your retake.",
  },
  {
    q: "Is this a real internship or another online course?",
    a: "Both parts are real and distinct. Weeks 1–8 are live instructor-led classes with graded weekly homework on actual data files. Weeks 9–12 are an applied internship where you work on real pharmacovigilance and healthcare capstone projects with verifiable certificates.",
  },
  {
    q: "Do you guarantee a job?",
    a: "No. Any company that guarantees a job without testing you is deceiving you. We guarantee certified partner-desk submission to Top Healthcare Employers & CROs, fast-track candidate review, and for Executive VIP tier, 3 direct hiring manager profile deliveries.",
  },
];

export function FAQ({ limit }: { limit?: number } = {}) {
  const shouldReduceMotion = useReducedMotion();
  const shown = typeof limit === "number" ? INSTITUTIONAL_FAQS.slice(0, limit) : INSTITUTIONAL_FAQS;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] text-[#1A1A1A] border-b border-stone-300"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <Reveal className="text-center space-y-3">
          <PremiumChip variant="navy" size="md">
            QUICK ANSWERS BEFORE YOU APPLY
          </PremiumChip>
          <h2
            id="faq-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight"
          >
            The questions everyone asks before committing.
          </h2>
        </Reveal>

        {/* shadcn Accordion with BorderBeam hover effect */}
        <Reveal className="rounded-2xl border border-stone-300 bg-white shadow-xs overflow-hidden">
          <Accordion type="single" collapsible defaultValue="item-0">
            {shown.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="relative group border-b border-stone-200 last:border-0 hover:bg-stone-50/60 transition-colors overflow-hidden"
              >
                <BorderBeam
                  colorFrom="#1B3F8B"
                  colorTo="#8A6D1F"
                  duration={18}
                  delay={i * 1.5}
                  borderWidth={1}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <AccordionTrigger className="px-6 py-5 text-left font-serif text-base sm:text-lg font-bold text-[#1A1A1A] leading-snug hover:no-underline [&[data-state=open]]:text-[#1B3F8B] transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0 text-sm text-stone-700 leading-relaxed font-sans border-t border-stone-100">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
