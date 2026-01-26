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

  await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@demo.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "user@demo.com" },
    update: {},
    create: {
      name: "User",
      email: "user@demo.com",
      password: userPassword,
      role: "USER",
    },
  });

  // --------------------
  // CATEGORIES (ALL NEW)
  // --------------------
  await prisma.category.createMany({
    data: [
      { name: "Books", description: "Books and educational material" },
      { name: "Furniture", description: "Home and office furniture" },
      { name: "Sports", description: "Sports and fitness equipment" },
      { name: "Beauty", description: "Beauty and personal care" },
    ],
    skipDuplicates: true,
  });

  const categories = await prisma.category.findMany();

  const books = categories.find(c => c.name === "Books")!;
  const furniture = categories.find(c => c.name === "Furniture")!;
  const sports = categories.find(c => c.name === "Sports")!;
  const beauty = categories.find(c => c.name === "Beauty")!;

  // --------------------
  // BOOKS
  // --------------------
  await prisma.product.create({
    data: {
      name: "JavaScript Mastery",
      description: "Complete guide to JavaScript",
      imageUrl: "https://example.com/js-book.jpg",
      categoryId: books.id,
      variants: {
        create: [
          { name: "Paperback", price: 29.99, stock: 100 },
          { name: "Hardcover", price: 39.99, stock: 60 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Clean Architecture",
      description: "Software architecture principles",
      imageUrl: "https://example.com/architecture.jpg",
      categoryId: books.id,
      variants: {
        create: [
          { name: "Paperback", price: 34.99, stock: 80 },
          { name: "Hardcover", price: 44.99, stock: 40 },
        ],
      },
    },
  });

  // --------------------
  // FURNITURE
  // --------------------
  await prisma.product.create({
    data: {
      name: "Office Chair",
      description: "Ergonomic office chair",
      imageUrl: "https://example.com/chair.jpg",
      categoryId: furniture.id,
      variants: {
        create: [
          { name: "Black", price: 149.99, stock: 30 },
          { name: "Grey", price: 149.99, stock: 25 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Study Desk",
      description: "Wooden study desk",
      imageUrl: "https://example.com/desk.jpg",
      categoryId: furniture.id,
      variants: {
        create: [
          { name: "120cm", price: 199.99, stock: 20 },
          { name: "150cm", price: 249.99, stock: 15 },
        ],
      },
    },
  });

  // --------------------
  // SPORTS
  // --------------------
  await prisma.product.create({
    data: {
      name: "Yoga Mat",
      description: "Non-slip yoga mat",
      imageUrl: "https://example.com/yoga.jpg",
      categoryId: sports.id,
      variants: {
        create: [
          { name: "6mm", price: 29.99, stock: 50 },
          { name: "8mm", price: 34.99, stock: 40 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Dumbbell Set",
      description: "Adjustable dumbbells",
      imageUrl: "https://example.com/dumbbell.jpg",
      categoryId: sports.id,
      variants: {
        create: [
          { name: "20kg", price: 79.99, stock: 25 },
          { name: "30kg", price: 109.99, stock: 15 },
        ],
      },
    },
  });

  // --------------------
  // BEAUTY
  // --------------------
  await prisma.product.create({
    data: {
      name: "Face Cleanser",
      description: "Gentle daily face cleanser",
      imageUrl: "https://example.com/cleanser.jpg",
      categoryId: beauty.id,
      variants: {
        create: [
          { name: "100ml", price: 14.99, stock: 60 },
          { name: "200ml", price: 22.99, stock: 40 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Moisturizer",
      description: "Hydrating skin moisturizer",
      imageUrl: "https://example.com/moisturizer.jpg",
      categoryId: beauty.id,
      variants: {
        create: [
          { name: "Normal Skin", price: 19.99, stock: 50 },
          { name: "Dry Skin", price: 21.99, stock: 45 },
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
