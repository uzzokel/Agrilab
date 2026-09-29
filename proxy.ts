import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth?: any }) => {
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;
  
  const path = req.nextUrl.pathname;
  const isProtected = path.startsWith("/dashboard") || path.startsWith("/blog") || path.startsWith("/features") || path.startsWith("/admin");
  const isRegisterPage = path.startsWith("/register-agri");
  const isPendingPage = path.startsWith("/pending-approval");
  const isLoginPage = path.startsWith("/login-agri");

  // Admin Bypass: If user is the designated admin, let them access anything freely!
  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = user?.email && adminEmail && user.email === adminEmail;

  if (isAdmin) {
    return NextResponse.next();
  }

  // 1. Unauthenticated users trying to hit protected routes
  if (isProtected && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // 2. Standard user routing checks
  if (isLoggedIn) {
    const status = user?.status; 

    if ((!status || status === "UNREGISTERED") && !isRegisterPage) {
      return NextResponse.redirect(new URL("/register-agri", req.url));
    }

    if (status === "PENDING" && !isPendingPage) {
      return NextResponse.redirect(new URL("/pending-approval", req.url));
    }

    if (status === "APPROVED" && (isLoginPage || isRegisterPage)) {
      return NextResponse.redirect(new URL("/features", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/features", 
    "/blog", 
    "/admin/:path*",
    "/dashboard/:path*", 
    "/register-agri", 
    "/pending-approval",
    "/login-agri"
  ],
};