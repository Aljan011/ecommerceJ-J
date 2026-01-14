/// <reference types="node" />

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --------------------
  // USERS
  // --------------------
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@jnj.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@jnj.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@jnj.com" },
    update: {},
    create: {
      name: "Normal User",
      email: "user@jnj.com",
      password: userPassword,
      role: "USER",
    },
  });

  // --------------------
  // CATEGORIES
  // --------------------
  await prisma.category.createMany({
    data: [
      { name: "Electronics", description: "Electronic gadgets and devices" },
      { name: "Clothing", description: "Fashion and apparel" },
      { name: "Home", description: "Home and kitchen products" },
    ],
  });

  // Fetch categories to link products
  const allCategories = await prisma.category.findMany();
  const electronics = allCategories.find(c => c.name === "Electronics")!;
  const clothing = allCategories.find(c => c.name === "Clothing")!;

  // --------------------
  // PRODUCTS + VARIANTS
  // --------------------
  // Electronics
  const smartphone = await prisma.product.create({
    data: {
      name: "Smartphone",
      description: "Latest smartphone",
      imageUrl: "https://example.com/smartphone.jpg",
      categoryId: electronics.id,
      variants: {
        create: [
          { name: "128GB - Black", price: 699.99, stock: 50 },
          { name: "256GB - Black", price: 799.99, stock: 30 },
        ],
      },
    },
  });

  const laptop = await prisma.product.create({
    data: {
      name: "Laptop",
      description: "High performance laptop",
      imageUrl: "https://example.com/laptop.jpg",
      categoryId: electronics.id,
      variants: {
        create: [
          { name: "i5 - 8GB RAM", price: 1299.99, stock: 30 },
          { name: "i7 - 16GB RAM", price: 1599.99, stock: 20 },
        ],
      },
    },
  });

  // Clothing
  const tshirt = await prisma.product.create({
    data: {
      name: "T-Shirt",
      description: "Cotton T-Shirt",
      imageUrl: "https://example.com/tshirt.jpg",
      categoryId: clothing.id,
      variants: {
        create: [
          { name: "Small - Red", price: 19.99, stock: 40 },
          { name: "Medium - Blue", price: 19.99, stock: 60 },
          { name: "Large - Black", price: 21.99, stock: 30 },
        ],
      },
    },
  });

  console.log("✅ Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
