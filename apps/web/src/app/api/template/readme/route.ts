import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiUrl = searchParams.get('apiUrl');

  if (!apiUrl) {
    return NextResponse.json({ error: 'Missing apiUrl parameter' }, { status: 400 });
  }

  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch README content' }, { status: 500 });
  }

  const readmeContent = await response.text();

  return NextResponse.json({ readmeContent });
}
