import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/surgical_result.png');
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

        const data = ctx.getImageData(0, 0, w, h).data;
        const visited = new Uint8Array(w * h);
        const keep = new Uint8Array(w * h);

        // Find all connected components
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (visited[idx] || data[idx * 4 + 3] < 30) continue;

            const comp = [idx];
            visited[idx] = 1;
            let ptr = 0;
            let minX = x, maxX = x, minY = y, maxY = y;

            while (ptr < comp.length) {
              const curr = comp[ptr++];
              const cy = Math.floor(curr / w);
              const cx = curr % w;
              if (cx < minX) minX = cx;
              if (cx > maxX) maxX = cx;
              if (cy < minY) minY = cy;
              if (cy > maxY) maxY = cy;

              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const ny = cy + dy;
                  const nx = cx + dx;
                  if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                    const nidx = ny * w + nx;
                    if (!visited[nidx] && data[nidx * 4 + 3] > 30) {
                      visited[nidx] = 1;
                      comp.push(nidx);
                    }
                  }
                }
              }
            }

            const cW = maxX - minX + 1;
            const cH = maxY - minY + 1;
            const aspect = cW / cH;

            // RULED LINE TEST:
            // A ruled line fragment is thin (cH <= 15) and elongated (aspect >= 3.0), or tiny (< 25px)
            const isRuledLine = (aspect >= 3.5 && cH <= 18) || (cH <= 12 && aspect >= 2.0) || comp.length < 25;

            // Exceptions: real handwriting strokes (like 'u' valley or 'a' exit) have count > 400
            if (!isRuledLine || comp.length > 400) {
              for (let i = 0; i < comp.length; i++) {
                keep[comp[i]] = 1;
              }
            }
          }
        }

        // Bridge connections between real handwriting components (fill in 1-3px gaps in stems):
        for (let pass = 0; pass < 2; pass++) {
          for (let y = 2; y < h - 2; y++) {
            for (let x = 2; x < w - 2; x++) {
              const idx = y * w + x;
              if (!keep[idx]) {
                const u = keep[(y - 1) * w + x] || keep[(y - 2) * w + x];
                const d = keep[(y + 1) * w + x] || keep[(y + 2) * w + x];
                const l = keep[y * w + (x - 1)] || keep[y * w + (x - 2)];
                const r = keep[y * w + (x + 1)] || keep[y * w + (x + 2)];
                if ((u && d) || (l && r)) {
                  keep[idx] = 1;
                }
              }
            }
          }
        }

        // Render clean, antialiased signature in Arzon Deep Executive Navy (#071A4A)
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
              outData[idx * 4] = 7;
              outData[idx * 4 + 1] = 26;
              outData[idx * 4 + 2] = 74;
              outData[idx * 4 + 3] = alpha;
            }
          }
        }

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly with beautiful margins
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
  fs.writeFileSync('scripts/ultimate_signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved ultimate signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
