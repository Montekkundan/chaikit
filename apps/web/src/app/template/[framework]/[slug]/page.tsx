"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Template as TTemplate } from "@/types/template";
import templatesData from "@/registry/template.json";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopyNpmCommandButton } from "@/components/copy-button";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TemplatePage = () => {
  const pathname = usePathname();
  const [template, setTemplate] = useState<TTemplate | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split("/").filter(Boolean);
      const framework = pathSegments[1];
      const slug = pathSegments[2];

      const foundTemplate = templatesData.find(
        (t) =>
          t.framework?.toLowerCase() === framework?.toLowerCase() &&
          t.slug === slug
      );

      if (foundTemplate) {
        setTemplate(foundTemplate);
        const repoUrl = new URL(foundTemplate.readmeLink);
        const [owner, repo] = repoUrl.pathname.split("/").slice(1, 3);
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/README.md`;

        fetch(`/api/template/readme?apiUrl=${encodeURIComponent(apiUrl)}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setReadmeContent(data.readmeContent))
          .catch((error) => {
            console.error("Error fetching README:", error);
            setError("Failed to load README content.");
          });
      } else {
        setError("Template not found.");
      }
    }
  }, [pathname]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!template) {
    return <div>Loading...</div>;
  }
  const npmCommands = {
    __npmCommand__: `npx chaikit sip ${template.slug}`,
    __pnpmCommand__: `pnpm dlx chaikit sip ${template.slug}`,
    __yarnCommand__: `yarn dlx chaikit sip ${template.slug}`,
    __bunCommand__: `bun x chaikit sip ${template.slug}`,
  };

  return (
    <div className="container flex flex-col items-center py-10">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
        <div className="lg:col-span-3 lg:sticky lg:top-16 lg:self-start px-8 py-8">
          {/* Mobile View */}
          <div className="lg:hidden">
            <Link
              href="/template"
              className="text-primary flex items-center gap-1 mb-4"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Templates
            </Link>
            <div className="mb-4 flex justify-center">
              <Carousel>
                <CarouselContent className="h-64">
                  {template.imageCarousel.map((image, index) => (
                    <CarouselItem key={index}>
                      <Image src={image} alt={`Carousel image ${index + 1}`} width={400} height={300} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
          <Link
            href="/template"
            className="hidden text-gray-700 hover:text-primary lg:flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Templates
          </Link>
          <h1 className="text-6xl font-bold mt-8 mb-6">
            {template.templateName}
          </h1>
          <p className="my-4">{template.templateDescription}</p>
          <div className="mb-4">
            {template.framework && (
              <div>
                <strong>Framework</strong>: {template.framework}
              </div>
            )}
            {template.usecase.length > 0 && (
              <div>
                <strong>Use Case</strong>: {template.usecase.join(", ")}
              </div>
            )}
            {template.css && (
              <div>
                <strong>CSS</strong>: {template.css}
              </div>
            )}
            {template.database && (
              <div>
                <strong>Database</strong>: {template.database}
              </div>
            )}
            {template.authentication && (
              <div>
                <strong>Authentication</strong>: {template.authentication}
              </div>
            )}
            {template.cms && (
              <div>
                <strong>CMS</strong>: {template.cms}
              </div>
            )}
          </div>
          <div>
            <div className="w-full flex-col flex justify-between gap-2 mb-4">
              <Button target="_blank" href={template.vercelDeployUrl} className="w-full" variant="outline">
                <Icons.vercel className="h-4 w-4" />
                Deploy
              </Button>
              <Button target="_blank" href={template.previewUrl} className="w-full">
                View Demo
              </Button>
            </div>
            <span>or download</span>
            <div className="relative">
              <pre className="mb-4 mt-2 px-4 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900 flex justify-between items-center">
                <code>npx chaikit sip {template.slug}</code>
                <CopyNpmCommandButton commands={npmCommands} className="ml-4" />
              </pre>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 px-8 py-8 overflow-auto lg:border-l border-solid">
          <div className="hidden lg:flex justify-center">
            <Carousel className="w-1/2">
              <CarouselContent>
                {template.imageCarousel.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image src={image} alt={`Carousel image ${index + 1}`} width={400} height={300} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* <Image
              src={template.imageUrl}
              alt={template.templateName}
              width={300}
              height={300}
            /> */}
          </div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-4xl font-bold py-5">{props.children}</h1>
              ),
              h2: ({ ...props }) => (
                <h2 className="text-2xl font-bold py-5">{props.children}</h2>
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc list-inside pb-5 pl-2">
                  {props.children}
                </ul>
              ),
              li: ({ ...props }) => <li className="mb-2">{props.children}</li>,
              p: ({ ...props }) => <p className="block">{props.children}</p>,
              a: ({ ...props }) => (
                <a
                  className="text-sky-500 underline"
                  href={props.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {props.children}
                </a>
              ),
              table: ({ ...props }) => (
                <table className="w-full text-left border-collapse my-6">
                  {props.children}
                </table>
              ),
              thead: ({ ...props }) => <thead>{props.children}</thead>,
              th: ({ ...props }) => <th className="p-2">{props.children}</th>,
              tbody: ({ ...props }) => <tbody>{props.children}</tbody>,
              tr: ({ ...props }) => <tr>{props.children}</tr>,
              td: ({ ...props }) => <td className="p-2">{props.children}</td>,
              pre: ({ ...props }) => (
                <pre className="bg-bg-muted p-4 rounded-lg overflow-x-auto my-6">
                  {props.children}
                </pre>
              ),
              code: ({ ...props }) => (
                <code className="  p-1 rounded">{props.children}</code>
              ),
            }}
          >
            {readmeContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
