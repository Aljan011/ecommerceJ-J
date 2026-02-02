/// <reference types="node" />

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // =========================
  // CLEAN DEPENDENT DATA
  // =========================
  await prisma.cartHistoryItem.deleteMany();
  await prisma.cartHistory.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.variantColorPackPrice.deleteMany();
  await prisma.variantColor.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  // =========================
  // CATEGORIES
  // =========================
  const categoriesData = [
    { name: "Paper Bags", description: "Eco friendly paper packaging bags", imageUrl: "/categories/paper.jpg" },
    { name: "Plastic Packaging", description: "Durable plastic packaging solutions", imageUrl: "/categories/plastic.jpg" },
    { name: "Food Containers", description: "Food grade containers and boxes", imageUrl: "/categories/food.jpg" },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    categories.push(category);
  }

  // =========================
  // COLORS (GLOBAL)
  // =========================
  const colorsData = [
    { name: "Brown", hex: "#8B5A2B" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Red", hex: "#D32F2F" },
    { name: "Blue", hex: "#1976D2" },
  ];

  const colors = [];
  for (const c of colorsData) {
    const color = await prisma.color.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
    colors.push(color);
  }

  // =========================
  // PRODUCTS + VARIANTS
  // =========================
  const packSizes = [50, 100, 200, 500];

  for (const category of categories) {
    for (let i = 1; i <= 8; i++) {
      const product = await prisma.product.create({
        data: {
          name: `${category.name} Product ${i}`,
          description: `High quality ${category.name.toLowerCase()} product ${i}`,
          imageUrl: `/products/${category.name.toLowerCase()}-${i}.jpg`,
          categoryId: category.id,
          images: {
            create: [
              { url: `/products/${category.name}-${i}-1.jpg` },
              { url: `/products/${category.name}-${i}-2.jpg` },
              { url: `/products/${category.name}-${i}-3.jpg` },
            ],
          },
        },
      });

      const variant = await prisma.variant.create({
        data: {
          name: "Standard",
          productId: product.id,
        },
      });

      // =========================
      // VARIANT COLORS + PACK PRICES
      // =========================
      for (const color of colors) {
        const variantColor = await prisma.variantColor.create({
          data: {
            variantId: variant.id,
            colorId: color.id,
          },
        });

        for (const pack of packSizes) {
          const price = pack * (Math.floor(Math.random() * 3) + 5); // Random multiplier for variety
          const stock = Math.floor(Math.random() * 300) + 50; // 50–350 stock

          await prisma.variantColorPackPrice.create({
            data: {
              variantColorId: variantColor.id,
              packSize: pack,
              price,
              stock,
            },
          });
        }
      }
    }
  }

  console.log("Seed completed successfully ✅");
}

main()
  .catch((e) => {
    console.error("Seeding failed ❌", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
