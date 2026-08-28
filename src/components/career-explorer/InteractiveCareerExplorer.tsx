import React, { useState } from "react";
import { HealthcareDegree, CareerPath } from "@/data/healthcareTaxonomy";
import { DegreeSelector } from "./DegreeSelector";
import { IntentSelector } from "./IntentSelector";
import { CareerMap } from "./CareerMap";
import { CareerDetailInspector } from "@/components/landing/CareerDetailInspector";
import { JobMatchEngine } from "./JobMatchEngine";
import { PersonalSkillGapBlock } from "./PersonalSkillGapBlock";
import { ContextualProgressTracker } from "./ContextualProgressTracker";
import { MyCareerContextBar } from "./MyCareerContextBar";
import { trackPQAEvent } from "@/lib/pqa";

interface InteractiveCareerExplorerProps {
  selectedDegree: HealthcareDegree | null;
  onSelectDegree: (degree: HealthcareDegree) => void;
  onWhatsAppStepReached: () => void;
}

export const InteractiveCareerExplorer: React.FC<InteractiveCareerExplorerProps> = ({
  selectedDegree,
  onSelectDegree,
  onWhatsAppStepReached,
}) => {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [jobMatchScore, setJobMatchScore] = useState<number | null>(null);
  const [matchGaps, setMatchGaps] = useState<string[]>([]);
  const [exploredCount, setExploredCount] = useState<number>(0);
  const [savedCareers, setSavedCareers] = useState<string[]>([]);

  const handleSelectDegree = (degree: HealthcareDegree) => {
    onSelectDegree(degree);
    trackPQAEvent("DEGREE_SELECTED");
  };

  const handleSelectIntent = (intentId: string) => {
    setSelectedIntent(intentId);
    trackPQAEvent("INTENT_SELECTED");
  };

  const handleExploreCareer = (career: CareerPath) => {
    setSelectedCareer(career);
    setIsInspectorOpen(true);
    setExploredCount((prev) => prev + 1);
    trackPQAEvent("CAREER_EXPLORED");
  };

  // JobMatchEngine now passes both score AND role-specific gaps
  const handleMatchComplete = (score: number, gaps: string[]) => {
    setJobMatchScore(score);
    setMatchGaps(gaps);
    trackPQAEvent("MATCH_CALCULATED");
    trackPQAEvent("SKILL_GAP_VIEWED");
  };

  const handleTryAssay = () => {
    // Re-open the inspector on the ASSAY tab if a career is selected
    if (selectedCareer) {
      setIsInspectorOpen(true);
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#070D1B] border-t border-b border-slate-800/80 tone-dark text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Contextual Progress Tracker */}
        <ContextualProgressTracker
          hasDegree={!!selectedDegree}
          hasIntent={!!selectedIntent}
          hasExplored={exploredCount > 0}
          hasMatch={jobMatchScore !== null}
          hasWhatsApp={false}
        />

        {/* Step 1: Degree Selection */}
        <DegreeSelector
          selectedDegreeId={selectedDegree?.id || null}
          onSelectDegree={handleSelectDegree}
        />

        {/* Step 2: Intent Personalization */}
        {selectedDegree && (
          <IntentSelector
            degreeName={selectedDegree.name}
            selectedIntentId={selectedIntent}
            onSelectIntent={handleSelectIntent}
          />
        )}

        {/* Step 3: Career Map Grid */}
        {selectedDegree && selectedIntent && (
          <CareerMap
            degreeName={selectedDegree.shortName}
            onExploreCareer={handleExploreCareer}
          />
        )}

        {/* Step 4: Job Match Engine (shows after first career explored) */}
        {selectedCareer && (
          <div className="pt-6">
            <JobMatchEngine
              degreeName={selectedDegree?.shortName || "B.Pharm"}
              selectedRoleTitle={selectedCareer.title}
              onMatchComplete={handleMatchComplete}
            />
          </div>
        )}

        {/* Step 5: Role-Specific Skill Gap + ASSAY CTA */}
        {jobMatchScore !== null && selectedCareer && (
          <div className="pt-6">
            <PersonalSkillGapBlock
              targetRoleTitle={selectedCareer.title}
              priorityGaps={matchGaps}
              onContinueToWhatsApp={onWhatsAppStepReached}
              onTryAssay={handleTryAssay}
            />
          </div>
        )}
      </div>

      {/* Persistent My Career Context Bar */}
      <MyCareerContextBar
        selectedDegreeName={selectedDegree?.shortName || null}
        exploredCount={exploredCount}
        savedCount={savedCareers.length}
        jobsViewedCount={exploredCount * 5}
        onOpenShortlist={() => setIsInspectorOpen(true)}
      />

      {/* Career Detail Drawer — includes ASSAY tab */}
      <CareerDetailInspector
        careerName={isInspectorOpen ? selectedCareer?.title || "Pharmacovigilance" : null}
        onClose={() => setIsInspectorOpen(false)}
        onAdvisorClick={() => {}}
      />
    </section>
  );
};
