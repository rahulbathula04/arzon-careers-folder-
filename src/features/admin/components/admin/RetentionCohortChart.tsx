import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type CohortPoint = {
  /** Day marker (30 / 90 / 180 / 365). */
  day: number;
  /** Map of cohort id -> retention percentage 0-100. */
  [cohort: string]: number;
};

export type CohortMeta = {
  id: string;
  label: string;
  n: number;
};

const COHORT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

/**
 * Retention curve chart used on /admin/retention.
 * AA-legible: axis ticks at 12px text-foreground, halo'd line labels,
 * legend pills, and a dark-card tooltip with N respondents per row.
 */
export function RetentionCohortChart({
  data,
  cohorts,
  height = 320,
}: {
  data: CohortPoint[];
  cohorts: CohortMeta[];
  height?: number;
}) {
  const colorById = useMemo(() => {
    const m: Record<string, string> = {};
    cohorts.forEach((c, i) => (m[c.id] = COHORT_COLORS[i % COHORT_COLORS.length]));
    return m;
  }, [cohorts]);

  if (!data.length || !cohorts.length) {
    return (
      <div className="grid h-[260px] place-items-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        Not enough data yet - chart unlocks once cohorts cross N≥10.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 16, right: 56, left: 0, bottom: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="day"
              ticks={[30, 90, 180, 365]}
              tickFormatter={(d) => `${d}d`}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 500 }}
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              label={{
                value: "Days since enrolment",
                position: "insideBottom",
                offset: -4,
                style: { fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 600 },
              }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 500 }}
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip content={<CohortTooltip cohorts={cohorts} colors={colorById} />} />
            <Legend content={<CohortLegend cohorts={cohorts} colors={colorById} />} />
            {cohorts.map((c) => (
              <Line
                key={c.id}
                type="monotone"
                dataKey={c.id}
                stroke={colorById[c.id]}
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 0, fill: colorById[c.id] }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                isAnimationActive={false}
                label={(props: { index: number; x: number; y: number; value: number }) =>
                  props.index === data.length - 1 ? (
                    <text
                      x={props.x + 6}
                      y={props.y + 4}
                      fontSize={12}
                      fontWeight={700}
                      fill="hsl(var(--foreground))"
                      stroke="hsl(var(--background))"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      {Math.round(props.value)}%
                    </text>
                  ) : (
                    ((<g />) as React.ReactElement)
                  )
                }
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CohortLegend({
  cohorts,
  colors,
}: {
  cohorts: CohortMeta[];
  colors: Record<string, string>;
}) {
  return (
    <ul className="mt-4 flex flex-wrap justify-center gap-2">
      {cohorts.map((c) => (
        <li
          key={c.id}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-sm"
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: colors[c.id] }}
          />
          <span className="font-semibold">{c.label}</span>
          <span className="font-mono text-micro text-muted-foreground">
            N={c.n.toLocaleString("en-IN")}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CohortTooltip({
  active,
  payload,
  label,
  cohorts,
  colors,
}: {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number }>;
  label?: string | number;
  cohorts: CohortMeta[];
  colors: Record<string, string>;
}) {
  if (!active || !payload?.length) return null;
  const cohortById = Object.fromEntries(cohorts.map((c: CohortMeta) => [c.id, c]));
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground shadow-lg">
      <p className="mb-1.5 font-mono text-micro font-semibold uppercase tracking-wider text-muted-foreground">
        Day {label}
      </p>
      <ul className="space-y-1">
        {payload.map((p: { dataKey: string; value: number }) => {
          const meta: CohortMeta | undefined = cohortById[p.dataKey];
          return (
            <li key={p.dataKey} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: colors[p.dataKey] }}
              />
              <span className="flex-1 truncate text-foreground">{meta?.label ?? p.dataKey}</span>
              <span className="font-mono font-bold tabular-nums text-foreground">
                {Math.round(p.value)}%
              </span>
              {meta ? (
                <span className="font-mono text-micro text-muted-foreground">
                  N={meta.n.toLocaleString("en-IN")}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
