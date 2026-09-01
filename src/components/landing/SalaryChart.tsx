/**
 * SalaryChart — Recharts bar chart showing fresher salary ranges across healthcare career tracks.
 * Uses the project's design system colors and responsive container.
 */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useReducedMotion } from "framer-motion";

const SALARY_DATA = [
  { role: "Pharmacovigilance", min: 2.5, max: 4.5, color: "#1B3F8B" },
  { role: "Medical Coding", min: 3, max: 5.5, color: "#2563EB" },
  { role: "Clinical Data Mgmt", min: 3.5, max: 6, color: "#0EA5E9" },
  { role: "CRA / Monitoring", min: 4, max: 7, color: "#8A6D1F" },
  { role: "Regulatory Affairs", min: 3, max: 6.5, color: "#D97706" },
];

const CHART_DATA = SALARY_DATA.map((d) => ({
  name: d.role,
  range: d.max - d.min,
  base: d.min,
  color: d.color,
  label: `₹${d.min}–${d.max}L`,
}));

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: (typeof CHART_DATA)[0] }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-xl p-3 text-xs font-sans">
      <p className="font-bold text-[#1A1A1A] mb-1">{label}</p>
      <p className="text-stone-600">
        Fresher range:{" "}
        <span className="font-extrabold" style={{ color: d.color }}>
          {d.label} LPA
        </span>
      </p>
      <p className="text-stone-400 mt-0.5">Entry-level · India 2026</p>
    </div>
  );
}

export function SalaryChart() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full space-y-3">
      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 text-center">
        Starting Salary by Healthcare Role (LPA) · India 2026
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={CHART_DATA}
          margin={{ top: 20, right: 16, left: 0, bottom: 0 }}
          barSize={32}
        >
          <defs>
            {CHART_DATA.map((d, i) => (
              <linearGradient key={i} id={`salary-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={d.color} stopOpacity={0.95} />
                <stop offset="100%" stopColor={d.color} stopOpacity={0.55} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fontFamily: "monospace", fill: "#6B7280", fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
            interval={0}
            width={80}
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: "monospace", fill: "#6B7280" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `₹${v}L`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(27,63,139,0.04)" }} />
          <Bar dataKey="range" stackId="a" radius={[6, 6, 0, 0]} isAnimationActive={!shouldReduceMotion} animationDuration={800}>
            {CHART_DATA.map((d, i) => (
              <Cell key={i} fill={`url(#salary-gradient-${i})`} />
            ))}
            <LabelList
              dataKey="label"
              position="top"
              style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", fill: "#1A1A1A" }}
            />
          </Bar>
          <Bar dataKey="base" stackId="a" fill="transparent" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
