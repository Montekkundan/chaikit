# Contributing

Thanks for your interest in contributing chaikit. Happy to have you here 😊.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@montekkundan](https://x.com/montekkundan).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.
- We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```
apps
└── web
    └──src
        ├── app
        ├── components
        └── registry
            └── template.json
packages
└── cli
```

| Path                  | Description                              |
| --------------------- | ---------------------------------------- |
| `apps/web/src/app`        | The Next.js application for the website. |
| `apps/web/src/components` | The React components for the website.    |
| `apps/web/src/registry`   | The registry for the teamplates.         |
| `packages/cli`        | The `chaikit` package.                 |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

work in progress 🚧 ...