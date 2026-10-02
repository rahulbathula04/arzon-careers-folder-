import fs from "node:fs";

const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const packages = lock.packages ?? {};

const forbidden = new Map([
  ["@tanstack/react-start", ["1.168.42"]],
  ["@tanstack/start-server-core", ["1.169.25"]],
]);

const failures = [];
for (const [name, versions] of forbidden) {
  const actual = packages[`node_modules/${name}`]?.version;
  if (actual && versions.includes(actual)) failures.push(`${name}@${actual}`);
}

if (failures.length) {
  console.error("Blocked vulnerable TanStack Start dependency: " + failures.join(", "));
  process.exit(1);
}

console.log("TanStack Start dependency guard: PASS");
