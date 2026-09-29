// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  trustHost: true,
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;

        // Fetch the latest state directly from the database
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: {
            status: true,
            state: true,
            designation: true,
            username: true,
          },
        });

        if (dbUser) {
          // If status is null, empty, or undefined, explicitly set it to null/empty string 
          // so your proxy can catch it with `!status`
          (session.user as any).status = dbUser.status || null;
          (session.user as any).state = dbUser.state;
          (session.user as any).designation = dbUser.designation;
          (session.user as any).username = dbUser.username;
        } else {
          // Fallback if user record isn't fully linked yet
          (session.user as any).status = null;
        }
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;