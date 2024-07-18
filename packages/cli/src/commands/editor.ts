import { exec } from 'child_process';
import fetch from 'node-fetch';
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';

const editor = new Command('editor')
  .description('Run the project in the specified folder or current directory')
  .argument('[folder]', 'Folder path')
  .action(async (folder = '.') => {
    const targetDir = path.resolve(folder);
    const chaiConfigPath = path.join(targetDir, 'chai.json');

    if (!fs.existsSync(chaiConfigPath)) {
      console.error(`chai.json not found in ${targetDir}`);
      process.exit(1);
    }

    const chaiConfig = fs.readJSONSync(chaiConfigPath);
    const { run, url, siteConfig } = chaiConfig;

    if (!targetDir || !url || !siteConfig) {
        const missingFields = [];
        if (!targetDir) missingFields.push('slug');
        if (!url) missingFields.push('deploymentUrl');
        if (!siteConfig) missingFields.push('siteConfig');
        console.error(`Missing required configuration: ${missingFields.join(', ')}.`);
        process.exit(1);
      }
      

    console.log(`Running dev server: ${run}`);

    const devServer = exec(run, { cwd: targetDir });

    devServer.stdout?.on('data', (data) => {
      console.log(data.toString());
    });

    devServer.stderr?.on('data', (data) => {
      console.error(data.toString());
    });

    let key: string | null = null;

    // Wait a bit to let the dev server start
    setTimeout(async () => {
      try {
        const keyResponse = await fetch('http://localhost:3000/api/generate-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: targetDir, deploymentUrl: url, siteConfig: siteConfig })
        });

        const responseData = await keyResponse.json() as { key: string };
        if (responseData.key) {
          key = responseData.key;
          console.log(`Editor available at: http://localhost:3000/editor/${key}`);
        } else {
          console.error('No key returned from generate-key API');
          process.exit(1);
        }
      } catch (error) {
        console.error('Error generating key:', error);
        process.exit(1);
      }
    }, 10000); // timeout as necessary to ensure the server is up

    const cleanup = async () => {
      if (key) {
        try {
          await fetch(`http://localhost:3000/api/delete-key?key=${key}`, {
            method: 'GET'
          });
          console.log(`Key ${key} deleted`);
        } catch (error) {
          console.error('Error deleting key:', error);
        }
      }
      // Wait a bit to ensure the fetch request completes
      setTimeout(() => {
        process.exit();
      }, 1000);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  });

export default editor;
