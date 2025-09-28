import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

  const authRoutes = ['/login', '/forgot-password'];
  const publicRoutes = ['/',...authRoutes];
  const { pathname } = request.nextUrl;

  // Get token from cookies in the request context
  const token = request.cookies.get('token')?.value;

  if(!publicRoutes.includes(pathname) ) {

    if(token) return NextResponse.next()

      const redirectUrl = new URL('/login', request.nextUrl.origin)
      redirectUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(redirectUrl)
  }

  if(authRoutes.includes(pathname) ) {
    if(!token) return NextResponse.next()

      const redirectUrl = new URL('/', request.nextUrl.origin)
      return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()

}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
