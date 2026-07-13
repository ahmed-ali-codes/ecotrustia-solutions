import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Throw an error during startup if the JWT_SECRET is not set.
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Redirect to login if trying to access a protected admin page without a token.
  if (pathname !== '/adminx/login' && !token) {
    return NextResponse.redirect(new URL('/adminx/login', req.url));
  }

  // If a token exists, verify it for all admin paths except the login page.
  if (token && pathname !== '/adminx/login') {
    try {
      await jwtVerify(token, JWT_SECRET, { algorithms: ['HS256'] });
    } catch (err) {
      // If token verification fails, redirect to the login page.
      const response = NextResponse.redirect(new URL('/adminx/login', req.url));
      // Clear the invalid cookie.
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adminx/:path*'],
};