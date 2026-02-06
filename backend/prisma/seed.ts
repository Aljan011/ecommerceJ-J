/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

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
  await prisma.productConclusion.deleteMany();
  await prisma.productFAQ.deleteMany();
  await prisma.productFeature.deleteMany();
  await prisma.productCommonUse.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.color.deleteMany();

  // =========================
  // COLORS
  // =========================
  const colorsData = [
    { name: "BROWN", hex: "#8B5A2B" },
    { name: "WHITE", hex: "#FFFFFF" },
    { name: "PINK", hex: "#FFC0CB" },
    { name: "BLUE", hex: "#1976D2" },
  ];

  const colors: Record<string, any> = {};
  for (const c of colorsData) {
    const color = await prisma.color.create({ data: c });
    colors[c.name] = color;
  }

  // =========================
  // CATEGORIES
  // =========================
  const categoryNames = [
    "Paper Bags A",
    "Paper Bags B",
    "Paper Bags C",
    "Paper Bags D",
    "Paper Bags E",
  ];

  const categories: Record<string, any> = {};
  for (const name of categoryNames) {
    const category = await prisma.category.create({
      data: {
        name,
        description: `${name} products`,
      },
    });
    categories[name] = category;
  }

  // =========================
  // PRODUCTS DATA
  // =========================
  const productsData = [
    {
      name: "4 x 4 x 1.5",
      category: "Paper Bags A",
      description: "High quality 4 x 4 x 1.5 packaging product",
      images: ["/images/gtr.jpg", "/images/gtr.jpg", "/images/gtr.jpg"],
      commonUses: [
        "Jewelry and small gift items",
        "Cosmetics and skincare samples",
        "Electronic accessories",
        "Promotional and corporate gifts",
        "Handmade and craft products",
      ],
      features: [
        ["Strong Build", "3-ply corrugated board for durability"],
        ["Compact Design", "4 × 4 × 1.5 inch rectangular flip box"],
        ["Natural Finish", "Clean kraft corrugated texture"],
        ["Versatile Use", "Perfect for gifts and e-commerce"],
      ],
      faqs: [
        ["What items fit this box?", "Jewelry, accessories, cosmetics, and small electronics."],
        ["Is it eco-friendly?", "Yes, it uses recyclable corrugated material."],
        ["Can it be customized?", "Yes, branding is available for bulk orders."],
        ["Is it shipping-safe?", "Yes, it offers good protection during transit."],
      ],
      conclusion:
        "The 4 × 4 × 1.5 inch corrugated flip box offers a balance of strength, simplicity, and sustainability. It is an excellent choice for brands looking for compact and professional packaging for gifts and accessories.",
      prices: {
        BROWN: { "100": 900, "200": 1800, "500": 4000 },
        WHITE: { "50": 900, "100": 1600, "200": 3200, "500": 7500 },
        PINK: { "50": 1250, "100": 1950, "200": 3900, "500": 9300 },
        BLUE: { "50": 1250, "100": 1950, "200": 3900, "500": 9300 },
      },
    },
    {
      name: "3.5 x 5 x 2",
      category: "Paper Bags B",
      description: "High quality 3.5 x 5 x 2 packaging product",
      images: ["/images/gtr.jpg", "/images/gtr.jpg", "/images/gtr.jpg"],
      commonUses: [
        "Jewelry pieces and trinkets",
        "Small cosmetics or skincare samples",
        "USBs, cables, and tech accessories",
        "Festival gifts or promotional items",
        "Tiny handmade or craft items",
      ],
      features: [
        ["Material", "Made from durable 3-ply corrugated board"],
        ["Eco Friendly", "Fully recyclable kraft material"],
        ["Compact Size", "Ideal for small lightweight products"],
        ["Custom Printing", "Available for bulk orders"],
      ],
      faqs: [
        ["What can be packed in this box?", "Ideal for jewelry, accessories, cosmetics samples, and tech items."],
        ["Is this box eco-friendly?", "Yes, it is made from recyclable corrugated board."],
        ["Can I order in bulk?", "Yes, bulk orders with custom printing are available."],
        ["Is it sturdy for shipping?", "Yes, 3-ply construction provides good protection."],
      ],
      conclusion:
        "The 3.5 × 5 × 2 inch 3-ply corrugated flip box is a compact, eco-friendly, and reliable packaging solution for small products. Designed for protection and presentation, it is ideal for jewelry, accessories, and lightweight retail items.",
      prices: {
        BROWN: { "100": 1100, "200": 2200, "500": 5000 },
        WHITE: { "50": 1100, "100": 1850, "200": 3700, "500": 8900 },
        PINK: { "50": 1400, "100": 2300, "200": 4600, "500": 10900 },
        BLUE: { "50": 1400, "100": 2300, "200": 4600, "500": 10900 },
      },
    },
    {
      name: "6 x 6 x 2",
      category: "Paper Bags C",
      description: "High quality 6 x 6 x 2 packaging product",
      images: ["/images/gtr.jpg", "/images/gtr.jpg", "/images/gtr.jpg"],
      commonUses: [
        "Jewelry packaging",
        "Cosmetics and skincare products",
        "Small gifts and favors",
        "Handmade and artisanal items",
        "Subscription boxes",
      ],
      features: [
        ["Square Design", "Elegant square flip-top structure"],
        ["Strong Protection", "3-ply corrugated construction"],
        ["Tape-Free", "No glue or tape required"],
        ["Eco Conscious", "Fully recyclable material"],
      ],
      faqs: [
        ["What items can be packed?", "Accessories, cosmetics, gifts, and handcrafted items."],
        ["Is it shipping safe?", "Yes, suitable for lightweight to moderately fragile items."],
        ["Is it good for gifting?", "Yes, clean kraft finish is ideal for gifting."],
        ["Is customization available?", "Yes, bulk branding is supported."],
      ],
      conclusion:
        "The 6 × 6 × 2 inch corrugated flip box is a versatile and elegant packaging solution. With strong protection and a refined appearance, it is ideal for retail, gifting, and subscription packaging needs.",
      prices: {
        BROWN: { "100": 1500, "200": 3000, "500": 7000 },
        WHITE: { "50": 1600, "100": 2650, "200": 5300, "500": 12700 },
        PINK: { "50": 1800, "100": 2950, "200": 5900, "500": 14700 },
        BLUE: { "50": 1800, "100": 2950, "200": 5900, "500": 14700 },
      },
    },
    {
      name: "6.75 x 2.75 x 3.75",
      category: "Paper Bags D",
      description: "High quality 6.75 x 2.75 x 3.75 packaging product",
      images: ["/images/gtr.jpg", "/images/gtr.jpg", "/images/gtr.jpg"],
      commonUses: [
        "Jewelry items",
        "Cosmetic sample jars",
        "Mini gift sets",
        "Tech accessories",
        "Handmade crafts",
      ],
      features: [
        ["Mailer Style", "Efficient corrugated mailer box"],
        ["Shipping Ready", "Designed for transit protection"],
        ["Eco Friendly", "Recyclable kraft board"],
        ["Custom Branding", "Available for bulk orders"],
      ],
      faqs: [
        ["What fits best?", "Compact and delicate items like cosmetics and jewelry."],
        ["Is it shipping safe?", "Yes, strong 3-ply board protects contents."],
        ["Can I print my logo?", "Yes, custom printing is available."],
        ["Is it recyclable?", "Yes, made from recyclable corrugated material."],
      ],
      conclusion:
        "The 6.75 × 2.75 × 3.75 inch corrugated mailer box combines durability, efficiency, and sustainability. It is a reliable packaging option for shipping delicate items while maintaining a professional brand presentation.",
      prices: {
        BROWN: { "50": 1450, "100": 1950, "200": 3900, "500": 9250 },
        WHITE: { "50": 2100, "100": 3600, "200": 7200, "500": 17000 },
        PINK: { "50": 2500, "100": 3950, "200": 7900, "500": 19000 },
        BLUE: { "50": 2500, "100": 3950, "200": 7900, "500": 19000 },
      },
    },
    {
      name: "8.25 x 6.5 x 3",
      category: "Paper Bags E",
      description: "High quality 8.25 x 6.5 x 3 packaging product",
      images: ["/images/gtr.jpg", "/images/gtr.jpg", "/images/gtr.jpg"],
      commonUses: [
        "Jewelry packaging",
        "Cosmetic jars",
        "Tech accessories",
        "Gift sets",
        "Handmade keepsakes",
      ],
      features: [
        ["Flap Box Design", "Elegant and practical structure"],
        ["Strong Material", "3-ply corrugated board"],
        ["Clean Finish", "Natural kraft appearance"],
        ["Eco Friendly", "Recyclable packaging"],
      ],
      faqs: [
        ["What items suit this box?", "Jewelry, cosmetics, gadgets, and gifts."],
        ["Is it sturdy?", "Yes, designed for safe handling and shipping."],
        ["Can I customize it?", "Yes, logo printing is available."],
        ["Is it eco-friendly?", "Yes, fully recyclable material."],
      ],
      conclusion:
        "The 8.25 × 6.5 × 3 inch corrugated flap box delivers strength, elegance, and sustainability. It is a dependable packaging choice for premium gifts, accessories, and delicate retail items.",
      prices: {
        BROWN: { "50": 1900, "100": 2700, "200": 5400, "500": 13000 },
        WHITE: { "50": 2700, "100": 4900, "200": 9800, "500": 23750 },
        PINK: { "50": 0, "100": 0, "200": 0, "500": 0 },
        BLUE: { "50": 0, "100": 0, "200": 0, "500": 0 },
      },
    },
  ];

  // =========================
  // CREATE PRODUCTS + DETAILS
  // =========================
  for (const p of productsData) {
    // create product
    const product = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        imageUrl: p.images[0],
        categoryId: categories[p.category].id,
      },
    });

    // create images
    await prisma.productImage.createMany({
      data: p.images.map((url) => ({ productId: product.id, url })),
    });

    // create commonUses
    await prisma.productCommonUse.createMany({
      data: p.commonUses.map((text) => ({ productId: product.id, text })),
    });

    // create features
    await prisma.productFeature.createMany({
      data: p.features.map(([feature, description]) => ({
        productId: product.id,
        feature,
        description,
      })),
    });

    // create FAQs
    await prisma.productFAQ.createMany({
      data: p.faqs.map(([q, a]) => ({ productId: product.id, q, a })),
    });

    // create conclusion
    await prisma.productConclusion.create({
      data: { productId: product.id, text: p.conclusion },
    });

    // create standard variant
    const variant = await prisma.variant.create({
      data: { name: "Standard", productId: product.id },
    });

    // create variant colors & pack prices
    for (const colorName in p.prices) {
      const color = colors[colorName];
      const variantColor = await prisma.variantColor.create({
        data: { variantId: variant.id, colorId: color.id },
      });

      const packs = p.prices[colorName as keyof typeof p.prices];
      for (const packSizeStr in packs) {
        const price = packs[packSizeStr as keyof typeof packs];
        if (!price || price <= 0) continue;
        await prisma.variantColorPackPrice.create({
          data: {
            variantColorId: variantColor.id,
            packSize: parseInt(packSizeStr),
            price,
            stock: 100,
          },
        });
      }
    }
  }

  console.log("✅ Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("Seeding failed ❌", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });