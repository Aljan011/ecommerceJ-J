import prisma from "../config/prisma.ts";

const variantColorService = {
  // ----- PUBLIC -----

  async getColorsByVariant(variantId: string) {
    return prisma.variantColor.findMany({
      where: {
        variantId,
        deletedAt: null,
      },
      include: {
        color: true,
      },
    });
  },

  async getVariantColorById(variantColorId: string) {
    return prisma.variantColor.findFirst({
      where: {
        id: variantColorId,
        deletedAt: null,
      },
      include: {
        color: true,
        variant: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  // ----- ADMIN -----

  async createVariantColor(data: {
    variantId: string;
    colorId: string;
    price: number;
    stock: number;
  }) {
    return prisma.variantColor.create({
      data,
      include: {
        color: true,
      },
    });
  },

  async updateVariantColor(
    variantColorId: string,
    data: {
      price?: number;
      stock?: number;
      colorId?: string;
    }
  ) {
    return prisma.variantColor.update({
      where: {
        id: variantColorId,
      },
      data,
      include: {
        color: true,
      },
    });
  },

  async deleteVariantColor(variantColorId: string) {
    return prisma.variantColor.update({
      where: { id: variantColorId },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};

export default variantColorService;
