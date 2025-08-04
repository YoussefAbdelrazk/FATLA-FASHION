import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = cookies().get('token')?.value;
  const isAuthenticated = !!token;

  if (!isAuthenticated && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthenticated && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
