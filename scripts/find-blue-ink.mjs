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

        const data = ctx.getImageData(0, 0, w, h).data;
        // Find pixels with distinct blue hue: b - r > 15 and b - g > 10
        let minX = w, maxX = 0, minY = h, maxY = 0;
        let count = 0;
        const sampleBlue = [];

        for (let y = 150; y < 1000; y++) {
          for (let x = 50; x < 1500; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            // Blue ballpoint ink typically has b noticeably higher than r and g
            // Let's test b - r > 20 and b - g > 15
            if (b - r > 25 && b - g > 20) {
              count++;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              if (sampleBlue.length < 15) {
                sampleBlue.push({ x, y, r, g, b, bMinusR: b - r, bMinusG: b - g });
              }
            }
          }
        }

        resolve({ count, minX, maxX, minY, maxY, sampleBlue });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Blue ink search:', res);
  await browser.close();
}

main().catch(console.error);
