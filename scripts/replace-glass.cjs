const fs = require("fs");
const path = require("path");

const TARGET_DIR = path.join(__dirname, "../src/components/career");

const SEARCH_PATTERN =
  /border border-white\/10 bg-\[#0a0c10\]\/40 backdrop-blur-md shadow-xl ring-1 ring-black\/20/g;
const REPLACEMENT = "glass-panel-deep";

const SEARCH_PATTERN_2 = /bg-\[#0a0c10\]/g;
const REPLACEMENT_2 = "bg-surface-dim";

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      let content = fs.readFileSync(fullPath, "utf8");
      let changed = false;

      if (SEARCH_PATTERN.test(content)) {
        content = content.replace(SEARCH_PATTERN, REPLACEMENT);
        changed = true;
      }

      if (SEARCH_PATTERN_2.test(content)) {
        content = content.replace(SEARCH_PATTERN_2, REPLACEMENT_2);
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(TARGET_DIR);
console.log("Done replacing hardcoded glass styles.");
