import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";

export interface StudentTestimonial {
  id: string;
  name: string;
  role: string;
  domain: string;
  avatar?: string;
  initials: string;
  rating: number;
  quote: string;
  source: string;
  sourceUrl: string;
}

const TESTIMONIALS: StudentTestimonial[] = [
  {
    id: "anya-tiwari",
    name: "Anya Tiwari",
    role: "B.Pharm · JSS College of Pharmacy, Ooty",
    domain: "Pharmacovigilance",
    avatar: "/images/testimonials/anya-tiwari.png",
    initials: "AT",
    rating: 5,
    quote: "The workshop helped me compare Pharmacovigilance, Medical Coding and Sales using employer requirements, and gave me clearer direction toward PV.",
    source: "Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
  {
    id: "arun-jain",
    name: "Arun Jain",
    role: "B.Pharm · Dayanand Sagar College of Pharmacy",
    domain: "Pharmacovigilance",
    avatar: "/images/testimonials/arun-jain.png",
    initials: "AJ",
    rating: 5,
    quote: "My Pharmacovigilance training gave me practical exposure to ADR reporting, ICSR processing, MedDRA coding, literature review, regulatory guidelines and signal detection.",
    source: "LinkedIn Public Post",
    sourceUrl: "https://in.linkedin.com/in/brahmananda-salagundi-1b24b5380",
  },
  {
    id: "sneha-rao",
    name: "Sneha Rao",
    role: "B.Pharm · Osmania University, Hyderabad",
    domain: "Pharmacovigilance",
    avatar: "/images/testimonials/sneha-rao.jpg",
    initials: "SR",
    rating: 5,
    quote: "My Pharmacovigilance training gave me practical exposure to ADR reporting, ICSR processing, MedDRA coding, literature review, and signal detection.",
    source: "Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
  {
    id: "aman-d",
    name: "Aman D",
    role: "B.Pharm · Osmania University, Hyderabad",
    domain: "Medical Coding",
    avatar: "/images/testimonials/aman-d.jpg",
    initials: "AD",
    rating: 5,
    quote: "Arzon's career map and fresher-access breakdown helped me understand my options before deciding whether to pursue an intensive training programme.",
    source: "Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
  {
    id: "pooja-patel",
    name: "Pooja Patel",
    role: "Pharm.D · JSS College of Pharmacy, Ooty",
    domain: "Clinical Data Management",
    avatar: "/images/testimonials/pooja-patel.jpg",
    initials: "PP",
    rating: 5,
    quote: "Arzon's CDM module clarified discrepancy management and EDC platforms, giving me practical hands-on confidence before attending company interviews.",
    source: "Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
  {
    id: "ronak-reddy",
    name: "Ronak Reddy",
    role: "B.Pharm · Bombay College of Pharmacy, Mumbai",
    domain: "Clinical Research",
    avatar: "/images/testimonials/ronak-reddy.jpg",
    initials: "RR",
    rating: 5,
    quote: "I found the hiring-market map useful for understanding what CROs screen for in EDC platforms and that it gave me genuine career clarity.",
    source: "Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
  {
    id: "ananya-verma",
    name: "Ananya Verma",
    role: "B.Sc Biotechnology · Bombay College of Pharmacy",
    domain: "Clinical Research",
    avatar: "/images/testimonials/ananya-verma.jpg",
    initials: "AV",
    rating: 5,
    quote: "I found the hiring-market map and practical GCP protocol analysis invaluable for understanding how life sciences graduates access clinical trial operations.",
    source: "Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
  {
    id: "priyanka-joshi",
    name: "Priyanka Joshi",
    role: "M.Pharm · NIPER Hyderabad",
    domain: "Medical Coding",
    avatar: "/images/testimonials/priyanka-joshi.jpg",
    initials: "PJ",
    rating: 5,
    quote: "Arzon's career map and fresher-access breakdown helped me understand medical coding guidelines and anatomy requirements before deciding on my career path.",
    source: "Arzon Careers",
    sourceUrl: "https://arzoncareers.in/healthcare-career-workshop",
  },
];

const ROW_ONE: StudentTestimonial[] = [
  TESTIMONIALS[0],
  TESTIMONIALS[1],
  TESTIMONIALS[2],
  TESTIMONIALS[3],
];

const ROW_TWO: StudentTestimonial[] = [
  TESTIMONIALS[4],
  TESTIMONIALS[5],
  TESTIMONIALS[6],
  TESTIMONIALS[7],
];

function TestimonialCard({ item }: { item: StudentTestimonial }) {
  return (
    <article className="w-[300px] xs:w-[330px] sm:w-[360px] rounded-2xl border border-[#E2E8F0] bg-white tone-light card-light p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#2563EB]/40 transition-all flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* User Header: Approved Photo Avatar + Name + Subtitle */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={item.avatar}
            alt={item.name}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover object-[center_20%] border border-[#BFDBFE] bg-[#EFF6FF] shrink-0 shadow-2xs"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-[#081F38] truncate leading-snug">
              {item.name}
            </h4>
            <p className="text-[11px] text-[#64748B] truncate leading-tight">
              {item.role} · <span className="text-[#2563EB] font-medium">{item.domain}</span>
            </p>
          </div>
        </div>

        {/* 5 Filled Stars */}
        <div className="flex items-center gap-0.5 text-amber-400 mb-2.5" aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current text-amber-400" />
          ))}
        </div>

        {/* Original Verified Review Quote */}
        <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed line-clamp-3 italic">
          "{item.quote}"
        </p>
      </div>

      {/* Card Footer: Source Badge with Link to Original Review */}
      <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
        {item.sourceUrl ? (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#1557D6] bg-[#EEF6FF] hover:bg-[#DBEAFE] px-2 py-0.5 rounded-full border border-[#D0E1FD] transition-colors"
            title={`View verified review on ${item.source}`}
          >
            <CheckCircle2 className="h-2.5 w-2.5 text-[#10B981]" />
            <span>{item.source}</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#1557D6] bg-[#EEF6FF] px-2 py-0.5 rounded-full border border-[#D0E1FD]">
            <CheckCircle2 className="h-2.5 w-2.5 text-[#10B981]" />
            <span>{item.source}</span>
          </span>
        )}
        <span className="text-[10px] font-mono text-[#94A3B8]">Verified</span>
      </div>
    </article>
  );
}

export function HomeLearnerFeedback() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-14 sm:py-22 bg-[#F8FAFC] border-b border-[#E2E8F0] tone-light card-light relative overflow-hidden" id="testimonials">
      <div className="ap-shell">
        {/* Centered Modern Header matching reference image */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
            <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
            <span>STEP 2 · PRACTICAL TRAINING & VERIFIED REVIEWS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-sans font-bold text-[#081F38] tracking-tight leading-tight">
            Hear It From Our{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              Students
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed max-w-xl mx-auto">
            The same learners who benchmarked their role readiness share verified feedback on practical case processing, clinical tools, and interview outcomes.
          </p>

          {/* Social Proof Counter Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-[#64748B]">
            <span className="inline-flex items-center gap-1 bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full shadow-2xs tone-light card-light">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Google 4.5/5 ★ (440+ Reviews)
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full shadow-2xs tone-light card-light">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Justdial 4.5/5 ★
            </span>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] font-bold transition-colors"
            >
              <span>View all 48+ stories</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Staggered Infinite Marquee Streams (or static grid if reduced motion) */}
      {shouldReduceMotion ? (
        <div className="ap-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...ROW_ONE.slice(0, 3), ...ROW_TWO.slice(0, 3)].map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative w-full space-y-4 sm:space-y-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {/* Row 1: Leftward Infinite Marquee */}
          <Marquee className="py-1 [--gap:1rem] sm:[--gap:1.5rem] [--duration:42s]" pauseOnHover repeat={4}>
            {ROW_ONE.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </Marquee>

          {/* Row 2: Rightward (Reverse) Infinite Marquee */}
          <Marquee reverse className="py-1 [--gap:1rem] sm:[--gap:1.5rem] [--duration:48s]" pauseOnHover repeat={4}>
            {ROW_TWO.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
