const fs = require('fs');
const path = require('path');
const dir = 'scripts';

fs.readdirSync(dir).forEach((f) => {
  const p = path.join(dir, f);
  if (f.endsWith('.json')) {
    try {
      const content = fs.readFileSync(p, 'utf8');
      const json = JSON.parse(content);
      if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
        const normalized = {};
        for (const k of Object.keys(json)) {
          normalized[k.replace(/\\/g, '/')] = json[k];
        }
        fs.writeFileSync(p, JSON.stringify(normalized, null, 2) + '\n', 'utf8');
        console.log('Normalized JSON baseline:', f);
      }
    } catch (e) {}
  }
  if (f.endsWith('.mjs')) {
    let content = fs.readFileSync(p, 'utf8');
    if (content.includes('baseline[o.file]')) {
      content = content.replace(/baseline\[o\.file\]/g, 'baseline[o.file.replace(/\\\\/g, "/")]');
      fs.writeFileSync(p, content, 'utf8');
      console.log('Normalized script lookup:', f);
    }
  }
});
