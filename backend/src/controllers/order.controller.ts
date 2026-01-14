import type { Request, Response } from "express";
import orderService from "../services/order.service.ts";

/**
 * Resolve order context (same as cart)
 */
function resolveOrderContext(req: Request) {
  if (req.user) return { userId: req.user.userId as number };
  const guestId = req.headers["x-guest-id"];
  if (!guestId || typeof guestId !== "string")
    throw new Error("Guest ID missing");
  return { guestId };
}

// ============================
// CREATE ORDER
// ============================
export const createOrder = async (req: Request, res: Response) => {
  try {
    const context = resolveOrderContext(req);
    const {
      shippingName,
      shippingAddress,
      shippingPhone,
      paymentMethod,
      transactionId,
    } = req.body;

    if (!shippingName || !shippingAddress || !shippingPhone) {
      return res.status(400).json({ message: "Shipping info is required" });
    }

    const order = await orderService.createOrder(context, {
      shippingName,
      shippingAddress,
      shippingPhone,
      paymentMethod,
      transactionId,
    });

    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ============================
// GET ORDERS
// ============================
export const getOrders = async (req: Request, res: Response) => {
  try {
    const context = resolveOrderContext(req);
    const orders = await orderService.getOrders(context);
    res.json(orders);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ============================
// GET SINGLE ORDER
// ============================
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const context = resolveOrderContext(req);
    const orderId = Number(req.params.orderId);
    if (!orderId) return res.status(400).json({ message: "Order ID required" });

    const order = await orderService.getOrderById(orderId, context);
    res.json(order);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ============================
// UPDATE ORDER STATUS
// ============================
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    const { status } = req.body;

    if (!orderId || !status)
      return res.status(400).json({ message: "Order ID and status required" });

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    res.json(updatedOrder);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
