// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ipRangeCheck from "ip-range-check";

const allowedIPRanges = [
  process.env.ALLOWED_IP_ONE!,
  process.env.ALLOWED_IP_TWO!,
  process.env.ALLOWED_IP_THREE!,
  process.env.ALLOWED_IP_FOUR!,
  //'::1' //- IPv6 loopback not included to require login
];

export function middleware(req: NextRequest) {
  const currentIP = req.headers.get("x-forwarded-for") || req.ip!;
  console.log("Current IP:", currentIP);

  // Bypass IP check for the sign-in page
  if (req.nextUrl.pathname === "/auth/signin") {
    console.log("Allowing access to sign-in page");
    return NextResponse.next();
  }

  if (ipRangeCheck(currentIP, allowedIPRanges)) {
    console.log("IP Allowed:", currentIP);
    const response = NextResponse.next();
    response.headers.set("x-allowed-ip", "true");
    return response;
  } else {
    console.log("IP Not Allowed:", currentIP);
    const signInUrl = `${req.nextUrl.origin}/auth/signin`;
    console.log("Redirecting to:", signInUrl);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: "/:path*", // Protect all routes
};
