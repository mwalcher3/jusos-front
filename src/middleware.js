import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - logos
     * - icons
     * - service worker
     */
    "/((?!api|_next/static|manifest|images|logos|_next/image|sw.js|workbox).*)",
  ],
};

export default function middleware(request) {
  // const searchParams = request.nextUrl.searchParams;
  // we very much don't want to use searchParams for routing
  const cookieColormode = request.cookies.get("preferredColormode")?.value;
  const color =
    cookieColormode && (cookieColormode == "light" || cookieColormode == "dark")
      ? cookieColormode
      : "light";

  const rewritePath =
    request.nextUrl.pathname == "/" ? `/${color}` : `/${color}${request.nextUrl.pathname}`;
  const rewriteUrl = new URL(rewritePath, request.nextUrl);
  return NextResponse.rewrite(rewriteUrl);
}
