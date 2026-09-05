const fs = require('fs');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');

// Let's inspect the main content area
// Extract images
const images = Array.from(html.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/g)).map(m => m[1]);
console.log('Images found:', images.length);
images.forEach(img => {
  if (img.includes('assets') || img.includes('cloudfront') || img.includes('speaker') || img.includes('banner')) {
    console.log('Img:', img);
  }
});

// Let's inspect the layout structure around "Become an AI Product Manager"
const idx = html.indexOf('Become an AI Product Manager');
if (idx !== -1) {
  console.log('Context around title:');
  console.log(html.substring(Math.max(0, idx - 800), Math.min(html.length, idx + 1500)));
}
