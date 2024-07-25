import { execSync } from 'child_process';
import { Command } from 'commander';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { getPackageInfo } from '../utils/get-package-info.js';

const checkForUpdates = async () => {
  const packageName = 'chaikit';
  const registryUrl = `https://registry.npmjs.org/${packageName}`;

  try {
    const response = await fetch(registryUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch package data');
    }
    const data: any = await response.json();
    return data['dist-tags'].latest;
  } catch (error) {
    console.error(chalk.red('An error occurred while checking for updates:'), (error as Error).message);
    return null;
  }
};

const packageInfo = await getPackageInfo();

const update = new Command('update')
  .description('Check for updates and install if available')
  .option('-p, --package-manager <manager>', 'Specify the package manager (npm, yarn, pnpm, bun)', 'npm')
  .action(async (options) => {
    const validPackageManagers = ['npm', 'yarn', 'pnpm', 'bun'];
    const packageManager = options.packageManager;

    if (!validPackageManagers.includes(packageManager)) {
      console.error(chalk.red('Invalid package manager specified. Please use npm, yarn, pnpm, or bun.'));
      return;
    }

    const currentVersion = packageInfo.version;
    const latestVersion = await checkForUpdates();

    if (!latestVersion) {
      console.log(chalk.red('Unable to determine the latest version.'));
      return;
    }

    if (currentVersion === latestVersion) {
      console.log(chalk.green(`You are already using the latest version (${currentVersion}).`));
    } else {
      console.log(chalk.yellow(`A new version (${latestVersion}) is available. Updating...`));

      const installCommands: { [key: string]: string } = {
        npm: 'npm install -g chaikit',
        yarn: 'yarn global add chaikit',
        pnpm: 'pnpm add -g chaikit',
        bun: 'bun add -g chaikit',
      };

      const installCommand = installCommands[packageManager];
      
      if (installCommand) {
        try {
          execSync(installCommand, { stdio: 'inherit' });
          console.log(chalk.green('Update successful!'));
        } catch (error) {
          console.error(chalk.red('An error occurred while updating:'), (error as Error).message);
        }
      } else {
        console.error(chalk.red('Invalid package manager specified. Please use npm, yarn, pnpm, or bun.'));
      }
    }
  });

export default update;
