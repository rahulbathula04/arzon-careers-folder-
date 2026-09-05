const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ 
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  console.log('Navigating to Scaler event page...');
  await page.goto('https://www.scaler.com/event/from-pm-to-ai-pm--how-to-get-into-ai-pm-roles-today-10-b/', { 
    waitUntil: 'domcontentloaded', 
    timeout: 60000 
  });
  console.log('Waiting for content to settle...');
  await page.waitForTimeout(5000);
  
  await page.screenshot({ path: 'scratch/scaler_desktop.png', fullPage: true });
  console.log('Saved scratch/scaler_desktop.png');

  // Also mobile viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scratch/scaler_mobile.png', fullPage: true });
  console.log('Saved scratch/scaler_mobile.png');

  // Back to desktop for data
  await page.setViewportSize({ width: 1440, height: 900 });

  const pageData = await page.evaluate(() => {
    return {
      title: document.title,
      bodyText: document.body.innerText,
      allImages: Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className
      })),
      links: Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim(),
        href: a.href
      }))
    };
  });

  fs.writeFileSync('scratch/scaler_data.json', JSON.stringify(pageData, null, 2));
  fs.writeFileSync('scratch/scaler_rendered.html', await page.content());
  console.log('Saved scratch/scaler_data.json and HTML.');
  console.log('--- BODY TEXT START ---');
  console.log(pageData.bodyText);
  console.log('--- BODY TEXT END ---');

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
