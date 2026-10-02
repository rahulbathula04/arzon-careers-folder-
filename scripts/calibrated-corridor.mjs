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

        // Exact line centers at x=1000 in cleaned_sig:
        const slope = 0.158;
        const lineBases = [20, 88, 157, 226, 292, 359, 427];

        function lineY(k, x) {
          return Math.round(lineBases[k] + slope * (x - 1000));
        }

        const keep = new Uint8Array(w * h);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (data[(y * w + x) * 4 + 3] > 30) {
              keep[y * w + x] = 1;
            }
          }
        }

        // Erase noise in outer margins:
        for (let y = 0; y < 140; y++) {
          for (let x = 750; x < w; x++) keep[y * w + x] = 0;
        }
        for (let y = 370; y < h; y++) {
          for (let x = 0; x < 550; x++) keep[y * w + x] = 0;
        }
        for (let y = 385; y < h; y++) {
          for (let x = 0; x < 1140; x++) keep[y * w + x] = 0;
        }
        for (let y = 0; y < 290; y++) {
          for (let x = 1170; x < w; x++) keep[y * w + x] = 0;
        }

        // For each of the 7 ruled lines:
        for (let k = 0; k < lineBases.length; k++) {
          for (let x = 0; x < w; x++) {
            const ly = lineY(k, x);
            if (ly < 0 || ly >= h) continue;

            // Check vertical continuity across this line:
            // Does a handwriting stroke pass through (ly, x)?
            // A handwriting stroke has ink at least 4-7px above AND 4-7px below:
            let hasTop = false;
            for (let dy = -7; dy <= -3; dy++) {
              const ny = ly + dy;
              if (ny >= 0 && ny < h) {
                // check dx = -3..+3 to account for stroke slant
                for (let dx = -3; dx <= 3; dx++) {
                  const nx = x + dx;
                  if (nx >= 0 && nx < w && data[(ny * w + nx) * 4 + 3] > 40) {
                    hasTop = true; break;
                  }
                }
              }
              if (hasTop) break;
            }

            let hasBottom = false;
            for (let dy = 3; dy <= 7; dy++) {
              const ny = ly + dy;
              if (ny >= 0 && ny < h) {
                for (let dx = -3; dx <= 3; dx++) {
                  const nx = x + dx;
                  if (nx >= 0 && nx < w && data[(ny * w + nx) * 4 + 3] > 40) {
                    hasBottom = true; break;
                  }
                }
              }
              if (hasBottom) break;
            }

            // If it does NOT connect to ink above AND below:
            // It is NOT a crossing stroke! Erase in corridor |y - ly| <= 2!
            if (!hasTop || !hasBottom) {
              for (let dy = -2; dy <= 2; dy++) {
                const ny = ly + dy;
                if (ny >= 0 && ny < h) {
                  keep[ny * w + x] = 0;
                }
              }
            }
          }
        }

        // Heal small 1px gaps in vertical strokes
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

        // Remove tiny stray specks (< 20px)
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
              outData[idx * 4] = 7;     // #071A4A Arzon Executive Deep Ink
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
  fs.writeFileSync('scripts/calibrated_corridor.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved calibrated corridor signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
