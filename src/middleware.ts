import { NextRequest, NextResponse } from 'next/server';

import { getServerToken } from './lib/ServerCookie';

export default function middleware(request: NextRequest) {
  const token = getServerToken();
  // const refreshToken = getServerRefreshToken();
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    isLoggedIn &&
    (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/forgot-password')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
