import prisma from "../config/prisma.ts";

const variantService = {
  // ----- PUBLIC ----

  async getVariantByProduct(productId: string) {
    return prisma.variant.findMany({
      where: { productId },
    });
  },

  async getVariantById(variantId: string) {
    return prisma.variant.findUnique({
      where: { id: variantId },
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
      where: { id: variantId },
      data,
    });
  },

  async deleteVariant(variantId: string) {
    return prisma.variant.delete({
      where: { id: variantId },
    });
  },
};

export default variantService;
