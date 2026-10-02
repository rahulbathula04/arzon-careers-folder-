import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const analysis = await page.evaluate(async (dataUrl) => {
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

        // Let's sample along known signature regions:
        // Rahul: x = 100 to 700, y = 300 to 650
        // Bathula: x = 800 to 1350, y = 380 to 700
        const data = ctx.getImageData(0, 0, w, h).data;

        // Collect color profiles of darkest pixels (which are ink)
        const darkPixels = [];
        for (let y = 300; y < 700; y += 2) {
          for (let x = 100; x < 1350; x += 2) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (lum < 90) {
              darkPixels.push({
                x, y, r, g, b, lum,
                bMinusR: b - r,
                bMinusG: b - g,
                gMinusR: g - r
              });
            }
          }
        }

        resolve({
          sampleCount: darkPixels.length,
          samples: darkPixels.slice(0, 20),
          stats: {
            avgBMinusR: darkPixels.reduce((s, p) => s + p.bMinusR, 0) / (darkPixels.length || 1),
            avgBMinusG: darkPixels.reduce((s, p) => s + p.bMinusG, 0) / (darkPixels.length || 1),
            avgLum: darkPixels.reduce((s, p) => s + p.lum, 0) / (darkPixels.length || 1),
          }
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Ink analysis:', analysis.stats);
  console.log('Sample ink pixels:', analysis.samples.slice(0, 10));
  await browser.close();
}

main().catch(console.error);
