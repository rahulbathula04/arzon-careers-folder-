const fs = require('fs');
const html = fs.readFileSync('scratch/scaler_rendered.html', 'utf8');

const startIdx = html.indexOf('<div class="scaler-event">');
if (startIdx !== -1) {
  // Find where it ends or grab next 50000 chars
  const sub = html.substring(startIdx);
  // find matching closing div or footer
  const footerIdx = sub.indexOf('<footer');
  const eventHtml = footerIdx !== -1 ? sub.substring(0, footerIdx) : sub.substring(0, 50000);
  fs.writeFileSync('scratch/scaler_event_inner.html', eventHtml);
  console.log('Saved scratch/scaler_event_inner.html, length:', eventHtml.length);
}
