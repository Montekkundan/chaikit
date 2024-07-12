"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Template as TTemplate } from '@/types/template';
import templatesData from '@/registry/template.json';

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

        fetch(apiUrl, {
          headers: {
            Accept: 'application/vnd.github.v3.raw',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((text) => setReadmeContent(text))
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

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-full max-w-6xl bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          <div className="w-80 bg-gray-900 p-6 sticky top-0">
            <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
            <p className="mb-4">{template.templateDescription}</p>
            <div className="mb-4">
              <div><strong>Framework</strong>: {template.framework}</div>
              <div><strong>Use Case</strong>: {template.usecase}</div>
              <div><strong>CSS</strong>: {template.css}</div>
            </div>
            <div>
              <button className="w-full mb-2 py-2 bg-white text-gray-900 font-semibold rounded">Deploy</button>
              <button className="w-full py-2 bg-white text-gray-900 font-semibold rounded">View Demo</button>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto h-full">
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl mt-10">
        <h2 className="text-xl font-bold mb-4">Related Templates</h2>
        <div className="flex space-x-4">
          {/* Add related templates here */}
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
