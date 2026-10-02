import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const tRegion = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const cropX = 920, cropY = 180 + 320, cropW = 200, cropH = 200; // note: cleaned_sig was offset by minY=320, minX=70
        // Wait! In clean-signature.mjs:
        // const minX = 70;
        // const minY = 320;
        // So cropX in cw90 is 70 + 920 = 990, cropY is 320 + 180 = 500!
        const actualX = 70 + 920;
        const actualY = 320 + 180;

        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, actualX, actualY, 200, 200, 0, 0, 200, 200);

        resolve(canvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('scripts/cw90_t_region.png', Buffer.from(tRegion.split(',')[1], 'base64'));
  console.log('Saved scripts/cw90_t_region.png');
  await browser.close();
}

main().catch(console.error);
