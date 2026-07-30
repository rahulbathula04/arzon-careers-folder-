# Typography offenders report

Generated: 2026-07-27T02:58:22.407Z
Total: **916** ad-hoc usages across **237** files

## Allowed semantic utilities (from `src/styles.css`)

`text-display` · `text-h1` · `text-h2` · `text-h3` · `text-h4` · `text-body-lg` · `text-body` · `text-body-sm` · `text-caption` · `text-overline` · `text-meta` · `text-micro`

## Summary by category

| Category | Count |
| --- | ---: |
| raw tracking-[…] | 529 |
| raw text-[Npx|rem] | 191 |
| ad-hoc text-Nxl | 190 |
| raw leading-[…] | 6 |

## Offenders

| File | Line | Current class | Suggested token |
| --- | ---: | --- | --- |
| `src\components\Prime60Countdown.tsx` | 35 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\Prime60WaitlistForm.tsx` | 56 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\Prime60WaitlistForm.tsx` | 57 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\briefing\BriefingPackForm.tsx` | 156 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\briefing\BriefingPackForm.tsx` | 213 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\AcriRings.tsx` | 128 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\AcriRings.tsx` | 132 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\AdaptiveWhisper.tsx` | 29 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\ResultConversionStrip.tsx` | 33 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\ResultConversionStrip.tsx` | 90 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\RevealStage.tsx` | 34 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\SectionInterstitial.tsx` | 39 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\cards\primitives.tsx` | 24 | `tracking-[0.32em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\cards\primitives.tsx` | 31 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\cards\primitives.tsx` | 73 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\AiCareerCoachWidget.tsx` | 60 | `text-[10px]` | `text-micro` |
| `src\components\career\report\AiCareerCoachWidget.tsx` | 65 | `text-[10px]` | `text-micro` |
| `src\components\career\report\BandMeter.tsx` | 31 | `text-[64px]` | `text-display ~ closest` |
| `src\components\career\report\BandMeter.tsx` | 31 | `sm:text-[88px]` | `text-display ~ closest` |
| `src\components\career\report\BandMeter.tsx` | 31 | `leading-[0.9]` | `drop - semantic text-* utilities ship line-height` |
| `src\components\career\report\BandMeter.tsx` | 32 | `text-[52px]` | `text-display ~ closest` |
| `src\components\career\report\BandMeter.tsx` | 32 | `sm:text-[72px]` | `text-display` |
| `src\components\career\report\BandMeter.tsx` | 32 | `leading-[0.9]` | `drop - semantic text-* utilities ship line-height` |
| `src\components\career\report\BandMeter.tsx` | 45 | `text-[11px]` | `text-micro` |
| `src\components\career\report\BandMeter.tsx` | 45 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\BandMeter.tsx` | 77 | `text-[10px]` | `text-micro` |
| `src\components\career\report\BandMeter.tsx` | 77 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\BookingDetailsDialog.tsx` | 99 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\BookingDetailsDialog.tsx` | 114 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\BookingDetailsDialog.tsx` | 146 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CareerFitReportV3.tsx` | 204 | `text-xl` | `text-h4` |
| `src\components\career\report\ConfidenceBadge.tsx` | 72 | `text-[10px]` | `text-micro` |
| `src\components\career\report\ConfidenceBadge.tsx` | 72 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 445 | `text-xl` | `text-h4` |
| `src\components\career\report\CounsellorScheduler.tsx` | 500 | `text-[11px]` | `text-micro` |
| `src\components\career\report\CounsellorScheduler.tsx` | 500 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 509 | `text-[10px]` | `text-micro` |
| `src\components\career\report\CounsellorScheduler.tsx` | 509 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 515 | `text-[10px]` | `text-micro` |
| `src\components\career\report\CounsellorScheduler.tsx` | 515 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 521 | `text-[10px]` | `text-micro` |
| `src\components\career\report\CounsellorScheduler.tsx` | 521 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 631 | `text-[11px]` | `text-micro` |
| `src\components\career\report\CounsellorScheduler.tsx` | 638 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 657 | `text-[10px]` | `text-micro` |
| `src\components\career\report\CounsellorScheduler.tsx` | 657 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 667 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 691 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 704 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\CounsellorScheduler.tsx` | 760 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\EmployerTracker.tsx` | 39 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\EmployerTracker.tsx` | 186 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\EmployerTracker.tsx` | 221 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\EmployerTracker.tsx` | 303 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\EvidenceExplorerModal.tsx` | 57 | `text-xl` | `text-h4` |
| `src\components\career\report\EvidenceExplorerModal.tsx` | 72 | `text-[10px]` | `text-micro` |
| `src\components\career\report\EvidenceExplorerModal.tsx` | 112 | `text-[10px]` | `text-micro` |
| `src\components\career\report\EvidenceExplorerModal.tsx` | 176 | `text-[10px]` | `text-micro` |
| `src\components\career\report\EvidenceExplorerModal.tsx` | 182 | `text-[10px]` | `text-micro` |
| `src\components\career\report\EvidenceExplorerModal.tsx` | 193 | `text-[10px]` | `text-micro` |
| `src\components\career\report\HeroSnapshot.tsx` | 84 | `text-3xl` | `text-h2` |
| `src\components\career\report\HeroSnapshot.tsx` | 84 | `sm:text-4xl` | `text-h1` |
| `src\components\career\report\HeroSnapshot.tsx` | 84 | `lg:text-5xl` | `text-display` |
| `src\components\career\report\HeroSnapshot.tsx` | 103 | `text-xl` | `text-h4` |
| `src\components\career\report\HeroSnapshot.tsx` | 134 | `text-2xl` | `text-h3` |
| `src\components\career\report\HeroSnapshot.tsx` | 141 | `text-2xl` | `text-h3` |
| `src\components\career\report\HeroSnapshot.tsx` | 150 | `text-2xl` | `text-h3` |
| `src\components\career\report\HeroSnapshot.tsx` | 157 | `text-2xl` | `text-h3` |
| `src\components\career\report\JDOverlapBar.tsx` | 19 | `text-[10px]` | `text-micro` |
| `src\components\career\report\JDOverlapBar.tsx` | 19 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\LeftChapterRail.tsx` | 46 | `text-[10px]` | `text-micro` |
| `src\components\career\report\LeftChapterRail.tsx` | 93 | `text-[11px]` | `text-micro` |
| `src\components\career\report\LeftChapterRail.tsx` | 120 | `text-[10px]` | `text-micro` |
| `src\components\career\report\LeftChapterRail.tsx` | 144 | `text-[10px]` | `text-micro` |
| `src\components\career\report\NextStepCta.tsx` | 21 | `text-3xl` | `text-h2` |
| `src\components\career\report\NextStepCta.tsx` | 21 | `sm:text-4xl` | `text-h1` |
| `src\components\career\report\RecruiterInsights.tsx` | 126 | `text-[10px]` | `text-micro` |
| `src\components\career\report\RecruiterInsights.tsx` | 126 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\RecruiterInsights.tsx` | 142 | `text-[10px]` | `text-micro` |
| `src\components\career\report\RecruiterInsights.tsx` | 142 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\RecruiterInsights.tsx` | 155 | `text-[10px]` | `text-micro` |
| `src\components\career\report\RecruiterInsights.tsx` | 155 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\RecruiterInsights.tsx` | 166 | `text-[11px]` | `text-micro` |
| `src\components\career\report\ReportCard.tsx` | 118 | `text-2xl` | `text-h3` |
| `src\components\career\report\ReportCard.tsx` | 118 | `sm:text-3xl` | `text-h2` |
| `src\components\career\report\ReportCard.tsx` | 118 | `lg:text-4xl` | `text-h1` |
| `src\components\career\report\ReportFreshnessBadge.tsx` | 16 | `text-[10px]` | `text-micro` |
| `src\components\career\report\ReportFreshnessBadge.tsx` | 16 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\ResumeBanner.tsx` | 42 | `text-[10px]` | `text-micro` |
| `src\components\career\report\ResumeBanner.tsx` | 48 | `text-[10px]` | `text-micro` |
| `src\components\career\report\ResumeBanner.tsx` | 48 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\RoleFitQuiz.tsx` | 94 | `text-xl` | `text-h4` |
| `src\components\career\report\RoleFitQuiz.tsx` | 105 | `text-[10px]` | `text-micro` |
| `src\components\career\report\RoleFitQuiz.tsx` | 131 | `text-[10px]` | `text-micro` |
| `src\components\career\report\RoleFitQuiz.tsx` | 154 | `text-[10px]` | `text-micro` |
| `src\components\career\report\ScoreChip.tsx` | 49 | `text-4xl` | `text-h1` |
| `src\components\career\report\ScoreChip.tsx` | 49 | `sm:text-5xl` | `text-display` |
| `src\components\career\report\ScoreChip.tsx` | 49 | `text-2xl` | `text-h3` |
| `src\components\career\report\ScoreChip.tsx` | 49 | `sm:text-3xl` | `text-h2` |
| `src\components\career\report\ScoreChip.tsx` | 98 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\career\report\ScoreChip.tsx` | 104 | `text-[10px]` | `text-micro` |
| `src\components\career\report\SectionRail.tsx` | 42 | `text-[10px]` | `text-micro` |
| `src\components\career\report\SectionRail.tsx` | 42 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\SectionRail.tsx` | 46 | `text-[10px]` | `text-micro` |
| `src\components\career\report\SectionRail.tsx` | 77 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\career\report\SkillRadarChart.tsx` | 66 | `text-2xl` | `text-h3` |
| `src\components\career\report\SkillRadarChart.tsx` | 76 | `text-3xl` | `text-h2` |
| `src\components\career\report\SourceTag.tsx` | 33 | `text-[10px]` | `text-micro` |
| `src\components\career\report\SourceTag.tsx` | 33 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\SourceTag.tsx` | 49 | `text-[10px]` | `text-micro` |
| `src\components\career\report\SourceTag.tsx` | 49 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\SourceTag.tsx` | 86 | `text-[10px]` | `text-micro` |
| `src\components\career\report\SourceTag.tsx` | 86 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\StickyProgressRail.tsx` | 86 | `text-[12px]` | `text-meta` |
| `src\components\career\report\StickyProgressRail.tsx` | 90 | `text-[9.5px]` | `text-micro ~ closest` |
| `src\components\career\report\StickyProgressRail.tsx` | 111 | `text-[12px]` | `text-meta` |
| `src\components\career\report\chapters\00bMethodology.tsx` | 88 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\01bFitBreakdown.tsx` | 178 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\01bFitBreakdown.tsx` | 186 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\01bFitBreakdown.tsx` | 194 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\01bFitBreakdown.tsx` | 203 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\01bFitBreakdown.tsx` | 219 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\01bFitBreakdown.tsx` | 230 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 72 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 72 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 81 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 81 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 91 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 91 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 149 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 149 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 156 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\02ThreeNumbers.tsx` | 156 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\05DecisionHelper.tsx` | 152 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\05DecisionHelper.tsx` | 263 | `text-xl` | `text-h4` |
| `src\components\career\report\chapters\06SkillGapRadar.tsx` | 232 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\08SevenDays.tsx` | 96 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\08SevenDays.tsx` | 96 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08SevenDays.tsx` | 138 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\08SevenDays.tsx` | 138 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 240 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 256 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 256 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 274 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 420 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 430 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 430 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 445 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 445 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 461 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 461 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\08aActionPlan.tsx` | 609 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\10Tools.tsx` | 81 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\11First90Days.tsx` | 142 | `text-[11px]` | `text-micro` |
| `src\components\career\report\chapters\11First90Days.tsx` | 223 | `text-[11px]` | `text-micro` |
| `src\components\career\report\chapters\11First90Days.tsx` | 228 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\15AiOutlook.tsx` | 25 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\15AiOutlook.tsx` | 25 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\15AiOutlook.tsx` | 41 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\15AiOutlook.tsx` | 56 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\15AiOutlook.tsx` | 56 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\report\chapters\16Cities.tsx` | 83 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\16Cities.tsx` | 92 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\17InterviewReality.tsx` | 62 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\17InterviewReality.tsx` | 72 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\18Pivots.tsx` | 22 | `text-[10px]` | `text-micro` |
| `src\components\career\report\chapters\18Pivots.tsx` | 22 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\CareerFitReport.tsx` | 100 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\CareerFitReport.tsx` | 118 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\CareerFitReport.tsx` | 136 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\CareerFitReport.tsx` | 166 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\CareerFitReport.tsx` | 196 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 90 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 183 | `text-[10px]` | `text-micro` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 183 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 188 | `text-5xl` | `text-display` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 197 | `text-[10px]` | `text-micro` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 197 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 209 | `text-[10px]` | `text-micro` |
| `src\components\career\v2\EmployabilityTriad.tsx` | 209 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\EvidenceLedger.tsx` | 23 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\EvidenceLedger.tsx` | 31 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\EvidenceLedger.tsx` | 47 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\IndiaMarketPanel.tsx` | 68 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\IndiaMarketPanel.tsx` | 79 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\IndiaMarketPanel.tsx` | 103 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\IndiaMarketPanel.tsx` | 122 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\MethodologyFold.tsx` | 14 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\MethodologyFold.tsx` | 17 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\MethodologyFold.tsx` | 20 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 106 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 112 | `sm:text-xl` | `text-h4` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 169 | `text-[10px]` | `text-micro` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 169 | `tracking-[0.12em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 181 | `text-[11px]` | `text-micro` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 222 | `text-[10px]` | `text-micro` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 222 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\PercentileBenchmark.tsx` | 247 | `text-[10px]` | `text-micro` |
| `src\components\career\v2\PrimaryFit.tsx` | 43 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\PrimaryFit.tsx` | 53 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\PrimaryFit.tsx` | 72 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\PrimaryFit.tsx` | 156 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\ResultNextStepCard.tsx` | 22 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\ResultNextStepCard.tsx` | 25 | `text-2xl` | `text-h3` |
| `src\components\career\v2\ResultNextStepCard.tsx` | 33 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\ResultNextStepCard.tsx` | 36 | `text-xl` | `text-h4` |
| `src\components\career\v2\RoleLadder.tsx` | 39 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 69 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 74 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 82 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 134 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 152 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 185 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 196 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 211 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RoleLadder.tsx` | 244 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RuledOutCard.tsx` | 19 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\RuledOutCard.tsx` | 38 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\SevenDayPlan.tsx` | 65 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\SevenDayPlan.tsx` | 93 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\SevenDayPlan.tsx` | 115 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\StickyResultCta.tsx` | 67 | `text-[10px]` | `text-micro` |
| `src\components\career\v2\VerdictHeader.tsx` | 26 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\career\v2\VerdictHeader.tsx` | 44 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\common\TaskLogo.tsx` | 23 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\Certificate.tsx` | 56 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\ConversionSection.tsx` | 50 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\ConversionSection.tsx` | 60 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\ConversionSection.tsx` | 65 | `lg:text-[44px]` | `text-display ~ closest` |
| `src\components\courses\CourseCard.tsx` | 62 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseCard.tsx` | 74 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseCard.tsx` | 93 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseCard.tsx` | 102 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseHero.tsx` | 106 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseHero.tsx` | 112 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseHero.tsx` | 140 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseHero.tsx` | 155 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\CourseHero.tsx` | 192 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\DeploymentReadyBlock.tsx` | 36 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\DeploymentReadyBlock.tsx` | 67 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\DeploymentReadyBlock.tsx` | 91 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\DeploymentReadyBlock.tsx` | 121 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\DeploymentReadyBlock.tsx` | 151 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\EnquiryDrawer.tsx` | 44 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\EnquiryForm.tsx` | 190 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\EnquiryForm.tsx` | 260 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\EnrolmentRail.tsx` | 16 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\JDInsights.tsx` | 25 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\MentorCard.tsx` | 23 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\RecruiterQuoteStrip.tsx` | 29 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\SamplePreview.tsx` | 15 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\SamplePreview.tsx` | 27 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\SamplePreview.tsx` | 48 | `tracking-[0.3em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\SyllabusAccordion.tsx` | 38 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\SyllabusAccordion.tsx` | 64 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\ToolsYouTouchStrip.tsx` | 32 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\ToolsYouTouchStrip.tsx` | 39 | `text-[13.5px]` | `text-caption ~ closest` |
| `src\components\courses\ToolsYouTouchStrip.tsx` | 53 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\ToolsYouTouchStrip.tsx` | 67 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\ToolsYouTouchStrip.tsx` | 74 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\TrustBar.tsx` | 22 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\FinalCtaBand.tsx` | 36 | `text-2xl` | `text-h3` |
| `src\components\courses\sections\FinalCtaBand.tsx` | 36 | `sm:text-4xl` | `text-h1` |
| `src\components\courses\sections\HowItWorksTimeline.tsx` | 36 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\HowItWorksTimeline.tsx` | 54 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\OutcomeBlock.tsx` | 72 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\OutcomeBlock.tsx` | 88 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\OutcomeBlock.tsx` | 124 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\ProblemBlock.tsx` | 36 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\ProblemBlock.tsx` | 61 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\ProofBlock.tsx` | 43 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\RiskReversalBlock.tsx` | 147 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\RiskReversalBlock.tsx` | 178 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\RiskReversalBlock.tsx` | 200 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\SolutionBlock.tsx` | 65 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\TrustRibbon.tsx` | 45 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\courses\sections\UrgencyBlock.tsx` | 59 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\credibility\JDMirror.tsx` | 73 | `text-[11px]` | `text-micro` |
| `src\components\credibility\JDMirror.tsx` | 77 | `text-3xl` | `text-h2` |
| `src\components\credibility\JDMirror.tsx` | 77 | `sm:text-4xl` | `text-h1` |
| `src\components\credibility\JDMirror.tsx` | 109 | `text-[10px]` | `text-micro` |
| `src\components\credibility\JDMirror.tsx` | 113 | `text-[10px]` | `text-micro` |
| `src\components\credibility\JDMirror.tsx` | 123 | `text-xl` | `text-h4` |
| `src\components\credibility\JDMirror.tsx` | 123 | `sm:text-2xl` | `text-h3` |
| `src\components\credibility\JDMirror.tsx` | 129 | `text-5xl` | `text-display` |
| `src\components\credibility\JDProvenanceBadge.tsx` | 72 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\credibility\JDProvenanceBadge.tsx` | 93 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\credibility\JDProvenanceBadge.tsx` | 110 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\credibility\JDProvenanceBadge.tsx` | 124 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\dashboard\LearningStreakCard.tsx` | 51 | `text-5xl` | `text-display` |
| `src\components\dashboard\LearningStreakCard.tsx` | 54 | `text-xl` | `text-h4` |
| `src\components\dashboard\LearningStreakCard.tsx` | 103 | `text-3xl` | `text-h2` |
| `src\components\dashboard\LearningStreakCard.tsx` | 119 | `text-[10px]` | `text-micro` |
| `src\components\dashboard\LearningStreakCard.tsx` | 128 | `text-[10px]` | `text-micro` |
| `src\components\enrol\pay\PaySideSections.tsx` | 64 | `text-[11px]` | `text-micro` |
| `src\components\enrol\pay\PaySideSections.tsx` | 67 | `text-2xl` | `text-h3` |
| `src\components\enrol\pay\PaySideSections.tsx` | 82 | `text-[11px]` | `text-micro` |
| `src\components\enrol\pay\PaySideSections.tsx` | 123 | `text-[11px]` | `text-micro` |
| `src\components\enrol\pay\PaySideSections.tsx` | 126 | `text-2xl` | `text-h3` |
| `src\components\enrol\pay\PaySideSections.tsx` | 241 | `text-[11px]` | `text-micro` |
| `src\components\enrol\pay\PaySideSections.tsx` | 244 | `text-2xl` | `text-h3` |
| `src\components\enrol\pay\PaySideSections.tsx` | 278 | `text-2xl` | `text-h3` |
| `src\components\enrol\pay\PaySideSections.tsx` | 278 | `sm:text-3xl` | `text-h2` |
| `src\components\funnel\FunnelProgress.tsx` | 82 | `text-[11px]` | `text-micro` |
| `src\components\industry\CareerLadder.tsx` | 9 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\industry\EmployerGrid.tsx` | 14 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\industry\IndustryReadinessCTA.tsx` | 24 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\industry\IndustryReadinessCTA.tsx` | 58 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\industry\SourceFootnotes.tsx` | 7 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\AIRiskExplainer.tsx` | 27 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\AIRiskExplainer.tsx` | 36 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\ApplicationForm.tsx` | 309 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\AssayExplainer.tsx` | 16 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\AssayExplainer.tsx` | 65 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\AssayExplainer.tsx` | 77 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\AssayExplainer.tsx` | 93 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\AssayExplainer.tsx` | 127 | `tracking-[0.12em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\BentoProgrammes.tsx` | 47 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\landing\BentoProgrammes.tsx` | 98 | `text-[11px]` | `text-micro` |
| `src\components\landing\BentoProgrammes.tsx` | 98 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\BentoProgrammes.tsx` | 103 | `lg:text-[44px]` | `text-display ~ closest` |
| `src\components\landing\BentoProgrammes.tsx` | 103 | `text-4xl` | `text-h1` |
| `src\components\landing\BentoProgrammes.tsx` | 103 | `sm:text-5xl` | `text-display` |
| `src\components\landing\BentoProgrammes.tsx` | 140 | `text-[11px]` | `text-micro` |
| `src\components\landing\BentoProgrammes.tsx` | 146 | `text-[10px]` | `text-micro` |
| `src\components\landing\BentoProgrammes.tsx` | 149 | `text-xl` | `text-h4` |
| `src\components\landing\BentoProgrammes.tsx` | 155 | `text-[11px]` | `text-micro` |
| `src\components\landing\BentoProgrammes.tsx` | 223 | `text-[10px]` | `text-micro` |
| `src\components\landing\BentoProgrammes.tsx` | 226 | `text-xl` | `text-h4` |
| `src\components\landing\BentoProgrammes.tsx` | 230 | `text-[11px]` | `text-micro` |
| `src\components\landing\CertificateVerifyMini.tsx` | 28 | `text-[10px]` | `text-micro` |
| `src\components\landing\CertificateVerifyMini.tsx` | 28 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CohortStories.tsx` | 65 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CohortStories.tsx` | 70 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CohortStories.tsx` | 78 | `text-[13.5px]` | `text-caption ~ closest` |
| `src\components\landing\CohortStories.tsx` | 80 | `text-[10.5px]` | `text-micro ~ closest` |
| `src\components\landing\CohortStories.tsx` | 80 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CohortStories.tsx` | 94 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Comparison.tsx` | 75 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Comparison.tsx` | 96 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CounsellorLeadForm.tsx` | 143 | `text-[11px]` | `text-micro` |
| `src\components\landing\CounterProof.tsx` | 108 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CounterProof.tsx` | 148 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CredibilityStrip.tsx` | 89 | `text-[11px]` | `text-micro` |
| `src\components\landing\CredibilityStrip.tsx` | 89 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\CredibilityStrip.tsx` | 94 | `lg:text-[44px]` | `text-display ~ closest` |
| `src\components\landing\CredibilityStrip.tsx` | 94 | `text-3xl` | `text-h2` |
| `src\components\landing\CredibilityStrip.tsx` | 94 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\CredibilityStrip.tsx` | 124 | `text-[10px]` | `text-micro` |
| `src\components\landing\CredibilityStrip.tsx` | 127 | `text-xl` | `text-h4` |
| `src\components\landing\CredibilityStrip.tsx` | 133 | `text-[10px]` | `text-micro` |
| `src\components\landing\DayInTheLifeStrip.tsx` | 82 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DayInTheLifeStrip.tsx` | 87 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DayInTheLifeStrip.tsx` | 106 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DayInTheLifeStrip.tsx` | 117 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DemandUnlockStrip.tsx` | 59 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DemandUnlockStrip.tsx` | 68 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DemandUnlockStrip.tsx` | 101 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DemandUnlockStrip.tsx` | 105 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\DeploymentReadyStrip.tsx` | 90 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\EdtechLies.tsx` | 70 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\EdtechLies.tsx` | 83 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\EtvVideoEmbed.tsx` | 104 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\EtvVideoEmbed.tsx` | 108 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\EtvVideoEmbed.tsx` | 154 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\ExitIntentQuiz.tsx` | 107 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\FinalCTA.tsx` | 22 | `text-3xl` | `text-h2` |
| `src\components\landing\FinalCTA.tsx` | 22 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\Footer.tsx` | 48 | `sm:text-xl` | `text-h4` |
| `src\components\landing\Footer.tsx` | 237 | `text-[10px]` | `text-micro` |
| `src\components\landing\Footer.tsx` | 323 | `text-[10px]` | `text-micro` |
| `src\components\landing\Footer.tsx` | 467 | `text-[10px]` | `text-micro` |
| `src\components\landing\Footer.tsx` | 482 | `text-[10px]` | `text-micro` |
| `src\components\landing\GovtTrustBlock.tsx` | 40 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Hero.tsx` | 144 | `leading-[1.08]` | `drop - semantic text-* utilities ship line-height` |
| `src\components\landing\Hero.tsx` | 144 | `text-4xl` | `text-h1` |
| `src\components\landing\Hero.tsx` | 144 | `sm:text-5xl` | `text-display` |
| `src\components\landing\Hero.tsx` | 144 | `lg:text-6xl` | `text-display` |
| `src\components\landing\Hero.tsx` | 144 | `xl:text-7xl` | `text-display` |
| `src\components\landing\Hero.tsx` | 155 | `lg:text-xl` | `text-h4` |
| `src\components\landing\Hero.tsx` | 208 | `text-3xl` | `text-h2` |
| `src\components\landing\HiringPartnerWall.tsx` | 59 | `text-3xl` | `text-h2` |
| `src\components\landing\HiringPartnerWall.tsx` | 59 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\HiringPartnerWall.tsx` | 62 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\HowItWorks.tsx` | 126 | `lg:text-[44px]` | `text-display ~ closest` |
| `src\components\landing\HowItWorks.tsx` | 126 | `text-4xl` | `text-h1` |
| `src\components\landing\HowItWorks.tsx` | 126 | `sm:text-5xl` | `text-display` |
| `src\components\landing\HowItWorks.tsx` | 138 | `text-[10px]` | `text-micro` |
| `src\components\landing\HowItWorks.tsx` | 160 | `text-[10px]` | `text-micro` |
| `src\components\landing\HowItWorks.tsx` | 171 | `text-[10px]` | `text-micro` |
| `src\components\landing\HowItWorks.tsx` | 199 | `text-[10px]` | `text-micro` |
| `src\components\landing\HowItWorks.tsx` | 202 | `text-[10px]` | `text-micro` |
| `src\components\landing\HowItWorks.tsx` | 233 | `text-[10px]` | `text-micro` |
| `src\components\landing\InsideSalesUrgencyStrip.tsx` | 128 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\InstitutionalReachWall.tsx` | 101 | `text-[11px]` | `text-micro` |
| `src\components\landing\InstitutionalReachWall.tsx` | 106 | `text-2xl` | `text-h3` |
| `src\components\landing\InstitutionalReachWall.tsx` | 106 | `sm:text-3xl` | `text-h2` |
| `src\components\landing\InstitutionalReachWall.tsx` | 106 | `lg:text-4xl` | `text-h1` |
| `src\components\landing\InstitutionalReachWall.tsx` | 118 | `text-[11px]` | `text-micro` |
| `src\components\landing\InstitutionalReachWall.tsx` | 146 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\landing\InstitutionalReachWall.tsx` | 168 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\landing\InstitutionalReachWall.tsx` | 191 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\landing\InstitutionalReachWall.tsx` | 213 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\landing\InterviewRoadmap.tsx` | 68 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\InterviewRoadmap.tsx` | 72 | `text-[1.1rem]` | `text-body-lg ~ closest` |
| `src\components\landing\LimitedSeatsCountdown.tsx` | 122 | `text-3xl` | `text-h2` |
| `src\components\landing\LimitedSeatsCountdown.tsx` | 122 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\LimitedSeatsCountdown.tsx` | 148 | `text-2xl` | `text-h3` |
| `src\components\landing\LimitedSeatsCountdown.tsx` | 148 | `sm:text-3xl` | `text-h2` |
| `src\components\landing\LimitedSeatsCountdown.tsx` | 151 | `text-[10px]` | `text-micro` |
| `src\components\landing\LimitedSeatsCountdown.tsx` | 186 | `text-3xl` | `text-h2` |
| `src\components\landing\LiveCurriculum.tsx` | 100 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\LogoMarquee.tsx` | 28 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\MidPageReserveStrip.tsx` | 15 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\MobileHeroProofCard.tsx` | 25 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\MobileTrustStrip.tsx` | 27 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\NationalMediaBlock.tsx` | 38 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\NationalMediaBlock.tsx` | 70 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Nav.tsx` | 54 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Nav.tsx` | 57 | `text-[9px]` | `text-micro ~ closest` |
| `src\components\landing\Nav.tsx` | 57 | `tracking-[0.36em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Nav.tsx` | 137 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Nav.tsx` | 144 | `text-[10px]` | `text-micro` |
| `src\components\landing\Nav.tsx` | 144 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\PageCTA.tsx` | 31 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\Pricing.tsx` | 196 | `text-3xl` | `text-h2` |
| `src\components\landing\Pricing.tsx` | 196 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\Pricing.tsx` | 196 | `lg:text-5xl` | `text-display` |
| `src\components\landing\Pricing.tsx` | 230 | `text-[11px]` | `text-micro` |
| `src\components\landing\Pricing.tsx` | 238 | `text-3xl` | `text-h2` |
| `src\components\landing\Pricing.tsx` | 238 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\Pricing.tsx` | 252 | `text-[11px]` | `text-micro` |
| `src\components\landing\Pricing.tsx` | 258 | `text-[11px]` | `text-micro` |
| `src\components\landing\Pricing.tsx` | 266 | `text-3xl` | `text-h2` |
| `src\components\landing\Pricing.tsx` | 266 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\Pricing.tsx` | 266 | `lg:text-3xl` | `text-h2` |
| `src\components\landing\Pricing.tsx` | 266 | `xl:text-4xl` | `text-h1` |
| `src\components\landing\Pricing.tsx` | 284 | `text-[11px]` | `text-micro` |
| `src\components\landing\ReadinessTimeline.tsx` | 64 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\RecruiterOutcomes.tsx` | 32 | `text-[11px]` | `text-micro` |
| `src\components\landing\RecruiterOutcomes.tsx` | 32 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\RecruiterOutcomes.tsx` | 37 | `lg:text-[44px]` | `text-display ~ closest` |
| `src\components\landing\RecruiterOutcomes.tsx` | 37 | `leading-[1.15]` | `drop - semantic text-* utilities ship line-height` |
| `src\components\landing\RecruiterOutcomes.tsx` | 37 | `text-3xl` | `text-h2` |
| `src\components\landing\RecruiterOutcomes.tsx` | 37 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\RecruiterOutcomes.tsx` | 55 | `text-[10px]` | `text-micro` |
| `src\components\landing\RecruiterOutcomes.tsx` | 55 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\RecruiterOutcomes.tsx` | 79 | `text-[10px]` | `text-micro` |
| `src\components\landing\RecruiterOutcomes.tsx` | 87 | `text-[10px]` | `text-micro` |
| `src\components\landing\SearchIntentStrip.tsx` | 29 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 101 | `text-[11px]` | `text-micro` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 106 | `text-3xl` | `text-h2` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 106 | `sm:text-4xl` | `text-h1` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 106 | `lg:text-5xl` | `text-display` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 137 | `text-[11px]` | `text-micro` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 141 | `text-[11px]` | `text-micro` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 151 | `text-[11px]` | `text-micro` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 164 | `text-[10px]` | `text-micro` |
| `src\components\landing\TaskPartnershipBlock.tsx` | 181 | `text-[10px]` | `text-micro` |
| `src\components\landing\TrustLedgerStrip.tsx` | 35 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\landing\TrustLedgerStrip.tsx` | 86 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 233 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 338 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 401 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 483 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 542 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 638 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 665 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 762 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 801 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 819 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 866 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\learn\PlayerLayout.tsx` | 904 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\onboarding\OnboardingWizard.tsx` | 106 | `text-2xl` | `text-h3` |
| `src\components\onboarding\OnboardingWizard.tsx` | 151 | `text-xl` | `text-h4` |
| `src\components\recruiters\ArtifactRequestLane.tsx` | 112 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\ArtifactRequestLane.tsx` | 127 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\ArtifactRequestLane.tsx` | 145 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\ArtifactRequestLane.tsx` | 181 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\CandidatePortfolio.tsx` | 53 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\CandidatePortfolio.tsx` | 65 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\CandidatePortfolio.tsx` | 99 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\CandidatePortfolio.tsx` | 134 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\GradingRubricTable.tsx` | 40 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\GradingRubricTable.tsx` | 44 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\GradingRubricTable.tsx` | 57 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\recruiters\WorkSampleCard.tsx` | 59 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\referral\ReferralHub.tsx` | 64 | `text-2xl` | `text-h3` |
| `src\components\referral\ReferralHub.tsx` | 78 | `text-3xl` | `text-h2` |
| `src\components\site\MobileStickyCTA.tsx` | 39 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\tpos\BatchOutcomeStrip.tsx` | 31 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\tpos\BatchOutcomeStrip.tsx` | 109 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\tpos\CounsellorLanes.tsx` | 18 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\tpos\CounsellorLanes.tsx` | 81 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackDomainGrid.tsx` | 103 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackDomainGrid.tsx` | 139 | `text-[0.6rem]` | `text-micro ~ closest` |
| `src\components\track\TrackDomainGrid.tsx` | 139 | `tracking-[0.04em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackDomainGrid.tsx` | 143 | `text-[0.8125rem]` | `text-caption ~ closest` |
| `src\components\track\TrackHeroPanel.tsx` | 65 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackHeroPanel.tsx` | 65 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackHeroPanel.tsx` | 120 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackHeroPanel.tsx` | 120 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackModuleCard.tsx` | 69 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\track\TrackModuleCard.tsx` | 69 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\transition\SpaceLoader.tsx` | 100 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\ui\Pill.tsx` | 16 | `text-[11px]` | `text-micro` |
| `src\components\ui\Pill.tsx` | 27 | `text-[11px]` | `text-micro` |
| `src\components\ui\RichCard.tsx` | 185 | `text-[10.5px]` | `text-micro ~ closest` |
| `src\components\ui\RichCard.tsx` | 185 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\ui\RichCard.tsx` | 207 | `text-[22px]` | `text-h4 ~ closest` |
| `src\components\ui\RichCard.tsx` | 207 | `sm:text-[26px]` | `text-h3 ~ closest` |
| `src\components\ui\RichCard.tsx` | 207 | `leading-[1.1]` | `drop - semantic text-* utilities ship line-height` |
| `src\components\ui\RichCard.tsx` | 248 | `text-[14px]` | `text-body-sm` |
| `src\components\ui\Stat.tsx` | 26 | `text-3xl` | `text-h2` |
| `src\components\ui\Stat.tsx` | 26 | `sm:text-4xl` | `text-h1` |
| `src\components\ui\Stat.tsx` | 29 | `tracking-[0.12em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\components\ui\Stat.tsx` | 32 | `text-[11px]` | `text-micro` |
| `src\components\ui\calendar.tsx` | 79 | `text-[0.8rem]` | `text-caption ~ closest` |
| `src\components\ui\calendar.tsx` | 85 | `text-[0.8rem]` | `text-caption ~ closest` |
| `src\components\ui\form.tsx` | 131 | `text-[0.8rem]` | `text-caption ~ closest` |
| `src\components\ui\form.tsx` | 153 | `text-[0.8rem]` | `text-caption ~ closest` |
| `src\components\verify\VerificationAuditTrail.tsx` | 73 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\admin\components\admin\AdminCard.tsx` | 53 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\admin\components\admin\AdminCard.tsx` | 124 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\admin\components\admin\AdminPageHeader.tsx` | 23 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\admin\components\admin\AdminShell.tsx` | 120 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\admin\components\admin\AdminShell.tsx` | 140 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\admin\components\admin\AdminShell.tsx` | 234 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\applications\components\apply\ApplyShell.tsx` | 60 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\applications\components\apply\ApplyShell.tsx` | 63 | `tracking-[0.42em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\applications\components\apply\ApplyShell.tsx` | 82 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\applications\components\apply\SeatUrgencyConfirm.tsx` | 71 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\applications\components\apply\SeatUrgencyConfirm.tsx` | 82 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\careerEngine\components\acri\BandLadder.tsx` | 16 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\features\careerEngine\components\acri\TraitDimensionMap.tsx` | 30 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\app.tsx` | 59 | `text-2xl` | `text-h3` |
| `src\routes\_authenticated\app.tsx` | 59 | `md:text-3xl` | `text-h2` |
| `src\routes\_authenticated\app.tsx` | 83 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\app.tsx` | 86 | `text-xl` | `text-h4` |
| `src\routes\_authenticated\employer.console.tsx` | 118 | `text-3xl` | `text-h2` |
| `src\routes\_authenticated\employer.console.tsx` | 899 | `text-[11px]` | `text-micro` |
| `src\routes\_authenticated\hub.tsx` | 63 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\hub.tsx` | 66 | `text-2xl` | `text-h3` |
| `src\routes\_authenticated\hub.tsx` | 66 | `md:text-3xl` | `text-h2` |
| `src\routes\_authenticated\hub.tsx` | 80 | `text-4xl` | `text-h1` |
| `src\routes\_authenticated\hub.tsx` | 125 | `text-4xl` | `text-h1` |
| `src\routes\_authenticated\hub.tsx` | 218 | `text-[10px]` | `text-micro` |
| `src\routes\_authenticated\hub.tsx` | 218 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\learning-path.tsx` | 107 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\learning-path.tsx` | 110 | `text-2xl` | `text-h3` |
| `src\routes\_authenticated\learning-path.tsx` | 110 | `md:text-3xl` | `text-h2` |
| `src\routes\_authenticated\learning-path.tsx` | 120 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\learning-path.tsx` | 124 | `text-3xl` | `text-h2` |
| `src\routes\_authenticated\learning-path.tsx` | 126 | `text-3xl` | `text-h2` |
| `src\routes\_authenticated\learning-path.tsx` | 133 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\learning-path.tsx` | 221 | `text-[10px]` | `text-micro` |
| `src\routes\_authenticated\learning-path.tsx` | 221 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\learning-path.tsx` | 225 | `text-[10px]` | `text-micro` |
| `src\routes\_authenticated\learning-path.tsx` | 230 | `text-[10px]` | `text-micro` |
| `src\routes\_authenticated\learning-path.tsx` | 257 | `text-[10px]` | `text-micro` |
| `src\routes\_authenticated\learning-path.tsx` | 257 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\_authenticated\learning-path.tsx` | 265 | `text-[10px]` | `text-micro` |
| `src\routes\_authenticated\learning-path.tsx` | 265 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\about.tsx` | 54 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\acri.tsx` | 53 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\acri.tsx` | 77 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.activity.tsx` | 144 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.activity.tsx` | 166 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.activity.tsx` | 202 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.activity.tsx` | 221 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.activity.tsx` | 298 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.activity.tsx` | 317 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.analytics-alerts.tsx` | 65 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.analytics-alerts.tsx` | 100 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.analytics-alerts.tsx` | 122 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.analytics-alerts.tsx` | 149 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.analytics-alerts.tsx` | 187 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.applications.tsx` | 143 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.applications.tsx` | 178 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.arzonprime60.tsx` | 90 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.arzonprime60.tsx` | 129 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.arzonprime60.tsx` | 173 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.arzonprime60.tsx` | 218 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.arzonprime60.tsx` | 273 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.assets.tsx` | 69 | `text-2xl` | `text-h3` |
| `src\routes\admin.assets.tsx` | 190 | `text-2xl` | `text-h3` |
| `src\routes\admin.backups.tsx` | 87 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.backups.tsx` | 148 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.backups.tsx` | 198 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.certificates.tsx` | 108 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.certificates.tsx` | 154 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.certificates.tsx` | 212 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 108 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 146 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 147 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 150 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 153 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 156 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 218 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 224 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 250 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.cohorts.tsx` | 278 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.demand.tsx` | 151 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.demand.tsx` | 164 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.demand.tsx` | 240 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.demand.tsx` | 621 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.demand.tsx` | 749 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.demand.tsx` | 892 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.experiments.tsx` | 192 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel-ce.tsx` | 92 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel-ce.tsx` | 119 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel-ce.tsx` | 173 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel-ce.tsx` | 194 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel-test.tsx` | 181 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel-test.tsx` | 274 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel-test.tsx` | 306 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 202 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 314 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 380 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 425 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 460 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 489 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 554 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 577 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 630 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 704 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 805 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 828 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.funnel.tsx` | 895 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.index.tsx` | 86 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.index.tsx` | 360 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.index.tsx` | 405 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.index.tsx` | 453 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.index.tsx` | 521 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.index.tsx` | 600 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.index.tsx` | 613 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.invites.tsx` | 98 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.leads.tsx` | 193 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.leads.tsx` | 228 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.leads.tsx` | 399 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.leads.tsx` | 432 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.leads.tsx` | 460 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.leads.tsx` | 492 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.promotions.tsx` | 287 | `text-[11px]` | `text-micro` |
| `src\routes\admin.readiness-journeys.tsx` | 104 | `text-2xl` | `text-h3` |
| `src\routes\admin.results.tsx` | 245 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.results.tsx` | 301 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.results.tsx` | 340 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.results.tsx` | 492 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.results.tsx` | 511 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.roles.tsx` | 168 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.settings.tsx` | 99 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.settings.tsx` | 125 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.settings.tsx` | 154 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.settings.tsx` | 193 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.settings.tsx` | 208 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.settings.tsx` | 221 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 138 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 160 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 426 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 547 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 570 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 591 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 692 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 703 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 723 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 748 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 816 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 829 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 902 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 920 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 941 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 946 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.seo.tsx` | 951 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\admin.thumbnails.tsx` | 95 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 56 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 138 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 175 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 210 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 225 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 255 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 271 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 297 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 304 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 310 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 335 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.$slug.tsx` | 362 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.index.tsx` | 167 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.index.tsx` | 191 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.index.tsx` | 208 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.index.tsx` | 240 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.index.tsx` | 244 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.index.tsx` | 248 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.request.tsx` | 141 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.request.tsx` | 170 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\build.request.tsx` | 370 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.enrol.tsx` | 207 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.enrol.tsx` | 251 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.enrol.tsx` | 417 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.enrol.tsx` | 480 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.enrol.tsx` | 489 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.index.tsx` | 64 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.index.tsx` | 91 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.index.tsx` | 117 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.index.tsx` | 166 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.lead.tsx` | 213 | `text-3xl` | `text-h2` |
| `src\routes\career-engine.lead.tsx` | 213 | `sm:text-4xl` | `text-h1` |
| `src\routes\career-engine.lead.tsx` | 213 | `lg:text-5xl` | `text-display` |
| `src\routes\career-engine.path.$slug.tsx` | 150 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.path.$slug.tsx` | 165 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.path.$slug.tsx` | 198 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.plan.tsx` | 111 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.plan.tsx` | 145 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.plan.tsx` | 320 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.result.tsx` | 205 | `text-xl` | `text-h4` |
| `src\routes\career-engine.result.tsx` | 218 | `text-2xl` | `text-h3` |
| `src\routes\career-engine.start.tsx` | 211 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.start.tsx` | 219 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.start.tsx` | 240 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.start.tsx` | 246 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.start.tsx` | 276 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.start.tsx` | 401 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.start.tsx` | 418 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 98 | `text-2xl` | `text-h3` |
| `src\routes\career-engine.test.tsx` | 111 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 536 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 615 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 667 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 690 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 690 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 696 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 696 | `tracking-[0.14em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 712 | `sm:text-xl` | `text-h4` |
| `src\routes\career-engine.test.tsx` | 712 | `lg:text-2xl` | `text-h3` |
| `src\routes\career-engine.test.tsx` | 718 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 718 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 760 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 775 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 792 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 859 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 875 | `text-[10px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 875 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 889 | `text-[11px]` | `text-micro` |
| `src\routes\career-engine.test.tsx` | 911 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 920 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 1005 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\career-engine.test.tsx` | 1019 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\certificates.sample.$slug.tsx` | 74 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\certificates.sample.$slug.tsx` | 81 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\certificates.sample.$slug.tsx` | 101 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\changelog.tsx` | 38 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\changelog.tsx` | 56 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\changelog.tsx` | 59 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\cohorts.tsx` | 29 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\contact.tsx` | 81 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\contact.tsx` | 102 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\contact.tsx` | 164 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\courses.$slug.tsx` | 295 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\courses.$slug.tsx` | 373 | `lg:text-[44px]` | `text-display ~ closest` |
| `src\routes\courses.$slug.tsx` | 373 | `text-3xl` | `text-h2` |
| `src\routes\courses.$slug.tsx` | 373 | `sm:text-4xl` | `text-h1` |
| `src\routes\courses.$slug.tsx` | 557 | `text-2xl` | `text-h3` |
| `src\routes\courses.$slug.tsx` | 557 | `sm:text-3xl` | `text-h2` |
| `src\routes\courses.$slug.tsx` | 575 | `text-xl` | `text-h4` |
| `src\routes\courses.$slug.tsx` | 575 | `sm:text-2xl` | `text-h3` |
| `src\routes\courses.$slug.tsx` | 617 | `text-2xl` | `text-h3` |
| `src\routes\courses.$slug.tsx` | 629 | `text-xl` | `text-h4` |
| `src\routes\courses.$slug.tsx` | 697 | `text-2xl` | `text-h3` |
| `src\routes\courses.$slug.tsx` | 697 | `sm:text-3xl` | `text-h2` |
| `src\routes\courses.$slug.tsx` | 762 | `text-2xl` | `text-h3` |
| `src\routes\courses.$slug.tsx` | 762 | `sm:text-3xl` | `text-h2` |
| `src\routes\courses.$slug.tsx` | 798 | `text-xl` | `text-h4` |
| `src\routes\courses.$slug.tsx` | 798 | `sm:text-2xl` | `text-h3` |
| `src\routes\courses.$slug.tsx` | 981 | `text-2xl` | `text-h3` |
| `src\routes\courses.$slug.tsx` | 981 | `sm:text-3xl` | `text-h2` |
| `src\routes\courses.$slug.tsx` | 1038 | `text-3xl` | `text-h2` |
| `src\routes\courses.compare.tsx` | 88 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\courses.compare.tsx` | 99 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\courses.index.tsx` | 70 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\courses.index.tsx` | 73 | `text-3xl` | `text-h2` |
| `src\routes\courses.index.tsx` | 73 | `sm:text-4xl` | `text-h1` |
| `src\routes\courses.index.tsx` | 73 | `lg:text-5xl` | `text-display` |
| `src\routes\courses.index.tsx` | 122 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\courses.index.tsx` | 125 | `text-2xl` | `text-h3` |
| `src\routes\courses.index.tsx` | 125 | `sm:text-3xl` | `text-h2` |
| `src\routes\curriculum.tsx` | 51 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\curriculum.tsx` | 51 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\curriculum.tsx` | 183 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\curriculum.tsx` | 196 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\dashboard.tsx` | 57 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\dashboard.tsx` | 81 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\dashboard.tsx` | 134 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\dev.cards.tsx` | 141 | `tracking-[0.24em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\enrol.$tier.pay.tsx` | 1015 | `text-3xl` | `text-h2` |
| `src\routes\enrol.$tier.pay.tsx` | 1015 | `sm:text-4xl` | `text-h1` |
| `src\routes\enrol.$tier.pay.tsx` | 1015 | `lg:text-5xl` | `text-display` |
| `src\routes\enrol.$tier.pay.tsx` | 1037 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.$tier.pay.tsx` | 1040 | `text-2xl` | `text-h3` |
| `src\routes\enrol.$tier.pay.tsx` | 1040 | `sm:text-3xl` | `text-h2` |
| `src\routes\enrol.$tier.pay.tsx` | 1103 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.$tier.pay.tsx` | 1106 | `text-2xl` | `text-h3` |
| `src\routes\enrol.$tier.tsx` | 163 | `text-3xl` | `text-h2` |
| `src\routes\enrol.$tier.tsx` | 163 | `sm:text-4xl` | `text-h1` |
| `src\routes\enrol.$tier.tsx` | 163 | `lg:text-5xl` | `text-display` |
| `src\routes\enrol.$tier.tsx` | 284 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.$tier.tsx` | 287 | `text-2xl` | `text-h3` |
| `src\routes\enrol.$tier.tsx` | 291 | `text-2xl` | `text-h3` |
| `src\routes\enrol.$tier.tsx` | 298 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.index.tsx` | 306 | `text-3xl` | `text-h2` |
| `src\routes\enrol.index.tsx` | 306 | `sm:text-4xl` | `text-h1` |
| `src\routes\enrol.index.tsx` | 306 | `lg:text-6xl` | `text-display` |
| `src\routes\enrol.index.tsx` | 387 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.index.tsx` | 396 | `text-3xl` | `text-h2` |
| `src\routes\enrol.index.tsx` | 396 | `sm:text-4xl` | `text-h1` |
| `src\routes\enrol.index.tsx` | 410 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.index.tsx` | 416 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.index.tsx` | 424 | `text-3xl` | `text-h2` |
| `src\routes\enrol.index.tsx` | 424 | `sm:text-4xl` | `text-h1` |
| `src\routes\enrol.index.tsx` | 424 | `lg:text-3xl` | `text-h2` |
| `src\routes\enrol.index.tsx` | 424 | `xl:text-4xl` | `text-h1` |
| `src\routes\enrol.index.tsx` | 442 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.index.tsx` | 456 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.index.tsx` | 501 | `text-2xl` | `text-h3` |
| `src\routes\enrol.index.tsx` | 535 | `text-[11px]` | `text-micro` |
| `src\routes\enrol.index.tsx` | 593 | `text-xl` | `text-h4` |
| `src\routes\enrol.index.tsx` | 593 | `sm:text-2xl` | `text-h3` |
| `src\routes\enrol.success.tsx` | 149 | `text-3xl` | `text-h2` |
| `src\routes\enrol.success.tsx` | 310 | `text-2xl` | `text-h3` |
| `src\routes\enrol.success.tsx` | 333 | `text-2xl` | `text-h3` |
| `src\routes\enrol.tsx` | 40 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\enrol.tsx` | 41 | `text-[10px]` | `text-micro` |
| `src\routes\enrol.tsx` | 41 | `tracking-[0.42em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\faq.tsx` | 32 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.$role.$city.tsx` | 143 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.$role.$city.tsx` | 182 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.$role.$city.tsx` | 196 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.$role.$city.tsx` | 213 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.$role.$city.tsx` | 247 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.$role.tsx` | 90 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.$role.tsx` | 187 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.compare.tsx` | 49 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.compare.tsx` | 274 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.employers.tsx` | 118 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.employers.tsx` | 218 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.index.tsx` | 29 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.index.tsx` | 84 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.index.tsx` | 94 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.salaries.tsx` | 126 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\industry.salaries.tsx` | 224 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\moments.$slug.tsx` | 94 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\moments.index.tsx` | 63 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\moments.index.tsx` | 105 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\moments.index.tsx` | 199 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\moments.index.tsx` | 204 | `text-xl` | `text-h4` |
| `src\routes\moments.index.tsx` | 204 | `sm:text-2xl` | `text-h3` |
| `src\routes\moments.index.tsx` | 248 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\placements.tsx` | 107 | `text-4xl` | `text-h1` |
| `src\routes\placements.tsx` | 107 | `md:text-6xl` | `text-display` |
| `src\routes\placements.tsx` | 110 | `md:text-xl` | `text-h4` |
| `src\routes\placements.tsx` | 130 | `text-2xl` | `text-h3` |
| `src\routes\placements.tsx` | 130 | `md:text-3xl` | `text-h2` |
| `src\routes\placements.tsx` | 174 | `text-5xl` | `text-display` |
| `src\routes\placements.tsx` | 174 | `md:text-6xl` | `text-display` |
| `src\routes\placements.tsx` | 188 | `text-2xl` | `text-h3` |
| `src\routes\qa.tsx` | 44 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.brief.tsx` | 82 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.brief.tsx` | 89 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.brief.tsx` | 92 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.brief.tsx` | 95 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.brief.tsx` | 224 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.tsx` | 82 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.tsx` | 120 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.tsx` | 126 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.tsx` | 133 | `tracking-[0.16em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.tsx` | 158 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.tsx` | 165 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.$id.tsx` | 176 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.artifact.$token.tsx` | 80 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\r.artifact.$token.tsx` | 162 | `tracking-[0.2em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\recruiters.tsx` | 76 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\refer.tsx` | 33 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\refer.tsx` | 50 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\refund.tsx` | 55 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\roadmap.tsx` | 91 | `text-[11px]` | `text-micro` |
| `src\routes\roadmap.tsx` | 91 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\roadmap.tsx` | 94 | `md:text-xl` | `text-h4` |
| `src\routes\roadmap.tsx` | 95 | `md:text-[15px]` | `text-body-sm` |
| `src\routes\roadmap.tsx` | 117 | `text-[11px]` | `text-micro` |
| `src\routes\roadmap.tsx` | 117 | `tracking-[0.28em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\roadmap.tsx` | 120 | `text-[2rem]` | `text-h2 ~ closest` |
| `src\routes\roadmap.tsx` | 120 | `leading-[1.1]` | `drop - semantic text-* utilities ship line-height` |
| `src\routes\roadmap.tsx` | 120 | `md:text-5xl` | `text-display` |
| `src\routes\roadmap.tsx` | 123 | `text-[15px]` | `text-body-sm` |
| `src\routes\status.tsx` | 52 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\status.tsx` | 72 | `tracking-[0.18em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\student.resume.tsx` | 72 | `text-4xl` | `text-h1` |
| `src\routes\student.resume.tsx` | 84 | `text-2xl` | `text-h3` |
| `src\routes\student.resume.tsx` | 104 | `text-2xl` | `text-h3` |
| `src\routes\student.resume.tsx` | 120 | `text-xl` | `text-h4` |
| `src\routes\tpos.tsx` | 44 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\verify.tsx` | 69 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\waitlist.tsx` | 74 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\waitlist.tsx` | 88 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\waitlist.tsx` | 94 | `tracking-[0.22em]` | `use tracking-tight / -normal / -wide or rely on semantic utility` |
| `src\routes\why-arzon.tsx` | 224 | `text-4xl` | `text-h1` |
| `src\routes\why-arzon.tsx` | 224 | `md:text-6xl` | `text-display` |
| `src\routes\why-arzon.tsx` | 242 | `text-xl` | `text-h4` |
| `src\routes\why-arzon.tsx` | 252 | `text-2xl` | `text-h3` |
| `src\routes\why-arzon.tsx` | 281 | `text-2xl` | `text-h3` |
| `src\routes\why-arzon.tsx` | 330 | `text-2xl` | `text-h3` |
| `src\routes\why-arzon.tsx` | 359 | `text-2xl` | `text-h3` |
| `src\routes\why-arzon.tsx` | 409 | `text-2xl` | `text-h3` |
| `src\routes\why-arzon.tsx` | 415 | `text-5xl` | `text-display` |
| `src\routes\why-arzon.tsx` | 421 | `text-5xl` | `text-display` |
| `src\routes\why-arzon.tsx` | 427 | `text-5xl` | `text-display` |
| `src\routes\why-arzon.tsx` | 443 | `text-xl` | `text-h4` |

## Composite blocks (responsive / size + leading stacks)

| File | Line | Current stack | Suggested token |
| --- | ---: | --- | --- |
| `src\components\landing\Pricing.tsx` | 266 | `text-3xl` + `lg:text-3xl` | `text-h2` |
| `src\components\landing\Pricing.tsx` | 266 | `sm:text-4xl` + `xl:text-4xl` | `text-h1` |
| `src\routes\enrol.index.tsx` | 424 | `text-3xl` + `lg:text-3xl` | `text-h2` |
| `src\routes\enrol.index.tsx` | 424 | `sm:text-4xl` + `xl:text-4xl` | `text-h1` |

## Quick fix

Run the codemod on a target file:

```sh
node scripts/codemod-typography.mjs <file> [<file> ...]
```

Then refresh the ratchet baseline:

```sh
node scripts/check-typography-tokens.mjs --update-baseline
```
