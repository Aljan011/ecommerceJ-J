import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";

export const getAdminStats = async (req: Request, res: Response) => {
    const [
        usersCont,
        categoriesCount,
        productsCount,
        orders,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.category.count(),
        prisma.product.count(),
        prisma.order.findMany({
            select: { totalAmount: true },
        }),
    ]);

    const totalRevenue = orders.reduce(
        (sum, order) => sum + Number(order.totalAmount),
        0
    );

    res.json({
        users: usersCont,
        categories: categoriesCount,
        products: productsCount,
        orders: orders.length,
        revenue: totalRevenue,
    });
};