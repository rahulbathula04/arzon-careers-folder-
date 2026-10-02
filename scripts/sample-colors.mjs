import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const samples = await page.evaluate(async (dataUrl) => {
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

        // Let's sample a vertical slice where we know there are ruled lines but no ink:
        // Say x = 1100, y from 300 to 700
        const sliceData = ctx.getImageData(1050, 300, 50, 400).data;
        // Find local minima of luminance (ruled lines)
        const linePixels = [];
        const paperPixels = [];

        for (let y = 0; y < 400; y++) {
          for (let x = 0; x < 50; x++) {
            const idx = (y * 50 + x) * 4;
            const r = sliceData[idx];
            const g = sliceData[idx + 1];
            const b = sliceData[idx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            const bDelta = b - Math.max(r, g);
            const sat = Math.max(r, g, b) - Math.min(r, g, b);

            if (lum < 160) {
              linePixels.push({ r, g, b, lum, bDelta, sat });
            } else if (lum > 185) {
              paperPixels.push({ r, g, b, lum, bDelta, sat });
            }
          }
        }

        // Now sample signature ink:
        // Let's sample across the 'R' stroke, say x = 150..200, y = 450..550
        const inkSlice = ctx.getImageData(150, 450, 50, 100).data;
        const inkPixels = [];
        for (let y = 0; y < 100; y++) {
          for (let x = 0; x < 50; x++) {
            const idx = (y * 50 + x) * 4;
            const r = inkSlice[idx];
            const g = inkSlice[idx + 1];
            const b = inkSlice[idx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            const bDelta = b - Math.max(r, g);
            const sat = Math.max(r, g, b) - Math.min(r, g, b);
            if (lum < 130) {
              inkPixels.push({ r, g, b, lum, bDelta, sat });
            }
          }
        }

        resolve({
          paperSample: paperPixels.slice(0, 5),
          lineSample: linePixels.slice(0, 10),
          inkSample: inkPixels.slice(0, 10),
          lineStats: {
            avgBDelta: linePixels.reduce((s, p) => s + p.bDelta, 0) / (linePixels.length || 1),
            avgSat: linePixels.reduce((s, p) => s + p.sat, 0) / (linePixels.length || 1),
            avgLum: linePixels.reduce((s, p) => s + p.lum, 0) / (linePixels.length || 1),
          },
          inkStats: {
            avgBDelta: inkPixels.reduce((s, p) => s + p.bDelta, 0) / (inkPixels.length || 1),
            avgSat: inkPixels.reduce((s, p) => s + p.sat, 0) / (inkPixels.length || 1),
            avgLum: inkPixels.reduce((s, p) => s + p.lum, 0) / (inkPixels.length || 1),
          }
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log(JSON.stringify(samples, null, 2));
  await browser.close();
}

main().catch(console.error);
