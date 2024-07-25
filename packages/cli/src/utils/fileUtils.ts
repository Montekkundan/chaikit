import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

interface File {
  name: string;
  content: string;
}

export function createAndWriteFiles(targetDir: string, files: File[]) {
  if (targetDir === ".") {
    targetDir = process.cwd();
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const file of files) {
    const filePath = path.join(targetDir, file.name);
    fs.writeFileSync(filePath, file.content, "utf8");
    console.log(chalk.green(`Downloaded ${filePath}`));
  }
}
