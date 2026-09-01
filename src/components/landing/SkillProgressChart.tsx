/**
 * SkillProgressChart — Recharts radar chart comparing skill levels before vs after Arzon.
 * Visually demonstrates the gap bridged by the 12-week programme.
 */
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useReducedMotion } from "framer-motion";

const SKILL_DATA = [
  { skill: "PV Case\nNarrative", before: 20, after: 85 },
  { skill: "Medical\nCoding", before: 15, after: 88 },
  { skill: "Regulatory\nDocs", before: 25, after: 80 },
  { skill: "Clinical\nData (CDM)", before: 18, after: 82 },
  { skill: "Software\nTools", before: 30, after: 90 },
  { skill: "Interview\nReadiness", before: 22, after: 87 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-xl p-3 text-xs font-sans">
      <p className="font-bold text-[#1A1A1A] mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}/100
        </p>
      ))}
    </div>
  );
}

export function SkillProgressChart() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full space-y-3">
      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 text-center">
        Skill Level · Before vs After Arzon 12-Week Programme
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={SKILL_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="rgba(0,0,0,0.08)" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fontSize: 10, fontFamily: "monospace", fill: "#6B7280", fontWeight: 600 }}
          />
          <Radar
            name="Before Arzon"
            dataKey="before"
            stroke="#E11D48"
            fill="#E11D48"
            fillOpacity={0.12}
            strokeWidth={1.5}
            isAnimationActive={!shouldReduceMotion}
            animationDuration={800}
          />
          <Radar
            name="After Arzon"
            dataKey="after"
            stroke="#1B3F8B"
            fill="#1B3F8B"
            fillOpacity={0.2}
            strokeWidth={2}
            isAnimationActive={!shouldReduceMotion}
            animationDuration={1000}
            animationBegin={200}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 10, fontFamily: "monospace", fontWeight: 700 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
