// @ts-nocheck
// TODO: Fix this file later
"use client";
import { useState, useEffect } from 'react';
import EmptyState from '@/components/template/empty-state';
import Template from '@/components/template/template';
import TemplateSkeleton from '@/components/template/template-skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Template as TTemplate } from '@/types/template';
import templatesData from '@/registry/template.json';

const useCaseFilters = ["AI", "Portfolio", "Blog", "Ecommerce"];
const frameworkFilters = ["React", "Vue", "Angular", "Svelte"];
const cssFilters = ["CSS","Tailwind", "Bootstrap", "Material-UI", "Bulma"];
const databaseFilters = ["MongoDB", "PostgreSQL", "MySQL", "SQLite"];
const cmsFilters = ["Sanity", "Contentful", "Strapi", "WordPress"];
const authenticationFilters = ["Auth0", "Firebase", "JWT", "OAuth"];
const analyticsFilters = ["Google Analytics", "Mixpanel", "Segment", "Amplitude"];

export default function Home() {
  const [templates, setTemplates] = useState<TTemplate[]>(templatesData);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [checkedState, setCheckedState] = useState<{ [key: string]: { [key: string]: boolean } }>({});

  useEffect(() => {
    const initialCheckedState: { [key: string]: { [key: string]: boolean } } = {
      usecase: Object.fromEntries(useCaseFilters.map(filter => [filter, false])),
      framework: Object.fromEntries(frameworkFilters.map(filter => [filter, false])),
      css: Object.fromEntries(cssFilters.map(filter => [filter, false])),
      database: Object.fromEntries(databaseFilters.map(filter => [filter, false])),
      cms: Object.fromEntries(cmsFilters.map(filter => [filter, false])),
      authentication: Object.fromEntries(authenticationFilters.map(filter => [filter, false])),
      analytics: Object.fromEntries(analyticsFilters.map(filter => [filter, false])),
    };
    setCheckedState(initialCheckedState);
  }, []);

  useEffect(() => {
    const fetchTemplates = () => {
      const hasActiveFilters = Object.values(filters).some(values => values.length > 0);
      const filteredTemplates = templatesData.filter(template => {
        if (!hasActiveFilters) return true; 
  
        return Object.entries(filters).every(([category, values]) => {
          if (values.length === 0) return true;
          const templateValue = template[category as keyof TTemplate];
          if (!templateValue) return false;
  
          if (Array.isArray(templateValue)) {
            return values.some(filter => templateValue.includes(filter));
          }
          return values.includes(templateValue.toString());
        });
      });
  
      setTemplates(filteredTemplates);
    };
  
    fetchTemplates();
  }, [filters]);
  

  const handleCheckboxChange = (category: string, value: string) => {
    setCheckedState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category]?.[value]
      }
    }));

    setFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[category]) {
        newFilters[category] = [];
      }

      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }

      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }
      return newFilters;
    });
  };

  const renderCheckboxes = (category: string, values: string[]) => (
    <ul className='space-y-4'>
      {values.map((value, valueIdx) => (
        <li key={value} className='flex items-center'>
          <input
            type='checkbox'
            id={`checkbox-${category}-${valueIdx}`}
            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
            checked={checkedState[category]?.[value] || false}
            onChange={() => handleCheckboxChange(category, value)}
          />
          <label
            htmlFor={`checkbox-${category}-${valueIdx}`}
            className='ml-3 text-sm text-gray-600'>
            {value}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='flex items-baseline justify-between pb-6 pt-24'>
        <h1 className='text-4xl font-bold tracking-tight'>
          Find your Template
        </h1>
      </div>

      <section className='pb-24 pt-6'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
          {/* Filters */}
          <div className='hidden lg:block'>
            <Accordion type='multiple' className='animate-none'>
              <AccordionItem value='usecase'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium'>Use Case</span>
                </AccordionTrigger>
                <AccordionContent className='pt-6 animate-none'>
                  {renderCheckboxes('usecase', useCaseFilters)}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='framework'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium'>Framework</span>
                </AccordionTrigger>
                <AccordionContent className='pt-6 animate-none'>
                  {renderCheckboxes('framework', frameworkFilters)}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='css'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium'>CSS</span>
                </AccordionTrigger>
                <AccordionContent className='pt-6 animate-none'>
                  {renderCheckboxes('css', cssFilters)}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='database'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium'>Database</span>
                </AccordionTrigger>
                <AccordionContent className='pt-6 animate-none'>
                  {renderCheckboxes('database', databaseFilters)}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='cms'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium'>CMS</span>
                </AccordionTrigger>
                <AccordionContent className='pt-6 animate-none'>
                  {renderCheckboxes('cms', cmsFilters)}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='authentication'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium'>Authentication</span>
                </AccordionTrigger>
                <AccordionContent className='pt-6 animate-none'>
                  {renderCheckboxes('authentication', authenticationFilters)}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='analytics'>
                <AccordionTrigger className='py-3 text-sm text-gray-400 hover:text-gray-500'>
                  <span className='font-medium'>Analytics</span>
                </AccordionTrigger>
                <AccordionContent className='pt-6 animate-none'>
                  {renderCheckboxes('analytics', analyticsFilters)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Template grid */}
          <ul className='lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {templates && templates.length === 0 ? (
              <EmptyState />
            ) : templates ? (
              templates.map((template) => <Template key={template.id} template={template} />)
            ) : (
              new Array(12).fill(null).map((_, i) => <TemplateSkeleton key={i} />)
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
