import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const imagePath = 'c:/Users/Rahul/Downloads/WhatsApp Image 2026-10-02 at 10.34.02 PM.jpeg';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Read image as base64
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  const result = await page.evaluate(async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // img width and height
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        
        // When rotated 90 degrees clockwise, canvas width is h, canvas height is w
        const canvas = document.createElement('canvas');
        canvas.width = h;
        canvas.height = w;
        const ctx = canvas.getContext('2d');
        
        // Rotate 90 deg clockwise
        ctx.translate(h, 0);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imgData = ctx.getImageData(0, 0, h, w);
        const data = imgData.data;
        
        // Analyze ink vs paper
        // Sample some pixels
        let minR = 255, maxR = 0, minB = 255, maxB = 0;
        let blueInkPixels = 0;
        
        // Find bounds of the blue ink
        let minX = h, maxX = 0, minY = w, maxY = 0;
        
        for (let y = 0; y < w; y++) {
          for (let x = 0; x < h; x++) {
            const idx = (y * h + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            
            // Blue ballpoint ink on notebook paper:
            // Blue channel is noticeably higher than red and green, or overall darkness compared to white paper
            // The paper is bright: r > 180, g > 180, b > 180
            // Ruled lines are grey/pale blue: (b - r) is small
            // Blue ink has: (b - r) > 20 or (b - g) > 15, or darkness where b is primary
            const brightness = (r + g + b) / 3;
            const isBlueInk = (b > r + 15 || b > g + 10) && brightness < 170;
            
            if (isBlueInk) {
              blueInkPixels++;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        
        resolve({
          originalWidth: w,
          originalHeight: h,
          rotatedWidth: h,
          rotatedHeight: w,
          blueInkPixels,
          bounds: { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY }
        });
      };
      img.src = dataUrl;
    });
  }, base64Image);

  console.log('Result:', result);
  await browser.close();
}

main().catch(console.error);
