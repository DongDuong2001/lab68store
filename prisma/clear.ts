import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("Clearing database...");

  try {
    // Delete all products (will cascade to purchases)
    await prisma.product.deleteMany({});
    console.log("✓ Cleared all products");

    console.log("\nDatabase cleared successfully!");
    console.log("You can now add products through the admin dashboard.");
  } catch (error) {
    console.error("Error clearing database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
