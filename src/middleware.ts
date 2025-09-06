import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authRoutes = ['/login', '/forgot-password'];
  const { pathname } = request.nextUrl;

  // Get token from cookies in the request context
  const token = request.cookies.get('token')?.value;

  // If user is on auth routes and has token, redirect to dashboard
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is on protected routes (not auth routes) and has no token, redirect to login
  if (!authRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is on root path and has token, allow access to dashboard
  if (pathname === '/' && token) {
    return NextResponse.next();
  }

  // If user is on root path and has no token, redirect to login
  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
