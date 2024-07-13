import dynamic from 'next/dynamic';
import Link from 'next/link';

const Scene = dynamic(() => import('@/components/scene'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative flex flex-col h-screen">
      <div className="absolute inset-x-0 top-1/5 flex flex-col items-center">
        <button className="z-20 px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          <Link href="/template" className="relative">Templates</Link>
        </button>
        {/*  buttons  */}
      </div>

      <div className="flex-grow overflow-hidden">
        <Scene />
      </div>
    </main>
  );
}
