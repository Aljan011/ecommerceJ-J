import prisma from "../config/prisma.ts";

const productService = {

    //----- PUBLIC ----

    async getAllProducts() {
        return prisma.product.findMany({
            include: { variants: {
                select: { id: true, name: true, price: true, stock: true }
            }, category: true },
            orderBy: { createdAt: "desc" },
        });
    },

    async getProductById(productId: number) {
        return prisma.product.findUnique({
            where: { id: productId },
            include: { variants: {
                select: { id: true, name: true, price: true, stock: true }
            }, category: true },
        });
    },

    async getProductsByCategory(categoryId: number) {
        return prisma.product.findMany({
            where: { categoryId },
            include: { variants: {
                select: { id: true, name: true, price: true, stock: true }
            }, category: true },
        });
    },


    //----- ADMIN ----
    async createProduct(data: { name: string; description: string; imageUrl?: string; categoryId: number;  }) {
        return prisma.product.create({
            data,
            include: { variants: {
                select: { id: true, name: true, price: true, stock: true }
            }, category: true },
        });
    },

    async updateProduct(productId: number, data: { name?: string; description?: string; imageUrl?: string; categoryId?: number; }) {
        return prisma.product.update({
            where: { id: productId },
            data,
            include: { variants: {
                select: { id: true, name: true, price: true, stock: true }
            }, category: true },
        });
    },

    async deleteProduct(productId: number) {
        //cascade delete variants automatically handledf by prisma if relation set 
        return prisma.product.delete({
            where: { id: productId },
        });
    }
};

export default productService;