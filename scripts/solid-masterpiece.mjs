import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/perfect_masterpiece.png');
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

        // Binary mask of ink
        const mask = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 40) {
            mask[i] = 1;
          }
        }

        // Close gaps in Bathula (x > 550):
        // Morphological Closing: Dilate 1px then Erode 1px
        const dilated = new Uint8Array(mask);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 550; x < w - 1; x++) {
            if (mask[y * w + x]) {
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  dilated[(y + dy) * w + (x + dx)] = 1;
                }
              }
            }
          }
        }

        const closed = new Uint8Array(dilated);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 550; x < w - 1; x++) {
            if (!dilated[y * w + x]) continue;
            // Check if it was in the original dilated interior
            let n = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dilated[(y + dy) * w + (x + dx)]) n++;
              }
            }
            if (n < 6) {
              closed[y * w + x] = 0;
            }
          }
        }

        // Build smoothed final image
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (closed[idx]) {
              let count = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (closed[(y + dy) * w + (x + dx)]) count++;
                }
              }
              const alpha = count >= 6 ? 255 : Math.round((count / 6) * 230);
              outData[idx * 4] = 7;
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
  fs.writeFileSync('scripts/solid_masterpiece.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved solid masterpiece:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
