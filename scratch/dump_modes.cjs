const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== ALL MODES IN UNIFIED AUTH FORM ===');
$('.unified-auth-form .form-flow__mode').each((i, el) => {
  console.log(`\nMODE ${i}: [${$(el).attr('data-mode')}] active: ${$(el).hasClass('form-flow__mode--active')}`);
  console.log($(el).html().substring(0, 500));
});
