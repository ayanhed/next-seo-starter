import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Proxy (formerly Middleware)
 * Minimal proxy layer for request header enrichment
 *
 * Note: As of Next.js 16, this uses the nodejs runtime (not edge runtime)
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 *
 * Philosophy: Keep proxy minimal - move complex logic to layouts where possible
 * - Maintenance mode: Handled in root layout
 * - Authentication: Handled in (main) and (auth) layouts
 * - Header enrichment: Stays here (needed for layouts)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Clone the request headers and add pathname for use in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

/**
 * Matcher Configuration
 * Specifies which routes this proxy should run on
 * Excludes: API routes, static files, images, and font files
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, *.svg, *.png, *.jpg, etc. (static assets)
     * - *.woff, *.woff2, *.ttf, *.eot (font files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
