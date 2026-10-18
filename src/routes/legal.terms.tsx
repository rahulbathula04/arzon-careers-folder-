import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft, ShieldCheck, Scale, AlertCircle, Building2 } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { ADDRESS, ADDRESS_ONE_LINE, SITE } from "@/components/landing/constants";

export const Route = createFileRoute("/legal/terms")({
  head: () => {
    const ps = pageSeo({
      path: "/legal/terms",
      title: "Terms of Service · Arzon Global",
      description:
        "Official terms of service governing the use of Arzon Global's website, assessments, and career programmes. Compliant with Indian law and ASCI guidelines.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Terms of Service · Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <Link
          to="/legal"
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Legal & Compliance Hub
        </Link>

        <div className="mt-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-sky-300">
            <Scale className="h-3.5 w-3.5 text-sky-400" />
            Statutory Agreement
          </span>
        </div>

        <h1
          className="h-display text-white mt-4"
          style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
        >
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Last updated: April 2026 · Effective immediately for all visitors, applicants, and enrolled candidates.
        </p>

        {/* Executive Summary Callout */}
        <div className="mt-8 rounded-2xl border border-sky-400/20 bg-sky-500/5 p-5 text-sm text-sky-100/90 leading-relaxed">
          <p className="font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            Executive Summary for Learners
          </p>
          <p className="mt-1.5 text-xs text-slate-300">
            Arzon Global is an independent career intelligence and skill development platform. We provide practical, project-first training on real industry workflows. In compliance with the Advertising Standards Council of India (ASCI), we strictly do not offer "100% job guarantees" or assured placements. Our programmes do not confer statutory university degrees. All third-party trademarks and company names are referenced for nominative identification only.
          </p>
        </div>

        <div className="prose prose-invert mt-10 max-w-none space-y-8 text-sm leading-relaxed text-white/80">
          <Section title="1. Enterprise Identity & Legal Standing">
            <p>
              This website (<code className="text-sky-300">arzoncareers.in</code>) and associated career intelligence tools are owned and operated by{" "}
              <strong className="text-white">Arzon Global</strong> ("Arzon Global", "Arzon", "Enterprise", "we", "us", or "our"), an enterprise registered under the Ministry of Micro, Small and Medium Enterprises (MSME UDYAM), Government of India.
            </p>
            <p>
              <strong className="text-white">Registered Office:</strong> {ADDRESS_ONE_LINE}.<br />
              <strong className="text-white">MSME Registration:</strong> Registered under UDYAM, Ministry of Micro, Small and Medium Enterprises, Govt. of India.<br />
              <strong className="text-white">Quality Framework:</strong> ISO 9001:2015 educational and training delivery framework.
            </p>
          </Section>

          <Section title="2. Acceptance of Terms & Eligibility">
            <p>
              By accessing, browsing, registering on, or utilizing any portion of this website, assessment engines (including ACRI™ and ASSAY™), or enrolment portals, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service, our Privacy Policy, and our Refund & Enrolment Policy.
            </p>
            <p>
              You must be at least 18 years of age, or have the express consent and supervision of a legal guardian, and possess the legal capacity to enter into a binding contract under the Indian Contract Act, 1872.
            </p>
          </Section>

          <Section title="3. Non-Academic / Continuing Professional Education Nature">
            <p>
              Arzon Global provides vocational skill training, industry case study simulations, and career guidance. You explicitly acknowledge and agree that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Arzon Global is NOT a university, degree-granting college, or higher education institution governed by the University Grants Commission (UGC) Act, 1956, or the All India Council for Technical Education (AICTE) Act, 1987.</li>
              <li>Our certificates, including the Arzon Clinical Readiness Index (ACRI™), represent independent verification of practical competency and portfolio completion; they do not constitute formal academic degrees, diplomas, or statutory licenses to practice medicine, pharmacy, or allied healthcare.</li>
            </ul>
          </Section>

          <Section title="4. ASCI Compliance: Strictly No Employment Guarantee">
            <p>
              In strict adherence to the Advertising Standards Council of India (ASCI) Guidelines for Educational Institutions and Programs, Arzon Global explicitly states:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">We do NOT promise or guarantee employment, job offers, minimum salaries, or interview conversions.</strong></li>
              <li>Hiring decisions, interview shortlists, and compensation packages are made exclusively at the discretion of independent third-party employers based on candidate performance, background, and prevailing market demand.</li>
              <li>Placement assistance (where applicable in Career and Elite plans) comprises resume auditing, portfolio presentation guidance, and structured introductions to prospective hiring partners.</li>
            </ul>
          </Section>

          <Section title="5. Third-Party Trademarks & Nominative Fair Use">
            <p>
              This website references various software tools, industry standards, pharmaceutical corporations, and Contract Research Organizations (CROs):
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Standardized Medical Coding® is a registered trademark of the International Federation of Pharmaceutical Manufacturers and Associations (IFPMA).</li>
              <li>Enterprise Safety Database® and Life Sciences Cloud Platforms® are registered trademarks of Oracle Corporation and Enterprise Life Sciences Cloud Providers Inc., respectively.</li>
              <li>SAS® is a registered trademark of SAS Institute Inc., Cary, NC, USA.</li>
              <li>All company names (e.g., IQVIA, Parexel, Novartis, Pfizer, TCS, Cognizant) and logos cited across our research strips, syllabus breakdowns, and JD mirrors are the intellectual property of their respective trademark holders.</li>
              <li>Reference to these trademarks and corporate entities is made strictly under the doctrine of <strong className="text-white">Nominative Fair Use</strong> (pursuant to Section 30 of the Indian Trade Marks Act, 1999) to truthfully identify industry software tools and job-market demand. Such reference does not constitute or imply sponsorship, affiliation, partnership, or endorsement by those entities.</li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property & Learner License">
            <p>
              All curriculum, lecture slides, interactive assessment software, case study datasets, video content, design tokens, and text on this platform are the exclusive intellectual property of Arzon Global and protected by copyright and intellectual property laws of India.
            </p>
            <p>
              Enrolled learners are granted a limited, personal, revocable, non-exclusive, non-transferable license to access course materials solely for individual education and portfolio preparation. You may not record, redistribute, publish, sell, or reverse-engineer any portion of Arzon's intellectual property.
            </p>
          </Section>

          <Section title="7. Enrolment, Seat Reservation Fee & Payments">
            <p>
              Enrolment terms are governed by the signed learner enrolment agreement issued during admission:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The seat reservation fee (₹1,000) reserves a dedicated mentor seat in your selected cohort and is 100% credited against your total programme fee upon full enrolment.</li>
              <li>All payments, seat reservations, module fees, and tuition fees are strictly non-refundable and non-transferable under any circumstances once processed.</li>
              <li>Tuition payments are processed securely via authorized third-party payment gateways (including Razorpay, licensed by the Reserve Bank of India). Arzon does not store complete debit/credit card numbers on its servers.</li>
              <li>All payments are inclusive of applicable Goods and Services Tax (GST) as mandated by the Government of India.</li>
            </ul>
          </Section>

          <Section title="8. Strict No-Refund Policy & Cohort Rollover">
            <p>
              Arzon Global enforces a strict <strong className="text-white">No-Refund Policy</strong> across all programmes, assessment tools, and seat reservations, as detailed in our published{" "}
              <Link to="/refund" className="text-sky-300 underline font-semibold">
                No-Refund &amp; Enrolment Policy
              </Link>
              . Because dedicated mentor bandwidth, simulation laboratory instances, and technical curriculum licenses are allocated immediately upon admission, fees once paid cannot be refunded or cancelled under any circumstances.
            </p>
            <p className="mt-2">
              In the event of documented emergencies or schedule conflicts, learners may request a one-time cohort rollover to a subsequent scheduled batch subject to written notice at least 5 business days prior to cohort commencement. If Arzon Global reschedules a cohort, learner seats are automatically transferred to the confirmed new dates at no additional fee.
            </p>
          </Section>

          <Section title="9. Limitation of Liability & Disclaimers">
            <p>
              To the fullest extent permissible by applicable law, Arzon Global, its directors, officers, mentors, and employees shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of, or inability to use, our platform, educational materials, or career assessment tools.
            </p>
            <p>
              Our services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including fitness for a particular employment objective.
            </p>
          </Section>

          <Section title="10. Governing Law, Jurisdiction & Dispute Resolution">
            <p>
              These Terms of Service and any contractual relationship arising hereunder shall be governed by, construed, and enforced in accordance with the substantive laws of India.
            </p>
            <p>
              Any dispute, claim, or controversy arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent civil courts situated in <strong className="text-white">Hyderabad, Telangana, India</strong>.
            </p>
          </Section>

          <Section title="11. Statutory Grievance Redressal Officer">
            <p>
              In compliance with the Information Technology Act, 2000, and the Consumer Protection (E-Commerce) Rules, 2020, Arzon Global has appointed a designated Grievance Officer:
            </p>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 text-xs font-mono text-slate-300 space-y-1">
              <p><strong className="text-white font-sans">Designation:</strong> Nodal Grievance Officer</p>
              <p><strong className="text-white font-sans">Entity:</strong> Arzon Global</p>
              <p><strong className="text-white font-sans">Address:</strong> 1st Floor, S Chandra Reddy Towers, 100 Feet Rd, Madhapur, Hyderabad, Telangana 500081, India</p>
              <p><strong className="text-white font-sans">Email:</strong> grievance@arzonglobal.com / legal@arzonglobal.com</p>
              <p><strong className="text-white font-sans">Turnaround Time:</strong> Acknowledged within 48 hours; resolved within 15 working days.</p>
            </div>
          </Section>
        </div>
      </article>
      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-bold font-serif text-white tracking-tight border-b border-slate-800 pb-2">
        {title}
      </h2>
      <div className="mt-3 space-y-2 text-sm text-slate-300 font-sans">{children}</div>
    </section>
  );
}
