const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');
const $ = cheerio.load(html);

// Find the hero container
const hero = $('.scaler-event');
console.log('scaler-event children classes:');
hero.children().each((i, el) => {
  console.log(`[${i}] <${el.tagName} class="${$(el).attr('class')}">`);
});

// Look for banner / main container
const container = $('.scaler-event > div');
container.children().each((i, el) => {
  console.log(`  Sub [${i}] <${el.tagName} class="${$(el).attr('class')}">`);
});

// Let's find where "Become an AI Product Manager" is in the DOM
const h1orTitle = $('*:contains("Become an AI Product Manager")').last();
console.log('Title element:', h1orTitle[0].tagName, h1orTitle.attr('class'));
console.log('Title parent hierarchy:');
let curr = h1orTitle.parent();
for (let i = 0; i < 6 && curr.length; i++) {
  console.log(`  lvl ${i}: <${curr[0].tagName} class="${curr.attr('class')}">`);
  curr = curr.parent();
}
