import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative flex flex-col h-screen">
      <div className="z-20 gap-x-2 absolute inset-x-0 top-1/6 flex flex-row justify-center items-center">
          <Button href="/template" className="px-2 md:px-8 py-2 rounded-full relative hover:bg-slate-700 bg-slate-700 text-white text-sm hover:shadow-xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            Templates
          </Button>
          <Button href="/components" className="px-2 md:px-8 py-2 rounded-full relative hover:bg-slate-700 bg-slate-700 text-white text-sm hover:shadow-xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            Components
          </Button>
          <Button href="/pages" className="px-2 md:px-8 py-2 rounded-full relative hover:bg-slate-700 bg-slate-700 text-white text-sm hover:shadow-xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            Pages
          </Button>
        {/*  buttons  */}
      </div>
      <div className="absolute mt-4 inset-x-0 top-1/5 flex flex-col items-center">
        <pre className="px-4 gap-x-2 py-2 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 dark:bg-zinc-900 flex justify-between items-center">
          <code>npx chaikit sip -l</code>
          <CopyButton value="npx chaikit sip -l" className="ml-4" />
        </pre>
        {/*  buttons  */}
      </div>

      <div className="flex-grow overflow-hidden">
        <Scene />
      </div>
    </main>
  );
}
