import { chromium } from '@playwright/test';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync('scripts/test_bd4.png');
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

        // Binary mask of ink
        const keep = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 40) {
            keep[i] = 1;
          }
        }

        // 1. Erase all lines in the outer margins:
        // Top right above Bathula (x > 750, y < 135)
        for (let y = 0; y < 135; y++) {
          for (let x = 750; x < w; x++) keep[y * w + x] = 0;
        }

        // Top right beyond ascenders (x > 1160, y < 290)
        for (let y = 0; y < 290; y++) {
          for (let x = 1160; x < w; x++) keep[y * w + x] = 0;
        }

        // Above ascenders (x > 980, y < 148)
        for (let y = 0; y < 148; y++) {
          for (let x = 980; x < w; x++) keep[y * w + x] = 0;
        }

        // Bottom margin below Bathula (x < 1140, y > 380)
        for (let y = 380; y < h; y++) {
          for (let x = 0; x < 1140; x++) keep[y * w + x] = 0;
        }

        // Bottom margin below Rahul (x < 600, y > 360)
        for (let y = 360; y < h; y++) {
          for (let x = 0; x < 600; x++) keep[y * w + x] = 0;
        }

        // Space below B stem (x: 750..815, y > 345)
        for (let y = 345; y < h; y++) {
          for (let x = 750; x <= 815; x++) keep[y * w + x] = 0;
        }

        // 2. Erase ruled lines in the open interior of B's upper bowl:
        // Upper bowl outer perimeter: x ≈ 810..975, y ≈ 140..245
        // Interior whitespace: x from 835 to 925, y from 175 to 225
        for (let y = 175; y <= 225; y++) {
          for (let x = 835; x <= 925; x++) {
            // Check vertical thickness: if it's the 1-2px ruled line
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 3. Erase ruled lines in the open interior of B's lower bowl:
        // Interior whitespace: x from 845 to 915, y from 270 to 320
        for (let y = 270; y <= 320; y++) {
          for (let x = 845; x <= 915; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 4. Erase ruled lines in the whitespace gap between B and t:
        // Gap is between x = 930 and 962
        for (let y = 150; y <= 340; y++) {
          for (let x = 930; x <= 962; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 5. Erase ruled lines in the whitespace gap between t and h:
        // Gap is between x = 985 and 1005, y < 330
        for (let y = 150; y <= 330; y++) {
          for (let x = 985; x <= 1005; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 6. Erase ruled lines in the whitespace gap between h and l:
        // Gap is between x = 1060 and 1088, y < 290
        for (let y = 150; y <= 290; y++) {
          for (let x = 1060; x <= 1088; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 7. Erase line beneath flourish (x: 1050..1160, y > 400)
        for (let y = 405; y < h; y++) {
          for (let x = 1050; x <= 1160; x++) {
            let v = 0;
            for (let dy = -4; dy <= 4; dy++) {
              if (y + dy < h && keep[(y + dy) * w + x]) v++;
            }
            if (v <= 3) keep[y * w + x] = 0;
          }
        }

        // 8. Remove any disconnected small components (< 20px)
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

        // 9. Antialiased rendering with smooth ink contours
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
  fs.writeFileSync('scripts/surgical_result.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved surgical result to public/brand/rahul-bathula-signature.png:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
