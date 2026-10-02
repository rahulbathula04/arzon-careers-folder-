import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/the_masterpiece.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const dashes = await page.evaluate(async (dataUrl) => {
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

        // In the_masterpiece, find all horizontal runs in Bathula (x: 800..1200)
        // that have thickness <= 3 and length >= 6
        const found = [];
        for (let y = 140; y < 360; y++) {
          let x = 800;
          while (x < 1200) {
            if (data[(y * w + x) * 4 + 3] > 40) {
              const startX = x;
              while (x < 1200 && data[(y * w + x) * 4 + 3] > 40) x++;
              const endX = x - 1;
              const len = endX - startX + 1;

              // Check if vertical thickness across this run is thin (<= 3):
              let maxV = 0;
              for (let rx = startX; rx <= endX; rx++) {
                let v = 0;
                for (let dy = -4; dy <= 4; dy++) {
                  if (data[((y + dy) * w + rx) * 4 + 3] > 40) v++;
                }
                if (v > maxV) maxV = v;
              }

              if (len >= 6 && maxV <= 3) {
                found.push({ y, startX, endX, len, maxV });
              }
            } else {
              x++;
            }
          }
        }

        resolve(found);
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Found dashes:', dashes);
  await browser.close();
}

main().catch(console.error);
