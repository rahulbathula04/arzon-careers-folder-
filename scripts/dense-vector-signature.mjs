import { chromium } from '@playwright/test';
import fs from 'fs';

// Helper: Catmull-Rom spline to cubic Bezier
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

function pt(x, y) { return { x, y }; }

// 1. R stem
const rStem = [
  pt(120, 145), pt(112, 175), pt(104, 215), pt(96, 260),
  pt(88, 305), pt(78, 350), pt(68, 385), pt(60, 400),
  pt(55, 395), pt(58, 380), pt(68, 365), pt(76, 355)
];

// 2. R top flourish into continuous cursive Rahul
const rahulCursive = [
  pt(20, 115), pt(35, 85), pt(65, 58), pt(105, 42),
  pt(155, 34), pt(210, 36), pt(265, 48), pt(310, 72),
  pt(342, 105), pt(352, 138), pt(342, 172), pt(315, 202),
  pt(270, 224), pt(215, 238), pt(155, 245), pt(95, 248),
  // crossing into a:
  pt(135, 252), pt(180, 262), pt(225, 270),
  // a:
  pt(250, 265), pt(275, 275), pt(285, 298), pt(272, 320),
  pt(248, 318), pt(232, 298), pt(240, 276), pt(268, 275), pt(298, 295),
  // h ascender:
  pt(335, 268), pt(375, 200), pt(415, 128), pt(448, 78),
  pt(468, 68), pt(476, 78), pt(468, 108), pt(440, 168),
  pt(402, 245), pt(375, 308), pt(366, 335),
  // h shoulder:
  pt(382, 298), pt(410, 268), pt(438, 265), pt(460, 288),
  pt(466, 322), pt(455, 348),
  // u valley:
  pt(472, 362), pt(498, 365), pt(520, 350), pt(535, 318),
  // l ascender:
  pt(565, 242), pt(612, 148), pt(655, 82), pt(682, 68),
  pt(694, 76), pt(688, 102), pt(655, 175), pt(615, 255),
  pt(578, 328), pt(568, 358), pt(578, 370), pt(610, 362),
  pt(658, 342), pt(710, 318), pt(745, 305)
];

// 3. B stem
const bStem = [
  pt(820, 162), pt(814, 198), pt(808, 245), pt(806, 290),
  pt(808, 330), pt(816, 358), pt(825, 368)
];

// 4. B lobes
const bLobes = [
  pt(820, 162), pt(848, 146), pt(888, 138), pt(932, 142),
  pt(968, 158), pt(985, 182), pt(986, 208), pt(968, 228),
  pt(935, 242), pt(892, 246), pt(865, 248),
  // lower lobe:
  pt(905, 250), pt(948, 260), pt(980, 280), pt(996, 308),
  pt(995, 332), pt(976, 352), pt(942, 365), pt(898, 372),
  pt(855, 370), pt(825, 368)
];

// 5. Bathula continuous cursive & flourish
const bathulaCursive = [
  pt(825, 368), pt(855, 368), pt(882, 358), pt(905, 342),
  pt(915, 325), pt(912, 310), pt(892, 312), pt(878, 328),
  pt(880, 348), pt(896, 365), pt(922, 368), pt(945, 358),
  // t stem:
  pt(972, 178), pt(971, 210), pt(970, 248), pt(968, 288),
  pt(968, 328), pt(972, 355), pt(982, 362),
  // h ascender:
  pt(998, 335), pt(1022, 268), pt(1050, 198), pt(1072, 158),
  pt(1086, 152), pt(1090, 168), pt(1078, 212), pt(1055, 272),
  pt(1032, 330), pt(1018, 365),
  // h shoulder:
  pt(1030, 338), pt(1052, 318), pt(1075, 315), pt(1088, 335),
  pt(1090, 362), pt(1080, 380),
  // u valley:
  pt(1090, 388), pt(1108, 390), pt(1126, 378), pt(1138, 355), pt(1142, 338),
  // l ascender:
  pt(1162, 275), pt(1192, 205), pt(1220, 158), pt(1238, 148),
  pt(1246, 158), pt(1240, 185), pt(1218, 245), pt(1192, 305),
  pt(1172, 350), pt(1168, 368),
  // a:
  pt(1185, 355), pt(1205, 348), pt(1220, 358), pt(1222, 375),
  pt(1210, 390), pt(1190, 395), pt(1178, 382), pt(1182, 368),
  pt(1198, 365), pt(1218, 376), pt(1230, 392),
  // flourish loop:
  pt(1246, 415), pt(1258, 442), pt(1252, 468), pt(1230, 482),
  pt(1192, 486), pt(1142, 474), pt(1092, 446), pt(1052, 416),
  pt(1032, 394), pt(1040, 382), pt(1072, 386), pt(1130, 404),
  pt(1198, 424), pt(1260, 436), pt(1295, 424), pt(1306, 402),
  pt(1292, 382), pt(1265, 374)
];

// 6. t crossbar
const tCross = [
  pt(935, 230), pt(968, 227), pt(1005, 224), pt(1018, 223)
];

const pathRStem = pointsToPath(rStem, 0.5);
const pathRahulCursive = pointsToPath(rahulCursive, 0.5);
const pathBStem = pointsToPath(bStem, 0.5);
const pathBLobes = pointsToPath(bLobes, 0.5);
const pathBathulaCursive = pointsToPath(bathulaCursive, 0.5);
const pathTCross = pointsToPath(tCross, 0.5);

const allPts = [...rStem, ...rahulCursive, ...bStem, ...bLobes, ...bathulaCursive, ...tCross];
const minX = Math.min(...allPts.map(p => p.x));
const maxX = Math.max(...allPts.map(p => p.x));
const minY = Math.min(...allPts.map(p => p.y));
const maxY = Math.max(...allPts.map(p => p.y));

const pad = 24;
const vbX = minX - pad;
const vbY = minY - pad;
const vbW = maxX - minX + pad * 2;
const vbH = maxY - minY + pad * 2;

const svgDoc = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${vbW}" height="${vbH}" fill="none">
  <defs>
    <filter id="ink-flow" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="0.3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <g stroke="#071A4A" stroke-linecap="round" stroke-linejoin="round" filter="url(#ink-flow)">
    <!-- R Left Vertical Spine -->
    <path d="${pathRStem}" stroke-width="4.6" />

    <!-- R Top Flourish, Bowl, Belt & Cursive "ahul" -->
    <path d="${pathRahulCursive}" stroke-width="4.2" />

    <!-- B Stem -->
    <path d="${pathBStem}" stroke-width="4.4" />

    <!-- B Dual Lobes -->
    <path d="${pathBLobes}" stroke-width="4.0" />

    <!-- Cursive "athula" with Ascenders & Master Paraph Flourish -->
    <path d="${pathBathulaCursive}" stroke-width="3.9" />

    <!-- t Crossbar -->
    <path d="${pathTCross}" stroke-width="3.2" />
  </g>
</svg>
`.trim();

fs.writeFileSync('public/brand/rahul-bathula-signature.svg', svgDoc);

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
  fs.writeFileSync('scripts/dense_vector_rendered.png', buffer);
  console.log('Saved dense vector rendered signature to public/brand/rahul-bathula-signature.png and svg');
  await browser.close();
}

renderPng().catch(console.error);
