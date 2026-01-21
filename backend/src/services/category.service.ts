import prisma from "../config/prisma.ts";

const categoryService = {
  //--------------------
  // PUBLIC
  //--------------------

  async getAllCategories() {
    return prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getCategoryById(categoryId: string) {
    return prisma.category.findFirst({
      where: {
        id: categoryId,
        deletedAt: null,
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
        variants: true, // price & stock info
      },
    });
  },

  //--------------------
  // ADMIN
  //--------------------

  async createCategory(data: {
    name: string;
    description: string;
    imageUrl?: string;
  }) {
    return prisma.category.create({
      data,
    });
  },

  async updateCategory(
    categoryId: string,
    data: {
      name?: string;
      description?: string;
      imageUrl?: string;
    }
  ) {
    return prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });
  },

  async deleteCategory(categoryId: string) {
    return prisma.$transaction([
      prisma.category.update({
        where: { id: categoryId },
        data: {
          deletedAt: new Date(),
        }
      }),

      prisma.product.updateMany({
        where: {
          categoryId,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      }),

      prisma.variant.updateMany({
        where: {
          product: {
            categoryId,
          },
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      }),
    ]);
  }
};

export default categoryService;
