import prisma from "../config/prisma.ts";

const productService = {
  // ----- PUBLIC -----

  async getAllProducts() {
    return prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        variants: {
          select: { id: true, name: true, price: true, stock: true },
        },
        category: true,
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
        variants: {
          select: { id: true, name: true, price: true, stock: true },
        },
        category: true,
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
        variants: {
          select: { id: true, name: true, price: true, stock: true },
        },
        category: true,
      },
    });
  },

  // ----- ADMIN -----

  async createProduct(data: {
    name: string;
    description: string;
    imageUrl?: string;
    categoryId: string;
  }) {
    return prisma.product.create({
      data,
      include: {
        variants: {
          select: { id: true, name: true, price: true, stock: true },
        },
        category: true,
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
      where: {
        id: productId,
      },
      data,
      include: {
        variants: {
          select: { id: true, name: true, price: true, stock: true },
        },
        category: true,
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
    ]);
  },
}

export default productService;
