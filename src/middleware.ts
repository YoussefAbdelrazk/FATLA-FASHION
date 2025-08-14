import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authRoutes = ['/login', '/forgot-password'];
  const { pathname } = request.nextUrl;

  // Get token from cookies in the request context
  const token = request.cookies.get('token')?.value;

  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!authRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
