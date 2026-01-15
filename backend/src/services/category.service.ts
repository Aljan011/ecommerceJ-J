import prisma from "../config/prisma.ts";

const categoryService = {
  //--------------------
  // PUBLIC
  //--------------------

  async getAllCategories() {
    return prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async getCategoryById(categoryId: string) {
    return prisma.category.findUnique({
      where: { id: categoryId },
    });
  },

  async getProductsByCategory(categoryId: string) {
    return prisma.product.findMany({
      where: { categoryId },
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
      where: { id: categoryId },
      data,
    });
  },

  async deleteCategory(categoryId: string) {
    // prevent delete if products exist
    const productCount = await prisma.product.count({
      where: { categoryId },
    });

    if (productCount > 0) {
      throw new Error("Cannot delete category with existing products");
    }

    return prisma.category.delete({
      where: { id: categoryId },
    });
  },
};

export default categoryService;
