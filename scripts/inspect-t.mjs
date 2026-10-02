import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cleaned_sig.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const tRegion = await page.evaluate(async (dataUrl) => {
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

        // Crop the 't' area
        const cropX = 920, cropY = 180, cropW = 120, cropH = 150;
        const tCanvas = document.createElement('canvas');
        tCanvas.width = cropW;
        tCanvas.height = cropH;
        const tCtx = tCanvas.getContext('2d');
        tCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        resolve(tCanvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('scripts/t_region.png', Buffer.from(tRegion.split(',')[1], 'base64'));
  console.log('Saved scripts/t_region.png');
  await browser.close();
}

main().catch(console.error);
