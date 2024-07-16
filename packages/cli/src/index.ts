#!/usr/bin/env node
import { Command } from "commander";

import { getPackageInfo } from "./utils/get-package-info.js";
import sip from "./commands/sip.js";
import update from "./commands/update.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name("chaikit")
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
  program.addCommand(sip);
  program.addCommand(update);
  program.parse();
}

main();
