import { NextRequest, NextResponse } from "next/server";
import { CANONICAL_HOST, SITE_URL } from "@/lib/site-config";

/**
 * Reject requests from unauthorized domains.
 *
 * If someone points an external domain (e.g. yonovocashflow.com) at our
 * Vercel deployment, this middleware redirects visitors to the canonical
 * www.yonovo.com so we don't serve content under a domain we don't own.
 */

const ALLOWED_HOSTS = new Set([
  CANONICAL_HOST,        // www.yonovo.com
  "yonovo.com",          // apex — Vercel redirects this to www anyway
]);

function isAllowedHost(host: string): boolean {
  // Strip port for local dev (e.g. localhost:3000)
  const hostname = host.split(":")[0];

  if (ALLOWED_HOSTS.has(hostname)) return true;

  // Allow localhost / Vercel preview deployments
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".vercel.app")
  ) {
    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (!isAllowedHost(host)) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, SITE_URL);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
