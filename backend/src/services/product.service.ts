import prisma from "../config/prisma.ts";

const productService = {
  // =====================
  // PUBLIC
  // =====================

  async getAllProducts() {
    return prisma.product.findMany({
      where: {
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
                color: true, // name, hex
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
      where: {
        id: productId,
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
              },
            },
          },
        },
      },
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
