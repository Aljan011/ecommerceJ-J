import type { Request, Response } from "express";
import orderService from "../services/order.service.ts";

/**
 * Resolve order context (same as cart)
 * - Logged-in user → userId (string UUID)
 * - Guest → x-guest-id header
 */
function resolveOrderContext(req: Request) {
  if (req.user) {
    return { userId: String(req.user.userId) };
  }

  const guestId = req.headers["x-guest-id"];
  if (!guestId || typeof guestId !== "string") {
    throw new Error("Guest ID missing");
  }

  return { guestId };
}

// ============================
// CREATE ORDER
// ============================
export const createOrder = async (req: Request, res: Response) => {
  try {
    const context = resolveOrderContext(req);
    const { shippingName,
      shippingAddress,
      shippingPhone,
      paymentMethod,
      transactionId,
      items //optional for direct purchase
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
      items
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

    let orderId = req.params.orderId;
    if (!orderId) return res.status(400).json({ message: "Order ID required" });

    if (Array.isArray(orderId)) orderId = orderId[0]; // handle string[]

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
    let orderId = req.params.orderId;
    const { status } = req.body;

    if (!orderId || !status)
      return res.status(400).json({ message: "Order ID and status required" });

    if (Array.isArray(orderId)) orderId = orderId[0]; // handle string[]

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    res.json(updatedOrder);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
