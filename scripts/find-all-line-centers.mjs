import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cleaned_sig.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const coords = await page.evaluate(async (dataUrl) => {
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

        function getClusters(xTest) {
          const yHits = [];
          for (let y = 0; y < h; y++) {
            if (data[(y * w + xTest) * 4 + 3] > 40) {
              yHits.push(y);
            }
          }

          const clusters = [];
          let curr = [];
          for (let i = 0; i < yHits.length; i++) {
            if (curr.length === 0 || yHits[i] - curr[curr.length - 1] <= 3) {
              curr.push(yHits[i]);
            } else {
              clusters.push(Math.round(curr.reduce((a, b) => a + b, 0) / curr.length));
              curr = [yHits[i]];
            }
          }
          if (curr.length > 0) {
            clusters.push(Math.round(curr.reduce((a, b) => a + b, 0) / curr.length));
          }
          return clusters;
        }

        resolve({
          x700: getClusters(700),
          x950: getClusters(950),
          x1260: getClusters(1260)
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Ruled line centers:', coords);
  await browser.close();
}

main().catch(console.error);
