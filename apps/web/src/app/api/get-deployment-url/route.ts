import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Key is required' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT deployment_url, slug AS dir, siteconfig FROM Keys WHERE key = ${key};
    `;

    if (result.rows.length > 0) {
      const {
        deployment_url: deploymentUrl,
        dir,
        siteconfig: siteConfig,
      } = result.rows[0] as {
        deployment_url: string;
        dir: string;
        siteconfig: string;
      };
      return NextResponse.json(
        { deploymentUrl, dir, siteConfig: siteConfig },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: 'Key not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
