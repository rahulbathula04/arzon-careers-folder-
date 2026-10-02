import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/perfection.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const ys = await page.evaluate(async (dataUrl) => {
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
        function getYs(x) {
          const list = [];
          for (let y = 0; y < h; y++) {
            if (data[(y * w + x) * 4 + 3] > 40) list.push(y);
          }
          return list;
        }

        resolve({
          x1020: getYs(1020),
          x1080: getYs(1080),
          x1150: getYs(1150),
          x1200: getYs(1200)
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Ys:', ys);
  await browser.close();
}

main().catch(console.error);
