import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookieName: "session_token",
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production", // Use secure cookies only in production
  });

  console.log("Session Cookie:", sessionCookie);

  if (!sessionCookie) {
    console.log("No session cookie found. Redirecting...");
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"], // Specify the routes the middleware applies to
};
