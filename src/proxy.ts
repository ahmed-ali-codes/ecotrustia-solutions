import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith('/adminx');
  const isApiRoute = pathname.startsWith('/api');
  const isLoginRoute = pathname === '/adminx/login' || pathname === '/api/login';
  
  // Allow public API GET requests
  if (isApiRoute && req.method === 'GET') {
    return NextResponse.next();
  }

  // Require authentication for admin pages and mutating API routes (POST, PUT, DELETE)
  const isProtectedRoute = (isAdminPage || isApiRoute) && !isLoginRoute;

  if (isProtectedRoute) {
    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/adminx/login', req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET, { algorithms: ['HS256'] });
    } catch (err) {
      // Token is invalid or expired
      if (isApiRoute) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
      }
      const response = NextResponse.redirect(new URL('/adminx/login', req.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adminx/:path*', '/api/:path*'],
};
