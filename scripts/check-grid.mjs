import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cleaned_sig.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const check = await page.evaluate(async (dataUrl) => {
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
        const slope = 0.16;
        const y0 = 18;
        const spacing = 68;

        // Check how many ink pixels fall within distance <= 2 from these grid lines
        // vs how many fall outside!
        const gridHits = [];
        for (let k = 0; k <= 6; k++) {
          let hits = 0;
          for (let x = 100; x < w - 100; x += 5) {
            const lineY = Math.round(y0 + k * spacing + slope * (x - 1000));
            if (lineY >= 0 && lineY < h) {
              for (let dy = -2; dy <= 2; dy++) {
                const ny = lineY + dy;
                if (ny >= 0 && ny < h && data[(ny * w + x) * 4 + 3] > 40) {
                  hits++;
                  break;
                }
              }
            }
          }
          gridHits.push({ k, baseAt1000: y0 + k * spacing, hits });
        }

        resolve({ gridHits });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Grid hits:', check.gridHits);
  await browser.close();
}

main().catch(console.error);
