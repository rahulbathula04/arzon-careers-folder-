import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cw90.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const testThresholds = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        // Bounding box of signature in cw90.png
        // Left edge of 'R' is around x=70, right flourish of 'Bathula' is around x=1380
        // Top of 'R' is around y=310, bottom of flourish is around y=760
        const minX = 60, maxX = 1390, minY = 300, maxY = 770;
        const cropW = maxX - minX;
        const cropH = maxY - minY;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Get local background paper by 32x downscale + upscale
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = Math.ceil(w / 32);
        bgCanvas.height = Math.ceil(h / 32);
        const bgCtx = bgCanvas.getContext('2d');
        bgCtx.drawImage(canvas, 0, 0, bgCanvas.width, bgCanvas.height);

        const smoothBgCanvas = document.createElement('canvas');
        smoothBgCanvas.width = w;
        smoothBgCanvas.height = h;
        const sbgCtx = smoothBgCanvas.getContext('2d');
        sbgCtx.imageSmoothingEnabled = true;
        sbgCtx.imageSmoothingQuality = 'high';
        sbgCtx.drawImage(bgCanvas, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h).data;
        const bgData = sbgCtx.getImageData(0, 0, w, h).data;

        function runWithThreshold(minBlueDelta, minDiff) {
          const outCanvas = document.createElement('canvas');
          outCanvas.width = cropW;
          outCanvas.height = cropH;
          const outCtx = outCanvas.getContext('2d');
          const outImg = outCtx.createImageData(cropW, cropH);
          const outData = outImg.data;

          for (let y = 0; y < cropH; y++) {
            for (let x = 0; x < cropW; x++) {
              const srcX = minX + x;
              const srcY = minY + y;
              const srcIdx = (srcY * w + srcX) * 4;
              const destIdx = (y * cropW + x) * 4;

              const r = imgData[srcIdx];
              const g = imgData[srcIdx + 1];
              const b = imgData[srcIdx + 2];

              const bgR = bgData[srcIdx];
              const bgG = bgData[srcIdx + 1];
              const bgB = bgData[srcIdx + 2];

              const bgLum = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB;
              const lum = 0.299 * r + 0.587 * g + 0.114 * b;
              const diff = bgLum - lum;

              // The key ink test:
              // Blue ink has b higher than r and g
              const blueDelta = b - Math.max(r, g);

              if (blueDelta >= minBlueDelta && diff >= minDiff) {
                outData[destIdx] = 7;
                outData[destIdx + 1] = 26;
                outData[destIdx + 2] = 74;
                outData[destIdx + 3] = 255;
              }
            }
          }
          outCtx.putImageData(outImg, 0, 0);
          return outCanvas.toDataURL('image/png');
        }

        resolve({
          bd4: runWithThreshold(4, 18),
          bd6: runWithThreshold(6, 18),
          bd8: runWithThreshold(8, 20),
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('scripts/test_bd4.png', Buffer.from(testThresholds.bd4.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/test_bd6.png', Buffer.from(testThresholds.bd6.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/test_bd8.png', Buffer.from(testThresholds.bd8.split(',')[1], 'base64'));
  console.log('Saved test_bd4.png, test_bd6.png, test_bd8.png');

  await browser.close();
}

main().catch(console.error);
