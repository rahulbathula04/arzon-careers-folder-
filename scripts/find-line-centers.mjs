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

        // In cleaned_sig.png, let's find the exact y of the ruled lines on the far right (x = 1280)
        // where there are only ruled lines and the tip of the flourish:
        const xTest = 1260;
        const yHits = [];
        for (let y = 0; y < h; y++) {
          if (data[(y * w + xTest) * 4 + 3] > 40) {
            yHits.push(y);
          }
        }

        // Group into clusters (each cluster is one line)
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

        resolve({ clustersAt1260: clusters });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Ruled line centers at x=1260:', coords.clustersAt1260);
  await browser.close();
}

main().catch(console.error);
