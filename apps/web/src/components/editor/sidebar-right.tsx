import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface SidebarRightProps {
    url: string;
}

const fetchData = async (url: string): Promise<any> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const renderAccordionItems = (json: any, path: string = ''): React.ReactNode => {
    return Object.entries(json).map(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            return (
                <Accordion type="multiple" key={currentPath}>
                    <AccordionItem value={currentPath}>
                        <AccordionTrigger>{key}</AccordionTrigger>
                        <AccordionContent>
                            {renderAccordionItems(value, currentPath)}
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
                    <Input id={currentPath} name={currentPath} defaultValue={String(value)} />
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

    return (
      <div className="no-scrollbar bg-black rounded-md m-2 flex w-80 flex-none flex-col items-start self-stretch h-full overflow-y-auto">
            <div className="p-2 flex w-full h-screen flex-col">
                {data ? (
                    <Accordion type="single" collapsible>
                        {renderAccordionItems(data)}
                    </Accordion>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}

export default SidebarRight;
