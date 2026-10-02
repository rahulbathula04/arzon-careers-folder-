import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cleaned_sig.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const traceData = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const data = ctx.getImageData(0, 0, w, h).data;

        // Function to find the center of ink mass at given (x, y) window
        function getInkCenter(cx, cy, r = 12) {
          let sumX = 0, sumY = 0, weight = 0;
          for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
              const nx = cx + dx;
              const ny = cy + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const a = data[(ny * w + nx) * 4 + 3];
                if (a > 50) {
                  sumX += nx * a;
                  sumY += ny * a;
                  weight += a;
                }
              }
            }
          }
          if (weight === 0) return null;
          return { x: Math.round(sumX / weight), y: Math.round(sumY / weight), weight };
        }

        // Key landmark seed points along Rahul Bathula's signature
        // 1. R stem:
        const rStem = [
          getInkCenter(115, 145),
          getInkCenter(105, 185),
          getInkCenter(98, 230),
          getInkCenter(88, 280),
          getInkCenter(76, 330),
          getInkCenter(65, 375),
          getInkCenter(58, 395),
          getInkCenter(68, 390),
          getInkCenter(72, 360)
        ].filter(Boolean);

        // 2. R top flourish & bowl into belt into 'a' into 'h' into 'u' into 'l':
        const rahulCursive = [
          getInkCenter(25, 105),
          getInkCenter(65, 60),
          getInkCenter(120, 38),
          getInkCenter(180, 32),
          getInkCenter(240, 42),
          getInkCenter(295, 65),
          getInkCenter(335, 95),
          getInkCenter(355, 130),
          getInkCenter(345, 165),
          getInkCenter(315, 195),
          getInkCenter(270, 220),
          getInkCenter(210, 238),
          getInkCenter(150, 245),
          getInkCenter(95, 246),
          // belt crosses into a:
          getInkCenter(140, 252),
          getInkCenter(185, 262),
          getInkCenter(225, 270),
          // a loop:
          getInkCenter(250, 265),
          getInkCenter(275, 275),
          getInkCenter(285, 300),
          getInkCenter(270, 322),
          getInkCenter(245, 318),
          getInkCenter(230, 295),
          getInkCenter(240, 275),
          getInkCenter(270, 275),
          getInkCenter(300, 295),
          // h ascender:
          getInkCenter(340, 265),
          getInkCenter(380, 195),
          getInkCenter(425, 115),
          getInkCenter(455, 75),
          getInkCenter(475, 70),
          getInkCenter(470, 95),
          getInkCenter(445, 150),
          getInkCenter(405, 230),
          getInkCenter(375, 300),
          getInkCenter(365, 335),
          // h hump:
          getInkCenter(380, 295),
          getInkCenter(410, 265),
          getInkCenter(440, 265),
          getInkCenter(460, 290),
          getInkCenter(465, 325),
          getInkCenter(455, 350),
          // u valley:
          getInkCenter(475, 362),
          getInkCenter(500, 362),
          getInkCenter(520, 345),
          getInkCenter(535, 315),
          // l ascender:
          getInkCenter(570, 235),
          getInkCenter(620, 140),
          getInkCenter(665, 75),
          getInkCenter(690, 70),
          getInkCenter(695, 88),
          getInkCenter(665, 155),
          getInkCenter(625, 240),
          getInkCenter(585, 315),
          getInkCenter(568, 355),
          getInkCenter(580, 370),
          getInkCenter(610, 362),
          getInkCenter(660, 340),
          getInkCenter(715, 315),
          getInkCenter(745, 305)
        ].filter(Boolean);

        // 3. B stem:
        const bStem = [
          getInkCenter(825, 160),
          getInkCenter(815, 210),
          getInkCenter(805, 270),
          getInkCenter(805, 320),
          getInkCenter(815, 355),
          getInkCenter(825, 370)
        ].filter(Boolean);

        // 4. B lobes:
        const bLobes = [
          getInkCenter(825, 160),
          getInkCenter(870, 140),
          getInkCenter(935, 140),
          getInkCenter(980, 165),
          getInkCenter(990, 195),
          getInkCenter(965, 225),
          getInkCenter(915, 242),
          getInkCenter(865, 246),
          // lower lobe:
          getInkCenter(920, 252),
          getInkCenter(975, 275),
          getInkCenter(995, 310),
          getInkCenter(985, 340),
          getInkCenter(945, 362),
          getInkCenter(885, 372),
          getInkCenter(830, 370)
        ].filter(Boolean);

        // 5. a to end of Bathula with flourish:
        const bathulaCursive = [
          getInkCenter(835, 368),
          getInkCenter(865, 365),
          getInkCenter(895, 345),
          getInkCenter(915, 330),
          getInkCenter(915, 315),
          getInkCenter(895, 315),
          getInkCenter(880, 335),
          getInkCenter(885, 360),
          getInkCenter(915, 365),
          getInkCenter(945, 355),
          // t stem:
          getInkCenter(972, 175),
          getInkCenter(970, 225),
          getInkCenter(968, 285),
          getInkCenter(970, 345),
          getInkCenter(978, 365),
          // h ascender:
          getInkCenter(1010, 315),
          getInkCenter(1040, 220),
          getInkCenter(1070, 160),
          getInkCenter(1090, 155),
          getInkCenter(1090, 175),
          getInkCenter(1065, 240),
          getInkCenter(1035, 315),
          getInkCenter(1018, 365),
          // h hump:
          getInkCenter(1035, 335),
          getInkCenter(1065, 315),
          getInkCenter(1085, 325),
          getInkCenter(1090, 355),
          getInkCenter(1080, 378),
          // u valley:
          getInkCenter(1095, 388),
          getInkCenter(1115, 385),
          getInkCenter(1135, 365),
          getInkCenter(1142, 335),
          // l ascender:
          getInkCenter(1175, 230),
          getInkCenter(1210, 160),
          getInkCenter(1235, 145),
          getInkCenter(1245, 155),
          getInkCenter(1235, 185),
          getInkCenter(1205, 260),
          getInkCenter(1175, 330),
          getInkCenter(1168, 368),
          // a:
          getInkCenter(1185, 350),
          getInkCenter(1210, 345),
          getInkCenter(1225, 360),
          getInkCenter(1215, 385),
          getInkCenter(1190, 395),
          getInkCenter(1175, 378),
          getInkCenter(1185, 360),
          getInkCenter(1210, 365),
          getInkCenter(1228, 385),
          // flourish loop:
          getInkCenter(1248, 415),
          getInkCenter(1255, 445),
          getInkCenter(1238, 470),
          getInkCenter(1195, 480),
          getInkCenter(1140, 465),
          getInkCenter(1090, 435),
          getInkCenter(1055, 410),
          getInkCenter(1040, 395),
          getInkCenter(1055, 390),
          getInkCenter(1100, 405),
          getInkCenter(1165, 425),
          getInkCenter(1235, 435),
          getInkCenter(1285, 425),
          getInkCenter(1300, 400),
          getInkCenter(1280, 375),
          getInkCenter(1245, 370)
        ].filter(Boolean);

        // 6. t crossbar:
        const tCross = [
          getInkCenter(930, 230),
          getInkCenter(965, 228),
          getInkCenter(1005, 225)
        ].filter(Boolean);

        resolve({ rStem, rahulCursive, bStem, bLobes, bathulaCursive, tCross });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('scripts/landmarks.json', JSON.stringify(traceData, null, 2));
  console.log('Saved landmarks.json with stroke point counts:', {
    rStem: traceData.rStem.length,
    rahulCursive: traceData.rahulCursive.length,
    bStem: traceData.bStem.length,
    bLobes: traceData.bLobes.length,
    bathulaCursive: traceData.bathulaCursive.length,
    tCross: traceData.tCross.length,
  });

  await browser.close();
}

main().catch(console.error);
