const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== MODE 1 FULL ===');
console.log($('.unified-auth-form [data-mode="unified-auth-form-details"]').html());
