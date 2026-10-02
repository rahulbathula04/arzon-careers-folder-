import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const res = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Crop the flourish at the bottom right
        // In cw90, signature is between y=300 and y=760, x=1100..1350
        const cropX = 1100, cropY = 550, cropW = 250, cropH = 220;
        const canvas = document.createElement('canvas');
        canvas.width = cropW;
        canvas.height = cropH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        resolve(canvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('scripts/cw90_flourish.png', Buffer.from(res.split(',')[1], 'base64'));
  console.log('Saved scripts/cw90_flourish.png');
  await browser.close();
}

main().catch(console.error);
