import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/test_bd6.png');
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

        // Copy data into a working mask
        const keep = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 40) {
            keep[i] = 1;
          }
        }

        // 1. Dash 4: Under the surname (below y=400, for x < 1120)
        // There is no signature below y=400 to the left of x=1120!
        for (let y = 390; y < h; y++) {
          for (let x = 0; x < 1120; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 2. Dash 3: Under 'B' (y > 350, for x between 780 and 870)
        // 'B' ends around y=345, 'a' starts around x=880
        for (let y = 352; y <= 375; y++) {
          for (let x = 750; x < 875; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 3. Line segments in inter-letter gaps of Bathula:
        // Any pixel with thickness <= 3 that runs horizontally along slope ~0.15:
        // Check for thin horizontal bars in the Bathula region (x > 700):
        for (let y = 5; y < h - 5; y++) {
          for (let x = 700; x < w - 5; x++) {
            const idx = y * w + x;
            if (!keep[idx]) continue;

            // Measure vertical stroke thickness at (x, y)
            let up = 0;
            while (y - up - 1 >= 0 && data[((y - up - 1) * w + x) * 4 + 3] > 30) up++;
            let down = 0;
            while (y + down + 1 < h && data[((y + down + 1) * w + x) * 4 + 3] > 30) down++;
            const vThickness = 1 + up + down;

            // If it's very thin vertically (<= 3 pixels):
            if (vThickness <= 3) {
              // Check if it's on one of the ruled lines:
              // Check if it extends horizontally left or right for at least 8 pixels
              let hExtent = 0;
              for (let dx = -10; dx <= 10; dx++) {
                if (dx === 0) continue;
                const ny = Math.round(y + dx * 0.15);
                if (ny >= 0 && ny < h && data[(ny * w + (x + dx)) * 4 + 3] > 30) {
                  hExtent++;
                }
              }

              // Also check if there is empty space 4px above and 4px below:
              let emptyAbove = true;
              for (let dy = -6; dy <= -4; dy++) {
                if (y + dy >= 0 && data[((y + dy) * w + x) * 4 + 3] > 30) emptyAbove = false;
              }
              let emptyBelow = true;
              for (let dy = 4; dy <= 6; dy++) {
                if (y + dy < h && data[((y + dy) * w + x) * 4 + 3] > 30) emptyBelow = false;
              }

              if (hExtent >= 5 && (emptyAbove || emptyBelow)) {
                keep[idx] = 0;
              }
            }
          }
        }

        // 4. Also heal any 1px notch in vertical strokes:
        for (let y = 2; y < h - 2; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (!keep[idx]) {
              if (keep[(y - 1) * w + x] && keep[(y + 1) * w + x]) {
                keep[idx] = 1;
              }
            }
          }
        }

        // 5. Remove any tiny stray components (< 12 pixels)
        const visited = new Uint8Array(w * h);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (visited[idx] || !keep[idx]) continue;

            const comp = [idx];
            visited[idx] = 1;
            let ptr = 0;
            while (ptr < comp.length) {
              const curr = comp[ptr++];
              const cy = Math.floor(curr / w);
              const cx = curr % w;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const ny = cy + dy;
                  const nx = cx + dx;
                  if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                    const nidx = ny * w + nx;
                    if (!visited[nidx] && keep[nidx]) {
                      visited[nidx] = 1;
                      comp.push(nidx);
                    }
                  }
                }
              }
            }

            if (comp.length < 15) {
              for (let i = 0; i < comp.length; i++) {
                keep[comp[i]] = 0;
              }
            }
          }
        }

        // 6. Draw clean result in Arzon Executive Navy #071A4A
        for (let i = 0; i < w * h; i++) {
          if (keep[i]) {
            outData[i * 4] = 7;
            outData[i * 4 + 1] = 26;
            outData[i * 4 + 2] = 74;
            outData[i * 4 + 3] = 255;
          }
        }

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly with balanced padding
        let minX = w, maxX = 0, minY = h, maxY = 0;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (keep[y * w + x]) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const pad = 24;
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

  fs.writeFileSync('scripts/masterpiece_signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved masterpiece signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
