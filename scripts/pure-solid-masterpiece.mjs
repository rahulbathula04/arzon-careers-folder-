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

        const keep = new Uint8Array(w * h);
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] > 40) {
            keep[i] = 1;
          }
        }

        // 1. Clear empty margins:
        // Above Bathula (x > 750, y < 140)
        for (let y = 0; y < 140; y++) {
          for (let x = 750; x < w; x++) {
            keep[y * w + x] = 0;
          }
        }

        // Below Bathula (x < 1140, y > 375)
        for (let y = 375; y < h; y++) {
          for (let x = 0; x < 1140; x++) {
            keep[y * w + x] = 0;
          }
        }

        // Below Rahul (x < 600, y > 360)
        for (let y = 360; y < h; y++) {
          for (let x = 0; x < 600; x++) {
            keep[y * w + x] = 0;
          }
        }

        // Top right of ascenders (x > 1155, y < 290)
        for (let y = 0; y < 290; y++) {
          for (let x = 1155; x < w; x++) {
            keep[y * w + x] = 0;
          }
        }

        // Above ascenders of t, h, l (y < 145, x > 950)
        for (let y = 0; y < 145; y++) {
          for (let x = 950; x < w; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 2. Erase horizontal line in the interior of B's upper bowl:
        // The upper bowl spans x=820..960, y=150..245
        // Inside the bowl is x=840..920, y=180..220
        for (let y = 180; y <= 220; y++) {
          for (let x = 840; x <= 920; x++) {
            // Check if it's the thin horizontal line
            let up = 0;
            while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
            if (up + down + 1 <= 3) {
              keep[y * w + x] = 0;
            }
          }
        }

        // 3. Erase horizontal line in the interior of B's lower bowl:
        // Lower bowl spans x=840..960, y=250..340
        // Inside lower bowl: x=850..915, y=275..315
        for (let y = 275; y <= 315; y++) {
          for (let x = 850; x <= 915; x++) {
            let up = 0;
            while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
            if (up + down + 1 <= 3) {
              keep[y * w + x] = 0;
            }
          }
        }

        // 4. Erase horizontal line in inter-letter gaps:
        // Gap between B and t: x = 930..958
        for (let y = 160; y <= 340; y++) {
          for (let x = 930; x <= 958; x++) {
            let up = 0;
            while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
            if (up + down + 1 <= 3) {
              keep[y * w + x] = 0;
            }
          }
        }

        // Gap between t and h: x = 985..998
        for (let y = 160; y <= 340; y++) {
          for (let x = 985; x <= 998; x++) {
            let up = 0;
            while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
            if (up + down + 1 <= 3) {
              keep[y * w + x] = 0;
            }
          }
        }

        // Gap between h and l: x = 1065..1085, y < 290
        for (let y = 160; y < 290; y++) {
          for (let x = 1065; x <= 1085; x++) {
            let up = 0;
            while (y - up - 1 >= 0 && keep[(y - up - 1) * w + x]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[(y + down + 1) * w + x]) down++;
            if (up + down + 1 <= 3) {
              keep[y * w + x] = 0;
            }
          }
        }

        // Gap between B stem and flourish: x = 750..810, y > 340
        for (let y = 345; y < h; y++) {
          for (let x = 750; x <= 810; x++) {
            keep[y * w + x] = 0;
          }
        }

        // 5. Remove any ruled line fragments crossing the whole word:
        // Any pixel in Bathula (x > 700) with vertical thickness <= 2 and horizontal extent >= 6
        for (let y = 10; y < h - 10; y++) {
          for (let x = 700; x < w - 10; x++) {
            const idx = y * w + x;
            if (!keep[idx]) continue;

            let up = 0;
            while (y - up - 1 >= 0 && keep[((y - up - 1) * w + x)]) up++;
            let down = 0;
            while (y + down + 1 < h && keep[((y + down + 1) * w + x)]) down++;
            if (up + down + 1 <= 2) {
              // check if there's no vertical connection above (dy=-5..-3) and below (dy=+3..+5)
              let hasUp = false;
              for (let dy = -5; dy <= -3; dy++) {
                if (keep[((y + dy) * w + x)]) hasUp = true;
              }
              let hasDown = false;
              for (let dy = 3; dy <= 5; dy++) {
                if (keep[((y + dy) * w + x)]) hasDown = true;
              }
              if (!hasUp || !hasDown) {
                keep[idx] = 0;
              }
            }
          }
        }

        // 6. Smooth & heal stroke crossings (bridge 1-2px gaps)
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

        // 7. Output rendering with clean antialiasing
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

  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/pure_solid_masterpiece.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Saved pure solid masterpiece to public/brand/rahul-bathula-signature.png:', output.dimensions);
  await browser.close();
}

main().catch(console.error);
