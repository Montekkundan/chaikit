import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mt-32 flex flex-col items-center">
      <h1 className="text-4xl dark:text-white">404</h1>
      <p className="text-lg text-stone-500 dark:text-stone-400">Not found</p>
      <Button href="/docs/introduction" className="mt-4">Back to Docs</Button>
    </div>
  );
}
