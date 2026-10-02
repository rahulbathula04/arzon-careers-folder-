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
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        function getProfile(targetX) {
          const slice = ctx.getImageData(targetX, 0, 1, h).data;
          const lum = [];
          for (let y = 0; y < h; y++) {
            const idx = y * 4;
            lum.push(0.299 * slice[idx] + 0.587 * slice[idx + 1] + 0.114 * slice[idx + 2]);
          }
          return lum;
        }

        const p300 = getProfile(300);
        const p1300 = getProfile(1300);

        resolve({ p300: p300.slice(100, 300), p1300: p1300.slice(100, 300) });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  // Find line at x=300 around y=167 - dy
  // In p1300, y=167 had a minimum. Let's see where the corresponding minimum is in p300!
  // In p1300, relative index is 67 (since slice starts at 100).
  // Let's print local minima in p300:
  const minima300 = [];
  for (let i = 1; i < res.p300.length - 1; i++) {
    if (res.p300[i] < res.p300[i - 1] && res.p300[i] < res.p300[i + 1] && res.p300[i] < 160) {
      minima300.push({ y: 100 + i, lum: res.p300[i] });
    }
  }
  console.log('Minima at x=300 (y 100..300):', minima300);

  await browser.close();
}

main().catch(console.error);
