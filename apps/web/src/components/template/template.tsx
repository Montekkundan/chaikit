import React from 'react';
import { Template } from '@/types/template';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface TemplateProps {
  template: Template;
}

const TemplateComponent: React.FC<TemplateProps> = ({ template }) => {
  return (
    <Link
     className='flex justify-center bg-black rounded-md'
     href={`/template/${template.framework.toLowerCase()}/${template.slug}`}
     >
      <div className='group relative border border-transparent hover:cursor-pointer rounded-md hover:border-white overflow-hidden max-w-xs'>
        <div className='h-64 overflow-hidden'>
          <Image
            src={template.imageUrl}
            alt='product image'
            className='object-cover object-center'
            width={400}
            height={200}
          />
        </div>
        <div className='p-4 text-white'>
          <h3 className='text-md font-bold'>{template.templateName}</h3>
          <p className='mt-1 text-sm text-gray-400'>
             {template.templateDescription}
          </p>
          <div className='flex justify-between items-center text-gray-600'>
            <p className='mt-2 text-sm font-medium'>by {template.author}</p>
            <ExternalLink className='h-5 w-5 hover:text-gray-200'/>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TemplateComponent;
