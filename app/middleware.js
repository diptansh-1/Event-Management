import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  console.log("Middleware running on:", req.nextUrl.pathname);
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Allow logout to handle its own redirect
  if (pathname === '/api/auth/logout') {
    return NextResponse.next();
  }

  // Redirect authenticated users from auth routes to home
  if (['/login', '/register'].includes(pathname)) {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.redirect(new URL('/', req.url));
      } catch (error) {
        const response = NextResponse.redirect(new URL('/', req.url));
        response.cookies.delete('token');
        return response;
      }
    }
    return NextResponse.next();
  }

  // Protect all dashboard routes (including /dashboard/events)
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Protects all subroutes under /dashboard
    '/dashboard',        // Ensures /dashboard itself is protected
    '/login',
    '/register'
  ],
};