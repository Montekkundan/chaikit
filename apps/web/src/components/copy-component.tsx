import React from 'react'
import { CopyNpmCommandButton } from './copy-button';

function CopyComponent({component}: {component: string}) {
    const npmCommands = {
        __npmCommand__: `npx chaikit pour ${component}`,
        __pnpmCommand__: `pnpm dlx chaikit pour ${component}`,
        __yarnCommand__: `yarn dlx chaikit pour ${component}`,
        __bunCommand__: `bun x chaikit pour ${component}`,
      };
    return (
        <pre className="mb-4 mt-2 px-4 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900 flex justify-between items-center">
            <code>npx chaikit pour {component}</code>
            <CopyNpmCommandButton commands={npmCommands} className="ml-4" />
        </pre>
    )
}

export default CopyComponent