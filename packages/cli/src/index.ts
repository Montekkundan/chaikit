#!/usr/bin/env node
import { Command } from "commander";

import { getPackageInfo } from "./utils/get-package-info.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name("chai")
    .description("add components and dependencies to your project")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    );
    
  program
    .command("hello")
    .description("Prints 'Hello, world!'")
    .action(() => {
      console.log("Hello, world!");
    });

  program.parse();
}

main();
