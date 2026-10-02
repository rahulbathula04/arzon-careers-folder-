import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/perfection.png');
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

        // 1. Right side beyond 'Bathula' letters (x > 1205, y < 385):
        for (let y = 0; y < 385; y++) {
          for (let x = 1205; x < w; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 2. Erase ruled lines in inter-letter gaps of Bathula:
        // Gap between t and h (x: 980..1015)
        for (let y = 140; y < 360; y++) {
          for (let x = 980; x <= 1015; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (y + dy >= 0 && y + dy < h && keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // Gap between h and l (x: 1060..1115)
        for (let y = 140; y < 360; y++) {
          for (let x = 1060; x <= 1115; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (y + dy >= 0 && y + dy < h && keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // Gap between l and a (x: 1145..1170)
        for (let y = 140; y < 360; y++) {
          for (let x = 1145; x <= 1170; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (y + dy >= 0 && y + dy < h && keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 3. Remove the line below 'Bathula' (y > 400 for x < 1140):
        for (let y = 400; y < h; y++) {
          for (let x = 0; x < 1140; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 4. Heal vertical strokes of t, h, l (bridge any 1-2px gaps)
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

        // 5. Remove any tiny stray components (< 15px)
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

        // 6. Smooth antialiased rendering
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
  fs.writeFileSync('scripts/crown_jewel.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved crown jewel signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
