import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/user/, "/change-password", "/news-feed"],
  admin: [/^\/admin/, "/change-password", "/news-feed"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user-dashboard",
    "/user-dashboard/:page*",
    "/admin-dashboard",
    "/admin-dashboard/:page*",
    "/change-password",
    "/news-feed",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
