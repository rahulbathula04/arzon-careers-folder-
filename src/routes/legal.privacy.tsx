import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { SITE, ADDRESS_ONE_LINE } from "@/components/landing/constants";

export const Route = createFileRoute("/legal/privacy")({
  head: () => {
    const ps = pageSeo({
      path: "/legal/privacy",
      title: "Privacy Policy & Data Protection · Arzon Global",
      description:
        "Comprehensive privacy policy covering data fiduciary obligations, candidate rights under the Digital Personal Data Protection Act, 2023 (DPDP Act), and data security practices.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Privacy Policy & Data Protection · Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            DPDP Act 2023 Compliant
          </span>
        </div>

        <h1 className="h-display mt-4">Privacy Policy & Candidate Data Protection</h1>
        <p className="mt-2 text-sm text-white/70">
          Last updated: April 2026 · Formulated in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act, India) and the Information Technology Act, 2000.
        </p>

        {/* Commitment Banner */}
        <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5 text-sm text-emerald-100/90 leading-relaxed">
          <p className="font-semibold text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-400" />
            Our Data Fiduciary Commitment
          </p>
          <p className="mt-1.5 text-xs text-slate-300">
            Arzon Global acts as a responsible Data Fiduciary. We process personal data solely for lawful educational, assessment, and career enablement purposes with explicit candidate consent. We strictly prohibit the commercial sale or unauthorized rental of candidate information to third parties.
          </p>
        </div>

        <div className="prose prose-invert mt-10 max-w-none space-y-8 text-sm leading-relaxed text-white/80">
          <Section title="1. Identity of the Data Fiduciary">
            <p>
              The entity responsible for the collection, storage, and processing of your personal data under the DPDP Act is:
            </p>
            <p>
              <strong className="text-white">Arzon Global</strong><br />
              Registered Office: {ADDRESS_ONE_LINE}<br />
              Enterprise Standing: Registered MSME under UDYAM, Government of India<br />
              Email for Privacy Matters: <a href="mailto:privacy@arzonglobal.com" className="text-emerald-300 underline font-semibold">privacy@arzonglobal.com</a>
            </p>
          </Section>

          <Section title="2. Categories of Personal Data Collected">
            <p>We collect only the minimum personal data necessary to provide career intelligence and training services:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Identity & Contact Data:</strong> Name, email address, mobile number, current city, academic institution, and degree background (e.g. B.Pharm, M.Pharm, B.Tech, Life Sciences).</li>
              <li><strong className="text-white">Career Assessment Responses:</strong> Responses submitted during the Career Engine diagnostic and ACRI™ scenario tests, including situational triage choices and clinical coding attempts.</li>
              <li><strong className="text-white">Academic & Enrolment Data:</strong> Cohort selection, capstone project submissions, attendance telemetry, and mentor assessment scores.</li>
              <li><strong className="text-white">Technical Logs:</strong> IP address, device operating system, browser type, and timestamps recorded for cybersecurity defense and fraud prevention.</li>
            </ul>
          </Section>

          <Section title="3. Lawful Grounds & Purpose of Data Processing">
            <p>Your data is processed based on your explicit, informed consent for the following specific purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To evaluate role readiness and generate your personalized Career Engine diagnostic report.</li>
              <li>To administer training cohorts, assign dedicated industry mentors, and review weekly project assignments.</li>
              <li>To verify the authenticity of credentials, digital badges, and ACRI™ scorecards through our open-ledger public verifier.</li>
              <li>To facilitate structured candidate introductions to verified enterprise hiring partners (strictly with candidate opt-in).</li>
            </ul>
          </Section>

          <Section title="4. Absolute Data Protections: What We Never Do">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Zero Data Brokerage:</strong> We never sell, lease, or trade candidate contact numbers, email lists, or resumes to data brokers or third-party advertisers.</li>
              <li><strong className="text-white">No Telemarketing Spam:</strong> We never send automated commercial marketing robocalls or spam SMS. Official updates are sent only via registered WhatsApp business channels and transactional emails.</li>
              <li><strong className="text-white">No Hidden Tracking:</strong> We do not deploy third-party advertising tracking pixels that monitor candidate browsing across unrelated websites.</li>
            </ul>
          </Section>

          <Section title="5. Security Infrastructure & Storage Architecture">
            <p>
              We implement industry-grade technical and organizational safeguards to ensure data integrity:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Encryption:</strong> All data in transit is encrypted using Transport Layer Security (TLS 1.3). Data at rest is encrypted using Advanced Encryption Standard (AES-256).</li>
              <li><strong className="text-white">Database Isolation:</strong> Production databases are secured via granular Row-Level Security (RLS) policies within Supabase infrastructure, ensuring learners can access only their own records.</li>
              <li><strong className="text-white">Access Governance:</strong> Administrative access is restricted to verified personnel via multi-factor authentication (MFA) following least-privilege principles.</li>
            </ul>
          </Section>

          <Section title="6. Your Statutory Rights under DPDP Act 2023">
            <p>As a Data Principal under Indian law, you possess comprehensive statutory rights:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Right to Access:</strong> You can request a summary of the personal data processed by Arzon Global and the identities of any data processors involved.</li>
              <li><strong className="text-white">Right to Correction & Erasure:</strong> You can request the correction of inaccurate details or the complete deletion of your profile and assessment telemetry from our active databases.</li>
              <li><strong className="text-white">Right to Withdraw Consent:</strong> You may withdraw your consent for future data processing at any time by writing to our privacy desk.</li>
              <li><strong className="text-white">Right to Grievance Redressal:</strong> You have the right to register a formal grievance with our designated Grievance Officer regarding any data protection concern.</li>
            </ul>
          </Section>

          <Section title="7. Data Retention & Erasure Policy">
            <p>
              Candidate application and assessment data is retained for the duration of the candidate's active learning lifecycle and for a maximum period of 36 months following certification, to facilitate recruiter credential verification.
            </p>
            <p>
              Upon receipt of a verified deletion request, personal identifying data is permanently scrubbed from production tables within 30 calendar days.
            </p>
          </Section>

          <Section title="8. Privacy Grievance Officer & Contact Information">
            <p>
              For exercising your data rights or escalating privacy inquiries, please contact our designated Data Protection & Grievance Cell:
            </p>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 text-xs font-mono text-slate-300 space-y-1">
              <p><strong className="text-white font-sans">Officer:</strong> Grievance Officer (Data Protection & Privacy)</p>
              <p><strong className="text-white font-sans">Entity:</strong> Arzon Global</p>
              <p><strong className="text-white font-sans">Address:</strong> 1st Floor, S Chandra Reddy Towers, 100 Feet Rd, Madhapur, Hyderabad, Telangana 500081, India</p>
              <p><strong className="text-white font-sans">Email:</strong> privacy@arzonglobal.com / grievance@arzonglobal.com</p>
              <p><strong className="text-white font-sans">Statutory Response Window:</strong> Acknowledged within 48 hours; written determination within 15 working days.</p>
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
