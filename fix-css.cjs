const fs = require('fs');
const filePath = 'src/styles.css';
let content = fs.readFileSync(filePath, 'utf8');

// Fix double escaped backslashes from previous runs
content = content.split('.bg-\\\\[\\\\#0a0c10\\\\]').join('.bg-\\[\\#0a0c10\\]');
content = content.split('.bg-\\\\[#0a0c10\\\\]').join('.bg-\\[\\#0a0c10\\]');

// Fix unescaped ones if any
content = content.split('.bg-[#0a0c10]').join('.bg-\\[\\#0a0c10\\]');

// Also handle the ones with opacity like .bg-[#0a0c10]\/90
content = content.split('.bg-[#0a0c10]\\/').join('.bg-\\[\\#0a0c10\\]\\/');
content = content.split('.bg-\\\\[\\\\#0a0c10\\\\]\\/').join('.bg-\\[\\#0a0c10\\]\\/');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed CSS escapes');
