import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Ray3D {
  angle: number;
  radius: number;
  z: number;
  speed: number;
  length: number;
  color: string;
  weight: number;
}

const PALETTE = [
  "rgba(0, 85, 255, ",   // Scaler Electric Blue
  "rgba(43, 122, 255, ", // Bright Tech Blue
  "rgba(0, 183, 189, ",  // Scaler Cyan Accent
  "rgba(107, 163, 255, ",// Luminous Blue
  "rgba(6, 182, 212, ",  // Cyan
];

export function ScalerHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

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

    // 3D Perspective Vanishing Point & Rays Setup
    const RAY_COUNT = 110;
    const Z_NEAR = 60;
    const Z_FAR = 1100;
    const FOCAL_LENGTH = 380;

    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX = nx;
      mouseY = ny;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Initialize 3D Ray Pool
    const rays: Ray3D[] = [];
    for (let i = 0; i < RAY_COUNT; i++) {
      rays.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.pow(Math.random(), 0.7) * 550,
        z: Z_NEAR + Math.random() * (Z_FAR - Z_NEAR),
        speed: 180 + Math.random() * 260,
        length: 50 + Math.random() * 110,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        weight: 0.8 + Math.random() * 1.6,
      });
    }

    // 20 Perspective Guide Wireframe Angles (matching Scaler's radial lines)
    const GUIDE_ANGLES: number[] = [];
    const guideCount = 24;
    for (let i = 0; i < guideCount; i++) {
      GUIDE_ANGLES.push((i * Math.PI * 2) / guideCount);
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth mouse lerp
      currentMouseX += (mouseX - currentMouseX) * 0.06;
      currentMouseY += (mouseY - currentMouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Central Vanishing Point (centered right behind the H1 headline)
      const vanishX = width * 0.5 + currentMouseX * 45;
      const vanishY = height * 0.35 + currentMouseY * 25;

      // 1. Draw subtle architectural perspective guide rays
      ctx.save();
      const maxDist = Math.max(width, height) * 1.2;
      for (let i = 0; i < GUIDE_ANGLES.length; i++) {
        const rad = GUIDE_ANGLES[i];
        const endX = vanishX + Math.cos(rad) * maxDist;
        const endY = vanishY + Math.sin(rad) * maxDist;

        const grad = ctx.createLinearGradient(vanishX, vanishY, endX, endY);
        grad.addColorStop(0, "rgba(0, 85, 255, 0.02)");
        grad.addColorStop(0.2, "rgba(0, 85, 255, 0.12)");
        grad.addColorStop(0.65, "rgba(0, 183, 189, 0.06)");
        grad.addColorStop(1, "rgba(43, 122, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Animate and project 3D Ray Streaks
      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];

        if (!shouldReduceMotion) {
          ray.z -= ray.speed * dt;
          if (ray.z < Z_NEAR) {
            ray.z = Z_FAR;
            ray.angle = Math.random() * Math.PI * 2;
            ray.radius = 30 + Math.pow(Math.random(), 0.7) * 550;
          }
        }

        // 3D Perspective scale
        const scaleFront = FOCAL_LENGTH / ray.z;
        const zBack = ray.z + ray.length;
        const scaleBack = FOCAL_LENGTH / zBack;

        const xFront = vanishX + Math.cos(ray.angle) * ray.radius * scaleFront;
        const yFront = vanishY + Math.sin(ray.angle) * ray.radius * scaleFront;

        const xBack = vanishX + Math.cos(ray.angle) * ray.radius * scaleBack;
        const yBack = vanishY + Math.sin(ray.angle) * ray.radius * scaleBack;

        // Depth alpha calculation: fades in at far distance, peaks mid-flight, fades near viewer
        let alpha = 1;
        if (ray.z > Z_FAR - 200) {
          alpha = (Z_FAR - ray.z) / 200;
        } else if (ray.z < 180) {
          alpha = (ray.z - Z_NEAR) / 120;
        }
        alpha = Math.max(0, Math.min(alpha * 0.75, 0.85));

        if (alpha > 0.01) {
          ctx.beginPath();
          ctx.moveTo(xBack, yBack);
          ctx.lineTo(xFront, yFront);
          ctx.strokeStyle = `${ray.color}${alpha.toFixed(2)})`;
          ctx.lineWidth = Math.min(2.6, Math.max(0.6, scaleFront * ray.weight * 1.5));
          ctx.lineCap = "round";
          ctx.stroke();
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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
