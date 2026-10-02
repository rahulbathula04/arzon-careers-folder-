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

        // Create clean canvas
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        // Line angle in cleaned_sig.png:
        // From left (x=0) to right (x=1320), the lines descend by about 90-100px.
        // Slope dy/dx ≈ -0.075 to -0.085
        // Let's check for each pixel if it is part of a thin line along that angle
        function isRuledLinePixel(x, y) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] < 30) return false;

          // Check vertical thickness perpendicular to the ruled line
          // For a ruled line, in the perpendicular direction (roughly vertical, dx=0, dy=±3, ±4, ±5),
          // there is no ink!
          let perpSpan = 0;
          for (let dy = -6; dy <= 6; dy++) {
            const ny = y + dy;
            if (ny >= 0 && ny < h) {
              const nidx = (ny * w + x) * 4;
              if (data[nidx + 3] > 40) perpSpan++;
            }
          }

          // Check horizontal extent along the ruled line angle (dx=±15, dy=dx * -0.078)
          let parallelMatches = 0;
          const slope = -0.075;
          for (let step = -20; step <= 20; step += 2) {
            if (step === 0) continue;
            const nx = x + step;
            const ny = Math.round(y + step * slope);
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const nidx = (ny * w + nx) * 4;
              if (data[nidx + 3] > 30) parallelMatches++;
            }
          }

          // If it extends along the ruled line for a long distance (> 8 matches)
          // BUT has very small perpendicular thickness (<= 3 pixels):
          // It is a ruled line!
          if (parallelMatches >= 8 && perpSpan <= 3) {
            return true;
          }

          // Also, in the top right corner (x > 950, y < 140), there is NO signature,
          // only notebook lines floating above the signature!
          if (x > 950 && y < 140 && perpSpan <= 4) {
            return true;
          }

          // In bottom area (y > 360 and x < 600), only notebook lines floating below 'R'
          if (y > 360 && x < 500 && perpSpan <= 3) {
            return true;
          }

          return false;
        }

        // Copy pixels while filtering out ruled line pixels
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            if (data[idx + 3] > 20) {
              if (!isRuledLinePixel(x, y)) {
                outData[idx] = data[idx];
                outData[idx + 1] = data[idx + 1];
                outData[idx + 2] = data[idx + 2];
                outData[idx + 3] = data[idx + 3];
              }
            }
          }
        }

        // Second pass: remove isolated small line remnants
        const finalData = new Uint8ClampedArray(outData);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = (y * w + x) * 4;
            if (outData[idx + 3] > 0) {
              // Count connected component size locally
              let neighbors = 0;
              for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const ny = y + dy;
                  const nx = x + dx;
                  if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                    const nidx = (ny * w + nx) * 4;
                    if (outData[nidx + 3] > 40) neighbors++;
                  }
                }
              }
              // If isolated speck or tiny line segment with few neighbors
              if (neighbors < 3) {
                finalData[idx + 3] = 0;
              }
            }
          }
        }

        for (let i = 0; i < outData.length; i++) {
          outData[i] = finalData[i];
        }

        outCtx.putImageData(outImgData, 0, 0);
        resolve(outCanvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/pure_signature.png', Buffer.from(output.split(',')[1], 'base64'));
  console.log('Saved pure signature to scripts/pure_signature.png');
  await browser.close();
}

main().catch(console.error);
