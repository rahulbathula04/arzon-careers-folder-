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

        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        // Ruled lines slope is around +0.155 to +0.165
        const slope = 0.16;

        function isRuledLine(x, y) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] < 25) return false;

          // Perpendicular direction: perpendicular vector to (1, slope) is (-slope, 1)
          // Since slope is small (0.16), perpendicular is almost purely vertical (dy = ±3..6)
          let perpSpan = 0;
          for (let dy = -6; dy <= 6; dy++) {
            const ny = y + dy;
            if (ny >= 0 && ny < h) {
              const nidx = (ny * w + x) * 4;
              if (data[nidx + 3] > 40) perpSpan++;
            }
          }

          // Check parallel extent along the actual ruled line slope (+0.16)
          let parallelMatches = 0;
          for (let step = -25; step <= 25; step += 2) {
            if (step === 0) continue;
            const nx = x + step;
            const ny = Math.round(y + step * slope);
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const nidx = (ny * w + nx) * 4;
              if (data[nidx + 3] > 30) parallelMatches++;
            }
          }

          // If it runs horizontally along the ruling line (> 10 matches out of 25)
          // AND it has thin perpendicular span (<= 3 pixels):
          // It's definitely a notebook ruled line!
          if (parallelMatches >= 8 && perpSpan <= 3) {
            return true;
          }

          // Top right noise (outside signature)
          if (x > 900 && y < 160 && perpSpan <= 5) return true;
          // Far bottom noise
          if (y > 380 && x < 500 && perpSpan <= 3) return true;

          return false;
        }

        // Pass 1: Filter out ruled lines
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            if (data[idx + 3] > 20) {
              if (!isRuledLine(x, y)) {
                outData[idx] = data[idx];
                outData[idx + 1] = data[idx + 1];
                outData[idx + 2] = data[idx + 2];
                outData[idx + 3] = data[idx + 3];
              }
            }
          }
        }

        // Pass 2: Clean isolated fragments
        const pass2 = new Uint8ClampedArray(outData);
        for (let y = 2; y < h - 2; y++) {
          for (let x = 2; x < w - 2; x++) {
            const idx = (y * w + x) * 4;
            if (outData[idx + 3] > 0) {
              let neighbors = 0;
              for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const nidx = ((y + dy) * w + (x + dx)) * 4;
                  if (outData[nidx + 3] > 30) neighbors++;
                }
              }
              if (neighbors < 3) {
                pass2[idx + 3] = 0;
              }
            }
          }
        }

        // Pass 3: Morphological bridge across tiny line cuts (1-2px vertical gaps)
        const healed = new Uint8ClampedArray(pass2);
        for (let y = 2; y < h - 2; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = (y * w + x) * 4;
            if (pass2[idx + 3] < 30) {
              const up = pass2[((y - 2) * w + x) * 4 + 3];
              const down = pass2[((y + 2) * w + x) * 4 + 3];
              if (up > 80 && down > 80) {
                healed[idx] = 7;
                healed[idx + 1] = 26;
                healed[idx + 2] = 74;
                healed[idx + 3] = Math.round((up + down) / 2);
              }
            }
          }
        }

        for (let i = 0; i < outData.length; i++) {
          outData[i] = healed[i];
        }

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly with padding
        let minX = w, maxX = 0, minY = h, maxY = 0;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (outData[(y * w + x) * 4 + 3] > 40) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const pad = 16;
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

  fs.writeFileSync('scripts/accurate_sig.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved accurate signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
