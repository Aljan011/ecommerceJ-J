import prisma from "../config/prisma.ts";

const variantService = {
  // ----- PUBLIC -----

  async getVariantByProduct(productId: string) {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
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
      include: {
        colors: {
          where: { deletedAt: null },
          include: {
            color: true,
          },
        },
      },
    });
  },

  async getVariantById(variantId: string) {
    return prisma.variant.findFirst({
      where: {
        id: variantId,
        deletedAt: null,
      },
      include: {
        colors: {
          where: { deletedAt: null },
          include: {
            color: true,
          },
        },
      },
    });
  },

  // ----- ADMIN -----

  async createVariant(data: {
    productId: string;
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
    return prisma.$transaction([
      prisma.variant.update({
        where: { id: variantId },
        data: {
          deletedAt: new Date(),
        },
      }),

      prisma.variantColor.updateMany({
        where: {
          variantId,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      }),
    ]);
  },
};

export default variantService;
