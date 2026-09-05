const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== FORM HTML ===');
console.log($('.floating-container.unified-auth-form').html());
