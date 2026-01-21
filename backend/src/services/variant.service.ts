import prisma from "../config/prisma.ts";

const variantService = {
  // ----- PUBLIC ----

  async getVariantByProduct(productId: string) {
    const product = await prisma.product.findFirst({
      where: {
        id : productId,
        deletedAt: null,
      },
    });

    if (!product) {
      return [];
    }
    
    return prisma.variant.findMany({
      where: {
        productId,
        deletedAt: null,
      },
    });
  },

  async getVariantById(variantId: string) {
    return prisma.variant.findFirst({
      where: {
        id: variantId,
        deletedAt: null,
      },
    });
  },

  // ----- ADMIN ----

  async createVariant(data: {
    productId: string;
    price: number;
    stock: number;
    name: string;
  }) {
    return prisma.variant.create({
      data,
    });
  },

  async updateVariant(
    variantId: string,
    data: {
      name?: string;
      price?: number;
      stock?: number;
      productId?: string;
    }
  ) {
    return prisma.variant.update({
      where: {
        id: variantId,

      },
      data,
    });
  },

  async deleteVariant(variantId: string) {
    return prisma.variant.update({
      where: { id: variantId },
      data: {
        deletedAt: new Date(),
      }
    });
  },
};

export default variantService;
