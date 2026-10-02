import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const lineData = await page.evaluate(async (dataUrl) => {
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

        // Let's test a slice on the right side where there is no handwriting:
        // x from 1250 to 1550, y from 100 to 1100
        // Find line positions at x = 1300 and x = 1500
        function findLinesAtX(targetX) {
          const slice = ctx.getImageData(targetX, 0, 1, h).data;
          const lum = [];
          for (let y = 0; y < h; y++) {
            const idx = y * 4;
            lum.push(0.299 * slice[idx] + 0.587 * slice[idx + 1] + 0.114 * slice[idx + 2]);
          }
          // smooth
          const smoothed = [];
          for (let y = 0; y < h; y++) {
            let sum = 0, count = 0;
            for (let dy = -2; dy <= 2; dy++) {
              if (y + dy >= 0 && y + dy < h) {
                sum += lum[y + dy];
                count++;
              }
            }
            smoothed.push(sum / count);
          }
          // find local minima that dip below background
          const minima = [];
          for (let y = 5; y < h - 5; y++) {
            if (smoothed[y] < smoothed[y - 1] && smoothed[y] < smoothed[y + 1]) {
              // check if it's a real line (dip of at least 8 lum)
              const bg = (smoothed[y - 5] + smoothed[y + 5]) / 2;
              if (bg - smoothed[y] > 6) {
                minima.push({ y, dip: bg - smoothed[y] });
              }
            }
          }
          return minima;
        }

        const lines1300 = findLinesAtX(1300);
        const lines1500 = findLinesAtX(1500);

        resolve({
          lines1300,
          lines1500,
          count1300: lines1300.length,
          count1500: lines1500.length
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Lines at x=1300:', lineData.lines1300);
  console.log('Lines at x=1500:', lineData.lines1500);
  await browser.close();
}

main().catch(console.error);
