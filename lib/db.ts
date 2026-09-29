import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Add this temporarily to see queries in your terminal
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;