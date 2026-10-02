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

        // The exact lines in cleaned_sig.png:
        // Slope = 0.158
        // Let's refine the line centers by scanning each line k:
        const slope = 0.158;
        const lineBases = [18, 86, 154, 222, 290, 358, 426];

        function lineY(k, x) {
          return Math.round(lineBases[k] + slope * (x - 1000));
        }

        // Create mask of pixels to keep
        const keep = new Uint8Array(w * h);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (data[idx * 4 + 3] > 25) {
              keep[idx] = 1;
            }
          }
        }

        // Erase noise in outer margins:
        for (let y = 0; y < 160; y++) {
          for (let x = 850; x < w; x++) {
            keep[y * w + x] = 0;
          }
        }
        for (let y = 370; y < h; y++) {
          for (let x = 0; x < 550; x++) {
            keep[y * w + x] = 0;
          }
        }

        // For each of the 7 ruled lines:
        for (let k = 0; k < lineBases.length; k++) {
          for (let x = 0; x < w; x++) {
            const ly = lineY(k, x);
            if (ly < 0 || ly >= h) continue;

            // Check if a real stroke crosses this line at x:
            // Check top: y = ly - 5..-3 in window dx = -6..+6
            let hasTop = false;
            for (let dy = -6; dy <= -3; dy++) {
              const ny = ly + dy;
              if (ny >= 0 && ny < h) {
                for (let dx = -6; dx <= 6; dx++) {
                  const nx = x + dx;
                  if (nx >= 0 && nx < w && data[(ny * w + nx) * 4 + 3] > 40) {
                    hasTop = true; break;
                  }
                }
              }
              if (hasTop) break;
            }

            // Check bottom: y = ly + 3..+6 in window dx = -6..+6
            let hasBottom = false;
            for (let dy = 3; dy <= 6; dy++) {
              const ny = ly + dy;
              if (ny >= 0 && ny < h) {
                for (let dx = -6; dx <= 6; dx++) {
                  const nx = x + dx;
                  if (nx >= 0 && nx < w && data[(ny * w + nx) * 4 + 3] > 40) {
                    hasBottom = true; break;
                  }
                }
              }
              if (hasBottom) break;
            }

            // If it does NOT cross both top and bottom (within a slanted stroke envelope):
            // Then it's NOT a handwriting stroke crossing!
            // Wait: what about the belt of R (x=140..250, y around 250)?
            // The belt of R is horizontal, but its y is around 250, while line 3 is at 222, line 4 is at 290.
            // So belt of R doesn't coincide with any line!
            if (!hasTop || !hasBottom) {
              // Erase line in corridor |y - ly| <= 3
              for (let dy = -3; dy <= 3; dy++) {
                const ny = ly + dy;
                if (ny >= 0 && ny < h) {
                  keep[ny * w + x] = 0;
                }
              }
            }
          }
        }

        // Bridge any gaps created in vertical strokes
        // If a pixel was erased or empty, but has ink above (dy=-2,-3) and ink below (dy=+2,+3):
        for (let y = 3; y < h - 3; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (!keep[idx]) {
              const up = keep[(y - 2) * w + x] || keep[(y - 3) * w + x];
              const down = keep[(y + 2) * w + x] || keep[(y + 3) * w + x];
              if (up && down) {
                keep[idx] = 1;
              }
            }
          }
        }

        // Remove tiny isolated specks (< 6 connected pixels)
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

            // If component is small (< 15 pixels), erase it
            if (comp.length < 15) {
              for (let i = 0; i < comp.length; i++) {
                keep[comp[i]] = 0;
              }
            }
          }
        }

        // Build output canvas
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        for (let i = 0; i < w * h; i++) {
          if (keep[i]) {
            outData[i * 4] = 7;     // Arzon Deep Navy
            outData[i * 4 + 1] = 26;
            outData[i * 4 + 2] = 74;
            outData[i * 4 + 3] = data[i * 4 + 3] > 180 ? 255 : 220;
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

  fs.writeFileSync('scripts/corridor_sig.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved corridor signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
