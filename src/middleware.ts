import { getToken } from '@/lib/Cookie';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = getToken();
  const isAuthenticated = !!token;

  if (
    !isAuthenticated &&
    !req.nextUrl.pathname.startsWith('/login') &&
    !req.nextUrl.pathname.startsWith('/request-otp') &&
    !req.nextUrl.pathname.startsWith('/verify-otp') &&
    !req.nextUrl.pathname.startsWith('/reset-password')
  ) {
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
