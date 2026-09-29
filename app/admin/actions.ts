"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendApprovalEmail } from "@/lib/mail";

// Generates a unique ID in the format: agrilabXXXX (no underscore)
async function generateAgrilabUsername(): Promise<string> {
  let isUnique = false;
  let finalUsername = "";

  while (!isUnique) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit number (1000-9999)
    finalUsername = `agrilab${randomSuffix}`;

    const existingUser = await db.user.findUnique({
      where: { username: finalUsername },
    });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return finalUsername;
}

export async function updateUserStatus(userId: string, status: "APPROVED" | "REJECTED") {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  // Security check: Ensure only the admin can execute this
  if (!session || session.user?.email !== adminEmail) {
    throw new Error("Unauthorized action.");
  }

  // Fetch target user to get their name, email, and pin
  const targetUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!targetUser) {
    throw new Error("User not found.");
  }

  if (status === "APPROVED") {
    // Generate a unique "agrilabXXXX" username if they don't already have a valid one
    let username = targetUser.username;
    if (!username || !username.startsWith("agrilab")) {
      username = await generateAgrilabUsername();
    }

    // Update status and save the generated username to the database
    await db.user.update({
      where: { id: userId },
      data: {
        status: "APPROVED",
        username: username,
      },
    });

    // Send the approval email containing their new username and repeated PIN
    if (targetUser.email) {
      await sendApprovalEmail(
        targetUser.email,
        targetUser.name || "Valued User",
        username,
        targetUser.pin || "N/A"
      );
    }
  } else {
    // Handle rejection case
    await db.user.update({
      where: { id: userId },
      data: { status: "REJECTED" },
    });
  }

  revalidatePath("/admin");
}