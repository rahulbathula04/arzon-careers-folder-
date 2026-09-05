const fs = require('fs');
const html = fs.readFileSync('scratch/scaler_event_inner.html', 'utf8');

// Let's print out the structure cleanly
const cheerio = require('cheerio'); // let's see if cheerio exists or write manual regex
try {
  const $ = require('cheerio').load(html);
  console.log('Cheerio loaded successfully!');
  console.log('Top level classes:', $('.scaler-event > div').map((i, el) => $(el).attr('class')).get());
} catch (e) {
  // manual regex
  console.log('No cheerio, doing regex parse');
}
