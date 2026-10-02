import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90_t_region.png');
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

        // Sample along a vertical line where a ruled line is (say x=50, y from 10 to 50)
        const lineCol = [];
        for (let y = 20; y <= 40; y++) {
          const idx = (y * w + 50) * 4;
          lineCol.push({ y, r: data[idx], g: data[idx+1], b: data[idx+2] });
        }

        // Sample along the ink curve (say around y=100..150, find where ink is)
        let minInk = null;
        let maxBlueDiff = -999;
        const inkPixels = [];
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx+1];
            const b = data[idx+2];
            const diff = b - Math.max(r, g);
            if (diff > 12) {
              inkPixels.push({ x, y, r, g, b, diff });
            }
          }
        }

        resolve({
          lineCol,
          inkCount: inkPixels.length,
          sampleInk: inkPixels.slice(0, 10)
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Ruled line pixels in cw90_t_region:', res.lineCol.slice(0, 10));
  console.log('Ink count with diff > 12:', res.inkCount);
  console.log('Sample ink pixels:', res.sampleInk.slice(0, 5));
  await browser.close();
}

main().catch(console.error);
