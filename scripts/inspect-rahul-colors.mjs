import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const res = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const cropX = 150, cropY = 400, cropW = 200, cropH = 200;
        const canvas = document.createElement('canvas');
        canvas.width = cropW;
        canvas.height = cropH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        const data = ctx.getImageData(0, 0, cropW, cropH).data;
        // Find line pixels vs ink pixels
        let minLumPixel = null;
        let minLum = 999;
        const inkPixels = [];

        for (let y = 0; y < cropH; y++) {
          for (let x = 0; x < cropW; x++) {
            const idx = (y * cropW + x) * 4;
            const r = data[idx];
            const g = data[idx+1];
            const b = data[idx+2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            const diff = b - Math.max(r, g);
            if (lum < minLum) {
              minLum = lum;
              minLumPixel = { x, y, r, g, b, lum, diff };
            }
            if (diff > 5) {
              inkPixels.push({ x, y, r, g, b, lum, diff });
            }
          }
        }

        resolve({
          minLumPixel,
          inkCountDiff5: inkPixels.length,
          sampleInk: inkPixels.slice(0, 10),
          cropDataUrl: canvas.toDataURL('image/png')
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('scripts/cw90_rahul_region.png', Buffer.from(res.cropDataUrl.split(',')[1], 'base64'));
  console.log('Min lum pixel in Rahul region:', res.minLumPixel);
  console.log('Sample ink in Rahul region:', res.sampleInk.slice(0, 5));
  await browser.close();
}

main().catch(console.error);
