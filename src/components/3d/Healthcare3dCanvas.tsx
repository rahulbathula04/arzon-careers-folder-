import { useEffect, useRef, memo } from "react";
import { useReducedMotion } from "framer-motion";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  label?: string;
  glow: string;
}

export function Healthcare3dCanvas({
  className = "absolute inset-0 pointer-events-none opacity-80",
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - width / 2) / (width / 2);
      const y = (e.clientY - rect.top - height / 2) / (height / 2);
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Generate 3D Nodes (Molecules, DB Nodes, GCC Hubs)
    const nodeCount = 38;
    const nodes: Node3D[] = [];
    const colors = [
      { color: "rgba(27, 63, 139, 0.9)", glow: "rgba(27, 63, 139, 0.4)" }, // Navy
      { color: "rgba(13, 148, 136, 0.9)", glow: "rgba(13, 148, 136, 0.4)" }, // Teal
      { color: "rgba(138, 109, 31, 0.9)", glow: "rgba(138, 109, 31, 0.4)" }, // Gold
      { color: "rgba(2, 132, 199, 0.9)", glow: "rgba(2, 132, 199, 0.4)" }, // Sky Blue
    ];

    const labels = [
      "Argus 8.4",
      "MedDRA 27.0",
      "RAVE EDC",
      "ICD-10-CM",
      "CDISC SDTM",
      "ICH-GCP E6",
      "eCTD Dossier",
      "Novartis GCC",
      "IQVIA",
      "Parexel",
    ];

    const sphereRadius = Math.min(width, height) * 0.38;

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution for uniform 3D placement
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = sphereRadius * (0.6 + Math.random() * 0.5);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const theme = colors[i % colors.length];
      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        radius: i < labels.length ? 4.5 : 2.5 + Math.random() * 2,
        color: theme.color,
        glow: theme.glow,
        label: i < labels.length ? labels[i] : undefined,
      });
    }

    let angleX = 0;
    let angleY = 0;
    const fov = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!shouldReduceMotion) {
        angleY += 0.003 + mouseRef.current.x * 0.005;
        angleX += 0.0015 - mouseRef.current.y * 0.005;
      }

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projectedNodes = nodes.map((node) => {
        // Rotate around Y
        let x1 = node.baseX * cosY - node.baseZ * sinY;
        let z1 = node.baseZ * cosY + node.baseX * sinY;

        // Rotate around X
        let y1 = node.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.baseY * sinX;

        // Perspective Projection
        const scale = fov / (fov + z2 + 300);
        const projX = x1 * scale + width * 0.78; // offset to right side on desktop
        const projY = y1 * scale + height * 0.5;

        return {
          ...node,
          projX,
          projY,
          projScale: scale,
          zDepth: z2,
        };
      });

      // Sort by depth (painter's algorithm)
      projectedNodes.sort((a, b) => a.zDepth - b.zDepth);

      // Draw 3D Connection Lines (Molecular & Mesh Bonds)
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          const dx = p1.baseX - p2.baseX;
          const dy = p1.baseY - p2.baseY;
          const dz = p1.baseZ - p2.baseZ;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < sphereRadius * 0.65) {
            const alpha = (1 - dist / (sphereRadius * 0.65)) * 0.25 * ((p1.projScale + p2.projScale) / 2);
            ctx.strokeStyle = `rgba(27, 63, 139, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Glowing Nodes & Tags
      projectedNodes.forEach((node) => {
        const radius = Math.max(1, node.radius * node.projScale);
        const alpha = Math.min(1, Math.max(0.2, (node.zDepth + sphereRadius) / (sphereRadius * 2)));

        // Outer 3D Glow
        const gradient = ctx.createRadialGradient(
          node.projX,
          node.projY,
          0,
          node.projX,
          node.projY,
          radius * 3.5
        );
        gradient.addColorStop(0, node.glow);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Node Core
        ctx.fillStyle = node.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // 3D Tag Labels (e.g. Oracle Argus, MedDRA, etc.)
        if (node.label && node.projScale > 0.7) {
          ctx.font = `600 ${Math.round(10 * node.projScale)}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `rgba(27, 63, 139, ${Math.min(0.9, alpha + 0.2)})`;
          ctx.textAlign = "left";
          ctx.fillText(node.label, node.projX + radius + 4, node.projY + 3);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [interactive, shouldReduceMotion]);

  return <canvas ref={canvasRef} className={className} />;
}

export const MemoizedHealthcare3dCanvas = memo(Healthcare3dCanvas);
