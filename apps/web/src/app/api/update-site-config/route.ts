import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { filePath, data } = await request.json();

  if (!filePath || !data) {
    return NextResponse.json({ error: 'File path and data are required' }, { status: 400 });
  }

  try {
    const absolutePath = path.resolve(filePath);
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'File updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
