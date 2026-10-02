import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/test_thickness.png');
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
        function getRuns(xTarget) {
          const runs = [];
          let currRun = 0, startY = 0;
          for (let y = 0; y < h; y++) {
            if (data[(y * w + xTarget) * 4 + 3] > 40) {
              if (currRun === 0) startY = y;
              currRun++;
            } else {
              if (currRun > 0) {
                runs.push({ startY, len: currRun });
                currRun = 0;
              }
            }
          }
          if (currRun > 0) runs.push({ startY, len: currRun });
          return runs;
        }

        resolve({
          x1020: getRuns(1020),
          x1050: getRuns(1050),
          x1100: getRuns(1100)
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Runs at x=1020:', res.x1020);
  console.log('Runs at x=1050:', res.x1050);
  console.log('Runs at x=1100:', res.x1100);
  await browser.close();
}

main().catch(console.error);
