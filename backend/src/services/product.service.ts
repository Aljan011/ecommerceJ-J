import prisma from "../config/prisma.ts";

const productService = {
  // =====================
  // PUBLIC
  // =====================

  async getAllProducts() {
  return prisma.product.findMany({
    where: { deletedAt: null },
    include: {
      category: true,
      images: true,
      commonUses: true,
      features: true,
      faqs: true,
      conclusion: true,
      variants: {
        where: { deletedAt: null },
        include: {
          colors: {
            where: { deletedAt: null },
            include: {
              color: true,
              packPrices: { where: { deletedAt: null }, orderBy: { packSize: "asc" } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
},

async getProductById(productId: string) {
  return prisma.product.findFirst({
    where: { id: productId, deletedAt: null },
    include: {
      category: true,
      images: true,
      commonUses: true,
      features: true,
      faqs: true,
      conclusion: true,
      variants: {
        where: { deletedAt: null },
        include: {
          colors: {
            where: { deletedAt: null },
            include: {
              color: true,
              packPrices: { where: { deletedAt: null }, orderBy: { packSize: "asc" } },
            },
          },
        },
      },
    },
  });
},

  async getProductsByCategory(categoryId: string) {
    return prisma.product.findMany({
      where: {
        categoryId,
        deletedAt: null,
      },
      include: {
        category: true,
        variants: {
          where: { deletedAt: null },
          include: {
            colors: {
              where: { deletedAt: null },
              include: {
                color: true,
                packPrices: {
                  where: { deletedAt: null },
                  orderBy: { packSize: "asc" },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // =====================
  // ADMIN
  // =====================

  async createProduct(data: {
    name: string;
    description: string;
    imageUrl?: string;
    categoryId: string;
  }) {
    return prisma.product.create({
      data,
      include: {
        category: true,
        variants: {
          include: {
            colors: {
              include: {
                color: true,
                packPrices: true,
              },
            },
          },
        },
      },
    });
  },

  async updateProduct(
    productId: string,
    data: {
      name?: string;
      description?: string;
      imageUrl?: string;
      categoryId?: string;
    }
  ) {
    return prisma.product.update({
      where: { id: productId },
      data,
      include: {
        category: true,
        variants: {
          include: {
            colors: {
              include: {
                color: true,
                packPrices: true,
              },
            },
          },
        },
      },
    });
  },

  async deleteProduct(productId: string) {
    return prisma.$transaction([
      prisma.product.update({
        where: { id: productId },
        data: {
          deletedAt: new Date(),
        },
      }),

      prisma.variant.updateMany({
        where: {
          productId,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      }),

      prisma.variantColor.updateMany({
        where: {
          variant: {
            productId,
          },
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      }),
    ]);
  },
};

export default productService;
