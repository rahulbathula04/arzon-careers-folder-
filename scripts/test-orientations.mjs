import { chromium } from '@playwright/test';
import fs from 'fs';

const imagePath = 'c:/Users/Rahul/Downloads/WhatsApp Image 2026-10-02 at 10.34.02 PM.jpeg';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  const images = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // 1. Rotated 90 CW (trans(h, 0), rotate(90))
        const c1 = document.createElement('canvas');
        c1.width = img.naturalHeight;
        c1.height = img.naturalWidth;
        const ctx1 = c1.getContext('2d');
        ctx1.translate(c1.width, 0);
        ctx1.rotate((90 * Math.PI) / 180);
        ctx1.drawImage(img, 0, 0);

        // 2. Rotated 90 CCW / 270 CW (trans(0, w), rotate(-90))
        const c2 = document.createElement('canvas');
        c2.width = img.naturalHeight;
        c2.height = img.naturalWidth;
        const ctx2 = c2.getContext('2d');
        ctx2.translate(0, c2.height);
        ctx2.rotate((-90 * Math.PI) / 180);
        ctx2.drawImage(img, 0, 0);

        resolve({
          cw90: c1.toDataURL('image/png'),
          ccw90: c2.toDataURL('image/png')
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('scripts/cw90.png', Buffer.from(images.cw90.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/ccw90.png', Buffer.from(images.ccw90.split(',')[1], 'base64'));
  console.log('Saved cw90.png and ccw90.png');
  await browser.close();
}

main().catch(console.error);
