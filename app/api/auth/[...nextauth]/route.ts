import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const { handlers } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
});

export const { GET, POST } = handlers;