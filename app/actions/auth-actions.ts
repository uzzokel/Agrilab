"use server";

import { signIn, signOut } from "@/auth";

export async function handleGoogleSignIn(redirectToPath: string = "/features") {
  await signIn("google", { redirectTo: redirectToPath });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}