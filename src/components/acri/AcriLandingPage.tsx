import { useState, useEffect } from "react";
import { AcriHero } from "./AcriHero";
import { AcriProblemSection } from "./AcriProblemSection";
import { AcriRoleSelection } from "./AcriRoleSelection";
import { AcriAssessmentSteps } from "./AcriAssessmentSteps";
import { AcriCompetenciesGrid } from "./AcriCompetenciesGrid";
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
import { AcriCandidateModal } from "./landing/AcriCandidateModal";

export function AcriLandingPage() {
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  const [sampleReportOpen, setSampleReportOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("apply") === "true" || params.get("apply") === "1") {
        setCandidateModalOpen(true);
      }
    }
    const handleOpen = () => setCandidateModalOpen(true);
    window.addEventListener("arzon:open-acri-modal", handleOpen);
    return () => window.removeEventListener("arzon:open-acri-modal", handleOpen);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] antialiased selection:bg-[#E8F7F1] selection:text-[#005B4F]">
      {/* 01. Hero Section: Turn Your Degree Into a Healthcare Career */}
      <AcriHero
        onOpenVideo={() => setVideoOpen(true)}
        onApplyClick={() => setCandidateModalOpen(true)}
      />

      {/* 02. Problem & Pipeline: A Degree Tells What You Studied, Not What You Can Do */}
      <AcriProblemSection />

      {/* 03. Multi-Role Selection: Which Healthcare Career Are You Preparing For? (6 In-Demand Paths) */}
      <AcriRoleSelection />

      {/* 04. How It Works: From Assessment to a Clear Career Path (5-Step Progression) */}
      <AcriAssessmentSteps />

      {/* 05. 9 Competencies That Define Pharmacovigilance Readiness (Editorial Grid with Real Photography) */}
      <AcriCompetenciesGrid />

      {/* 06. Sample Assessment Experience: Live Clinical Simulation Widget */}
      <AcriInteractiveQuestion />

      {/* 07. Result Preview: Your Result. A Clear Roadmap (82/100 Industry Ready Scorecard) */}
      <AcriResultRoadmap onOpenSampleReport={() => setSampleReportOpen(true)} />

      {/* 08. Verified Student Outcomes: What Our Students Say (Real Cases at IQVIA, Novartis, Parexel) */}
      <AcriTestimonials />

      {/* 09. Employer Section: Hire Verified, Job-Ready Talent */}
      <AcriAudiencePanels onOpenRecruiterModal={() => setRecruiterOpen(true)} />

      {/* 10. Final Closing CTA: Ready to Find Out Where You Stand? */}
      <AcriClosingSection
        onOpenVideo={() => setVideoOpen(true)}
        onApplyClick={() => setCandidateModalOpen(true)}
      />

      {/* Global Interactive Modals */}
      <AcriCandidateModal
        isOpen={candidateModalOpen}
        onClose={() => setCandidateModalOpen(false)}
      />

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
