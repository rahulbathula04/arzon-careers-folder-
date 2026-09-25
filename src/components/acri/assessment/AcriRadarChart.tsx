import React, { useMemo } from "react";

export interface RadarDataPoint {
  key: string;
  label: string;
  score: number;
}

interface AcriRadarChartProps {
  data: RadarDataPoint[];
  size?: number;
  onSelectCompetency?: (key: string) => void;
  selectedKey?: string | null;
  showBenchmark?: boolean;
}

// Clean shortened labels for mobile display
const LABEL_SHORT_NAMES: Record<string, string> = {
  caseAssessment: "Case Assessment",
  documentation: "Documentation",
  analyticalReasoning: "Analytical Logic",
  icsrProcessing: "ICSR Processing",
  pvFundamentals: "PV Fundamentals",
  medicalInterpretation: "Medical Triage",
  qualityCompliance: "Quality & Compliance",
  situationalJudgment: "Situational Judgment",
  meddraCoding: "MedDRA Coding",
};

export function AcriRadarChart({
  data,
  size = 360,
  onSelectCompetency,
  selectedKey,
  showBenchmark = true,
}: AcriRadarChartProps) {
  // SVG Canvas configuration
  const viewBoxSize = 400;
  const center = viewBoxSize / 2;
  const radius = 125;
  const total = data.length;

  // Grid levels (20%, 40%, 60%, 80% benchmark, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to compute (x, y) for index and ratio
  const getCoordinates = (index: number, ratio: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = center + radius * ratio * Math.cos(angle);
    const y = center + radius * ratio * Math.sin(angle);
    return { x, y, angle };
  };

  // Polygon points for candidate score
  const candidatePolygonPoints = useMemo(() => {
    return data
      .map((item, i) => {
        const ratio = Math.max(0.06, Math.min(1.0, item.score / 100));
        const { x, y } = getCoordinates(i, ratio);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [data, center, radius, total]);

  // Benchmark polygon (80% across all competencies)
  const benchmarkPolygonPoints = useMemo(() => {
    return data
      .map((_, i) => {
        const { x, y } = getCoordinates(i, 0.8);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [data, center, radius, total]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none overflow-visible">
      {/* Chart SVG */}
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="w-full max-w-[340px] sm:max-w-[380px] aspect-square overflow-visible"
        aria-label="ACRI 9-Competency Readiness Radar Map"
      >
        <defs>
          {/* Subtle gradient for score polygon */}
          <radialGradient id="candidateAreaGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#005B4F" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#005B4F" stopOpacity="0.12" />
          </radialGradient>
          {/* Filter for glowing vertex */}
          <filter id="vertexGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Circular Grid webs */}
        {gridLevels.map((lvl) => {
          const isBenchmark = lvl === 0.8;
          const isOuter = lvl === 1.0;
          const points = data
            .map((_, i) => {
              const { x, y } = getCoordinates(i, lvl);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ");

          return (
            <g key={`grid-${lvl}`}>
              <polygon
                points={points}
                fill={isBenchmark ? "#E8F7F1" : "none"}
                fillOpacity={isBenchmark ? 0.08 : 0}
                stroke={isBenchmark ? "#059669" : isOuter ? "#CBD5E1" : "#E2E8F0"}
                strokeWidth={isBenchmark ? "1.5" : isOuter ? "1.2" : "0.75"}
                strokeDasharray={isBenchmark ? "4 3" : isOuter ? "none" : "2 2"}
              />
              {/* Level label */}
              {lvl === 0.8 && (
                <text
                  x={center + 6}
                  y={center - radius * 0.8 - 4}
                  className="text-[9px] font-mono font-bold fill-[#059669]"
                >
                  80% Benchmark
                </text>
              )}
            </g>
          );
        })}

        {/* Axis Spokes from center to 100% boundary */}
        {data.map((item, i) => {
          const { x, y } = getCoordinates(i, 1.0);
          return (
            <line
              key={`spoke-${item.key}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#E2E8F0"
              strokeWidth="0.85"
            />
          );
        })}

        {/* Benchmark Reference Polygon (80% Line) */}
        {showBenchmark && (
          <polygon
            points={benchmarkPolygonPoints}
            fill="none"
            stroke="#059669"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            strokeOpacity="0.7"
          />
        )}

        {/* Candidate Score Filled Polygon */}
        <polygon
          points={candidatePolygonPoints}
          fill="url(#candidateAreaGradient)"
          stroke="#005B4F"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Vertex Dots & Score Indicators */}
        {data.map((item, i) => {
          const ratio = Math.max(0.06, Math.min(1.0, item.score / 100));
          const { x, y } = getCoordinates(i, ratio);
          const isSelected = selectedKey === item.key;

          const dotColor =
            item.score >= 85 ? "#005B4F" : item.score >= 60 ? "#D97706" : "#E11D48";

          return (
            <g
              key={`vertex-${item.key}`}
              onClick={() => onSelectCompetency?.(item.key)}
              className="cursor-pointer group"
            >
              {/* Tap target hit area */}
              <circle cx={x} cy={y} r="18" fill="transparent" />

              {/* Pulsing halo on selected item */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  fill={dotColor}
                  fillOpacity="0.3"
                  className="motion-safe:animate-ping"
                />
              )}

              {/* Outer white ring */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? "6" : "5"}
                fill="#FFFFFF"
                stroke={dotColor}
                strokeWidth={isSelected ? "3" : "2.5"}
                filter="url(#vertexGlow)"
                className="transition-transform duration-200 group-hover:scale-125"
              />

              {/* Center colored pip */}
              <circle cx={x} cy={y} r="2.5" fill={dotColor} />
            </g>
          );
        })}

        {/* Outer Axis Labels & Score Badges */}
        {data.map((item, i) => {
          const { angle } = getCoordinates(i, 1.0);
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          const isSelected = selectedKey === item.key;
          const cos = Math.cos(angle);
          const textAnchor =
            Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";

          const shortLabel = LABEL_SHORT_NAMES[item.key] || item.label;

          // Color coded score tag
          const scoreColor =
            item.score >= 85
              ? "fill-emerald-800"
              : item.score >= 60
                ? "fill-amber-700"
                : "fill-rose-700";

          return (
            <g
              key={`label-${item.key}`}
              onClick={() => onSelectCompetency?.(item.key)}
              className="cursor-pointer transition-transform duration-150 hover:scale-105"
            >
              {/* Competency Name */}
              <text
                x={lx}
                y={ly - 5}
                textAnchor={textAnchor}
                className={`text-[10px] sm:text-[11px] font-sans font-semibold transition-colors duration-150 ${
                  isSelected
                    ? "fill-[#005B4F] font-bold"
                    : "fill-stone-800 hover:fill-[#005B4F]"
                }`}
              >
                {shortLabel}
              </text>

              {/* Score Tag with pill styling */}
              <text
                x={lx}
                y={ly + 8}
                textAnchor={textAnchor}
                className={`text-[10px] font-mono font-bold ${scoreColor}`}
              >
                {item.score}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend below chart */}
      <div className="flex items-center justify-center gap-4 mt-3 text-[10px] sm:text-xs font-mono text-stone-500">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#005B4F]" />
          <span>Your Performance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-[#059669]" />
          <span>80% Industry Benchmark</span>
        </div>
      </div>
    </div>
  );
}
