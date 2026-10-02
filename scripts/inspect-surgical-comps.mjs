import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/surgical_result.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const comps = await page.evaluate(async (dataUrl) => {
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
        const list = [];

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

            list.push({
              count: comp.length,
              minX, maxX, minY, maxY,
              width: maxX - minX + 1,
              height: maxY - minY + 1,
              aspect: (maxX - minX + 1) / (maxY - minY + 1)
            });
          }
        }

        list.sort((a, b) => b.count - a.count);
        resolve(list);
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Connected components in surgical_result:', comps);
  await browser.close();
}

main().catch(console.error);
