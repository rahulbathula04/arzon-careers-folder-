import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cleaned_sig.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const output = await page.evaluate(async (dataUrl) => {
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

        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // In cleaned_sig.png, let's find all the notebook lines.
        // We know the slope is around -0.078
        // Let's find the exact line offsets b by projecting along the slope
        // A projection histogram along line y + 0.078 * x:
        const hist = new Float32Array(h + 200);
        const slope = -0.078;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            if (data[idx + 3] > 30) {
              const projY = Math.round(y - slope * (x - w / 2));
              if (projY >= 0 && projY < hist.length) {
                hist[projY] += 1;
              }
            }
          }
        }

        // Output canvas
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        // For any pixel (x, y) with ink:
        // We test if it is a ruled line by checking vertical thickness:
        // A signature stroke crossing a ruled line will have pixels at y-4 and y+4.
        // A pure ruled line has NO pixels at y-4 and NO pixels at y+4!
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const a = data[idx + 3];
            if (a < 20) continue;

            // Check if there is vertical continuity
            // Look up to 8 pixels above and below
            let topSpan = 0;
            for (let dy = 2; dy <= 8; dy++) {
              const ny = y - dy;
              if (ny >= 0 && data[(ny * w + x) * 4 + 3] > 30) topSpan++;
            }
            let bottomSpan = 0;
            for (let dy = 2; dy <= 8; dy++) {
              const ny = y + dy;
              if (ny < h && data[(ny * w + x) * 4 + 3] > 30) bottomSpan++;
            }

            // Check horizontal extent along slope
            let lineContinuity = 0;
            for (let dx = -15; dx <= 15; dx += 3) {
              if (dx === 0) continue;
              const nx = x + dx;
              const ny = Math.round(y + dx * slope);
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                if (data[(ny * w + nx) * 4 + 3] > 30) lineContinuity++;
              }
            }

            // If it is extended along the line (lineContinuity >= 5)
            // AND lacks vertical stroke crossing (topSpan === 0 || bottomSpan === 0):
            // Then it is a ruled line!
            const isRuledLine = (lineContinuity >= 4 && (topSpan <= 1 || bottomSpan <= 1));

            // Also remove top-right empty space noise (above signature)
            const isTopRightNoise = (x > 900 && y < 140);
            // And bottom-left empty space noise
            const isBottomLeftNoise = (x < 450 && y > 380 && (topSpan === 0 || bottomSpan === 0));

            if (!isRuledLine && !isTopRightNoise && !isBottomLeftNoise) {
              outData[idx] = data[idx];
              outData[idx + 1] = data[idx + 1];
              outData[idx + 2] = data[idx + 2];
              outData[idx + 3] = a;
            }
          }
        }

        // Third pass: morphological stroke bridge
        // Where a ruled line was cut from a vertical stroke, restore any 1-2px gap
        const healed = new Uint8ClampedArray(outData);
        for (let y = 2; y < h - 2; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = (y * w + x) * 4;
            if (outData[idx + 3] < 30) {
              const up = outData[((y - 2) * w + x) * 4 + 3];
              const down = outData[((y + 2) * w + x) * 4 + 3];
              if (up > 80 && down > 80) {
                healed[idx] = 7;
                healed[idx + 1] = 26;
                healed[idx + 2] = 74;
                healed[idx + 3] = Math.round((up + down) / 2);
              }
            }
          }
        }

        // Fourth pass: small island removal (components < 10 pixels)
        // Simple 5x5 neighbor count
        for (let y = 2; y < h - 2; y++) {
          for (let x = 2; x < w - 2; x++) {
            const idx = (y * w + x) * 4;
            if (healed[idx + 3] > 0) {
              let count = 0;
              for (let dy = -3; dy <= 3; dy++) {
                for (let dx = -3; dx <= 3; dx++) {
                  if (healed[((y + dy) * w + (x + dx)) * 4 + 3] > 40) count++;
                }
              }
              if (count < 5) {
                healed[idx + 3] = 0;
              }
            }
          }
        }

        for (let i = 0; i < outData.length; i++) {
          outData[i] = healed[i];
        }

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly
        let minX = w, maxX = 0, minY = h, maxY = 0;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (outData[(y * w + x) * 4 + 3] > 30) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const pad = 12;
        const cropX = Math.max(0, minX - pad);
        const cropY = Math.max(0, minY - pad);
        const cropW = Math.min(w - cropX, maxX - minX + pad * 2);
        const cropH = Math.min(h - cropY, maxY - minY + pad * 2);

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.drawImage(outCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        resolve({
          dataUrl: cropCanvas.toDataURL('image/png'),
          dimensions: { width: cropW, height: cropH }
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/flawless_sig.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved flawless signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
