// app/api/register/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, state, designation } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if a user with this email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random 4-digit PIN for their profile
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    // Create the new user with UNREGISTERED/PENDING status
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        state: state || null,
        designation: designation || null,
        pin,
        status: "UNREGISTERED", // Matches your Prisma schema default
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Registration successful!", 
        userId: newUser.id 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again." }, 
      { status: 500 }
    );
  }
}