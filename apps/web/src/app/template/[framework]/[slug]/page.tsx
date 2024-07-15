"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Template as TTemplate } from '@/types/template';
import templatesData from '@/registry/template.json';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CopyNpmCommandButton } from '@/components/copy-button';

const TemplatePage = () => {
  const pathname = usePathname();
  const [template, setTemplate] = useState<TTemplate | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/').filter(Boolean);
      const framework = pathSegments[1];
      const slug = pathSegments[2];

      const foundTemplate = templatesData.find(
        (t) => t.framework?.toLowerCase() === framework?.toLowerCase() && t.slug === slug
      );

      if (foundTemplate) {
        setTemplate(foundTemplate);
        const repoUrl = new URL(foundTemplate.readmeLink);
        const [owner, repo] = repoUrl.pathname.split('/').slice(1, 3);
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/README.md`;

        fetch(`/api/template/readme?apiUrl=${encodeURIComponent(apiUrl)}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => setReadmeContent(data.readmeContent))
          .catch((error) => {
            console.error('Error fetching README:', error);
            setError('Failed to load README content.');
          });
      } else {
        setError('Template not found.');
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
    __npmCommand__: `npx chai sip ${template.slug}`,
    __pnpmCommand__: `pnpm dlx chai sip ${template.slug}`,
    __yarnCommand__: `yarn dlx chai sip ${template.slug}`,
    __bunCommand__: `bun x chai sip ${template.slug}`
  };
  
  return (
    <div className="flex flex-col items-center py-10 container">
      <div className="grid grid-cols-8">
        <div className="px-8 py-8 sticky col-span-3 top-16 self-start">
          <Link href='/template' className='text-secondary hover:text-primary flex items-center gap-1'>
            <ArrowLeft className='h-4 w-4' /> Back to Templates
          </Link>
          <h1 className="text-6xl font-bold my-4 mb-6">{template.templateName}</h1>
          <p className="my-4">{template.templateDescription}</p>
          <div className="mb-4">
            <div><strong>Framework</strong>: {template.framework}</div>
            <div><strong>Use Case</strong>: {template.usecase.join(', ')}</div>
            <div><strong>CSS</strong>: {template.css}</div>
          </div>
          <div>
            <button className="w-full mb-2 py-2 bg-white text-gray-900 font-semibold rounded">Deploy</button>
            <button className="w-full py-2 bg-white text-gray-900 font-semibold rounded">View Demo</button>
            <div className="relative">
              <pre className='mb-4 mt-6 px-4 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900 flex justify-between items-center'>
                <code>npx chai sip {template.slug}</code>
                <CopyNpmCommandButton commands={npmCommands} className="ml-4" />
              </pre>
            </div>

          </div>
        </div>
        <div className="px-8 py-8 col-span-5 overflow-auto border-l border-solid">
          <div>
            <Image
              src={template.imageUrl}
              alt={template.templateName}
              width={300}
              height={300}
            />
          </div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => <h1 className='text-4xl font-bold py-5'>{props.children}</h1>,
              h2: ({ ...props }) => <h2 className='text-2xl font-bold py-5'>{props.children}</h2>,
              ul: ({ ...props }) => <ul className='list-disc list-inside pb-5 pl-2'>{props.children}</ul>,
              li: ({ ...props }) => <li className='mb-2'>{props.children}</li>,
              p: ({ ...props }) => <p className='block'>{props.children}</p>,
              a: ({ ...props }) => (
                <a
                  className='text-sky-500 underline'
                  href={props.href}
                  target='_blank'
                  rel='noreferrer'
                >
                  {props.children}
                </a>
              ),
              table: ({ ...props }) => (
                <table className='w-full text-left border-collapse my-6'>{props.children}</table>
              ),
              thead: ({ ...props }) => (
                <thead>{props.children}</thead>
              ),
              th: ({ ...props }) => (
                <th className='p-2'>{props.children}</th>
              ),
              tbody: ({ ...props }) => (
                <tbody>{props.children}</tbody>
              ),
              tr: ({ ...props }) => (
                <tr>{props.children}</tr>
              ),
              td: ({ ...props }) => (
                <td className='p-2'>{props.children}</td>
              ),
              pre: ({ ...props }) => (
                <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-6'>{props.children}</pre>
              ),
              code: ({ ...props }) => (
                <code className='  p-1 rounded'>{props.children}</code>
              ),
            }}
          >
            {readmeContent}
          </ReactMarkdown>
        </div>
      </div>
      {/* <div className="w-full max-w-6xl mt-10">
        <h2 className="text-xl font-bold mb-4">Related Templates</h2>
        <div className="flex space-x-4">
          related
        </div>
      </div> */}
    </div>
  );
};

export default TemplatePage;
