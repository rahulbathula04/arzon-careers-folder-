const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');
const $ = cheerio.load(html);

// Remove scripts and style tags for clean inspection
$('script, style, noscript').remove();

console.log('=== HERO / BANNER ===');
$('.banner, .event-banner, [class*="banner"], [class*="hero"]').each((i, el) => {
  console.log(`[${$(el).attr('class')}]:`);
  console.log($(el).text().replace(/\s+/g, ' ').trim().substring(0, 300));
});

console.log('\n=== FORM & REGISTRATION ===');
$('[class*="form"], [class*="register"]').each((i, el) => {
  const cls = $(el).attr('class') || '';
  if (cls.includes('event') || cls.includes('reg')) {
    console.log(`[${cls}]: ${$(el).text().replace(/\s+/g, ' ').trim().substring(0, 150)}`);
  }
});

console.log('\n=== SECTIONS ===');
$('section').each((i, el) => {
  console.log(`--- SECTION ${i} [${$(el).attr('class')}] ---`);
  console.log($(el).html().substring(0, 1000));
});
