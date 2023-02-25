import fs from "fs";
import path from "path";
import { legislationDistFolder } from "./config";

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
