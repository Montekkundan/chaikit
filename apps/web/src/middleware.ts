import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/docs') {
    return NextResponse.redirect(new URL('/docs/introduction', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/docs',
};
