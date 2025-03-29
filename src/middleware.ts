import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookieName: "session_token",
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production", // Use secure cookies only in production
  });

  const pathname = request.nextUrl.pathname;

  // Redirect logged-in users away from the landing page and signup page
  if (sessionCookie && (pathname === "/" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (
    !sessionCookie &&
    (pathname === "/profile" ||
      pathname === "/dashboard" ||
      pathname === "/main" ||
      pathname === "/message")
  ) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // Allow access to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Landing page
    "/signup", // All routes under /auth
    "/profile", // Profile route
    "/dashboard", // Dashboard route
    "/main", // Dashboard route
    "/message", // Dashboard route
  ],
};
