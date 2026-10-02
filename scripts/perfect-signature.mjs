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

        // 2. Build local background paper map by heavy morphological dilation / max filter
        // A simple, fast way: downscale by 16x (removes thin pen strokes), then upscale with smoothing
        const bgCanvas = document.createElement('canvas');
        const scaleDown = 16;
        bgCanvas.width = Math.ceil(w / scaleDown);
        bgCanvas.height = Math.ceil(h / scaleDown);
        const bgCtx = bgCanvas.getContext('2d');
        // Draw with maximum filter approximation
        bgCtx.drawImage(canvas, 0, 0, bgCanvas.width, bgCanvas.height);

        // Canvas to read blurred background
        const smoothBgCanvas = document.createElement('canvas');
        smoothBgCanvas.width = w;
        smoothBgCanvas.height = h;
        const sbgCtx = smoothBgCanvas.getContext('2d');
        sbgCtx.imageSmoothingEnabled = true;
        sbgCtx.imageSmoothingQuality = 'high';
        sbgCtx.drawImage(bgCanvas, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h).data;
        const bgData = sbgCtx.getImageData(0, 0, w, h).data;

        // Signature bounds
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

        // Target color: Deep authoritative executive navy (#0A1A3A or #071A4A)
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

            // Local paper luminance vs pixel luminance
            const bgLum = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB;
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            // Difference relative to local paper
            const diff = bgLum - lum;
            const blueDelta = b - Math.max(r, g);
            const sat = Math.max(r, g, b) - Math.min(r, g, b);

            let isInk = false;
            let alpha = 0;

            // Notebook line filtering:
            // Notebook lines have diff around 5 to 15, and very low blueDelta (< 8)
            // Real ink has either diff > 20, or strong blueDelta > 8 with diff > 10
            if (blueDelta > 10 && diff > 12) {
              isInk = true;
              alpha = Math.min(1, Math.max(0, (diff - 8) / 35));
            } else if (diff > 22 && b >= r - 4) {
              isInk = true;
              alpha = Math.min(1, Math.max(0, (diff - 16) / 35));
            } else if (diff > 35) {
              isInk = true;
              alpha = Math.min(1, (diff - 20) / 40);
            }

            if (isInk && alpha > 0.08) {
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

        outCtx.putImageData(outImgData, 0, 0);
        resolve(outCanvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/perfect_sig.png', Buffer.from(output.split(',')[1], 'base64'));
  console.log('Saved perfect signature to public/brand/rahul-bathula-signature.png');
  await browser.close();
}

main().catch(console.error);
