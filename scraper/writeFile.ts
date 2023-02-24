import fs from "fs";
import path from "path";

const buildDir = path.join(__dirname, "/build");

export const writeJSON = (name: string, json: object) => {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  fs.writeFileSync(
    path.join(buildDir, `${name}.json`),
    JSON.stringify(json, null, 2),
    "utf-8"
  );
};
