import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/cleaned_sig.png');
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const report = await page.evaluate(async (dataUrl) => {
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

        // Find connected components of pixels where alpha > 40
        const visited = new Uint8Array(w * h);
        const components = [];

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            if (visited[idx] || data[idx * 4 + 3] <= 40) continue;

            // BFS
            const queue = [idx];
            visited[idx] = 1;
            let count = 0;
            let minX = x, maxX = x, minY = y, maxY = y;

            while (queue.length > 0) {
              const curr = queue.pop();
              count++;
              const cy = Math.floor(curr / w);
              const cx = curr % w;

              if (cx < minX) minX = cx;
              if (cx > maxX) maxX = cx;
              if (cy < minY) minY = cy;
              if (cy > maxY) maxY = cy;

              // 8-way neighbors
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const nx = cx + dx;
                  const ny = cy + dy;
                  if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                    const nidx = ny * w + nx;
                    if (!visited[nidx] && data[nidx * 4 + 3] > 40) {
                      visited[nidx] = 1;
                      queue.push(nidx);
                    }
                  }
                }
              }
            }

            components.push({
              count,
              minX, maxX, minY, maxY,
              width: maxX - minX + 1,
              height: maxY - minY + 1,
              aspect: (maxX - minX + 1) / (maxY - minY + 1)
            });
          }
        }

        // Sort descending by count
        components.sort((a, b) => b.count - a.count);

        resolve({
          totalComponents: components.length,
          top15: components.slice(0, 15),
          smallCount: components.filter(c => c.count < 30).length
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Component report:', JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch(console.error);
