import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS Keys (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) NOT NULL,
        key VARCHAR(255) UNIQUE NOT NULL,
        deployment_url VARCHAR(255) NOT NULL,
        siteconfig VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        last_used TIMESTAMP DEFAULT NOW()
      );
    `;
    return NextResponse.json({ message: 'Table created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
