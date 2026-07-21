import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Plus } from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";

import type { ReactNode } from "react";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Is this a real internship or just another online course?",
    a: (
      <>
        Both. <strong className="font-semibold text-ink">First 8 weeks are live classes</strong>{" "}
        with homework.{" "}
        <strong className="font-semibold text-ink">
          Last 4 weeks you work on real hospital or CRO files.
        </strong>{" "}
        You get a proper internship certificate at the end.
      </>
    ),
  },
  {
    q: "Will the certificate actually help me get a job?",
    a: (
      <>
        Yes. Each certificate has a{" "}
        <strong className="font-semibold text-ink">
          unique ID and a public link recruiters can verify online.
        </strong>{" "}
        It is issued by Arzon Global (ISO 9001 certified, MSME &amp; MCA registered) and is{" "}
        <strong className="font-semibold text-ink">performance-based</strong>, not a participation
        certificate.
      </>
    ),
  },
  {
    q: "I'm in 1st or 2nd year. Can I still join?",
    a: (
      <>
        Yes, <strong className="font-semibold text-ink">best time to start.</strong> Classes run in
        the evening, all sessions are recorded so you don't miss anything during exams.
      </>
    ),
  },
  {
    q: "Do you guarantee a job?",
    a: (
      <>
        <strong className="font-semibold text-ink">No</strong>, and don't trust anyone who does
        (it's against ASCI rules). What we promise:{" "}
        <strong className="font-semibold text-ink">
          real interview practice, a fixed CV, and intros to our hiring partners.
        </strong>
      </>
    ),
  },
  {
    q: "How is this different from YouTube or Udemy?",
    a: (
      <>
        <strong className="font-semibold text-ink">
          Live mentors who actually work in the industry.
        </strong>{" "}
        Real medical files to practice on. ISO-certified, performance-based certificate. A
        counsellor you can call.
      </>
    ),
  },
  {
    q: "How do I pay the fee?",
    a: (
      <>
        <strong className="font-semibold text-ink">One-time.</strong> Take the 3-min fit test first,
        the seat-confirmation step (refundable, fully adjusted in your fee) is shown after your
        result. <strong className="font-semibold text-ink">We do not offer EMI</strong>: education
        fees can't legally be financed that way and we're not going to pretend otherwise.
      </>
    ),
  },
  {
    q: "What if I don't get an interview after the programme?",
    a: (
      <>
        If you complete the programme with{" "}
        <strong className="font-semibold text-ink">grade B+</strong> and don't get an interview in
        90 days, we extend{" "}
        <strong className="font-semibold text-ink">
          free placement support for 6 more months.
        </strong>
      </>
    ),
  },
  {
    q: "How big are the batches?",
    a: (
      <>
        <strong className="font-semibold text-ink">Maximum 60 students per batch.</strong> Mentor
        sees you in groups of <strong className="font-semibold text-ink">under 15</strong>, so you
        actually get attention.
      </>
    ),
  },
];

export function FAQ({ limit }: { limit?: number } = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const shown = typeof limit === "number" ? faqs.slice(0, limit) : faqs;
  return (
    <Section id="faq" size="lg" containerSize="md">
      <SectionHeader
        eyebrow="Students keep asking us…"
        title={<>Quick answers before you apply.</>}
      />
      <div className="mt-8 divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-white shadow-sm md:mt-12">
        {shown.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={isOpen ? "bg-[#F7FAFF]" : "bg-white"}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-[60px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-[#F7FAFF] focus-visible:bg-[#F7FAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2]/35 sm:gap-6 sm:px-6"
                aria-expanded={isOpen}
              >
                <span className="font-grotesk text-body-sm font-semibold leading-snug text-ink sm:text-base">
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className={`faq-chevron-ease mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 ${
                    isOpen
                      ? "bg-[#0056D2] text-slate-50 ring-[#0056D2] rotate-45"
                      : "bg-[#EAF2FF] text-[#0056D2] ring-[#0056D2]/20 group-hover:bg-[#dceaff] group-hover:ring-[#0056D2]/35"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-6 text-sm leading-relaxed text-[#1e3a5f] motion-safe:animate-fade-in sm:px-6 sm:pr-16">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-ink-soft">
        Got another question?{" "}
        <WhatsAppLink
          source="faq_footer"
          message="Hi Arzon, I have a question about the programme."
          className="font-semibold text-[#0056D2] hover:underline"
        >
          Message us on WhatsApp →
        </WhatsAppLink>
      </p>
    </Section>
  );
}
