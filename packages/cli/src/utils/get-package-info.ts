import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from 'url';
import { type PackageJson } from "type-fest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function getPackageInfo() {
  const packageJsonPath = path.join(__dirname, "../package.json");
  return fs.readJSONSync(packageJsonPath) as PackageJson;
}
