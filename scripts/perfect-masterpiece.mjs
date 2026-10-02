import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/final_signature.png');
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

        const keep = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 40) {
            keep[i] = 1;
          }
        }

        // 1. Remove the bottom dash under the flourish:
        // Any pixel at y > 400 for x < 1150:
        for (let y = 400; y < h; y++) {
          for (let x = 0; x < 1150; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 2. Remove the line passing through the inside of B's upper lobe and between B and t:
        // Inside B's upper lobe (x: 820..920, y: 175..230), the horizontal bar at y ≈ 200..215:
        for (let y = 195; y <= 215; y++) {
          for (let x = 825; x <= 920; x++) {
            // Check if it's the thin ruled line:
            let up = 0;
            while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
            if (up + down + 1 <= 4) {
              keep[y * w + x] = 0;
            }
          }
        }

        // 3. Remove horizontal bar between B and t (x: 930..960, y: 200..230):
        for (let y = 200; y <= 225; y++) {
          for (let x = 925; x <= 960; x++) {
            let up = 0;
            while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
            if (up + down + 1 <= 4) {
              keep[y * w + x] = 0;
            }
          }
        }

        // 4. Fill in / heal the vertical ascenders of t, h, l and loops of Rahul:
        // If a column has ink in [y-3..y-1] AND ink in [y+1..y+3], bridge it!
        for (let pass = 0; pass < 3; pass++) {
          for (let y = 3; y < h - 3; y++) {
            for (let x = 1; x < w - 1; x++) {
              const idx = y * w + x;
              if (!keep[idx]) {
                const up = keep[(y - 1) * w + x] || keep[(y - 2) * w + x];
                const down = keep[(y + 1) * w + x] || keep[(y + 2) * w + x];
                if (up && down) {
                  // check if there is horizontal neighbor continuity
                  const left = keep[y * w + (x - 1)] || keep[(y - 1) * w + (x - 1)];
                  const right = keep[y * w + (x + 1)] || keep[(y - 1) * w + (x + 1)];
                  if (left || right || (keep[(y - 2) * w + x] && keep[(y + 2) * w + x])) {
                    keep[idx] = 1;
                  }
                }
              }
            }
          }
        }

        // 5. High-quality antialiased output
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (keep[idx]) {
              let neighbors = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (keep[(y + dy) * w + (x + dx)]) neighbors++;
                }
              }
              const alpha = neighbors >= 6 ? 255 : Math.round((neighbors / 6) * 220);
              outData[idx * 4] = 7;     // #071A4A Arzon Deep Executive Ink
              outData[idx * 4 + 1] = 26;
              outData[idx * 4 + 2] = 74;
              outData[idx * 4 + 3] = alpha;
            }
          }
        }

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

        const pad = 20;
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
  fs.writeFileSync('scripts/perfect_masterpiece.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved perfect masterpiece to public/brand/rahul-bathula-signature.png:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
