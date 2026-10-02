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

        // Mask of pixels to keep
        const keep = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 35) {
            keep[i] = 1;
          }
        }

        // 1. Remove all noise in top right (x > 850, y < 150)
        for (let y = 0; y < 150; y++) {
          for (let x = 800; x < w; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 2. Remove noise in bottom left (x < 550, y > 360)
        for (let y = 360; y < h; y++) {
          for (let x = 0; x < 550; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 3. For any horizontal line pixel:
        // A horizontal line pixel has ink to the left (dx = -8..-2) AND ink to the right (dx = +2..+8)
        // at roughly the same y (dy in -2..+2),
        // BUT has NO ink above (dy in -8..-4) and NO ink below (dy in +4..+8) in a wider x window.
        // Let's test this strictly:
        for (let y = 10; y < h - 10; y++) {
          for (let x = 10; x < w - 10; x++) {
            const idx = y * w + x;
            if (!keep[idx]) continue;

            // Check if this pixel has vertical ink support:
            // Look up 4 to 9 pixels, look down 4 to 9 pixels
            let upInk = 0;
            for (let dy = -9; dy <= -4; dy++) {
              for (let dx = -4; dx <= 4; dx++) {
                if (data[((y + dy) * w + (x + dx)) * 4 + 3] > 35) upInk++;
              }
            }

            let downInk = 0;
            for (let dy = 4; dy <= 9; dy++) {
              for (let dx = -4; dx <= 4; dx++) {
                if (data[((y + dy) * w + (x + dx)) * 4 + 3] > 35) downInk++;
              }
            }

            // If it has NO vertical ink support above OR below:
            // AND it has horizontal neighbors (ruled line):
            if (upInk === 0 || downInk === 0) {
              // Check if it's part of a thin horizontal run:
              let horizRun = 0;
              for (let dx = -12; dx <= 12; dx++) {
                if (dx === 0) continue;
                // check with slight slope
                const ny = y + Math.round(dx * 0.15);
                if (ny >= 0 && ny < h && data[(ny * w + (x + dx)) * 4 + 3] > 30) {
                  horizRun++;
                }
              }

              // If it extends horizontally (horizRun >= 6) and lacks top or bottom support:
              if (horizRun >= 5) {
                keep[idx] = 0;
              }
            }
          }
        }

        // 4. Fill in any tiny gaps (1-2px) in vertical strokes that were cut:
        for (let y = 3; y < h - 3; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (!keep[idx]) {
              const u1 = keep[(y - 1) * w + x];
              const u2 = keep[(y - 2) * w + x];
              const d1 = keep[(y + 1) * w + x];
              const d2 = keep[(y + 2) * w + x];
              if ((u1 || u2) && (d1 || d2)) {
                keep[idx] = 1;
              }
            }
          }
        }

        // 5. Connected component filtering:
        // Remove any disconnected components with area < 25 pixels
        const visited = new Uint8Array(w * h);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (visited[idx] || !keep[idx]) continue;

            const comp = [idx];
            visited[idx] = 1;
            let ptr = 0;
            let cMinX = x, cMaxX = x, cMinY = y, cMaxY = y;

            while (ptr < comp.length) {
              const curr = comp[ptr++];
              const cy = Math.floor(curr / w);
              const cx = curr % w;
              if (cx < cMinX) cMinX = cx;
              if (cx > cMaxX) cMaxX = cx;
              if (cy < cMinY) cMinY = cy;
              if (cy > cMaxY) cMaxY = cy;

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

            const cW = cMaxX - cMinX + 1;
            const cH = cMaxY - cMinY + 1;

            // Stray speck or remaining line fragment:
            // If aspect ratio is high (> 4) and height is tiny (<= 3), it's a line fragment!
            if (comp.length < 30 || (cW / cH > 4 && cH <= 3)) {
              for (let i = 0; i < comp.length; i++) {
                keep[comp[i]] = 0;
              }
            }
          }
        }

        // 6. Build high-quality output
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        // Ink color: Arzon Deep Navy #071A4A (r=7, g=26, b=74)
        for (let i = 0; i < w * h; i++) {
          if (keep[i]) {
            outData[i * 4] = 7;
            outData[i * 4 + 1] = 26;
            outData[i * 4 + 2] = 74;
            outData[i * 4 + 3] = 255;
          }
        }

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly
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

  fs.writeFileSync('scripts/pristine_signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved pristine signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
