// auth.ts (in your root directory)
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.picture = profile.picture || profile.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.picture && session.user) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;