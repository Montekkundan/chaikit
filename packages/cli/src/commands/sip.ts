import { execSync } from 'child_process';
import fetch from 'node-fetch';
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { Templates } from '../types.js';

const baseUrl = process.env.REGISTRY_URL ?? 'https://chaikit.xyz/__registry__/template.json';

// Function to get template data from the registry
async function getTemplateData() {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch template data');
  }
  return response.json();
}

function installDependencies(packageManager: string) {
  const command = {
    npm: 'npm install',
    pnpm: 'pnpm install',
    yarn: 'yarn install',
    bun: 'bun install',
  }[packageManager];

  if (!command) {
    console.log(chalk.red('Invalid package manager'));
    return;
  }

  console.log(chalk.yellow(`Running "${command}"...`));
  execSync(command, { stdio: 'inherit' });
}

function removeGitFolder(folderPath: string) {
  const gitPath = path.join(folderPath, '.git');
  if (fs.existsSync(gitPath)) {
    fs.removeSync(gitPath);
  }
}

const sip = new Command('sip')
  .description('Clone a template and optionally install dependencies')
  .argument('[slug]', 'Slug of the template')
  .option('-a, --author', 'Show author details')
  .option('-r, --readme', 'Show README link')
  .option('-p, --preview', 'Show preview link')
  .option('-u, --usecase', 'Show use case')
  .option('--css', 'Show CSS framework')
  .option('--database', 'Show database')
  .option('--auth', 'Show authentication method')
  .option('--cms', 'Show CMS')
  .option('--framework', 'Show framework')
  .option('-l, --list', 'List all templates')
  .option('--filter <filter>', 'Filter templates by a specific field')
  .option('--value <value>', 'Value to filter by')
  .action(async (slug, options) => {
    try {
      const templates = await getTemplateData() as Templates;

      if (options.list) {
        const filterOptions = {
          author: 'author',
          usecase: 'usecase',
          css: 'css',
          database: 'database',
          auth: 'authentication',
          cms: 'cms',
          framework: 'framework',
        };

        if (options.filter && options.value) {
          const filteredTemplates = Object.entries(templates).filter(
            ([slug, template]) => {
              const key = filterOptions[
                options.filter as keyof typeof filterOptions
              ] as keyof typeof template;
              if (Array.isArray(template[key])) {
                return (template[key] as unknown as string[]).includes(
                  options.value
                );
              }
              return template[key] === options.value;
            }
          );

          console.log(chalk.yellow(
            `Filtered templates by ${options.filter}=${options.value}:`
          ));
          filteredTemplates.forEach(([slug, template]) => {
            console.log(chalk.green(`- ${slug}: ${template.templateName}`));
          });
        } else {
          console.log(chalk.yellow('All templates:'));
          Object.entries(templates).forEach(([slug, template]) => {
            console.log(chalk.green(`- ${slug}: ${template.templateName}`));
          });
        }
        return;
      }

      if (!slug) {
        console.log(chalk.red('Please provide a slug or use the --list option to list all templates.'));
        return;
      }
      const template = templates[slug];

      if (!template) {
        console.log(chalk.red(`Template with slug "${slug}" not found.`));
        return;
      }

      const detailOptions = {
        author: 'author',
        readme: 'readmeLink',
        preview: 'previewUrl',
        usecase: 'usecase',
        css: 'css',
        database: 'database',
        auth: 'authentication',
        cms: 'cms',
        framework: 'framework',
      };

      let detailsDisplayed = false;

      for (const [option, key] of Object.entries(detailOptions)) {
        if (options[option]) {
          console.log(chalk.yellow(
            `${key}: ${template[key as keyof typeof template] || 'none'}`
          ));
          detailsDisplayed = true;
        }
      }

      if (detailsDisplayed) {
        return;
      }

      let targetDir = slug;
      while (fs.existsSync(targetDir)) {
        const { newFolderName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'newFolderName',
            message: `The folder "${targetDir}" already exists. Please provide a new folder name:`,
            default: `${targetDir}-copy`,
          },
        ]);
        targetDir = newFolderName;
      }

      const targetDirPath = path.resolve(targetDir);

      console.log(chalk.yellow(`Cloning repository from ${template.githubUrl}...`));
      execSync(`git clone ${template.githubUrl} ${targetDir}`, { stdio: 'inherit' });

      // Remove the .git folder, but keep .gitignore file
      removeGitFolder(targetDir);

      // Ask to install dependencies
      const { installDeps } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'installDeps',
          message: 'Do you want to install dependencies?',
          default: false,
        },
      ]);

      if (installDeps) {
        const { packageManager } = await inquirer.prompt([
          {
            type: 'list',
            name: 'packageManager',
            message: 'Which package manager do you want to use?',
            choices: [
              { name: 'npm', value: 'npm' },
              { name: 'pnpm', value: 'pnpm' },
              { name: 'yarn', value: 'yarn' },
              { name: 'bun', value: 'bun' },
            ],
          },
        ]);
      
        process.chdir(targetDirPath);
        installDependencies(packageManager);
      }

      console.log(chalk.green(`Chai served! Go to your project with cd ${targetDir}`));

    } catch (error) {
      console.error(chalk.red('An error occurred:'), (error as Error).message);
    }
  });

export default sip;
