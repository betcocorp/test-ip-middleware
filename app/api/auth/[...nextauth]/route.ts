// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          credentials?.username === "test" &&
          credentials?.password === "test"
        ) {
          // Ensure the `id` is a string to match the expected `User` type
          return { id: "1", name: "Test User" }; // Note: `id` is now a string
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};
const handler = NextAuth(authOptions);

// Define the GET and POST handlers compatible with Next.js route handlers
export async function GET(req: NextRequest) {
  return new NextResponse("Response body here", { status: 200 });
}

export async function POST(req: NextRequest) {
  return new NextResponse("Response body here", { status: 200 });
}
