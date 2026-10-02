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

        // In cleaned_sig.png, let's identify the ruled lines by finding long horizontal runs
        // A notebook ruled line has very high horizontal length (> 100px) and very low vertical thickness (<= 2px)
        // Let's create a ruled line mask:
        const isRuledMask = new Uint8Array(w * h);

        // Scan each row y:
        // For each pixel with ink, measure horizontal run length along slope 0.16
        // Let's check slope values from 0.13 to 0.18
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (data[idx * 4 + 3] < 30) continue;

            // Measure vertical span of stroke at x:
            // How many consecutive ink pixels vertically around y?
            let up = 0;
            while (y - up - 1 >= 0 && data[((y - up - 1) * w + x) * 4 + 3] > 30) up++;
            let down = 0;
            while (y + down + 1 < h && data[((y + down + 1) * w + x) * 4 + 3] > 30) down++;
            const vertThickness = 1 + up + down;

            // Ruled lines are <= 3px thick. If vertThickness > 4, it's definitely a vertical/diagonal stroke!
            if (vertThickness >= 5) continue;

            // Now check if it extends horizontally along slope ~0.16
            let leftLen = 0;
            for (let step = 1; step <= 60; step++) {
              const nx = x - step;
              const ny = Math.round(y - step * 0.16);
              if (nx >= 0 && ny >= 0 && ny < h) {
                // check ny ± 1
                let hit = false;
                for (let d = -1; d <= 1; d++) {
                  if (ny + d >= 0 && ny + d < h && data[((ny + d) * w + nx) * 4 + 3] > 25) {
                    hit = true; break;
                  }
                }
                if (hit) leftLen++;
                else break;
              } else break;
            }

            let rightLen = 0;
            for (let step = 1; step <= 60; step++) {
              const nx = x + step;
              const ny = Math.round(y + step * 0.16);
              if (nx < w && ny >= 0 && ny < h) {
                let hit = false;
                for (let d = -1; d <= 1; d++) {
                  if (ny + d >= 0 && ny + d < h && data[((ny + d) * w + nx) * 4 + 3] > 25) {
                    hit = true; break;
                  }
                }
                if (hit) rightLen++;
                else break;
              } else break;
            }

            const totalRun = leftLen + rightLen + 1;
            // If horizontal run along ruled line is >= 12px and vertical thickness <= 3px:
            if (totalRun >= 10 && vertThickness <= 3) {
              isRuledMask[idx] = 1;
            }
          }
        }

        // Dilate the ruled mask horizontally by 2px along slope to catch tips
        const dilatedMask = new Uint8Array(isRuledMask);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 2; x < w - 2; x++) {
            const idx = y * w + x;
            if (isRuledMask[idx]) {
              // mark 2px left and right along slope if vertThickness <= 2
              for (let s = -2; s <= 2; s++) {
                const nx = x + s;
                const ny = Math.round(y + s * 0.16);
                if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                  const nidx = ny * w + nx;
                  let vSpan = 0;
                  for (let dy = -3; dy <= 3; dy++) {
                    if (ny + dy >= 0 && ny + dy < h && data[((ny + dy) * w + nx) * 4 + 3] > 30) vSpan++;
                  }
                  if (vSpan <= 3) {
                    dilatedMask[nidx] = 1;
                  }
                }
              }
            }
          }
        }

        // Also explicitly remove the noise in corners:
        // Top right:
        for (let y = 0; y < 160; y++) {
          for (let x = 850; x < w; x++) {
            dilatedMask[y * w + x] = 1;
          }
        }
        // Bottom left below signature:
        for (let y = 370; y < h; y++) {
          for (let x = 0; x < 550; x++) {
            dilatedMask[y * w + x] = 1;
          }
        }

        // Output canvas
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (data[idx * 4 + 3] > 20 && !dilatedMask[idx]) {
              outData[idx * 4] = 7;
              outData[idx * 4 + 1] = 26;
              outData[idx * 4 + 2] = 74;
              outData[idx * 4 + 3] = data[idx * 4 + 3];
            }
          }
        }

        // Bridge vertical stroke cuts (where ruled line cut across a vertical/diagonal stroke)
        // If (x, y) has ink 2-3px above AND 2-3px below, restore it smoothly!
        for (let y = 3; y < h - 3; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = (y * w + x) * 4;
            if (outData[idx + 3] === 0) {
              const aAbove = outData[((y - 2) * w + x) * 4 + 3] || outData[((y - 3) * w + x) * 4 + 3];
              const aBelow = outData[((y + 2) * w + x) * 4 + 3] || outData[((y + 3) * w + x) * 4 + 3];
              if (aAbove > 60 && aBelow > 60) {
                outData[idx] = 7;
                outData[idx + 1] = 26;
                outData[idx + 2] = 74;
                outData[idx + 3] = Math.round((aAbove + aBelow) / 2);
              }
            }
          }
        }

        // Remove tiny stray islands (< 6 pixels)
        const cleaned = new Uint8ClampedArray(outData);
        for (let y = 2; y < h - 2; y++) {
          for (let x = 2; x < w - 2; x++) {
            const idx = (y * w + x) * 4;
            if (outData[idx + 3] > 0) {
              let neighbors = 0;
              for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  if (outData[((y + dy) * w + (x + dx)) * 4 + 3] > 30) neighbors++;
                }
              }
              if (neighbors < 3) {
                cleaned[idx + 3] = 0;
              }
            }
          }
        }
        for (let i = 0; i < outData.length; i++) outData[i] = cleaned[i];

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly
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

  fs.writeFileSync('scripts/clean_run_sig.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved clean run signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
