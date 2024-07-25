import { execSync } from "child_process";
import fetch from "node-fetch";
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { checkFramework, Framework } from "../utils/checkframework.js";
import { createAndWriteFiles } from "../utils/fileUtils.js";

interface Component {
  name: string;
  dependencies: string[];
  devDependencies: string[];
  files: {
    name: string;
    content: string;
  }[];
  types: string[];
}

const baseUrl = process.env.REGISTRY_URL ?? "https://chaikit.xyz/__registry__/components/index.json";

// Function to get the list of all components from the index
async function getAllComponents(): Promise<string[]> {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch component index");
  }
  try {
    const data = await response.json();
    return data as string[];
  } catch (error) {
    throw new Error("Invalid JSON response");
  }
}

// Function to get specific component data from the registry
async function getComponentData(componentName: string): Promise<Component> {
  const url = `${baseUrl.replace('index.json', '')}${componentName}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch component data");
  }
  try {
    const data = await response.json();
    return data as Component;
  } catch (error) {
    throw new Error("Invalid JSON response");
  }
}

function installDependencies(dependencies: string[], packageManager: string) {
  const command = {
    npm: `npm install ${dependencies.join(" ")}`,
    pnpm: `pnpm install ${dependencies.join(" ")}`,
    yarn: `yarn add ${dependencies.join(" ")}`,
    bun: `bun add ${dependencies.join(" ")}`,
  }[packageManager];

  if (!command) {
    console.log(chalk.red("Invalid package manager"));
    return;
  }

  console.log(chalk.yellow(`Running "${command}"...`));
  execSync(command, { stdio: "inherit" });
}

async function promptForPackageManager() {
  const { packageManager } = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager do you want to use?",
      choices: [
        { name: "npm", value: "npm" },
        { name: "pnpm", value: "pnpm" },
        { name: "yarn", value: "yarn" },
        { name: "bun", value: "bun" },
      ],
    },
  ]);
  return packageManager;
}

const pour = new Command("pour")
  .description("List and download components")
  .argument("[name]", "Name of the component to download")
  .action(async (name) => {
    try {
      const framework = checkFramework();
      if (framework === "unknown") {
        console.log(chalk.red("Chai could not determine the framework. Please update the component path when it's installed."));
      }

      const allComponents = await getAllComponents();

      if (!name) {
        console.log(chalk.yellow("Available components:"));
        const componentChoices = allComponents.map((componentName) => ({
          name: componentName,
          value: componentName,
        }));
        const { selectedComponents } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "selectedComponents",
            message: "Select components to download:",
            choices: componentChoices,
          },
        ]);
        name = selectedComponents;
      }

      const componentList = Array.isArray(name) ? name : [name];

      for (const componentName of componentList) {
        if (!allComponents.includes(componentName)) {
          console.log(chalk.red(`Component with name "${componentName}" not found.`));
          continue;
        }

        try {
          const component = await getComponentData(componentName);

          if (!component.types || !component.types.includes(framework)) {
            console.log(chalk.yellow(`Component "${componentName}" may not be compatible with your ${framework} project.`));
            const { proceed } = await inquirer.prompt([
              {
                type: "confirm",
                name: "proceed",
                message: "Do you want to proceed anyway?",
                default: false,
              },
            ]);

            if (!proceed) {
              continue;
            }
          }

          const { targetDir } = await inquirer.prompt([
            {
              type: "input",
              name: "targetDir",
              message: "Enter the target directory (use '.' for current directory):",
              default: framework === "nextjs" ? (fs.existsSync("src") ? "src/components/chai" : "components/chai") : "components/chai",
            },
          ]);

          createAndWriteFiles(targetDir, component.files);

          const { installDeps } = await inquirer.prompt([
            {
              type: "confirm",
              name: "installDeps",
              message: "Do you want to install dependencies?",
              default: false,
            },
          ]);

          if (installDeps) {
            const packageManager = await promptForPackageManager();
            if (component.dependencies.length > 0) {
              installDependencies(component.dependencies, packageManager);
            }
            if (component.devDependencies.length > 0) {
              installDependencies(component.devDependencies, packageManager);
            }
          }

          console.log(chalk.green(`Component "${componentName}" added! Chai served!`));
        } catch (error) {
          console.log(chalk.red(`An error occurred while processing component "${componentName}":`), (error as Error).message);
        }
      }
    } catch (error) {
      console.error(chalk.red("An error occurred:"), (error as Error).message);
    }
  });

export default pour;
