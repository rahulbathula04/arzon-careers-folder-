/**
 * LineChartSvg - pure SVG line + area chart, no deps. Motion-safe, respects
 * reduced-motion. Used by salary trajectory and growth-index chapters.
 */
import { useId, useState } from "react";

export interface LineChartPoint {
  x: string | number;
  y: number;
  label?: string;
}

export function LineChartSvg({
  points,
  height = 200,
  yFormat = (n: number) => String(n),
  accent = "teal",
  ariaLabel,
}: {
  points: LineChartPoint[];
  height?: number;
  yFormat?: (n: number) => string;
  accent?: "teal" | "amber" | "emerald";
  ariaLabel: string;
}) {
  const gid = useId();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const W = 640;
  const H = height;
  const padL = 46;
  const padR = 12;
  const padT = 14;
  const padB = 28;
  const iw = W - padL - padR;
  const ih = H - padT - padB;

  const ys = points.map((p) => p.y);
  const yMax = Math.max(...ys) * 1.08;
  const yMin = Math.min(0, Math.min(...ys) * 0.9);
  const yRange = yMax - yMin || 1;

  const xStep = points.length > 1 ? iw / (points.length - 1) : 0;
  const px = (i: number) => padL + i * xStep;
  const py = (v: number) => padT + ih - ((v - yMin) / yRange) * ih;

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(p.y)}`).join(" ");
  const areaPath = `${linePath} L ${px(points.length - 1)} ${padT + ih} L ${px(0)} ${padT + ih} Z`;

  const stroke =
    accent === "teal"
      ? "hsl(174 72% 62%)"
      : accent === "amber"
        ? "hsl(43 96% 60%)"
        : "hsl(155 65% 55%)";

  // Y ticks (4 lines).
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => yMin + t * yRange);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="w-full">
      <defs>
        <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={padL}
            y1={py(t)}
            x2={W - padR}
            y2={py(t)}
            stroke="hsl(0 0% 100% / 0.08)"
            strokeWidth={1}
          />
          <text
            x={padL - 6}
            y={py(t) + 4}
            fill="hsl(0 0% 100% / 0.45)"
            fontSize="10"
            textAnchor="end"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            {yFormat(t)}
          </text>
        </g>
      ))}

      <path d={areaPath} fill={`url(#fill-${gid})`} />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {hoverIdx !== null && points[hoverIdx] && (
        <line
          x1={px(hoverIdx)}
          y1={padT}
          x2={px(hoverIdx)}
          y2={padT + ih}
          stroke={stroke}
          strokeOpacity={0.35}
          strokeDasharray="3 3"
          strokeWidth={1}
        />
      )}

      {points.map((p, i) => {
        const active = hoverIdx === i;
        return (
          <g key={i}>
            <circle
              cx={px(i)}
              cy={py(p.y)}
              r={active ? 7 : 4}
              fill={stroke}
              opacity={active ? 0.35 : 0.9}
              className="motion-safe:[transition:r_160ms_ease,opacity_160ms_ease]"
            />
            <circle cx={px(i)} cy={py(p.y)} r={active ? 4 : 2.4} fill={stroke} />
            <circle cx={px(i)} cy={py(p.y)} r={active ? 1.6 : 1.2} fill="hsl(220 40% 7%)" />
            <text
              x={px(i)}
              y={H - 10}
              fill={active ? "hsl(0 0% 100% / 0.95)" : "hsl(0 0% 100% / 0.65)"}
              fontSize="11"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, monospace"
            >
              {String(p.x)}
            </text>
            {p.label && (
              <text
                x={px(i)}
                y={py(p.y) - 10}
                fill="hsl(0 0% 100% / 0.9)"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
              >
                {p.label}
              </text>
            )}
            {/* Hit area with accessible tooltip */}
            <rect
              x={px(i) - (xStep || 24) / 2}
              y={padT}
              width={xStep || 24}
              height={ih}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${p.x}: ${yFormat(p.y)}${p.label ? ` - ${p.label}` : ""}`}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx((cur) => (cur === i ? null : cur))}
              onFocus={() => setHoverIdx(i)}
              onBlur={() => setHoverIdx((cur) => (cur === i ? null : cur))}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <title>{`${p.x}: ${yFormat(p.y)}${p.label ? ` - ${p.label}` : ""}`}</title>
            </rect>
          </g>
        );
      })}

      {hoverIdx !== null &&
        points[hoverIdx] &&
        (() => {
          const p = points[hoverIdx];
          const tx = Math.max(padL + 60, Math.min(W - padR - 60, px(hoverIdx)));
          const ty = Math.max(padT + 36, py(p.y) - 22);
          return (
            <g pointerEvents="none">
              <rect
                x={tx - 60}
                y={ty - 30}
                width={120}
                height={38}
                rx={8}
                fill="hsl(220 40% 7% / 0.92)"
                stroke={stroke}
                strokeOpacity={0.5}
                strokeWidth={1}
              />
              <text
                x={tx}
                y={ty - 16}
                fill="hsl(0 0% 100% / 0.6)"
                fontSize="9"
                textAnchor="middle"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}
              >
                {String(p.x)}
              </text>
              <text
                x={tx}
                y={ty - 2}
                fill={stroke}
                fontSize="13"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
              >
                {yFormat(p.y)}
              </text>
            </g>
          );
        })()}
    </svg>
  );
}

export default LineChartSvg;
