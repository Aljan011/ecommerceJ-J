import prisma from "../config/prisma.ts";
import cartService from "./cart.service.ts";

type OrderContext =
  | { userId: string; guestId?: never }
  | { guestId: string; userId?: never };

interface OrderInput {
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod?: string;
  transactionId?: string;

  //direct purchase item
  items?: {
    variantId: string;
    quantity: number;
    priceAtPurchase?: number;
  }[];
}

const orderService = {
  async createOrder(context: OrderContext, orderData: OrderInput & { items?: { variantId: string; quantity: number; priceAtPurchase?: number }[] }) {
    // 1. Fetch cart items
    let cartItems = await cartService.getCart(context);

    // 2. If cart is empty, use direct order items
    if ((!cartItems || cartItems.length === 0) && orderData.items) {
      cartItems = await Promise.all(
        orderData.items.map(async (item) => {
          const variant = await prisma.variant.findUnique({
            where: { id: item.variantId },
            include: { product: { include: { category: true } } },
          });

          if (!variant) throw new Error(`Variant ${item.variantId} not found`);

          return {
            id: "direct-" + item.variantId, // dummy id for direct purchase
            variant,
            quantity: item.quantity,
            addedAt: new Date(),
            priceAtPurchase: variant.price,
            userId: "userId" in context ? context.userId : null,
            guestId: "guestId" in context ? context.guestId : null,
            variantId: variant.id,
          } as unknown as typeof cartItems[number]; // cast to satisfy TS
        })
      );
    }

    // 3. Still empty? throw error
    if (!cartItems || cartItems.length === 0) {
      throw new Error("No items to order");
    }

    // 4. Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + (item.priceAtPurchase ?? 0) * item.quantity,
      0
    );

    // 5. Build order data
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

    // 6. Create order
    const order = await prisma.order.create({ data: orderCreateData });

    // 7. Save cart history
    const cartHistoryData: any = {
      status: "ordered",
      orderId: order.id,
      userId: "userId" in context ? context.userId : undefined,
      guestId: "guestId" in context ? context.guestId : undefined,
    };

    const cartHistory = await prisma.cartHistory.create({ data: cartHistoryData });

    // 8. Save cart history items
    const cartHistoryItems = cartItems.map((item) => ({
      cartHistoryId: cartHistory.id,
      variantId: item.variantId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase!,
    }));

    await prisma.cartHistoryItem.createMany({ data: cartHistoryItems });

    // 9. Create order items
    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      variantId: item.variantId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase!,
    }));

    await prisma.orderItem.createMany({ data: orderItems });

    // 10. Decrement variant stock
    for (const item of cartItems) {
      await prisma.variant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // 11. Clear cart if it was a logged-in user or guest cart
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

  async getOrderById(orderId: string, context: OrderContext) {
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

  async updateOrderStatus(orderId: string, status: string) {
    const validStatuses = [
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  },
};

export default orderService;
