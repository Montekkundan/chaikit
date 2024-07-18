import { sql, QueryResult } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const { slug, deploymentUrl, siteConfig } = await request.json();
  const key = uuidv4();

  console.log('Received data:', { slug, deploymentUrl, siteConfig });

  try {
    const result: QueryResult<{ key: string }> = await sql`
      INSERT INTO Keys (slug, key, deployment_url, siteconfig) VALUES (${slug}, ${key}, ${deploymentUrl}, ${siteConfig})
      RETURNING key;
    `;

    console.log('Insert result:', result);

    const returnedKey = result.rows?.[0]?.key;

    if (returnedKey) {
      console.log('Returned key:', returnedKey);
      return NextResponse.json({ key: returnedKey }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No key returned from database' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error inserting key:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
