const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== PICTURE / BANNER ===');
console.log($('.scaler-event > picture').html());

console.log('\n=== FLOATING CONTAINER 0 (unified-auth-form) ===');
console.log($('.floating-container.unified-auth-form').html());

console.log('\n=== FLOATING CONTAINER 1 (scaler-event__floating-container) ===');
console.log($('.scaler-event__floating-container').html());
