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

  // direct purchase items
  items?: {
    variantColorId: string;
    quantity: number;
    priceAtPurchase?: number;
  }[];
}

const orderService = {
  async createOrder(
    context: OrderContext,
    orderData: OrderInput
  ) {
    // 1️⃣ Fetch cart items
    let cartItems = await cartService.getCart(context);

    // 2️⃣ Direct purchase if cart is empty
    if ((!cartItems || cartItems.length === 0) && orderData.items) {
      cartItems = await Promise.all(
        orderData.items.map(async (item) => {
          const variantColor = await prisma.variantColor.findUnique({
            where: { id: item.variantColorId },
            include: {
              variant: { include: { product: { include: { category: true } } } },
              color: true,
            },
          });
          if (!variantColor) throw new Error(`VariantColor ${item.variantColorId} not found`);
          if (variantColor.stock < item.quantity)
            throw new Error(`Insufficient stock for ${variantColor.variant.name} (${variantColor.color.name})`);

          return {
            id: "direct-" + item.variantColorId,
            variantColor,
            quantity: item.quantity,
            priceAtPurchase: variantColor.price,
            userId: "userId" in context ? context.userId : null,
            guestId: "guestId" in context ? context.guestId : null,
            variantColorId: variantColor.id,
          } as unknown as typeof cartItems[number];
        })
      );
    }

    if (!cartItems || cartItems.length === 0)
      throw new Error("No items to order");

    // 3️⃣ Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + (item.priceAtPurchase ?? 0) * item.quantity,
      0
    );

    // 4️⃣ Create order
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

    const order = await prisma.order.create({ data: orderCreateData });

    // 5️⃣ Create cart history
    const cartHistoryData: any = {
      status: "ordered",
      orderId: order.id,
      userId: "userId" in context ? context.userId : undefined,
      guestId: "guestId" in context ? context.guestId : undefined,
    };
    const cartHistory = await prisma.cartHistory.create({ data: cartHistoryData });

    // 6️⃣ CartHistory items
    const cartHistoryItems = cartItems.map((item) => ({
      cartHistoryId: cartHistory.id,
      variantColorId: item.variantColorId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase!,
    }));
    await prisma.cartHistoryItem.createMany({ data: cartHistoryItems });

    // 7️⃣ Order items
    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      variantColorId: item.variantColorId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase!,
    }));
    await prisma.orderItem.createMany({ data: orderItems });

    // 8️⃣ Decrement stock
    for (const item of cartItems) {
      await prisma.variantColor.update({
        where: { id: item.variantColorId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // 9️⃣ Clear cart
    await cartService.clearCart(context);

    return order;
  },

  async getOrders(context: OrderContext) {
    const whereClause = "userId" in context ? { userId: context.userId } : { guestId: context.guestId };
    return prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            variantColor: {
              include: {
                variant: { include: { product: { include: { category: true } } } },
                color: true,
              },
            },
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
        ...("userId" in context ? { userId: context.userId } : { guestId: context.guestId }),
      },
      include: {
        items: {
          include: {
            variantColor: {
              include: {
                variant: { include: { product: { include: { category: true } } } },
                color: true,
              },
            },
          },
        },
      },
    });
    if (!order) throw new Error("Order not found");
    return order;
  },

  async updateOrderStatus(orderId: string, status: string) {
    const validStatuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) throw new Error("Invalid status");

    return prisma.order.update({ where: { id: orderId }, data: { status } });
  },
};

export default orderService;
