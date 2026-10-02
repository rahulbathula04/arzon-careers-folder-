import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/crown_jewel.png');
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

        // Bridge strokes vertically and along slant in Bathula (x > 750):
        for (let pass = 0; pass < 3; pass++) {
          for (let y = 3; y < h - 3; y++) {
            for (let x = 750; x < w - 2; x++) {
              const idx = y * w + x;
              if (!keep[idx]) {
                // Check vertical bridge (up 1..3, down 1..3)
                const u1 = keep[(y - 1) * w + x];
                const u2 = keep[(y - 2) * w + x];
                const u3 = keep[(y - 3) * w + x];
                const d1 = keep[(y + 1) * w + x];
                const d2 = keep[(y + 2) * w + x];
                const d3 = keep[(y + 3) * w + x];

                const hasUp = u1 || u2 || u3;
                const hasDown = d1 || d2 || d3;

                // Also check slight slant (dx = ±1)
                const sUp = keep[(y - 2) * w + (x - 1)] || keep[(y - 2) * w + (x + 1)];
                const sDown = keep[(y + 2) * w + (x + 1)] || keep[(y + 2) * w + (x - 1)];

                if ((hasUp && hasDown) || (sUp && sDown)) {
                  // Make sure we only bridge narrow stroke cuts, not wide empty space
                  let nearNeighbors = 0;
                  for (let dy = -3; dy <= 3; dy++) {
                    for (let dx = -2; dx <= 2; dx++) {
                      if (keep[(y + dy) * w + (x + dx)]) nearNeighbors++;
                    }
                  }
                  if (nearNeighbors >= 3) {
                    keep[idx] = 1;
                  }
                }
              }
            }
          }
        }

        // Antialiased rendering
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
              let count = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (keep[(y + dy) * w + (x + dx)]) count++;
                }
              }
              const alpha = count >= 6 ? 255 : Math.round((count / 6) * 230);
              outData[idx * 4] = 7;     // Arzon Executive Navy #071A4A
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

  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/crown_jewel_solid.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved solid crown jewel:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
