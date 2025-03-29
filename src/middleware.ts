import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookieName: "session_token",
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production", // Use secure cookies only in production
  });

  const pathname = request.nextUrl.pathname;

  // Redirect logged-in users away from the landing page
  if (sessionCookie && pathname === "/") {
    console.log("User is logged in. Redirecting to /dashboard...");
    return NextResponse.redirect(new URL("/main", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!sessionCookie && pathname === "/profile") {
    console.log("No session cookie found. Redirecting to /signup...");
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile"], // Apply middleware to the landing page and profile page
};
