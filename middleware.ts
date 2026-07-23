import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;


export function middleware(req: NextRequest) {
  console.log("Middleware:", req.nextUrl.pathname);
  const token = req.cookies.get("token")?.value;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  const isDashboard =
    req.nextUrl.pathname.startsWith("/dashboard");

  // User not logged in
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User logged in
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);

      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};