"use client";
// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";

const publicPages = ["/auth/signin"];

function AuthChecker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [allowedIP, setAllowedIP] = useState(false);

  useEffect(() => {
    const checkAllowedIP = async () => {
      try {
        const res = await fetch("/api/check-ip");
        const data = await res.json();
        console.log("Check Allowed IP Response:", data);
        setAllowedIP(data.allowedIP);
      } catch (error) {
        console.error("Error checking allowed IP:", error);
      }
    };

    checkAllowedIP();
  }, []);

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session Status:", status);
    console.log("Session Data:", session);
    console.log("Allowed IP:", allowedIP);
    if (status === "loading") return; // Do nothing while loading
    if (!session && !allowedIP && !publicPages.includes(pathname)) {
      // If user is not signed in and not in allowed IP range, redirect to sign-in
      console.log("Redirecting to sign-in");
      window.location.href = "/auth/signin";
    }
  }, [pathname, session, allowedIP, status]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AuthChecker>{children}</AuthChecker>
        </SessionProvider>
      </body>
    </html>
  );
}
