import { chromium } from '@playwright/test';
import fs from 'fs';

// Let's create an SVG that traces Rahul Bathula's signature faithfully:
// Coordinates calibrated from cw90.png and cleaned_sig.png
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 440" width="1320" height="440" fill="none">
  <defs>
    <filter id="smooth" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="0.4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <g stroke="#071A4A" stroke-linecap="round" stroke-linejoin="round" filter="url(#smooth)">
    <!-- R: Left vertical stem with entry flick and bottom curve -->
    <path d="M 120 145 C 112 165, 102 230, 92 295 C 84 345, 74 380, 68 395 C 65 402, 60 405, 58 395 C 55 385, 62 370, 72 360" stroke-width="4.5" />

    <!-- R: Top sweeping flourish and upper bowl -->
    <path d="M 15 110 C 25 80, 70 42, 145 34 C 210 27, 285 45, 330 80 C 355 102, 365 130, 350 160 C 335 190, 290 220, 220 238 C 170 250, 115 252, 85 248" stroke-width="4.2" />

    <!-- R to a: Belt cross-stroke and transition into 'a' -->
    <path d="M 85 248 C 120 252, 175 265, 235 272" stroke-width="3.8" />

    <!-- a: Oval body -->
    <path d="M 235 272 C 220 285, 225 315, 255 320 C 280 324, 305 305, 308 280 C 310 262, 288 258, 260 265 C 235 272, 230 295, 245 315 C 260 328, 295 322, 312 300" stroke-width="3.6" />

    <!-- h: Tall ascender loop rising from 'a' -->
    <path d="M 312 300 C 330 280, 385 170, 435 95 C 452 70, 468 65, 472 75 C 476 88, 455 130, 430 185 C 395 260, 370 315, 365 330" stroke-width="3.8" />
    <!-- h: Shoulder arch and drop -->
    <path d="M 368 300 C 385 275, 415 260, 442 265 C 465 270, 472 290, 470 315 C 468 332, 458 345, 450 348" stroke-width="3.6" />

    <!-- u: Undercurve valley -->
    <path d="M 450 348 C 458 358, 478 368, 502 360 C 522 352, 532 335, 538 312" stroke-width="3.6" />

    <!-- l: Tall soaring ascender loop -->
    <path d="M 538 312 C 555 260, 615 150, 660 85 C 675 62, 692 60, 696 72 C 700 88, 678 135, 645 200 C 605 275, 575 335, 568 350 C 560 365, 572 372, 595 365 C 630 352, 690 325, 745 305" stroke-width="3.9" />

    <!-- B: Vertical spine -->
    <path d="M 818 165 C 812 195, 805 265, 808 315 C 810 345, 818 365, 825 368" stroke-width="4.2" />

    <!-- B: Upper lobe -->
    <path d="M 818 165 C 840 145, 915 130, 965 145 C 995 155, 1005 180, 990 205 C 970 230, 925 245, 865 248" stroke-width="4.0" />

    <!-- B: Lower lobe -->
    <path d="M 865 248 C 915 248, 978 260, 998 290 C 1012 312, 1000 338, 965 355 C 925 372, 860 375, 825 368" stroke-width="4.0" />

    <!-- a: Connect from B into 'a' -->
    <path d="M 825 368 C 855 370, 885 365, 908 348 C 925 335, 925 315, 905 315 C 885 315, 872 335, 880 355 C 890 372, 920 375, 942 360" stroke-width="3.5" />

    <!-- t: Tall straight ascender -->
    <path d="M 972 178 C 970 220, 968 285, 970 348 C 970 360, 975 365, 982 362" stroke-width="3.8" />
    <!-- t: Crisp horizontal crossbar -->
    <path d="M 932 232 C 955 230, 990 228, 1018 226" stroke-width="3.2" />

    <!-- h: Tall ascender loop after 't' -->
    <path d="M 982 362 C 998 340, 1030 235, 1060 175 C 1072 150, 1085 148, 1088 158 C 1092 170, 1075 210, 1052 265 C 1030 320, 1018 355, 1015 365" stroke-width="3.6" />
    <!-- h: Shoulder -->
    <path d="M 1022 340 C 1035 320, 1055 310, 1075 315 C 1092 320, 1098 335, 1095 355 C 1092 370, 1085 378, 1078 380" stroke-width="3.4" />

    <!-- u: Undercurve -->
    <path d="M 1078 380 C 1088 388, 1105 392, 1120 385 C 1132 378, 1138 365, 1142 345" stroke-width="3.4" />

    <!-- l: Tall ascender loop -->
    <path d="M 1142 345 C 1155 300, 1190 215, 1218 165 C 1228 145, 1238 142, 1242 152 C 1245 162, 1232 200, 1212 255 C 1190 315, 1175 358, 1170 368" stroke-width="3.6" />

    <!-- a: Final vowel -->
    <path d="M 1170 368 C 1180 355, 1195 348, 1210 352 C 1222 356, 1225 370, 1218 382 C 1210 395, 1192 398, 1180 390 C 1170 382, 1172 370, 1182 365 C 1192 360, 1210 365, 1222 380" stroke-width="3.5" />

    <!-- Master Paraph: Dramatic under-loop and closing flourish -->
    <path d="M 1222 380 C 1245 405, 1260 435, 1248 460 C 1235 482, 1195 488, 1150 480 C 1095 470, 1050 445, 1025 425 C 1005 408, 1010 395, 1030 398 C 1060 402, 1120 420, 1195 435 C 1255 448, 1290 440, 1300 420 C 1308 405, 1295 385, 1270 375" stroke-width="3.8" />
  </g>
</svg>
`;

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Render SVG to PNG
  await page.setContent(`
    <html>
      <body style="margin:0; background:transparent;">
        ${svgContent}
      </body>
    </html>
  `);

  const svgElement = await page.$('svg');
  const buffer = await svgElement.screenshot({ omitBackground: true });
  fs.writeFileSync('scripts/vector_signature.png', buffer);
  fs.writeFileSync('public/brand/rahul-bathula-signature.svg', svgContent);
  console.log('Saved scripts/vector_signature.png and public/brand/rahul-bathula-signature.svg');

  await browser.close();
}

main().catch(console.error);
