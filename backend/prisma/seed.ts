import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
declare const process: any;

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data (extra safety)
  await prisma.cartHistoryItem.deleteMany();
  await prisma.cartHistory.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.variantColor.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.color.deleteMany();
  await prisma.category.deleteMany();

  // -----------------------------
  // COLORS
  // -----------------------------
  const colors = await prisma.color.createMany({
    data: [
      { name: "Red", hex: "#FF0000" },
      { name: "Blue", hex: "#0057FF" },
      { name: "Green", hex: "#1E8449" },
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Yellow", hex: "#F1C40F" },
      { name: "Orange", hex: "#E67E22" },
    ],
  });

  const allColors = await prisma.color.findMany();

  // Helper: random colors
  const pickColors = () =>
    allColors.sort(() => 0.5 - Math.random()).slice(0, 3);

  // -----------------------------
  // CATEGORIES
  // -----------------------------
  const categories = [
    {
      name: "Paper Bags",
      description: "Eco-friendly paper bags for retail and packaging",
    },
    {
      name: "Food Packaging",
      description: "Durable food-safe packaging solutions",
    },
    {
      name: "Custom Printing",
      description: "Custom printed packaging and branding materials",
    },
  ];

  for (const categoryData of categories) {
    const category = await prisma.category.create({
      data: categoryData,
    });

    // -----------------------------
    // PRODUCTS (8 per category)
    // -----------------------------
    for (let i = 1; i <= 8; i++) {
      const product = await prisma.product.create({
        data: {
          name: `${category.name} Product ${i}`,
          description: `High quality ${category.name.toLowerCase()} item ${i}`,
          categoryId: category.id,
        },
      });

      // -----------------------------
      // VARIANTS
      // -----------------------------
      const variants = ["Small", "Medium", "Large"];

      for (const variantName of variants) {
        const variant = await prisma.variant.create({
          data: {
            name: variantName,
            productId: product.id,
          },
        });

        // -----------------------------
        // VARIANT COLORS (price & stock)
        // -----------------------------
        const selectedColors = pickColors();

        for (const color of selectedColors) {
          await prisma.variantColor.create({
            data: {
              variantId: variant.id,
              colorId: color.id,
              price:
                variantName === "Small"
                  ? 10
                  : variantName === "Medium"
                  ? 15
                  : 20,
              stock: Math.floor(Math.random() * 50) + 10,
            },
          });
        }
      }
    }
  }

  console.log("✅ Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
