import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/surgical_result.png');
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

        // Along each line, let's see which x coordinates have ink:
        // Line 1: y ≈ 190 at x=1000
        // Line 2: y ≈ 255 at x=1000
        // Line 3: y ≈ 320 at x=1000
        function scanLine(baseY) {
          const hits = [];
          for (let x = 950; x < 1250; x++) {
            const y = Math.round(baseY + (x - 1000) * 0.16);
            let hasInk = false;
            for (let dy = -2; dy <= 2; dy++) {
              if (data[((y + dy) * w + x) * 4 + 3] > 40) {
                hasInk = true; break;
              }
            }
            if (hasInk) hits.push(x);
          }
          return hits;
        }

        resolve({
          line190: scanLine(190),
          line255: scanLine(255),
          line320: scanLine(320),
          line385: scanLine(385)
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Line 190 hits (length):', res.line190.length, 'sample:', res.line190.slice(0, 20));
  console.log('Line 255 hits (length):', res.line255.length, 'sample:', res.line255.slice(0, 20));
  console.log('Line 320 hits (length):', res.line320.length, 'sample:', res.line320.slice(0, 20));
  console.log('Line 385 hits (length):', res.line385.length, 'sample:', res.line385.slice(0, 20));
  await browser.close();
}

main().catch(console.error);
