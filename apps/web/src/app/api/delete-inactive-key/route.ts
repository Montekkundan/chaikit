import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inactiveThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours
    await sql`
      DELETE FROM Keys WHERE last_used < ${inactiveThreshold.toISOString()};
    `;
    console.log('Inactive keys deleted');
    return NextResponse.json({ message: 'Inactive keys deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting inactive keys:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
