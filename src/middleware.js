import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/credits", "/cart"];

export default function middleware(req) {
  const token = req.cookies.get("token");
  if (!token?.value && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    console.log("route protected");
    return NextResponse.redirect(absoluteURL.toString());
  }
}
