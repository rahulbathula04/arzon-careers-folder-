import { chromium } from '@playwright/test';
import fs from 'fs';

const landmarks = JSON.parse(fs.readFileSync('scripts/landmarks.json', 'utf8'));

// Convert a series of points into a smooth cubic Bezier path using Catmull-Rom to Bezier
function pointsToPath(points, tension = 0.5) {
  if (!points || points.length < 2) return '';
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;

    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }

  return d;
}

const pathRStem = pointsToPath(landmarks.rStem, 0.8);
const pathRahulCursive = pointsToPath(landmarks.rahulCursive, 0.8);
const pathBStem = pointsToPath(landmarks.bStem, 0.8);
const pathBLobes = pointsToPath(landmarks.bLobes, 0.8);
const pathBathulaCursive = pointsToPath(landmarks.bathulaCursive, 0.8);
const pathTCross = pointsToPath(landmarks.tCross, 0.8);

// Combine and calculate bounding box
const allPoints = [
  ...landmarks.rStem,
  ...landmarks.rahulCursive,
  ...landmarks.bStem,
  ...landmarks.bLobes,
  ...landmarks.bathulaCursive,
  ...landmarks.tCross
];

const minX = Math.min(...allPoints.map(p => p.x));
const maxX = Math.max(...allPoints.map(p => p.x));
const minY = Math.min(...allPoints.map(p => p.y));
const maxY = Math.max(...allPoints.map(p => p.y));

const pad = 25;
const vbX = minX - pad;
const vbY = minY - pad;
const vbW = maxX - minX + pad * 2;
const vbH = maxY - minY + pad * 2;

const svgDoc = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${vbW}" height="${vbH}" fill="none">
  <defs>
    <!-- Soft ink bleed for authentic fountain pen look -->
    <filter id="ink-bleed" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="0.4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <g stroke="#071A4A" stroke-linecap="round" stroke-linejoin="round" filter="url(#ink-bleed)">
    <!-- R Left Vertical Stem -->
    <path d="${pathRStem}" stroke-width="4.4" />

    <!-- R Top Flourish & Full Continuous Cursive to l -->
    <path d="${pathRahulCursive}" stroke-width="4.0" />

    <!-- B Stem -->
    <path d="${pathBStem}" stroke-width="4.2" />

    <!-- B Lobes -->
    <path d="${pathBLobes}" stroke-width="4.0" />

    <!-- Bathula Full Continuous Cursive & Paraph Flourish -->
    <path d="${pathBathulaCursive}" stroke-width="3.8" />

    <!-- t Crossbar -->
    <path d="${pathTCross}" stroke-width="3.2" />
  </g>
</svg>
`.trim();

fs.writeFileSync('public/brand/rahul-bathula-signature.svg', svgDoc);
console.log('Saved public/brand/rahul-bathula-signature.svg with viewBox:', `${vbX} ${vbY} ${vbW} ${vbH}`);

async function renderPng() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; background: transparent;">
        ${svgDoc}
      </body>
    </html>
  `);

  const svgElement = await page.$('svg');
  const buffer = await svgElement.screenshot({ omitBackground: true });
  fs.writeFileSync('public/brand/rahul-bathula-signature.png', buffer);
  fs.writeFileSync('scripts/rendered_from_svg.png', buffer);
  console.log('Saved public/brand/rahul-bathula-signature.png from authentic vector curves');
  await browser.close();
}

renderPng().catch(console.error);
