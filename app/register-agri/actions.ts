"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function registerAgriProfile(formData: FormData) {
  const session = await auth();
  
  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }

  const name = formData.get("name") as string;
  const state = formData.get("state") as string;
  const email = formData.get("email") as string;
  const pin = formData.get("pin") as string;
  const designation = formData.get("designation") as string;

  // Validate 6-digit PIN
  if (!pin || pin.length !== 6 || isNaN(Number(pin))) {
    throw new Error("Your chosen PIN must be exactly 6 digits numbers.");
  }

  if (!name || !state || !email || !designation) {
    throw new Error("Please fill out all required fields.");
  }

  // Update the user record in PostgreSQL via Prisma
  await db.user.update({
    where: { email: session.user.email },
    data: {
      name,
      state,
      email,
      pin,
      designation,
      status: "PENDING", // Moves them to the waiting room state
    },
  });

  // Redirect them to the waiting screen
  redirect("/pending-approval");
}