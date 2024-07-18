import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

interface SidebarRightProps {
  url: string;
}

const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(`/api/get-site-config?filePath=${encodeURIComponent(url)}`);
  const data = await response.json();
  return JSON.parse(data.content);
};

const updateData = async (filePath: string, data: any): Promise<any> => {
  const response = await fetch('/api/update-site-config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath, data })
  });
  return response.json();
};

const renderAccordionItems = (json: any, path: string, handleChange: (path: string, value: any) => void): React.ReactNode => {
  return Object.entries(json).map(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      return (
        <Accordion type="multiple" key={currentPath}>
          <AccordionItem className='px-4' value={currentPath}>
            <AccordionTrigger>{key}</AccordionTrigger>
            <AccordionContent>
              {renderAccordionItems(value, currentPath, handleChange)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else {
      return (
        <div className="p-2" key={currentPath}>
          <label htmlFor={currentPath} className="block text-sm font-medium text-gray-700">
            {key}
          </label>
          <Input
            id={currentPath}
            name={currentPath}
            defaultValue={String(value)}
            onChange={(e) => handleChange(currentPath, e.target.value)}
          />
        </div>
      );
    }
  });
};

const SidebarRight: React.FC<SidebarRightProps> = ({ url }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (url) {
      fetchData(url).then((jsonData) => setData(jsonData));
    }
  }, [url]);

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    const updatedData = { ...data };
    let current = updatedData;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        current = current[key];
      }
    });

    setData(updatedData);
    updateData(url, updatedData);
  };

  return (
    <div className="no-scrollbar bg-black rounded-md m-2 flex w-80 flex-none flex-col items-start self-stretch h-full overflow-y-auto">      <div className="flex w-full flex-col h-screen ">
        {data ? (
          <Accordion type="single" collapsible>
            {renderAccordionItems(data, '', handleChange)}
          </Accordion>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SidebarRight;
