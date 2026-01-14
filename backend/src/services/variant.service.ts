import prisma from "../config/prisma.ts";

const variantService = {
  //----- PUBLIC ----
  async getVariantByProduct(productId: number) {
    return prisma.variant.findUnique({
      where: { id: productId },
    });
  },

  async getVariantById(variantId: number) {
    return prisma.variant.findUnique({
      where: { id: variantId },
    });
  },

  //----- ADMIN ----
  async createVariant(data: {
    productId: number;
    price: number;
    stock: number;
    name: string;
  }) {
    return prisma.variant.create({
      data,
    });
  },

  async updateVariant(
    variantId: number,
    data: { name?: string; price?: number; stock?: number; productId?: number }
  ) {
    return prisma.variant.update({
      where: { id: variantId },
      data,
    });
  },

  async deleteVariant(variantId: number) {
    return prisma.variant.delete({
      where: { id: variantId },
    });
  },
};

export default variantService;
