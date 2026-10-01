// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  trustHost: true,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, // Ensure JWT strategy is enabled for credentials
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return user; // Returns the full user object including status
      },
    }),
  ],
  callbacks: {
    // 1. Save user properties into the JWT token upon login
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.status = (user as any).status;
      }
      // Allow manual updates if you update status later
      if (trigger === "update" && session?.status) {
        token.status = session.status;
      }
      return token;
    },
    // 2. Expose the token properties to the session object (`req.auth.user`)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).status = token.status;
      }
      return session;
    },
  },
});
