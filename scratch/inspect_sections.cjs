const fs = require('fs');
const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');

// Find where the main content begins
const bodyStart = html.indexOf('<body');
const bodyContent = html.substring(bodyStart);

// Let's find sections
const sectionMatches = [...bodyContent.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)];
console.log('Sections found:', sectionMatches.length);

sectionMatches.forEach((s, i) => {
  const opening = s[0].substring(0, s[0].indexOf('>') + 1);
  console.log(`Section ${i}: ${opening}`);
  const textSample = s[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150);
  console.log(`  Preview: ${textSample}\n`);
});

// Also check main or div with class event
const mainMatches = [...bodyContent.matchAll(/<div[^>]+class="[^"]*(?:event|masterclass|detail|content)[^"]*"[^>]*>/gi)];
console.log('Main/Event divs:', mainMatches.slice(0, 15).map(m => m[0]));
