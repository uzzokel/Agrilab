import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };