import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

async function connectToDatabase() {
  try {
    await prismaClient.$connect();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure code
  }
}

connectToDatabase();
