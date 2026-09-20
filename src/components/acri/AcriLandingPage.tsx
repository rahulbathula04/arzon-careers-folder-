import { useState } from "react";
import { AcriHero } from "./AcriHero";
import { AcriTrustStrip } from "./AcriTrustStrip";
import { AcriProblemSection } from "./AcriProblemSection";
import { AcriAssessmentSteps } from "./AcriAssessmentSteps";
import { AcriInteractiveQuestion } from "./AcriInteractiveQuestion";
import { AcriResultRoadmap } from "./AcriResultRoadmap";
import { AcriAudiencePanels } from "./AcriAudiencePanels";
import { AcriTestimonials } from "./AcriTestimonials";
import { AcriClosingSection } from "./AcriClosingSection";
import {
  SampleReportModal,
  CertificateModal,
  RecruiterModal,
  VideoModal,
} from "./AcriModals";

export function AcriLandingPage() {
  const [sampleReportOpen, setSampleReportOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] antialiased selection:bg-emerald-200 selection:text-emerald-950">
      {/* 1. Hero Section with ACRI Scorecard & Student Visual */}
      <AcriHero onOpenVideo={() => setVideoOpen(true)} />

      {/* 2. Trust Strip with Employer Logos & Standards */}
      <AcriTrustStrip />

      {/* 3. Problem Section: A Degree Doesn't Tell You If You're Ready */}
      <AcriProblemSection />

      {/* 4. How the AI Assessment Works (5-Step Process) */}
      <AcriAssessmentSteps />

      {/* 5. Real Skills. Real Scenarios. (Interactive Question Card) */}
      <AcriInteractiveQuestion />

      {/* 6. Your Result & 12-Week Career Plan */}
      <AcriResultRoadmap onOpenSampleReport={() => setSampleReportOpen(true)} />

      {/* 7. For Students & For Recruiters Audience Panels */}
      <AcriAudiencePanels onOpenRecruiterModal={() => setRecruiterOpen(true)} />

      {/* 8. What Our Students Say (Testimonials) */}
      <AcriTestimonials />

      {/* 9. Final Closing CTA */}
      <AcriClosingSection onOpenVideo={() => setVideoOpen(true)} />

      {/* Interactive Modals */}
      <SampleReportModal
        isOpen={sampleReportOpen}
        onClose={() => setSampleReportOpen(false)}
        onOpenCertificate={() => {
          setSampleReportOpen(false);
          setCertificateOpen(true);
        }}
      />

      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
      />

      <RecruiterModal
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
}
