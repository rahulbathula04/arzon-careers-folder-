import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/ultimate_signature.png');
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

        // The 3 line corridors across Bathula:
        const slope = 0.158;

        function eraseCorridor(baseY, xStart, xEnd) {
          for (let x = xStart; x <= xEnd; x++) {
            const cy = Math.round(baseY + slope * (x - 1000));
            for (let dy = -3; dy <= 3; dy++) {
              const y = cy + dy;
              if (y >= 0 && y < h && x >= 0 && x < w) {
                keep[y * w + x] = 0;
              }
            }
          }
        }

        // Line 1 (y ≈ 195 at x=1000):
        // Gap between B upper lobe and t: x = 930..962
        eraseCorridor(195, 925, 962);
        // Gap between t and h: x = 980..1035
        eraseCorridor(195, 980, 1038);
        // Gap between h and l: x = 1075..1115
        eraseCorridor(195, 1075, 1115);
        // Right of l: x = 1155..1300
        eraseCorridor(195, 1155, 1300);

        // Line 2 (y ≈ 262 at x=1000):
        // Gap between B waist and t: x = 935..962
        eraseCorridor(262, 935, 962);
        // Gap between t and h: x = 980..1015
        eraseCorridor(262, 980, 1015);
        // Gap between h and l: x = 1060..1115
        eraseCorridor(262, 1060, 1115);
        // Right of l: x = 1150..1300
        eraseCorridor(262, 1150, 1300);

        // Line 3 (y ≈ 330 at x=1000):
        // Gap between B lower lobe and 'a': x = 865..890
        eraseCorridor(330, 865, 890);
        // Gap between 'a' and 't': x = 935..965
        eraseCorridor(330, 935, 965);
        // Gap between 't' and 'h': x = 985..1010
        eraseCorridor(330, 985, 1010);
        // Gap between 'l' and 'a': x = 1135..1160
        eraseCorridor(330, 1135, 1160);

        // Line 4 (y ≈ 395 at x=1000):
        // Under Bathula: x = 750..1150
        eraseCorridor(395, 750, 1150);

        // Fill / heal any 1px cuts in stroke borders:
        for (let pass = 0; pass < 2; pass++) {
          for (let y = 2; y < h - 2; y++) {
            for (let x = 2; x < w - 2; x++) {
              const idx = y * w + x;
              if (!keep[idx]) {
                const u = keep[(y - 1) * w + x];
                const d = keep[(y + 1) * w + x];
                const l = keep[y * w + (x - 1)];
                const r = keep[y * w + (x + 1)];
                if ((u && d) || (l && r)) {
                  keep[idx] = 1;
                }
              }
            }
          }
        }

        // Clean any stray specks (< 15px)
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
              outData[idx * 4] = 7;     // #071A4A Arzon Executive Navy
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
  fs.writeFileSync('scripts/perfection.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved perfection signature:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
