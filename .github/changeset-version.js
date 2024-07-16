// .github/changeset-version.js

const { exec } = require("child_process");

// This script is used by the `release.yml` workflow to update the version of the packages being released.
// The standard step is only to run `changeset version` but this does not update the package-lock.json file.
// So we also run `pnpm install`, which does this update.
// This is a workaround until this is handled automatically by `changeset version`.
// See https://github.com/changesets/changesets/issues/421.

exec("npx changeset version", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running changeset version: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error output: ${stderr}`);
    return;
  }
  console.log(`Changeset version output: ${stdout}`);
  exec("pnpm install", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running pnpm install: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }
    console.log(`pnpm install output: ${stdout}`);
  });
});
