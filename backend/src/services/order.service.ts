import prisma from "../config/prisma.ts";
import cartService from "./cart.service.ts";

type OrderContext =
  | { userId: number; guestId?: never }
  | { guestId: string; userId?: never };

interface OrderInput {
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod?: string;
  transactionId?: string;
}

const orderService = {
  async createOrder(context: OrderContext, orderData: OrderInput) {
    //  Fetch cart items
    const cartItems = await cartService.getCart(context);
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    //  Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + (item.priceAtPurchase ?? 0) * item.quantity,
      0
    );

    //  Build order data conditionally
    const orderCreateData: any = {
      totalAmount,
      status: "PENDING",
      shippingName: orderData.shippingName,
      shippingAddress: orderData.shippingAddress,
      shippingPhone: orderData.shippingPhone,
      paymentMethod: orderData.paymentMethod,
      transactionId: orderData.transactionId,
      paidAt:
        orderData.paymentMethod && orderData.transactionId
          ? new Date()
          : undefined,
    };

    if ("userId" in context) orderCreateData.userId = context.userId;
    if ("guestId" in context) orderCreateData.guestId = context.guestId;

    //  Create order
    const order = await prisma.order.create({
      data: orderCreateData,
    });

    //  Save cart history
    const cartHistoryData: any = {
      status: "ordered",
      orderId: order.id,
    };
    if ("userId" in context) cartHistoryData.userId = context.userId;
    if ("guestId" in context) cartHistoryData.guestId = context.guestId;

    const cartHistory = await prisma.cartHistory.create({
      data: cartHistoryData,
    });

    const cartHistoryItems = cartItems.map((item) => ({
      cartHistoryId: cartHistory.id,
      variantId: item.variantId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase!,
    }));

    await prisma.cartHistoryItem.createMany({ data: cartHistoryItems });

    //  Create order items
    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      variantId: item.variantId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase!,
    }));

    await prisma.orderItem.createMany({ data: orderItems });

    //  Decrement variant stock
    for (const item of cartItems) {
      await prisma.variant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    //  Clear cart
    await cartService.clearCart(context);

    return order;
  },

  async getOrders(context: OrderContext) {
    const whereClause =
      "userId" in context
        ? { userId: context.userId }
        : { guestId: context.guestId };

    return prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            variant: { include: { product: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getOrderById(orderId: number, context: OrderContext) {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        ...("userId" in context
          ? { userId: context.userId }
          : { guestId: context.guestId }),
      },
      include: {
        items: {
          include: { variant: { include: { product: true } } },
        },
      },
    });

    if (!order) throw new Error("Order not found");
    return order;
  },

  async updateOrderStatus(orderId: number, status: string) {
    const validStatuses = [
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];
    if (!validStatuses.includes(status)) throw new Error("Invalid status");

    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  },
};

export default orderService;
