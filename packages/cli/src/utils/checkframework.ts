import fs from 'fs';
import path from 'path';

export type Framework = 'nextjs' | 'react' | 'astro' | 'unknown';

export function checkFramework(): Framework {
  if (fs.existsSync('next.config.js') || fs.existsSync('next.config.mjs')) {
    return 'nextjs';
  } else if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.dependencies.react || packageJson.devDependencies.react) {
      return 'react';
    }
    if (packageJson.dependencies.astro || packageJson.devDependencies.astro) {
      return 'astro';
    }
  }
  return 'unknown';
}
