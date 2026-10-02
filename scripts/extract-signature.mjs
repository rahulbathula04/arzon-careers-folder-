import { chromium } from '@playwright/test';
import fs from 'fs';

const imagePath = 'c:/Users/Rahul/Downloads/WhatsApp Image 2026-10-02 at 10.34.02 PM.jpeg';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  const output = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // 1. Draw rotated 90 deg clockwise
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalHeight; // 1600
        canvas.height = img.naturalWidth; // 1200
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width, 0);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, 0, 0);

        const w = canvas.width;
        const h = canvas.height;
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Bounding box of signature
        // We know from previous scan minX ~ 40, maxX ~ 1450, minY ~ 340, maxY ~ 680
        // Let's accurately find the bounding box
        let minX = w, maxX = 0, minY = h, maxY = 0;

        // Function to score if a pixel is ink
        // Ink in blue ballpoint has:
        // 1. High contrast difference: (b - r) > 15 or (b - g) > 10
        // 2. Darkness: (r + g + b)/3 is noticeably darker than the local paper
        // 3. Notebook lines: are horizontal, very uniform, with low (b - r) < 12
        function getInkConfidence(x, y) {
          if (x < 30 || x > 1450 || y < 280 || y > 750) return 0;
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Blue ink detection
          const blueDominance = b - Math.max(r, g);
          const colorDiff = (b - r) + (b - g) * 0.5;
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

          // Notebook horizontal lines have luminance ~130-170, but blueDominance is under 15
          // Ink has blueDominance > 16, or if dark (luminance < 110) blueDominance > 10
          if (blueDominance > 15 || (luminance < 115 && blueDominance > 8)) {
            // Calculate ink strength from 0 to 1
            const strength = Math.min(1, Math.max(0, (blueDominance - 10) / 25) * 0.7 + Math.max(0, (160 - luminance) / 80) * 0.5);
            return Math.min(1, strength);
          }
          return 0;
        }

        // Find precise bounding box of confident ink
        for (let y = 280; y < 750; y++) {
          for (let x = 30; x < 1450; x++) {
            if (getInkConfidence(x, y) > 0.3) {
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

        // Create output transparent canvas
        const outCanvas = document.createElement('canvas');
        outCanvas.width = cropW;
        outCanvas.height = cropH;
        const outCtx = outCanvas.getContext('2d');
        const outImgData = outCtx.createImageData(cropW, cropH);
        const outData = outImgData.data;

        // Certificate navy ink target color: #0A1A3A (r=10, g=26, b=58)
        // Or royal deep navy ink #071A4A (r=7, g=26, b=74)
        const inkR = 7;
        const inkG = 26;
        const inkB = 74;

        for (let y = 0; y < cropH; y++) {
          for (let x = 0; x < cropW; x++) {
            const srcX = cropX + x;
            const srcY = cropY + y;
            const srcIdx = (srcY * w + srcX) * 4;
            const destIdx = (y * cropW + x) * 4;

            const r = data[srcIdx];
            const g = data[srcIdx + 1];
            const b = data[srcIdx + 2];

            const blueDominance = b - Math.max(r, g);
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

            // Strict ink isolation: filter out faint notebook lines
            // Notebook lines have (b - r) around 5-14
            // Blue ink has (b - r) > 18 or high saturation
            let alpha = 0;
            if (blueDominance > 16) {
              alpha = Math.min(1, (blueDominance - 14) / 22);
            } else if (luminance < 110 && blueDominance > 10) {
              alpha = Math.min(1, (120 - luminance) / 40);
            }

            // Anti-aliased stroke rendering
            if (alpha > 0.05) {
              // Smooth out curve
              const smoothedAlpha = Math.pow(alpha, 0.85);
              outData[destIdx] = inkR;
              outData[destIdx + 1] = inkG;
              outData[destIdx + 2] = inkB;
              outData[destIdx + 3] = Math.round(smoothedAlpha * 255);
            } else {
              outData[destIdx + 3] = 0;
            }
          }
        }

        outCtx.putImageData(outImgData, 0, 0);

        resolve({
          bounds: { minX, maxX, minY, maxY, cropW, cropH },
          dataUrl: outCanvas.toDataURL('image/png')
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  fs.mkdirSync('public/brand', { recursive: true });
  fs.writeFileSync('public/brand/rahul-bathula-signature.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/extracted_sig.png', Buffer.from(output.dataUrl.split(',')[1], 'base64'));
  console.log('Signature extracted successfully:', output.bounds);
  await browser.close();
}

main().catch(console.error);
