import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/test_bd6.png');
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

        // Copy into keep array
        const keep = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 40) {
            keep[i] = 1;
          }
        }

        // 1. Remove bottom ruled line:
        // In the bottom area (y > 410), any ink that is below y=415 except the curved loop of flourish (which is around x=1180..1280)
        // Notice the ruled line at the bottom runs from x=1100 to 1250 at y=420..435
        for (let y = 415; y < h; y++) {
          for (let x = 0; x < w; x++) {
            // The flourish loop curves down around x=1220..1280, reaching y=435
            // But the straight ruled line runs at y=425..430 with thickness <= 3
            if (keep[y * w + x]) {
              // check vertical thickness
              let up = 0;
              while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
              let down = 0;
              while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
              if (up + down + 1 <= 3 && x < 1220) {
                keep[y * w + x] = 0;
              }
            }
          }
        }

        // 2. Remove noise under 'B' (y > 350, x < 870)
        for (let y = 350; y < h; y++) {
          for (let x = 700; x < 870; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 3. Remove ruled line dashes inside Bathula:
        // For any pixel where vertical thickness <= 3 and horizontal run >= 6:
        for (let y = 10; y < h - 10; y++) {
          for (let x = 750; x < w - 10; x++) {
            const idx = y * w + x;
            if (!keep[idx]) continue;

            let up = 0;
            while (y - up - 1 >= 0 && data[((y - up - 1) * w + x) * 4 + 3] > 30) up++;
            let down = 0;
            while (y + down + 1 < h && data[((y + down + 1) * w + x) * 4 + 3] > 30) down++;
            const vThickness = 1 + up + down;

            if (vThickness <= 3) {
              // Check empty space 4-6px above and below
              let emptyAbove = true;
              for (let dy = -7; dy <= -4; dy++) {
                if (y + dy >= 0 && data[((y + dy) * w + x) * 4 + 3] > 30) emptyAbove = false;
              }
              let emptyBelow = true;
              for (let dy = 4; dy <= 7; dy++) {
                if (y + dy < h && data[((y + dy) * w + x) * 4 + 3] > 30) emptyBelow = false;
              }

              if (emptyAbove && emptyBelow) {
                // If it's a thin bar floating with empty space above AND below:
                keep[idx] = 0;
              }
            }
          }
        }

        // 4. Heal and smooth the strokes!
        // Where a stroke had a 1-2px gap or notch, bridge it:
        for (let pass = 0; pass < 2; pass++) {
          for (let y = 2; y < h - 2; y++) {
            for (let x = 2; x < w - 2; x++) {
              const idx = y * w + x;
              if (!keep[idx]) {
                const vertBridge = keep[(y - 1) * w + x] && keep[(y + 1) * w + x];
                const horizBridge = keep[y * w + (x - 1)] && keep[y * w + (x + 1)];
                const diag1Bridge = keep[(y - 1) * w + (x - 1)] && keep[(y + 1) * w + (x + 1)];
                const diag2Bridge = keep[(y - 1) * w + (x + 1)] && keep[(y + 1) * w + (x - 1)];
                if (vertBridge || horizBridge || diag1Bridge || diag2Bridge) {
                  keep[idx] = 1;
                }
              }
            }
          }
        }

        // 5. Remove any small disconnected noise specks (< 20px)
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

            if (comp.length < 25) {
              for (let i = 0; i < comp.length; i++) {
                keep[comp[i]] = 0;
              }
            }
          }
        }

        // 6. Antialiased rendering:
        // Use distance field / Gaussian feathering for smooth signature ink on high-DPI screens
        const outCanvas = document.createElement('canvas');
        outCanvas.width = w;
        outCanvas.height = h;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(w, h);
        const outData = outImgData.data;

        // Target: Arzon Deep Ink #071A4A (r=7, g=26, b=74)
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (keep[idx]) {
              // Count neighbors for smooth edge antialiasing
              let nCount = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (keep[(y + dy) * w + (x + dx)]) nCount++;
                }
              }
              const alpha = nCount >= 7 ? 255 : Math.round((nCount / 7) * 230);
              outData[idx * 4] = 7;
              outData[idx * 4 + 1] = 26;
              outData[idx * 4 + 2] = 74;
              outData[idx * 4 + 3] = alpha;
            }
          }
        }

        outCtx.putImageData(outImgData, 0, 0);

        // Crop tightly with aesthetic margins
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
  fs.writeFileSync('scripts/final_signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved final signature to public/brand/rahul-bathula-signature.png:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
