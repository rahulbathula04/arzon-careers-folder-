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
        // 1. Draw rotated 90 deg clockwise
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalHeight; // 1600
        canvas.height = img.naturalWidth; // 1200
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width, 0);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, 0, 0);

        const w = canvas.width;
        const h = canvas.height;
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Bounding box of signature
        const minX = 70;
        const maxX = 1390;
        const minY = 330;
        const maxY = 760;
        const cropW = maxX - minX;
        const cropH = maxY - minY;

        const outCanvas = document.createElement('canvas');
        outCanvas.width = cropW;
        outCanvas.height = cropH;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(cropW, cropH);
        const outData = outImgData.data;

        // Ink target color: Arzon Deep Navy #071A4A (r=7, g=26, b=74)
        const inkR = 7;
        const inkG = 26;
        const inkB = 74;

        // For each pixel in crop area
        for (let y = 0; y < cropH; y++) {
          for (let x = 0; x < cropW; x++) {
            const srcX = minX + x;
            const srcY = minY + y;
            const srcIdx = (srcY * w + srcX) * 4;
            const destIdx = (y * cropW + x) * 4;

            const r = data[srcIdx];
            const g = data[srcIdx + 1];
            const b = data[srcIdx + 2];

            // Saturation & blue chroma metrics
            const maxC = Math.max(r, g, b);
            const minC = Math.min(r, g, b);
            const saturation = maxC - minC;
            const blueDelta = b - Math.max(r, g);
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

            // Notebook lines have very low blueDelta (< 12) and low saturation (< 18)
            // Ink has:
            // a) blueDelta >= 12
            // b) or saturation >= 18 with b being largest
            // c) or dark ink core: luminance < 100 with b >= r
            let inkScore = 0;
            if (b > r && b > g) {
              if (blueDelta > 10) {
                inkScore = (blueDelta - 8) / 16;
              }
              if (saturation > 14) {
                inkScore = Math.max(inkScore, (saturation - 12) / 20);
              }
              if (luminance < 110 && b > r + 3) {
                inkScore = Math.max(inkScore, (120 - luminance) / 30);
              }
            } else if (luminance < 85 && (b >= r - 5)) {
              // Very dark core of the pen
              inkScore = (95 - luminance) / 25;
            }

            // Notebook line suppression:
            // Notebook lines run horizontally. Let's suppress if saturation is weak
            if (saturation < 14 && blueDelta < 10) {
              inkScore = 0;
            }

            if (inkScore > 0.15) {
              const alpha = Math.min(1, Math.pow((inkScore - 0.12) / 0.7, 0.75));
              outData[destIdx] = inkR;
              outData[destIdx + 1] = inkG;
              outData[destIdx + 2] = inkB;
              outData[destIdx + 3] = Math.round(Math.min(255, Math.max(0, alpha * 255)));
            } else {
              outData[destIdx + 3] = 0;
            }
          }
        }

        // Apply a gentle 1px morphological closing or stroke dilation to connect any micro-gaps
        const smoothedData = new Uint8ClampedArray(outData);
        for (let y = 1; y < cropH - 1; y++) {
          for (let x = 1; x < cropW - 1; x++) {
            const idx = (y * cropW + x) * 4;
            const a = outData[idx + 3];
            if (a < 50) {
              // Check neighbors along stroke direction
              const left = outData[idx - 4 + 3];
              const right = outData[idx + 4 + 3];
              const up = outData[idx - cropW * 4 + 3];
              const down = outData[idx + cropW * 4 + 3];
              const diag1 = outData[idx - cropW * 4 - 4 + 3];
              const diag2 = outData[idx + cropW * 4 + 4 + 3];
              
              if ((left > 120 && right > 120) || (up > 120 && down > 120) || (diag1 > 120 && diag2 > 120)) {
                smoothedData[idx] = inkR;
                smoothedData[idx + 1] = inkG;
                smoothedData[idx + 2] = inkB;
                smoothedData[idx + 3] = 180;
              }
            }
          }
        }

        for (let i = 0; i < outData.length; i++) {
          outData[i] = smoothedData[i];
        }

        outCtx.putImageData(outImgData, 0, 0);

        resolve(outCanvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/enhanced_sig.png', Buffer.from(output.split(',')[1], 'base64'));
  console.log('Saved enhanced signature');
  await browser.close();
}

main().catch(console.error);
