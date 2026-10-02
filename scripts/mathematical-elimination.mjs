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

        const keep = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 30) {
            keep[i] = 1;
          }
        }

        // The mathematically exact ruled lines:
        // Spacing = 68px, slope = 0.158, anchor at x=1050
        const slope = 0.158;
        const xAnchor = 1050;
        const lineBases = [10, 78, 146, 214, 282, 350, 418, 486];

        function isNearRuledGrid(x, y) {
          for (let k = 0; k < lineBases.length; k++) {
            const ly = Math.round(lineBases[k] + slope * (x - xAnchor));
            if (Math.abs(y - ly) <= 4) return true;
          }
          return false;
        }

        // Clean outer margins:
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

        // Column scan:
        for (let x = 0; x < w; x++) {
          let y = 0;
          while (y < h) {
            if (keep[y * w + x]) {
              const startY = y;
              while (y < h && keep[y * w + x]) y++;
              const endY = y - 1;
              const runLen = endY - startY + 1;
              const midY = Math.round((startY + endY) / 2);

              // If it's a thin stroke (<= 5px) AND lies on one of the ruled lines:
              if (runLen <= 5 && isNearRuledGrid(x, midY)) {
                // Check if it's connected to ink above (dy = -6..-3) AND ink below (dy = +3..+6)
                let hasAbove = false;
                for (let dy = -6; dy <= -3; dy++) {
                  if (startY + dy >= 0 && keep[(startY + dy) * w + x]) hasAbove = true;
                }
                let hasBelow = false;
                for (let dy = 3; dy <= 6; dy++) {
                  if (endY + dy < h && keep[(endY + dy) * w + x]) hasBelow = true;
                }

                // If not connected both above and below: ERASE!
                if (!hasAbove || !hasBelow) {
                  for (let ry = startY; ry <= endY; ry++) {
                    keep[ry * w + x] = 0;
                  }
                }
              }
            } else {
              y++;
            }
          }
        }

        // Heal 1-2px vertical notches in strokes
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

        // Remove any tiny disconnected islands (< 20px)
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

        // Render clean antialiased signature
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
  fs.writeFileSync('scripts/mathematical_perfection.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved mathematical perfection signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
