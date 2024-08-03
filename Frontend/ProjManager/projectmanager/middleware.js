import { NextResponse } from "next/server";

export function middleware(request) {
  // Extract the token from cookies
  const token = request.cookies.get("auth-token")?.value;

  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists and user is trying to access the login page
  if (token && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/home", request.url)); // or any other authenticated page
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
