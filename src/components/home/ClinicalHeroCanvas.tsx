import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface ClinicalNode3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  pulsePhase: number;
  label?: string;
}

const CLINICAL_PALETTE = [
  "rgba(37, 99, 235, ",  // Arzon Blue
  "rgba(13, 148, 136, ", // Medical Teal
  "rgba(16, 185, 129, ", // Mint Green
  "rgba(8, 31, 56, ",    // Deep Navy
  "rgba(59, 130, 246, ", // Light Blue
];

const CLINICAL_LABELS = [
  "ICH-GCP",
  "Clinical Coding",
  "Safety Database",
  "CDISC SDTM",
  "eCRF",
  "CTD Dossier",
  "PSUR / PBRER",
  "21 CFR Part 11",
];

export function ClinicalHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 750);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w && h) {
          width = w;
          height = h;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // 3D Spatial Geometry Configuration
    const NODE_COUNT = 75;
    const FOCAL_LENGTH = 340;
    const MAX_CONNECTION_DIST = 115;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Seed 3D Clinical Data Nodes with selective semantic labels
    const nodes: ClinicalNode3D[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const hasLabel = i < CLINICAL_LABELS.length;
      nodes.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 600,
        z: 140 + Math.random() * 620,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 10,
        vz: (Math.random() - 0.5) * 8,
        radius: hasLabel ? 3.5 : 2.0 + Math.random() * 2.4,
        color: CLINICAL_PALETTE[Math.floor(Math.random() * CLINICAL_PALETTE.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        label: hasLabel ? CLINICAL_LABELS[i] : undefined,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Spring-smoothed mouse camera parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5 + mouseX * 40;
      const centerY = height * 0.40 + mouseY * 24;

      // Subtle clinical telemetry grid
      ctx.save();
      ctx.strokeStyle = "rgba(37, 99, 235, 0.028)";
      ctx.lineWidth = 1;
      const gridSize = 48;
      const startX = (centerX % gridSize) - gridSize;
      const startY = (centerY % gridSize) - gridSize;
      for (let x = startX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = startY; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Update node 3D positions with subtle boundary bouncing
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!shouldReduceMotion) {
          node.x += node.vx * dt;
          node.y += node.vy * dt;
          node.z += node.vz * dt;
          node.pulsePhase += dt * 1.4;

          if (node.x < -520) { node.x = -520; node.vx *= -1; }
          if (node.x > 520) { node.x = 520; node.vx *= -1; }
          if (node.y < -320) { node.y = -320; node.vy *= -1; }
          if (node.y > 320) { node.y = 320; node.vy *= -1; }
          if (node.z < 120) { node.z = 120; node.vz *= -1; }
          if (node.z > 740) { node.z = 740; node.vz *= -1; }
        }
      }

      // Projected screen positions
      const projected = nodes.map((node) => {
        const scale = FOCAL_LENGTH / Math.max(node.z, 60);
        const px = centerX + node.x * scale;
        const py = centerY + node.y * scale;
        const depthAlpha = Math.max(0.12, Math.min(0.85, 1 - (node.z - 120) / 620));
        return { px, py, scale, depthAlpha, node };
      });

      // 1. Biometric Neural Connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          const dx = p1.node.x - p2.node.x;
          const dy = p1.node.y - p2.node.y;
          const dz = p1.node.z - p2.node.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < MAX_CONNECTION_DIST) {
            const lineAlpha = (1 - dist3D / MAX_CONNECTION_DIST) * Math.min(p1.depthAlpha, p2.depthAlpha) * 0.42;
            if (lineAlpha > 0.02) {
              ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha.toFixed(2)})`;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
          }
        }
      }

      // 2. Render Nodes with Depth Auras & Micro Labels
      for (let i = 0; i < projected.length; i++) {
        const { px, py, scale, depthAlpha, node } = projected[i];
        const pulse = 1 + Math.sin(node.pulsePhase) * 0.18;
        const r = Math.max(1.2, node.radius * scale * pulse);

        // Soft Outer Aura
        ctx.beginPath();
        ctx.arc(px, py, r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${(depthAlpha * 0.16).toFixed(2)})`;
        ctx.fill();

        // Core Point
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${depthAlpha.toFixed(2)})`;
        ctx.fill();

        // Render Floating 3D Clinical Micro-Label (e.g. "Clinical Coding", "ICH-GCP")
        if (node.label && depthAlpha > 0.35 && scale > 0.55) {
          ctx.save();
          const fontSize = Math.max(8.5, Math.min(11, 10 * scale));
          ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const textWidth = ctx.measureText(node.label).width;
          const padX = 6 * scale;
          const padY = 3.5 * scale;
          const badgeX = px;
          const badgeY = py - (r + 10 * scale);

          // Subtle pill backdrop
          ctx.fillStyle = `rgba(255, 255, 255, ${(depthAlpha * 0.85).toFixed(2)})`;
          ctx.strokeStyle = `rgba(208, 225, 253, ${(depthAlpha * 0.75).toFixed(2)})`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.roundRect(badgeX - textWidth / 2 - padX, badgeY - padY - 2, textWidth + padX * 2, fontSize + padY * 2, 6);
          ctx.fill();
          ctx.stroke();

          // Label text
          ctx.fillStyle = `rgba(8, 31, 56, ${(depthAlpha * 0.9).toFixed(2)})`;
          ctx.fillText(node.label, badgeX, badgeY + 1);
          ctx.restore();
        }
      }

      if (!shouldReduceMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
    />
  );
}
