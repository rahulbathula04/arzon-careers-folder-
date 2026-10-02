import { chromium } from '@playwright/test';
import fs from 'fs';

const imagePath = 'c:/Users/Rahul/Downloads/WhatsApp Image 2026-10-02 at 10.34.02 PM.jpeg';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  const output = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalHeight; // 1600
        const h = img.naturalWidth;  // 1200

        // 1. Full rotated canvas
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.translate(w, 0);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, 0, 0);

        // 2. Build local background paper map by heavy downscale + upscale
        const bgCanvas = document.createElement('canvas');
        const scaleDown = 16;
        bgCanvas.width = Math.ceil(w / scaleDown);
        bgCanvas.height = Math.ceil(h / scaleDown);
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

        // Bounding box of signature
        const minX = 70;
        const maxX = 1390;
        const minY = 320;
        const maxY = 760;
        const cropW = maxX - minX;
        const cropH = maxY - minY;

        const outCanvas = document.createElement('canvas');
        outCanvas.width = cropW;
        outCanvas.height = cropH;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(cropW, cropH);
        const outData = outImgData.data;

        // Target color: Arzon Deep Navy #071A4A (r=7, g=26, b=74)
        const inkR = 7;
        const inkG = 26;
        const inkB = 74;

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

            const blueDelta = b - Math.max(r, g);

            // Notebook lines have blueDelta <= -5
            // Ink has blueDelta >= 0 and diff > 10
            let isInk = false;
            let alpha = 0;

            if (blueDelta >= 0 && diff > 10) {
              isInk = true;
              alpha = Math.min(1, Math.max(0, (diff - 8) / 32) * 0.7 + Math.min(1, blueDelta / 15) * 0.3);
            } else if (blueDelta >= -2 && diff > 30) {
              // Very dark crossings where blue is slightly compressed
              isInk = true;
              alpha = Math.min(1, (diff - 25) / 30);
            }

            if (isInk && alpha > 0.05) {
              const finalAlpha = Math.min(1, Math.pow(alpha, 0.75));
              outData[destIdx] = inkR;
              outData[destIdx + 1] = inkG;
              outData[destIdx + 2] = inkB;
              outData[destIdx + 3] = Math.round(finalAlpha * 255);
            } else {
              outData[destIdx + 3] = 0;
            }
          }
        }

        // Clean isolated stray specks (noise removal):
        // If a pixel has no ink neighbors in a 3x3 window, remove it
        const cleaned = new Uint8ClampedArray(outData);
        for (let y = 1; y < cropH - 1; y++) {
          for (let x = 1; x < cropW - 1; x++) {
            const idx = (y * cropW + x) * 4;
            if (outData[idx + 3] > 0) {
              let count = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const nIdx = ((y + dy) * cropW + (x + dx)) * 4;
                  if (outData[nIdx + 3] > 30) count++;
                }
              }
              if (count === 0) {
                cleaned[idx + 3] = 0;
              }
            }
          }
        }

        for (let i = 0; i < outData.length; i++) {
          outData[i] = cleaned[i];
        }

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly to non-empty bounding box
        let finalMinX = cropW, finalMaxX = 0, finalMinY = cropH, finalMaxY = 0;
        for (let y = 0; y < cropH; y++) {
          for (let x = 0; x < cropW; x++) {
            const idx = (y * cropW + x) * 4;
            if (outData[idx + 3] > 40) {
              if (x < finalMinX) finalMinX = x;
              if (x > finalMaxX) finalMaxX = x;
              if (y < finalMinY) finalMinY = y;
              if (y > finalMaxY) finalMaxY = y;
            }
          }
        }

        const tightPad = 16;
        const tightX = Math.max(0, finalMinX - tightPad);
        const tightY = Math.max(0, finalMinY - tightPad);
        const tightW = Math.min(cropW - tightX, finalMaxX - finalMinX + tightPad * 2);
        const tightH = Math.min(cropH - tightY, finalMaxY - finalMinY + tightPad * 2);

        const tightCanvas = document.createElement('canvas');
        tightCanvas.width = tightW;
        tightCanvas.height = tightH;
        const tightCtx = tightCanvas.getContext('2d');
        tightCtx.drawImage(outCanvas, tightX, tightY, tightW, tightH, 0, 0, tightW, tightH);

        resolve({
          dataUrl: tightCanvas.toDataURL('image/png'),
          dimensions: { width: tightW, height: tightH }
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/cleaned_sig.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved cleaned signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
