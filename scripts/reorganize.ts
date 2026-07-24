import { Project } from "ts-morph";
import * as path from "node:path";
import * as fs from "node:fs";

console.log("Initializing ts-morph project...");
const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const componentFeatureMap: Record<string, string> = {
  admin: "admin",
  apply: "applications",
  acri: "careerEngine",
  career: "careerEngine",
  funnel: "careerEngine",
  enrol: "enrolment",
  credibility: "trust",
  proof: "trust",
  industry: "industry",
  landing: "landing",
  recruiters: "recruiters",
  tpos: "tpos",
  track: "curriculum",
  learn: "curriculum",
  courses: "curriculum",
  verify: "trust",
  ui: "core",
  common: "core",
  site: "core",
  transition: "core",
  feedback: "core"
};

const root = process.cwd();

console.log("Moving components...");
for (const [compDir, feature] of Object.entries(componentFeatureMap)) {
  const sourceDirPath = `src/components/${compDir}`;
  const targetDirPath = feature === "core" ? `src/core/components/${compDir}` : `src/features/${feature}/components/${compDir}`;
  
  const directory = project.getDirectory(sourceDirPath);
  if (directory) {
    console.log(` -> ${sourceDirPath} => ${targetDirPath}`);
    const targetAbs = path.resolve(root, targetDirPath);
    fs.mkdirSync(path.dirname(targetAbs), { recursive: true });
    directory.move(targetAbs);
  }
}

console.log("Moving lib files...");
const libDir = project.getDirectory("src/lib");
if (libDir) {
  const libFiles = libDir.getSourceFiles();
  for (const file of libFiles) {
    const baseName = file.getBaseName();
    let targetFeature = "core";
    let targetSubDir = "utils";
    
    const lowerName = baseName.toLowerCase();
    
    if (lowerName.includes("admin") || lowerName.includes("leads") || lowerName.includes("cohort")) targetFeature = "admin";
    else if (lowerName.includes("apply") || lowerName.includes("application")) targetFeature = "applications";
    else if (lowerName.includes("careerengine") || lowerName.includes("acri") || lowerName.includes("prime")) targetFeature = "careerEngine";
    else if (lowerName.includes("enrol") || lowerName.includes("payment") || lowerName.includes("razorpay")) targetFeature = "enrolment";
    else if (lowerName.includes("analytics") || lowerName.includes("metrics") || lowerName.includes("track")) targetFeature = "analytics";
    else if (lowerName.includes("industry")) targetFeature = "industry";
    else if (lowerName.includes("trust") || lowerName.includes("credibility") || lowerName.includes("verification")) targetFeature = "trust";
    else if (lowerName.includes("lesson") || lowerName.includes("learning") || lowerName.includes("curriculum")) targetFeature = "curriculum";
    else if (lowerName.includes("seo") || lowerName.includes("jsonld")) targetFeature = "seo";

    if (baseName.includes(".functions.ts")) {
      targetSubDir = "server";
    }

    const targetPath = targetFeature === "core" 
      ? `src/core/${targetSubDir}/${baseName}` 
      : `src/features/${targetFeature}/${targetSubDir}/${baseName}`;
      
    console.log(` -> ${baseName} => ${targetPath}`);
    const targetAbs = path.resolve(root, targetPath);
    fs.mkdirSync(path.dirname(targetAbs), { recursive: true });
    file.move(targetAbs);
  }
}

console.log("Saving changes to disk... (this will update imports across the project)");
project.saveSync();
console.log("Reorganization complete!");
