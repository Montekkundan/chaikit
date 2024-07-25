import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

interface FileContent {
  name: string;
  content: string;
}

export function createAndWriteFiles(targetDir: string, files: FileContent[], assetsDir: string) {
  if (targetDir === ".") {
    targetDir = process.cwd();
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  for (const file of files) {
    const ext = path.extname(file.name).toLowerCase();
    const isBinary = ['.glb', '.jpg', '.jpeg', '.png'].includes(ext);
    const filePath = isBinary ? path.join(assetsDir, file.name) : path.join(targetDir, file.name);

    if (isBinary) {
      const fileBuffer = Buffer.from(file.content, 'base64');
      fs.writeFileSync(filePath, fileBuffer);
    } else {
      fs.writeFileSync(filePath, file.content, "utf8");
    }

    console.log(chalk.green(`Downloaded ${filePath}`));
  }
}
