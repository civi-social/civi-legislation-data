import fs from "fs";
import path from "path";

export const legislationDistFolder = path.join(
  __dirname,
  "../",
  "dist_legislation"
);

export const writeJSON = (name: string, json: object) => {
  if (!fs.existsSync(legislationDistFolder)) {
    fs.mkdirSync(legislationDistFolder);
  }
  fs.writeFileSync(
    path.join(legislationDistFolder, `${name}.json`),
    JSON.stringify(json, null, 2),
    "utf-8"
  );
};
