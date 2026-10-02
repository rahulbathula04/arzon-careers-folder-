import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/calibrated_corridor.png');
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

        // Helper to clear a rectangle
        function clearRect(x0, y0, x1, y1) {
          for (let y = Math.max(0, y0); y <= Math.min(h - 1, y1); y++) {
            for (let x = Math.max(0, x0); x <= Math.min(w - 1, x1); x++) {
              keep[y * w + x] = 0;
            }
          }
        }

        // 1. Clear outer margins:
        // Top right above Bathula:
        clearRect(750, 0, w - 1, 140);
        // Top right beyond 'l' ascender:
        clearRect(1155, 0, w - 1, 310);
        // Right side beyond 'a' (above flourish):
        clearRect(1210, 0, w - 1, 380);
        // Bottom margin under Bathula:
        clearRect(750, 385, 1140, h - 1);
        // Bottom margin under Rahul:
        clearRect(0, 360, 600, h - 1);
        // Bottom margin under B stem:
        clearRect(750, 345, 815, h - 1);

        // 2. Interior of B upper bowl:
        // x: 840..925, y: 175..230 (thin line only)
        for (let y = 175; y <= 230; y++) {
          for (let x = 840; x <= 925; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 3. Interior of B lower bowl:
        // x: 845..915, y: 270..320 (thin line only)
        for (let y = 270; y <= 320; y++) {
          for (let x = 845; x <= 915; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 4. Gap between B and t:
        // x = 932..960
        clearRect(932, 140, 960, 345);

        // 5. Gap between t and h:
        // 't' stem is at x ≈ 965..978. 'h' stem is at x ≈ 1018..1055.
        // Gap is x = 982..1015
        clearRect(982, 140, 1015, 345);

        // 6. Gap between h and l:
        // 'h' loop ends around x=1060. 'l' stem starts at x=1115.
        // Gap is x = 1065..1112
        clearRect(1065, 140, 1112, 345);

        // 7. Gap between l and a:
        // 'l' finishes around x=1142. 'a' starts around x=1170.
        // Gap is x = 1146..1168
        clearRect(1146, 140, 1168, 345);

        // 8. Line under flourish at bottom right (y > 410, x: 1050..1160):
        clearRect(1050, 410, 1160, h - 1);

        // 9. Heal vertical ascenders (fill any 1-2px gaps)
        for (let pass = 0; pass < 2; pass++) {
          for (let y = 2; y < h - 2; y++) {
            for (let x = 2; x < w - 2; x++) {
              const idx = y * w + x;
              if (!keep[idx]) {
                const u = keep[(y - 1) * w + x];
                const d = keep[(y + 1) * w + x];
                if (u && d) {
                  keep[idx] = 1;
                }
              }
            }
          }
        }

        // 10. Clean any isolated noise specks (< 20px)
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

            if (comp.length < 20) {
              for (let i = 0; i < comp.length; i++) {
                keep[comp[i]] = 0;
              }
            }
          }
        }

        // 11. Final antialiased rendering in Arzon Executive Navy #071A4A
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
              const alpha = count >= 6 ? 255 : Math.round((count / 6) * 235);
              outData[idx * 4] = 7;     // #071A4A
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
  fs.writeFileSync('scripts/the_masterpiece.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved the masterpiece signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
