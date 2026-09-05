const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');
const $ = cheerio.load(html);

const section0 = $('section').first().html();
fs.writeFileSync('scratch/section0.html', section0);
console.log('Saved scratch/section0.html, length:', section0.length);
