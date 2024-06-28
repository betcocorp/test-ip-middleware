// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "@/lib/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ipRangeCheck from "ip-range-check";

const allowedIPRanges = [
  process.env.ALLOWED_IP_ONE!,
  process.env.ALLOWED_IP_TWO!,
  process.env.ALLOWED_IP_THREE!,
  process.env.ALLOWED_IP_FOUR!,
  process.env.ALLOWED_IP_FIVE!,
  //"::1", // IPv6 loopback included to allow local development without login
];
const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest) => {
  const { nextUrl } = req;

  // Extract the user's IP address from the request, considering the X-Forwarded-For header
  const forwardedFor = req.headers.get("x-forwarded-for");
  const userIP = forwardedFor ? forwardedFor.split(",")[0].trim() : req.ip;
  console.log("User IP >>>>", userIP);

  // Check if the user's IP is within the allowed ranges
  const isIPAllowed = allowedIPRanges.some((range) =>
    ipRangeCheck(userIP, range)
  );
  console.log("isIPAllowed >>>>", isIPAllowed);

  const isAuthenticated = !!req.auth || isIPAllowed; // Consider IP-based access as authenticated
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // If the user is authenticated (either by session or IP) and trying to access a public route, redirect to the default page
  if (isAuthenticated && isPublicRoute)
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  // If the user is not authenticated by session or IP and trying to access a non-public route, redirect to the root
  if (!isAuthenticated && !isPublicRoute)
    return NextResponse.redirect(new URL(ROOT, nextUrl));

  // Proceed with the request if none of the above conditions are met
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
