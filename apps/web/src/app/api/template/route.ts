import { NextRequest, NextResponse } from 'next/server';
import templatesData from '@/registry/template.json';
import { Template } from '@/types/template';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const filters: { [key: string]: string[] } = {};

    searchParams.forEach((value, key) => {
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key]?.push(value);
    });

    let filteredTemplates: Template[] = templatesData;

    Object.keys(filters).forEach(key => {
      filteredTemplates = filteredTemplates.filter(template =>
        filters[key]?.includes((template as any)[key])
      );
    });

    return new NextResponse(JSON.stringify(filteredTemplates), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
