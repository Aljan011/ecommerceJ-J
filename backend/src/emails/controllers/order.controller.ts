import type { Request, Response } from "express";
import prisma from "../../config/prisma.ts";
import { sendEmail } from "../services/email.service.ts";
import { orderConfirmationTemplate } from "../templates/orderConfirmation.ts";
import { adminNewOrderTemplate } from "../templates/adminNewOrder.ts";

export const createOrder = async (req: Request, res: Response) => {
    try {
        //  Auth check
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });
        const user = req.user;

        // Extract order data from request body
        const {
            items,
            totalAmount,
            shippingName,
            shippingAddress,
            shippingPhone,
            paymentMethod,
            transactionId,
            guestId,
        } = req.body as {
            items: { variantId: string; quantity: number; priceAtPurchase: number }[];
            totalAmount: number;
            shippingName: string;
            shippingAddress: string;
            shippingPhone: string;
            paymentMethod?: string;
            transactionId?: string;
            guestId?: string;
        };

        //  Get user email from DB
        const dbUser = await prisma.user.findUnique({
            where: { id: user.userId },
            select: { email: true },
        });

        if (!dbUser?.email) return res.status(404).json({ message: "User email not found" });

        //  Create order in DB
        const order = await prisma.order.create({
            data: {
                userId: user.userId,          // string matches Prisma
                guestId: guestId || null,
                totalAmount,
                shippingName,
                shippingAddress,
                shippingPhone,
                paymentMethod,
                transactionId,
                items: { create: items },     // OrderItem relation
            },
            include: {
                items: { include: { variant: true } }, // include variant for email template
            },
        });

        // Send emails (non-blocking)
        try {
            // User confirmation email
            await sendEmail({
                to: dbUser.email,
                subject: `Order #${order.id} Confirmed`,
                html: orderConfirmationTemplate({
                    orderId: order.id,
                    total: order.totalAmount,
                    items: order.items.map((item) => ({
                        id: item.id,
                        variantId: item.variantId,
                        name: item.variant.name,     // ⚠ include variant name
                        quantity: item.quantity,
                        priceAtPurchase: item.priceAtPurchase,
                    })),
                }),
            });

            // Admin notification email
            await sendEmail({
                to: process.env.ADMIN_EMAIL || "",
                subject: `New Order #${order.id}`,
                html: adminNewOrderTemplate({
                    orderId: order.id,
                    userEmail: dbUser.email,
                    total: order.totalAmount,
                }),
            });
        } catch (err) {
            console.error("Email sending failed:", err);
        }

        // Return created order
        return res.status(201).json(order);
    } catch (err) {
        console.error("Order creation failed:", err);
        return res.status(500).json({ message: "Server error" });
    }
};