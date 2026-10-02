import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/pure_signature.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const data = await page.evaluate(async (dataUrl) => {
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

        const imgData = ctx.getImageData(0, 0, w, h).data;

        // Sample at x = 700, 850, 1000, 1150, 1250
        function getYs(x) {
          const ys = [];
          for (let y = 0; y < h; y++) {
            if (imgData[(y * w + x) * 4 + 3] > 50) {
              ys.push(y);
            }
          }
          return ys;
        }

        resolve({
          x700: getYs(700),
          x850: getYs(850),
          x1000: getYs(1000),
          x1150: getYs(1150),
          x1250: getYs(1250),
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('ys at 700:', data.x700);
  console.log('ys at 850:', data.x850);
  console.log('ys at 1000:', data.x1000);
  console.log('ys at 1150:', data.x1150);
  console.log('ys at 1250:', data.x1250);

  await browser.close();
}

main().catch(console.error);
