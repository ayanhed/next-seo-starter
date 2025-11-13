import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { appConfig } from "./config/app";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session cookie for optimistic redirects
  // Note: This is for redirects only - actual auth validation happens in page components
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: appConfig.app.name,
  });

  // Define protected routes (all routes under (main) group)
  const protectedRoutes = ["/dashboard"];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Only redirect unauthenticated users from protected routes
  // Let layouts handle auth route redirects to avoid conflicts
  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all main app routes
    "/dashboard/:path*",
  ],
};
