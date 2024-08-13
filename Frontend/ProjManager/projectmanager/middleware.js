import { NextResponse } from "next/server";

export function middleware(request) {
  // Extract the token from cookies
  const token = request.cookies.get("auth-token")?.value;

  // Redirect to login page if token is missing and user is not on the login or signup page
  if (!token && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists and user is trying to access the login or signup page, redirect to home or authenticated page
  if (token && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/home", request.url)); // or any other authenticated page
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
  