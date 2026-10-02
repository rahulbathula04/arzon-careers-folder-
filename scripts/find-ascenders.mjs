import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/pure_solid_masterpiece.png');
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
        // In pure_solid_masterpiece, let's find the vertical strokes in the region y = 170..270
        // by summing pixels in that y range for each x from 900 to 1250:
        const xProfile = [];
        for (let x = 900; x < 1250; x++) {
          let count = 0;
          for (let y = 170; y < 270; y++) {
            if (data[(y * w + x) * 4 + 3] > 40) count++;
          }
          xProfile.push({ x, count });
        }

        resolve({ xProfile });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  // Print peaks (vertical strokes) and valleys (inter-letter gaps)
  const p = res.xProfile;
  console.log('X values where count > 15 (peaks):', p.filter(pt => pt.count > 15).map(pt => pt.x));
  console.log('X values where count < 6 (valleys):', p.filter(pt => pt.count < 6).map(pt => pt.x));
  await browser.close();
}

main().catch(console.error);
